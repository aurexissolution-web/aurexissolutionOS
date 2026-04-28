"use client";

import { useState, useMemo, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import {
  calculateAnnualWaste,
  CALCULATOR_DEFAULTS,
  CALCULATOR_BOUNDS,
} from "@/lib/calculator";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_AUREXIS_WHATSAPP || "60123456789";

function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

function progress(value: number, min: number, max: number): string {
  return `${((value - min) / (max - min)) * 100}%`;
}

type FieldProps = {
  label: string;
  unit?: string;
  prefix?: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
};

function Field({
  label,
  unit,
  prefix,
  value,
  onChange,
  min,
  max,
  step = 1,
}: FieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-[11px] font-mono uppercase tracking-[0.22em] text-white/45">
        {label}
      </label>
      <div className="flex items-baseline gap-2 px-4 py-2 rounded-lg border border-white/[0.08] bg-white/[0.02] focus-within:border-[var(--color-electric-cyan)]/40 transition-colors">
        {prefix && (
          <span className="font-mono text-[15px] text-white/45 shrink-0">
            {prefix}
          </span>
        )}
        <input
          type="number"
          className="calc-input flex-1 min-w-0 bg-transparent font-mono text-[20px] md:text-[22px] text-white outline-none"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(clamp(Number(e.target.value), min, max))}
        />
        {unit && (
          <span className="font-mono text-[13px] text-white/45 shrink-0">
            {unit}
          </span>
        )}
      </div>
      <input
        type="range"
        className="calc-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--progress": progress(value, min, max) } as React.CSSProperties}
      />
    </div>
  );
}

export function Calculator() {
  const [staff, setStaff] = useState<number>(CALCULATOR_DEFAULTS.staff);
  const [wage, setWage] = useState<number>(CALCULATOR_DEFAULTS.wage);
  const [hours, setHours] = useState<number>(CALCULATOR_DEFAULTS.hours);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const annualWaste = useMemo(
    () => calculateAnnualWaste(staff, wage, hours),
    [staff, wage, hours],
  );
  const monthlyWaste = useMemo(
    () => Math.round(annualWaste / 12),
    [annualWaste],
  );
  const percentTime = useMemo(
    () => Math.round((hours / 40) * 100),
    [hours],
  );

  const formattedAnnual = new Intl.NumberFormat("en-MY").format(annualWaste);
  const whatsappMessage = encodeURIComponent(
    `Hi Aurexis — I just calculated RM ${formattedAnnual} in machine-replaceable work. Can we talk?`,
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setEmailError(null);

    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Please enter a valid email.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/calculator-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, staff, wage, hours }),
      });
      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
      } else {
        setEmailError(data.error || "Something went wrong. Try again?");
      }
    } catch {
      setEmailError("Network error. Try again?");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="calculator"
      className="bg-[var(--color-background)] pt-6 pb-12 px-6"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40 mb-3">
            The Calculator
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.05] text-white text-balance mb-3">
            How much is your business paying for{" "}
            <em
              className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
              style={{ filter: "drop-shadow(0 0 18px rgba(0,240,255,0.32))" }}
            >
              machine-replaceable
            </em>{" "}
            work?
          </h2>
          <p className="mx-auto max-w-xl text-[15px] leading-[1.6] text-white/55 text-balance">
            Three inputs. One honest number. No fluff.
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 blur-3xl opacity-50"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, rgba(0,240,255,0.13), transparent 70%)",
            }}
          />

          <div
            className="relative rounded-[20px] border border-white/[0.08] bg-white/[0.025] backdrop-blur-md p-5 lg:p-7"
            style={{
              boxShadow:
                "0 0 60px rgba(0,240,255,0.10), 0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-6 lg:gap-10">
              <div className="space-y-4">
                <Field
                  label="Admin Staff"
                  value={staff}
                  onChange={setStaff}
                  min={CALCULATOR_BOUNDS.staff.min}
                  max={CALCULATOR_BOUNDS.staff.max}
                  unit="people"
                />
                <Field
                  label="Monthly Wage / Person"
                  value={wage}
                  onChange={setWage}
                  min={CALCULATOR_BOUNDS.wage.min}
                  max={CALCULATOR_BOUNDS.wage.max}
                  step={100}
                  prefix="RM"
                />
                <Field
                  label="Hours / Week on Routine Tasks"
                  value={hours}
                  onChange={setHours}
                  min={CALCULATOR_BOUNDS.hours.min}
                  max={CALCULATOR_BOUNDS.hours.max}
                  unit="hrs"
                />
              </div>

              <div className="flex flex-col justify-center">
                <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/45 mb-2">
                  Estimated annual waste
                </div>
                <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                  <em
                    className="font-serif italic text-[var(--color-electric-cyan)] font-normal text-3xl md:text-4xl"
                    style={{ filter: "drop-shadow(0 0 14px rgba(0,240,255,0.32))" }}
                  >
                    RM
                  </em>
                  <span
                    className="font-mono font-extrabold text-[40px] md:text-[52px] lg:text-[60px] leading-none text-white"
                    style={{ filter: "drop-shadow(0 0 24px rgba(0,240,255,0.35))" }}
                  >
                    <NumberFlow value={annualWaste} locales="en-MY" />
                  </span>
                  <span className="font-mono text-[13px] text-white/45 ml-1">
                    /year
                  </span>
                </div>

                <div className="font-mono text-[13px] text-white/55 mt-2 space-y-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-white/35">≈</span>
                    <span>RM</span>
                    <NumberFlow value={monthlyWaste} locales="en-MY" />
                    <span className="text-white/45">/ month wasted</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-white/35">≈</span>
                    <NumberFlow value={percentTime} />
                    <span>%</span>
                    <span className="text-white/45">of your team&apos;s hours</span>
                  </div>
                </div>

                <div className="h-px w-10 bg-[var(--color-electric-cyan)]/60 mt-4 mb-2" />
                <p className="text-[13px] text-white/55">
                  Machine-replaceable work is what AI agents do best.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mx-auto max-w-xl mt-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(null);
                    }}
                    placeholder="you@yourcompany.com"
                    className="flex-1 px-4 py-3 rounded-full border border-white/[0.08] bg-white/[0.02] text-[15px] text-white placeholder:text-white/35 outline-none focus:border-[var(--color-electric-cyan)]/40 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black text-[15px] font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 shadow-[0_4px_14px_rgba(0,0,0,0.25),0_0_24px_rgba(0,240,255,0.18)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3),0_0_32px_rgba(0,240,255,0.28)]"
                  >
                    {isSubmitting ? "Sending…" : "Send my breakdown"}
                    {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
                {emailError ? (
                  <p className="text-[13px] text-red-400/85 text-center">
                    {emailError}
                  </p>
                ) : (
                  <p className="text-[12px] text-white/40 text-center">
                    PDF report in your inbox. No spam, no follow-up calls unless you ask.
                  </p>
                )}
              </motion.form>
            ) : (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-5"
              >
                <p className="text-[18px] text-white/85">
                  <em
                    className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
                    style={{ filter: "drop-shadow(0 0 12px rgba(0,240,255,0.24))" }}
                  >
                    Sent.
                  </em>{" "}
                  Check your inbox in a few minutes.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[var(--color-electric-cyan)]/30 bg-white/[0.04] backdrop-blur-md text-[15px] font-semibold text-white hover:bg-white/[0.07] hover:border-[var(--color-electric-cyan)]/55 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[var(--color-electric-cyan)]" />
                  Or talk to us now
                  <ArrowRight className="w-4 h-4 text-[var(--color-electric-cyan)]" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
