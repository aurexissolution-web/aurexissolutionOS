"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// All five CTAs point at the existing solutions hub for now (no dead links).
// Swap this one value once dedicated solution detail pages exist.
const SOLUTIONS_HREF = "/services";

const CYAN = "var(--color-electric-cyan)";

type Solution = {
  number: string;
  id: string;
  name: string;
  headline: string;
  description: string;
  outcomes: string[];
  capabilities: string[];
  cta: string;
  grid: string;
};

const solutions: Solution[] = [
  {
    number: "01",
    id: "lead",
    name: "Lead & Customer Systems",
    headline: "Capture every opportunity.",
    description:
      "Bring website, WhatsApp, email, forms and CRM into one connected lead journey so every enquiry is captured, assigned, followed up and measured.",
    outcomes: [
      "Faster lead response",
      "Fewer missed opportunities",
      "Clear ownership",
      "Better conversion visibility",
    ],
    capabilities: ["Presence", "Flow", "Core", "Connect"],
    cta: "Explore Lead Systems",
    grid: "md:col-span-2 lg:col-span-2 xl:col-span-2 lg:col-start-1 lg:row-start-1",
  },
  {
    number: "02",
    id: "workflow",
    name: "Workflow Automation",
    headline: "Make work move without constant chasing.",
    description:
      "Automate repetitive follow-ups, approvals, notifications, handovers and task routing across the business.",
    outcomes: ["Less manual work", "Faster turnaround", "Fewer process gaps", "Clearer accountability"],
    capabilities: ["Flow", "Connect", "Core"],
    cta: "Explore Workflow Automation",
    grid: "xl:col-start-3 xl:row-start-1",
  },
  {
    number: "03",
    id: "core",
    name: "Business Operating Systems",
    headline: "Run the business from one foundation.",
    description:
      "Centralise customers, projects, finance, delivery and internal operations into one structured management system.",
    outcomes: ["One operational view", "Better workload control", "Clear project status", "Stronger management visibility"],
    capabilities: ["Core", "Data Foundation", "Connect"],
    cta: "Explore Operating Systems",
    grid: "xl:col-start-4 xl:row-start-1",
  },
  {
    number: "04",
    id: "integration",
    name: "Integration & Data Systems",
    headline: "Make your tools and data work together.",
    description:
      "Connect existing software, remove duplicate information and create reliable reporting across the organisation.",
    outcomes: ["Connected systems", "Cleaner data", "Reliable reporting", "One source of truth"],
    capabilities: ["Connect", "Data Foundation", "Core"],
    cta: "Explore Integration & Data",
    grid: "md:col-span-2 lg:col-span-2 xl:col-span-2 xl:col-start-1 xl:row-start-2",
  },
  {
    number: "05",
    id: "ai",
    name: "AI & Intelligence Solutions",
    headline: "Turn connected data into better decisions.",
    description:
      "Add AI assistants, intelligent recommendations, forecasting and automation on top of connected business systems.",
    outcomes: ["Faster decisions", "Actionable insights", "Intelligent automation", "Better forecasting"],
    capabilities: ["Intelligence", "Data Foundation", "Flow"],
    cta: "Explore AI & Intelligence",
    grid: "md:col-span-2 lg:col-span-2 xl:col-span-2 xl:col-start-3 xl:row-start-2",
  },
];

function TileFooter({ capabilities, cta }: { capabilities: string[]; cta: string }) {
  return (
    <div className="mt-4 border-t border-white/[0.06] pt-4">
      <div className="text-[11px] uppercase tracking-[0.14em] text-white/35">{capabilities.join(" · ")}</div>
      <span className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/85">
        {cta}
        <ArrowRight className="h-3.5 w-3.5 text-[var(--color-electric-cyan)] transition-transform duration-200 ease-out group-hover:translate-x-[2px] group-focus-visible:translate-x-[2px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-focus-visible:translate-x-0" />
      </span>
    </div>
  );
}

