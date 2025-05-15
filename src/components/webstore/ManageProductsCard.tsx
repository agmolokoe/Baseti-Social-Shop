
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function ManageProductsCard() {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-white/10 shadow-glow-teal overflow-hidden">
        <CardHeader>
          <CardTitle className="text-gradient">Manage Products</CardTitle>
          <CardDescription>Organize products in your store</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Product Catalog</h3>
              <p className="text-sm text-muted-foreground">View and modify products displayed in your store</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={() => navigate('/dashboard/products')} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-md">
                Manage Products
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-lg text-center"
            whileHover={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)' }}
            transition={{ duration: 0.3 }}
          >
            <Store className="h-8 w-8 mx-auto mb-2 text-blue-400" />
            <p>Manage your product catalog from the Products section</p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
