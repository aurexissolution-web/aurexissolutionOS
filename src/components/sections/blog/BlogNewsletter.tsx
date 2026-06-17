"use client";

import Link from "next/link";
import { useNewsletterForm } from "@/components/sections/blog/shared/useNewsletterForm";
import { cn } from "@/lib/utils";

export function BlogNewsletter() {
  const { email, setEmail, status, error, submit } = useNewsletterForm();

  return (
    <section className="relative bg-black border-y border-white/[0.20] overflow-hidden">
      {/* faint paper grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(60% 60% at 100% 100%, rgba(244,238,225,0.05), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10 py-16 lg:py-20">
        {/* top ledger */}
        <div className="flex items-center justify-between gap-4 mb-10 lg:mb-12 pb-6 border-b border-white/[0.14]">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="font-serif italic text-[20px] text-[var(--color-electric-cyan)]"
              style={{ textShadow: "0 0 10px rgba(0,240,255,0.55)" }}
            >
              ◆
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-white/85">
              The Loop · Newsletter
            </span>
          </div>
          <div className="hidden md:flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em] text-white/40">
            <span>Mailed quietly</span>
            <span className="h-px w-10 bg-white/[0.18]" />
            <span>From KLCC</span>
            <span className="h-px w-10 bg-white/[0.18]" />
            <span className="text-white/85">No. 05 · soon</span>
          </div>
        </div>

        {/* TOP ROW: copy left, subscription card right */}
        {/* SINGLE CENTERED COLUMN: headline → subhead → form */}
        <div className="max-w-[760px] mx-auto text-center">
          <h2
            className="font-serif italic font-normal leading-[0.96] tracking-[-0.025em] text-[clamp(38px,4.8vw,68px)]"
            style={{ color: "#F4EEE1" }}
          >
            One email. No spam.
            <br />
            Every couple of{" "}
            <span
              style={{
                fontStyle: "italic",
                backgroundImage:
                  "linear-gradient(120deg, #00F0FF, #F4EEE1 80%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              weeks.
            </span>
          </h2>

          <p className="mt-5 font-serif italic text-[clamp(15.5px,1.2vw,19px)] leading-[1.55] text-[#B6BCC8] max-w-[560px] mx-auto">
            Tactical writing on AI ecosystems, LHDN updates, and what
            we&apos;re building. For Malaysian SME owners.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="mt-9 lg:mt-11 max-w-[560px] mx-auto"
          >
            <div
              className={cn(
                "flex items-end pb-2 border-b transition-colors duration-300",
                status === "error"
                  ? "border-red-400/65"
                  : status === "success"
                    ? "border-[var(--color-electric-cyan)]"
                    : "border-white/[0.30] focus-within:border-[var(--color-electric-cyan)]"
              )}
            >
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={status === "loading" || status === "success"}
                className="flex-1 min-w-0 bg-transparent py-2 font-serif italic text-[clamp(18px,1.7vw,24px)] text-white placeholder:text-white/25 outline-none disabled:opacity-50 text-left"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={cn(
                  "shrink-0 ml-4 inline-flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.28em] py-2 transition-colors duration-200 disabled:opacity-60",
                  status === "success"
                    ? "text-[var(--color-electric-cyan)]"
                    : "text-white hover:text-[var(--color-electric-cyan)]"
                )}
              >
                {status === "loading" ? (
                  <Spinner />
                ) : status === "success" ? (
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

            <div className="mt-3.5 font-mono text-[10px] uppercase tracking-[0.24em]">
              {status === "error" && error ? (
                <span className="text-red-300/85">⚠ {error}</span>
              ) : status === "success" ? (
                <span className="text-[var(--color-electric-cyan)]">
                  ✓ Confirmation on its way
                </span>
              ) : (
                <span className="text-white/40">
                  PDPA-compliant · One-click unsubscribe
                </span>
              )}
            </div>
          </form>
        </div>

        {/* DIRECT LINES — secondary CTAs */}
        <div className="mt-14 lg:mt-20 pt-10 lg:pt-12 border-t border-white/[0.14]">
          <div className="flex items-center gap-4 mb-9 lg:mb-12">
            <span className="h-px flex-1 bg-white/[0.10]" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-white/45 whitespace-nowrap">
              Or — by hand
            </span>
            <span className="h-px flex-1 bg-white/[0.10]" />
          </div>

          <div className="grid md:grid-cols-2 border-t border-b md:border-y border-white/[0.10]">
            <DirectLineCard
              number="01"
              eyebrow="A conversation"
              title="Talk to us."
              accentWord="us"
              body="A real exchange about your stack, your constraints, and what could realistically ship in the next quarter."
              cta="Open the contact form"
              href="/contact?topic=conversation"
              isLeft
            />
            <DirectLineCard
              number="02"
              eyebrow="Live demo"
              title="Book a demo."
              accentWord="demo"
              body="Thirty minutes with the team. We walk you through what Aurexis ships for clinics and Malaysian SMEs."
              cta="Reserve a slot"
              href="/contact?topic=demo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function DirectLineCard({
  number,
  eyebrow,
  title,
  accentWord,
  body,
  cta,
  href,
  isLeft,
}: {
  number: string;
  eyebrow: string;
  title: string;
  accentWord?: string;
  body: string;
  cta: string;
  href: string;
  isLeft?: boolean;
}) {
  const before = accentWord && title.includes(accentWord)
    ? title.slice(0, title.indexOf(accentWord))
    : title;
  const after = accentWord
    ? title.slice(title.indexOf(accentWord) + accentWord.length)
    : "";

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col gap-4 p-7 lg:p-10 transition-colors duration-300 hover:bg-white/[0.015]",
        isLeft &&
          "md:border-r border-white/[0.10] border-b md:border-b-0"
      )}
    >
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-3">
          <span
            className="font-serif italic text-[44px] leading-none tracking-[-0.02em] text-white/30 transition-colors duration-300 group-hover:text-white/85"
          >
            {number}
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-[var(--color-electric-cyan)]/85">
            {eyebrow}
          </span>
        </div>
        <span
          aria-hidden
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.18] text-white/65 font-serif italic text-[20px] transition-all duration-[350ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:border-[var(--color-electric-cyan)]/55 group-hover:text-[var(--color-electric-cyan)] group-hover:shadow-[0_0_18px_rgba(0,240,255,0.35)]"
        >
          ↗
        </span>
      </div>

      <h3 className="font-serif italic font-normal leading-[1] tracking-[-0.025em] text-white text-[clamp(34px,3.4vw,52px)]">
        {before}
        {accentWord && (
          <span
            style={{
              fontStyle: "italic",
              backgroundImage: "linear-gradient(120deg, #00F0FF, #FFFFFF 80%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {accentWord}
          </span>
        )}
        {after}
      </h3>

      <p className="font-serif italic text-[clamp(15px,1.15vw,17px)] leading-[1.55] text-[#A4ABB8] max-w-[440px]">
        {body}
      </p>

      <div className="mt-2 flex items-center gap-2 pt-3 border-t border-white/[0.08] font-mono text-[10.5px] uppercase tracking-[0.24em] text-white/55 group-hover:text-[var(--color-electric-cyan)] transition-colors duration-200">
        <span>{cta}</span>
        <span className="transition-transform duration-300 group-hover:translate-x-[3px]">
          →
        </span>
      </div>

      {/* hover hairline */}
      <span
        aria-hidden
        className="absolute left-7 right-7 lg:left-10 lg:right-10 bottom-0 h-px origin-left scale-x-0 transition-transform duration-[450ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-100"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,240,255,0.55), transparent)",
        }}
      />
    </Link>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden
      className="inline-block w-3 h-3 rounded-full border-2 border-white/20 border-t-white animate-spin"
    />
  );
}
