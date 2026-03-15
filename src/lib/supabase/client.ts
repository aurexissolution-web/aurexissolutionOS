"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export async function ensureAnonymousSession() {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) throw sessionError;
  if (sessionData.session) return sessionData.session;

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error || !data.session) {
    const msg = error?.message || "Failed to create anonymous session";
    if (msg.toLowerCase().includes("captcha")) {
      throw new Error(
        "Supabase Auth captcha is enabled and is blocking anonymous sign-in. Disable captcha in Supabase Auth settings (or implement captchaToken support)."
      );
    }
    throw new Error(msg);
  }

  return data.session;
}
