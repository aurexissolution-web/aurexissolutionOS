"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 1.8,          // centered roughly on SE Asia
  theta: -0.15,
  dark: 1,           // dark mode globe
  diffuse: 1.2,
  mapSamples: 20000,
  mapBrightness: 6,
  baseColor: [0.05, 0.05, 0.08],
  markerColor: [0 / 255, 240 / 255, 255 / 255], // #00F0FF
  glowColor: [0 / 255, 71 / 255, 255 / 255],    // #0047FF
  markers: [
    // Sungai Petani, Kedah
    { location: [5.6538, 100.4873], size: 0.08 },
    // Kuala Lumpur
    { location: [3.139, 101.6869], size: 0.1 },
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const phiRef = useRef(config.phi ?? 1.8);
  const widthRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  const onRender = useCallback(
    (state: Record<string, unknown>) => {
      if (pointerInteracting.current === null) phiRef.current += 0.003;
      const s = state as { phi: number; width: number; height: number };
      s.phi = phiRef.current + r;
      s.width = widthRef.current * 2;
      s.height = widthRef.current * 2;
    },
    [r]
  );

  const onResize = useCallback(() => {
    if (!canvasRef.current) return;
    widthRef.current = canvasRef.current.offsetWidth;
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender,
    });

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 100);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [config, onRender, onResize]);

  return (
    <div className={cn("absolute inset-0 mx-auto aspect-square w-full", className)}>
      <canvas
        className="size-full opacity-0 transition-opacity duration-700 [contain:layout_paint_size]"
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(e.clientX - pointerInteractionMovement.current)
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  );
}
