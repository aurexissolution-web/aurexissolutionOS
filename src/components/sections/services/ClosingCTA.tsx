"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ClosingCTA() {
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
      aria-labelledby="closing-cta-heading"
      className="relative isolate w-full"
    >
      <style>{`
        .c-scope {
          --c-cream-95: rgba(244, 238, 225, 0.95);
          --c-cream-65: rgba(244, 238, 225, 0.65);
          --c-cream-55: rgba(244, 238, 225, 0.55);
          --c-cream-45: rgba(244, 238, 225, 0.45);
          --c-cream-30: rgba(244, 238, 225, 0.30);
          --c-line:        rgba(244, 238, 225, 0.08);
          --c-line-strong: rgba(244, 238, 225, 0.18);
          --c-cyan: var(--color-electric-cyan);
          --c-cyan-glow: rgba(0, 240, 255, 0.34);
        }

        .c-related-link {
          font-family: var(--font-serif), Georgia, serif;
          font-style: italic;
          font-size: 17px;
          color: var(--c-cream-95);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s ease;
          letter-spacing: -0.005em;
        }
        .c-related-link:hover { border-bottom-color: var(--c-cyan); }
      `}</style>

      {/* soft cyan radial behind the headline area */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(0,240,255,0.04), transparent 70%)",
        }}
      />

      <div className="c-scope mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 xl:px-20 py-12 md:py-14 lg:py-16">
        {/* Eyebrow */}
        <motion.p
          {...reveal(0)}
          className="font-mono text-[11px] uppercase tracking-[0.32em] mb-6"
          style={{ color: "var(--c-cream-55)" }}
        >
          <span style={{ color: "var(--c-cream-45)" }} className="mr-2">
            07
          </span>
          <span style={{ color: "var(--c-cream-30)" }} className="mr-2">
            /
          </span>
          Start a conversation
        </motion.p>

        {/* Split grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center py-8 md:py-9 lg:py-10"
          style={{
            borderTop: "1px solid var(--c-line)",
            borderBottom: "1px solid var(--c-line)",
          }}
        >
          {/* Left: headline + subhead */}
          <div>
            <motion.h2
              id="closing-cta-heading"
              {...(reduce
                ? { initial: false, animate: { opacity: 1, y: 0, filter: "blur(0px)" } }
                : {
                    initial: { opacity: 0, y: 14, filter: "blur(6px)" },
                    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
                    viewport: { once: true, amount: 0.3 },
                    transition: { duration: 0.8, ease: EASE, delay: 0.08 },
                  })}
              className="font-serif italic font-normal m-0 mb-5 max-w-[18ch]"
              style={{
                color: "var(--c-cream-95)",
                fontSize: "clamp(2rem, 3.6vw, 3.25rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.022em",
              }}
            >
              Thirty minutes is all it takes to{" "}
              <em
                className="not-italic"
                style={{
                  color: "var(--c-cyan)",
                  fontStyle: "italic",
                }}
              >
                know if we fit
              </em>
              .
            </motion.h2>
            <motion.p
              {...reveal(0.18)}
              className="font-serif italic m-0 max-w-[32ch]"
              style={{
                color: "var(--c-cream-65)",
                fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                lineHeight: 1.5,
                letterSpacing: "0.005em",
              }}
            >
              No deck. No pitch. We listen, sketch a map, and tell you honestly
              whether we&rsquo;re the right firm.
            </motion.p>
          </div>

          {/* Right: CTA stack */}
          <div className="flex flex-col items-start gap-5">
            <motion.div
              {...(reduce
                ? { initial: false, animate: { opacity: 1, scale: 1, y: 0 } }
                : {
                    initial: { opacity: 0, scale: 0.97, y: 8 },
                    whileInView: { opacity: 1, scale: 1, y: 0 },
                    viewport: { once: true, amount: 0.3 },
                    transition: { duration: 0.7, ease: EASE, delay: 0.3 },
                  })}
            >
              <Link
                href="/contact?topic=ecosystem-discovery"
                className="inline-flex items-center justify-center gap-3.5 px-7 py-4 rounded-full bg-white text-[#02030A] font-mono text-[12px] uppercase tracking-[0.22em] font-semibold transition-all duration-[250ms] hover:-translate-y-px hover:shadow-[0_14px_40px_rgba(0,240,255,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#02030A]"
              >
                Book Discovery Call <span aria-hidden>→</span>
              </Link>
            </motion.div>
            <motion.a
              {...reveal(0.42)}
              href="https://wa.me/60000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.24em] no-underline transition-[color,gap] duration-[500ms] ease-out hover:gap-3.5"
              style={{ color: "var(--c-cream-65)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--c-cream-95)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--c-cream-65)")
              }
            >
              Or WhatsApp us{" "}
              <span aria-hidden style={{ color: "var(--c-cyan)" }}>
                →
              </span>
            </motion.a>
          </div>
        </div>

        {/* Related row */}
        <motion.div
          {...reveal(0.54)}
          className="pt-5 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:flex-wrap sm:gap-6"
        >
          <div className="flex items-baseline flex-wrap gap-3">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.32em]"
              style={{ color: "var(--c-cream-45)" }}
            >
              Components
            </span>
            <Link href="/services/ai-automation" className="c-related-link">
              AI
            </Link>
            <span style={{ color: "var(--c-cream-30)" }}>·</span>
            <Link href="/services/web-engineering" className="c-related-link">
              Web
            </Link>
            <span style={{ color: "var(--c-cream-30)" }}>·</span>
            <Link href="/services/mobile-ecosystems" className="c-related-link">
              App
            </Link>
          </div>
          <p
            className="font-mono text-[10px] uppercase tracking-[0.32em] m-0"
            style={{ color: "var(--c-cream-45)" }}
          >
            Discovery is{" "}
            <span style={{ color: "var(--c-cyan)" }}>free</span>
            <span className="mx-2.5" style={{ color: "var(--c-cream-30)" }}>
              ·
            </span>
            30 min
          </p>
        </motion.div>
      </div>
    </section>
  );
}
