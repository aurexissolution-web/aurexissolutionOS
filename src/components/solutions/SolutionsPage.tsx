"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  Plus,
  Check,
  CircleDot,
  Workflow,
  RefreshCw,
  Search,
  Target,
  Puzzle,
  Cpu,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProblemTabs } from "@/components/ui/problem-tabs";
import { DarkGradientBg } from "@/components/ui/elegant-dark-pattern";
import {
  SOLUTIONS_ITEMS,
  SOLUTIONS_DISCOVERY_PANEL,
} from "@/data/navigation";
import {
  SOLUTION_DETAILS,
  PROBLEM_SCENARIOS,
  PRINCIPLES,
  PROCESS,
  ECOSYSTEM_CAPABILITIES,
  FAQS,
} from "@/data/solutions";

const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white text-balance md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] leading-[1.6] text-white/55 md:text-[16px]">
          {description}
        </p>
      )}
    </div>
  );
}

function SectionShell({
  id,
  children,
  className,
  surface = "plain",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  surface?: "plain" | "muted" | "grid" | "beam";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden border-t border-white/[0.08] px-6 py-20 md:py-28",
        surface === "muted" && "bg-white/[0.014]",
        className
      )}
    >
      {surface === "grid" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.028)_1px,transparent_1px)] [background-size:104px_104px] [mask-image:radial-gradient(ellipse_at_50%_0%,black_24%,transparent_82%)]"
        />
      )}
      {surface === "beam" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,240,255,0.11),transparent_64%)]"
        />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
      />
      <div className="relative z-10 mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function CyanCta({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--color-electric-cyan)] px-6 py-3 text-[14px] font-semibold text-[#020408] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(0,240,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
    className
  );
  return href.startsWith("#") ? (
    <a href={href} className={classes}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function GhostButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 rounded-full border border-white/[0.14] bg-white/[0.03] px-6 py-3 text-[14px] font-semibold text-white backdrop-blur-md transition-all hover:bg-white/[0.07] hover:border-white/[0.25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]/60"
    >
      {children}
      <ArrowRight className="h-4 w-4 text-[var(--color-electric-cyan)] transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — HERO
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  const reduce = useReducedMotion() ?? false;
  return (
    <DarkGradientBg>
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-36 pb-24 md:pt-44 md:pb-32 lg:pt-52 lg:pb-40">
        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-electric-cyan)]/15 bg-white/[0.04] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-electric-cyan)] backdrop-blur-xl">
              <CircleDot className="h-3 w-3" />
              Aurexis Solutions
            </span>
          </Reveal>

          <Reveal delay={0.05} className="mt-8">
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white text-balance md:text-6xl lg:text-7xl">
              Start with the{" "}
              <em
                className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
                style={{ filter: "drop-shadow(0 0 22px rgba(0,240,255,0.32))" }}
              >
                problem
              </em>
              , not the software.
            </h1>
          </Reveal>

          <Reveal delay={0.1} className="mt-6">
            <p className="mx-auto max-w-2xl text-[17px] leading-[1.6] text-white/55 md:text-[19px]">
              Aurexis identifies what is slowing your business down, then chooses
              the right engagement to fix it — one process, one system, or an
              ongoing partnership.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10">
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CyanCta href={SOLUTIONS_DISCOVERY_PANEL.buttonHref}>
                {SOLUTIONS_DISCOVERY_PANEL.buttonLabel}
              </CyanCta>
              <a
                href="#problem-finder"
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/[0.14] bg-white/[0.03] px-6 py-3 text-[14px] font-semibold text-white backdrop-blur-md transition-all hover:bg-white/[0.07] hover:border-white/[0.25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]/60"
              >
                Find your fit
                <ArrowDown className="h-4 w-4 text-[var(--color-electric-cyan)] transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-4">
            <p className="text-[12px] text-white/35">
              {SOLUTIONS_DISCOVERY_PANEL.supportingText}
            </p>
          </Reveal>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            className="mt-16"
          >
            <div className="relative mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3 md:gap-4">
              {SOLUTIONS_ITEMS.map((item, i) => (
                <a
                  key={item.href}
                  href={`#${item.href.replace("/solutions/", "")}`}
                  className="group relative flex items-center gap-2.5 rounded-full border border-white/[0.10] bg-white/[0.04] px-4 py-2.5 text-[13px] font-semibold text-white/85 backdrop-blur-md transition-all hover:border-[var(--color-electric-cyan)]/40 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]/60"
                >
                  <span className="font-mono text-[11px] tracking-wider text-[var(--color-electric-cyan)]/90">
                    {item.stage}
                  </span>
                  <span>{item.title.replace("™", "")}</span>
                  {i < SOLUTIONS_ITEMS.length - 1 && (
                    <span className="hidden text-white/25 md:inline-flex md:pl-1">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </DarkGradientBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — WHAT IS SLOWING YOUR BUSINESS DOWN?
// ─────────────────────────────────────────────────────────────────────────────
function ProblemFinder() {
  const problems = PROBLEM_SCENARIOS.map((s, i) => ({
    id: `problem-${i}`,
    stage: s.stage,
    title: s.title,
    problem: s.problem,
    signals: s.signals,
    recommendationTitle: s.recommendationTitle,
    recommendationDescription: s.recommendationDescription,
    whyThisFits: s.whyThisFits,
    firstLook: s.firstLook,
    visualType: s.visualType,
    recommendations: s.recommendations,
    icon: [Search, Target, Workflow, Puzzle, Cpu, RefreshCw][i],
  }));

  return (
    <SectionShell id="problem-finder" surface="grid">
      {/* Top cyan radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(0,240,255,0.10),transparent_55%)]"
      />

      {/* Subtle perspective grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:112px_112px] [mask-image:radial-gradient(ellipse_at_50%_0%,black_30%,transparent_85%)]"
      />

      {/* Curved system paths + nodes */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]"
        viewBox="0 0 2000 700"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pf-path-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,240,255,0)" />
            <stop offset="50%" stopColor="rgba(0,240,255,0.35)" />
            <stop offset="100%" stopColor="rgba(0,240,255,0)" />
          </linearGradient>
        </defs>
        <path
          d="M0 320 Q 300 140 600 320 T 1200 320 T 1800 320 T 2400 320"
          fill="none"
          stroke="url(#pf-path-cyan)"
          strokeWidth="1.5"
        />
        <path
          d="M0 480 Q 400 660 800 480 T 1600 480 T 2400 480"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
        <circle cx="600" cy="320" r="3" fill="rgba(0,240,255,0.55)" />
        <circle cx="1200" cy="320" r="2.5" fill="rgba(0,240,255,0.45)" />
        <circle cx="800" cy="480" r="2.5" fill="rgba(255,255,255,0.25)" />
        <circle cx="1600" cy="480" r="3" fill="rgba(255,255,255,0.3)" />
      </svg>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(320px,0.45fr)] lg:items-end">
        <SectionHeader
          eyebrow="What is slowing your business down?"
          title={
            <>
              Recognise your{" "}
              <em
                className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
                style={{ filter: "drop-shadow(0 0 20px rgba(0,240,255,0.3))" }}
              >
                situation
              </em>
              .
            </>
          }
          description="Choose the situation closest to your business. We’ll show you the most sensible starting point."
        />
        <Reveal delay={0.08}>
          <div className="rounded-2xl border border-[var(--color-electric-cyan)]/18 bg-[var(--color-electric-cyan)]/[0.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-electric-cyan)]/75">
              Signal, fit, next move
            </p>
            <p className="mt-3 text-[13.5px] leading-[1.65] text-white/62">
              This finder is not a quiz. It is a quick way to compare your operational signal with the engagement that usually makes the most sense.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-14">
        <ProblemTabs
          problems={problems}
          solutions={SOLUTIONS_ITEMS}
          defaultId={problems[0]?.id}
        />
      </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — THE FOUR ENGAGEMENTS
// ─────────────────────────────────────────────────────────────────────────────
function SolutionsOverview() {
  const reduce = useReducedMotion() ?? false;
  const verbs = [
    { verb: "Assess", icon: Search },
    { verb: "Improve", icon: Target },
    { verb: "Connect", icon: Puzzle },
    { verb: "Operate", icon: RefreshCw },
  ];

  return (
    <SectionShell id="solutions-overview" surface="muted">
      <SectionHeader
        eyebrow="The four Aurexis engagements"
        title={
          <>
            Assess, improve, connect,{" "}
            <em
              className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
              style={{ filter: "drop-shadow(0 0 20px rgba(0,240,255,0.3))" }}
            >
              operate
            </em>
            .
          </>
        }
        description="A business can start where its problem actually is. Each engagement is a different scale of intervention."
        align="center"
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SOLUTIONS_ITEMS.map((item, i) => {
          const { verb, icon: Icon } = verbs[i];
          const slug = item.href.replace("/solutions/", "");
          return (
            <motion.div
              key={item.href}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl transition hover:border-white/[0.16] hover:bg-white/[0.05]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-electric-cyan)]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
              />
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-electric-cyan)]/30 bg-[var(--color-electric-cyan)]/[0.08] text-[var(--color-electric-cyan)]">
                <Icon className="h-5 w-5" />
              </div>
              <span className="mt-5 block font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
                {item.stage} — {verb}
              </span>
              <h3 className="mt-2 text-[18px] font-bold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.55] text-white/55">
                {item.description}
              </p>
              <a
                href={`#${slug}`}
                className="mt-5 inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--color-electric-cyan)] transition-colors hover:text-white"
              >
                Explore {verb}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          );
        })}
      </div>

      <Reveal delay={0.2} className="mt-10 text-center">
        <p className="mx-auto max-w-2xl text-[14px] leading-[1.65] text-white/45">
          Businesses do not have to buy all four. They can enter wherever the
          problem is and expand only when it makes sense.
        </p>
      </Reveal>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTIONS 4–7 — SOLUTION DETAILS
// ─────────────────────────────────────────────────────────────────────────────
function SolutionBody({
  item,
  index,
  children,
}: {
  item: (typeof SOLUTIONS_ITEMS)[number];
  index: number;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion() ?? false;
  const detail = SOLUTION_DETAILS[item.href];
  const isEven = index % 2 === 0;

  return (
    <SectionShell
      id={item.href.replace("/solutions/", "")}
      surface={isEven ? "plain" : "muted"}
    >
        <div
          className={cn(
            "grid gap-10 lg:grid-cols-2 lg:items-stretch",
            isEven ? "lg:grid-cols-[1fr_1.1fr]" : "lg:grid-cols-[1.1fr_1fr]"
          )}
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, x: isEven ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: EASE }}
            className={cn("order-2", isEven ? "lg:order-1" : "lg:order-2")}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-electric-cyan)]/35 bg-[var(--color-electric-cyan)]/[0.08] font-mono text-[13px] text-[var(--color-electric-cyan)]">
                {item.stage}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-electric-cyan)]/75">
                {detail.eyebrow}
              </span>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold leading-[1.03] tracking-[-0.025em] text-white text-balance md:text-5xl">
              {item.title}
            </h2>
            <p className="mt-5 max-w-2xl text-[16px] leading-[1.75] text-white/66 md:text-[17px]">
              {detail.longDescription}
            </p>
            <div className="mt-7 rounded-2xl border border-white/[0.08] bg-black/20 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/38">
                Architecture note
              </p>
              <p className="mt-3 text-[14px] leading-[1.65] text-white/58">
                Best fit: {detail.forWho}
              </p>
              <p className="mt-2 text-[13px] leading-[1.6] text-white/42">
                Expected engagement shape: {detail.scope}.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CyanCta href={SOLUTIONS_DISCOVERY_PANEL.buttonHref}>
                {detail.nextStep}
              </CyanCta>
              <GhostButton href="#problem-finder">Compare Fit</GhostButton>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, x: isEven ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
            className={cn("order-1", isEven ? "lg:order-2" : "lg:order-1")}
          >
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-white/[0.10] bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.015)_42%,rgba(0,240,255,0.035))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl md:p-8">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-electric-cyan)]/50 to-transparent"
              />
              {children}
              <div className="solution-proof-strip mt-8 grid gap-2 border-t border-white/[0.08] pt-5 sm:grid-cols-2">
                {detail.outcomes.slice(0, 4).map((outcome) => (
                  <div
                    key={outcome}
                    className="flex gap-2.5 rounded-xl border border-white/[0.065] bg-black/20 p-3 text-[12.5px] leading-[1.45] text-white/60"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-electric-cyan)]" />
                    {outcome}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
    </SectionShell>
  );
}

