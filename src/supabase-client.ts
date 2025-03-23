import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ntudqskrzmtvxebuzomr.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);
