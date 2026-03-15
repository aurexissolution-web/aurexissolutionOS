"use client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Bot, Code2, Smartphone, ArrowUpRight, Check, Zap, Globe, Shield } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const SERVICES = [
  {
    id: "ai-automation",
    index: "01",
    title: "AI Automation",
    tagline: "Replace headcount with intelligent systems.",
    desc: "Custom LLMs, RAG pipelines, and autonomous workflow agents engineered to replace repetitive ops — not just speed them up.",
    icon: Bot,
    color: "#00F0FF",
    image: "/svc-ai.png",
    outcomes: [
      "50+ hours/week reclaimed per team",
      "Custom GPT-4o fine-tuned agents",
      "Integrates with your existing stack",
      "Autonomous decision-making pipelines",
    ],
    label: "AI & LLM",
  },
  {
    id: "web-development",
    index: "02",
    title: "Web Engineering",
    tagline: "Performance is a feature, not an afterthought.",
    desc: "Ultra-fast, meticulously designed digital platforms on Next.js and headless architectures. Built for SEO dominance and conversion.",
    icon: Code2,
    color: "#7C3AED",
    image: "/svc-web.png",
    outcomes: [
      "Sub-1.5s global load times",
      "99+ Lighthouse performance score",
      "Headless CMS & e-commerce ready",
      "Conversion-optimised by design",
    ],
    label: "Web & SEO",
  },
  {
    id: "app-development",
    index: "03",
    title: "Mobile Ecosystems",
    tagline: "Native performance. Zero compromise.",
    desc: "Seamless iOS and Android experiences built with React Native. Designed to scale from 0 to 100k users without friction.",
    icon: Smartphone,
    color: "#059669",
    image: "/svc-app.png",
    outcomes: [
      "iOS + Android from one codebase",
      "60fps animations as standard",
      "Offline-first architecture",
      "App Store launch support included",
    ],
    label: "Mobile & App",
  },
];

const STATS = [
  { value: "50+", label: "Founders served" },
  { value: "3×", label: "Avg conversion lift" },
  { value: "1.2s", label: "Avg load time" },
  { value: "100%", label: "NDA protected" },
];

