
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquareText, FileText, TrendingUp } from "lucide-react";
import { ProductDescriptionGenerator } from "@/components/genkit/ProductDescriptionGenerator";
import { SocialMediaCaptionsGenerator } from "@/components/genkit/SocialMediaCaptionsGenerator";
import { CompetitorAnalysisGenerator } from "@/components/genkit/CompetitorAnalysisGenerator";

export default function GenkitPage() {
  const [activeTab, setActiveTab] = useState("product-description");
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-8">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Genkit AI Tools</h1>
              <p className="text-white/60 mt-2">
                Create content, analyze competitors, and grow your business with AI
              </p>
            </div>
          </div>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="bg-white/5 border-white/10">
            <TabsTrigger value="product-description" className="data-[state=active]:bg-white/10">
              <FileText className="h-4 w-4 mr-2" />
              Product Description
            </TabsTrigger>
            <TabsTrigger value="social-captions" className="data-[state=active]:bg-white/10">
              <MessageSquareText className="h-4 w-4 mr-2" />
              Social Captions
            </TabsTrigger>
            <TabsTrigger value="competitor-analysis" className="data-[state=active]:bg-white/10">
              <TrendingUp className="h-4 w-4 mr-2" />
              Competitor Analysis
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="product-description">
              <ProductDescriptionGenerator />
            </TabsContent>
            
            <TabsContent value="social-captions">
              <SocialMediaCaptionsGenerator />
            </TabsContent>
            
            <TabsContent value="competitor-analysis">
              <CompetitorAnalysisGenerator />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
