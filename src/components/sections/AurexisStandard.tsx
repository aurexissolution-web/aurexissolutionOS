"use client";

import {
  Shield,
  Rocket,
  Layers,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface Standard {
  Icon: LucideIcon;
  index: string;
  title: string;
  body: string;
  detail?: string;
}

const HERO: Standard = {
  Icon: Rocket,
  index: "01",
  title: "Speed-to-Market",
  body: 'We don\'t believe in "development hell." Sprints are short, scoped, and shippable — every cycle ends with code in production, never another stakeholder review.',
};

const SUPPORTING: Standard[] = [
  {
    Icon: Shield,
    index: "02",
    title: "Privacy-First",
    body: "Rigorous NDAs and Service Agreements protect your IP from kickoff to handover.",
  },
  {
    Icon: Layers,
    index: "03",
    title: "Scalability",
    body: "Built on modern stacks (Next.js, Supabase, Stripe) that grow with your business.",
  },
];

// ───── MOCKUP 1 — SPRINT CONSOLE ─────

interface ConsoleEvent {
  time: string;
  label: string;
  badge: string;
  tone: "cyan" | "neutral" | "green";
}

const CONSOLE_EVENTS: ConsoleEvent[] = [
  { time: "12:04", label: "git push origin main", badge: "merged", tone: "neutral" },
  { time: "12:05", label: "ci · build started", badge: "running", tone: "neutral" },
  { time: "12:07", label: "tests · 47/47", badge: "passed", tone: "green" },
  { time: "12:08", label: "deploy → production", badge: "LIVE", tone: "cyan" },
];

const TONE_STYLES: Record<ConsoleEvent["tone"], { color: string; bg: string; border: string }> = {
  cyan: {
    color: "var(--color-electric-cyan)",
    bg: "rgba(0,240,255,0.10)",
    border: "rgba(0,240,255,0.30)",
  },
  green: {
    color: "rgb(74, 222, 128)",
    bg: "rgba(74,222,128,0.10)",
    border: "rgba(74,222,128,0.30)",
  },
  neutral: {
    color: "rgba(255,255,255,0.55)",
    bg: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.10)",
  },
};

