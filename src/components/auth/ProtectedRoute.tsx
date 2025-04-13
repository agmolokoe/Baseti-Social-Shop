
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { PageLoader } from "@/components/layout/PageLoader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
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
