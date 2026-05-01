"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ServiceHubEntry } from "@/data/services-hub";

// The detail-page route exists for these slugs (see src/app/services/[slug]/page.tsx).
// `ecosystem` doesn't have a detail page yet — flagged as a follow-up — so route to /contact.
const SLUGS_WITH_DETAIL: ReadonlySet<ServiceHubEntry["id"]> = new Set([
  "ai-automation",
  "web-engineering",
  "mobile-ecosystems",
]);

type Props = {
  entry: ServiceHubEntry;
  visual: ReactNode;
};

export function ServicesAct({ entry, visual }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
            return;
          }
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const colored = entry.titleColored;
  const beforeColored = colored && entry.title.startsWith(colored)
    ? ""
    : colored
      ? entry.title.split(colored)[0]
      : entry.title;
  const afterColored = colored ? entry.title.split(colored)[1] ?? "" : "";

  // Backdrop tint position: right side for visual-right, left side for visual-left.
  const tintPos = entry.visualSide === "right" ? "75%" : "25%";

  return (
    <section
      ref={ref}
      data-act={entry.act}
      data-in-view={inView ? "true" : "false"}
      className="relative min-h-[92vh] py-20 border-b border-white/10 flex flex-col justify-center"
      style={
        {
          "--accent": entry.accent,
        } as React.CSSProperties
      }
    >
      {/* per-act backdrop tint */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none transition-opacity duration-[1200ms] ease-out"
        style={{
          opacity: inView ? 1 : 0,
          background: `radial-gradient(ellipse 70% 80% at ${tintPos} 50%, ${entry.accent}1A, transparent 60%)`,
        }}
      />

      {/* marker bar */}
      <div className="flex items-center gap-[18px] mb-14 font-mono text-[11px] uppercase tracking-[0.28em] text-[#6B7588]">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: entry.accent,
            boxShadow: `0 0 14px ${entry.accent}`,
          }}
        />
        <span>
          <span className="font-medium" style={{ color: entry.accent }}>
            Act {entry.act}
          </span>{" "}
          · {entry.label} · {entry.title.replace(/\.$/, "")}
        </span>
        <div className="flex-1 h-px bg-white/[0.18]" />
        <span style={{ color: entry.accent }}>{entry.index} / 04</span>
      </div>

      {/* 50/50 grid; alternates by visualSide */}
      <div
        className={cn(
          "grid gap-16 items-center",
          entry.visualSide === "right"
            ? "grid-cols-1 md:grid-cols-[5fr_7fr]"
            : "grid-cols-1 md:grid-cols-[7fr_5fr]",
        )}
      >
        {/* TEXT block — order swaps based on visualSide */}
        <div className={entry.visualSide === "left" ? "md:order-2" : ""}>
          <h2
            className="font-serif italic font-normal text-[clamp(64px,8.5vw,140px)] leading-[0.94] tracking-[-0.035em] text-white mb-8 [text-shadow:0_2px_40px_rgba(0,0,0,0.5)] transition-all duration-[1000ms] ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: `translateY(${inView ? 0 : 40}px)`,
              transitionDelay: "100ms",
            }}
          >
            {beforeColored}
            {colored && (
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(120deg, ${entry.accent}, color-mix(in srgb, ${entry.accent} 50%, white))`,
                  filter: `drop-shadow(0 0 28px color-mix(in srgb, ${entry.accent} 40%, transparent))`,
                }}
              >
                {colored}
              </span>
            )}
            {afterColored}
          </h2>

          <p
            className="font-serif italic text-[clamp(20px,2.1vw,26px)] leading-[1.4] text-white mb-8 max-w-[600px] relative pl-7 transition-all duration-[900ms] ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: `translateY(${inView ? 0 : 20}px)`,
              transitionDelay: "300ms",
            }}
          >
            <span
              aria-hidden
              className="absolute left-0 top-[0.5em] w-2.5 h-2.5 rounded-full"
              style={{
                background: entry.accent,
                boxShadow: `0 0 20px color-mix(in srgb, ${entry.accent} 70%, transparent)`,
              }}
            />
            {entry.pull}
          </p>

          <p
            className="text-[17px] leading-[1.75] text-[#B7BFCC] max-w-[560px] mb-9 transition-all duration-[900ms] ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: `translateY(${inView ? 0 : 20}px)`,
              transitionDelay: "450ms",
            }}
          >
            {entry.desc}
          </p>

          <div
            className="flex flex-wrap gap-10 py-7 border-t border-white/10 mb-8 max-w-[600px] transition-all duration-[900ms] ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: `translateY(${inView ? 0 : 20}px)`,
              transitionDelay: "600ms",
            }}
          >
            {entry.stats.map((s) => (
              <Stat
                key={s.label}
                stat={s}
                accent={entry.accent}
                inView={inView}
              />
            ))}
          </div>

          <Link
            href={SLUGS_WITH_DETAIL.has(entry.id) ? `/services/${entry.id}` : "/contact"}
            className="inline-flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.22em] text-white border-b pb-2 transition-[opacity,gap] duration-[700ms] ease-out hover:gap-[18px]"
            style={{
              borderColor: entry.accent,
              opacity: inView ? 1 : 0,
              transitionDelay: "750ms",
            }}
          >
            Continue reading
            <span style={{ color: entry.accent }}>→</span>
          </Link>
        </div>

        {/* VISUAL block */}
        <div
          className="relative min-h-[460px] flex items-center justify-center transition-all duration-[1200ms] ease-out"
          style={{
            opacity: inView ? 1 : 0,
            transform: `translateY(${inView ? 0 : 30}px) scale(${inView ? 1 : 0.96})`,
            transitionDelay: "200ms",
          }}
        >
          {visual}
        </div>
      </div>
    </section>
  );
}

function Stat({
  stat,
  accent,
  inView,
}: {
  stat: ServiceHubEntry["stats"][number];
  accent: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(stat.value);

  useEffect(() => {
    if (!inView || stat.count === undefined) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(`${stat.count}${stat.suffix ?? ""}`);
      return;
    }
    const target = stat.count;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      const v = Math.round(target * eased);
      setDisplay(`${v}${stat.suffix ?? ""}`);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.count, stat.suffix]);

  return (
    <div>
      <div
        className="font-serif italic text-[38px] leading-none tracking-[-0.02em] mb-1.5"
        style={{
          color: accent,
          textShadow: `0 0 22px color-mix(in srgb, ${accent} 35%, transparent)`,
        }}
      >
        {display}
      </div>
      <div className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-[#6B7588]">
        {stat.label}
      </div>
    </div>
  );
}
