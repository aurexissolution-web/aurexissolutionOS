"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Spline = lazy(() => import("@splinetool/react-spline"));

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden">

      {/* Spline 3D Background (full bleed behind everything) */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <Suspense fallback={
          <div className="w-full h-full bg-[#02040A] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#00F0FF]/30 border-t-[#00F0FF] rounded-full animate-spin" />
          </div>
        }>
          {/* Wrapper to physically crop out the Spline logo by scaling it out of bounds */}
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#02040A]">
            <Spline
              scene="https://prod.spline.design/Jk40Mo0ZdZwuYhtE/scene.splinecode"
              className="w-full h-full transform-gpu will-change-transform scale-[1.1] translate-y-[-5%] opacity-60"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </Suspense>
        {/* Gradient fades at edges so Spline blends into the dark background */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#02040A] to-transparent z-[5]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#02040A]/60 to-transparent z-[5]" />
      </div>

      {/* Covers "Built with Spline" watermark aggressively. Spline usually puts it bottom right or bottom left. 
          We'll cover both corners at the very bottom just to be absolutely certain. */}
      <div className="absolute bottom-0 right-0 w-80 h-16 bg-[#02040A] z-[50] pointer-events-auto" />
      <div className="absolute bottom-0 left-0 w-80 h-16 bg-[#02040A] z-[50] pointer-events-auto" />
      
      {/* Force hide via injected style to bypass Next.js CSS scoping edge cases */}
      <style dangerouslySetInnerHTML={{__html: `
        spline-viewer, canvas { outline: none; }
        #logo, a[href*="spline.design"], .spline-watermark { display: none !important; opacity: 0 !important; pointer-events: none !important; }
      `}} />

      {/* Dark overlay to suppress any Spline embedded text/UI (Removed for performance, using Spline opacity instead) */}

      {/* Content Overlay */}
      <div className="relative z-10 w-full flex flex-col items-center text-center pt-52 px-6">

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-[#02040A] text-sm text-[#94A3B8] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            Automate. Innovate. Dominate.
          </div>
        </motion.div>

        <motion.h1
          className="text-6xl md:text-8xl lg:text-[110px] font-extrabold tracking-[-0.03em] leading-[0.9] text-white max-w-5xl mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.85 }}
        >
          The Intelligence{" "}
          <span className="bg-gradient-to-r from-white via-[#00F0FF] to-[#0047FF] text-transparent bg-clip-text">
            Behind Your Growth.
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-[#94A3B8] max-w-4xl mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          We architect intelligent ecosystems integrating custom AI agents, high-performance web platforms, and data-driven marketing to turn your technical infrastructure into a growth engine.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15 }}
        >
          <Link
            href="/contact"
            className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-white/90 transition-all hover:-translate-y-0.5 shadow-[0_0_30px_rgba(255,255,255,0.25)]"
          >
            Start Building
          </Link>
          <Link
            href="/services"
            className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-lg hover:bg-white/5 transition-colors flex items-center gap-2 group"
          >
            Explore Stack <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

