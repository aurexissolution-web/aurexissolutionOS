"use client";

import { useNewsletterForm } from "@/components/sections/blog/shared/useNewsletterForm";
import { cn } from "@/lib/utils";

export function LabLoopNewsletter() {
  const { email, setEmail, status, error, submit } = useNewsletterForm();

  return (
    <section className="relative bg-black border-y border-white/[0.20] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(60% 60% at 100% 0%, rgba(0,240,255,0.06), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12 py-20 md:py-28">
        <div className="max-w-[680px]">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-white/55 mb-6">
            ◆ The Lab Loop
          </p>

          <h2 className="font-serif italic font-normal text-[clamp(38px,4.8vw,68px)] leading-[1.02] tracking-[-0.025em] text-white pb-[0.08em]">
            Get notified when we ship something{" "}
            <em
              className="not-italic font-serif italic"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, #00F0FF 0%, #C4B5FD 95%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                filter: "drop-shadow(0 0 24px rgba(0,240,255,0.22))",
              }}
            >
              new.
            </em>
          </h2>

          <p className="mt-7 font-serif italic text-[clamp(16px,1.2vw,19px)] leading-[1.55] text-[#B6BCC8] max-w-[520px]">
            One email when we add an experiment to The Lab. Plus the Lab Note
            that goes with it. No filler, no spam.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="mt-10 max-w-[560px]"
          >
            <div
              className={cn(
                "flex items-end pb-2 border-b transition-colors duration-300",
                status === "error"
                  ? "border-red-400/65"
                  : status === "success"
                    ? "border-[var(--color-electric-cyan)]"
                    : "border-white/[0.30] focus-within:border-[var(--color-electric-cyan)]",
              )}
            >
              <label htmlFor="lab-loop-email" className="sr-only">
                Email address
              </label>
              <input
                id="lab-loop-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={status === "loading" || status === "success"}
                className="flex-1 min-w-0 bg-transparent py-2 font-serif italic text-[clamp(18px,1.7vw,24px)] text-white placeholder:text-white/25 outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={cn(
                  "shrink-0 ml-4 inline-flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.28em] py-2 transition-colors duration-200 disabled:opacity-60",
                  status === "success"
                    ? "text-[var(--color-electric-cyan)]"
                    : "text-white hover:text-[var(--color-electric-cyan)]",
                )}
              >
                {status === "success" ? (
                  <>
                    <span>Sent</span>
                    <span aria-hidden>↗</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <span aria-hidden>→</span>
                  </>
                )}
              </button>
            </div>

            <div
              className="mt-3.5 font-mono text-[10px] uppercase tracking-[0.24em]"
              role="status"
              aria-live="polite"
            >
              {status === "error" && error ? (
                <span className="text-red-300/85">⚠ {error}</span>
              ) : status === "success" ? (
                <span className="text-[var(--color-electric-cyan)]">
                  ✓ You&apos;re on the list
                </span>
              ) : (
                <span className="text-white/40">
                  PDPA-compliant · One-click unsubscribe
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
