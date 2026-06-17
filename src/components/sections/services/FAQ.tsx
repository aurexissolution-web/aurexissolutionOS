"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Segment = string | { em: string };

type FAQItem = {
  index: string;
  question: string;
  answer: Segment[];
};

const FAQS: FAQItem[] = [
  {
    index: "01",
    question: "Do I have to replace all my existing tools?",
    answer: [
      "No. We ",
      { em: "integrate with what works" },
      ", and replace what doesn’t. The Glue Layer is built around your existing stack — your accounting software, your CRM, your booking system stays unless it’s actively breaking the workflow.",
    ],
  },
  {
    index: "02",
    question: "What if I only need 2 of the 4 layers?",
    answer: [
      "You can buy components standalone — see our ",
      { em: "AI" },
      ", ",
      { em: "Web" },
      ", and ",
      { em: "App" },
      " pages. You’ll save money short-term. Most clients ",
      { em: "regret not building it as one system" },
      " later, when the pieces stop talking and the manual bridges return.",
    ],
  },
  {
    index: "03",
    question: "Can you take over a half-built system from another agency?",
    answer: [
      "Sometimes. Depends on the state of the code, the documentation, and what the previous team left behind. We’ll ",
      { em: "tell you honestly" },
      " during scoping — including when the cleanest move is a clean rebuild.",
    ],
  },
];

function AnswerText({ segments }: { segments: Segment[] }) {
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
                color: "var(--f-cream-95)",
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

function FAQRow({
  faq,
  index,
  reduce,
}: {
  faq: FAQItem;
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
      className="f-row py-7 sm:py-8 lg:py-10"
      style={{ borderBottom: "1px solid var(--f-line)" }}
    >
      <span
        className="f-num font-serif italic font-normal leading-[0.9]"
        style={{
          color: "var(--f-champagne)",
          fontSize: "clamp(2.25rem, 3.6vw, 3.25rem)",
          letterSpacing: "-0.02em",
        }}
      >
        {faq.index}
      </span>
      <h3
        className="f-q font-serif italic font-normal m-0 leading-[1.18]"
        style={{
          color: "var(--f-cream-95)",
          fontSize: "clamp(1.375rem, 1.8vw, 1.625rem)",
          letterSpacing: "-0.014em",
        }}
      >
        {faq.question}
      </h3>
      <p
        className="f-a font-light m-0"
        style={{
          color: "var(--f-cream-65)",
          fontSize: "15.5px",
          lineHeight: 1.65,
        }}
      >
        <AnswerText segments={faq.answer} />
      </p>
    </motion.article>
  );
}

export function FAQ() {
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
      aria-labelledby="faq-heading"
      className="relative isolate w-full"
    >
      <style>{`
        .f-scope {
          --f-cream-95: rgba(244, 238, 225, 0.95);
          --f-cream-65: rgba(244, 238, 225, 0.65);
          --f-cream-55: rgba(244, 238, 225, 0.55);
          --f-cream-45: rgba(244, 238, 225, 0.45);
          --f-cream-30: rgba(244, 238, 225, 0.30);
          --f-line:        rgba(244, 238, 225, 0.08);
          --f-line-strong: rgba(244, 238, 225, 0.18);
          --f-champagne: #C9A86A;
        }

        /* sm/md: numeral + content stacked (q above a) */
        .f-row {
          display: grid;
          grid-template-columns: 60px 1fr;
          grid-template-areas:
            "num q"
            "num a";
          column-gap: 24px;
          row-gap: 12px;
        }
        .f-row .f-num { grid-area: num; }
        .f-row .f-q { grid-area: q; max-width: 32ch; }
        .f-row .f-a { grid-area: a; max-width: 64ch; }

        @media (min-width: 640px) {
          .f-row {
            grid-template-columns: 80px 1fr;
            column-gap: 32px;
            row-gap: 14px;
          }
        }

        /* lg+: 3 columns side by side — numeral / question / answer */
        @media (min-width: 1024px) {
          .f-row {
            grid-template-columns: 80px minmax(0, 0.9fr) minmax(0, 1.4fr);
            grid-template-areas: "num q a";
            column-gap: 56px;
            row-gap: 0;
            align-items: baseline;
          }
          .f-row .f-q { max-width: 24ch; }
          .f-row .f-a { max-width: 64ch; }
        }

        @media (min-width: 1280px) {
          .f-row {
            grid-template-columns: 96px minmax(0, 1fr) minmax(0, 1.45fr);
            column-gap: 72px;
          }
          .f-row .f-q { max-width: 22ch; }
          .f-row .f-a { max-width: 70ch; }
        }
      `}</style>

      <div className="f-scope mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 xl:px-20 py-10 md:py-12 lg:py-14">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-y-5 md:gap-x-8 items-end mb-8">
          <div>
            <motion.p
              {...reveal(0)}
              className="font-mono text-[11px] uppercase tracking-[0.32em] mb-4"
              style={{ color: "var(--f-cream-55)" }}
            >
              <span style={{ color: "var(--f-cream-45)" }} className="mr-2">
                06
              </span>
              <span style={{ color: "var(--f-cream-30)" }} className="mr-2">
                /
              </span>
              FAQ
            </motion.p>
            <motion.h2
              id="faq-heading"
              {...reveal(0.08)}
              className="font-serif italic font-normal m-0 max-w-[22ch]"
              style={{
                color: "var(--f-cream-95)",
                fontSize: "clamp(1.75rem, 2.8vw, 2.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.018em",
              }}
            >
              Three honest answers.
            </motion.h2>
          </div>
          <motion.p
            {...reveal(0.16)}
            className="font-serif italic m-0 max-w-[28ch] md:text-right md:self-end"
            style={{
              color: "var(--f-cream-65)",
              fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              lineHeight: 1.5,
              letterSpacing: "0.005em",
            }}
          >
            Asked early.{" "}
            <em
              className="not-italic"
              style={{
                color: "var(--f-cream-95)",
                fontStyle: "italic",
              }}
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
          style={{ borderTop: "1px solid var(--f-line-strong)" }}
        >
          {FAQS.map((faq, i) => (
            <FAQRow key={faq.index} faq={faq} index={i} reduce={reduce} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
