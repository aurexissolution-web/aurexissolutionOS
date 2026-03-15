"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Kanban,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export default function SalesDashboard() {
  const [totals, setTotals] = useState({ income: 0, expenses: 0, pipeline: 0 });
  const [topExpenses, setTopExpenses] = useState<{ vendor: string; amount: number; category: string }[]>([]);
  const [revenueBreakdown, setRevenueBreakdown] = useState<{ label: string; amount: number; pct: number }[]>([]);

  useEffect(() => {
    async function load() {
      const [incRes, expRes, leadRes] = await Promise.all([
        supabase.from("income_entries").select("amount, type"),
        supabase.from("expense_entries").select("amount, vendor, category").order("amount", { ascending: false }).limit(5),
        supabase.from("leads").select("estimated_value, stage"),
      ]);

      const incomeData = incRes.data ?? [];
      const totalIncome = incomeData.reduce((s, i) => s + Number(i.amount), 0);
      const oneTime = incomeData.filter((i) => i.type === "one_time").reduce((s, i) => s + Number(i.amount), 0);
      const recurring = incomeData.filter((i) => i.type === "recurring").reduce((s, i) => s + Number(i.amount), 0);

      const expenseData = expRes.data ?? [];
      const totalExpenses = expenseData.reduce((s, e) => s + Number(e.amount), 0);

      const pipelineValue = (leadRes.data ?? [])
        .filter((l) => !l.stage.startsWith("closed_"))
        .reduce((s, l) => s + Number(l.estimated_value), 0);

      setTotals({ income: totalIncome, expenses: totalExpenses, pipeline: pipelineValue });

      const total = totalIncome || 1;
      setRevenueBreakdown([
        { label: "One-Time Projects", amount: oneTime, pct: Math.round((oneTime / total) * 100) },
        { label: "MRR (Retainers)", amount: recurring, pct: Math.round((recurring / total) * 100) },
      ]);

      setTopExpenses(expenseData.map((e) => ({
        vendor: e.vendor,
        amount: Number(e.amount),
        category: String(e.category).replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      })));
    }
    load();
  }, []);

  const kpis = [
    { label: "Total Revenue", value: fmt(totals.income), change: "", up: true, icon: DollarSign, color: "#10B981", href: "/portal/sales/income" },
    { label: "Total Expenses", value: fmt(totals.expenses), change: "", up: false, icon: TrendingDown, color: "#EF4444", href: "/portal/sales/expenses" },
    { label: "Net Profit", value: fmt(totals.income - totals.expenses), change: "", up: true, icon: BarChart3, color: "#00F0FF", href: "/portal/sales/profit" },
    { label: "Pipeline Value", value: fmt(totals.pipeline), change: "", up: true, icon: Kanban, color: "#8B5CF6", href: "/portal/sales/pipeline" },
  ];
  return (
    <div className="space-y-6 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1">Financial Nervous System</h1>
        <p className="text-sm text-[#94A3B8]">Track revenue, expenses, profit, and pipeline health in real-time.</p>
      </motion.div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={kpi.href}>
                <GlassCard hoverEffect className="cursor-pointer !p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.color}15` }}>
                      <Icon className="w-4 h-4" style={{ color: kpi.color }} />
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium" style={{ color: kpi.up ? "#10B981" : "#EF4444" }}>
                      {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {kpi.change}
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white">{kpi.value}</p>
                  <p className="text-xs text-[#94A3B8] mt-0.5">{kpi.label}</p>
                </GlassCard>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue breakdown */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <GlassCard>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-white">Revenue Breakdown</h2>
              <TrendingUp className="w-4 h-4 text-[#64748B]" />
            </div>
            <div className="space-y-4">
              {revenueBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-[#94A3B8]">{item.label}</span>
                    <span className="text-sm font-semibold text-white">${item.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-[#00F0FF] to-[#0047FF]"
                    />
                  </div>
                  <p className="text-[10px] text-[#64748B] mt-0.5">{item.pct}% of total</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Top expenses */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <GlassCard>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-white">Top Expenses (Monthly)</h2>
              <TrendingDown className="w-4 h-4 text-[#64748B]" />
            </div>
            <div className="space-y-3">
              {topExpenses.map((exp) => (
                <div key={exp.vendor} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-sm text-white">{exp.vendor}</p>
                    <p className="text-[10px] text-[#64748B]">{exp.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-[#EF4444]">-${exp.amount}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
