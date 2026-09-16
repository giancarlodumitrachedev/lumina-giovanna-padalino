import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://khbzmseeidsjjhbakhkp.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_bKE-49F-0Lt3ALFeAC8niw_m-1QD5gL";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
