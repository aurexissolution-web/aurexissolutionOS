"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
    { label: "Total Revenue", value: fmt(totals.income), up: true, icon: DollarSign, href: "/portal/sales/income" },
    { label: "Total Expenses", value: fmt(totals.expenses), up: false, icon: TrendingDown, href: "/portal/sales/expenses" },
    { label: "Net Profit", value: fmt(totals.income - totals.expenses), up: true, icon: BarChart3, href: "/portal/sales/profit" },
    { label: "Pipeline Value", value: fmt(totals.pipeline), up: true, icon: Kanban, href: "/portal/sales/pipeline" },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-[28px] font-semibold text-white tracking-tight mb-1">Financial Overview</h1>
        <p className="text-[14px] text-white/40">Track revenue, expenses, profit, and pipeline health in real-time.</p>
      </motion.div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={kpi.href}>
                <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white/50" />
                    </div>
                    {kpi.up ? (
                      <ArrowUpRight className="w-4 h-4 text-emerald-500/50" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-400/50" />
                    )}
                  </div>
                  <p className="text-[22px] font-semibold text-white tracking-tight leading-none">{kpi.value}</p>
                  <p className="text-[12px] text-white/35 mt-1.5 font-medium">{kpi.label}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Revenue breakdown */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[15px] font-semibold text-white">Revenue Breakdown</h2>
              <TrendingUp className="w-4 h-4 text-white/20" />
            </div>
            <div className="space-y-5">
              {revenueBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] text-white/50">{item.label}</span>
                    <span className="text-[13px] font-semibold text-white">${item.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-white/80"
                    />
                  </div>
                  <p className="text-[10px] text-white/20 mt-1.5 font-medium">{item.pct}% of total</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Top expenses */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[15px] font-semibold text-white">Top Expenses</h2>
              <TrendingDown className="w-4 h-4 text-white/20" />
            </div>
            <div className="space-y-1">
              {topExpenses.map((exp) => (
                <div key={exp.vendor} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                  <div>
                    <p className="text-[13px] text-white/70">{exp.vendor}</p>
                    <p className="text-[10px] text-white/25 mt-0.5">{exp.category}</p>
                  </div>
                  <span className="text-[13px] font-semibold text-red-400/70">-${exp.amount}</span>
                </div>
              ))}
              {topExpenses.length === 0 && (
                <p className="text-[13px] text-white/25 text-center py-4">No expenses recorded yet.</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
