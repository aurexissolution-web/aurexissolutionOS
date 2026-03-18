"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { PortfolioItem } from "@/types/portal";

const FILTERS = ["All", "AI Automation", "Web Development", "App Development"] as const;

export default function PortfolioPage() {
  const [filter, setFilter] = useState<string>("All");
  const [hovered, setHovered] = useState<string | null>(null);
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/portfolio");
        const json = await res.json();
        if (json.data) {
          setProjects(json.data as PortfolioItem[]);
        }
      } catch {}
      setLoading(false);
    }
    loadProjects();
  }, []);

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.tech_tags?.includes(filter));

  return (
    <div className="flex flex-col min-h-screen bg-[#02040A] text-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 relative overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[700px] h-[500px] bg-[#7C3AED]/8 blur-[150px] rounded-full" />
          <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-[#00F0FF]/8 blur-[140px] rounded-full" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl pt-36 pb-28">

          {/* ── HEADER ── */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs text-[#64748B] uppercase tracking-[0.2em] mb-5 font-medium">
                Selected Work
              </p>
              <h1 className="text-6xl md:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] text-white">
                The{" "}
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.25)" }}
                >
                  Case
                </span>{" "}
                Files.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[#64748B] text-lg max-w-xs leading-relaxed"
            >
              Proven architecture.{" "}
              <span className="text-white/60">Measurable results.</span> Every
              engagement starts with a strategy session.
            </motion.p>
          </div>

          {/* ── FILTER TABS ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-2 mb-16 border-b border-white/[0.06] pb-6"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 text-sm rounded-full transition-all duration-300 font-medium ${
                  filter === f
                    ? "bg-white text-[#02040A]"
                    : "text-[#64748B] hover:text-white hover:bg-white/[0.05] border border-white/[0.08]"
                }`}
              >
                {f}
              </button>
            ))}
            <span className="ml-auto text-xs text-[#64748B]">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
            </span>
          </motion.div>

          {/* ── PROJECT TABLE / CARDS ── */}
          {loading ? (
            <div className="py-20 text-center text-white/40">Loading portfolio...</div>
          ) : filteredProjects.length === 0 ? (
            <div className="py-20 text-center text-white/40">No projects to display yet.</div>
          ) : (
            <>
              {/* Desktop: table-style rows */}
              <div className="hidden lg:block">
                <motion.div layout className="space-y-0">
                  <AnimatePresence>
                    {filteredProjects.map((project, i) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, delay: i * 0.05 }}
                        onHoverStart={() => setHovered(project.id)}
                        onHoverEnd={() => setHovered(null)}
                      >
                        <Link href={`/portfolio/${project.slug}`}>
                          <div
                            className={`group relative flex items-center gap-8 py-7 px-6 border-b border-white/[0.05] transition-all duration-300 rounded-xl cursor-pointer ${
                              hovered === project.id
                                ? "bg-white/[0.025]"
                                : "bg-transparent"
                            }`}
                          >
                            {/* Glow dot (color per project) */}
                            {hovered === project.id && (
                              <motion.div
                                layoutId="hoverGlow"
                                className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-[#00F0FF]"
                                transition={{ duration: 0.2 }}
                              />
                            )}

                            {/* Index number */}
                            <span className="text-xs text-[#334155] font-mono w-6 shrink-0">
                              {String(i + 1).padStart(2, "0")}
                            </span>

                            {/* Small color dot */}
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-300"
                              style={{
                                backgroundColor:
                                  hovered === project.id ? "#00F0FF" : "#334155",
                                boxShadow:
                                  hovered === project.id
                                    ? `0 0 10px #00F0FF80`
                                    : "none",
                              }}
                            />

                            {/* Thumbnail — slides in on hover for projects with images */}
                            {project.images?.[0] && (
                              <div
                                className={`relative shrink-0 rounded-lg overflow-hidden border border-white/10 transition-all duration-500 ${
                                  hovered === project.id
                                    ? "opacity-100 w-20 h-12"
                                    : "opacity-0 w-0 h-12"
                                }`}
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={project.images[0]}
                                  alt={project.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}

                            {/* Title */}
                            <span className="text-xl font-semibold text-white group-hover:text-white transition-colors flex-1 min-w-[180px]">
                              {project.title}
                            </span>


                            {/* Description (hidden until hover) */}
                            <span
                              className={`text-sm text-[#64748B] flex-[2] leading-relaxed transition-all duration-300 ${
                                hovered === project.id ? "opacity-100" : "opacity-0"
                              }`}
                            >
                              {project.description}
                            </span>

                            {/* Category */}
                            <span className="text-xs text-[#64748B] font-medium uppercase tracking-widest w-36 text-right shrink-0">
                              {project.tech_tags?.[0] || "Project"}
                            </span>

                            {/* Stat */}
                            <span
                              className="text-sm font-medium w-44 text-right shrink-0 transition-colors duration-300"
                              style={{
                                color: hovered === project.id ? "#00F0FF" : "#94A3B8",
                              }}
                            >
                              {project.client_name}
                            </span>

                            {/* Year */}
                            <span className="text-xs text-[#334155] w-10 text-right shrink-0">
                              {new Date(project.created_at).getFullYear()}
                            </span>

                            {/* Arrow */}
                            <ArrowUpRight
                              className={`w-5 h-5 shrink-0 transition-all duration-300 ${
                                hovered === project.id
                                  ? "opacity-100 text-white translate-x-0 -translate-y-0"
                                  : "opacity-0 -translate-x-1 translate-y-1"
                              }`}
                            />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Mobile: card grid */}
              <div className="lg:hidden">
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <AnimatePresence>
                    {filteredProjects.map((project, i) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        <Link href={`/portfolio/${project.slug}`}>
                          <div className="group relative overflow-hidden p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.12] transition-all duration-300 cursor-pointer">
                            {/* Image banner for projects that have one */}
                            {project.images?.[0] && (
                              <div className="-mx-6 -mt-6 mb-5 h-36 overflow-hidden rounded-t-2xl">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={project.images[0]}
                                  alt={project.title}
                                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#02040A]/80 pointer-events-none" />
                              </div>
                            )}
                            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, #00F0FF60, transparent)` }} />
                            <div className="flex items-start justify-between mb-4">
                              <span className="text-xs text-[#334155] font-mono">{String(i + 1).padStart(2, "0")}</span>
                              <ArrowUpRight className="w-4 h-4 text-[#334155] group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                            <p className="text-xs text-[#64748B] mb-4 leading-relaxed">{project.description}</p>
                            <p className="text-sm font-medium text-[#00F0FF]">{project.client_name}</p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </>
          )}

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-32 pt-16 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          >
            <div>
              <p className="text-xs text-[#64748B] uppercase tracking-widest mb-3">
                Next step
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                Inspired by these results?
              </h2>
            </div>
            <Link
              href="/contact"
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-[#02040A] font-semibold text-sm hover:bg-white/90 transition-all duration-300 shrink-0"
            >
              Let's build yours
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
