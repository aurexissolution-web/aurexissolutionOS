"use client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import { Shield, Mail, Phone, MapPin, ArrowUpRight, Clock } from "lucide-react";

const SOCIAL_LINKS = [
  {
    label: "X (Twitter)",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

const CONTACT_DETAILS = [
  { icon: <Mail className="w-4 h-4" />, label: "hello@aurexis.com", href: "mailto:hello@aurexis.com" },
  { icon: <Phone className="w-4 h-4" />, label: "+60 2026-6020", href: "tel:+60202663020" },
  { icon: <MapPin className="w-4 h-4" />, label: "Kuala Lumpur, Malaysia", href: null },
];

export default function ContactPage() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const t = new Date().toLocaleTimeString("en-MY", {
        timeZone: "Asia/Kuala_Lumpur",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(t);
    };
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "strategy-session" });
      cal("ui", {
        styles: { branding: { brandColor: "#00F0FF" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#02040A] text-[#F8FAFC]">
      <Navbar />

      {/* Full-page layout wrapper */}
      <main className="flex-1 relative overflow-hidden">

        {/* === BACKGROUND LAYERS === */}
        {/* Far background noise texture would go here; using layered gradients instead */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Primary cyan glow — top center */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#00F0FF]/10 blur-[160px] rounded-full" />
          {/* Secondary warm glow — bottom right */}
          <div className="absolute bottom-[10%] right-0 w-[600px] h-[400px] bg-[#0047FF]/8 blur-[140px] rounded-full" />
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* === MAIN CONTENT === */}
        <div className="relative z-10 min-h-screen grid lg:grid-cols-[1fr_1.1fr] xl:grid-cols-[1fr_1.2fr]">

          {/* ========================================================== */}
          {/* LEFT COLUMN — Editorial / Contact info                      */}
          {/* ========================================================== */}
          <div className="flex flex-col justify-between px-8 md:px-12 lg:px-16 pt-36 pb-12 lg:border-r border-white/[0.06]">

            {/* Top block */}
            <div>
              {/* Live time pill */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 mb-10 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-[#94A3B8]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00F0FF]" />
                </span>
                <Clock className="w-3 h-3" />
                {time && <span>KL time · {time}</span>}
              </motion.div>

              {/* Main headline */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tighter text-white mb-7">
                  Let's build <br />
                  <span
                    className="text-transparent"
                    style={{
                      WebkitTextStroke: "1.5px rgba(255,255,255,0.3)",
                    }}
                  >
                    something
                  </span>
                  <br />
                  that lasts.
                </h1>

                <p className="text-[#64748B] text-lg leading-relaxed max-w-md mb-12">
                  Book a complimentary{" "}
                  <span className="text-white/70">45-minute strategy session</span>. 
                  We'll audit your stack, surface your bottlenecks, and give you a concrete roadmap — no fluff, no pitch.
                </p>
              </motion.div>

              {/* Social proof row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="flex items-center gap-4 mb-14"
              >
                <div className="flex -space-x-2.5">
                  {["seed=f1", "seed=f2", "seed=f3", "seed=f4"].map((s, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border-2 border-[#02040A] overflow-hidden bg-zinc-800 ring-1 ring-white/10"
                    >
                      <img
                        src={`https://api.dicebear.com/7.x/lorelei/svg?${s}`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">50+ technical founders</p>
                  <p className="text-[#64748B] text-xs">have already booked a session</p>
                </div>
              </motion.div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-white/10 to-transparent mb-10" />

              {/* Contact details */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="space-y-4 mb-10"
              >
                {CONTACT_DETAILS.map(({ icon, label, href }) =>
                  href ? (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-3 text-[#64748B] hover:text-[#00F0FF] transition-colors duration-300 group w-fit"
                    >
                      <span className="text-[#94A3B8] group-hover:text-[#00F0FF] transition-colors">
                        {icon}
                      </span>
                      <span className="text-sm">{label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <div key={label} className="flex items-center gap-3 text-[#64748B]">
                      <span className="text-[#94A3B8]">{icon}</span>
                      <span className="text-sm">{label}</span>
                    </div>
                  )
                )}
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex gap-3"
              >
                {SOCIAL_LINKS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-[#64748B] hover:text-[#00F0FF] hover:border-[#00F0FF]/40 hover:bg-[#00F0FF]/5 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300"
                  >
                    {icon}
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Bottom — NDA note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 flex items-start gap-3 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
            >
              <Shield className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
              <p className="text-[#64748B] text-xs leading-relaxed">
                <span className="text-white text-sm font-medium block mb-0.5">Your IP is protected.</span>
                All sessions are covered by our standard mutual NDA from minute one. No screenshots, no sharing, no risk.
              </p>
            </motion.div>
          </div>

          {/* ========================================================== */}
          {/* RIGHT COLUMN — Booking widget                               */}
          {/* ========================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col pt-28 pb-12 px-6 md:px-10 lg:px-12 relative"
          >
            {/* Subtle glow behind widget */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00F0FF]/8 blur-[120px] rounded-full pointer-events-none" />

            {/* Label above widget */}
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div>
                <p className="text-xs text-[#64748B] uppercase tracking-widest font-medium">Step 1 of 1</p>
                <p className="text-white font-semibold mt-0.5">Select your preferred time</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#64748B] border border-white/10 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                45-min session
              </div>
            </div>

            {/* The Cal.com widget itself */}
            <div className="relative z-10 flex-1 w-full max-h-[650px] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#040C18] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_32px_80px_rgba(0,0,0,0.6)]">
              {/* Top chrome bar */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/[0.04] to-transparent flex items-center px-4 gap-2 z-10 pointer-events-none">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>

              {/* Gradient edge framing */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06] pointer-events-none z-20" />

              <Cal
                namespace="strategy-session"
                calLink="aurexis-solution/45min"
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                config={{ layout: "month_view", hideEventTypeDetails: "false" }}
              />
            </div>

            {/* Below widget hint */}
            <p className="text-center text-xs text-[#64748B] mt-5 relative z-10">
              Powered by{" "}
              <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                Cal.com
              </a>{" "}
              · End-to-end encrypted booking
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
