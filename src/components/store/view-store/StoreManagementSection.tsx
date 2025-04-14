
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ManagementCard } from './ManagementCard';
import { StoreUrlSection } from './StoreUrlSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Settings, ShoppingBag, Share2 } from 'lucide-react';

interface StoreManagementSectionProps {
  businessProfile: any;
}

export function StoreManagementSection({ businessProfile }: StoreManagementSectionProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Store Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <StoreUrlSection businessId={businessProfile?.id} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <ManagementCard
              title="Customize Store"
              description="Design your store layout and appearance"
              icon={<ShoppingBag className="h-6 w-6 text-primary" />}
              linkTo="/dashboard/webstore"
            />
            <ManagementCard
              title="Store Settings"
              description="Configure store policies and information"
              icon={<Settings className="h-6 w-6 text-primary" />}
              linkTo="/dashboard/settings/store"
            />
            <ManagementCard
              title="Social Media"
              description="Connect and share to social platforms"
              icon={<Share2 className="h-6 w-6 text-primary" />}
              linkTo="/dashboard/social"
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button asChild>
          <Link to="/dashboard/webstore">
            Advanced Store Management
          </Link>
        </Button>
      </div>
    </div>
  );
}
