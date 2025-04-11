
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

// Type definitions for Genkit parameters
export type ProductDescriptionParams = {
  productName: string;
  productType: string;
  features: string[];
  targetAudience?: string;
  keywords?: string[];
};

export type SocialMediaCaptionsParams = {
  productName: string;
  productDescription: string;
  platform?: 'general' | 'instagram' | 'tiktok' | 'x';
  includeHashtags?: boolean;
};

export type CompetitorAnalysisParams = {
  productName: string;
  productDescription: string;
  competitors: Array<{
    name: string;
    description: string;
  }>;
};

// Type definition for Genkit flow types
export type GenkitFlowType = 
  | 'generateProductDescription' 
  | 'suggestSocialMediaCaptions'
  | 'competitorAnalysis';

// Type for Genkit flow parameters
export type GenkitParams = 
  | ProductDescriptionParams 
  | SocialMediaCaptionsParams
  | CompetitorAnalysisParams;

// Return type for useGenkit hook
interface UseGenkitReturn {
  loading: boolean;
  error: string | null;
  result: string | null;
  executeFlow: (flow: GenkitFlowType, params: GenkitParams) => Promise<string | null>;
  clearResult: () => void;
}

export function useGenkit(): UseGenkitReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const executeFlow = async (flow: GenkitFlowType, params: GenkitParams): Promise<string | null> => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`Executing Genkit flow: ${flow}`, params);
      
      const { data, error: flowError } = await supabase.functions.invoke('genkit-flows', {
        body: {
          flow,
          params
        }
      });
      
      if (flowError) {
        throw new Error(flowError.message || 'An error occurred while executing the flow');
      }
      
      if (!data || !data.result) {
        throw new Error('Invalid response from Genkit flow');
      }
      
      setResult(data.result);
      return data.result;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Genkit flow error:', errorMessage);
      setError(errorMessage);
      toast({
        title: "Genkit Flow Error",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const clearResult = () => {
    setResult(null);
    setError(null);
  };

  return {
    loading,
    error,
    result,
    executeFlow,
    clearResult
  };
}
