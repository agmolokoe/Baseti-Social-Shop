
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutGrid, PanelLeft } from "lucide-react";
import { motion } from "framer-motion";

export function LayoutOptionsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Card className="border-white/10 shadow-glow-blue overflow-hidden">
        <CardHeader>
          <CardTitle className="text-gradient">Layout Options</CardTitle>
          <CardDescription>Choose how your products are displayed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" className="h-auto w-full py-6 flex flex-col gap-4 justify-center items-center hover:bg-teal-500/10 hover:border-teal-500/50">
                <LayoutGrid className="h-6 w-6 text-teal-400" />
                <span>Grid Layout</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" className="h-auto w-full py-6 flex flex-col gap-4 justify-center items-center hover:bg-blue-500/10 hover:border-blue-500/50">
                <PanelLeft className="h-6 w-6 text-blue-400" />
                <span>Sidebar Layout</span>
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
