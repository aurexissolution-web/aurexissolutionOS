"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  LAB_EXPLORATIONS,
  LAB_FEATURED,
} from "@/data/lab-explorations";

const CYAN = "#00F0FF";

export function LabHero() {
  const reduceMotion = useReducedMotion();

  const allExplorations = [
    ...(LAB_FEATURED ? [LAB_FEATURED] : []),
    ...LAB_EXPLORATIONS,
  ];
  const total = allExplorations.length;
  const liveCount = allExplorations.filter(
    (e) => e.status.tone === "live",
  ).length;
  const hasAny = total > 0;

  const reveal = (delay: number) =>
    reduceMotion
      ? { initial: false, animate: { opacity: 1, y: 0, filter: "blur(0px)" } }
      : {
          initial: { opacity: 0, y: 14, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: {
            duration: 0.7,
            ease: [0.2, 0.7, 0.2, 1] as const,
            delay,
          },
        };

  return (
    <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 px-6 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-16 md:mb-24">
          <motion.p
            {...reveal(0.05)}
            className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.32em]"
          >
            <span
              aria-hidden
              className="lab-eyebrow-dot inline-block w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: CYAN,
                boxShadow: `0 0 12px rgba(0,240,255,0.9)`,
              }}
            />
            <span style={{ color: CYAN }}>The Lab</span>
            <span aria-hidden className="text-white/[0.18]">
              ·
            </span>
            <span className="text-[#8E96A6]">Live Experiments &amp; Mockups</span>
          </motion.p>

          <motion.span
            {...reveal(0.1)}
            className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35"
          >
            {hasAny
              ? `${total} EXPLORATIONS · ${liveCount} LIVE · UPDATED MAY 2026`
              : "First explorations shipping soon"}
          </motion.span>
        </div>

        <motion.h1
          {...reveal(0.18)}
          className="font-serif italic font-normal text-[clamp(48px,7.4vw,108px)] leading-[1.02] tracking-[-0.025em] text-white max-w-[20ch] pb-[0.12em]"
        >
          Where we build,{" "}
          <em
            className="not-italic font-serif italic"
            style={{
              backgroundImage:
                "linear-gradient(110deg, #00F0FF 0%, #5B8DFF 50%, #C4B5FD 95%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              filter: "drop-shadow(0 0 28px rgba(0,240,255,0.28))",
            }}
          >
            in public.
          </em>
        </motion.h1>

        <motion.p
          {...reveal(0.32)}
          className="mt-10 max-w-[620px] font-serif italic text-[clamp(17px,1.4vw,21px)] leading-[1.55] text-[#B6BCC8]"
        >
          Working AI agents, design mockups, ecosystem blueprints, and
          prototypes — across web, app, AI, and full-stack ecosystems. Some are
          live and interactive. Some are visuals you can scroll through. All
          are slices of what we ship for clients.
        </motion.p>
      </div>

      <style>{`
        @keyframes labEyebrowDotPulse {
          0%, 100% { opacity: 0.65; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.12); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .lab-eyebrow-dot { animation: labEyebrowDotPulse 1.8s ease-in-out infinite; }
        }
      `}</style>
    </section>
  );
}
