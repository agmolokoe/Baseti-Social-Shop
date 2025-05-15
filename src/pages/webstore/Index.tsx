
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { WebStoreHeader } from "@/components/webstore/WebStoreHeader";
import { WebStoreTabs } from "@/components/webstore/WebStoreTabs";
import { SetupStoreCard } from "@/components/webstore/SetupStoreCard";

export default function WebStorePage() {
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="container mx-auto p-6" 
      initial="hidden"
      animate="show"
      variants={container}
    >
      <WebStoreHeader 
        businessProfile={businessProfile} 
        loading={loading} 
        handleViewStore={handleViewStore} 
      />

      {loading ? (
        <motion.div className="space-y-4" variants={{
          hidden: { y: 20, opacity: 0 },
          show: { y: 0, opacity: 1 }
        }}>
          <Skeleton className="h-40 w-full bg-gradient-to-r from-gray-800/60 to-gray-700/60 animate-pulse" />
          <Skeleton className="h-60 w-full bg-gradient-to-r from-gray-800/60 to-gray-700/60 animate-pulse" />
        </motion.div>
      ) : businessProfile ? (
        <WebStoreTabs businessProfile={businessProfile} />
      ) : (
        <SetupStoreCard />
      )}
    </motion.div>
  );
}
