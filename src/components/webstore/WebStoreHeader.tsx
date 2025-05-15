
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";

type WebStoreHeaderProps = {
  businessProfile: any;
  loading: boolean;
  handleViewStore: () => void;
};

export function WebStoreHeader({ businessProfile, loading, handleViewStore }: WebStoreHeaderProps) {
  return (
    <motion.div className="flex items-center justify-between mb-8" variants={{
      hidden: { y: 20, opacity: 0 },
      show: { y: 0, opacity: 1 }
    }}>
      <div>
        <h1 className="text-3xl font-bold gradient-text">Webstore Management</h1>
        <p className="text-muted-foreground mt-2">Customize and manage your online storefront</p>
      </div>
      {businessProfile && (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={handleViewStore}
            className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 text-white font-medium shadow-md"
            size="lg"
          >
            <Eye className="h-5 w-5" />
            <span>Preview Store</span>
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
