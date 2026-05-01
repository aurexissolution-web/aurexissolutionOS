"use client";

import { useEffect, useRef, useState } from "react";

const FEED_ITEMS = [
  { lines: ["full", "short"] },
  { lines: ["full", "full"] },
  { lines: ["short", "full"] },
  { lines: ["full", "short"] },
  { lines: ["full", "full"] },
  { lines: ["short", "short"] },
  { lines: ["full", "short"] },
  { lines: ["full", "full"] },
];

export function MobilePhone() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
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

  function onMove(e: React.MouseEvent) {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  }
  function onLeave() {
    const el = wrapRef.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
  }

  const specs = [
    { k: "Frame rate", v: "60.0 fps", live: true },
    { k: "Codebase", v: "React Native · 1" },
    { k: "Offline", v: "First-class" },
    { k: "Launch", v: "App Store · ASO" },
    { k: "Scale", v: "0 → 100k users" },
  ];

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[480px] flex flex-col md:flex-row items-center gap-8"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative flex-shrink-0 transition-transform duration-[400ms] ease-out"
      >
        <div
          className="w-[200px] h-[380px] rounded-[32px] relative overflow-hidden"
          style={{
            border: "1.5px solid rgba(255,255,255,0.18)",
            background: "linear-gradient(180deg, #0a0d14, #050709)",
            boxShadow:
              "0 40px 80px rgba(16,185,129,0.22), inset 0 0 0 1px rgba(16,185,129,0.08)",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            aria-hidden
            className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-1.5 rounded-full bg-white/[0.08]"
          />
          <div
            className="mx-2.5 mt-6 h-[calc(100%-36px)] rounded-[22px] overflow-hidden px-2.5 pt-3"
            style={{
              background:
                "linear-gradient(180deg, rgba(16,185,129,0.06) 0%, transparent 30%), #07090C",
            }}
          >
            <div className="services-anim-scroll-feed flex flex-col gap-2 [animation:services-scroll-feed_18s_linear_infinite]">
              {[...FEED_ITEMS, ...FEED_ITEMS].map((item, i) => (
                <FeedItem key={i} lines={item.lines} />
              ))}
            </div>
          </div>
        </div>
        <div
          className="absolute -top-2.5 -right-8 px-3.5 py-1.5 rounded-full font-mono text-[11px] tracking-[0.18em] uppercase backdrop-blur-md inline-flex items-center gap-2"
          style={{
            background: "rgba(16,185,129,0.18)",
            border: "1px solid rgba(16,185,129,0.5)",
            color: "#34D399",
            boxShadow: "0 12px 32px rgba(16,185,129,0.25)",
          }}
        >
          <span
            className="services-anim-pulse-soft w-1.5 h-1.5 rounded-full bg-[#34D399] [box-shadow:0_0_10px_#34D399] [animation:services-pulse-soft_1.2s_ease-in-out_infinite]"
          />
          60 fps
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2.5">
        {specs.map((s, i) => (
          <div
            key={s.k}
            className="grid grid-cols-[1fr_auto] gap-4 items-center py-2.5 border-b border-white/10 font-mono text-[11px] transition-all duration-[600ms] ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: `translateX(${inView ? 0 : 20}px)`,
              transitionDelay: `${800 + i * 150}ms`,
            }}
          >
            <span className="text-[#6B7588] tracking-[0.14em] uppercase">{s.k}</span>
            <span className="text-white inline-flex items-center">
              {s.live && (
                <span className="services-anim-pulse-soft inline-block w-1.5 h-1.5 rounded-full bg-[#34D399] [box-shadow:0_0_8px_#34D399] mr-1.5 [animation:services-pulse-soft_1.4s_ease-in-out_infinite]" />
              )}
              {s.v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeedItem({ lines }: { lines: string[] }) {
  return (
    <div className="h-9 rounded-lg flex-shrink-0 bg-white/[0.03] border border-white/[0.04] flex items-center gap-2 px-2">
      <div
        className="rounded-full flex-shrink-0"
        style={{
          width: "22px",
          height: "22px",
          background: "linear-gradient(135deg, #10B981, #059669)",
        }}
      />
      <div className="flex-1 flex flex-col gap-1">
        {lines.map((kind, i) => (
          <div
            key={i}
            className="h-[3px] rounded-full bg-white/10"
            style={{ width: kind === "short" ? "50%" : "100%" }}
          />
        ))}
      </div>
    </div>
  );
}
