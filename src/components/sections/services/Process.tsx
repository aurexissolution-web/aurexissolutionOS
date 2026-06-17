"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Step = {
  index: string;
  name: string;
  sub: string;
  term: string;
  fee: string;
  feeIsAccent: boolean;
};

const STEPS: Step[] = [
  {
    index: "01",
    name: "Discovery",
    sub: "A walk-through call. No deck, no pitch.",
    term: "30 minutes",
    fee: "Free",
    feeIsAccent: true,
  },
  {
    index: "02",
    name: "Ecosystem Map",
    sub: "Written spec of the four surfaces, integrations, data model, and 90-day plan. Credited to build.",
    term: "2 weeks",
    fee: "— quoted —",
    feeIsAccent: false,
  },
  {
    index: "03",
    name: "Build",
    sub: "All four surfaces designed and shipped together. Weekly Friday demos.",
    term: "3 weeks +",
    fee: "— quoted —",
    feeIsAccent: false,
  },
  {
    index: "04",
    name: "Launch + 30-day support",
    sub: "Docs handed over. We’re on call for a month: bug-fixes, copy tweaks, team training.",
    term: "30 days",
    fee: "Included",
    feeIsAccent: false,
  },
];

function StepRow({
  step,
  index,
  reduce,
  isLast,
}: {
  step: Step;
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
      className="p-row grid items-baseline py-4"
      style={{
        borderBottom: isLast ? "none" : "1px solid var(--p-line)",
      }}
    >
      <span
        className="font-mono text-[11px] uppercase tracking-[0.32em]"
        style={{ color: "var(--p-cream-45)" }}
      >
        {step.index}
      </span>
      <div>
        <h3
          className="font-serif italic font-normal m-0 leading-[1.1] tracking-[-0.012em]"
          style={{
            color: "var(--p-cream-95)",
            fontSize: "20px",
          }}
        >
          {step.name}
        </h3>
        <p
          className="font-light text-[12.5px] leading-[1.5] mt-1 m-0 max-w-[36ch]"
          style={{ color: "var(--p-cream-65)" }}
        >
          {step.sub}
        </p>
      </div>
      <span
        className="p-term font-mono text-[11px] uppercase tracking-[0.18em]"
        style={{ color: "var(--p-cream-65)" }}
      >
        {step.term}
      </span>
      <span
        className="font-mono text-[13px] tracking-[0.04em] text-right whitespace-nowrap"
        style={{
          color: step.feeIsAccent
            ? "var(--p-champagne)"
            : "var(--p-cream-95)",
        }}
      >
        {step.fee}
      </span>
    </motion.article>
  );
}

