
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { StoreHeader } from "@/components/store/view-store/StoreHeader";
import { BusinessProfileCard } from "@/components/store/view-store/BusinessProfileCard";
import { StoreManagementSection } from "@/components/store/view-store/StoreManagementSection";
import { ProfileNotFound } from "@/components/store/view-store/ProfileNotFound";
import { LoadingSkeleton } from "@/components/store/view-store/LoadingSkeleton";

export default function ViewStorePage() {
  const [loading, setLoading] = useState(true);
  const [businessProfile, setBusinessProfile] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinessProfile = async () => {
      try {
        setLoading(true);
        
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/auth');
          return;
        }

        const { data, error } = await supabase
          .from('business_profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (error) {
          throw error;
        }
        
        setBusinessProfile(data);
      } catch (error) {
        console.error('Error fetching business profile:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load your business profile.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessProfile();
  }, [navigate, toast]);

  const handleViewStore = () => {
    if (businessProfile?.id) {
      window.open(`/shopapp/${businessProfile.id}`, '_blank');
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!businessProfile) {
    return <ProfileNotFound />;
  }

  return (
    <div className="container mx-auto p-6">
      <StoreHeader 
        businessProfile={businessProfile}
        handleViewStore={handleViewStore}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <BusinessProfileCard businessProfile={businessProfile} />
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <StoreManagementSection businessProfile={businessProfile} />
        </div>
      </div>
    </div>
  );
}
