
import { useState } from "react";
import { useGenkit, ProductDescriptionParams } from "@/hooks/useGenkit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Loader2 } from "lucide-react";

export function ProductDescriptionGenerator() {
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [targetAudience, setTargetAudience] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  
  const { loading, result, executeFlow, clearResult } = useGenkit();
  
  const addFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };
  
  const removeFeature = (feature: string) => {
    setFeatures(features.filter(f => f !== feature));
  };
  
  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };
  
  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };
  
  const generateDescription = async () => {
    if (!productName || !productType || features.length === 0) {
      return;
    }
    
    const params: ProductDescriptionParams = {
      productName,
      productType,
      features,
      targetAudience: targetAudience || "general",
      keywords: keywords.length > 0 ? keywords : undefined
    };
    
    await executeFlow('generateProductDescription', params);
  };
  
  return (
    <Card className="bg-black text-white border-white/10">
      <CardHeader>
        <CardTitle>Product Description Generator</CardTitle>
        <CardDescription className="text-white/60">
          Generate engaging product descriptions with AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Product Name
              </label>
              <Input
                placeholder="e.g., UltraBoost Running Shoes"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Product Type
              </label>
              <Input
                placeholder="e.g., Athletic Footwear"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Target Audience (Optional)
            </label>
            <Input
              placeholder="e.g., Fitness enthusiasts aged 25-35"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Features
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a product feature"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addFeature()}
                className="bg-white/5 border-white/10 text-white"
              />
              <Button 
                onClick={addFeature}
                variant="outline"
                className="border-white/10"
              >
                Add
              </Button>
            </div>
            
            {features.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1 flex items-center gap-1">
                    {feature}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeFeature(feature)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Keywords (Optional)
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Add keywords to include"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addKeyword()}
                className="bg-white/5 border-white/10 text-white"
              />
              <Button 
                onClick={addKeyword}
                variant="outline"
                className="border-white/10"
              >
                Add
              </Button>
            </div>
            
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1 flex items-center gap-1">
                    {keyword}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeKeyword(keyword)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            {result && (
              <Button 
                variant="ghost"
                className="mr-2"
                onClick={clearResult}
              >
                Clear
              </Button>
            )}
            
            <Button 
              onClick={generateDescription}
              disabled={loading || !productName || !productType || features.length === 0}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Description"
              )}
            </Button>
          </div>
          
          {result && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                Generated Description
              </label>
              <Textarea
                readOnly
                value={result}
                className="h-32 bg-white/5 border-white/10 text-white"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
