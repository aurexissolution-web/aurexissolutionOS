"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Ticket,
  MessageSquare,
  Map,
  FileText,
  CreditCard,
  ArrowRight,
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
    { label: "Open Tickets", value: String(stats.openTickets), icon: Ticket, color: "#00F0FF", href: "/portal/client/tickets" },
    { label: "Project Phase", value: stats.projectPhase, icon: Map, color: "#10B981", href: "/portal/client/roadmap" },
    { label: "Pending Invoices", value: String(stats.pendingInvoices), icon: CreditCard, color: "#F59E0B", href: "/portal/client/invoices" },
    { label: "Documents", value: String(stats.documents), icon: FileText, color: "#8B5CF6", href: "/portal/client/documents" },
  ];

  if (loading) {
    return <div className="text-[#94A3B8] text-sm p-8">Loading dashboard...</div>;
  }
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
        <p className="text-sm text-[#94A3B8]">Here&apos;s an overview of your projects and account.</p>
      </motion.div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={stat.href}>
              <GlassCard hoverEffect className="flex items-center gap-4 cursor-pointer !p-5">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-[#94A3B8]">{stat.label}</p>
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Welcome message */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <GlassCard>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Your Portal</h2>
            <MessageSquare className="w-4 h-4 text-[#64748B]" />
          </div>
          <p className="text-sm text-[#94A3B8]">
            Use the sidebar to navigate between your projects, tickets, documents, and invoices.
            Need help? Raise a ticket and our team will be notified instantly.
          </p>
        </GlassCard>
      </motion.div>

      {/* Quick actions */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/portal/client/tickets">
            <GlassCard hoverEffect className="flex items-center justify-between cursor-pointer">
              <div>
                <h3 className="text-white font-semibold mb-1">Raise a Ticket</h3>
                <p className="text-xs text-[#94A3B8]">Report bugs, request updates, or get support.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#00F0FF] shrink-0" />
            </GlassCard>
          </Link>
          <Link href="/portal/client/feedback">
            <GlassCard hoverEffect className="flex items-center justify-between cursor-pointer">
              <div>
                <h3 className="text-white font-semibold mb-1">Leave Feedback</h3>
                <p className="text-xs text-[#94A3B8]">Share your experience and NPS rating.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#00F0FF] shrink-0" />
            </GlassCard>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
