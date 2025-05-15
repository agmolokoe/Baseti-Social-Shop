
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, ShoppingBag, Settings } from "lucide-react";
import { WebStoreDesignTab } from "./WebStoreDesignTab";
import { WebStoreProductsTab } from "./WebStoreProductsTab";
import { WebStoreSettingsTab } from "./WebStoreSettingsTab";

type WebStoreTabsProps = {
  businessProfile: any;
};

export function WebStoreTabs({ businessProfile }: WebStoreTabsProps) {
  return (
    <Tabs defaultValue="design" className="w-full">
      <TabsList className="grid grid-cols-3 gap-4 mb-8 bg-gradient-to-r from-black to-gray-900 p-1 rounded-lg">
        <TabsTrigger value="design" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-teal-400 data-[state=active]:text-black">
          <Palette className="h-4 w-4" />
          <span>Design & Layout</span>
        </TabsTrigger>
        <TabsTrigger value="products" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-400 data-[state=active]:text-black">
          <ShoppingBag className="h-4 w-4" />
          <span>Products</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-400 data-[state=active]:to-gray-300 data-[state=active]:text-black">
          <Settings className="h-4 w-4" />
          <span>Store Settings</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="design">
        <WebStoreDesignTab />
      </TabsContent>

      <TabsContent value="products">
        <WebStoreProductsTab />
      </TabsContent>

      <TabsContent value="settings">
        <WebStoreSettingsTab businessProfile={businessProfile} />
      </TabsContent>
    </Tabs>
  );
}