export function Process() {
  const reduceMotion = useReducedMotion();
  const reduce = !!reduceMotion;

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
      aria-labelledby="process-heading"
      className="relative isolate w-full"
    >
      <style>{`
        .p-scope {
          --p-cream-95: rgba(244, 238, 225, 0.95);
          --p-cream-85: rgba(244, 238, 225, 0.85);
          --p-cream-65: rgba(244, 238, 225, 0.65);
          --p-cream-55: rgba(244, 238, 225, 0.55);
          --p-cream-45: rgba(244, 238, 225, 0.45);
          --p-cream-30: rgba(244, 238, 225, 0.30);
          --p-line:        rgba(244, 238, 225, 0.08);
          --p-line-strong: rgba(244, 238, 225, 0.18);
          --p-champagne: #C9A86A;
          --p-champagne-soft: rgba(201, 168, 106, 0.55);
        }

        .p-scope .p-row,
        .p-scope .p-headrow,
        .p-scope .p-totalrow {
          grid-template-columns: 56px 1fr 180px 96px;
          gap: 16px;
        }

        @media (max-width: 640px) {
          .p-scope .p-row,
          .p-scope .p-headrow,
          .p-scope .p-totalrow {
            grid-template-columns: 36px 1fr 96px;
            gap: 12px;
          }
          .p-scope .p-term { display: none; }
        }
      `}</style>

      <div className="p-scope mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 xl:px-20 py-10 md:py-12 lg:py-14">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-y-5 md:gap-x-8 items-end mb-8">
          <div>
            <motion.p
              {...reveal(0)}
              className="font-mono text-[11px] uppercase tracking-[0.32em] mb-4"
              style={{ color: "var(--p-cream-55)" }}
            >
              <span style={{ color: "var(--p-cream-45)" }} className="mr-2">
                04
              </span>
              <span style={{ color: "var(--p-cream-30)" }} className="mr-2">
                /
              </span>
              Process
            </motion.p>
            <motion.h2
              id="process-heading"
              {...reveal(0.08)}
              className="font-serif italic font-normal m-0 max-w-[22ch]"
              style={{
                color: "var(--p-cream-95)",
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
              color: "var(--p-cream-65)",
              fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              lineHeight: 1.5,
              letterSpacing: "0.005em",
            }}
          >
            Transparent.{" "}
            <em
              className="not-italic"
              style={{
                color: "var(--p-cream-95)",
                fontStyle: "italic",
              }}
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
          style={{ border: "1px solid var(--p-line)" }}
        >
          {/* Aside */}
          <aside
            className="flex flex-col gap-5 p-7 sm:p-8 lg:p-9 lg:border-r border-b lg:border-b-0"
            style={{ borderColor: "var(--p-line)" }}
          >
            <span
              className="font-mono text-[9.5px] uppercase tracking-[0.32em] self-start px-2.5 py-1.5"
              style={{
                color: "var(--p-champagne)",
                border: "1px solid var(--p-champagne-soft)",
              }}
            >
              Schedule of Work
            </span>
            <h3
              className="font-serif italic font-normal m-0 leading-[1.04]"
              style={{
                color: "var(--p-cream-95)",
                fontSize: "clamp(1.625rem, 2.2vw, 2.125rem)",
                letterSpacing: "-0.018em",
              }}
            >
              How we engage.
            </h3>
            <p
              className="font-serif italic m-0 max-w-[32ch]"
              style={{
                color: "var(--p-cream-65)",
                fontSize: "15px",
                lineHeight: 1.5,
                letterSpacing: "0.005em",
              }}
            >
              Four steps from the first call to the day after launch. Discovery
              is free. The Ecosystem Map is yours to keep, and credited to the
              build if we proceed.
            </p>
            <dl
              className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 mt-auto pt-4 font-mono text-[9.5px] uppercase tracking-[0.28em]"
              style={{ borderTop: "1px solid var(--p-line)" }}
            >
              <dt className="m-0" style={{ color: "var(--p-cream-45)" }}>
                Term
              </dt>
              <dd className="m-0" style={{ color: "var(--p-cream-95)" }}>
                10–14 weeks
              </dd>
              <dt className="m-0" style={{ color: "var(--p-cream-45)" }}>
                Tax
              </dt>
              <dd className="m-0" style={{ color: "var(--p-cream-95)" }}>
                Excl. SST
              </dd>
              <dt className="m-0" style={{ color: "var(--p-cream-45)" }}>
                Billing
              </dt>
              <dd className="m-0" style={{ color: "var(--p-cream-95)" }}>
                Milestones
              </dd>
            </dl>
          </aside>

          {/* Items column */}
          <div className="px-7 py-6 sm:px-8 lg:px-9 lg:py-7 flex flex-col">
            {/* Header row */}
            <motion.div
              {...reveal(0.26)}
              className="p-headrow grid pb-3 font-mono text-[9px] uppercase tracking-[0.32em]"
              style={{
                borderBottom: "1px solid var(--p-line-strong)",
                color: "var(--p-cream-45)",
              }}
            >
              <span>No.</span>
              <span>Step</span>
              <span className="p-term">Duration</span>
              <span className="text-right">Fee</span>
            </motion.div>

            {/* Line items */}
            {STEPS.map((step, i) => (
              <StepRow
                key={step.index}
                step={step}
                index={i}
                reduce={reduce}
                isLast={i === STEPS.length - 1}
              />
            ))}

            {/* Total / CTA row */}
            <motion.div
              {...reveal(0.62)}
              className="p-totalrow grid items-baseline pt-4 mt-1"
              style={{ borderTop: "1px solid var(--p-line-strong)" }}
            >
              <p
                className="font-serif italic m-0"
                style={{
                  color: "var(--p-cream-65)",
                  fontSize: "15px",
                  lineHeight: 1.4,
                  gridColumn: "1 / span 2",
                }}
              >
                Discovery is on us — start with a{" "}
                <em
                  className="not-italic"
                  style={{
                    color: "var(--p-cream-95)",
                    fontStyle: "italic",
                  }}
                >
                  thirty-minute call
                </em>
                .
              </p>
              <span
                className="p-term font-mono text-[10px] uppercase tracking-[0.28em] self-end"
                style={{ color: "var(--p-cream-45)" }}
              >
                From
              </span>
              <span
                className="font-mono text-[13px] tracking-[0.04em] text-right whitespace-nowrap"
                style={{ color: "var(--p-cream-95)" }}
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
