"use client";

import { motion } from "framer-motion";
import { DottedMap } from "@/components/ui/DottedMap";
import { MapPin } from "lucide-react";

const locations = [
  {
    city: "Sungai Petani",
    state: "Kedah, Malaysia",
    role: "Headquarters",
    coords: "5.6538° N, 100.4873° E",
    accent: "#00F0FF",
  },
  {
    city: "Kuala Lumpur",
    state: "W.P. Kuala Lumpur, Malaysia",
    role: "Operations Hub",
    coords: "3.1390° N, 101.6869° E",
    accent: "#0047FF",
  },
];

export function LocationSection() {
  return (
    <section className="container mx-auto px-6 max-w-7xl mt-16 mb-0">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 flex items-center gap-4"
      >
        <div className="h-px w-10 bg-[#00F0FF]" />
        <p className="text-xs font-semibold tracking-[0.35em] text-[#00F0FF] uppercase">
          Where We Operate
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">

        {/* Left — text block */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col gap-14"
        >
          <h3 className="text-5xl md:text-6xl font-medium text-white tracking-tight leading-[1.05]">
            Malaysian-built.
            <br />
            <span className="text-neutral-600">Globally engineered.</span>
          </h3>

          {/* Location cards */}
          <div className="space-y-5">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.city}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex items-start gap-5 p-6 rounded-2xl bg-white/[0.025] border border-white/6 hover:border-white/12 transition-all duration-400"
              >
                {/* Accent left bar */}
                <div
                  className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ backgroundColor: loc.accent }}
                />

                {/* Pin icon */}
                <div
                  className="mt-1 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/8"
                  style={{ backgroundColor: `${loc.accent}15` }}
                >
                  <MapPin className="w-4 h-4" style={{ color: loc.accent }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <h4 className="text-xl font-medium text-white">{loc.city}</h4>
                    <span
                      className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border"
                      style={{ color: loc.accent, borderColor: `${loc.accent}30`, backgroundColor: `${loc.accent}10` }}
                    >
                      {loc.role}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 mb-2">{loc.state}</p>
                  <p className="text-xs font-mono text-neutral-600 tracking-widest">{loc.coords}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-[#475569] text-base font-light leading-relaxed max-w-md"
          >
            Rooted in Malaysia, serving clients across Southeast Asia and beyond. We partner remotely and on-site — wherever your business needs us.
          </motion.p>
        </motion.div>

        {/* Right — Flat Dotted Map */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 relative"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 rounded-2xl bg-[#0047FF]/6 blur-[80px] pointer-events-none" />

          <div className="relative w-full overflow-hidden rounded-2xl border border-white/5" style={{ aspectRatio: "16/10" }}>
            <DottedMap />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
