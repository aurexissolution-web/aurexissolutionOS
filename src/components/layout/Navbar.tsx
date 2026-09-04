"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import GradientStartButton from "@/components/ui/demo";
import { SolutionsMenu } from "@/components/layout/SolutionsMenu";
import { TechEcosystemMenu } from "@/components/layout/TechEcosystemMenu";
import {
  PRIMARY_NAV_LINKS,
  SOLUTIONS_ITEMS,
  SOLUTIONS_FOOTER_LINKS,
  SOLUTIONS_DISCOVERY_PANEL,
  TECH_ECOSYSTEM_ITEMS,
  TECH_ECOSYSTEM_OVERVIEW,
} from "@/data/navigation";
import { trackNavEvent } from "@/lib/navigation/analytics";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [ecosystemOpen, setEcosystemOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileEcosystemOpen, setMobileEcosystemOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      setMobileMenuOpen(false);
      setMobileSolutionsOpen(false);
      setMobileEcosystemOpen(false);
      setSolutionsOpen(false);
      setEcosystemOpen(false);
    });
  }, [pathname]);

  function openSolutions() {
    setEcosystemOpen(false);
    setSolutionsOpen(true);
    trackNavEvent("solutions_menu_open", { current_page: pathname });
  }

  function closeSolutions() {
    setSolutionsOpen((wasOpen) => {
      if (wasOpen) trackNavEvent("solutions_menu_close", { current_page: pathname });
      return false;
    });
  }

  function openEcosystem() {
    setSolutionsOpen(false);
    setEcosystemOpen(true);
    trackNavEvent("ecosystem_menu_open", { current_page: pathname });
  }

  function closeEcosystem() {
    setEcosystemOpen((wasOpen) => {
      if (wasOpen) trackNavEvent("ecosystem_menu_close", { current_page: pathname });
      return false;
    });
  }

  function toggleMobileMenu() {
    setMobileMenuOpen((open) => !open);
    setSolutionsOpen(false);
    setEcosystemOpen(false);
  }

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

          {/* Logo lockup — mark + wordmark */}
          <Link
            href="/"
            className="group inline-flex items-center outline-none flex-shrink-0"
            aria-label="Aurexis Solution — Home"
          >
            <Image
              src="/brand/aurexis-lockup.png"
              alt=""
              width={902}
              height={186}
              priority
              sizes="146px"
              className="h-7 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
            />
          </Link>

          {/* Center Nav Pill — liquid glass */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 60%), rgba(12, 14, 22, 0.42)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "999px",
              backdropFilter: "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.20), 0 1px 0 rgba(255,255,255,0.04), 0 12px 36px rgba(0,0,0,0.45)",
              padding: "4px 6px",
              gap: "2px",
            }}
          >
            <ul className="flex list-none items-center gap-0.5">
              {PRIMARY_NAV_LINKS.map((link) => {
                if (link.type === "solutions-dropdown") {
                  return (
                    <li key={link.label}>
                      <SolutionsMenu
                        variant="header"
                        isOpen={solutionsOpen}
                        onOpen={openSolutions}
                        onClose={closeSolutions}
                        currentPage={pathname}
                        visible={!scrolled}
                      />
                    </li>
                  );
                }
                if (link.type === "ecosystem-dropdown") {
                  return (
                    <li key={link.label}>
                      <TechEcosystemMenu
                        variant="header"
                        isOpen={ecosystemOpen}
                        onOpen={openEcosystem}
                        onClose={closeEcosystem}
                        currentPage={pathname}
                        visible={!scrolled}
                      />
                    </li>
                  );
                }
                const isActive = !solutionsOpen && !ecosystemOpen && pathname === link.href;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex min-h-[44px] items-center text-[13.5px] font-medium transition-colors duration-200 px-4 py-1.5 rounded-full",
                        isActive
                          ? "text-white bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                          : "text-[#9ca3af] hover:text-white hover:bg-white/[0.04]"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: primary CTA */}
          <div className="hidden md:flex items-center gap-3">
            <GradientStartButton />
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden flex items-center justify-center p-2 text-[#9ca3af] hover:text-white transition-colors"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Primary"
            className="md:hidden absolute top-[72px] left-0 right-0 border-b border-white/[0.06] p-4 flex flex-col shadow-2xl"
            style={{ background: "#02040A" }}
          >
            <ul className="flex list-none flex-col">
              {PRIMARY_NAV_LINKS.map((link) => {
                if (link.type === "solutions-dropdown") {
                  return (
                    <li key={link.label} className="border-b border-white/[0.04]">
                      <button
                        type="button"
                        aria-expanded={mobileSolutionsOpen}
                        aria-controls="mobile-solutions-panel"
                        onClick={() => setMobileSolutionsOpen((open) => !open)}
                        className="flex min-h-[44px] w-full items-center justify-between px-4 py-3 text-left text-[14px] font-medium text-[#9ca3af] transition-colors hover:text-white"
                      >
                        Solutions
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            mobileSolutionsOpen && "rotate-180"
                          )}
                        />
                      </button>
                      {mobileSolutionsOpen && (
                        <div id="mobile-solutions-panel" className="flex flex-col gap-1 bg-white/[0.02] pb-3 pl-4 pr-4">
                          {SOLUTIONS_ITEMS.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() =>
                                trackNavEvent("solutions_offer_click", {
                                  offer_name: item.title,
                                  offer_position: SOLUTIONS_ITEMS.indexOf(item) + 1,
                                  current_page: pathname,
                                })
                              }
                              className="flex min-h-[44px] flex-col justify-center border-l border-white/10 py-2 pl-4 text-[13.5px] font-medium text-[#c0c6d1] transition-colors hover:text-white hover:border-[#00F0FF]/50"
                            >
                              {item.title}
                              <span className="mt-0.5 text-[12px] font-normal text-white/40">
                                {item.description}
                              </span>
                            </Link>
                          ))}
                          {SOLUTIONS_FOOTER_LINKS.map((footerLink) => (
                            <Link
                              key={footerLink.href}
                              href={footerLink.href}
                              onClick={() => trackNavEvent(footerLink.analyticsId, { current_page: pathname })}
                              className="flex min-h-[44px] items-center gap-1.5 border-l border-white/10 py-2 pl-4 text-[13px] font-semibold text-[#00F0FF]"
                            >
                              {footerLink.label}
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          ))}
                          <Link
                            href={SOLUTIONS_DISCOVERY_PANEL.buttonHref}
                            onClick={() => trackNavEvent("solutions_discovery_click", { current_page: pathname })}
                            className="flex min-h-[44px] items-center gap-1.5 border-l border-white/10 py-2 pl-4 text-[13px] font-semibold text-white"
                          >
                            {SOLUTIONS_DISCOVERY_PANEL.buttonLabel}
                            <ArrowRight className="h-3.5 w-3.5 text-[#00F0FF]" />
                          </Link>
                        </div>
                      )}
                    </li>
                  );
                }
                if (link.type === "ecosystem-dropdown") {
                  return (
                    <li key={link.label} className="border-b border-white/[0.04]">
                      <button
                        type="button"
                        aria-expanded={mobileEcosystemOpen}
                        aria-controls="mobile-ecosystem-panel"
                        onClick={() => setMobileEcosystemOpen((open) => !open)}
                        className="flex min-h-[44px] w-full items-center justify-between px-4 py-3 text-left text-[14px] font-medium text-[#9ca3af] transition-colors hover:text-white"
                      >
                        Tech Ecosystem
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            mobileEcosystemOpen && "rotate-180"
                          )}
                        />
                      </button>
                      {mobileEcosystemOpen && (
                        <div
                          id="mobile-ecosystem-panel"
                          className="flex flex-col gap-1 bg-[rgba(0,240,255,0.025)] pb-3 pl-4 pr-4"
                        >
                          <p className="border-l border-white/10 py-2 pl-4 text-[12px] leading-relaxed text-white/42">
                            {TECH_ECOSYSTEM_OVERVIEW.body}
                          </p>
                          {TECH_ECOSYSTEM_ITEMS.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() =>
                                trackNavEvent("ecosystem_capability_click", {
                                  capability_name: item.title,
                                  capability_stage: item.stage,
                                  current_page: pathname,
                                })
                              }
                              className="flex min-h-[48px] flex-col justify-center border-l border-white/10 py-2 pl-4 text-[13.5px] font-medium text-[#c0c6d1] transition-colors hover:border-[#00F0FF]/50 hover:text-white"
                            >
                              <span>
                                <span className="mr-2 font-mono text-[11px] text-[#00F0FF]/75">
                                  {item.stage}
                                </span>
                                {item.title}
                              </span>
                              <span className="mt-0.5 text-[12px] font-normal text-white/40">
                                {item.description}
                              </span>
                            </Link>
                          ))}
                          <Link
                            href={TECH_ECOSYSTEM_OVERVIEW.buttonHref}
                            onClick={() => trackNavEvent("ecosystem_overview_click", { current_page: pathname })}
                            className="flex min-h-[44px] items-center gap-1.5 border-l border-white/10 py-2 pl-4 text-[13px] font-semibold text-[#00F0FF]"
                          >
                            {TECH_ECOSYSTEM_OVERVIEW.buttonLabel}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      )}
                    </li>
                  );
                }
                const isActive = pathname === link.href;
                return (
                  <li key={link.label} className="border-b border-white/[0.04] last:border-none">
                    <Link
                      href={link.href}
                      className={cn(
                        "flex min-h-[44px] items-center px-4 py-3 text-[14px] font-medium transition-colors",
                        isActive ? "text-white" : "text-[#9ca3af] hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="h-px w-full bg-white/[0.08] my-4" />
            <Link
              href="/contact#brief"
              className="flex items-center justify-center w-full h-10 rounded-full text-[14px] font-semibold text-black bg-white"
            >
              Start Project
            </Link>
          </nav>
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
          aria-label="Primary"
          className="hidden md:flex items-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 60%), rgba(12, 14, 22, 0.55)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "999px",
            backdropFilter: "blur(32px) saturate(180%)",
            WebkitBackdropFilter: "blur(32px) saturate(180%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.04), 0 16px 48px rgba(0,0,0,0.50)",
            padding: "5px 6px",
            gap: "2px",
          }}
        >
          <ul className="flex list-none items-center gap-0.5">
            {PRIMARY_NAV_LINKS.map((link) => {
              if (link.type === "solutions-dropdown") {
                return (
                  <li key={link.label}>
                    <SolutionsMenu
                      variant="pill"
                      isOpen={solutionsOpen}
                      onOpen={openSolutions}
                      onClose={closeSolutions}
                      currentPage={pathname}
                      visible={scrolled}
                    />
                  </li>
                );
              }
              if (link.type === "ecosystem-dropdown") {
                return (
                  <li key={link.label}>
                    <TechEcosystemMenu
                      variant="pill"
                      isOpen={ecosystemOpen}
                      onOpen={openEcosystem}
                      onClose={closeEcosystem}
                      currentPage={pathname}
                      visible={scrolled}
                    />
                  </li>
                );
              }
              const isActive = !solutionsOpen && !ecosystemOpen && pathname === link.href;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex min-h-[44px] items-center text-[13.5px] font-medium transition-colors duration-200 px-4 py-1.5 rounded-full whitespace-nowrap",
                      isActive
                        ? "text-white bg-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                        : "text-[#9ca3af] hover:text-white hover:bg-white/[0.04]"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Separator */}
          <div
            className="w-px h-4 mx-1 flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.12)" }}
          />

          {/* CTA inside pill */}
          <Link
            href="/contact#brief"
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
