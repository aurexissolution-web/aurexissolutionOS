"use client";

import dynamic from "next/dynamic";

// The WebGL shader touches `window` and `THREE`; keep it client-only.
const AnimatedShaderBackground = dynamic(
  () =>
    import("@/components/ui/animated-shader-background").then(
      (mod) => mod.AnimatedShaderBackground,
    ),
  { ssr: false },
);

export function ServicesShaderBackground() {
  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <AnimatedShaderBackground />
      </div>
      {/* Soft corner-only vignette so the type stays legible */}
      <div
        aria-hidden
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 50%, transparent 50%, rgba(3,4,8,0.4) 100%)",
        }}
      />
      {/* Film grain overlay */}
      <div
        aria-hidden
        className="fixed inset-0 z-[1] pointer-events-none mix-blend-overlay opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </>
  );
}
