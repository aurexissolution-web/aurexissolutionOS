"use client";

import Link from "next/link";
import {
  Cpu, Globe, Smartphone, TrendingUp,
  FileText, ShieldCheck, ArrowUpRight, CalendarDays,
} from "lucide-react";
import { AnimatedBadge } from "@/components/ui/animated-badge";

/* ── Service items ─────────────────────────────────────────────── */
const services = [
  { icon: Cpu,         label: "AI Automation & Workflow Engineering" },
  { icon: Globe,       label: "High-Performance Web Architecture & UX" },
  { icon: Smartphone,  label: "iOS & Android App Development" },
  { icon: TrendingUp,  label: "Digital Marketing & Social Growth" },
  { icon: FileText,    label: "NDA Signing — every project" },
  { icon: ShieldCheck, label: "Service Agreement — every project" },
];

/* ── Main Section ──────────────────────────────────────────────── */
export function FinalCTA() {
  return (
    <section className="relative pt-24 pb-0 bg-[#000000] overflow-hidden">

      {/* Top soft radial */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,240,255,0.07)_0%,_transparent_65%)]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* ── Hero CTA block ── */}
        <div className="text-center flex flex-col items-center gap-6 mb-20">
          <AnimatedBadge text="Start a Project" color="#00F0FF" />

          <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-white leading-[1.04] max-w-3xl">
            Ready to build your<br />
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, #00F0FF 0%, rgba(0,240,255,0.5) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              unfair advantage?
            </span>
          </h2>

          <p className="text-base md:text-lg text-neutral-500 max-w-xl leading-relaxed">
            Stop struggling with legacy systems. We architect intelligent, high-speed
            ecosystems — engineered for absolute scale.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-black transition-all duration-300 hover:scale-[1.04] active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, #00F0FF 0%, rgba(0,240,255,0.75) 100%)",
                boxShadow: "0 0 36px rgba(0,240,255,0.3)",
              }}
            >
              Get a Quote
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white/70 border border-white/[0.08] hover:text-white hover:border-white/20 transition-all duration-300"
            >
              View all services
            </Link>
          </div>

          {/* Trust badge */}
          <div className="inline-flex items-center gap-2.5 py-2.5 px-5 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="text-[13px] text-neutral-500">
              All projects include a pre-signed <span className="text-white/70 font-medium">NDA</span> and <span className="text-white/70 font-medium">Service Agreement</span>.
            </span>
          </div>
        </div>

        {/* ── Services + Consultation two-col ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px border-t border-white/[0.05]">

          {/* Services list */}
          <div className="pt-12 pb-16 md:pr-12">
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[rgba(0,240,255,0.6)] mb-6">
              What we deliver
            </p>
            <ul className="space-y-4">
              {services.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 group">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.06] bg-white/[0.02] group-hover:border-[rgba(0,240,255,0.2)] group-hover:bg-[rgba(0,240,255,0.05)] transition-all duration-300 shrink-0"
                  >
                    <Icon className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#00F0FF] transition-colors duration-300" />
                  </span>
                  <span className="text-[15px] text-neutral-400 group-hover:text-white/80 transition-colors duration-300">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Consultation CTA */}
          <div className="pt-12 pb-16 md:pl-12 md:border-l border-white/[0.05] flex flex-col justify-between gap-8">
            <div>
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[rgba(0,240,255,0.6)] mb-4">
                Let's talk
              </p>
              <h3 className="text-2xl md:text-3xl font-medium text-white tracking-tight mb-3 leading-snug">
                Not sure where<br />to start?
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-sm">
                Book a free 30-minute strategy call with our team. We'll map out exactly
                what your business needs — no pressure, no commitment.
              </p>
            </div>

            <div className="space-y-4">
              {/* Perks */}
              <ul className="space-y-2">
                {[
                  "30-minute focused strategy session",
                  "Custom roadmap delivered after the call",
                  "NDA + Service Agreement provided upfront",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-neutral-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 w-fit px-7 py-4 rounded-2xl text-sm font-bold text-black transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background: "linear-gradient(135deg, #00F0FF 0%, rgba(0,240,255,0.8) 100%)",
                  boxShadow: "0 0 40px rgba(0,240,255,0.25), 0 4px 20px rgba(0,240,255,0.15)",
                }}
              >
                <CalendarDays className="w-4 h-4 shrink-0" />
                Book your free consultation now
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <p className="text-[11px] text-neutral-600">
                Slots are limited — we work with a select number of clients at a time.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
