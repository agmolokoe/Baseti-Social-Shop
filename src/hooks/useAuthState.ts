
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { getAuthErrorMessage } from "@/utils/auth-errors";
import { toast } from "sonner";
import { AuthError } from "@supabase/supabase-js";

function useAuthState() {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("useAuthState hook initialized");
    
    try {
      // Set up auth state change listener first
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
        console.log("Auth event:", event, "Session:", currentSession ? "exists" : "null");
        
        // Update session state
        setSession(currentSession);

        if (event === "SIGNED_IN" && currentSession) {
          console.log("User signed in successfully");
          setErrorMessage(""); // Clear any previous errors
          toast.success("Successfully signed in! Welcome to Baseti Social Shop.");
          
          // Check for returnTo parameter
          const params = new URLSearchParams(location.search);
          const returnTo = params.get('returnTo');
          navigate(returnTo || "/dashboard", { replace: true });
        }

        if (event === "SIGNED_OUT") {
          console.log("User signed out");
          setErrorMessage("");
          toast.success("Successfully signed out. See you soon!");
          navigate("/auth", { replace: true });
        }

        if (event === "PASSWORD_RECOVERY") {
          console.log("Password recovery initiated");
          toast.info("Please check your email to reset your password.");
        }

        // Handle social login events
        if (event === "USER_UPDATED" && currentSession) {
          console.log("User account updated");
          setErrorMessage("");
          toast.success("Account updated successfully!");
        }
      });

      // Then check current session
      const checkCurrentSession = async () => {
        try {
          console.log("Checking current session");
          setIsLoading(true);
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error("Error checking session:", error);
            setIsAuthReady(true);
            setIsLoading(false);
            return;
          }
          
          console.log("Session check result:", data.session ? "Session exists" : "No session");
          
          // Set the session in state
          setSession(data.session);
          
          // Set auth ready after we've checked the session
          setIsAuthReady(true);
          
          // If on auth page but already authenticated, redirect to dashboard
          if (data.session && location.pathname === '/auth') {
            console.log("Already authenticated, redirecting from auth page");
            // Check if there's a return path in the URL
            const params = new URLSearchParams(location.search);
            const returnTo = params.get('returnTo');
            navigate(returnTo || '/dashboard', { replace: true });
          }
        } catch (err) {
          console.error("Unexpected error checking session:", err);
          setIsAuthReady(true);
        } finally {
          setIsLoading(false);
        }
      };
      
      checkCurrentSession();

      return () => {
        console.log("useAuthState cleanup - unsubscribing");
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error("Critical error in useAuthState:", error);
      setErrorMessage("A critical authentication error occurred. Please refresh the page and try again.");
      setIsAuthReady(true);
      setIsLoading(false);
    }
  }, [navigate, location.pathname, location.search]);

  return { errorMessage, setErrorMessage, isAuthReady, session, isLoading };
}

export default useAuthState;
