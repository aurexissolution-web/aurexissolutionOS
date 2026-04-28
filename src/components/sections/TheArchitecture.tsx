"use client";

import { motion } from "framer-motion";

type Layer = {
  number: string;
  label: string;
  description: string;
};

const layers: Layer[] = [
  {
    number: "01",
    label: "Front Door",
    description:
      "Web platforms, apps, customer portals — the surface people actually touch.",
  },
  {
    number: "02",
    label: "Operations",
    description:
      "Internal workflows, dashboards, daily-driver processes — how the business runs.",
  },
  {
    number: "03",
    label: "AI Agents",
    description:
      "Autonomous decisions, support, content, ops automation — intelligence on top.",
  },
  {
    number: "04",
    label: "Glue",
    description:
      "APIs, syncs, webhooks, data passing — the integration tissue underneath.",
  },
];

export function TheArchitecture() {
  return (
    <section className="relative bg-[var(--color-background)] pt-8 pb-20 px-6 overflow-hidden">
      {/* Top rim-light highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent"
      />
      {/* Ambient cyan halos for atmospheric depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-56 rounded-full bg-[var(--color-electric-cyan)]/8 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 w-[360px] h-48 rounded-full bg-[var(--color-electric-cyan)]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40 mb-5">
            The Architecture
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em] leading-[1.05] text-white text-balance mb-6">
            One{" "}
            <em
              className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
              style={{ filter: "drop-shadow(0 0 18px rgba(0,240,255,0.32))" }}
            >
              system
            </em>
            . Four layers.
          </h2>
          <p className="mx-auto max-w-2xl text-[16px] md:text-[17px] leading-[1.6] text-white/55 text-balance">
            An ecosystem isn&apos;t a stack of disconnected tools. It&apos;s coordinated
            layers that pass work between them — surface, processes, intelligence,
            integration. Here&apos;s what we build, top to bottom.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <motion.div
            aria-hidden
            className="absolute left-0 top-0 bottom-0 w-px bg-[var(--color-electric-cyan)]/40 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          />

          <div className="relative pl-8 lg:pl-12">
            <motion.div
              aria-hidden
              className="h-px w-20 bg-[var(--color-electric-cyan)]/60 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            />

            {layers.map((layer, i) => (
              <motion.article
                key={layer.number}
                className={`py-5 lg:grid lg:grid-cols-[80px_220px_1fr] lg:gap-x-6 lg:items-baseline ${
                  i < layers.length - 1 ? "border-b border-white/[0.06]" : ""
                }`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: "easeOut" }}
              >
                <div className="flex items-baseline gap-3 lg:contents">
                  <span
                    aria-hidden
                    className="font-serif italic text-[32px] md:text-[36px] leading-none text-white/15 select-none lg:block"
                  >
                    {layer.number}
                  </span>
                  <span className="flex items-baseline gap-3 text-[13px] md:text-[14px] font-semibold uppercase tracking-[0.22em] text-white/85">
                    <span aria-hidden className="text-[var(--color-electric-cyan)]/70 select-none">
                      ──
                    </span>
                    <span>{layer.label}</span>
                  </span>
                </div>
                <p className="text-[15px] md:text-[16px] leading-[1.6] text-white/55 max-w-xl mt-3 lg:mt-0">
                  {layer.description}
                </p>
              </motion.article>
            ))}

            <motion.div
              aria-hidden
              className="h-px w-20 bg-[var(--color-electric-cyan)]/60 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          </div>
        </div>

        <motion.p
          className="mx-auto max-w-3xl text-center mt-12 text-lg md:text-xl lg:text-2xl text-white/65 leading-relaxed text-balance"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          Web and apps are wrappers. The system underneath{" "}
          <em
            className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
            style={{ filter: "drop-shadow(0 0 14px rgba(0,240,255,0.28))" }}
          >
            is the product.
          </em>
        </motion.p>
      </div>
    </section>
  );
}
