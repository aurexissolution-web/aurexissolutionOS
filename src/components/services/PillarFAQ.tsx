"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { FAQSegment, Pillar, PillarFAQItem } from "@/data/pillars";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * FAQ section for sub-service pillar pages.
 *
 * Mirrors `FAQ` (used by /services/ecosystem) one-to-one in layout and
 * rhythm — same 3-column grid at lg+ (numeral / question / answer), same
 * row hairlines, same italic serif typography.
 *
 * The only differences:
 *   1. **Pillar accent** (violet / blue / emerald) replaces champagne
 *      on the big italic numeral and the right-caption em phrase.
 *   2. The headline is data-driven (e.g. "Three honest answers." for
 *      Web, "Four honest answers." for AI / Mobile).
 *
 * Answer-body em phrases stay cream-95 (same as ecosystem) — multiple
 * lines of saturated emphasis would compete with the section accent.
 */
export function PillarFAQ({ pillar }: { pillar: Pillar }) {
  const reduceMotion = useReducedMotion();
  const reduce = !!reduceMotion;
  const { accent, faq } = pillar;

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
      aria-labelledby="pillar-faq-heading"
      className="relative isolate w-full"
    >
      <style>{`
        .pf-scope {
          --pf-cream-95: rgba(244, 238, 225, 0.95);
          --pf-cream-65: rgba(244, 238, 225, 0.65);
          --pf-cream-55: rgba(244, 238, 225, 0.55);
          --pf-cream-45: rgba(244, 238, 225, 0.45);
          --pf-cream-30: rgba(244, 238, 225, 0.30);
          --pf-line:        rgba(244, 238, 225, 0.08);
          --pf-line-strong: rgba(244, 238, 225, 0.18);
          --pf-accent: ${accent.hex};
        }

        /* sm/md: numeral + content stacked (q above a) */
        .pf-row {
          display: grid;
          grid-template-columns: 60px 1fr;
          grid-template-areas:
            "num q"
            "num a";
          column-gap: 24px;
          row-gap: 12px;
        }
        .pf-row .pf-num { grid-area: num; }
        .pf-row .pf-q { grid-area: q; max-width: 32ch; }
        .pf-row .pf-a { grid-area: a; max-width: 64ch; }

        @media (min-width: 640px) {
          .pf-row {
            grid-template-columns: 80px 1fr;
            column-gap: 32px;
            row-gap: 14px;
          }
        }

        /* lg+: 3 columns side by side — numeral / question / answer */
        @media (min-width: 1024px) {
          .pf-row {
            grid-template-columns: 80px minmax(0, 0.9fr) minmax(0, 1.4fr);
            grid-template-areas: "num q a";
            column-gap: 56px;
            row-gap: 0;
            align-items: baseline;
          }
          .pf-row .pf-q { max-width: 24ch; }
          .pf-row .pf-a { max-width: 64ch; }
        }

        @media (min-width: 1280px) {
          .pf-row {
            grid-template-columns: 96px minmax(0, 1fr) minmax(0, 1.45fr);
            column-gap: 72px;
          }
          .pf-row .pf-q { max-width: 22ch; }
          .pf-row .pf-a { max-width: 70ch; }
        }
      `}</style>

      <div className="pf-scope mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 xl:px-20 py-10 md:py-12 lg:py-14">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-y-5 md:gap-x-8 items-end mb-8">
          <div>
            <motion.p
              {...reveal(0)}
              className="font-mono text-[11px] uppercase tracking-[0.32em] mb-4"
              style={{ color: "var(--pf-cream-55)" }}
            >
              <span style={{ color: "var(--pf-cream-45)" }} className="mr-2">
                06
              </span>
              <span style={{ color: "var(--pf-cream-30)" }} className="mr-2">
                /
              </span>
              FAQ
            </motion.p>
            <motion.h2
              id="pillar-faq-heading"
              {...reveal(0.08)}
              className="font-serif italic font-normal m-0 max-w-[22ch]"
              style={{
                color: "var(--pf-cream-95)",
                fontSize: "clamp(1.75rem, 2.8vw, 2.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.018em",
              }}
            >
              {faq.headline}
            </motion.h2>
          </div>
          <motion.p
            {...reveal(0.16)}
            className="font-serif italic m-0 max-w-[28ch] md:text-right md:self-end"
            style={{
              color: "var(--pf-cream-65)",
              fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              lineHeight: 1.5,
              letterSpacing: "0.005em",
            }}
          >
            Asked early.{" "}
            <em
              className="not-italic"
              style={{ color: "var(--pf-accent)", fontStyle: "italic" }}
            >
              Answered plainly.
            </em>
          </motion.p>
        </div>

        {/* Q&A list */}
        <motion.div
          {...(reduce
            ? { initial: false, animate: { opacity: 1, y: 0 } }
            : {
                initial: { opacity: 0, y: 8 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, amount: 0.2 },
                transition: { duration: 0.7, ease: EASE, delay: 0.18 },
              })}
          className="flex flex-col"
          style={{ borderTop: "1px solid var(--pf-line-strong)" }}
        >
          {faq.items.map((item, i) => (
            <FAQRow key={item.index} faq={item} index={i} reduce={reduce} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FAQRow({
  faq,
  index,
  reduce,
}: {
  faq: PillarFAQItem;
  index: number;
  reduce: boolean;
}) {
  const reveal = reduce
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 8 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: {
          duration: 0.55,
          ease: EASE,
          delay: 0.28 + index * 0.08,
        },
      };

  return (
    <motion.article
      {...reveal}
      className="pf-row py-7 sm:py-8 lg:py-10"
      style={{ borderBottom: "1px solid var(--pf-line)" }}
    >
      <span
        className="pf-num font-serif italic font-normal leading-[0.9]"
        style={{
          color: "var(--pf-accent)",
          fontSize: "clamp(2.25rem, 3.6vw, 3.25rem)",
          letterSpacing: "-0.02em",
        }}
      >
        {faq.index}
      </span>
      <h3
        className="pf-q font-serif italic font-normal m-0 leading-[1.18]"
        style={{
          color: "var(--pf-cream-95)",
          fontSize: "clamp(1.375rem, 1.8vw, 1.625rem)",
          letterSpacing: "-0.014em",
        }}
      >
        {faq.question}
      </h3>
      <p
        className="pf-a font-light m-0"
        style={{
          color: "var(--pf-cream-65)",
          fontSize: "15.5px",
          lineHeight: 1.65,
        }}
      >
        <AnswerText segments={faq.answer} />
      </p>
    </motion.article>
  );
}

function AnswerText({ segments }: { segments: FAQSegment[] }) {
  return (
    <>
      {segments.map((seg, i) => (
        <Fragment key={i}>
          {typeof seg === "string" ? (
            seg
          ) : (
            <em
              className="not-italic"
              style={{
                fontFamily: "var(--font-serif), Georgia, serif",
                fontStyle: "italic",
                color: "var(--pf-cream-95)",
                fontWeight: 400,
              }}
            >
              {seg.em}
            </em>
          )}
        </Fragment>
      ))}
    </>
  );
}
