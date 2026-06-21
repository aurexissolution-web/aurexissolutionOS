"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { Pillar, PillarBuildItem } from "@/data/pillars";

const EASE = [0.16, 1, 0.3, 1] as const;

interface SubFeatureHeroProps {
  pillar: Pillar;
  item: PillarBuildItem;
  parentHref: string;
  parentLabel: string;
}

export function SubFeatureHero({ pillar, item, parentHref, parentLabel }: SubFeatureHeroProps) {
  const reduceMotion = useReducedMotion();
  const reduce = !!reduceMotion;
  const { accent } = pillar;

  const reveal = (delay: number) =>
    reduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  return (
    <section className="relative isolate w-full pt-28 md:pt-36 lg:pt-40 pb-12 md:pb-14">
      {/* radial wash in the pillar's accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(60% 70% at 50% 10%, rgba(${accent.rgb}, 0.10), transparent 70%)`,
        }}
      />

      <div className="mx-auto max-w-[1100px] px-6 md:px-10 lg:px-16">
        {/* Breadcrumb + back link */}
        <motion.div
          {...reveal(0)}
          className="flex items-center gap-3 mb-8"
        >
          <Link
            href={parentHref}
            className="inline-flex items-center gap-2 group"
            style={{
              fontFamily: "var(--font-mono), ui-monospace, monospace",
              fontSize: 10.5,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(244, 238, 225, 0.45)",
              transition: "color 0.3s ease",
            }}
          >
            <ArrowLeft
              className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5"
              style={{ color: accent.hex }}
            />
            <span className="group-hover:text-[rgba(244,238,225,0.85)] transition-colors">
              Back to {parentLabel}
            </span>
          </Link>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          {...reveal(0.06)}
          className="mb-6"
          style={{
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            fontSize: 11,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(244, 238, 225, 0.55)",
            margin: 0,
          }}
        >
          <span style={{ color: accent.hex, marginRight: 10 }}>{item.index}</span>
          <span style={{ color: "rgba(244, 238, 225, 0.30)", marginRight: 10 }}>/</span>
          <span style={{ color: "rgba(244, 238, 225, 0.45)" }}>{item.eyebrow}</span>
          <span style={{ color: "rgba(244, 238, 225, 0.20)", margin: "0 10px" }}>·</span>
          <span style={{ color: "rgba(244, 238, 225, 0.30)" }}>{item.tag}</span>
        </motion.p>

        {/* Title */}
        <motion.h1
          {...reveal(0.12)}
          className="m-0 font-serif italic font-normal leading-[1.02] tracking-[-0.02em]"
          style={{
            color: "rgba(244, 238, 225, 0.95)",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          }}
        >
          {item.name}
          <span style={{ color: accent.hex, filter: accent.drop }}>.</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          {...reveal(0.18)}
          className="mt-7 max-w-[58ch] font-serif italic"
          style={{
            color: "rgba(244, 238, 225, 0.65)",
            fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
            lineHeight: 1.7,
            letterSpacing: "0.005em",
            wordSpacing: "0.04em",
            margin: 0,
          }}
        >
          {item.detail.tagline}
        </motion.p>

        {/* Hairline */}
        <motion.div
          {...reveal(0.26)}
          className="mt-10 h-px w-full"
          style={{
            background: `linear-gradient(to right, transparent, rgba(${accent.rgb}, 0.35), transparent)`,
          }}
        />
      </div>
    </section>
  );
}
