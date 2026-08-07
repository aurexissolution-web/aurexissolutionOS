"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Stage = {
  number: string;
  name: string;
  headline: string;
  description: string;
  receives: string[];
};

const STAGES: Stage[] = [
  {
    number: "01",
    name: "Discover",
    headline: "Understand how your business really works.",
    description:
      "We begin by listening. We map how work moves through your business, where friction appears, and what your team actually needs.",
    receives: [
      "Discovery workshop",
      "Goals and constraints",
      "Current-state overview",
      "Priority problem definition",
    ],
  },
  {
    number: "02",
    name: "Assess",
    headline: "Identify the opportunities with the greatest impact.",
    description:
      "We examine your processes, tools and information flow to find the improvements that will create meaningful operational value.",
    receives: [
      "Process and systems assessment",
      "Opportunity map",
      "Recommended roadmap",
      "Clear scope and estimate",
    ],
  },
  {
    number: "03",
    name: "Build & Connect",
    headline: "Turn the right opportunities into one connected system.",
    description:
      "We design, configure and connect the solution around your operations—then test it carefully before it goes live.",
    receives: [
      "Configured solution",
      "System integrations",
      "Testing and documentation",
      "Team handover and training",
    ],
  },
  {
    number: "04",
    name: "Operate & Improve",
    headline: "Keep the system reliable as the business grows.",
    description:
      "We support, monitor, optimise and expand the system as your operations, customers and priorities evolve.",
    receives: [
      "Ongoing support",
      "System optimisation",
      "Performance reviews",
      "Future improvements and expansion",
    ],
  },
];

const LAST_INDEX = STAGES.length - 1;
const AUTO_ADVANCE_MS = 5000;
const AUTO_TICK_MS = 200;
const ENTRANCE_LINE_MS = 900;
const ENTRANCE_LINE_DELAY_MS = 300;
const ENTRANCE_TOTAL_MS = ENTRANCE_LINE_DELAY_MS + ENTRANCE_LINE_MS + 300;

// Ensures the intro choreography plays only once per page load, even if the
// section briefly unmounts/remounts (e.g. fast scroll or route cache).
let hasPlayedEntrance = false;

const headerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const headerItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function ReceivesList({ items, animate }: { items: string[]; animate: boolean }) {
  return (
    <motion.ul
      className="flex flex-col gap-2.5"
      initial={animate ? "hidden" : false}
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
    >
      {items.map((r) => (
        <motion.li
          key={r}
          variants={{
            hidden: { opacity: 0, y: 6 },
            show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
          }}
          className="flex items-baseline gap-2.5 text-[13.5px] leading-[1.5] text-white/75"
        >
          <span aria-hidden className="select-none text-[var(--color-electric-cyan)]/80">
            ›
          </span>
          {r}
        </motion.li>
      ))}
    </motion.ul>
  );
}

function StageDetail({
  stage,
  id,
  labelledBy,
  animateList,
}: {
  stage: Stage;
  id?: string;
  labelledBy?: string;
  animateList: boolean;
}) {
  return (
    <div
      id={id}
      role={id ? "tabpanel" : undefined}
      aria-labelledby={labelledBy}
      tabIndex={id ? 0 : undefined}
      className="relative grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] lg:gap-14 focus-visible:outline-none"
    >
      <div>
        <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-electric-cyan)]/70">
          Stage {stage.number} — {stage.name}
        </span>
        <h3 className="text-xl font-semibold leading-[1.2] tracking-[-0.01em] text-white lg:text-2xl">
          {stage.headline}
        </h3>
        <p className="mt-3 max-w-xl text-[14px] leading-[1.6] text-white/60">{stage.description}</p>
      </div>
      <div>
        <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
          Client receives
        </span>
        <ReceivesList items={stage.receives} animate={animateList} />
      </div>
    </div>
  );
}

