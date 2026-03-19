"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight, Menu, X } from "lucide-react";
import GradientStartButton from "@/components/ui/demo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { 
    label: "Services", 
    href: "/services",
    subItems: [
      { label: "AI & Agentic Workflows", href: "/services/ai-automation" },
      { label: "Web Engineering", href: "/services/web-engineering" },
      { label: "Mobile Ecosystems", href: "/services/mobile-ecosystems" },
    ]
  },
  { label: "Blog", href: "/blog" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    queueMicrotask(() => setMobileMenuOpen(false));
  }, [pathname]);

  return (
    <>
      {/* ─────────────────────────────────────────────────
          INITIAL STATE: Full-width dark fixed header
          Hidden (opacity-0 pointer-events-none) when scrolled
      ───────────────────────────────────────────────── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "opacity-0 pointer-events-none translate-y-[-100%]"
            : "opacity-100 translate-y-0"
        )}
>
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 outline-none flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="AUREXIS SOLUTION"
              className="h-[48px] w-auto object-contain"
            />
            <span className="text-white font-semibold text-[15px] tracking-[-0.01em]">
              AUREXIS SOLUTION
            </span>
          </Link>

          {/* Center Nav Pill */}
          <nav
            className="hidden md:flex items-center gap-0"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "999px",
              padding: "4px 6px",
              gap: "2px",
            }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return link.subItems ? (
                <div key={link.label} className="relative group/nav-item">
                  <Link
                    href={link.href}
                    className={cn(
                      "text-[13.5px] font-medium transition-colors duration-200 px-4 py-1.5 rounded-full flex items-center gap-1",
                      isActive
                        ? "text-white bg-white/[0.08]"
                        : "text-[#9ca3af] hover:text-white"
                    )}
                  >
                    {link.label}
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 group-hover/nav-item:opacity-100 transition-opacity">
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover/nav-item:opacity-100 group-hover/nav-item:pointer-events-auto transition-all duration-300">
                    <div className="w-[260px] rounded-2xl p-2.5 flex flex-col gap-1 border border-white/10 bg-[#02040A]/95 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.8)] relative overflow-hidden">
                      {/* Subtle top glare */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />
                      
                      {link.subItems.map((sub, idx) => (
                        <Link
                          key={idx}
                          href={sub.href}
                          className="group/sub relative px-4 py-3 rounded-xl flex items-center justify-between text-[13px] font-medium text-[#9ca3af] hover:text-white transition-colors overflow-hidden"
                        >
                          {/* Hover background layer */}
                          <div className="absolute inset-0 bg-gradient-to-r from-white/[0.08] to-transparent opacity-0 group-hover/sub:opacity-100 transition-opacity" />
                          
                          {/* Animated left indicator */}
                          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#00F0FF] scale-y-0 group-hover/sub:scale-y-100 transition-transform origin-top z-10" />

                          <span className="relative z-10">{sub.label}</span>
                          
                          {/* Hover arrow indicator */}
                          <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all text-[#00F0FF] relative z-10" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-[13.5px] font-medium transition-colors duration-200 px-4 py-1.5 rounded-full",
                    isActive
                      ? "text-white bg-white/[0.08]"
                      : "text-[#9ca3af] hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Log in dropdown + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative group/login">
              <button className="text-[13.5px] font-medium text-[#9ca3af] hover:text-white transition-colors duration-200 tracking-[-0.01em] flex items-center gap-1">
                Log in
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 group-hover/login:opacity-100 transition-opacity">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="absolute top-full right-0 pt-3 opacity-0 pointer-events-none group-hover/login:opacity-100 group-hover/login:pointer-events-auto transition-all duration-300">
                <div className="w-[180px] rounded-xl p-1.5 flex flex-col gap-0.5 border border-white/10 bg-[rgba(15,15,20,0.98)] backdrop-blur-3xl shadow-[0_16px_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />
                  {[
                    { label: "Client Portal", href: "/login?redirect=/portal/client", color: "#00F0FF" },
                    { label: "Admin Portal", href: "/login?redirect=/portal/admin", color: "#F59E0B" },
                    { label: "Sales Portal", href: "/login?redirect=/portal/sales", color: "#10B981" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group/sub relative px-3 py-2.5 rounded-lg flex items-center gap-2 text-[12.5px] font-medium text-[#c0c6d1] hover:text-white transition-colors overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/[0.06] opacity-0 group-hover/sub:opacity-100 transition-opacity" />
                      <div className="w-1.5 h-1.5 rounded-full relative z-10" style={{ backgroundColor: item.color }} />
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <GradientStartButton />
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden flex items-center justify-center p-2 text-[#9ca3af] hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[72px] left-0 right-0 border-b border-white/[0.06] p-4 flex flex-col shadow-2xl"
            style={{ background: "#02040A" }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.label} className="border-b border-white/[0.04] last:border-none">
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-4 py-3 text-[14px] font-medium transition-colors",
                      isActive ? "text-white" : "text-[#9ca3af] hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                  {link.subItems && (
                    <div className="flex flex-col pb-3 pl-8 pr-4 gap-3 bg-white/[0.01]">
                      {link.subItems.map((sub, idx) => {
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link
                            key={idx}
                            href={sub.href}
                            className={cn(
                              "text-[13px] font-medium transition-colors border-l border-white/10 pl-4",
                              isSubActive ? "text-[#00F0FF]" : "text-[#64748b] hover:text-white hover:border-[#00F0FF]/50"
                            )}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="h-px w-full bg-white/[0.08] my-4" />
            <p className="text-[10px] text-[#64748B] uppercase tracking-wider font-medium px-4 mb-2">Log in as</p>
            <div className="flex flex-col gap-1.5 px-2">
              {[
                { label: "Client Portal", href: "/login?redirect=/portal/client", color: "#00F0FF" },
                { label: "Admin Portal", href: "/login?redirect=/portal/admin", color: "#F59E0B" },
                { label: "Sales Portal", href: "/login?redirect=/portal/sales", color: "#10B981" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-[14px] font-medium text-[#c0c6d1] hover:text-white hover:bg-white/5 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="h-px w-full bg-white/[0.08] my-4" />
            <Link
              href="/contact"
              className="flex items-center justify-center w-full h-10 rounded-full text-[14px] font-semibold text-black bg-white"
            >
              Start Project
            </Link>
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────
          SCROLLED STATE: Single centered floating pill
          Appears only after scrolling > 50px
      ───────────────────────────────────────────────── */}
      <div
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
          scrolled
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
        )}
      >
        <nav
          className="hidden md:flex items-center"
          style={{
            background: "rgba(15, 15, 20, 0.85)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "999px",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.35)",
            padding: "5px 6px",
            gap: "2px",
          }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return link.subItems ? (
              <div key={link.label} className="relative group/pill-item">
                <Link
                  href={link.href}
                  className={cn(
                    "text-[13.5px] font-medium transition-colors duration-200 px-4 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1",
                    isActive
                      ? "text-white"
                      : "text-[#9ca3af] hover:text-white"
                  )}
                >
                  {link.label}
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 group-hover/pill-item:opacity-100 transition-opacity">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>

                {/* Dropdown Menu (Pill) */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 pointer-events-none group-hover/pill-item:opacity-100 group-hover/pill-item:pointer-events-auto transition-all duration-300">
                  <div className="w-[230px] rounded-xl p-1.5 flex flex-col gap-0.5 border border-white/10 bg-[rgba(15,15,20,0.98)] backdrop-blur-3xl shadow-[0_16px_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
                    {/* Subtle top glare */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />

                    {link.subItems.map((sub, idx) => (
                      <Link
                        key={idx}
                        href={sub.href}
                        className="group/sub relative px-3 py-2.5 rounded-lg flex items-center justify-between text-[12.5px] font-medium text-[#c0c6d1] hover:text-white transition-colors overflow-hidden"
                      >
                        {/* Hover background layer */}
                        <div className="absolute inset-0 bg-white/[0.06] opacity-0 group-hover/sub:opacity-100 transition-opacity" />
                        
                        <span className="relative z-10">{sub.label}</span>

                        <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all text-[#00F0FF] relative z-10" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-[13.5px] font-medium transition-colors duration-200 px-4 py-1.5 rounded-full whitespace-nowrap",
                  isActive
                    ? "text-white"
                    : "text-[#9ca3af] hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Separator */}
          <div
            className="w-px h-4 mx-1 flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.12)" }}
          />

          {/* CTA inside pill */}
          <Link
            href="/contact"
            className="group flex items-center gap-1.5 text-[13.5px] font-medium transition-all duration-200 px-4 py-1.5 rounded-full whitespace-nowrap flex-shrink-0"
            style={{
              color: "#00F0FF",
              border: "1px solid rgba(0, 240, 255, 0.4)",
              borderRadius: "999px",
            }}
          >
            Start Project
            <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </nav>
      </div>
    </>
  );
}
