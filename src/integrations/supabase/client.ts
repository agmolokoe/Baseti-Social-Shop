// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://plquxmkydifejukpoocr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBscXV4bWt5ZGlmZWp1a3Bvb2NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNzMzNDIsImV4cCI6MjA1MTc0OTM0Mn0.YY8UopCyclJdq1q2vuj233FQHwsENaoL5LOdOntVY8E";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);