export default function ServicesHubPage() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#02040A] text-[#F8FAFC] flex flex-col">
      <Navbar />

      <main className="flex-1 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#00F0FF]/8 to-transparent blur-[160px] rounded-full" />
          <div className="absolute bottom-1/3 right-0 w-[600px] h-[400px] bg-[#7C3AED]/6 blur-[140px] rounded-full" />
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-24 max-w-4xl"
          >
            <p className="text-xs text-[#64748B] uppercase tracking-[0.2em] mb-5 font-medium">
              Our Capabilities
            </p>
            <h1 className="text-6xl md:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] text-white mb-8">
              Specialized{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.25)" }}
              >
                Architecture.
              </span>
            </h1>
            <p className="text-[#64748B] text-xl leading-relaxed max-w-2xl">
              We don't sell packages. We engineer custom ecosystems. Each service is a
              precision-built system — not a template.
            </p>
          </motion.div>

          {/* ── STATS ROW ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06] mb-24"
          >
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center py-8 px-4 text-center bg-[#02040A] hover:bg-white/[0.015] transition-colors"
              >
                <span className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tighter">
                  {value}
                </span>
                <span className="text-xs text-[#64748B] font-medium uppercase tracking-widest">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* ── SERVICE CARDS ── */}
          <div className="space-y-6 mb-28">
            {SERVICES.map((svc, i) => {
              const Icon = svc.icon;
              const isHovered = hovered === svc.id;

              return (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  onHoverStart={() => setHovered(svc.id)}
                  onHoverEnd={() => setHovered(null)}
                >
                  <Link href={`/services/${svc.id}`}>
                    <div
                      className={`group relative rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer ${
                        isHovered ? "border-white/[0.12]" : "border-white/[0.05]"
                      }`}
                    >
                      {/* Background image */}
                      <div className="absolute inset-0 z-0">
                        <img
                          src={svc.image}
                          alt={svc.title}
                          className={`w-full h-full object-cover transition-all duration-700 ${
                            isHovered ? "opacity-20 scale-105" : "opacity-8 scale-100"
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#02040A] via-[#02040A]/95 to-[#02040A]/60" />
                      </div>

                      {/* Top accent line */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-px transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
                        style={{ background: `linear-gradient(90deg, transparent, ${svc.color}, transparent)` }}
                      />

                      {/* Content */}
                      <div className="relative z-10 grid lg:grid-cols-[auto_1fr_auto] items-center gap-8 md:gap-12 p-8 md:p-10 lg:p-12">

                        {/* Left: index + icon */}
                        <div className="flex lg:flex-col items-center lg:items-start gap-6 lg:gap-4">
                          <span className="text-xs text-[#334155] font-mono">{svc.index}</span>
                          <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                              isHovered ? "border-opacity-100" : "border-white/10"
                            }`}
                            style={{
                              borderColor: isHovered ? `${svc.color}50` : undefined,
                              backgroundColor: isHovered ? `${svc.color}10` : "rgba(255,255,255,0.03)",
                              boxShadow: isHovered ? `0 0 20px ${svc.color}30` : "none",
                            }}
                          >
                            <Icon
                              className="w-6 h-6 transition-colors duration-300"
                              style={{ color: isHovered ? svc.color : "#64748B" }}
                            />
                          </div>
                        </div>

                        {/* Center: text */}
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span
                              className="text-xs font-bold uppercase tracking-widest"
                              style={{ color: svc.color }}
                            >
                              {svc.label}
                            </span>
                          </div>
                          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3 leading-tight">
                            {svc.title}
                          </h2>
                          <p className="text-[#64748B] text-sm font-medium mb-4 italic">
                            "{svc.tagline}"
                          </p>
                          <p className="text-[#94A3B8] leading-relaxed max-w-xl">
                            {svc.desc}
                          </p>
                        </div>

                        {/* Right: outcomes + CTA */}
                        <div className="lg:min-w-[260px]">
                          <ul className="space-y-2.5 mb-8">
                            {svc.outcomes.map((o) => (
                              <li key={o} className="flex items-start gap-2.5 text-sm text-[#94A3B8]">
                                <Check
                                  className="w-4 h-4 shrink-0 mt-0.5 transition-colors duration-300"
                                  style={{ color: isHovered ? svc.color : "#334155" }}
                                />
                                {o}
                              </li>
                            ))}
                          </ul>
                          <div
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                              isHovered
                                ? "bg-white text-[#02040A]"
                                : "bg-white/[0.05] text-white border border-white/10"
                            }`}
                          >
                            Explore Service
                            <ArrowUpRight
                              className={`w-4 h-4 transition-transform duration-300 ${isHovered ? "translate-x-0.5 -translate-y-0.5" : ""}`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* ── ENTERPRISE CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden border border-white/[0.06]"
          >
            {/* Background: layered gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c0f1a] to-[#02040A]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#00F0FF]/8 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent" />

            <div className="relative z-10 grid lg:grid-cols-[1fr_auto] items-center gap-10 p-10 md:p-14">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  {[Zap, Globe, Shield].map((Icon, i) => (
                    <div key={i} className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#64748B]" />
                    </div>
                  ))}
                  <span className="text-xs text-[#64748B] ml-1 uppercase tracking-widest font-medium">Full Stack Enterprise</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4 leading-tight">
                  Want the Full Stack Edge?
                </h2>
                <p className="text-[#64748B] text-lg leading-relaxed max-w-xl">
                  Looking for a complete overhaul connecting Web, App, and AI Automation into one intelligent ecosystem? Let's architect it together.
                </p>
              </div>

              <div className="flex flex-col gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-[#02040A] font-semibold text-sm hover:bg-white/90 transition-all duration-300 whitespace-nowrap"
                >
                  Book Enterprise Discovery
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <p className="text-center text-xs text-[#334155]">
                  Free 45-min strategy session · NDA protected
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