export function HowAurexisWorks() {
  const reduceMotion = useReducedMotion() ?? false;
  const [stageState, setStageState] = useState({ active: 0, prev: 0 });
  const [entranceDone, setEntranceDone] = useState(reduceMotion || hasPlayedEntrance);
  const [ctaPulse, setCtaPulse] = useState(false);
  const { active, prev: prevActive } = stageState;

  const interacted = useRef(false);
  const pausedRef = useRef(false);
  const ctaAnimatedRef = useRef(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-20% 0px -20% 0px" });

  const goTo = useCallback((i: number) => {
    interacted.current = true;
    setStageState((s) => ({ prev: s.active, active: i }));
  }, []);

  // Entrance choreography — runs once per page load, skipped entirely for
  // reduced motion (final state renders immediately in that case).
  useEffect(() => {
    if (reduceMotion || !inView || entranceDone) return;
    hasPlayedEntrance = true;
    const t = window.setTimeout(() => setEntranceDone(true), ENTRANCE_TOTAL_MS);
    return () => window.clearTimeout(t);
  }, [inView, reduceMotion, entranceDone]);

  // Story mode — auto-advance every 5s after entrance, pausing on hover/
  // focus/hidden-tab, stopping permanently on manual interaction, and never
  // looping past the final stage.
  useEffect(() => {
    if (reduceMotion || !entranceDone) return;
    let remaining = AUTO_ADVANCE_MS;
    const id = window.setInterval(() => {
      if (interacted.current) {
        window.clearInterval(id);
        return;
      }
      if (pausedRef.current || document.hidden) return;
      remaining -= AUTO_TICK_MS;
      if (remaining <= 0) {
        setStageState((s) => {
          if (s.active >= LAST_INDEX) {
            window.clearInterval(id);
            return s;
          }
          return { prev: s.active, active: s.active + 1 };
        });
        remaining = AUTO_ADVANCE_MS;
      }
    }, AUTO_TICK_MS);
    return () => window.clearInterval(id);
  }, [entranceDone, reduceMotion]);

  // One-time CTA attention sweep the moment the final stage first activates.
  useEffect(() => {
    if (active === LAST_INDEX && !ctaAnimatedRef.current) {
      ctaAnimatedRef.current = true;
      setCtaPulse(true);
      const t = window.setTimeout(() => setCtaPulse(false), 1300);
      return () => window.clearTimeout(t);
    }
  }, [active]);

  const pause = useCallback(() => {
    pausedRef.current = true;
  }, []);
  const resume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
      let target: number | null = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") target = (i + 1) % STAGES.length;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") target = (i - 1 + STAGES.length) % STAGES.length;
      else if (e.key === "Home") target = 0;
      else if (e.key === "End") target = LAST_INDEX;
      if (target === null) return;
      e.preventDefault();
      goTo(target);
      tabRefs.current[target]?.focus();
    },
    [goTo]
  );

  const progress = active / LAST_INDEX;
  const prevProgress = prevActive / LAST_INDEX;
  const stage = STAGES[active];
  const lineDrawn = entranceDone;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="how-aurexis-works-heading"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
      className="relative overflow-hidden bg-[var(--color-background)] px-6 py-16 md:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center lg:mb-16"
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={headerContainer}
        >
          <motion.span
            variants={headerItem}
            className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40"
          >
            How Aurexis Works
          </motion.span>
          <motion.h2
            variants={headerItem}
            id="how-aurexis-works-heading"
            className="mb-3 text-3xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white text-balance md:text-4xl lg:text-[2.75rem]"
          >
            From business problem to{" "}
            <em
              className="font-serif font-normal italic text-[var(--color-electric-cyan)]"
              style={{ filter: "drop-shadow(0 0 18px rgba(0,240,255,0.32))" }}
            >
              connected system.
            </em>
          </motion.h2>
          <motion.p
            variants={headerItem}
            className="mx-auto max-w-2xl text-[14px] leading-[1.6] text-white/55 text-balance md:text-[15px]"
          >
            We understand how your business currently operates, identify the highest-impact
            opportunities, and build the right system around your goals.
          </motion.p>
        </motion.div>

        {/* Desktop — horizontal connected process */}
        <div className="hidden lg:block">
          <div className="relative h-4">
            {/* neutral track — draws in on entrance */}
            <motion.div
              aria-hidden
              className="absolute inset-x-0 top-[7px] h-px origin-left bg-white/[0.08]"
              initial={reduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: ENTRANCE_LINE_MS / 1000, delay: ENTRANCE_LINE_DELAY_MS / 1000, ease: "easeOut" }}
            />
            {/* cyan fill — reflects stage progress once the track has drawn */}
            {lineDrawn && (
              <div
                aria-hidden
                className="absolute inset-x-0 top-[7px] h-px origin-left bg-[var(--color-electric-cyan)]/70 transition-transform duration-700 ease-out motion-reduce:transition-none"
                style={{ transform: `scaleX(${progress})` }}
              />
            )}
            {/* traveling pulse between the previous and newly selected stage */}
            {lineDrawn && !reduceMotion && (
              <motion.div
                key={active}
                aria-hidden
                className="absolute top-[3px] h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-[var(--color-electric-cyan)]"
                style={{ boxShadow: "0 0 10px rgba(0,240,255,0.9), 0 0 18px rgba(0,240,255,0.5)" }}
                initial={{ left: `${prevProgress * 100}%`, opacity: 1 }}
                animate={{ left: `${progress * 100}%`, opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            )}
            {/* soft ambient glow following the active stage */}
            {lineDrawn && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute top-1/2 h-24 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-electric-cyan)]/10 blur-2xl"
                animate={{ left: `${progress * 100}%` }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            )}

            <ol role="tablist" aria-label="Aurexis process stages" className="relative grid h-4 grid-cols-4">
              {STAGES.map((s, i) => {
                const revealDelay =
                  ENTRANCE_LINE_DELAY_MS / 1000 + (ENTRANCE_LINE_MS / 1000) * (i / LAST_INDEX);
                return (
                  <li key={s.number} className="relative">
                    <motion.span
                      aria-hidden
                      className="absolute left-0 top-1/2 block h-3.5 w-3.5 -translate-y-1/2"
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: reduceMotion ? 0 : revealDelay, ease: "easeOut" }}
                    >
                      <motion.span
                        key={i === active ? `pulse-${active}` : "static"}
                        className={cn(
                          "block h-3.5 w-3.5 rounded-full border bg-[var(--color-background)] transition-colors duration-300 motion-reduce:transition-none",
                          i < active && "border-[var(--color-electric-cyan)]/60 bg-[var(--color-electric-cyan)]/20",
                          i === active &&
                            "border-[var(--color-electric-cyan)] bg-[var(--color-electric-cyan)] shadow-[0_0_12px_rgba(0,240,255,0.35)]",
                          i > active && "border-white/25"
                        )}
                        animate={i === active && !reduceMotion ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </motion.span>
                  </li>
                );
              })}
            </ol>
          </div>

          <ol className="relative mt-3 grid grid-cols-4">
            {STAGES.map((s, i) => (
              <li key={s.number}>
                <button
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`haw-tab-${s.number}`}
                  aria-selected={i === active}
                  aria-controls="haw-detail"
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => goTo(i)}
                  onKeyDown={(e) => handleTabKeyDown(e, i)}
                  className="group flex w-full flex-col items-start gap-2 pr-8 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] rounded-md"
                >
                  <span
                    className={cn(
                      "font-mono text-[10px] tracking-[0.28em] transition-colors duration-300",
                      i === active ? "text-[var(--color-electric-cyan)]/80" : "text-white/35"
                    )}
                  >
                    {s.number}
                  </span>
                  <span
                    className={cn(
                      "text-[15px] font-semibold tracking-[-0.01em] transition-colors duration-300",
                      i === active ? "text-white" : "text-white/45 group-hover:text-white/70"
                    )}
                  >
                    {s.name}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "h-px w-7 transition-colors duration-300",
                      i === active ? "bg-[var(--color-electric-cyan)]" : "bg-white/[0.12] group-hover:bg-white/25"
                    )}
                  />
                </button>
              </li>
            ))}
          </ol>

          <div
            aria-live="polite"
            className={cn(
              "relative mt-12 overflow-hidden rounded-[16px] border bg-white/[0.02] px-10 py-9 backdrop-blur-sm transition-colors duration-500",
              "border-white/[0.08]"
            )}
          >
            {/* faint system-line grid texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 32px)",
              }}
            />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                className="relative"
                initial={reduceMotion ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <StageDetail
                  stage={stage}
                  id="haw-detail"
                  labelledBy={`haw-tab-${stage.number}`}
                  animateList={!reduceMotion}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile / tablet — vertical accordion stepper */}
        <ol className="relative lg:hidden">
          <div aria-hidden className="absolute bottom-3 left-[6.5px] top-3 w-px bg-white/[0.08]" />
          <div
            aria-hidden
            className="absolute bottom-3 left-[6.5px] top-3 w-px origin-top bg-[var(--color-electric-cyan)]/70 transition-transform duration-700 ease-out motion-reduce:transition-none"
            style={{ transform: `scaleY(${progress})` }}
          />
          {STAGES.map((s, i) => (
            <li key={s.number} className="relative pb-8 pl-9 last:pb-0">
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-1 block h-3.5 w-3.5 rounded-full border bg-[var(--color-background)] transition-colors duration-300",
                  i < active && "border-[var(--color-electric-cyan)]/60 bg-[var(--color-electric-cyan)]/20",
                  i === active && "border-[var(--color-electric-cyan)] bg-[var(--color-electric-cyan)]",
                  i > active && "border-white/25"
                )}
              />
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-expanded={i === active}
                aria-controls={`haw-stage-${s.number}`}
                className="flex w-full items-baseline gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] rounded-md"
              >
                <span
                  className={cn(
                    "font-mono text-[10px] tracking-[0.28em]",
                    i === active ? "text-[var(--color-electric-cyan)]/80" : "text-white/35"
                  )}
                >
                  {s.number}
                </span>
                <span
                  className={cn(
                    "text-[15px] font-semibold tracking-[-0.01em] transition-colors duration-300",
                    i === active ? "text-white" : "text-white/50"
                  )}
                >
                  {s.name}
                </span>
              </button>
              {reduceMotion ? (
                i === active && (
                  <div id={`haw-stage-${s.number}`} className="pt-4">
                    <StageDetail stage={s} animateList={false} />
                  </div>
                )
              ) : (
                <AnimatePresence initial={false}>
                  {i === active && (
                    <motion.div
                      id={`haw-stage-${s.number}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4">
                        <StageDetail stage={s} animateList />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </li>
          ))}
        </ol>

        <motion.div
          className="mt-14 flex flex-col items-center gap-6 text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="max-w-xl text-[15px] leading-[1.6] text-white/65 text-balance md:text-base">
            Your transformation does not begin with more software. It begins with{" "}
            <em
              className="font-serif font-normal italic text-[var(--color-electric-cyan)]"
              style={{ filter: "drop-shadow(0 0 14px rgba(0,240,255,0.28))" }}
            >
              understanding what your business actually needs.
            </em>
          </p>
          <Link
            href="/contact#brief"
            className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-2.5 text-[15px] font-semibold text-black transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            {ctaPulse && !reduceMotion && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[var(--color-electric-cyan)]/40 to-transparent"
                initial={{ x: "-120%" }}
                animate={{ x: "320%" }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              />
            )}
            <span className="relative">Start With an Assessment</span>
            <ArrowRight aria-hidden className="relative h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
