"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    index: "01",
    label: "Intelligence",
    title: "AI that works\nwhile you sleep.",
    description:
      "We turn your messiest operational bottlenecks into silent, self-correcting pipelines. Custom models, agentic loops, and LLM-powered tooling — deployed and maintained end-to-end.",
    tags: ["Agentic Workflows", "LLM Fine-tuning", "RAG Pipelines", "Process Automation"],
    accent: "#00F0FF",
    metric: { value: "10×", label: "avg. output per operator" },
  },
  {
    index: "02",
    label: "Web Engineering",
    title: "Websites that\ncompete and convert.",
    description:
      "Not Webflow templates. Not WordPress themes. Full-stack builds with sub-second Core Web Vitals, immersive 3D interfaces, and conversion architecture baked in from day one.",
    tags: ["Next.js", "Three.js / WebGL", "Headless CMS", "Edge Infra"],
    accent: "#E2E8F0",
    metric: { value: "<0.5s", label: "avg. LCP on delivery" },
  },
  {
    index: "03",
    label: "Mobile Ecosystems",
    title: "Apps users\nactually keep.",
    description:
      "We obsess over the 16ms frame budget, the haptic you barely notice, and the onboarding that doesn't lose people. Cross-platform without the compromise.",
    tags: ["React Native", "Expo EAS", "Real-time sync", "Offline-first"],
    accent: "#0047FF",
    metric: { value: "4.8★", label: "avg. store rating target" },
  },
];

function ServiceRow({
  service,
  isActive,
  onHover,
  onLeave,
  index: _index,
}: {
  service: (typeof services)[number];
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  index: number;
}) {
  return (
    <motion.div
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      className="group relative cursor-default"
    >
      {/* Top divider */}
      <div className="h-px bg-white/8" />

      <div className="grid grid-cols-12 items-start gap-6 py-6 md:py-10">

        {/* Index + Label */}
        <div className="col-span-12 md:col-span-2 flex md:flex-col gap-4 md:gap-2 items-center md:items-start">
          <motion.span
            animate={{ color: isActive ? service.accent : "rgba(255,255,255,0.2)" }}
            transition={{ duration: 0.3 }}
            className="font-mono text-sm tracking-widest"
          >
            {service.index}
          </motion.span>
          <motion.span
            animate={{ opacity: isActive ? 1 : 0.35 }}
            transition={{ duration: 0.3 }}
            className="text-xs uppercase tracking-[0.25em] text-white/70 font-medium"
          >
            {service.label}
          </motion.span>
        </div>

        {/* Title */}
        <div className="col-span-12 md:col-span-4">
          <motion.h4
            animate={{ color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.5)" }}
            transition={{ duration: 0.4 }}
            className="text-3xl md:text-4xl font-medium leading-tight tracking-tight whitespace-pre-line"
          >
            {service.title}
          </motion.h4>
        </div>

        {/* Description + Tags */}
        <div className="col-span-12 md:col-span-4 space-y-6">
          <motion.p
            animate={{ opacity: isActive ? 1 : 0.4 }}
            transition={{ duration: 0.4 }}
            className="text-[#94A3B8] text-base leading-relaxed font-light"
          >
            {service.description}
          </motion.p>

          <motion.div
            animate={{ opacity: isActive ? 1 : 0.3 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-2"
          >
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/60 font-medium tracking-wide"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Metric */}
        <div className="col-span-12 md:col-span-2 flex md:flex-col items-center md:items-end text-right gap-3 md:gap-1">
          <motion.span
            animate={{
              color: isActive ? service.accent : "rgba(255,255,255,0.15)",
            }}
            transition={{ duration: 0.4 }}
            className="text-3xl md:text-4xl font-semibold tracking-tight"
          >
            {service.metric.value}
          </motion.span>
          <motion.span
            animate={{ opacity: isActive ? 0.7 : 0.25 }}
            transition={{ duration: 0.4 }}
            className="text-xs text-white/60 max-w-[100px] leading-snug text-right"
          >
            {service.metric.label}
          </motion.span>
        </div>
      </div>

      {/* Animated left accent bar on active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            style={{ backgroundColor: service.accent }}
            className="absolute left-0 top-0 bottom-0 w-[2px] origin-top"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ValueAdd() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="container mx-auto px-6 max-w-7xl mb-20 pt-10">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-10"
      >
        <div className="space-y-5">
          <p className="text-xs font-medium tracking-[0.4em] text-[#00F0FF] uppercase">
            Core Capabilities
          </p>
          <h3 className="text-5xl md:text-7xl font-medium text-white tracking-tight leading-[1.05]">
            What Aurexis <br className="hidden md:block" />
            <span className="text-neutral-600">actually builds.</span>
          </h3>
        </div>
        <p className="text-[#64748B] text-lg md:text-xl font-light max-w-sm leading-relaxed md:text-right">
          Three disciplines. One aim — architecture that compounds in your favour.
        </p>
      </motion.div>

      {/* Service Rows */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative pl-4"
      >
        {/* Vertical spine */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/5" />

        {services.map((service, i) => (
          <ServiceRow
            key={service.index}
            service={service}
            index={i}
            isActive={activeIndex === i}
            onHover={() => setActiveIndex(i)}
            onLeave={() => setActiveIndex(null)}
          />
        ))}

        {/* Bottom divider */}
        <div className="h-px bg-white/8" />
      </motion.div>

      {/* Bottom CTA strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
      >
        <p className="text-[#475569] text-sm">
          All disciplines ship under one roof — no agency handoffs, no communication gaps.
        </p>
        <a
          href="/contact"
          className="group flex items-center gap-3 text-sm font-semibold text-white hover:text-[#00F0FF] transition-colors duration-300"
        >
          <span>Start a project</span>
          <span className="w-8 h-px bg-white/40 group-hover:w-14 group-hover:bg-[#00F0FF] transition-all duration-500 ease-out block" />
        </a>
      </motion.div>
    </section>
  );
}
