
import React, { useEffect, useState, lazy } from "react"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { Session } from "@supabase/supabase-js"
import { CartProvider } from "./context/CartContext"
import { TenantProvider } from "@/middleware"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// Import pages directly for better stability with authentication
import AuthPage from "./pages/AuthPage"
import LandingPage from "./pages/LandingPage"
import Index from "./pages/Index"
import PrivacyPolicy from "./pages/legal/PrivacyPolicy"
import TermsOfService from "./pages/legal/TermsOfService"
import SubscriptionPage from "./pages/subscription/Index"
import BusinessProfileSetupPage from "./pages/profile/BusinessProfileSetupPage"
import StorePage from "./pages/store/StorePage"
import ProductDetailPage from "./pages/store/ProductDetailPage"
import GenkitPage from "./pages/genkit/Index"

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center">
    <LoadingSpinner size="lg" />
    <p className="mt-4 text-white/70 animate-pulse">Loading Baseti Social Shop...</p>
  </div>
)

// Protected route component with enhanced error handling and redirect
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Protected route - checking auth state");
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error checking authentication:", error);
          throw error;
        }
        
        if (data.session) {
          console.log("User is authenticated");
          setAuthenticated(true);
        } else {
          console.log("User is not authenticated, redirecting to auth");
          // Only redirect if not already on the auth page
          if (location.pathname !== '/auth') {
            // Preserve the original URL the user was trying to access
            const returnPath = encodeURIComponent(location.pathname + location.search);
            navigate(`/auth?returnTo=${returnPath}&from=protected`, { replace: true });
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // Only redirect if not already on the auth page
        if (location.pathname !== '/auth') {
          navigate("/auth?from=error", { replace: true });
        }
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
    
    // Listen for auth state changes while on protected routes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed in ProtectedRoute:", event);
      if (event === 'SIGNED_OUT') {
        setAuthenticated(false);
        navigate('/auth', { replace: true });
      } else if (event === 'SIGNED_IN' && session) {
        setAuthenticated(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location]);

  if (checking) {
    return <PageLoader />;
  }

  return authenticated ? <>{children}</> : null;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60000, // 1 minute
      retry: 1,
    },
  },
})

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("App component - initializing auth state");
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session ? "logged in" : "logged out");
      setSession(session)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed in App:", _event);
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <PageLoader />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <TenantProvider>
            <CartProvider>
              <Toaster />
              <Sonner position="top-right" closeButton={true} />
              <Routes>
                <Route
                  path="/"
                  element={
                    !session ? (
                      <LandingPage />
                    ) : (
                      <Navigate to="/dashboard" replace />
                    )
                  }
                />
                <Route
                  path="/auth"
                  element={
                    !session ? (
                      <AuthPage mode="login" />
                    ) : (
                      <Navigate to="/dashboard" replace />
                    )
                  }
                />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                
                {/* Protected routes - will redirect to auth if not logged in */}
                <Route
                  path="/dashboard/*"
                  element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/profile/setup"
                  element={
                    <ProtectedRoute>
                      <BusinessProfileSetupPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/subscription"
                  element={
                    <ProtectedRoute>
                      <SubscriptionPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/genkit"
                  element={
                    <ProtectedRoute>
                      <GenkitPage />
                    </ProtectedRoute>
                  }
                />
                
                {/* Public store routes - can be accessed without auth */}
                <Route path="/shopapp/:businessId" element={<StorePage />} />
                <Route path="/shopapp/:businessId/product/:productId" element={<ProductDetailPage />} />
                
                {/* Redirects from old routes */}
                <Route path="/:businessId" element={<Navigate to="/shopapp/:businessId" replace />} />
                <Route path="/:businessId/product/:productId" element={<Navigate to="/shopapp/:businessId/product/:productId" replace />} />
                <Route path="/store/:businessId" element={<Navigate to="/shopapp/:businessId" replace />} />
                <Route path="/store/:businessId/product/:productId" element={<Navigate to="/shopapp/:businessId/product/:productId" replace />} />
                <Route path="/webstore" element={<Navigate to="/dashboard/webstore" replace />} />
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </CartProvider>
          </TenantProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