export function WhatWeBuild() {
  const reduceMotion = useReducedMotion() ?? false;
  const tileRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const tileRects = useRef<Map<string, DOMRect>>(new Map());
  const rafRef = useRef<number>(0);

  const registerTile = useCallback((id: string, el: HTMLAnchorElement | null) => {
    if (el) tileRefs.current.set(id, el);
    else tileRefs.current.delete(id);
  }, []);

  const measureRects = useCallback(() => {
    const rects = tileRects.current;
    rects.clear();
    tileRefs.current.forEach((el, id) => {
      rects.set(id, el.getBoundingClientRect());
    });
  }, []);

  useEffect(() => {
    measureRects();
    const onGeometryChange = () => measureRects();
    window.addEventListener("resize", onGeometryChange, { passive: true });
    window.addEventListener("scroll", onGeometryChange, { passive: true });
    return () => {
      window.removeEventListener("resize", onGeometryChange);
      window.removeEventListener("scroll", onGeometryChange);
      cancelAnimationFrame(rafRef.current);
    };
  }, [measureRects]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      if (e.pointerType !== "mouse") return;
      const clientX = e.clientX;
      const clientY = e.clientY;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rects = tileRects.current;
        tileRefs.current.forEach((el, id) => {
          const rect = rects.get(id);
          if (!rect || rect.width === 0 || rect.height === 0) return;
          const x = ((clientX - rect.left) / rect.width) * 100;
          const y = ((clientY - rect.top) / rect.height) * 100;
          el.style.setProperty("--spot-x", `${x}%`);
          el.style.setProperty("--spot-y", `${y}%`);
        });
      });
    },
    [reduceMotion]
  );

  return (
    <section
      aria-labelledby="solutions-heading"
      className="bg-[var(--color-background)] px-6 py-14 lg:flex lg:min-h-screen lg:flex-col lg:justify-center"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-5 max-w-3xl text-center lg:mb-6">
          <span className="mb-4 inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
            Business Solutions
          </span>
          <h2
            id="solutions-heading"
            className="mb-3 text-3xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white text-balance md:text-4xl"
          >
            Start with the{" "}
            <em
              className="font-serif font-normal italic text-[var(--color-electric-cyan)]"
              style={{ filter: "drop-shadow(0 0 18px rgba(0,240,255,0.32))" }}
            >
              problem
            </em>{" "}
            holding your business back.
          </h2>
          <p className="mx-auto max-w-2xl text-[14px] leading-[1.5] text-white/55 text-balance md:text-[15px]">
            You do not need to transform everything at once. Aurexis can begin with one
            high-impact problem and expand into a connected ecosystem as your business grows.
          </p>
        </div>

        <div
          onPointerMove={handlePointerMove}
          className={cn(
            "mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4",
            "wwb-grid"
          )}
        >
          {solutions.map((s, i) => (
            <motion.article
              key={s.id}
              className={cn(s.grid, "wwb-tile")}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: reduceMotion ? 0 : i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                ref={(el) => {
                  registerTile(s.id, el);
                }}
                href={SOLUTIONS_HREF}
                aria-label={s.cta}
                className={cn(
                  "wwb-tile-link group relative isolate flex h-full flex-col overflow-hidden rounded-[16px] border border-white/[0.08] backdrop-blur-sm",
                  "bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent",
                  "transition-[transform,border-color] duration-200 ease-out",
                  "hover:-translate-y-[2px] hover:border-white/[0.18]",
                  "focus-visible:-translate-y-[2px] focus-visible:border-white/[0.18]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
                  "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0"
                )}
              >
                <span
                  aria-hidden
                  className="wwb-spot pointer-events-none absolute inset-0 -z-10 rounded-[16px]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-8 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
                />
                <div className="flex h-full flex-col p-5 lg:p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span aria-hidden className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-electric-cyan)]/40">
                      {s.number}
                    </span>
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--color-electric-cyan)]/50" />
                  </div>
                  <h3 className="text-lg font-extrabold leading-[1.15] tracking-[-0.01em] text-white lg:text-xl">
                    {s.name}
                  </h3>
                  <p
                    className="mt-1 font-serif text-[14px] italic text-[var(--color-electric-cyan)]"
                    style={{ filter: "drop-shadow(0 0 12px rgba(0,240,255,0.18))" }}
                  >
                    {s.headline}
                  </p>
                  <p className="mt-2 text-[12.5px] leading-[1.5] text-white/55">{s.description}</p>
                  {s.id === "lead" && (
                    <ul className="mt-4 grid grid-cols-2 gap-2">
                      {s.outcomes.map((o) => (
                        <li key={o} className="flex items-center gap-1.5 text-[11px] text-white/55">
                          <span aria-hidden className="h-1 w-1 rounded-full" style={{ background: CYAN }} />
                          {o}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div aria-hidden className="flex-1" />
                  <TileFooter capabilities={s.capabilities} cta={s.cta} />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .wwb-tile-link {
          --spot-x: 50%;
          --spot-y: 40%;
        }
        .wwb-spot {
          background: radial-gradient(
            240px circle at var(--spot-x) var(--spot-y),
            rgba(0, 240, 255, 0.07) 0%,
            rgba(0, 240, 255, 0.03) 40%,
            rgba(0, 240, 255, 0) 70%
          );
          opacity: 0;
          transition: opacity 200ms ease-out;
        }
        .wwb-tile-link:hover .wwb-spot,
        .wwb-tile-link:focus-visible .wwb-spot {
          opacity: 1;
        }
        @media (hover: none) {
          .wwb-spot { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wwb-spot { display: none; }
        }
      `}</style>
    </section>
  );
}