function AssessmentBody() {
  const detail = SOLUTION_DETAILS["/solutions/business-systems-assessment"];
  return (
    <>
      <h3 className="text-[14px] font-semibold uppercase tracking-[0.16em] text-white/60">
        {detail.body.label}
      </h3>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {detail.body.items.map((it) => (
          <li
            key={it}
            className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3.5 py-3 text-[13.5px] text-white/75"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-electric-cyan)]" />
            {it}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-[13px] leading-[1.6] text-white/45">
        Outcome: a commercial roadmap, not a free consulting report.
      </p>
      <a
        href="/solutions/business-systems-assessment"
        className="mt-5 group inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--color-electric-cyan)] transition-colors hover:text-white"
      >
        Explore the Assessment
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </a>
    </>
  );
}

function FocusedBody() {
  const detail = SOLUTION_DETAILS["/solutions/focused-improvement"];
  return (
    <>
      <h3 className="text-[14px] font-semibold uppercase tracking-[0.16em] text-white/60">
        {detail.body.label}
      </h3>
      <div className="mt-5 flex flex-wrap gap-2">
        {detail.body.items.map((it) => (
          <span
            key={it}
            className="rounded-full border border-white/[0.10] bg-white/[0.04] px-3.5 py-1.5 text-[13px] text-white/80"
          >
            {it}
          </span>
        ))}
      </div>
      <p className="mt-6 text-[15px] leading-[1.65] text-white/60">
        Core philosophy: start focused, solve something meaningful, demonstrate
        value, then expand only where it makes sense.
      </p>
    </>
  );
}

function ControlBody() {
  const detail = SOLUTION_DETAILS["/solutions/business-control-system"];
  return (
    <>
      <h3 className="text-[14px] font-semibold uppercase tracking-[0.16em] text-white/60">
        {detail.body.label}
      </h3>
      <div className="mt-5 flex flex-wrap gap-2">
        {detail.body.items.map((it) => (
          <span
            key={it}
            className="rounded-full border border-[var(--color-electric-cyan)]/20 bg-[var(--color-electric-cyan)]/[0.05] px-3.5 py-1.5 text-[13px] text-[var(--color-electric-cyan)]/90"
          >
            {it}
          </span>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
        <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-white/50">
          Not this
        </p>
        <p className="mt-2 text-[13px] leading-[1.6] text-white/45">
          Not an ERP. Not a CRM. Not a collection of modules. A Business Control
          System™ is designed around how your business actually works.
        </p>
      </div>
    </>
  );
}

function ManagedBody() {
  const detail = SOLUTION_DETAILS["/solutions/managed-operations"];
  return (
    <>
      <h3 className="text-[14px] font-semibold uppercase tracking-[0.16em] text-white/60">
        {detail.body.label}
      </h3>
      <ul className="mt-5 space-y-3">
        {detail.body.items.map((it) => (
          <li
            key={it}
            className="flex items-center gap-3 text-[14px] leading-[1.5] text-white/75"
          >
            <RefreshCw className="h-4 w-4 shrink-0 text-[var(--color-electric-cyan)]/70" />
            {it}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-[15px] leading-[1.65] text-white/60">
        The business continues evolving, so its systems should evolve with it.
      </p>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 7 — WHICH SOLUTION FITS?
// ─────────────────────────────────────────────────────────────────────────────
function WhichSolution() {
  const reduce = useReducedMotion() ?? false;
  return (
    <SectionShell surface="beam">
        <SectionHeader
          eyebrow="Which solution fits?"
          title={
            <>
              Match the problem to the{" "}
              <em
                className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
                style={{ filter: "drop-shadow(0 0 20px rgba(0,240,255,0.3))" }}
              >
                right
              </em>{" "}
              engagement.
            </>
          }
          description="A simple decision support guide for the four Aurexis Solutions."
          align="center"
        />

        <div className="mt-14 overflow-hidden rounded-[28px] border border-white/[0.10] bg-black/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]">
          <div className="hidden grid-cols-[0.8fr_1.05fr_1.05fr_0.85fr] border-b border-white/[0.08] bg-white/[0.035] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35 lg:grid">
            <span>Solution</span>
            <span>Signal</span>
            <span>Fit</span>
            <span>Next move</span>
          </div>
          {SOLUTIONS_ITEMS.map((item, i) => {
            const detail = SOLUTION_DETAILS[item.href];
            return (
              <motion.a
                key={item.href}
                href={`#${item.href.replace("/solutions/", "")}`}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
                className="group relative grid gap-5 border-b border-white/[0.08] p-5 transition last:border-b-0 hover:bg-white/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-electric-cyan)]/55 lg:grid-cols-[0.8fr_1.05fr_1.05fr_0.85fr] lg:items-center"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-electric-cyan)]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                />
                <div>
                  <span className="font-mono text-[12px] tracking-[0.18em] text-[var(--color-electric-cyan)]/75">
                    {item.stage}
                  </span>
                  <h3 className="mt-2 text-[17px] font-bold leading-[1.2] text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[14px] leading-[1.6] text-white/58">{detail.tagline}</p>
                <p className="text-[13px] leading-[1.55] text-white/62">{detail.forWho}</p>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-electric-cyan)] transition-colors group-hover:text-white">
                  {detail.nextStep}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </motion.a>
            );
          })}
        </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 8 — HOW THE SOLUTIONS CAN CONNECT
// ─────────────────────────────────────────────────────────────────────────────
function SolutionsJourney() {
  const reduce = useReducedMotion() ?? false;
  return (
    <SectionShell surface="plain">
        <SectionHeader
          eyebrow="How the solutions can connect"
          title={
            <>
              A possible journey, not a{" "}
              <em
                className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
                style={{ filter: "drop-shadow(0 0 20px rgba(0,240,255,0.3))" }}
              >
                requirement
              </em>
              .
            </>
          }
          description="Clients can enter at any point. The right starting place depends on your situation."
        />

        {/* Desktop — animated journey path */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="solution-journey-spine relative mt-16 hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-8 md:block"
        >
          <div className="relative grid grid-cols-4 gap-4">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="absolute left-[12.5%] right-[12.5%] top-[22px] h-[2px] origin-left"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-electric-cyan), rgba(0,240,255,0.3), var(--color-electric-cyan))",
              }}
            />
            {SOLUTIONS_ITEMS.map((item, i) => {
              const detail = SOLUTION_DETAILS[item.href];
              return (
                <div key={item.href} className="relative flex flex-col items-center text-center">
                  <motion.div
                    initial={reduce ? false : { scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, ease: EASE, delay: 0.1 + i * 0.12 }}
                    className="z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-electric-cyan)]/40 bg-[var(--color-electric-cyan)]/[0.1] font-mono text-[13px] text-[var(--color-electric-cyan)] shadow-[0_0_20px_rgba(0,240,255,0.15)]"
                  >
                    {item.stage}
                  </motion.div>
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, ease: EASE, delay: 0.2 + i * 0.12 }}
                    className="mt-6 w-full rounded-2xl border border-white/[0.08] bg-black/20 p-5 backdrop-blur-xl transition-colors hover:border-[var(--color-electric-cyan)]/20"
                  >
                    <h3 className="text-[16px] font-bold text-white">
                      {item.title.replace("™", "")}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.55] text-white/55">
                      {detail.tagline}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
          <p className="mt-10 text-center text-[13px] text-white/35">
            Not every business follows this order. The sequence depends on where you are.
          </p>
        </motion.div>

        {/* Mobile */}
        <div className="solution-journey-spine mt-10 space-y-4 md:hidden">
          {SOLUTIONS_ITEMS.map((item, i) => (
            <motion.div
              key={item.href}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.05 }}
              className="flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-electric-cyan)]/40 bg-[var(--color-electric-cyan)]/[0.08] font-mono text-[13px] text-[var(--color-electric-cyan)]">
                {item.stage}
              </span>
              <div>
                <h3 className="text-[15px] font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-[13px] text-white/55">
                  {SOLUTION_DETAILS[item.href].tagline}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
    </SectionShell>
  );
}

function FragmentedVisual() {
  const nodes = [
    { label: "WhatsApp", x: 50, y: 70 },
    { label: "Email", x: 140, y: 50 },
    { label: "Spreadsheets", x: 240, y: 70 },
    { label: "CRM", x: 70, y: 155 },
    { label: "Documents", x: 220, y: 155 },
    { label: "Reports", x: 145, y: 190 },
  ];
  const links = [
    [0, 1],
    [1, 2],
    [0, 3],
    [2, 4],
    [3, 5],
    [4, 5],
    [1, 5],
  ];
  return (
    <svg viewBox="0 0 320 240" className="mt-6 h-48 w-full md:h-56">
      {links.map(([a, b], i) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="1"
          strokeDasharray={i === 2 || i === 6 ? "2 6" : "4 6"}
        />
      ))}
      {nodes.map((n) => (
        <g key={n.label}>
          <circle
            cx={n.x}
            cy={n.y}
            r={22}
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
          />
          <text
            x={n.x}
            y={n.y + 3}
            textAnchor="middle"
            fontSize="9"
            fontWeight="500"
            fill="rgba(255,255,255,0.60)"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function ConnectedVisual() {
  const center = { x: 180, y: 120 };
  const nodes = ECOSYSTEM_CAPABILITIES.map((cap, i) => {
    const angle = (i * 60 - 90) * (Math.PI / 180);
    const r = 78;
    return {
      ...cap,
      x: center.x + r * Math.cos(angle),
      y: center.y + r * Math.sin(angle),
    };
  });
  return (
    <svg viewBox="0 0 360 240" className="mt-6 h-48 w-full md:h-56">
      <circle
        cx={center.x}
        cy={center.y}
        r={36}
        fill="rgba(0,240,255,0.08)"
        stroke="rgba(0,240,255,0.45)"
        strokeWidth="1.5"
      />
      <text
        x={center.x}
        y={center.y + 4}
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill="rgba(255,255,255,0.85)"
      >
        Aurexis
      </text>
      {nodes.map((n) => (
        <g key={n.name}>
          <line
            x1={center.x}
            y1={center.y}
            x2={n.x}
            y2={n.y}
            stroke="rgba(0,240,255,0.20)"
            strokeWidth="1.2"
          />
          <circle
            cx={n.x}
            cy={n.y}
            r={16}
            fill="rgba(0,240,255,0.06)"
            stroke="rgba(0,240,255,0.30)"
            strokeWidth="1"
          />
          <text
            x={n.x}
            y={n.y + 3}
            textAnchor="middle"
            fontSize="8"
            fontWeight="500"
            fill="rgba(255,255,255,0.70)"
          >
            {n.name.replace("™", "")}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 10 — FROM FRAGMENTED TO CONNECTED
// ─────────────────────────────────────────────────────────────────────────────
function FragmentedToConnected() {
  const reduce = useReducedMotion() ?? false;
  return (
    <SectionShell id="fragmented-to-connected" surface="grid">
      <SectionHeader
        eyebrow="From fragmented to connected"
        title={
          <>
            Integrate what works. Improve what doesn't. Build only what is{" "}
            <em
              className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
              style={{ filter: "drop-shadow(0 0 20px rgba(0,240,255,0.3))" }}
            >
              necessary
            </em>
            .
          </>
        }
        description="Aurexis does not replace every tool. The goal is a better operation, not maximum software replacement."
        align="center"
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="relative overflow-hidden rounded-[28px] border border-white/[0.10] bg-black/20 p-6 backdrop-blur-xl md:p-8"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            Before
          </span>
          <h3 className="mt-2 text-[22px] font-bold text-white">Fragmented</h3>
          <p className="mt-2 text-[14px] leading-[1.6] text-white/55">
            Work and information move through disconnected tools, manual
            handoffs and repeated effort.
          </p>
          <FragmentedVisual />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          className="relative overflow-hidden rounded-[28px] border border-white/[0.10] bg-[linear-gradient(145deg,rgba(0,240,255,0.05),rgba(255,255,255,0.015)_42%)] p-6 shadow-[inset_0_1px_0_rgba(0,240,255,0.08)] backdrop-blur-xl md:p-8"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-electric-cyan)]/70">
            After
          </span>
          <h3 className="mt-2 text-[22px] font-bold text-white">Connected</h3>
          <p className="mt-2 text-[14px] leading-[1.6] text-white/55">
            The right information and workflows flow through a coherent system
            designed around the business.
          </p>
          <ConnectedVisual />
        </motion.div>
      </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 11 — THE AUREXIS TECH ECOSYSTEM
// ─────────────────────────────────────────────────────────────────────────────
function EcosystemTeaser() {
  const reduce = useReducedMotion() ?? false;
  return (
    <SectionShell surface="muted">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow="The Aurexis Tech Ecosystem"
              title={
                <>
                  Capabilities that power the{" "}
                  <em
                    className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
                    style={{
                      filter: "drop-shadow(0 0 20px rgba(0,240,255,0.3))",
                    }}
                  >
                    solutions
                  </em>
                  .
                </>
              }
              description="Solutions are what we deliver. The Tech Ecosystem is the set of capabilities we combine to deliver them."
            />
            <Reveal delay={0.1} className="mt-8">
              <GhostButton href="/tech-ecosystem">
                Explore the Tech Ecosystem
              </GhostButton>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {ECOSYSTEM_CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.name}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: EASE, delay: i * 0.05 }}
                className="rounded-2xl border border-white/[0.08] bg-black/20 p-5 backdrop-blur-xl transition hover:border-[var(--color-electric-cyan)]/22 hover:bg-white/[0.035]"
              >
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-[var(--color-electric-cyan)]" />
                  <h3 className="text-[14px] font-bold text-white">
                    {cap.name}
                  </h3>
                </div>
                <p className="mt-2 text-[13px] leading-[1.55] text-white/55">
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 10 — HOW AUREXIS APPROACHES BUSINESS SYSTEMS
// ─────────────────────────────────────────────────────────────────────────────
function Principles() {
  const reduce = useReducedMotion() ?? false;
  const icons = [
    Search,
    Target,
    Puzzle,
    Workflow,
    Sparkles,
    Cpu,
    RefreshCw,
  ];

  return (
    <SectionShell surface="beam">
        <SectionHeader
          eyebrow="How Aurexis approaches business systems"
          title={
            <>
              Principles that keep the work{" "}
              <em
                className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(0,240,255,0.3))",
                }}
              >
                useful
              </em>
              .
            </>
          }
          description="Technology supports the outcomes. The outcomes come first."
          align="center"
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={p.title}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: EASE, delay: i * 0.04 }}
                className="bg-[#05070d] p-6 transition hover:bg-[#071015]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.04] text-[var(--color-electric-cyan)]">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-[16px] font-bold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-white/55">
                  {p.description}
                </p>
              </motion.div>
            );
          })}
        </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 11 — HOW AN ENGAGEMENT MOVES FORWARD
// ─────────────────────────────────────────────────────────────────────────────
function Process() {
  const reduce = useReducedMotion() ?? false;
  return (
    <SectionShell surface="plain">
        <SectionHeader
          eyebrow="How an engagement moves forward"
          title={
            <>
              A structured method, not a{" "}
              <em
                className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(0,240,255,0.3))",
                }}
              >
                black box
              </em>
              .
            </>
          }
          description="Every Aurexis engagement follows the same clear sequence — from understanding to continuous improvement."
          align="center"
        />

        <div className="relative mt-14 grid gap-6 rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-6 md:grid-cols-3 lg:grid-cols-6">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="absolute left-4 right-4 top-[19px] hidden h-[2px] origin-left md:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-electric-cyan), var(--color-electric-cyan), transparent)",
            }}
          />
          {PROCESS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.2 + i * 0.08 }}
              className="relative"
            >
              <motion.span
                initial={reduce ? false : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, ease: EASE, delay: 0.2 + i * 0.08 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-electric-cyan)]/30 bg-[var(--color-electric-cyan)]/[0.08] font-mono text-[13px] text-[var(--color-electric-cyan)]"
              >
                {String(i + 1).padStart(2, "0")}
              </motion.span>
              <h3 className="mt-4 text-[16px] font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-white/55">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
    </SectionShell>
  );
}

function CaseStudyField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-white/[0.06] pb-3 last:border-0 last:pb-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
        {label}
      </p>
      <p className="mt-1 text-[14px] leading-[1.55] text-white/65">{value}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 12 — PROOF / CASE STUDIES
// ─────────────────────────────────────────────────────────────────────────────
function Proof() {
  return (
    <SectionShell surface="muted">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <SectionHeader
            eyebrow="Proof / Case Studies"
            title={
              <>
                Real work. Real{" "}
                <em
                className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(0,240,255,0.3))",
                }}
              >
                outcomes
              </em>
                .
              </>
            }
            description="Verified Aurexis work — business type, problem, solution, capabilities used and what changed."
          />
          <Reveal delay={0.1} className="mt-6">
            <p className="max-w-lg text-[15px] leading-[1.65] text-white/60">
              Case studies are published only when we have verified outcomes and
              client permission. The structure below is how we document Aurexis
              work.
            </p>
            <div className="mt-6">
              <GhostButton href="/portfolio">View Case Studies</GhostButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-electric-cyan)]/70">
              Case-study format
            </p>
            <div className="mt-5 grid gap-4">
              <CaseStudyField
                label="Business type"
                value="Verified client industry and size"
              />
              <CaseStudyField
                label="Original problem"
                value="What was slowing the business down"
              />
              <CaseStudyField
                label="Aurexis Solution"
                value="Assessment, Focused Improvement, Business Control System or Managed Operations"
              />
              <CaseStudyField
                label="Tech Ecosystem capabilities"
                value="Presence, Flow, Core, Connect, Data Foundation, Intelligence"
              />
              <CaseStudyField
                label="What changed"
                value="The specific operational or system improvement"
              />
              <CaseStudyField
                label="Verified outcome"
                value="The measured or observed result"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 13 — FAQ
