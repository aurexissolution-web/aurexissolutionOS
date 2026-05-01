"use client";

import { useEffect, useRef, useState } from "react";

export function EcosystemTopology() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
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

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="w-full max-w-[580px] aspect-square relative transition-transform duration-[400ms] ease-out"
    >
      <svg
        viewBox="0 0 600 600"
        fill="none"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="eco-conn-ai" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="eco-conn-web" x1="0" y1="1" x2="1" y2="0.4">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="eco-conn-mobile" x1="1" y1="1" x2="0" y2="0.4">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.85" />
          </linearGradient>
          <radialGradient id="eco-hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="eco-ai-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="eco-web-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="eco-mobile-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* dashed orbit through 3 spokes */}
        <circle
          cx="300"
          cy="343"
          r="253"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
          strokeDasharray="2 7"
          fill="none"
        />

        {/* spoke halos */}
        <circle cx="300" cy="90" r="80" fill="url(#eco-ai-glow)" />
        <circle cx="80" cy="470" r="80" fill="url(#eco-web-glow)" />
        <circle cx="520" cy="470" r="80" fill="url(#eco-mobile-glow)" />

        {/* hub aura */}
        <circle cx="300" cy="343" r="220" fill="url(#eco-hub-glow)" />

        {/* curved bezier connections */}
        <path
          id="eco-path-ai"
          d="M 300 90 Q 240 220 300 343"
          stroke="url(#eco-conn-ai)"
          strokeWidth="1.6"
          strokeDasharray="3 6"
          fill="none"
        />
        <path
          id="eco-path-web"
          d="M 80 470 Q 200 460 300 343"
          stroke="url(#eco-conn-web)"
          strokeWidth="1.6"
          strokeDasharray="3 6"
          fill="none"
        />
        <path
          id="eco-path-mobile"
          d="M 520 470 Q 400 460 300 343"
          stroke="url(#eco-conn-mobile)"
          strokeWidth="1.6"
          strokeDasharray="3 6"
          fill="none"
        />

        {/* traveling data packets — gated on reduced motion */}
        {!reduced && (
          <>
            <circle r="6" fill="#00F0FF">
              <animateMotion dur="2.6s" repeatCount="indefinite">
                <mpath href="#eco-path-ai" />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" dur="2.6s" repeatCount="indefinite" />
            </circle>
            <circle r="6" fill="#8B5CF6">
              <animateMotion dur="2.9s" repeatCount="indefinite">
                <mpath href="#eco-path-web" />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" dur="2.9s" repeatCount="indefinite" />
            </circle>
            <circle r="6" fill="#10B981">
              <animateMotion dur="3.3s" repeatCount="indefinite">
                <mpath href="#eco-path-mobile" />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" dur="3.3s" repeatCount="indefinite" />
            </circle>
          </>
        )}

        {/* AI node (top, cyan) */}
        <circle cx="300" cy="90" r="11" fill="#00F0FF">
          {!reduced && (
            <animate attributeName="r" values="11;15;11" dur="2.6s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx="300" cy="90" r="26" fill="#00F0FF" opacity="0.16" />

        {/* Web node (bottom-left, violet) */}
        <circle cx="80" cy="470" r="11" fill="#8B5CF6">
          {!reduced && (
            <animate attributeName="r" values="11;15;11" dur="2.9s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx="80" cy="470" r="26" fill="#8B5CF6" opacity="0.16" />

        {/* Mobile node (bottom-right, emerald) */}
        <circle cx="520" cy="470" r="11" fill="#10B981">
          {!reduced && (
            <animate attributeName="r" values="11;15;11" dur="3.3s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx="520" cy="470" r="26" fill="#10B981" opacity="0.16" />

        {/* hub */}
        <circle cx="300" cy="343" r="28" fill="#F59E0B" />
        <circle cx="300" cy="343" r="44" fill="#F59E0B" opacity="0.22">
          {!reduced && (
            <>
              <animate attributeName="r" values="44;64;44" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.22;0;0.22" dur="2.4s" repeatCount="indefinite" />
            </>
          )}
        </circle>
      </svg>

      <Label x="50%" y="7%">AI</Label>
      <Label x="13.3%" y="87%">Web</Label>
      <Label x="86.7%" y="87%">Mobile</Label>
      <Label x="50%" y="67%" amber>
        Ecosystem
      </Label>
    </div>
  );
}

function Label({
  x,
  y,
  amber,
  children,
}: {
  x: string;
  y: string;
  amber?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md px-3 py-1.5 rounded-full whitespace-nowrap pointer-events-none"
      style={{
        left: x,
        top: y,
        color: amber ? "#F59E0B" : "#F8FAFC",
        background: amber ? "rgba(245,158,11,0.12)" : "rgba(8,9,13,0.85)",
        border: amber
          ? "1px solid rgba(245,158,11,0.5)"
          : "1px solid rgba(255,255,255,0.18)",
        boxShadow: amber ? "0 0 22px rgba(245,158,11,0.4)" : undefined,
      }}
    >
      {children}
    </div>
  );
}
