"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import {
  CreditCard,
  Plus,
  X,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Building2,
  Trash2,
} from "lucide-react";
import type { InvoiceStatus } from "@/types/portal";
import type { LucideProps } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

type Icon = React.ComponentType<LucideProps>;

interface InvoiceItem {
  id: string;
  invoice_number: string;
  description: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  due_date: string;
  paid_at: string | null;
  receipt_url: string | null;
  client_name: string;
}

interface ClientOption {
  id: string;
  company_name: string;
}

const statusConfig: Record<InvoiceStatus, { icon: Icon; color: string; label: string }> = {
  draft: { icon: FileText, color: "#64748B", label: "Draft" },
  sent: { icon: Clock, color: "#F59E0B", label: "Sent" },
  paid: { icon: CheckCircle2, color: "#10B981", label: "Paid" },
  overdue: { icon: AlertTriangle, color: "#EF4444", label: "Overdue" },
  cancelled: { icon: FileText, color: "#64748B", label: "Cancelled" },
};

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

const inputClass =
  "w-full bg-[#02040A] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00F0FF] transition-colors placeholder:text-[#64748B]";

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    client_id: "",
    description: "",
    amount: "",
    currency: "USD",
    due_date: "",
    status: "draft" as InvoiceStatus,
  });

  const loadInvoices = useCallback(async () => {
    const { data } = await supabase
      .from("invoices")
      .select("id, invoice_number, description, amount, currency, status, due_date, paid_at, receipt_url, client_profiles(company_name)")
      .order("created_at", { ascending: false });

    if (data) {
      setInvoices(
        data.map((inv: Record<string, unknown>) => ({
          id: inv.id as string,
          invoice_number: inv.invoice_number as string,
          description: inv.description as string,
          amount: inv.amount as number,
          currency: inv.currency as string,
          status: inv.status as InvoiceStatus,
          due_date: inv.due_date as string,
          paid_at: (inv.paid_at as string) || null,
          receipt_url: (inv.receipt_url as string) || null,
          client_name: (inv.client_profiles as { company_name: string } | null)?.company_name ?? "Unknown",
        }))
      );
    }
  }, []);

  const loadClients = useCallback(async () => {
    const { data } = await supabase
      .from("client_profiles")
      .select("id, company_name")
      .eq("role", "client")
      .order("company_name");
    if (data) setClients(data as ClientOption[]);
  }, []);

  useEffect(() => {
    loadInvoices();
    loadClients();
  }, [loadInvoices, loadClients]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);

    const invNumber = `INV-${Date.now().toString(36).toUpperCase()}`;

    await supabase.from("invoices").insert({
      client_id: form.client_id,
      invoice_number: invNumber,
      description: form.description,
      amount: parseFloat(form.amount),
      currency: form.currency,
      due_date: form.due_date,
      status: form.status,
    });

    setCreating(false);
    setShowCreate(false);
    setForm({ client_id: "", description: "", amount: "", currency: "USD", due_date: "", status: "draft" });
    loadInvoices();
  }

  async function updateStatus(invId: string, status: InvoiceStatus) {
    const updates: Record<string, unknown> = { status };
    if (status === "paid") updates.paid_at = new Date().toISOString();
    await supabase.from("invoices").update(updates).eq("id", invId);
    loadInvoices();
  }

  async function deleteInvoice(invId: string) {
    await supabase.from("invoices").delete().eq("id", invId);
    loadInvoices();
  }

  const totalPaid = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const totalPending = invoices.filter((i) => ["sent", "overdue"].includes(i.status)).reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Invoice Manager</h1>
          <p className="text-sm text-[#94A3B8]">Create, send, and track client invoices.</p>
        </div>
        <NeonButton onClick={() => setShowCreate(true)} className="!px-5 !py-2.5 !text-sm">
          <Plus className="w-4 h-4 mr-2" /> New Invoice
        </NeonButton>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <GlassCard className="!p-5">
            <p className="text-xs text-[#94A3B8] mb-1">Total Collected</p>
            <p className="text-2xl font-bold text-[#10B981]">{formatCurrency(totalPaid, "USD")}</p>
          </GlassCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <GlassCard className="!p-5">
            <p className="text-xs text-[#94A3B8] mb-1">Outstanding</p>
            <p className="text-2xl font-bold text-[#F59E0B]">{formatCurrency(totalPending, "USD")}</p>
          </GlassCard>
        </motion.div>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowCreate(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-lg">
              <GlassCard className="!border-[#00F0FF]/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2"><CreditCard className="w-5 h-5 text-[#00F0FF]" /> Create Invoice</h2>
                  <button onClick={() => setShowCreate(false)} className="text-[#94A3B8] hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleCreate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Client</label>
                    <select required className={inputClass} value={form.client_id} onChange={(e) => setForm({ ...form, client_id: e.target.value })}>
                      <option value="">Select client...</option>
                      {clients.map((c) => <option key={c.id} value={c.id}>{c.company_name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Description</label>
                    <input required className={inputClass} placeholder="e.g. Website Development - Phase 1" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#94A3B8] mb-2">Amount</label>
                      <input required type="number" step="0.01" min="0" className={inputClass} placeholder="0.00" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#94A3B8] mb-2">Currency</label>
                      <select className={inputClass} value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })}>
                        <option value="USD">USD</option>
                        <option value="MYR">MYR</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#94A3B8] mb-2">Due Date</label>
                      <input required type="date" className={inputClass} value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#94A3B8] mb-2">Status</label>
                      <select className={inputClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as InvoiceStatus })}>
                        <option value="draft">Draft</option>
                        <option value="sent">Sent</option>
                      </select>
                    </div>
                  </div>
                  <NeonButton className="w-full !py-3 !text-sm" disabled={creating}>
                    {creating ? "Creating..." : "Create Invoice"}
                  </NeonButton>
                </form>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {invoices.length === 0 && (
        <div className="text-center py-12 text-[#64748B] text-sm">No invoices yet. Click &quot;New Invoice&quot; to create one.</div>
      )}

      {/* Invoice list */}
      <div className="space-y-3">
        {invoices.map((inv, i) => {
          const st = statusConfig[inv.status];
          const StatusIcon = st.icon;
          return (
            <motion.div key={inv.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.04 }}>
              <GlassCard className="!p-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${st.color}15` }}>
                    <CreditCard className="w-5 h-5" style={{ color: st.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-[#64748B]">{inv.invoice_number}</span>
                      <div className="flex items-center gap-1">
                        <StatusIcon className="w-3 h-3" style={{ color: st.color }} />
                        <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: st.color }}>{st.label}</span>
                      </div>
                      <span className="text-xs text-[#64748B] flex items-center gap-1"><Building2 className="w-3 h-3" />{inv.client_name}</span>
                    </div>
                    <p className="text-sm text-white truncate">{inv.description}</p>
                    <p className="text-xs text-[#64748B] mt-0.5">Due {inv.due_date}{inv.paid_at && ` • Paid ${inv.paid_at.slice(0, 10)}`}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <p className="text-lg font-bold text-white">{formatCurrency(inv.amount, inv.currency)}</p>
                    <select
                      className="bg-[#02040A] border border-white/10 rounded-lg px-2 py-1 text-[10px] text-white focus:outline-none focus:border-[#00F0FF]"
                      value={inv.status}
                      onChange={(e) => updateStatus(inv.id, e.target.value as InvoiceStatus)}
                    >
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    {inv.receipt_url && (
                      <a href={inv.receipt_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981]/20 transition-colors" title="View receipt">
                        <CheckCircle2 className="w-4 h-4" />
                      </a>
                    )}
                    <button onClick={() => deleteInvoice(inv.id)} className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 text-[#94A3B8] hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
