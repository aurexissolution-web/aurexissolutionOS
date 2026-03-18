"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";
import { ensureUserProfile, portalRouteForRole, allowedSectionsForRole } from "@/lib/supabase/profile";
import type { PortalSection } from "@/lib/supabase/profile";
import type { ClientProfile } from "@/types/portal";
import {
  LayoutDashboard,
  User,
  Ticket,
  MessageSquare,
  Map,
  FileText,
  CreditCard,
  Users,
  Link2,
  PenTool,
  Image as ImageIcon,
  Settings,
  DollarSign,
  TrendingUp,
  BarChart3,
  Kanban,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Shield,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

// PortalSection type imported from profile.ts
type IconComp = React.ComponentType<LucideProps>;

interface NavItem {
  label: string;
  href: string;
  icon: IconComp;
}

const clientNav: NavItem[] = [
  { label: "Dashboard", href: "/portal/client", icon: LayoutDashboard },
  { label: "Profile", href: "/portal/client/profile", icon: User },
  { label: "Help Desk", href: "/portal/client/tickets", icon: Ticket },
  { label: "Feedback", href: "/portal/client/feedback", icon: MessageSquare },
  { label: "Roadmap", href: "/portal/client/roadmap", icon: Map },
  { label: "Documents", href: "/portal/client/documents", icon: FileText },
  { label: "Invoices", href: "/portal/client/invoices", icon: CreditCard },
];

const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/portal/admin", icon: LayoutDashboard },
  { label: "Client CRM", href: "/portal/admin/clients", icon: Users },
  { label: "Project Control", href: "/portal/admin/projects", icon: Settings },
  { label: "Tickets", href: "/portal/admin/tickets", icon: Ticket },
  { label: "Feedback", href: "/portal/admin/feedback", icon: MessageSquare },
  { label: "Documents", href: "/portal/admin/documents", icon: FileText },
  { label: "Invoices", href: "/portal/admin/invoices", icon: CreditCard },
  { label: "Access Control", href: "/portal/admin/invites", icon: Link2 },
  { label: "Blog Engine", href: "/portal/admin/blog", icon: PenTool },
  { label: "Portfolio", href: "/portal/admin/portfolio", icon: ImageIcon },
];

const salesNav: NavItem[] = [
  { label: "Dashboard", href: "/portal/sales", icon: LayoutDashboard },
  { label: "Income", href: "/portal/sales/income", icon: DollarSign },
  { label: "Expenses", href: "/portal/sales/expenses", icon: TrendingUp },
  { label: "Net Profit", href: "/portal/sales/profit", icon: BarChart3 },
  { label: "Lead Pipeline", href: "/portal/sales/pipeline", icon: Kanban },
];

const sections: { key: PortalSection; label: string; nav: NavItem[] }[] = [
  { key: "client", label: "Client Portal", nav: clientNav },
  { key: "admin", label: "Admin Portal", nav: adminNav },
  { key: "sales", label: "Sales Portal", nav: salesNav },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [allowedSections, setAllowedSections] = useState<PortalSection[]>([]);
  const [_profile, setProfile] = useState<ClientProfile | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Determine active section from pathname
  const activeSection: PortalSection =
    pathname.startsWith("/portal/admin") ? "admin" :
    pathname.startsWith("/portal/sales") ? "sales" : "client";

  const currentSection = sections.find((s) => s.key === activeSection)!;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push(`/login?redirect=${pathname}`);
        return;
      }

      try {
        const ensured = await ensureUserProfile(data.user);
        if (cancelled) return;
        setProfile(ensured);
        setUserEmail(ensured.contact_email || data.user.email || null);
        const allowed = allowedSectionsForRole(ensured.role);
        setAllowedSections(allowed);

        const sectionFromPath: PortalSection =
          pathname.startsWith("/portal/admin") ? "admin" :
          pathname.startsWith("/portal/sales") ? "sales" : "client";

        if (!allowed.includes(sectionFromPath)) {
          router.replace(portalRouteForRole(ensured.role));
          return;
        }

        setAuthChecked(true);
      } catch (error) {
        console.error(error);
        router.push("/login?error=profile");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  if (!authChecked) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#09090B]">
        <div className="text-white/30 text-[13px]">Loading...</div>
      </div>
    );
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="flex h-screen bg-[#09090B] overflow-hidden" data-lenis-prevent>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-[260px] bg-[#0A0A0C] flex flex-col transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="px-5 pt-6 pb-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
              <Image src="/logo.svg" alt="Aurexis logo" width={20} height={20} className="object-contain" />
            </div>
            <div>
              <span className="text-white font-semibold text-[14px] tracking-tight block leading-tight">AurexisOS</span>
              <span className="text-white/30 text-[10px] font-medium uppercase tracking-[0.15em]">Operating System</span>
            </div>
          </Link>
        </div>

        {/* Portal switcher */}
        <div className="px-3 pb-2">
          <div className="relative group">
            <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] text-white hover:bg-white/[0.06] transition-all duration-200">
              <span className="flex items-center gap-2.5">
                <Shield className="w-3.5 h-3.5 text-white/50" />
                {currentSection.label}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-white/30" />
            </button>
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#111113] border border-white/[0.08] rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
              {sections.filter((s) => allowedSections.includes(s.key)).map((s) => (
                <Link
                  key={s.key}
                  href={s.nav[0].href}
                  className={cn(
                    "block px-4 py-2.5 text-[13px] transition-colors",
                    s.key === activeSection
                      ? "text-white bg-white/[0.06]"
                      : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                  )}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-4 my-2 h-px bg-white/[0.06]" />

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
          {currentSection.nav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200",
                  isActive
                    ? "bg-white/[0.08] text-white"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                )}
              >
                <Icon className={cn("w-[18px] h-[18px] shrink-0", isActive ? "text-white" : "text-white/30")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="p-3">
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/[0.06] flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-white/50" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-white/80 truncate font-medium">{userEmail ?? "Loading..."}</p>
                <p className="text-[10px] text-white/25 uppercase tracking-wider font-medium">{activeSection}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[12px] font-medium text-white/40 hover:text-red-400 hover:bg-red-400/[0.06] border border-white/[0.06] transition-all duration-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 border-b border-white/[0.06] flex items-center justify-between px-4 lg:px-8 bg-[#09090B] shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/[0.04] transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="text-[14px] font-semibold text-white">
              {currentSection.nav.find((n) => n.href === pathname)?.label ?? currentSection.label}
            </div>
          </div>
          <div className="text-[10px] text-white/20 font-mono uppercase tracking-[0.2em]">
            v1.0
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-[#09090B]">
          {children}
        </main>
      </div>
    </div>
  );
}
