"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Monogram } from "./Monogram";
import type { Review } from "@/types/portal";

const SERIF = "var(--font-instrument-serif), ui-serif, Georgia, serif";
const SUPPORTING_EXCERPT_LENGTH = 150;

const headerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const headerItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const supportingContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function VerifiedBadge({
  rating,
  compact,
  className,
}: {
  rating: number;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-white/45",
        compact ? "px-2 py-1 text-[10px]" : "px-2.5 py-1 text-[11px]",
        className
      )}
      aria-label={`Verified client, rated ${rating} out of 5`}
    >
      <BadgeCheck aria-hidden className="h-3.5 w-3.5 text-[var(--color-electric-cyan)]/75" />
      <span className="font-mono text-white/70">{rating.toFixed(1)}</span>
      {!compact && <span>verified</span>}
    </div>
  );
}

function FeaturedCard({ review }: { review: Review }) {
  return (
    <motion.article
      variants={cardVariant}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.03] p-7 transition-all duration-300 hover:border-[var(--color-electric-cyan)]/30 hover:-translate-y-1 focus-within:-translate-y-1 focus-within:border-[var(--color-electric-cyan)]/30 md:p-9"
      style={{
        backgroundImage:
          "radial-gradient(120% 100% at 12% -10%, rgba(0,240,255,0.06), transparent 55%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 48px -24px rgba(0,0,0,0.6)",
      }}
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-electric-cyan)]/80">
          Featured Client
        </span>
        <VerifiedBadge rating={review.rating} />
      </div>

      <div className="mb-2 flex items-center gap-3">
        <Monogram name={review.name} size={44} />
        <div className="min-w-0">
          <cite className="block not-italic text-[15px] font-semibold text-white">{review.name}</cite>
          {review.role && <p className="mt-0.5 text-[13px] text-white/50">{review.role}</p>}
        </div>
      </div>

      {/* quote sits centered in the remaining space so short quotes never
          leave awkward dead air below them */}
      <div className="relative flex flex-1 items-center py-5">
        <blockquote className="text-[17px] leading-[1.65] text-white/85 md:text-[18.5px] lg:text-[20px]">
          <span aria-hidden className="text-[var(--color-electric-cyan)]" style={{ fontFamily: SERIF }}>
            &ldquo;
          </span>
          {review.content}
          <span aria-hidden className="text-[var(--color-electric-cyan)]" style={{ fontFamily: SERIF }}>
            &rdquo;
          </span>
        </blockquote>

        {/* contained decorative glyph — purely textural, never overlaps the quote */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-6 -right-2 select-none text-[110px] leading-none text-white/[0.035]"
          style={{ fontFamily: SERIF }}
        >
          &rdquo;
        </span>
      </div>
    </motion.article>
  );
}

function SupportingCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const quoteId = useId();
  const isLong = review.content.length > SUPPORTING_EXCERPT_LENGTH;
  const text =
    expanded || !isLong
      ? review.content
      : `${review.content.slice(0, SUPPORTING_EXCERPT_LENGTH).trimEnd()}…`;

  return (
    <motion.article
      variants={cardVariant}
      className="group relative flex flex-1 flex-col rounded-2xl border border-white/[0.08] bg-white/[0.022] p-5 transition-all duration-300 hover:border-[var(--color-electric-cyan)]/25 hover:-translate-y-1 focus-within:-translate-y-1 focus-within:border-[var(--color-electric-cyan)]/25 md:p-6"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 16px 32px -20px rgba(0,0,0,0.55)" }}
    >
      <div className="mb-3 flex items-center gap-3">
        <Monogram name={review.name} size={34} />
        <div className="min-w-0 flex-1">
          <cite className="block truncate not-italic text-[13px] font-semibold text-white/90">
            {review.name}
          </cite>
          {review.role && (
            <p className="mt-0.5 truncate text-[11.5px] text-white/45">{review.role}</p>
          )}
        </div>
        <VerifiedBadge rating={review.rating} compact />
      </div>

      <blockquote id={quoteId} className="flex-1 text-[14px] leading-[1.6] text-white/75">
        &ldquo;{text}&rdquo;
      </blockquote>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={quoteId}
          className="mt-3 self-start rounded text-[12px] font-semibold text-[var(--color-electric-cyan)]/80 transition-colors hover:text-[var(--color-electric-cyan)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]/60"
        >
          {expanded ? "Show less" : "Read full story"}
        </button>
      )}
    </motion.article>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-dashed border-white/[0.10] px-6 py-14 text-center">
      <p
        style={{ fontFamily: SERIF, fontStyle: "italic" }}
        className="m-0 text-xl text-white/55"
      >
        First reviews shipping soon.
      </p>
    </div>
  );
}

export function TestimonialsClient({ reviews }: { reviews: Review[] }) {
  const reduceMotion = useReducedMotion() ?? false;

  const [featured, ...rest] = reviews;
  const supporting = rest.slice(0, 2);

  return (
    <div className="relative mx-auto flex max-w-[1200px] flex-col gap-8">
      <motion.div
        className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-6 text-center"
        initial={reduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={headerContainer}
      >
        <motion.span
          variants={headerItem}
          className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40"
        >
          Client Stories
        </motion.span>
        <motion.h2
          variants={headerItem}
          className="text-3xl font-extrabold leading-[1.05] tracking-[-0.02em] text-balance text-white md:text-4xl lg:text-[2.75rem]"
        >
          Trusted by founders and operators.
        </motion.h2>
        <motion.p
          variants={headerItem}
          className="max-w-xl text-[14px] leading-[1.6] text-balance text-white/55 md:text-[15px]"
        >
          Real experiences from businesses that chose to work differently.
        </motion.p>
      </motion.div>

      {!featured ? (
        <EmptyState />
      ) : (
        <motion.div
          className="grid grid-cols-1 gap-4 px-6 lg:grid-cols-12"
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={gridContainer}
        >
          <div className="lg:col-span-7">
            <FeaturedCard review={featured} />
          </div>
          {supporting.length > 0 && (
            <motion.div
              className="flex flex-col gap-4 lg:col-span-5"
              variants={supportingContainer}
            >
              {supporting.map((r) => (
                <SupportingCard key={r.id} review={r} />
              ))}
            </motion.div>
          )}
        </motion.div>
      )}

      <motion.div
        className="flex flex-col items-center gap-5 px-6 pt-2 text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <span
          aria-hidden
          className="h-px w-16 bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-[15px] font-semibold text-black transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05080F] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          Explore Case Studies
          <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
        <Link
          href="/contact#brief"
          className="rounded text-[13px] text-white/50 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]/60"
        >
          Start With an Assessment
        </Link>
      </motion.div>
    </div>
  );
}
