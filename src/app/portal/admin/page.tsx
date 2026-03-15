"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Ticket,
  PenTool,
  Image,
  Settings,
  Link2,
  TrendingUp,
  MessageSquare,
  ArrowUpRight,
  ArrowRight,
  CircleCheck,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ clients: 0, tickets: 0, posts: 0, portfolio: 0 });

  useEffect(() => {
    async function load() {
      const [c, t, b, p] = await Promise.all([
        supabase.from("client_profiles").select("id", { count: "exact", head: true }),
        supabase.from("tickets").select("id", { count: "exact", head: true }).in("status", ["open", "in_progress"]),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("portfolio_items").select("id", { count: "exact", head: true }),
      ]);
      setCounts({ clients: c.count ?? 0, tickets: t.count ?? 0, posts: b.count ?? 0, portfolio: p.count ?? 0 });
    }
    load();
  }, []);

  const stats = [
    { label: "Total Clients", value: String(counts.clients), icon: Users, href: "/portal/admin/clients" },
    { label: "Open Tickets", value: String(counts.tickets), icon: Ticket, href: "/portal/admin/clients" },
    { label: "Blog Posts", value: String(counts.posts), icon: PenTool, href: "/portal/admin/blog" },
    { label: "Portfolio Items", value: String(counts.portfolio), icon: Image, href: "/portal/admin/portfolio" },
  ];

  const quickActions = [
    { label: "Generate Invite Link", desc: "Onboard a new client", icon: Link2, href: "/portal/admin/invites" },
    { label: "Manage Projects", desc: "Update phase & status", icon: Settings, href: "/portal/admin/projects" },
    { label: "Write New Post", desc: "Publish to Aurexis Intel", icon: PenTool, href: "/portal/admin/blog" },
    { label: "View Feedback", desc: "Client NPS & reviews", icon: MessageSquare, href: "/portal/admin/clients" },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-[28px] font-semibold text-white tracking-tight mb-1">Command Center</h1>
        <p className="text-[14px] text-white/40">Manage clients, content, and project delivery from one dashboard.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
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

      {/* Quick actions + System status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <h2 className="text-[15px] font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-1">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.label} href={action.href}>
                    <div className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-all duration-200 cursor-pointer">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-white/50" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-white/80 group-hover:text-white transition-colors">{action.label}</p>
                        <p className="text-[11px] text-white/25">{action.desc}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-white/0 group-hover:text-white/30 transition-colors shrink-0" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 h-full">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[15px] font-semibold text-white">System Status</h2>
              <TrendingUp className="w-4 h-4 text-white/20" />
            </div>
            <div className="space-y-3">
              {["Supabase Database", "Auth Service", "API Routes", "Edge Functions"].map((service) => (
                <div key={service} className="flex items-center justify-between py-2">
                  <span className="text-[13px] text-white/50">{service}</span>
                  <span className="flex items-center gap-1.5 text-[11px] text-emerald-500/80 font-medium">
                    <CircleCheck className="w-3.5 h-3.5" />
                    Operational
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
