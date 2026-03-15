"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function AboutCTA() {
  return (
    <section className="relative mt-16 mb-0 overflow-hidden">
      {/* Full-bleed background */}
      <div className="absolute inset-0 bg-[#02040A]" />

      {/* Fine grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Ambient glow — cyan left, blue right */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00F0FF]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#0047FF]/8 rounded-full blur-[140px] pointer-events-none" />

      {/* Top edge line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative container mx-auto px-6 max-w-7xl py-24">
        <div className="flex flex-col lg:flex-row lg:items-end gap-16 lg:gap-32">

          {/* Left: headline block */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-[#00F0FF] uppercase mb-8">
              Ready to build?
            </p>
            <h2 className="text-5xl md:text-7xl xl:text-8xl font-medium text-white tracking-tight leading-[1.0]">
              Let's architect
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 via-neutral-500 to-neutral-700">
                your growth engine.
              </span>
            </h2>
          </motion.div>

          {/* Right: body copy + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col justify-end gap-12"
          >
            <p className="text-xl text-[#64748B] font-light leading-relaxed max-w-lg">
              Book a free strategy call. We'll map your biggest operational bottleneck to an AI or engineering solution in 30 minutes — no pitch deck, no fluff.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-5">
              {/* Primary CTA */}
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 bg-[#00F0FF] text-[#02040A] font-bold text-sm tracking-wide px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:bg-white"
              >
                <span className="relative z-10">Book a Free Strategy Call</span>
                <span className="relative z-10 w-5 h-5 rounded-full bg-[#02040A]/15 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>

              {/* Ghost CTA */}
              <Link
                href="/services"
                className="group inline-flex items-center gap-3 text-sm font-semibold text-white/50 hover:text-white transition-colors duration-300 py-4"
              >
                <span>Explore Services</span>
                <span className="w-6 h-px bg-white/30 group-hover:w-10 group-hover:bg-white transition-all duration-500 ease-out" />
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
