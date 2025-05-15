
import { StoreThemeCard } from "./StoreThemeCard";
import { LayoutOptionsCard } from "./LayoutOptionsCard";

export function WebStoreDesignTab() {
  return (
    <div className="space-y-6">
      <StoreThemeCard />
      <LayoutOptionsCard />
    </div>
  );
}
