"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Pillar } from "@/data/pillars";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Closing CTA section for sub-service pillar pages.
 *
 * Mirrors `ClosingCTA` (used by /services/ecosystem) one-to-one in layout
 * — same eyebrow, split grid (headline + subhead on the left, pill button +
 * WhatsApp link on the right), and bottom related-row.
 *
 * Differences:
 *   1. **Pillar accent** (violet / blue / emerald) replaces ecosystem cyan in
 *      the headline em phrase, the radial backdrop, the primary button's
 *      hover-glow shadow, the WhatsApp arrow, the related-link hover
 *      underline, and the "Discovery is free" emphasis.
 *   2. Headline + subhead + primary CTA + WhatsApp label + related links
 *      are all driven by per-pillar data.
 */
export function PillarClosingCTA({ pillar }: { pillar: Pillar }) {
  const reduceMotion = useReducedMotion();
  const reduce = !!reduceMotion;
  const { accent, closingCTA } = pillar;

  const reveal = (delay: number) =>
    reduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  return (
    <section
      aria-labelledby="pillar-closing-cta-heading"
      className="relative isolate w-full"
    >
      <style>{`
        .pcta-scope {
          --pcta-cream-95: rgba(244, 238, 225, 0.95);
          --pcta-cream-65: rgba(244, 238, 225, 0.65);
          --pcta-cream-55: rgba(244, 238, 225, 0.55);
          --pcta-cream-45: rgba(244, 238, 225, 0.45);
          --pcta-cream-30: rgba(244, 238, 225, 0.30);
          --pcta-line:        rgba(244, 238, 225, 0.08);
          --pcta-line-strong: rgba(244, 238, 225, 0.18);
          --pcta-accent: ${accent.hex};
          --pcta-accent-glow: rgba(${accent.rgb}, 0.34);
        }

        .pcta-related-link {
          font-family: var(--font-serif), Georgia, serif;
          font-style: italic;
          font-size: 17px;
          color: var(--pcta-cream-95);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s ease;
          letter-spacing: -0.005em;
        }
        .pcta-related-link:hover { border-bottom-color: var(--pcta-accent); }

        .pcta-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 16px 28px;
          border-radius: 9999px;
          background: #FFFFFF;
          color: #02030A;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 600;
          text-decoration: none;
          transition: transform 250ms ease, box-shadow 250ms ease;
        }
        .pcta-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 40px var(--pcta-accent-glow);
        }
        .pcta-primary:focus-visible {
          outline: none;
          box-shadow: 0 0 0 4px #02030A, 0 0 0 6px var(--pcta-accent);
        }
      `}</style>

      {/* soft pillar-accent radial behind the headline area */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1]"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 30% 50%, rgba(${accent.rgb}, 0.04), transparent 70%)`,
        }}
      />

      <div className="pcta-scope mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 xl:px-20 py-12 md:py-14 lg:py-16">
        {/* Eyebrow */}
        <motion.p
          {...reveal(0)}
          className="font-mono text-[11px] uppercase tracking-[0.32em] mb-6"
          style={{ color: "var(--pcta-cream-55)" }}
        >
          <span style={{ color: "var(--pcta-cream-45)" }} className="mr-2">
            07
          </span>
          <span style={{ color: "var(--pcta-cream-30)" }} className="mr-2">
            /
          </span>
          Start a conversation
        </motion.p>

        {/* Split grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center py-8 md:py-9 lg:py-10"
          style={{
            borderTop: "1px solid var(--pcta-line)",
            borderBottom: "1px solid var(--pcta-line)",
          }}
        >
          {/* Left: headline + subhead */}
          <div>
            <motion.h2
              id="pillar-closing-cta-heading"
              {...(reduce
                ? { initial: false, animate: { opacity: 1, y: 0, filter: "blur(0px)" } }
                : {
                    initial: { opacity: 0, y: 14, filter: "blur(6px)" },
                    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
                    viewport: { once: true, amount: 0.3 },
                    transition: { duration: 0.8, ease: EASE, delay: 0.08 },
                  })}
              className="font-serif italic font-normal m-0 mb-5 max-w-[20ch]"
              style={{
                color: "var(--pcta-cream-95)",
                fontSize: "clamp(2rem, 3.6vw, 3.25rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.022em",
              }}
            >
              {closingCTA.headline.lead}
              <em
                className="not-italic"
                style={{
                  color: "var(--pcta-accent)",
                  fontStyle: "italic",
                }}
              >
                {closingCTA.headline.em}
              </em>
              {closingCTA.headline.rest}
            </motion.h2>
            <motion.p
              {...reveal(0.18)}
              className="font-serif italic m-0 max-w-[34ch]"
              style={{
                color: "var(--pcta-cream-65)",
                fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                lineHeight: 1.5,
                letterSpacing: "0.005em",
              }}
            >
              {closingCTA.subhead}
            </motion.p>
          </div>

          {/* Right: CTA stack */}
          <div className="flex flex-col items-start gap-5">
            <motion.div
              {...(reduce
                ? { initial: false, animate: { opacity: 1, scale: 1, y: 0 } }
                : {
                    initial: { opacity: 0, scale: 0.97, y: 8 },
                    whileInView: { opacity: 1, scale: 1, y: 0 },
                    viewport: { once: true, amount: 0.3 },
                    transition: { duration: 0.7, ease: EASE, delay: 0.3 },
                  })}
            >
              <Link href={closingCTA.primary.href} className="pcta-primary">
                {closingCTA.primary.label} <span aria-hidden>→</span>
              </Link>
            </motion.div>
            <motion.a
              {...reveal(0.42)}
              href="https://wa.me/60000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.24em] no-underline transition-[color,gap] duration-[500ms] ease-out hover:gap-3.5"
              style={{ color: "var(--pcta-cream-65)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--pcta-cream-95)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--pcta-cream-65)")
              }
            >
              {closingCTA.whatsappLabel}{" "}
              <span aria-hidden style={{ color: "var(--pcta-accent)" }}>
                →
              </span>
            </motion.a>
          </div>
        </div>

        {/* Related row */}
        <motion.div
          {...reveal(0.54)}
          className="pt-5 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:flex-wrap sm:gap-6"
        >
          <div className="flex items-baseline flex-wrap gap-3">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.32em]"
              style={{ color: "var(--pcta-cream-45)" }}
            >
              Explore
            </span>
            {closingCTA.related.map((link, i) => (
              <span key={link.href} className="inline-flex items-baseline gap-3">
                <Link href={link.href} className="pcta-related-link">
                  {link.label}
                </Link>
                {i < closingCTA.related.length - 1 && (
                  <span style={{ color: "var(--pcta-cream-30)" }}>·</span>
                )}
              </span>
            ))}
          </div>
          <p
            className="font-mono text-[10px] uppercase tracking-[0.32em] m-0"
            style={{ color: "var(--pcta-cream-45)" }}
          >
            Discovery is{" "}
            <span style={{ color: "var(--pcta-accent)" }}>free</span>
            <span className="mx-2.5" style={{ color: "var(--pcta-cream-30)" }}>
              ·
            </span>
            30 min
          </p>
        </motion.div>
      </div>
    </section>
  );
}
