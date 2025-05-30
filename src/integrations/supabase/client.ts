
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xnqbmtsphlduhxrkaopt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhucWJtdHNwaGxkdWh4cmthb3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNzE4MDMsImV4cCI6MjA1ODk0NzgwM30.1qgN3Dg7mQYcCHv0De5rCuI5J1YOcmE6ZQhIKAoc-cQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
  }
});
