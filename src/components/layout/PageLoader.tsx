
import React from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export const PageLoader: React.FC = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center">
    <LoadingSpinner size="lg" />
    <p className="mt-4 text-white/70 animate-pulse">Loading Baseti Social Shop...</p>
  </div>
);
