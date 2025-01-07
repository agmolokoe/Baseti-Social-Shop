import { Toaster as ToasterComponent } from "@/components/ui/toaster";
import { Toaster as SonnerComponent } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useQueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage"; // Import your LandingPage component
import AuthPage from "./pages/AuthPage"; // Import your AuthPage component

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ToasterComponent />
      <SonnerComponent />
      <BrowserRouter>
        <Routes>
          {/* Route for the landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* Route for authentication (login/signup) */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Route for the rest of your dashboard and app */}
          <Route path="/*" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
