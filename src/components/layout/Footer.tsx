"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Send, CheckCircle } from "lucide-react";

/* ── Newsletter inline ────────────────────────────────────────── */
function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSent(true);
  };

  if (sent) return (
    <div className="flex items-center gap-2 text-sm text-[#00F0FF]">
      <CheckCircle className="w-4 h-4" /> You're subscribed!
    </div>
  );

  return (
    <form onSubmit={submit} className="flex items-center gap-2 mt-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 h-10 px-4 rounded-full text-sm text-white bg-white/[0.05] border border-white/[0.08] placeholder:text-neutral-600 focus:outline-none focus:border-[rgba(0,240,255,0.3)] transition-colors min-w-0"
      />
      <button
        type="submit"
        className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-[rgba(0,240,255,0.3)] hover:bg-[rgba(0,240,255,0.08)] transition-all duration-200"
      >
        <Send className="w-3.5 h-3.5 text-neutral-400" />
      </button>
    </form>
  );
}

/* ── Footer ───────────────────────────────────────────────────── */
const quickLinks = [
  { label: "Home",             href: "/" },
  { label: "About Us",         href: "/about" },
  { label: "Services",         href: "/services" },
  { label: "Portfolio",        href: "/portfolio" },
  { label: "Blog",             href: "/blog" },
  { label: "Contact",          href: "/contact" },
];

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/aurexissolution?igsh=eTJsb3J3aG9wcHc4&utm_source=qr", label: "Instagram" },
  { icon: Facebook,  href: "https://www.facebook.com/share/18HRuAqL75/?mibextid=wwXIfr", label: "Facebook" },
  { icon: Linkedin,  href: "https://www.linkedin.com/company/aurexissolution/", label: "LinkedIn" },
  { icon: Twitter,   href: "https://x.com/aurexissolution?s=21", label: "X (Twitter)" },
];

export function Footer() {
  return (
    <footer className="bg-[#02040A] border-t border-white/[0.06]">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pt-14 pb-10">

          {/* Col 1 – Brand + Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-4">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2 mb-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="AUREXIS SOLUTION"
                className="h-[64px] w-auto object-contain"
              />
              <span className="text-white font-bold text-[15px] tracking-wide">AUREXIS SOLUTION</span>
            </Link>

            <h3 className="text-lg font-semibold text-white leading-snug">
              Stay<br />Connected
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Join our newsletter for the latest updates on AI, web, and growth strategy.
            </p>
            <FooterNewsletter />
          </div>

          {/* Col 2 – Quick Links */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.18em] uppercase text-neutral-500 mb-5">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 – Contact */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.18em] uppercase text-neutral-500 mb-5">Contact Us</h4>
            <ul className="flex flex-col gap-3 text-sm text-neutral-400">
              <li>Kuala Lumpur, Malaysia</li>
              <li>Sungai Petani, Kedah</li>
              <li>
                <a href="tel:+60164071129" className="hover:text-white transition-colors duration-200">
                  +60 164071129
                </a>
              </li>
              <li>
                <a href="mailto:aurexissolution@gmail.com" className="hover:text-white transition-colors duration-200">
                  aurexissolution@gmail.com
                </a>
              </li>
              <li className="mt-1">
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border"
                  style={{ borderColor: "rgba(0,240,255,0.2)", color: "rgba(0,240,255,0.7)", background: "rgba(0,240,255,0.05)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                  Available for new projects
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4 – Follow Us + Theme */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.18em] uppercase text-neutral-500 mb-5">Follow Us</h4>
            <div className="grid grid-cols-2 gap-2 mb-8">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-white/[0.07] bg-white/[0.02] flex items-center justify-center hover:border-[rgba(0,240,255,0.25)] hover:bg-[rgba(0,240,255,0.06)] transition-all duration-200 group"
                >
                  <Icon className="w-4 h-4 text-neutral-500 group-hover:text-[#00F0FF] transition-colors duration-200" />
                </a>
              ))}
            </div>

          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5 border-t border-white/[0.05] text-[12px] text-neutral-600">
          <span>© {new Date().getFullYear()} AUREXIS SOLUTION. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-neutral-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-neutral-400 transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-neutral-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
