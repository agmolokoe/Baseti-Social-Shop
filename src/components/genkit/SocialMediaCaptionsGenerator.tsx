
import { useState } from "react";
import { useGenkit, SocialMediaCaptionsParams } from "@/hooks/useGenkit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function SocialMediaCaptionsGenerator() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [platform, setPlatform] = useState<"general" | "instagram" | "tiktok" | "x">("general");
  const [includeHashtags, setIncludeHashtags] = useState(true);
  
  const { loading, result, executeFlow, clearResult } = useGenkit();
  
  const generateCaptions = async () => {
    if (!productName || !productDescription) {
      return;
    }
    
    const params: SocialMediaCaptionsParams = {
      productName,
      productDescription,
      platform,
      includeHashtags
    };
    
    await executeFlow('suggestSocialMediaCaptions', params);
  };
  
  return (
    <Card className="bg-black text-white border-white/10">
      <CardHeader>
        <CardTitle>Social Media Captions Generator</CardTitle>
        <CardDescription className="text-white/60">
          Create engaging captions for your social media posts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
              Product Description
            </label>
            <Textarea
              placeholder="Enter a brief description of your product"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="h-24 bg-white/5 border-white/10 text-white"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Social Media Platform
              </label>
              <Select 
                value={platform} 
                onValueChange={(value) => setPlatform(value as any)}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="x">X (Twitter)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="hashtags"
                checked={includeHashtags}
                onCheckedChange={setIncludeHashtags}
              />
              <Label htmlFor="hashtags">Include Hashtags</Label>
            </div>
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
              onClick={generateCaptions}
              disabled={loading || !productName || !productDescription}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Captions"
              )}
            </Button>
          </div>
          
          {result && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                Generated Captions
              </label>
              <Textarea
                readOnly
                value={result}
                className="h-48 bg-white/5 border-white/10 text-white"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
