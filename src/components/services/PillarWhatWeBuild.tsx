"use client";

import { Fragment } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { CaptionPart, Pillar, PillarBuildItem, PillarSlug } from "@/data/pillars";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * "What we build" section for sub-service pillar pages.
 *
 * Mirrors `WhatWeBuild` (used by /services/ecosystem) one-to-one — same
 * cream/champagne typography, same eyebrow + split header + card grid +
 * footer line. Two differences:
 *
 *   1. The accent (small underline hairline on hover, em phrases in the
 *      caption, "thirty days" in the footer) takes the **pillar accent
 *      hex** (violet / blue / emerald) instead of champagne.
 *   2. There are 5 capability cards instead of 4. The 5th card spans both
 *      columns at lg+ as a capstone row; its description is allowed to run
 *      wider so the card doesn't read as half-empty.
 */
export function PillarWhatWeBuild({ pillar }: { pillar: Pillar }) {
  const reduceMotion = useReducedMotion();
  const reduce = !!reduceMotion;
  const { accent, whatWeBuild } = pillar;

  const reveal = (delay: number) =>
    reduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  return (
    <section
      aria-labelledby="pillar-build-heading"
      className="relative isolate w-full"
    >
      <style>{`
        .pwwb-scope {
          --pwwb-cream-95: rgba(244, 238, 225, 0.95);
          --pwwb-cream-85: rgba(244, 238, 225, 0.85);
          --pwwb-cream-65: rgba(244, 238, 225, 0.65);
          --pwwb-cream-55: rgba(244, 238, 225, 0.55);
          --pwwb-cream-45: rgba(244, 238, 225, 0.45);
          --pwwb-cream-30: rgba(244, 238, 225, 0.30);
          --pwwb-line:       rgba(244, 238, 225, 0.07);
          --pwwb-line-hover: rgba(244, 238, 225, 0.18);
          --pwwb-accent: ${accent.hex};
        }

        .pwwb-card {
          border: 1px solid var(--pwwb-line);
          background: transparent;
          transition: border-color 0.5s ease, background 0.5s ease;
        }
        .pwwb-card:hover {
          border-color: var(--pwwb-line-hover);
          background: rgba(244, 238, 225, 0.014);
        }
        .pwwb-card::after {
          content: "";
          position: absolute;
          left: 36px;
          bottom: 0;
          height: 1px;
          width: 0;
          background: var(--pwwb-accent);
          opacity: 0.6;
          transition: width 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pwwb-card:hover::after { width: 36px; }

        .pwwb-card .pwwb-name {
          transition: letter-spacing 0.7s ease;
        }
        .pwwb-card:hover .pwwb-name {
          letter-spacing: -0.022em;
        }

        .pwwb-card .pwwb-arrow {
          transition: transform 0.5s ease, color 0.5s ease;
        }
        .pwwb-card:hover .pwwb-arrow {
          transform: translateX(4px);
          color: var(--pwwb-accent);
        }

        @media (max-width: 640px) {
          .pwwb-card::after { left: 28px; }
        }
      `}</style>

      <div className="pwwb-scope mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 xl:px-20 py-8 md:py-9 lg:py-10">
        {/* ─── Section header ─── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-y-4 md:gap-x-8 items-end mb-5 lg:mb-7">
          <div>
            <motion.p
              {...reveal(0)}
              className="font-mono text-[10.5px] uppercase tracking-[0.32em] mb-3"
              style={{ color: "var(--pwwb-cream-55)" }}
            >
              <span style={{ color: "var(--pwwb-cream-45)" }} className="mr-2">
                02
              </span>
              <span style={{ color: "var(--pwwb-cream-30)" }} className="mr-2">
                /
              </span>
              What we build
            </motion.p>
            <motion.h2
              id="pillar-build-heading"
              {...reveal(0.08)}
              className="font-serif italic font-normal m-0 max-w-[18ch]"
              style={{
                color: "var(--pwwb-cream-95)",
                fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.018em",
              }}
            >
              {whatWeBuild.headline}
            </motion.h2>
          </div>
          <motion.p
            {...reveal(0.18)}
            className="font-serif italic m-0 max-w-[28ch] md:text-right md:self-end"
            style={{
              color: "var(--pwwb-cream-55)",
              fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
              lineHeight: 1.45,
              letterSpacing: "0.005em",
            }}
          >
            {renderCaption(whatWeBuild.caption)}
          </motion.p>
        </div>

        {/* ─── 5 cards: 2x2 + capstone (lg+) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 mb-5 lg:mb-6">
          {whatWeBuild.items.map((item, i) => (
            <PillarBuildCard
              key={item.index}
              item={item}
              index={i}
              isCapstone={i === whatWeBuild.items.length - 1}
              reduce={reduce}
              pillarSlug={pillar.slug}
            />
          ))}
        </div>

        {/* ─── Footer ─── */}
        <motion.div
          {...reveal(0.5)}
          className="pt-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:flex-wrap sm:gap-8"
          style={{ borderTop: "1px solid var(--pwwb-line)" }}
        >
          <p
            className="font-serif italic m-0"
            style={{
              color: "var(--pwwb-cream-55)",
              fontSize: "14.5px",
              lineHeight: 1.4,
              letterSpacing: "0.005em",
            }}
          >
            Every build closes with{" "}
            <em
              className="not-italic font-serif italic"
              style={{ color: "var(--pwwb-accent)" }}
            >
              thirty days
            </em>{" "}
            of post-launch support, full documentation, and team training.
          </p>
          <p
            className="font-mono text-[10.5px] uppercase tracking-[0.28em] m-0"
            style={{ color: "var(--pwwb-cream-45)" }}
          >
            Included
            <span
              className="mx-2.5"
              style={{ color: "var(--pwwb-cream-30)" }}
              aria-hidden
            >
              ·
            </span>
            30d
            <span
              className="mx-2.5"
              style={{ color: "var(--pwwb-cream-30)" }}
              aria-hidden
            >
              ·
            </span>
            Docs
            <span
              className="mx-2.5"
              style={{ color: "var(--pwwb-cream-30)" }}
              aria-hidden
            >
              ·
            </span>
            Training
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function PillarBuildCard({
  pillarSlug,
  item,
  index,
  isCapstone,
  reduce,
}: {
  item: PillarBuildItem;
  index: number;
  isCapstone: boolean;
  reduce: boolean;
  pillarSlug: PillarSlug;
}) {
  const reveal = reduce
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.7, ease: EASE, delay: 0.16 + index * 0.08 },
      };

  return (
    <motion.article
      {...reveal}
      className={[
        "pwwb-card group relative",
        isCapstone ? "lg:col-span-2" : "",
      ].join(" ")}
    >
    <Link
      href={`/services/${pillarSlug}/${item.detail.slug}`}
      className={[
        "grid grid-rows-[auto_1fr_auto]",
        "min-h-[140px] lg:min-h-[150px]",
        "p-5 sm:p-5 lg:px-6 lg:py-5 overflow-hidden no-underline h-full",
      ].join(" ")}
    >
      {/* Top row: numeral + tag */}
      <div className="flex items-baseline justify-between gap-4">
        <span
          className="font-mono text-[10.5px] uppercase tracking-[0.32em]"
          style={{ color: "var(--pwwb-cream-45)" }}
        >
          {item.index}
          <span
            className="mx-1.5"
            style={{ color: "var(--pwwb-cream-30)" }}
            aria-hidden
          >
            —
          </span>
          {item.eyebrow}
        </span>
        <span
          className="font-mono text-[9.5px] uppercase tracking-[0.32em]"
          style={{ color: "var(--pwwb-cream-30)" }}
        >
          {item.tag}
        </span>
      </div>

      {/* Middle row: serif italic name */}
      <div className="flex items-center pt-3 pb-2">
        <h3
          className="pwwb-name font-serif italic font-normal leading-none m-0"
          style={{
            color: "var(--pwwb-cream-95)",
            fontSize: "clamp(1.4rem, 2vw, 2rem)",
            letterSpacing: "-0.018em",
          }}
        >
          {item.name}.
        </h3>
      </div>

      {/* Bottom row: description + arrow */}
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
        <p
          className={[
            "font-light text-[12.5px] leading-[1.5] m-0",
            isCapstone ? "max-w-[68ch]" : "max-w-[32ch]",
          ].join(" ")}
          style={{ color: "var(--pwwb-cream-55)" }}
        >
          {item.description}
        </p>
        <span
          className="pwwb-arrow font-mono text-[10.5px] uppercase tracking-[0.18em] whitespace-nowrap shrink-0 self-start sm:self-end"
          style={{ color: "var(--pwwb-cream-45)" }}
        >
          View →
        </span>
      </div>
    </Link>
    </motion.article>
  );
}

function renderCaption(parts: CaptionPart[]) {
  return parts.map((part, i) => {
    if (typeof part === "string") {
      return <Fragment key={i}>{part}</Fragment>;
    }
    if ("br" in part) {
      return <br key={i} />;
    }
    return (
      <em
        key={i}
        className="not-italic font-serif italic"
        style={{ color: "var(--pwwb-accent)" }}
      >
        {part.em}
      </em>
    );
  });
}
