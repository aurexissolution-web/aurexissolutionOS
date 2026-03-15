"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Brain, Cpu, Globe, TrendingUp } from "lucide-react";
import { AnimatedBadge } from "@/components/ui/animated-badge";

/* ══════════════════════════════════════════════════════════════
   TILT + MAGNETIC BORDER CARD SHELL
══════════════════════════════════════════════════════════════ */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mouse, setMouse] = useState({ x: -999, y: -999 }); // pixel coords on the outer wrapper
  const [hovered, setHovered] = useState(false);
  const rafRef = useRef<number>(0);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!outerRef.current) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!outerRef.current) return;
      const rect = outerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = x / rect.width;
      const py = y / rect.height;
      setMouse({ x, y });
      setTilt({ x: (py - 0.5) * -9, y: (px - 0.5) * 9 });
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
    setMouse({ x: -999, y: -999 });
  }, []);

  // The outer div IS the border — its background is a radial-gradient anchored to the
  // mouse pixel position. The 1px padding gap reveals it as a glowing border edge.
  const borderBg = hovered
    ? `radial-gradient(280px circle at ${mouse.x}px ${mouse.y}px, rgba(0,240,255,0.85) 0%, rgba(0,240,255,0.25) 35%, rgba(255,255,255,0.06) 70%, transparent 100%)`
    : `rgba(255,255,255,0.05)`;

  return (
    <div
      ref={outerRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      className={`relative select-none ${className}`}
      style={{
        padding: "1px",
        borderRadius: "28px",
        background: borderBg,
        transform: hovered
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.012,1.012,1.012)`
          : "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
        transition: hovered
          ? "transform 0.08s linear, box-shadow 0.4s ease"
          : "transform 0.65s cubic-bezier(0.23,1,0.32,1), box-shadow 0.5s ease, background 0.6s ease",
        boxShadow: hovered
          ? "0 30px 80px rgba(0,0,0,0.75), 0 0 60px rgba(0,240,255,0.06)"
          : "0 6px 28px rgba(0,0,0,0.4)",
        willChange: "transform",
      }}
    >
      {/* Inner card fill — must sit inside the 1px border shell */}
      <div
        className="relative overflow-hidden h-full w-full"
        style={{ borderRadius: "27px", background: "#050505" }}
      >
        {/* Cursor-tracked inner spotlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500 z-10"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(420px circle at ${mouse.x}px ${mouse.y}px, rgba(0,240,255,0.05), transparent 55%)`,
          }}
        />

        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}



