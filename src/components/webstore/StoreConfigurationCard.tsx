
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type StoreConfigurationCardProps = {
  businessProfile: any;
};

export function StoreConfigurationCard({ businessProfile }: StoreConfigurationCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-white/10 shadow-glow-teal overflow-hidden">
        <CardHeader>
          <CardTitle className="text-gradient">Store Configuration</CardTitle>
          <CardDescription>Set up your store details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-2">Store URL</h3>
            <div className="flex items-center gap-2">
              <code className="bg-black/50 p-3 rounded-md flex-1 overflow-x-auto font-mono text-white/80 border border-white/10">
                www.baseti.co.za/shopapp/{businessProfile.id}
              </code>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="icon" className="hover:bg-teal-500/10 hover:border-teal-500/50">
                  <Eye className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Store Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                className="p-4 rounded-lg border border-white/10 bg-gradient-to-br from-teal-500/5 to-transparent"
                whileHover={{ y: -5, boxShadow: '0 4px 20px rgba(45, 212, 191, 0.15)' }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm font-medium text-teal-400">Store Name</p>
                <p className="font-medium">{businessProfile.business_name || 'Your Business'}</p>
              </motion.div>
              <motion.div 
                className="p-4 rounded-lg border border-white/10 bg-gradient-to-br from-blue-500/5 to-transparent"
                whileHover={{ y: -5, boxShadow: '0 4px 20px rgba(59, 130, 246, 0.15)' }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm font-medium text-blue-400">Industry</p>
                <p className="font-medium">{businessProfile.industry || 'Not specified'}</p>
              </motion.div>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="default" 
              className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white shadow-md"
              onClick={() => navigate('/dashboard/settings/store')}
            >
              Advanced Settings
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