function SprintConsoleMockup({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/[0.06] bg-black/50 px-5 py-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        </div>
        <span className="font-mono text-[8.5px] uppercase tracking-[0.32em] text-white/30">
          aurexis · sprint-04
        </span>
      </div>

      <div className="space-y-2 font-mono text-[11px] leading-tight md:text-[11.5px]">
        {CONSOLE_EVENTS.map((e, i) => {
          const style = TONE_STYLES[e.tone];
          return (
            <motion.div
              key={i}
              className="flex items-center gap-3"
              initial={reduce ? false : { opacity: 0, x: -6 }}
              animate={
                reduce
                  ? { opacity: 1 }
                  : {
                      opacity: [0, 1, 1, 1, 0.35],
                      x: [-6, 0, 0, 0, 0],
                    }
              }
              transition={{
                duration: 7,
                times: [0, 0.1, 0.5, 0.9, 1],
                repeat: Infinity,
                delay: i * 0.35 + 0.2,
                ease: "easeOut",
              }}
            >
              <span className="text-white/30">{e.time}</span>
              <span className="text-white/70 truncate">{e.label}</span>
              <span
                className="ml-auto shrink-0 rounded-md border px-1.5 py-0.5 text-[8.5px] font-medium uppercase tracking-[0.2em]"
                style={{
                  color: style.color,
                  background: style.bg,
                  borderColor: style.border,
                }}
              >
                {e.badge}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2.5">
        <span className="font-mono text-[8.5px] uppercase tracking-[0.32em] text-white/30">
          ↳ shipped in 4 minutes
        </span>
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-[var(--color-electric-cyan)]"
          animate={
            reduce ? undefined : { opacity: [0.4, 1, 0.4], scale: [0.9, 1.2, 0.9] }
          }
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

// ───── MOCKUP 2 — SEALED CONTRACT ─────

function SealedContractMockup({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/[0.06] bg-black/50 p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-white/40">
          NDA · MUTUAL
        </span>
        <div className="flex items-center gap-1.5 rounded-md border border-[rgba(74,222,128,0.30)] bg-[rgba(74,222,128,0.10)] px-1.5 py-0.5">
          <motion.span
            className="h-1 w-1 rounded-full bg-[rgb(74,222,128)]"
            animate={
              reduce
                ? undefined
                : { opacity: [0.4, 1, 0.4], boxShadow: [
                    "0 0 0 rgba(74,222,128,0)",
                    "0 0 4px rgba(74,222,128,0.8)",
                    "0 0 0 rgba(74,222,128,0)",
                  ] }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="font-mono text-[8px] uppercase tracking-[0.24em] text-[rgb(74,222,128)]">
            Encrypted
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        {[100, 88, 72, 95, 60].map((w, i) => (
          <div
            key={i}
            className="relative h-[5px] overflow-hidden rounded-sm bg-white/[0.06]"
            style={{ width: `${w}%` }}
          >
            {!reduce && (
              <motion.span
                aria-hidden
                className="absolute inset-y-0 w-1/3"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)",
                }}
                initial={{ x: "-100%" }}
                animate={{ x: "300%" }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.18,
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-white/[0.06] pt-3">
        {[
          { who: "Aurexis", role: "Provider" },
          { who: "Client", role: "Recipient" },
        ].map((s) => (
          <div key={s.who} className="space-y-1">
            <div className="font-serif text-[12px] italic text-white/85">
              {s.who}
            </div>
            <div className="flex items-center gap-1.5">
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-[rgb(74,222,128)]">
                <path
                  d="M2 6.5 L5 9 L10 3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-white/40">
                {s.role} · signed
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───── MOCKUP 3 — GROWTH CURVE ─────

function GrowthCurveMockup({ reduce }: { reduce: boolean }) {
  const points = [
    { x: 10, y: 92 },
    { x: 35, y: 80 },
    { x: 60, y: 68 },
    { x: 100, y: 50 },
    { x: 145, y: 32 },
    { x: 190, y: 12 },
  ];
  const pathD = `M ${points[0].x},${points[0].y} ` +
    points.slice(1).map((p, i) => {
      const prev = points[i];
      const cx = (prev.x + p.x) / 2;
      return `Q ${cx},${prev.y} ${p.x},${p.y}`;
    }).join(" ");

  const labels = ["1K", "10K", "100K", "1M"];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/[0.06] bg-black/50 p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-white/40">
          Users · 12mo
        </span>
        <span className="font-mono text-[9px] tracking-[0.24em] text-[var(--color-electric-cyan)]/80">
          ↑ 10× growth
        </span>
      </div>

      <div className="relative mt-3 h-[110px]">
        <svg
          viewBox="0 0 200 100"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(0,240,255)" stopOpacity="0.30" />
              <stop offset="100%" stopColor="rgb(0,240,255)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="growth-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(0,240,255,0.4)" />
              <stop offset="100%" stopColor="rgb(0,240,255)" />
            </linearGradient>
          </defs>

          {[25, 50, 75].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="200"
              y2={y}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="0.5"
              strokeDasharray="2 3"
            />
          ))}

          <motion.path
            d={`${pathD} L 190,100 L 10,100 Z`}
            fill="url(#growth-fill)"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: [0, 0.85, 0.85, 0] }}
            transition={{
              duration: 6,
              times: [0, 0.45, 0.85, 1],
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.3,
            }}
          />

          <motion.path
            d={pathD}
            fill="none"
            stroke="url(#growth-line)"
            strokeWidth="1.6"
            strokeLinecap="round"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
            animate={reduce ? undefined : { pathLength: [0, 1, 1, 0] }}
            transition={{
              duration: 6,
              times: [0, 0.45, 0.85, 1],
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          {points.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="1.6"
              fill="rgb(0,240,255)"
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={
                reduce
                  ? undefined
                  : { opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.6] }
              }
              transition={{
                duration: 6,
                times: [0, 0.45, 0.85, 1],
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.4 + i * 0.18,
              }}
            />
          ))}
        </svg>
      </div>

      <div className="mt-2 flex justify-between font-mono text-[8.5px] uppercase tracking-[0.22em] text-white/30">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

// ───── CARDS ─────

interface HeroCardProps {
  standard: Standard;
  reduce: boolean;
}

function HeroCard({ standard, reduce }: HeroCardProps) {
  const { Icon, index, title, body } = standard;

  return (
    <article className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.045] via-white/[0.02] to-transparent p-6 backdrop-blur-xl transition-[border-color,box-shadow] duration-500 hover:border-[var(--color-electric-cyan)]/30 hover:shadow-[0_30px_60px_-30px_rgba(0,240,255,0.25)] lg:row-span-2 lg:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(0,240,255,0.05), transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(0,71,255,0.04), transparent 55%)",
        }}
      />
      <div className="relative h-[220px] flex-shrink-0 lg:h-[240px]">
        <SprintConsoleMockup reduce={reduce} />
      </div>

      <div className="relative flex flex-1 flex-col">
        <div className="mb-3 flex items-center gap-2.5">
          <Icon
            className="h-[16px] w-[16px] text-[var(--color-electric-cyan)]"
            strokeWidth={1.5}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/35">
            Lead Principle · N° {index}
          </span>
        </div>

        <h4 className="text-[22px] font-medium tracking-[-0.015em] text-white md:text-[24px] lg:text-[26px]">
          {title}
        </h4>
        <p className="mt-2.5 max-w-[46ch] text-[13.5px] leading-[1.55] text-white/65">
          {body}
        </p>

        <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-4">
          {[
            { value: "2 wk", label: "Sprint cycle" },
            { value: "5 d", label: "Deploy cadence" },
            { value: "0", label: "Stale prototypes" },
          ].map((s) => (
            <div key={s.label}>
              <dt className="font-medium text-[20px] leading-none tracking-tight text-white md:text-[22px]">
                {s.value}
              </dt>
              <dd className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.28em] text-white/35">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>

        <a
          href="#"
          className="group/link mt-auto flex items-center gap-2 pt-4 font-mono text-[10.5px] uppercase tracking-[0.32em] text-[var(--color-electric-cyan)]/80 transition-colors hover:text-[var(--color-electric-cyan)]"
          onClick={(e) => e.preventDefault()}
        >
          <span>Learn more</span>
          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1" />
        </a>
      </div>
    </article>
  );
}

interface SmallCardProps {
  standard: Standard;
  reduce: boolean;
  Mockup: ({ reduce }: { reduce: boolean }) => React.ReactElement;
}

function SmallCard({ standard, reduce, Mockup }: SmallCardProps) {
  const { Icon, index, title, body } = standard;

  return (
    <article className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] via-white/[0.015] to-transparent p-5 backdrop-blur-xl transition-[border-color,box-shadow] duration-500 hover:border-[var(--color-electric-cyan)]/30 hover:shadow-[0_24px_48px_-24px_rgba(0,240,255,0.22)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 100% 0%, rgba(0,240,255,0.04), transparent 55%)",
        }}
      />
      <div className="relative h-[130px] flex-shrink-0">
        <Mockup reduce={reduce} />
      </div>

      <div className="relative flex flex-1 flex-col">
        <div className="mb-1.5 flex items-center gap-2.5">
          <Icon
            className="h-4 w-4 text-[var(--color-electric-cyan)]"
            strokeWidth={1.5}
          />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.32em] text-white/35">
            N° {index}
          </span>
        </div>

        <h4 className="text-[17px] font-medium tracking-tight text-white">
          {title}
        </h4>
        <p className="mt-1.5 text-[12px] leading-[1.5] text-white/55">
          {body}
        </p>

        <a
          href="#"
          className="group/link mt-auto flex items-center gap-1.5 pt-2.5 font-mono text-[9.5px] uppercase tracking-[0.32em] text-[var(--color-electric-cyan)]/80 transition-colors hover:text-[var(--color-electric-cyan)]"
          onClick={(e) => e.preventDefault()}
        >
          <span>Learn more</span>
          <ArrowRight className="h-2.5 w-2.5 transition-transform duration-300 group-hover/link:translate-x-1" />
        </a>
      </div>
    </article>
  );
}

export function AurexisStandard() {
  const reduceMotion = useReducedMotion();
  const reduce = reduceMotion === true;

  return (
    <section className="relative bg-[var(--color-background)] py-12 md:py-16 lg:py-16">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-8 max-w-2xl lg:mb-10">
          <div
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[var(--color-electric-cyan)]/15 bg-white/[0.04] px-4 py-2 backdrop-blur-xl"
            style={{
              boxShadow:
                "0 0 28px rgba(0,240,255,0.10), 0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.14)",
            }}
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-electric-cyan)]"
              style={{ boxShadow: "0 0 8px rgba(0,240,255,0.7)" }}
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--color-electric-cyan)]">
              The Aurexis Standard
            </span>
          </div>
          <h3 className="text-3xl font-medium leading-[1.1] tracking-[-0.025em] text-white md:text-4xl lg:text-5xl">
            How we{" "}
            <em
              className="bg-gradient-to-r from-[#A0FFFF] via-[var(--color-electric-cyan)] to-[#0080FF] bg-clip-text font-serif font-normal text-transparent"
              style={{ filter: "drop-shadow(0 0 20px rgba(0,240,255,0.25))" }}
            >
              operate.
            </em>
          </h3>
          <p className="mt-5 max-w-xl text-[14px] leading-[1.6] text-white/55 md:text-[15px]">
            Three principles that govern every project we ship — speed of
            delivery, secrecy of your IP, scale that compounds.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[3fr_2fr] lg:grid-rows-2 lg:gap-6">
          <HeroCard standard={HERO} reduce={reduce} />
          <SmallCard
            standard={SUPPORTING[0]}
            reduce={reduce}
            Mockup={SealedContractMockup}
          />
          <SmallCard
            standard={SUPPORTING[1]}
            reduce={reduce}
            Mockup={GrowthCurveMockup}
          />
        </div>
      </div>
    </section>
  );
}
