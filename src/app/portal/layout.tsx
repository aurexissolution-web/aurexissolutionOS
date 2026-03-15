"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";
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
  Image,
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

type PortalSection = "client" | "admin" | "sales";
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
  { label: "Access Control", href: "/portal/admin/invites", icon: Link2 },
  { label: "Blog Engine", href: "/portal/admin/blog", icon: PenTool },
  { label: "Portfolio", href: "/portal/admin/portfolio", icon: Image },
  { label: "Project Control", href: "/portal/admin/projects", icon: Settings },
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
  const [authChecked, setAuthChecked] = useState(false);

  // Determine active section from pathname
  const activeSection: PortalSection =
    pathname.startsWith("/portal/admin") ? "admin" :
    pathname.startsWith("/portal/sales") ? "sales" : "client";

  const currentSection = sections.find((s) => s.key === activeSection)!;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push(`/login?redirect=${pathname}`);
        return;
      }
      setUserEmail(data.user.email ?? null);
      setAuthChecked(true);
    });
  }, [pathname, router]);

  if (!authChecked) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#02040A]">
        <div className="text-[#94A3B8] text-sm">Loading...</div>
      </div>
    );
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="flex h-screen bg-[#02040A] overflow-hidden" data-lenis-prevent>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#060810] border-r border-white/5 flex flex-col transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#00F0FF] to-[#0047FF] flex items-center justify-center shadow-[0_0_12px_rgba(0,240,255,0.3)]">
              <span className="text-[#02040A] font-bold text-sm">A</span>
            </div>
            <span className="text-white font-bold text-sm tracking-tight">Aurexis OS</span>
          </Link>
        </div>

        {/* Portal switcher */}
        <div className="px-4 py-3 border-b border-white/5">
          <div className="relative group">
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 text-sm text-white hover:bg-white/10 transition-colors">
              <span className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#00F0FF]" />
                {currentSection.label}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
            </button>
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#0A0D14] border border-white/10 rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              {sections.map((s) => (
                <Link
                  key={s.key}
                  href={s.nav[0].href}
                  className={cn(
                    "block px-4 py-2.5 text-sm transition-colors",
                    s.key === activeSection
                      ? "text-[#00F0FF] bg-[#00F0FF]/5"
                      : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                  )}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {currentSection.nav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[#00F0FF]/10 text-[#00F0FF] shadow-[inset_0_0_0_1px_rgba(0,240,255,0.15)]"
                    : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00F0FF]/20 to-[#0047FF]/20 border border-[#00F0FF]/20 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-[#00F0FF]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white truncate">{userEmail ?? "Loading..."}</p>
              <p className="text-[10px] text-[#64748B] uppercase tracking-wider">{activeSection}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#94A3B8] hover:text-red-400 hover:bg-red-400/5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 lg:px-6 bg-[#02040A]/80 backdrop-blur-sm shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-[#94A3B8] hover:text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="text-sm font-medium text-white">
            {currentSection.nav.find((n) => n.href === pathname)?.label ?? currentSection.label}
          </div>
          <div className="text-[10px] text-[#64748B] font-mono uppercase tracking-widest">
            Aurexis OS v1.0
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
