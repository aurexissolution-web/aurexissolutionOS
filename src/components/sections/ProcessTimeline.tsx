"use client";

import {
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

type Step = {
  number: string;
  title: string;
  meta: string;
  detail: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Discovery",
    meta: "1–2 weeks · scoped, no fee",
    detail:
      "We sit down, map your pain points, decide what to build. No commitment yet — this is the conversation.",
  },
  {
    number: "02",
    title: "Ecosystem Map",
    meta: "1 week · RM 5,000 (deducted from build)",
    detail:
      "Documented architecture: which systems, which agents, which integrations. Locked scope, locked timeline, locked cost.",
  },
  {
    number: "03",
    title: "Build",
    meta: "6–16 weeks · 50% of project upfront",
    detail:
      "We architect, build, and ship. Weekly Monday demos — you see progress every week, not at the end.",
  },
  {
    number: "04",
    title: "Launch",
    meta: "1–2 weeks · 50% on launch",
    detail:
      "Production deploy, training, handover. We stay through the first 30 days post-launch.",
  },
  {
    number: "05",
    title: "Retainer",
    meta: "Ongoing · RM 8,000–25,000/month",
    detail:
      "Maintenance, optimization, new features. You scale, we scale with you. Cancel any time.",
  },
];

const TOTAL = steps.length;
const LAST_INDEX = TOTAL - 1;
const AUTO_ADVANCE_MS = 4000;

function ratioToStep(ratio: number): number {
  const clamped = Math.max(0, Math.min(1, ratio));
  return Math.round(clamped * LAST_INDEX);
}

export function ProcessTimeline() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [draggedRatio, setDraggedRatio] = useState<number | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (hasInteracted || reducedMotion) return;
    const id = window.setInterval(() => {
      setActiveStep((s) => (s + 1) % TOTAL);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [hasInteracted, reducedMotion]);

  const isDragging = draggedRatio !== null;
  const visualRatio = isDragging ? draggedRatio : activeStep / LAST_INDEX;

  function ratioFromPointer(clientX: number): number {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const x = clientX - rect.left;
    return Math.max(0, Math.min(1, x / rect.width));
  }

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    e.preventDefault();
    setHasInteracted(true);
    const ratio = ratioFromPointer(e.clientX);
    setDraggedRatio(ratio);
    setActiveStep(ratioToStep(ratio));
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    const ratio = ratioFromPointer(e.clientX);
    setDraggedRatio(ratio);
    setActiveStep(ratioToStep(ratio));
  }

  function handlePointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    setDraggedRatio(null);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setHasInteracted(true);
      setActiveStep((s) => Math.min(LAST_INDEX, s + 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setHasInteracted(true);
      setActiveStep((s) => Math.max(0, s - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setHasInteracted(true);
      setActiveStep(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setHasInteracted(true);
      setActiveStep(LAST_INDEX);
    }
  }

  function jumpToStep(index: number) {
    setHasInteracted(true);
    setActiveStep(index);
  }

  const currentStep = steps[activeStep];
  const transitionClass = isDragging ? "" : "transition-[width,left] duration-200 ease-out";

  return (
    <section className="bg-[var(--color-background)] pt-8 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40 mb-3">
            How We Work
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.05] text-white text-balance mb-3">
            Five steps.{" "}
            <em
              className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
              style={{ filter: "drop-shadow(0 0 18px rgba(0,240,255,0.32))" }}
            >
              No mystery.
            </em>
          </h2>
          <p className="mx-auto max-w-xl text-[15px] leading-[1.6] text-white/55 text-balance">
            Drag the cyan dot. Each step explains itself.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="hidden md:grid grid-cols-5 gap-2 mb-4">
            {steps.map((step, i) => {
              const isActive = i === activeStep;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => jumpToStep(i)}
                  className={`text-left text-[10.5px] font-mono uppercase tracking-[0.22em] transition-colors duration-200 ${
                    isActive ? "text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  <span className="text-[var(--color-electric-cyan)]/70 mr-2">
                    {step.number}
                  </span>
                  {step.title}
                </button>
              );
            })}
          </div>

          <div className="md:hidden flex justify-between items-baseline mb-3 text-[10.5px] font-mono uppercase tracking-[0.22em] text-white/40">
            {steps.map((step, i) => (
              <button
                key={step.number}
                type="button"
                onClick={() => jumpToStep(i)}
                className={`transition-colors ${
                  i === activeStep ? "text-white" : "hover:text-white/70"
                }`}
              >
                {step.number}
              </button>
            ))}
          </div>

          <div
            ref={trackRef}
            role="slider"
            tabIndex={0}
            aria-valuemin={1}
            aria-valuemax={TOTAL}
            aria-valuenow={activeStep + 1}
            aria-valuetext={`${steps[activeStep].number} ${steps[activeStep].title}`}
            aria-label="Process step selector"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onKeyDown={handleKeyDown}
            className="relative h-10 cursor-grab active:cursor-grabbing touch-none select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-electric-cyan)]/40 focus-visible:rounded-md"
          >
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 rounded-full bg-white/[0.06]" />
            <div
              className={`absolute top-1/2 -translate-y-1/2 left-0 h-1 rounded-full bg-[var(--color-electric-cyan)]/70 ${transitionClass}`}
              style={{ width: `${visualRatio * 100}%` }}
            />

            {steps.map((_, i) => {
              const ratio = i / LAST_INDEX;
              const isPassed = i <= activeStep;
              return (
                <div
                  key={i}
                  aria-hidden
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
                  style={{ left: `${ratio * 100}%` }}
                >
                  <div
                    className={`rounded-full transition-all duration-200 ${
                      isPassed
                        ? "h-2 w-2 bg-[var(--color-electric-cyan)]"
                        : "h-1.5 w-1.5 bg-white/30"
                    }`}
                  />
                </div>
              );
            })}

            <div
              className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 ${transitionClass}`}
              style={{ left: `${visualRatio * 100}%` }}
            >
              <div
                className="h-[18px] w-[18px] rounded-full bg-[var(--color-electric-cyan)] border-2 border-white"
                style={{
                  boxShadow: isDragging
                    ? "0 0 18px rgba(0,240,255,0.9), 0 0 4px rgba(0,240,255,1)"
                    : "0 0 12px rgba(0,240,255,0.6)",
                }}
              />
            </div>
          </div>

          <div className="mt-3 text-[10.5px] font-mono uppercase tracking-[0.22em] text-white/40 text-center">
            Step {String(activeStep + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto max-w-3xl mt-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, rgba(0,240,255,0.10), transparent 70%)",
            }}
          />

          <div
            className="relative rounded-[18px] border border-white/[0.08] bg-white/[0.025] backdrop-blur-md p-6 lg:p-8 min-h-[180px]"
            style={{
              boxShadow: "0 0 40px rgba(0,240,255,0.06), 0 8px 24px rgba(0,0,0,0.35)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.number}
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="grid grid-cols-[auto_1fr] gap-5 lg:gap-7 items-start"
              >
                <div
                  aria-hidden
                  className="font-serif italic text-[40px] md:text-[48px] leading-none text-white/15 select-none"
                >
                  {currentStep.number}
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-[-0.01em] leading-tight text-white mb-2">
                    {currentStep.title}
                  </h3>
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-electric-cyan)]/85 mb-3">
                    {currentStep.meta}
                  </div>
                  <div className="h-px w-10 bg-[var(--color-electric-cyan)]/60 mb-3" />
                  <p className="text-[15px] md:text-[16px] leading-[1.6] text-white/65">
                    {currentStep.detail}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
