
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function StoreThemeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-white/10 shadow-glow-teal overflow-hidden">
        <CardHeader>
          <CardTitle className="text-gradient">Store Theme</CardTitle>
          <CardDescription>Customize the look and feel of your online store</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Modern", "Classic", "Bold"].map((theme) => (
              <motion.div key={theme} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <Card className={`overflow-hidden cursor-pointer transition-all ${theme === 'Modern' ? 'ring-2 ring-teal-500' : 'border-border hover:ring-1 hover:ring-teal-500/50'}`}>
                  <div className={`h-32 ${theme === 'Modern' ? 'bg-gradient-to-br from-teal-500/20 to-blue-500/20' : theme === 'Classic' ? 'bg-gradient-to-br from-gray-600/20 to-gray-400/20' : 'bg-gradient-to-br from-blue-600/20 to-purple-500/20'}`}></div>
                  <CardFooter className="flex items-center justify-between">
                    <span>{theme}</span>
                    {theme === 'Modern' && <div className="w-3 h-3 rounded-full bg-teal-500"></div>}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
