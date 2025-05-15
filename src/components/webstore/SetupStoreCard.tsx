
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function SetupStoreCard() {
  const navigate = useNavigate();
  
  return (
    <motion.div variants={{
      hidden: { y: 20, opacity: 0 },
      show: { y: 0, opacity: 1 }
    }}>
      <Card className="text-center p-8 border-white/10 shadow-glow-teal">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Globe className="h-12 w-12 mx-auto mb-4 text-teal-400" />
          <h2 className="text-2xl font-bold mb-2 gradient-text">Set Up Your Webstore</h2>
          <p className="mb-6 text-muted-foreground">Complete your business profile to get started with your online store</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => navigate('/dashboard/profile/setup')}
              className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white shadow-md"
            >
              Complete Profile
            </Button>
          </motion.div>
        </motion.div>
      </Card>
    </motion.div>
  );
}
