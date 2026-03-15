"use client";

import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { supabase } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent, Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/portal/client";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const portalLabel =
    redirect.includes("/admin") ? "Admin Portal" :
    redirect.includes("/sales") ? "Sales Portal" : "Client Portal";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setError(error.message);
      setSubmitting(false);
      return;
    }

    router.push(redirect);
    router.refresh();
    // Keep submitting state until navigation completes
    setTimeout(() => setSubmitting(false), 5000);
  }

  return (
    <div className="min-h-screen bg-[#02040A] flex flex-col items-center justify-center relative p-6">
      
      <Link href="/" className="absolute top-8 left-8 text-[#94A3B8] hover:text-[#00F0FF] transition-colors flex items-center">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Site
      </Link>

      {/* Decorative Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00F0FF]/5 blur-[120px] rounded-full point-events-none z-0"></div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        
        <div className="text-center mb-8">
           <div className="w-12 h-12 mx-auto rounded bg-gradient-to-br from-[#00F0FF] to-[#0047FF] flex items-center justify-center mb-6 shadow-[#00F0FF]/20 shadow-lg">
             <span className="text-[#02040A] font-bold text-2xl leading-none">A</span>
           </div>
           <h1 className="text-2xl font-bold text-white mb-2">Aurexis {portalLabel}</h1>
           <p className="text-[#94A3B8]">Sign in to access your NDAs, project repositories, and live staging environments.</p>
        </div>

        <GlassCard>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="client@company.com" 
                className="w-full bg-[#02040A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00F0FF] transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-[#94A3B8]">Password</label>
                <a href="#" className="flex text-xs text-[#00F0FF] transition-colors hover:text-glow">Forgot pattern?</a>
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-[#02040A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00F0FF] transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            
            <NeonButton className="w-full mt-4" disabled={submitting}>
              {submitting ? "Authenticating..." : "Authenticate"}
            </NeonButton>

            {error && (
              <div className="text-xs text-red-300 text-center">{error}</div>
            )}
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-[#94A3B8]">
            <Shield className="w-4 h-4 text-[#00F0FF]" />
            End-to-End Encrypted via Supabase Auth
          </div>
        </GlassCard>

      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#02040A]" />}>
      <LoginForm />
    </Suspense>
  );
}
