
import React, { useEffect, useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { AppProviders } from "@/components/providers/AppProviders";
import { AppRoutes } from "@/routes/AppRoutes";
import { PageLoader } from "@/components/layout/PageLoader";

// Create a new QueryClient instance with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60000, // 1 minute
      retry: 1,
    },
  },
});

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("App component - initializing auth state");
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session ? "logged in" : "logged out");
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed in App:", _event);
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <AppProviders queryClient={queryClient}>
      <AppRoutes session={session} />
    </AppProviders>
  );
}

export default App;
