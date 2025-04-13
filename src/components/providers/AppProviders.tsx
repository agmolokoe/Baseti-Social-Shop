
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TenantProvider } from "@/middleware";
import { CartProvider } from "@/context/CartContext";

interface AppProvidersProps {
  children: ReactNode;
  queryClient: QueryClient;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ 
  children,
  queryClient
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <TenantProvider>
            <CartProvider>
              <Toaster />
              <Sonner position="top-right" closeButton={true} />
              {children}
            </CartProvider>
          </TenantProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
