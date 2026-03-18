import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.warn(
    "[SECURITY] SUPABASE_SERVICE_ROLE_KEY is not set. Admin operations will fail. " +
    "Set this environment variable in your hosting provider (e.g. Vercel)."
  );
}

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
);
