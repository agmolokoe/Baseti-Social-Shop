
import { StoreConfigurationCard } from "./StoreConfigurationCard";

type WebStoreSettingsTabProps = {
  businessProfile: any;
};

export function WebStoreSettingsTab({ businessProfile }: WebStoreSettingsTabProps) {
  return <StoreConfigurationCard businessProfile={businessProfile} />;
}
