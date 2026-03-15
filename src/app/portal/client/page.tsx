"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Ticket,
  MessageSquare,
  Map,
  FileText,
  CreditCard,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useProfile } from "@/lib/supabase/hooks";

export default function ClientDashboard() {
  const { profile, loading } = useProfile();
  const [stats, setStats] = useState({ openTickets: 0, projectPhase: "—", pendingInvoices: 0, documents: 0 });

  const loadStats = useCallback(async () => {
    if (!profile) return;
    const cid = profile.id;

    const [ticketsRes, projectsRes, invoicesRes, docsRes] = await Promise.all([
      supabase.from("tickets").select("id", { count: "exact", head: true }).eq("client_id", cid).in("status", ["open", "in_progress"]),
      supabase.from("projects").select("phase").eq("client_id", cid).order("updated_at", { ascending: false }).limit(1).single(),
      supabase.from("invoices").select("id", { count: "exact", head: true }).eq("client_id", cid).in("status", ["sent", "overdue"]),
      supabase.from("documents").select("id", { count: "exact", head: true }).eq("client_id", cid),
    ]);

    setStats({
      openTickets: ticketsRes.count ?? 0,
      projectPhase: projectsRes.data?.phase ? String(projectsRes.data.phase).charAt(0).toUpperCase() + String(projectsRes.data.phase).slice(1) : "—",
      pendingInvoices: invoicesRes.count ?? 0,
      documents: docsRes.count ?? 0,
    });
  }, [profile]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const quickStats = [
    { label: "Open Tickets", value: String(stats.openTickets), icon: Ticket, href: "/portal/client/tickets" },
    { label: "Project Phase", value: stats.projectPhase, icon: Map, href: "/portal/client/roadmap" },
    { label: "Pending Invoices", value: String(stats.pendingInvoices), icon: CreditCard, href: "/portal/client/invoices" },
    { label: "Documents", value: String(stats.documents), icon: FileText, href: "/portal/client/documents" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white/30 text-[13px]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-[28px] font-semibold text-white tracking-tight mb-1">Welcome back</h1>
        <p className="text-[14px] text-white/40">Here&apos;s an overview of your projects and account.</p>
      </motion.div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {quickStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={stat.href}>
                <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white/50" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/0 group-hover:text-white/40 transition-colors duration-300" />
                  </div>
                  <p className="text-[28px] font-semibold text-white tracking-tight leading-none">{stat.value}</p>
                  <p className="text-[12px] text-white/35 mt-1.5 font-medium">{stat.label}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Welcome message */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-semibold text-white">Your Portal</h2>
            <MessageSquare className="w-4 h-4 text-white/20" />
          </div>
          <p className="text-[13px] text-white/40 leading-relaxed">
            Use the sidebar to navigate between your projects, tickets, documents, and invoices.
            Need help? Raise a ticket and our team will be notified instantly.
          </p>
        </div>
      </motion.div>

      {/* Quick actions */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/portal/client/tickets">
            <div className="group flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 cursor-pointer">
              <div>
                <h3 className="text-[14px] text-white font-semibold mb-1">Raise a Ticket</h3>
                <p className="text-[12px] text-white/35">Report bugs, request updates, or get support.</p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors shrink-0 ml-4" />
            </div>
          </Link>
          <Link href="/portal/client/feedback">
            <div className="group flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 cursor-pointer">
              <div>
                <h3 className="text-[14px] text-white font-semibold mb-1">Leave Feedback</h3>
                <p className="text-[12px] text-white/35">Share your experience and NPS rating.</p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors shrink-0 ml-4" />
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
