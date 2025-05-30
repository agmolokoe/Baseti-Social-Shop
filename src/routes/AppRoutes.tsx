
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Import pages
import AuthPage from "@/pages/AuthPage";
import LandingPage from "@/pages/LandingPage";
import Index from "@/pages/Index";
import PrivacyPolicy from "@/pages/legal/PrivacyPolicy";
import TermsOfService from "@/pages/legal/TermsOfService";
import BusinessProfileSetupPage from "@/pages/profile/BusinessProfileSetupPage";
import StorePage from "@/pages/store/StorePage";
import ProductDetailPage from "@/pages/store/ProductDetailPage";
import SubscriptionPage from "@/pages/subscription/Index";
import GenkitPage from "@/pages/genkit/Index";
import WebStorePage from "@/pages/webstore/Index";
import CustomersPage from "@/pages/customers/Index";
import OrdersPage from "@/pages/orders/Index";
import ProductsPage from "@/pages/products/Index";
import SocialPage from "@/pages/social/Index";
import ViewStorePage from "@/pages/dashboard/ViewStorePage";

interface AppRoutesProps {
  session: Session | null;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({ session }) => {
  return (
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
      <Route
        path="/dashboard/webstore"
        element={
          <ProtectedRoute>
            <WebStorePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/customers"
        element={
          <ProtectedRoute>
            <CustomersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/products"
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/social"
        element={
          <ProtectedRoute>
            <SocialPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/view-store"
        element={
          <ProtectedRoute>
            <ViewStorePage />
          </ProtectedRoute>
        }
      />
      
      {/* Public store routes - can be accessed without auth */}
      <Route path="/shopapp/:businessId" element={<StorePage />} />
      <Route path="/shopapp/:businessId/product/:productId" element={<ProductDetailPage />} />
      <Route path="/shopapp/:businessId/category/:categoryName" element={<StorePage />} />
      
      {/* Redirects from old routes */}
      <Route path="/:businessId" element={<Navigate to="/shopapp/:businessId" replace />} />
      <Route path="/:businessId/product/:productId" element={<Navigate to="/shopapp/:businessId/product/:productId" replace />} />
      <Route path="/store/:businessId" element={<Navigate to="/shopapp/:businessId" replace />} />
      <Route path="/store/:businessId/product/:productId" element={<Navigate to="/shopapp/:businessId/product/:productId" replace />} />
      <Route path="/webstore" element={<Navigate to="/dashboard/webstore" replace />} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
