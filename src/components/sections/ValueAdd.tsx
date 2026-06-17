"use client";

import { motion, useReducedMotion } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

type StatMetric = { kind: "stat"; value: string; label: string };
type TextMetric = { kind: "text"; value: string };
type Metric = StatMetric | TextMetric;

interface Service {
  index: string;
  label: string;
  title: string;
  deck: string;
  description: string;
  accent: string;
  video: string;
  metric: Metric;
}

const services: Service[] = [
  {
    index: "01",
    label: "AI",
    title: "AI that works\nwhile you sleep.",
    deck: "Output compounds, headcount flat.",
    description:
      "Bottlenecks become silent, self-correcting pipelines. Models, agents, and LLM tooling — deployed end-to-end.",
    accent: "#00F0FF",
    video: "01-ai.mp4",
    metric: { kind: "stat", value: "10×", label: "avg. output per operator" },
  },
  {
    index: "02",
    label: "Website",
    title: "Websites that\ncompete and convert.",
    deck: "Built to compete, not just exist.",
    description:
      "Full-stack builds with sub-second Core Web Vitals and conversion architecture from day one.",
    accent: "#E2E8F0",
    video: "02-website.mp4",
    metric: { kind: "stat", value: "<0.5s", label: "avg. LCP on delivery" },
  },
  {
    index: "03",
    label: "App",
    title: "Apps users\nactually keep.",
    deck: "Native feel. Single codebase.",
    description:
      "16ms frame budgets and onboarding that doesn't lose people. iOS and Android from one codebase.",
    accent: "#0047FF",
    video: "03-app.mp4",
    metric: { kind: "stat", value: "4.8★", label: "avg. store rating target" },
  },
  {
    index: "04",
    label: "Ecosystem",
    title: "One system,\nnot four projects.",
    deck: "One team. One stack. One uptime.",
    description:
      "AI + web + app + integrations as one system. No vendor handoffs, no roadmap conflicts.",
    accent: "#7C5CFF",
    video: "04-ecosystem.mp4",
    metric: { kind: "text", value: "Replaces 3 hires" },
  },
];

interface VideoVisualProps {
  video: string;
  accent: string;
  reduce: boolean;
}

function VideoVisual({ video, accent, reduce }: VideoVisualProps) {
  if (reduce) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 55%, ${accent}40 0%, ${accent}12 30%, transparent 65%)`,
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={`/videos/value-add/${video}`} type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-color"
        style={{ background: accent }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30"
        style={{ background: accent }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-black/15"
      />
    </div>
  );
}

interface ServiceCardProps {
  service: Service;
  index: number;
  reduce: boolean;
}

function ServiceCard({ service, index, reduce }: ServiceCardProps) {
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: reduce ? 0 : 0.1 + index * 0.06,
        ease: easeOut,
      }}
      whileHover={reduce ? undefined : { y: -6 }}
      className="group relative flex aspect-[3/4] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.025] to-transparent transition-[border-color] duration-300 xl:aspect-[3/5]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 1px ${service.accent}55, 0 28px 55px -22px ${service.accent}40`,
        }}
      />

      <div className="relative h-[44%] overflow-hidden">
        <VideoVisual
          video={service.video}
          accent={service.accent}
          reduce={reduce}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-12"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--color-background))",
          }}
        />
      </div>

      <div className="relative flex h-[56%] flex-col gap-2 p-5 pt-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] tracking-[0.32em] text-white/30">
            {service.index}
          </span>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.32em]"
            style={{ color: `${service.accent}cc` }}
          >
            {service.label}
          </span>
        </div>

        <h4 className="whitespace-pre-line font-serif text-[18px] italic leading-[1.1] tracking-[-0.015em] text-white md:text-[19px]">
          {service.title}
        </h4>

        <p
          className="text-[13px] font-medium italic leading-[1.35] tracking-[-0.005em] md:text-[13.5px]"
          style={{ color: `${service.accent}d9` }}
        >
          {service.deck}
        </p>

        <p className="text-[12px] leading-[1.55] text-white/60 md:text-[12.5px]">
          {service.description}
        </p>

        <div className="mt-auto border-t border-white/[0.06] pt-3">
          {service.metric.kind === "stat" ? (
            <div className="flex items-baseline gap-2">
              <span
                className="font-medium text-[26px] leading-none tracking-tight"
                style={{ color: service.accent }}
              >
                {service.metric.value}
              </span>
              <span className="max-w-[120px] text-[10px] leading-tight text-white/45">
                {service.metric.label}
              </span>
            </div>
          ) : (
            <span
              className="block font-serif text-[19px] italic leading-none tracking-tight"
              style={{ color: service.accent }}
            >
              {service.metric.value}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function ValueAdd() {
  const reduceMotion = useReducedMotion();
  const reduce = reduceMotion === true;

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-background)] py-14 md:py-16 lg:py-12">
      <div className="container relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12 lg:mb-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="h-px w-10 bg-[var(--color-electric-cyan)]/60"
              />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.42em] text-[var(--color-electric-cyan)]/80 md:text-[11px]">
                Core Capabilities
              </span>
            </div>
            <h3
              className="font-serif text-[30px] leading-[1.05] tracking-[-0.015em] text-white md:text-[40px] lg:text-[44px] xl:text-[48px]"
              style={{ fontStyle: "normal" }}
            >
              What Aurexis <br className="hidden md:block" />
              <span className="text-white/30">actually builds.</span>
            </h3>
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
            className="max-w-xs text-[13.5px] leading-[1.6] text-white/55 md:text-right md:text-[14px]"
          >
            Four disciplines. One aim — architecture that compounds in your
            favour.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
          {services.map((service, i) => (
            <ServiceCard
              key={service.index}
              service={service}
              index={i}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
