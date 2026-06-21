"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import type { Pillar, PillarBuildItem } from "@/data/pillars";

const EASE = [0.16, 1, 0.3, 1] as const;

interface SubFeatureBodyProps {
  pillar: Pillar;
  item: PillarBuildItem;
  parentHref: string;
  parentLabel: string;
}

export function SubFeatureBody({ pillar, item, parentHref, parentLabel }: SubFeatureBodyProps) {
  const reduceMotion = useReducedMotion();
  const reduce = !!reduceMotion;
  const { accent, whatWeBuild } = pillar;
  const { included, builtFor, slotsIn, faq } = item.detail;

  // Sibling sub-features for the related-row at the bottom
  const siblings = whatWeBuild.items.filter((it) => it.detail.slug !== item.detail.slug).slice(0, 4);

  const reveal = (delay: number) =>
    reduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  return (
    <div className="mx-auto max-w-[1100px] px-6 md:px-10 lg:px-16 pb-24">
      {/* ─── What's Included ─── */}
      <Section index="02" label="What's Included" accent={accent.hex}>
        <motion.ul
          {...reveal(0.06)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-14 gap-y-7 m-0 list-none p-0"
        >
          {included.map((line, i) => (
            <li key={i} className="flex items-start gap-3.5">
              <span
                aria-hidden
                className="mt-[5px] inline-flex items-center justify-center rounded-full shrink-0"
                style={{
                  width: 16,
                  height: 16,
                  background: `rgba(${accent.rgb}, 0.10)`,
                  border: `1px solid rgba(${accent.rgb}, 0.35)`,
                }}
              >
                <Check className="w-2.5 h-2.5" style={{ color: accent.hex }} strokeWidth={3} />
              </span>
              <span
                className="font-light"
                style={{
                  color: "rgba(244, 238, 225, 0.80)",
                  fontSize: 14.5,
                  lineHeight: 1.75,
                  letterSpacing: "0.005em",
                  wordSpacing: "0.04em",
                }}
              >
                {line}
              </span>
            </li>
          ))}
        </motion.ul>
      </Section>

      {/* ─── Built For ─── */}
      <Section index="03" label="Built For" accent={accent.hex}>
        <motion.div {...reveal(0.06)} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {builtFor.map((c, i) => (
            <article
              key={i}
              className="rounded-xl p-6 lg:p-7"
              style={{
                background: "rgba(244, 238, 225, 0.015)",
                border: "1px solid rgba(244, 238, 225, 0.08)",
              }}
            >
              <p
                className="font-mono mb-4"
                style={{
                  fontSize: 9.5,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: accent.hex,
                  margin: 0,
                }}
              >
                Case 0{i + 1}
              </p>
              <h3
                className="font-serif italic m-0 mb-4"
                style={{
                  fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)",
                  lineHeight: 1.3,
                  color: "rgba(244, 238, 225, 0.95)",
                  letterSpacing: "-0.012em",
                }}
              >
                {c.title}.
              </h3>
              <p
                className="font-light"
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.75,
                  color: "rgba(244, 238, 225, 0.65)",
                  margin: 0,
                  letterSpacing: "0.005em",
                  wordSpacing: "0.03em",
                }}
              >
                {c.body}
              </p>
            </article>
          ))}
        </motion.div>
      </Section>

      {/* ─── How It Slots In ─── */}
      <Section index="04" label="How It Slots In" accent={accent.hex}>
        <motion.p
          {...reveal(0.06)}
          className="font-serif italic max-w-[68ch]"
          style={{
            fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)",
            lineHeight: 1.75,
            color: "rgba(244, 238, 225, 0.80)",
            margin: 0,
            letterSpacing: "0.005em",
            wordSpacing: "0.04em",
          }}
        >
          {slotsIn}
        </motion.p>
      </Section>

      {/* ─── FAQ ─── */}
      <Section index="05" label="Honest Answers" accent={accent.hex}>
        <motion.ul {...reveal(0.06)} className="list-none m-0 p-0 space-y-7">
          {faq.map((row, i) => (
            <li
              key={i}
              className="grid grid-cols-1 lg:grid-cols-[60px_minmax(0,0.9fr)_minmax(0,1.4fr)] gap-y-3 lg:gap-x-12 pb-7"
              style={{ borderBottom: i === faq.length - 1 ? "none" : "1px solid rgba(244, 238, 225, 0.06)" }}
            >
              <span
                className="font-serif italic"
                style={{
                  fontSize: "clamp(2rem, 3vw, 2.5rem)",
                  color: accent.hex,
                  filter: accent.drop,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                0{i + 1}
              </span>
              <p
                className="font-serif italic m-0"
                style={{
                  fontSize: "clamp(1.05rem, 1.3vw, 1.25rem)",
                  color: "rgba(244, 238, 225, 0.95)",
                  lineHeight: 1.35,
                  letterSpacing: "-0.005em",
                  maxWidth: "24ch",
                }}
              >
                {row.question}
              </p>
              <p
                className="font-light m-0"
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.8,
                  color: "rgba(244, 238, 225, 0.72)",
                  maxWidth: "64ch",
                  letterSpacing: "0.005em",
                  wordSpacing: "0.04em",
                }}
              >
                {row.answer}
              </p>
            </li>
          ))}
        </motion.ul>
      </Section>

      {/* ─── Closing CTA ─── */}
      <motion.div
        {...reveal(0.06)}
        className="mt-20 rounded-2xl p-8 lg:p-10 text-center"
        style={{
          background: `radial-gradient(80% 100% at 50% 0%, rgba(${accent.rgb}, 0.08), transparent 70%), rgba(244, 238, 225, 0.015)`,
          border: `1px solid rgba(${accent.rgb}, 0.18)`,
        }}
      >
        <p
          className="font-mono mb-4"
          style={{
            fontSize: 10.5,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: accent.hex,
            margin: 0,
          }}
        >
          Talk to us about {item.name.toLowerCase()}
        </p>
        <h2
          className="font-serif italic m-0 mx-auto"
          style={{
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            color: "rgba(244, 238, 225, 0.95)",
            lineHeight: 1.15,
            letterSpacing: "-0.018em",
            maxWidth: "26ch",
          }}
        >
          Ready to see how it would actually slot into your business?
        </h2>
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/contact#brief"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-mono uppercase transition-all hover:-translate-y-0.5"
            style={{
              background: "#FFFFFF",
              color: "#02030A",
              fontSize: 12,
              letterSpacing: "0.22em",
              boxShadow: `0 4px 14px rgba(0,0,0,0.25), 0 0 24px rgba(${accent.rgb}, 0.20)`,
            }}
          >
            Book a Strategy Session
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={parentHref}
            className="inline-flex items-center gap-2 px-4 py-3 group"
            style={{
              fontFamily: "var(--font-mono), ui-monospace, monospace",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(244, 238, 225, 0.55)",
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
        </div>
      </motion.div>

      {/* ─── Related sub-features ─── */}
      {siblings.length > 0 && (
        <div className="mt-20 pt-8" style={{ borderTop: "1px solid rgba(244, 238, 225, 0.08)" }}>
          <p
            className="font-mono mb-6"
            style={{
              fontSize: 10.5,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(244, 238, 225, 0.40)",
              margin: 0,
            }}
          >
            More from {parentLabel}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {siblings.map((sib) => (
              <Link
                key={sib.detail.slug}
                href={`${parentHref}/${sib.detail.slug}`}
                className="group block rounded-lg p-4 transition-all"
                style={{
                  background: "rgba(244, 238, 225, 0.015)",
                  border: "1px solid rgba(244, 238, 225, 0.06)",
                }}
              >
                <p
                  className="font-mono mb-2"
                  style={{
                    fontSize: 9.5,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(244, 238, 225, 0.35)",
                    margin: 0,
                  }}
                >
                  {sib.index} · {sib.eyebrow}
                </p>
                <h4
                  className="font-serif italic m-0 group-hover:translate-x-1 transition-transform"
                  style={{
                    fontSize: 17,
                    color: "rgba(244, 238, 225, 0.90)",
                    lineHeight: 1.25,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {sib.name}.
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Section({
  index,
  label,
  accent,
  children,
}: {
  index: string;
  label: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-20 lg:mt-24">
      <p
        className="font-mono mb-9"
        style={{
          fontSize: 11,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(244, 238, 225, 0.55)",
          margin: 0,
        }}
      >
        <span style={{ color: accent, marginRight: 12 }}>{index}</span>
        <span style={{ color: "rgba(244, 238, 225, 0.30)", marginRight: 12 }}>/</span>
        <span>{label}</span>
      </p>
      {children}
    </section>
  );
}