// ─────────────────────────────────────────────────────────────────────────────
function FAQRow({
  q,
  a,
  idx,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  idx: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div
      className={cn(
        "border-b border-white/[0.08]",
        isOpen && "bg-gradient-to-b from-[var(--color-electric-cyan)]/[0.04] to-transparent"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "flex w-full items-center justify-between gap-4 py-6 text-left transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]/60"
        )}
      >
        <span className="flex items-baseline gap-4">
          <span className="font-mono text-[12px] tracking-[0.18em] text-white/35">
            {String(idx).padStart(2, "0")}
          </span>
          <span className="text-[16px] font-semibold leading-[1.3] text-white md:text-[18px]">
            {q}
          </span>
        </span>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all",
            isOpen
              ? "border-[var(--color-electric-cyan)]/60 text-[var(--color-electric-cyan)] rotate-45"
              : "border-white/[0.12] text-white/50"
          )}
        >
          <Plus className="h-3.5 w-3.5" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-10 pr-10 md:pl-12">
              <p className="max-w-3xl text-[15px] leading-[1.7] text-white/60 md:text-[16px]">
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);
  const reduce = useReducedMotion() ?? false;
  return (
    <SectionShell surface="plain">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="FAQ"
          title={
            <>
              Practical answers about{" "}
              <em
                className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(0,240,255,0.3))",
                }}
              >
                choosing
              </em>{" "}
              a Solution.
            </>
          }
          align="center"
        />

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="mt-14"
        >
          {FAQS.map((faq, i) => (
            <FAQRow
              key={i}
              q={faq.q}
              a={faq.a}
              idx={i + 1}
              isOpen={openId === i}
              onToggle={() => setOpenId(openId === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 14 — FINAL CTA
// ─────────────────────────────────────────────────────────────────────────────
function FinalCta() {
  return (
    <SectionShell surface="beam" className="border-t-0">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.10] bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-8 text-center backdrop-blur-2xl md:p-14">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-electric-cyan)]/60 to-transparent"
            />
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-electric-cyan)]/80">
              Not sure where to begin?
            </span>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white text-balance md:text-4xl lg:text-5xl">
              Tell us what is slowing the{" "}
              <em
                className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
                style={{
                  filter: "drop-shadow(0 0 22px rgba(0,240,255,0.32))",
                }}
              >
                business
              </em>{" "}
              down.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.6] text-white/60">
              Aurexis will confirm whether there is a good fit and identify the
              most sensible next step.
            </p>
            <div className="mt-8">
              <CyanCta href={SOLUTIONS_DISCOVERY_PANEL.buttonHref}>
                {SOLUTIONS_DISCOVERY_PANEL.buttonLabel}
              </CyanCta>
            </div>
            <p className="mt-4 text-[12px] text-white/35">
              {SOLUTIONS_DISCOVERY_PANEL.supportingText}
            </p>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function SolutionsPage() {
  return (
    <main className="flex-1 overflow-hidden">
      <Hero />
      <ProblemFinder />
      <SolutionsOverview />
      {SOLUTIONS_ITEMS.map((item, i) => (
        <SolutionBody key={item.href} item={item} index={i}>
          {item.href === "/solutions/business-systems-assessment" && <AssessmentBody />}
          {item.href === "/solutions/focused-improvement" && <FocusedBody />}
          {item.href === "/solutions/business-control-system" && <ControlBody />}
          {item.href === "/solutions/managed-operations" && <ManagedBody />}
        </SolutionBody>
      ))}
      <WhichSolution />
      <SolutionsJourney />
      <FragmentedToConnected />
      <EcosystemTeaser />
      <Principles />
      <Process />
      <Proof />
      <FAQ />
      <FinalCta />
    </main>
  );
}
