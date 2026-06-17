"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Pillar, ProcessStep } from "@/data/pillars";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * "Process" section for sub-service pillar pages.
 *
 * Mirrors `Process` (used by /services/ecosystem) one-to-one in dimensions
 * and rhythm — same paper-card layout (aside on the left, line-item table
 * on the right), same No./Step/Duration/Fee columns, same "Discovery is on
 * us" total row.
 *
 * The only difference: **pillar accent** (violet / blue / emerald)
 * replaces champagne in 3 places — the "Schedule of Work" badge border +
 * text, the "Free" fee cell, the "thirty-minute call" em phrase in the
 * total row, and the trailing "Free" cell.
 */
export function PillarProcess({ pillar }: { pillar: Pillar }) {
  const reduceMotion = useReducedMotion();
  const reduce = !!reduceMotion;
  const { accent, process } = pillar;

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
      aria-labelledby="pillar-process-heading"
      className="relative isolate w-full"
    >
      <style>{`
        .pp-scope {
          --pp-cream-95: rgba(244, 238, 225, 0.95);
          --pp-cream-85: rgba(244, 238, 225, 0.85);
          --pp-cream-65: rgba(244, 238, 225, 0.65);
          --pp-cream-55: rgba(244, 238, 225, 0.55);
          --pp-cream-45: rgba(244, 238, 225, 0.45);
          --pp-cream-30: rgba(244, 238, 225, 0.30);
          --pp-line:        rgba(244, 238, 225, 0.08);
          --pp-line-strong: rgba(244, 238, 225, 0.18);
          --pp-accent: ${accent.hex};
          --pp-accent-soft: rgba(${accent.rgb}, 0.55);
        }

        .pp-scope .pp-row,
        .pp-scope .pp-headrow,
        .pp-scope .pp-totalrow {
          grid-template-columns: 56px 1fr 180px 96px;
          gap: 16px;
        }

        @media (max-width: 640px) {
          .pp-scope .pp-row,
          .pp-scope .pp-headrow,
          .pp-scope .pp-totalrow {
            grid-template-columns: 36px 1fr 96px;
            gap: 12px;
          }
          .pp-scope .pp-term { display: none; }
        }
      `}</style>

      <div className="pp-scope mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 xl:px-20 pt-10 md:pt-12 lg:pt-14 pb-6 md:pb-7 lg:pb-8">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-y-5 md:gap-x-8 items-end mb-8">
          <div>
            <motion.p
              {...reveal(0)}
              className="font-mono text-[11px] uppercase tracking-[0.32em] mb-4"
              style={{ color: "var(--pp-cream-55)" }}
            >
              <span style={{ color: "var(--pp-cream-45)" }} className="mr-2">
                04
              </span>
              <span style={{ color: "var(--pp-cream-30)" }} className="mr-2">
                /
              </span>
              Process
            </motion.p>
            <motion.h2
              id="pillar-process-heading"
              {...reveal(0.08)}
              className="font-serif italic font-normal m-0 max-w-[22ch]"
              style={{
                color: "var(--pp-cream-95)",
                fontSize: "clamp(1.75rem, 2.8vw, 2.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.018em",
              }}
            >
              The whole engagement, on one page.
            </motion.h2>
          </div>
          <motion.p
            {...reveal(0.16)}
            className="font-serif italic m-0 max-w-[28ch] md:text-right md:self-end"
            style={{
              color: "var(--pp-cream-65)",
              fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              lineHeight: 1.5,
              letterSpacing: "0.005em",
            }}
          >
            Transparent.{" "}
            <em
              className="not-italic"
              style={{ color: "var(--pp-accent)", fontStyle: "italic" }}
            >
              No surprises.
            </em>{" "}
            The map credits to the build.
          </motion.p>
        </div>

        {/* Paper card */}
        <motion.div
          {...(reduce
            ? { initial: false, animate: { opacity: 1, scale: 1, y: 0 } }
            : {
                initial: { opacity: 0, scale: 0.99, y: 8 },
                whileInView: { opacity: 1, scale: 1, y: 0 },
                viewport: { once: true, amount: 0.2 },
                transition: { duration: 0.8, ease: EASE, delay: 0.18 },
              })}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr]"
          style={{ border: "1px solid var(--pp-line)" }}
        >
          {/* Aside */}
          <aside
            className="flex flex-col gap-5 p-7 sm:p-8 lg:p-9 lg:border-r border-b lg:border-b-0"
            style={{ borderColor: "var(--pp-line)" }}
          >
            <span
              className="font-mono text-[9.5px] uppercase tracking-[0.32em] self-start px-2.5 py-1.5"
              style={{
                color: "var(--pp-accent)",
                border: "1px solid var(--pp-accent-soft)",
              }}
            >
              Schedule of Work
            </span>
            <h3
              className="font-serif italic font-normal m-0 leading-[1.04]"
              style={{
                color: "var(--pp-cream-95)",
                fontSize: "clamp(1.625rem, 2.2vw, 2.125rem)",
                letterSpacing: "-0.018em",
              }}
            >
              How we engage.
            </h3>
            <p
              className="font-serif italic m-0 max-w-[32ch]"
              style={{
                color: "var(--pp-cream-65)",
                fontSize: "15px",
                lineHeight: 1.5,
                letterSpacing: "0.005em",
              }}
            >
              {process.description}
            </p>
            <dl
              className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 mt-auto pt-4 font-mono text-[9.5px] uppercase tracking-[0.28em]"
              style={{ borderTop: "1px solid var(--pp-line)" }}
            >
              <dt className="m-0" style={{ color: "var(--pp-cream-45)" }}>
                Term
              </dt>
              <dd className="m-0" style={{ color: "var(--pp-cream-95)" }}>
                {process.termValue}
              </dd>
              <dt className="m-0" style={{ color: "var(--pp-cream-45)" }}>
                Tax
              </dt>
              <dd className="m-0" style={{ color: "var(--pp-cream-95)" }}>
                Excl. SST
              </dd>
              <dt className="m-0" style={{ color: "var(--pp-cream-45)" }}>
                Billing
              </dt>
              <dd className="m-0" style={{ color: "var(--pp-cream-95)" }}>
                Milestones
              </dd>
            </dl>
          </aside>

          {/* Items column */}
          <div className="px-7 py-6 sm:px-8 lg:px-9 lg:py-7 flex flex-col">
            {/* Header row */}
            <motion.div
              {...reveal(0.26)}
              className="pp-headrow grid pb-3 font-mono text-[9px] uppercase tracking-[0.32em]"
              style={{
                borderBottom: "1px solid var(--pp-line-strong)",
                color: "var(--pp-cream-45)",
              }}
            >
              <span>No.</span>
              <span>Step</span>
              <span className="pp-term">Duration</span>
              <span className="text-right">Fee</span>
            </motion.div>

            {/* Line items */}
            {process.steps.map((step, i) => (
              <StepRow
                key={step.index}
                step={step}
                index={i}
                reduce={reduce}
                isLast={i === process.steps.length - 1}
              />
            ))}

            {/* Total / CTA row */}
            <motion.div
              {...reveal(0.62)}
              className="pp-totalrow grid items-baseline pt-4 mt-1"
              style={{ borderTop: "1px solid var(--pp-line-strong)" }}
            >
              <p
                className="font-serif italic m-0"
                style={{
                  color: "var(--pp-cream-65)",
                  fontSize: "15px",
                  lineHeight: 1.4,
                  gridColumn: "1 / span 2",
                }}
              >
                Discovery is on us — start with a{" "}
                <em
                  className="not-italic"
                  style={{
                    color: "var(--pp-accent)",
                    fontStyle: "italic",
                  }}
                >
                  thirty-minute call
                </em>
                .
              </p>
              <span
                className="pp-term font-mono text-[10px] uppercase tracking-[0.28em] self-end"
                style={{ color: "var(--pp-cream-45)" }}
              >
                From
              </span>
              <span
                className="font-mono text-[13px] tracking-[0.04em] text-right whitespace-nowrap"
                style={{ color: "var(--pp-accent)" }}
              >
                Free
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StepRow({
  step,
  index,
  reduce,
  isLast,
}: {
  step: ProcessStep;
  index: number;
  reduce: boolean;
  isLast: boolean;
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
          delay: 0.32 + index * 0.06,
        },
      };

  return (
    <motion.article
      {...reveal}
      className="pp-row grid items-baseline py-4"
      style={{
        borderBottom: isLast ? "none" : "1px solid var(--pp-line)",
      }}
    >
      <span
        className="font-mono text-[11px] uppercase tracking-[0.32em]"
        style={{ color: "var(--pp-cream-45)" }}
      >
        {step.index}
      </span>
      <div>
        <h3
          className="font-serif italic font-normal m-0 leading-[1.1] tracking-[-0.012em]"
          style={{
            color: "var(--pp-cream-95)",
            fontSize: "20px",
          }}
        >
          {step.name}
        </h3>
        <p
          className="font-light text-[12.5px] leading-[1.5] mt-1 m-0 max-w-[36ch]"
          style={{ color: "var(--pp-cream-65)" }}
        >
          {step.sub}
        </p>
      </div>
      <span
        className="pp-term font-mono text-[11px] uppercase tracking-[0.18em]"
        style={{ color: "var(--pp-cream-65)" }}
      >
        {step.term}
      </span>
      <span
        className="font-mono text-[13px] tracking-[0.04em] text-right whitespace-nowrap"
        style={{
          color: step.feeIsAccent
            ? "var(--pp-accent)"
            : "var(--pp-cream-95)",
        }}
      >
        {step.fee}
      </span>
    </motion.article>
  );
}
