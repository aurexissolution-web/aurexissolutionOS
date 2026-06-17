"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { GradientBars } from "@/components/ui/gradient-bars";
import { ConstellationNodes } from "@/components/ui/constellation-nodes";

export function EcosystemFlagshipHero() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number) =>
    reduceMotion
      ? { initial: false, animate: { opacity: 1, y: 0, filter: "blur(0px)" } }
      : {
          initial: { opacity: 0, y: 14, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const, delay },
        };

  return (
    <section className="ecosystem-hero relative isolate min-h-[100svh] flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes ecoDotPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.1); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .ecosystem-hero .eyebrow-dot {
            animation: ecoDotPulse 1.8s ease-in-out infinite;
          }
        }
      `}</style>

      {/* atmosphere */}
      <GradientBars />
      <ConstellationNodes />

      {/* content */}
      <div className="relative z-10 w-full max-w-[64rem] mx-auto px-6 text-center">
        {/* eyebrow */}
        <motion.p
          {...reveal(0.06)}
          aria-label="Section: The Flagship, one of four"
          className="inline-flex items-center gap-2.5 mb-10 md:mb-12 font-mono text-[11px] uppercase tracking-[0.32em]"
        >
          <span
            aria-hidden
            className="eyebrow-dot inline-block w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: "var(--color-electric-cyan)",
              boxShadow: "0 0 12px rgba(0,240,255,0.9)",
            }}
          />
          <span className="text-[var(--color-electric-cyan)]">The Flagship</span>
          <span aria-hidden className="text-white/[0.18]">·</span>
          <span className="text-[#8E96A6]">01 / 04</span>
        </motion.p>

        {/* headline */}
        <h1 className="font-serif italic font-normal text-[clamp(56px,8vw,128px)] leading-[1.04] tracking-[-0.025em] text-white mb-10 md:mb-12">
          <motion.span {...reveal(0.14)} className="block">
            Four surfaces.
          </motion.span>
          <motion.em
            {...reveal(0.22)}
            className="block pb-[0.18em]"
            style={{
              fontStyle: "italic",
              backgroundImage:
                "linear-gradient(110deg, #00F0FF 0%, #5B8DFF 48%, #C4B5FD 95%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 0 28px rgba(0,240,255,0.28))",
              overflow: "visible",
            }}
          >
            One living system.
          </motion.em>
        </h1>

        {/* subhead */}
        <motion.p
          {...reveal(0.30)}
          className="max-w-[36rem] mx-auto text-[clamp(16px,1.25vw,19px)] leading-[1.65] text-[#C4CCD9] mb-10 md:mb-12"
        >
          Website, operations app, AI agents, integrations — designed together,
          built together,{" "}
          <em className="font-serif italic text-white">running together.</em>
        </motion.p>

        {/* CTA row */}
        <motion.div
          {...reveal(0.38)}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 sm:gap-6"
        >
          <Link
            href="/contact?topic=ecosystem-demo"
            className="inline-flex items-center justify-center gap-3.5 px-7 py-4 rounded-full bg-white text-[#02030A] font-mono text-[12px] uppercase tracking-[0.22em] font-semibold transition-all duration-[250ms] hover:-translate-y-px hover:shadow-[0_14px_36px_rgba(0,240,255,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#02030A]"
          >
            See an ecosystem demo <span aria-hidden>→</span>
          </Link>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[#8E96A6]">
            ~3 min · live walkthrough
          </span>
        </motion.div>

        {/* mobile-only four-surface marker (corner nodes are hidden below md) */}
        <motion.p
          {...reveal(0.46)}
          className="md:hidden mt-12 border-t border-white/[0.07] pt-6 font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#8E96A6] text-center"
        >
          Site · App · Agents · Integrations
        </motion.p>
      </div>

      {/* soft fade to page bg at the bottom — eases into schematic section */}
      <div className="absolute inset-x-0 bottom-0 h-16 z-[3] bg-gradient-to-t from-[#02030A] to-transparent pointer-events-none" />
    </section>
  );
}
