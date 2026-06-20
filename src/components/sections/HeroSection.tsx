"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroPoster } from "./HeroPoster";
import { useShaderEligibility } from "@/lib/hooks/use-shader-eligibility";

const HeroShader = lazy(() => import("./HeroShader"));

type IdleCallbackHandle = number;
type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => IdleCallbackHandle;
  cancelIdleCallback?: (handle: IdleCallbackHandle) => void;
};

export function HeroSection() {
  const eligible = useShaderEligibility();
  const [shaderReady, setShaderReady] = useState(false);

  useEffect(() => {
    if (!eligible) {
      setShaderReady(false);
      return;
    }

    const w = window as IdleWindow;
    if (w.requestIdleCallback) {
      const handle = w.requestIdleCallback(() => setShaderReady(true), { timeout: 1500 });
      return () => w.cancelIdleCallback?.(handle);
    }

    const timer = window.setTimeout(() => setShaderReady(true), 800);
    return () => window.clearTimeout(timer);
  }, [eligible]);

  return (
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HeroPoster />
        {shaderReady && (
          <Suspense fallback={null}>
            <HeroShader />
          </Suspense>
        )}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[var(--color-background)] to-transparent z-[5]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-background)]/60 to-transparent z-[5]" />
      </div>

      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-28 md:pt-28 md:pb-36">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/services/ai-automation"
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--color-electric-cyan)]/15 bg-white/[0.04] backdrop-blur-xl text-sm text-[#cbd5e1] mb-8 transition-all hover:border-[var(--color-electric-cyan)]/35 hover:bg-white/[0.07]"
            style={{ boxShadow: "0 0 28px rgba(0,240,255,0.10), 0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.14)" }}
          >
            <span
              aria-hidden
              className="w-1.5 h-1.5 rounded-full bg-[var(--color-electric-cyan)] animate-pulse"
              style={{ boxShadow: "0 0 8px rgba(0,240,255,0.9)" }}
            />
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[var(--color-electric-cyan)]">
              New
            </span>
            <span aria-hidden className="text-white/25">·</span>
            <span className="text-white">AI Agent Workflows now live</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--color-electric-cyan)] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        <motion.h1
          className="text-6xl md:text-8xl lg:text-[110px] font-extrabold tracking-[-0.03em] leading-[0.9] text-white max-w-5xl mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          The{" "}
          <em
            className="not-italic bg-gradient-to-r from-[#A0FFFF] via-[var(--color-electric-cyan)] to-[#0080FF] text-transparent bg-clip-text"
            style={{ filter: "drop-shadow(0 0 20px rgba(0,240,255,0.32))" }}
          >
            Ecosystem
          </em>{" "}
          Behind Your Growth.
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-[#94A3B8] max-w-4xl mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Connected ecosystems for Malaysian businesses. AI agents, web platforms, and mobile apps — designed and built as one system, so you stop paying humans to do machine-level work.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link
            href="/contact#brief"
            className="inline-flex items-center px-6 py-2.5 rounded-full bg-white text-black text-[15px] font-semibold transition-all hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3),0_0_24px_rgba(0,240,255,0.15)]"
          >
            Start Building
          </Link>
          <Link
            href="/services"
            className="group inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-[var(--color-electric-cyan)]/20 text-white text-[15px] font-semibold bg-white/[0.03] backdrop-blur-md transition-all hover:bg-white/[0.07] hover:border-[var(--color-electric-cyan)]/40"
          >
            Explore Stack
            <ArrowRight className="w-4 h-4 text-[var(--color-electric-cyan)] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
