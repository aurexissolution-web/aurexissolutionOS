"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Users,
  Ticket,
  PenTool,
  Image,
  Settings,
  Link2,
  TrendingUp,
  MessageSquare,
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
    { label: "Total Clients", value: String(counts.clients), icon: Users, color: "#00F0FF", href: "/portal/admin/clients" },
    { label: "Open Tickets", value: String(counts.tickets), icon: Ticket, color: "#F59E0B", href: "/portal/admin/clients" },
    { label: "Blog Posts", value: String(counts.posts), icon: PenTool, color: "#8B5CF6", href: "/portal/admin/blog" },
    { label: "Portfolio Items", value: String(counts.portfolio), icon: Image, color: "#10B981", href: "/portal/admin/portfolio" },
  ];

  const quickActions = [
    { label: "Generate Invite Link", desc: "Onboard a new client", icon: Link2, href: "/portal/admin/invites", color: "#00F0FF" },
    { label: "Manage Projects", desc: "Update phase & status", icon: Settings, href: "/portal/admin/projects", color: "#F59E0B" },
    { label: "Write New Post", desc: "Publish to Aurexis Intel", icon: PenTool, href: "/portal/admin/blog", color: "#8B5CF6" },
    { label: "View Feedback", desc: "Client NPS & reviews", icon: MessageSquare, href: "/portal/admin/clients", color: "#10B981" },
  ];
  return (
    <div className="space-y-6 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1">Command Center</h1>
        <p className="text-sm text-[#94A3B8]">Manage clients, content, and project delivery from one dashboard.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={stat.href}>
                <GlassCard hoverEffect className="flex items-center gap-4 cursor-pointer !p-5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${stat.color}15` }}>
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-[#94A3B8]">{stat.label}</p>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick actions + Recent events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <GlassCard>
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.label} href={action.href}>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${action.color}10` }}>
                        <Icon className="w-4 h-4" style={{ color: action.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white group-hover:text-[#00F0FF] transition-colors">{action.label}</p>
                        <p className="text-xs text-[#64748B]">{action.desc}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">System Status</h2>
              <TrendingUp className="w-4 h-4 text-[#64748B]" />
            </div>
            <p className="text-sm text-[#94A3B8]">
              All systems operational. Use the sidebar to manage clients, projects, content, and access control.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
