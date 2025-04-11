
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { TenantContext, getDefaultPermissions, TenantRole, RolePermissions } from '@/context/TenantContext';
import { toast } from 'sonner';

interface TenantProviderProps {
  children: ReactNode;
}

// The TenantProvider will handle multi-tenant authentication and permissions
export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
  const [currentTenantId, setCurrentTenantId] = useState<string | null>(null);
  const [tenantName, setTenantName] = useState<string | null>(null);
  const [tenantRole, setTenantRole] = useState<TenantRole>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<RolePermissions>(getDefaultPermissions(null));
  const [isTenantLoading, setIsTenantLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // This function allows switching between tenants (for admin users)
  const setCurrentTenant = (tenantId: string | null) => {
    console.log('Setting current tenant:', tenantId);
    
    if (tenantId) {
      localStorage.setItem('currentTenantId', tenantId);
      // Store that we're accessing this as admin if needed
      if (isAdmin) {
        localStorage.setItem('adminUserId', 'true');
      }
    } else {
      localStorage.removeItem('currentTenantId');
      localStorage.removeItem('adminUserId');
    }
    
    setCurrentTenantId(tenantId);
    
    // Reload to apply tenant context changes
    window.location.reload();
  };

  // Helper function to check permissions
  const hasPermission = (permission: keyof RolePermissions): boolean => {
    return permissions[permission] === true;
  };

  // Fetch tenant details and set up auth listener
  useEffect(() => {
    console.log('TenantProvider initializing');
    
    const setupTenant = async () => {
      try {
        setIsTenantLoading(true);
        
        // Check for stored tenant ID (for admins who've switched tenants)
        const storedTenantId = localStorage.getItem('currentTenantId');

        // Get current auth session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting auth session in tenant middleware:', error);
          setIsTenantLoading(false);
          return;
        }

        if (!session) {
          console.info('No active session, tenant context not established');
          setIsTenantLoading(false);
          return;
        }
        
        // Check if user is admin
        const isUserAdmin = session.user?.app_metadata?.role === 'admin';
        setIsAdmin(isUserAdmin);
        
        // Determine which tenant ID to use
        let effectiveTenantId = storedTenantId || session.user.id;
        
        // For regular users, always use their own ID
        if (!isUserAdmin) {
          effectiveTenantId = session.user.id;
        }
        
        setCurrentTenantId(effectiveTenantId);
        
        // Fetch tenant information from business_profiles
        if (effectiveTenantId) {
          const { data: profileData, error: profileError } = await supabase
            .from('business_profiles')
            .select('*')
            .eq('id', effectiveTenantId)
            .single();
            
          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Error fetching business profile in tenant middleware:', profileError);
          }
          
          if (profileData) {
            setTenantName(profileData.business_name || 'My Business');
            
            // Set role and permissions
            const role: TenantRole = isUserAdmin ? 'admin' : 'owner';
            setTenantRole(role);
            setPermissions(getDefaultPermissions(role));
          }
        }
      } catch (err) {
        console.error('Unexpected error in tenant middleware:', err);
      } finally {
        setIsTenantLoading(false);
      }
    };
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.info('Auth state changed in tenant middleware:', event);
      
      if (event === 'SIGNED_OUT') {
        // Clear tenant state on sign out
        setCurrentTenantId(null);
        setTenantName(null);
        setTenantRole(null);
        setPermissions(getDefaultPermissions(null));
        localStorage.removeItem('currentTenantId');
        localStorage.removeItem('adminUserId');
      }
      
      if (event === 'SIGNED_IN' && session) {
        // Reset tenant state and reload
        setupTenant();
      }
    });
    
    // Initial setup
    setupTenant();
    
    // Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <TenantContext.Provider
      value={{
        currentTenantId,
        tenantName,
        tenantRole,
        isAdmin,
        isTenantLoading,
        setCurrentTenant,
        permissions,
        hasPermission,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);

export * from '../hoc/withProtection';