/* ══════════════════════════════════════════════════════════════
   VISUAL: NEURAL NETWORK (AI)
══════════════════════════════════════════════════════════════ */
function NeuralNetVisual() {
  return (
    <div className="relative w-full h-56 flex items-center justify-center overflow-hidden bg-[#02040A]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,240,255,0.13)_0%,_transparent_65%)]" />

      <svg viewBox="0 0 400 220" className="w-full h-full" fill="none">
        {/* Lines */}
        <g stroke="rgba(0,240,255,0.12)" strokeWidth="1">
          <line x1="80" y1="70" x2="200" y2="110" /><line x1="80" y1="150" x2="200" y2="110" />
          <line x1="55" y1="110" x2="200" y2="110" />
          <line x1="200" y1="110" x2="320" y2="60" /><line x1="200" y1="110" x2="320" y2="110" />
          <line x1="200" y1="110" x2="320" y2="160" />
        </g>

        {/* Travelling particles */}
        {[
          { path: "M80,70 L200,110", dur: "2.1s", begin: "0s" },
          { path: "M80,150 L200,110", dur: "2.5s", begin: "0.7s" },
          { path: "M55,110 L200,110", dur: "2.8s", begin: "0.3s" },
          { path: "M200,110 L320,60", dur: "2.3s", begin: "0.5s" },
          { path: "M200,110 L320,110", dur: "2.6s", begin: "1.0s" },
          { path: "M200,110 L320,160", dur: "2.2s", begin: "1.3s" },
        ].map(({ path, dur, begin }, i) => (
          <circle key={i} r="2.5" fill="#00F0FF" opacity="0.85">
            <animateMotion dur={dur} repeatCount="indefinite" begin={begin} path={path} />
          </circle>
        ))}

        {/* Left nodes */}
        {[{ cx: 80, cy: 70 }, { cx: 55, cy: 110 }, { cx: 80, cy: 150 }].map((n, i) => (
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r="16" fill="rgba(0,240,255,0.05)" stroke="rgba(0,240,255,0.2)" strokeWidth="1" />
            <circle cx={n.cx} cy={n.cy} r="6" fill="rgba(0,240,255,0.5)" />
          </g>
        ))}

        {/* Center node */}
        <circle cx="200" cy="110" r="36" fill="rgba(0,240,255,0.03)" stroke="rgba(0,240,255,0.1)" strokeWidth="1">
          <animate attributeName="r" values="36;40;36" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="110" r="22" fill="rgba(0,240,255,0.07)" stroke="rgba(0,240,255,0.3)" strokeWidth="1" />
        <circle cx="200" cy="110" r="10" fill="#00F0FF" opacity="0.7">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2.4s" repeatCount="indefinite" />
        </circle>
        {/* Center label */}
        <text x="200" y="155" textAnchor="middle" fontSize="9" fill="rgba(0,240,255,0.4)" fontFamily="monospace">AGENT CORE</text>

        {/* Right nodes */}
        {[{ cx: 320, cy: 60 }, { cx: 320, cy: 110 }, { cx: 320, cy: 160 }].map((n, i) => (
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r="14" fill="rgba(0,240,255,0.05)" stroke="rgba(0,240,255,0.18)" strokeWidth="1" />
            <circle cx={n.cx} cy={n.cy} r="5" fill="rgba(0,240,255,0.45)" />
          </g>
        ))}
      </svg>

      {/* Floating "processing" chip */}
      <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#070709]/80 border border-[#00F0FF]/20 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]">
          <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}} .blink{animation:blink 1.4s ease infinite}`}</style>
        </span>
        <span className="text-[9px] font-bold text-[#00F0FF]/70 tracking-widest uppercase blink">Processing</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   VISUAL: BROWSER / WEB
══════════════════════════════════════════════════════════════ */
function BrowserVisual() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((p) => p + 1), 2200);
    return () => clearInterval(t);
  }, []);

  const scores = [["Performance", 98], ["SEO", 100], ["Accessibility", 97]];
  const active = tick % 3;

  return (
    <div className="relative w-full h-56 flex items-end justify-center overflow-hidden bg-[#02040A] px-6 pt-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,240,255,0.07)_0%,_transparent_55%)]" />

      <div
        className="relative w-full max-w-sm rounded-t-xl border border-white/[0.07] bg-[#09090B] overflow-hidden"
        style={{ boxShadow: "0 -16px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,240,255,0.05)" }}
      >
        {/* Chrome bar */}
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/[0.05] bg-black/30">
          <div className="flex gap-1.5">
            {["#FF5F57","#FFBD2E","#28CA41"].map((c,i)=>(
              <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.6 }} />
            ))}
          </div>
          <div className="flex-1 h-5 mx-2 rounded-md bg-white/[0.04] border border-white/[0.05] flex items-center gap-1.5 px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]/40" />
            <span className="text-[8px] text-[#00F0FF]/50 font-mono">aurexissolution.com</span>
          </div>
        </div>

        {/* Page content */}
        <div className="p-4 space-y-2.5">
          {/* Vitals scores */}
          <div className="flex gap-2">
            {scores.map(([label, score], i) => (
              <div
                key={i}
                className="flex-1 rounded-lg p-2 border transition-all duration-500"
                style={{
                  borderColor: active === i ? "rgba(0,240,255,0.3)" : "rgba(255,255,255,0.05)",
                  background: active === i ? "rgba(0,240,255,0.06)" : "rgba(255,255,255,0.02)",
                }}
              >
                <div className="text-[10px] font-bold text-white/80">{score}</div>
                <div className="text-[8px] text-neutral-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
          {/* Skeleton rows */}
          {[1, 0.7, 0.5].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full bg-white/[0.04]" style={{ width: `${w * 100}%` }} />
          ))}
          {/* Image placeholders */}
          <div className="grid grid-cols-3 gap-1.5">
            {[0.07, 0.04, 0.04].map((o, i) => (
              <div key={i} className="h-10 rounded-lg border" style={{ background: `rgba(0,240,255,${o})`, borderColor: `rgba(0,240,255,${o * 2})` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   VISUAL: PHONE / APP
══════════════════════════════════════════════════════════════ */
function PhoneVisual() {
  const [notif, setNotif] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setNotif((p) => !p), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-56 flex items-center justify-center overflow-hidden bg-[#02040A] isolate">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,240,255,0.09)_0%,_transparent_60%)] -z-10" />

      {/* Background Floating UI element (Analytics Widget) */}
      <div 
        className="absolute top-8 left-4 md:left-12 w-32 h-20 rounded-xl border bg-black/60 backdrop-blur-md opacity-30 blur-[1px] -z-10"
        style={{ borderColor: "rgba(0,240,255,0.2)" }}
      >
        <div className="p-3">
          <div className="h-1.5 w-10 bg-white/20 rounded-full mb-3" />
          <div className="flex items-end gap-1 h-8">
            <div className="w-1/4 bg-[#00F0FF]/30 h-1/3 rounded-sm" />
            <div className="w-1/4 bg-[#00F0FF]/30 h-2/3 rounded-sm" />
            <div className="w-1/4 bg-[#00F0FF]/30 h-full rounded-sm" />
            <div className="w-1/4 bg-[#00F0FF] h-4/5 rounded-sm" />
          </div>
        </div>
      </div>

      {/* Background Floating UI element (Code Snippet) */}
      <div 
        className="absolute bottom-6 right-4 md:right-10 w-28 h-24 rounded-xl border bg-black/50 backdrop-blur-md opacity-20 blur-[2px] -z-10"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div className="p-2 space-y-1.5">
          <div className="flex gap-1.5 mb-2 border-b border-white/10 pb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
          </div>
          <div className="h-1 w-full bg-[#00F0FF]/20 rounded-full" />
          <div className="h-1 w-3/4 bg-white/20 rounded-full ml-2" />
          <div className="h-1 w-1/2 bg-[#00F0FF]/40 rounded-full ml-4" />
          <div className="h-1 w-5/6 bg-white/20 rounded-full ml-2" />
        </div>
      </div>

      {/* Main Phone */}
      <div
        className="relative z-10 rounded-[28px] border-[2.5px] bg-[#05060A] overflow-hidden"
        style={{
          width: 120, height: 216,
          borderColor: "rgba(0,240,255,0.35)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.8), 0 0 0 6px rgba(0,240,255,0.03), 0 0 50px rgba(0,240,255,0.15)",
        }}
      >
        {/* Notch */}
        <div className="mx-auto mt-2 w-9 h-3 rounded-full bg-black border border-white/5 z-20 relative shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />

        {/* Dynamic Island glow */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#00F0FF] opacity-[0.03] blur-xl rounded-full pointer-events-none" />

        {/* App UI */}
        <div className="p-2.5 mt-2 space-y-2 relative z-10">
          <div className="h-1.5 rounded-full bg-white/20 w-1/2 mx-auto" />
          
          {/* Main Hero Card in App */}
          <div className="h-[72px] mt-3 rounded-[14px] bg-gradient-to-br from-[#00F0FF]/[0.08] to-transparent border border-[#00F0FF]/20 p-2.5 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#00F0FF]/20 border border-[#00F0FF]/30 flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                <Cpu className="w-3.5 h-3.5 text-[#00F0FF]" />
              </div>
              <div className="space-y-1">
                <div className="h-1 rounded-full bg-white/40 w-12" />
                <div className="h-1 rounded-full bg-[#00F0FF]/50 w-8" />
              </div>
            </div>
            {/* Sparkline inside card */}
            <div className="mt-auto h-4 w-full flex items-end gap-0.5 opacity-60">
                {[2, 4, 3, 5, 4, 7, 5, 8, 10, 7].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-[#00F0FF]/50 to-[#00F0FF]" style={{ height: `${h}px`, borderTopLeftRadius: '1px', borderTopRightRadius: '1px' }} />
                ))}
            </div>
          </div>
          
          {/* Grid Modules */}
          <div className="grid grid-cols-2 gap-1.5">
            <div className="h-11 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center p-2">
               <div className="w-5 h-5 rounded-full border border-dashed border-white/20" />
            </div>
            <div className="h-11 rounded-xl bg-[#00F0FF]/[0.05] border border-[#00F0FF]/15 relative overflow-hidden flex flex-col justify-end p-1.5">
              <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-[#00F0FF] animate-pulse" />
              <div className="h-1 w-3/4 bg-[#00F0FF]/30 rounded-full" />
            </div>
          </div>
          
          {/* Bottom Dock */}
          <div className="absolute bottom-2 left-2 right-2 h-10 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 flex justify-around items-center px-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-5 h-5 rounded-full" style={{ background: i === 0 ? "rgba(0,240,255,0.2)" : "rgba(255,255,255,0.06)", boxShadow: i === 0 ? "0 0 10px rgba(0,240,255,0.2)" : "none" }} />
            ))}
          </div>
        </div>
      </div>

      {/* Floating notification toast (Now overlaps side UI slightly) */}
      <div
        className="absolute top-6 right-2 md:right-8 w-28 md:w-auto md:max-w-[140px] px-3 py-2 rounded-xl border bg-[#09090B]/95 backdrop-blur-xl transition-all duration-700 z-30"
        style={{
          borderColor: "rgba(0,240,255,0.2)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,240,255,0.1)",
          opacity: notif ? 1 : 0,
          transform: notif ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.95)",
        }}
      >
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="w-1 h-1 rounded-full bg-[#00F0FF] animate-pulse" />
          <div className="text-[8px] font-bold text-[#00F0FF] tracking-wide uppercase">Deployment Live</div>
        </div>
        <div className="text-[7.5px] text-neutral-400">v2.4.1 synced to all users</div>
      </div>

      {/* Embedded Platform nodes */}
      <div className="absolute bottom-6 left-6 md:left-12 flex flex-col gap-2 z-20">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
          <span className="text-[9px] font-bold text-white tracking-widest uppercase">iOS Core</span>
        </div>
        <div className="flex items-center gap-2 opacity-50">
           <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
           <span className="text-[9px] font-bold text-white/50 tracking-widest uppercase">Android</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   VISUAL: GROWTH CHART
══════════════════════════════════════════════════════════════ */
function ChartVisual() {
  const [count, setCount] = useState(0);
  const target = 340;

  useEffect(() => {
    let start: number | null = null;
    const duration = 2500;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // Easing function for smoother counter
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const linePath = "M20,150 C80,140 120,130 160,100 C220,55 280,60 380,20";
  // The area path traces the exact same curve but closes at the bottom corners
  const areaPath = `${linePath} L380,180 L20,180 Z`;

  return (
    <div className="relative w-full h-56 flex items-center justify-center overflow-hidden bg-[#02040A] isolate">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(0,240,255,0.15)_0%,_transparent_60%)] -z-10" />
      <div className="absolute -inset-10 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] opacity-30 -z-10" />

      {/* Main Dashboard Widget */}
      <div className="absolute inset-4 rounded-2xl border border-white/[0.04] bg-[#05060A]/40 backdrop-blur-md shadow-2xl flex flex-col justify-between">
        
        {/* Widget Header */}
        <div className="flex justify-between items-start p-5 pb-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-sm bg-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
              <h4 className="text-white text-sm font-semibold tracking-tight">Ecosystem Scaling</h4>
            </div>
            <p className="text-[#00F0FF]/60 text-[10px] uppercase font-bold tracking-wider">Compounding ROI Metric</p>
          </div>
          
          <div className="px-3 py-1.5 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
            </span>
            <span className="text-[#00F0FF] text-[10px] font-bold tracking-widest uppercase">Live Tracking</span>
          </div>
        </div>

        {/* Floating Stat Override */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 z-20">
          <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            +{count}%
          </div>
          <div className="text-xs text-neutral-400 font-medium tracking-wide mt-1">Growth Output</div>
        </div>

        {/* The Graph */}
        <div className="relative w-full h-[120px] mt-auto overflow-hidden rounded-b-2xl">
          <svg viewBox="0 0 400 180" className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="none">
            
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#02040A" stopOpacity="0" />
              </linearGradient>
              <filter id="chartGlow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>

            {/* Faint structural graph lines */}
            {[40, 90, 140].map((y) => (
              <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
            ))}

            {/* Gradient Fill under curve */}
            <path d={areaPath} fill="url(#chartGradient)" />

            {/* The Animated Line */}
            <path 
              d={linePath} 
              stroke="#00F0FF" 
              strokeWidth="3.5" 
              fill="none" 
              filter="url(#chartGlow)"
              strokeLinecap="round"
              style={{ strokeDasharray: 1000, strokeDashoffset: 0 }}
            >
              <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="2.5s" fill="freeze" begin="0s" calcMode="spline" keySplines="0.25 0.1 0.25 1" />
            </path>

            {/* Data Nodes along the curve */}
            {[
              { x: 160, y: 100, delay: "1.2s" },
              { x: 280, y: 60, delay: "1.8s" }
            ].map((node, i) => (
              <g key={i}>
                <circle cx={node.x} cy={node.y} r="0" fill="#00F0FF" opacity="0.8">
                  <animate attributeName="r" values="0;4" dur="0.4s" begin={node.delay} fill="freeze" />
                </circle>
                <circle cx={node.x} cy={node.y} r="0" fill="transparent" stroke="#00F0FF" strokeWidth="1.5" opacity="0.3">
                  <animate attributeName="r" values="0;12" dur="0.4s" begin={node.delay} fill="freeze" />
                </circle>
              </g>
            ))}

            {/* Main Endpoint Glow */}
            <g>
              <circle cx="380" cy="20" r="0" fill="#00F0FF" filter="url(#chartGlow)">
                <animate attributeName="r" values="0;6" dur="0.4s" begin="2.2s" fill="freeze" />
              </circle>
              <circle cx="380" cy="20" r="0" fill="rgba(0,240,255,0.15)" stroke="rgba(0,240,255,0.6)" strokeWidth="1.5">
                <animate attributeName="r" values="0;14;18" dur="2s" begin="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0;1" dur="2s" begin="2.4s" repeatCount="indefinite" />
              </circle>
              {/* Dropdown line from endpoint */}
              <line x1="380" y1="20" x2="380" y2="180" stroke="rgba(0,240,255,0.2)" strokeWidth="1" strokeDasharray="4 4" opacity="0">
                <animate attributeName="opacity" values="0;1" dur="0.5s" begin="2.5s" fill="freeze" />
              </line>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CARD CONTENT SHELL
══════════════════════════════════════════════════════════════ */
type BentoCardData = {
  icon: React.ComponentType<{ className?: string }>;
  visual: React.ReactNode;
  eyebrow: string;
  headline: string;
  subheadline: string;
  description: string;
  accentColor?: string;
  href?: string;
};

function CardContent({ card }: { card: BentoCardData }) {
  const Icon = card.icon;
  return (
    <>
      {/* Visual zone */}
      <div className="overflow-hidden bg-[#02040A]">{card.visual}</div>

      {/* Thin divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mx-6" />

      {/* Text zone */}
      <div className="p-7 space-y-3">
        {/* Icon + Eyebrow */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center border border-white/[0.07] bg-white/[0.03]">
            <Icon className="w-3.5 h-3.5 text-neutral-400" />
          </div>
          <span className="text-[9px] font-bold tracking-[0.22em] uppercase" style={{ color: "rgba(0,240,255,0.65)" }}>
            {card.eyebrow}
          </span>
        </div>

        <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight leading-snug">
          {card.headline}
        </h3>
        <p className="text-xs font-medium" style={{ color: "rgba(0,240,255,0.5)" }}>{card.subheadline}</p>
        <p className="text-sm text-neutral-500 leading-relaxed">{card.description}</p>

        {/* Hover-reveal CTA */}
        {card.href && (
          <div className="pt-2">
            <a
              href={card.href}
              className="group/cta inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-white transition-colors duration-300"
            >
              Learn more
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </a>
          </div>
        )}
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION
══════════════════════════════════════════════════════════════ */
const cards: BentoCardData[] = [
  {
    icon: Cpu,
    visual: <NeuralNetVisual />,
    eyebrow: "Pillar 01 · AI Automation",
    headline: "Intelligent AI Automation & Workflow Engineering",
    subheadline: "Eliminating manual friction with autonomous agents.",
    description:
      "We architect custom LLM integrations, RAG pipelines, and autonomous business agents that remove operational bottlenecks — running 24/7 without error, at scale.",
    href: "/services",
  },
  {
    icon: Globe,
    visual: <BrowserVisual />,
    eyebrow: "Pillar 02 · Web Development",
    headline: "High-Performance Web Architecture & UX Design",
    subheadline: "Ultra-fast, SEO-optimised digital storefronts.",
    description:
      "Built on Next.js, Tailwind, and Supabase. Engineered for perfect Core Web Vitals, maximum conversion, and pixel-perfect responsive design across every device.",
    href: "/services",
  },
  {
    icon: Brain,
    visual: <PhoneVisual />,
    eyebrow: "Pillar 03 · App Development",
    headline: "Scalable Mobile App Engineering (iOS & Android)",
    subheadline: "Seamless mobile experiences built for growth.",
    description:
      "Full-cycle native and cross-platform development. Intuitive user journeys, robust backend integration, and scalable architecture — from MVP to global launch.",
    href: "/services",
  },
  {
    icon: TrendingUp,
    visual: <ChartVisual />,
    eyebrow: "Pillar 04 · Digital Growth",
    headline: "Data-Driven Digital Marketing & Social Growth",
    subheadline: "Narrative-driven strategies that scale your reach.",
    description:
      "Strategic SMM and digital growth consulting leveraging data intelligence. We build content ecosystems that establish brand authority and convert audiences into loyal customers.",
    href: "/services",
  },
];

export function CoreInfrastructure() {
  return (
    <section className="py-20 bg-[#000000]">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <div className="mb-6">
              <AnimatedBadge text="Core Infrastructure" color="#00F0FF" />
            </div>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white leading-[1.06]">
              The stack that moves<br />
              <span className="text-[#2a2a2a]">the modern enterprise.</span>
            </h2>
          </div>
          <p className="text-base text-neutral-500 max-w-xs md:text-right font-light leading-relaxed">
            Four specialized pillars engineered to automate, accelerate, and scale every layer of your business.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5">
          {/* Row 1 */}
          <div className="md:col-span-3">
            <TiltCard className="h-full">
              <CardContent card={cards[0]} />
            </TiltCard>
          </div>
          <div className="md:col-span-2">
            <TiltCard className="h-full">
              <CardContent card={cards[1]} />
            </TiltCard>
          </div>

          {/* Row 2 */}
          <div className="md:col-span-2">
            <TiltCard className="h-full">
              <CardContent card={cards[2]} />
            </TiltCard>
          </div>
          <div className="md:col-span-3">
            <TiltCard className="h-full">
              <CardContent card={cards[3]} />
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
