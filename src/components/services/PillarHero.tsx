"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { GradientBars } from "@/components/ui/gradient-bars";
import { ConstellationNodes } from "@/components/ui/constellation-nodes";
import type { Pillar } from "@/data/pillars";

/**
 * Atmospheric hero for sub-service pillar pages
 * (`/services/ai-automation`, `/services/web-engineering`,
 * `/services/mobile-ecosystems`).
 *
 * Same structure as `EcosystemFlagshipHero` — gradient bars background,
 * 4 corner constellation nodes (kept multi-colour as the brand-system
 * identity), grain page overlay, serif italic headline with one accent
 * em, and a cream pill primary CTA.
 *
 * Per-pillar accent colour is applied to:
 *   1. Eyebrow dot + pillar label
 *   2. Italic em on the headline (gradient + drop-shadow)
 *   3. Gradient bars background
 *   4. CTA hover glow + focus ring
 */
export function PillarHero({ pillar }: { pillar: Pillar }) {
  const reduceMotion = useReducedMotion();
  const { accent, hero } = pillar;

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
    <section className="pillar-hero relative isolate min-h-[100svh] flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes pillarDotPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.1); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .pillar-hero .pillar-eyebrow-dot {
            animation: pillarDotPulse 1.8s ease-in-out infinite;
          }
        }
        .pillar-cta:hover {
          transform: translateY(-1px);
          box-shadow: ${accent.glow};
        }
      `}</style>

      {/* atmosphere — gradient bars in pillar accent */}
      <GradientBars gradientFrom={accent.hex} />
      {/* constellation: keep all 4 brand colours — system identity */}
      <ConstellationNodes />

      {/* content */}
      <div className="relative z-10 w-full max-w-[64rem] mx-auto px-6 text-center">
        {/* eyebrow */}
        <motion.p
          {...reveal(0.06)}
          aria-label={hero.eyebrowAria}
          className="inline-flex items-center gap-2.5 mb-10 md:mb-12 font-mono text-[11px] uppercase tracking-[0.32em]"
        >
          <span
            aria-hidden
            className="pillar-eyebrow-dot inline-block w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: accent.hex,
              boxShadow: `0 0 12px rgba(${accent.rgb}, 0.9)`,
            }}
          />
          <span style={{ color: accent.hex }}>{hero.eyebrowLabel}</span>
          <span aria-hidden className="text-white/[0.18]">
            ·
          </span>
          <span className="text-[#8E96A6]">{hero.position}</span>
        </motion.p>

        {/* headline */}
        <motion.h1
          {...reveal(0.14)}
          className="font-serif italic font-normal text-[clamp(48px,7vw,112px)] leading-[1.04] tracking-[-0.025em] text-white mb-10 md:mb-12 max-w-[20ch] mx-auto pb-[0.12em]"
        >
          {hero.headlineLead}
          <em
            className="not-italic font-serif italic"
            style={{
              backgroundImage: accent.gradient,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              filter: accent.drop,
            }}
          >
            {hero.headlineEm}
          </em>
          {hero.headlineRest}
        </motion.h1>

        {/* subhead */}
        <motion.p
          {...reveal(0.3)}
          className="max-w-[36rem] mx-auto text-[clamp(16px,1.25vw,19px)] leading-[1.65] text-[#C4CCD9] mb-10 md:mb-12"
        >
          {hero.subhead}
        </motion.p>

        {/* CTA row */}
        <motion.div
          {...reveal(0.38)}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 sm:gap-6"
        >
          <Link
            href={hero.primaryCta.href}
            className="pillar-cta inline-flex items-center justify-center gap-3.5 px-7 py-4 rounded-full bg-white text-[#02030A] font-mono text-[12px] uppercase tracking-[0.22em] font-semibold transition-all duration-[250ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-[#02030A]"
            style={
              {
                "--tw-ring-color": accent.hex,
              } as React.CSSProperties
            }
          >
            {hero.primaryCta.label} <span aria-hidden>→</span>
          </Link>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[#8E96A6]">
            {hero.ctaCaption}
          </span>
        </motion.div>

        {/* mobile-only marker (corner constellation nodes hidden below md) */}
        {hero.mobileMarker && (
          <motion.p
            {...reveal(0.46)}
            className="md:hidden mt-12 border-t border-white/[0.07] pt-6 font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#8E96A6] text-center"
          >
            {hero.mobileMarker}
          </motion.p>
        )}
      </div>

      {/* soft fade to page bg at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-16 z-[3] bg-gradient-to-t from-[#02030A] to-transparent pointer-events-none" />
    </section>
  );
}
