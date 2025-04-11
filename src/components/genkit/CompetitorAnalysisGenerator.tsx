
import { useState } from "react";
import { useGenkit, CompetitorAnalysisParams } from "@/hooks/useGenkit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Loader2, Plus, Trash2 } from "lucide-react";

type Competitor = {
  name: string;
  description: string;
};

export function CompetitorAnalysisGenerator() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [newCompetitor, setNewCompetitor] = useState<Competitor>({ name: "", description: "" });
  
  const { loading, result, executeFlow, clearResult } = useGenkit();
  
  const addCompetitor = () => {
    if (newCompetitor.name.trim() && newCompetitor.description.trim()) {
      setCompetitors([...competitors, { ...newCompetitor }]);
      setNewCompetitor({ name: "", description: "" });
    }
  };
  
  const removeCompetitor = (index: number) => {
    const updatedCompetitors = [...competitors];
    updatedCompetitors.splice(index, 1);
    setCompetitors(updatedCompetitors);
  };
  
  const generateAnalysis = async () => {
    if (!productName || !productDescription || competitors.length === 0) {
      return;
    }
    
    const params: CompetitorAnalysisParams = {
      productName,
      productDescription,
      competitors
    };
    
    await executeFlow('competitorAnalysis', params);
  };
  
  return (
    <Card className="bg-black text-white border-white/10">
      <CardHeader>
        <CardTitle>Competitor Analysis Generator</CardTitle>
        <CardDescription className="text-white/60">
          Analyze your product against competitors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Product Name
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
              Your Product Description
            </label>
            <Textarea
              placeholder="Enter a detailed description of your product"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="h-24 bg-white/5 border-white/10 text-white"
            />
          </div>
          
          <div className="border-t border-white/10 pt-4">
            <label className="block text-sm font-medium mb-2">
              Add Competitors
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <Input
                placeholder="Competitor Name"
                value={newCompetitor.name}
                onChange={(e) => setNewCompetitor({...newCompetitor, name: e.target.value})}
                className="bg-white/5 border-white/10 text-white"
              />
              
              <Input
                placeholder="Brief Description"
                value={newCompetitor.description}
                onChange={(e) => setNewCompetitor({...newCompetitor, description: e.target.value})}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            
            <Button 
              onClick={addCompetitor}
              disabled={!newCompetitor.name || !newCompetitor.description}
              variant="outline"
              className="border-white/10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Competitor
            </Button>
          </div>
          
          {competitors.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Competitors Added</h3>
              {competitors.map((competitor, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between bg-white/5 p-3 rounded-md"
                >
                  <div>
                    <div className="font-medium">{competitor.name}</div>
                    <div className="text-sm text-white/70">{competitor.description}</div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeCompetitor(index)}
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex justify-end pt-4">
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
              onClick={generateAnalysis}
              disabled={loading || !productName || !productDescription || competitors.length === 0}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Generate Analysis"
              )}
            </Button>
          </div>
          
          {result && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                Competitor Analysis
              </label>
              <Textarea
                readOnly
                value={result}
                className="h-64 bg-white/5 border-white/10 text-white"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
