"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { CreditCard, Upload, CheckCircle2, Clock, AlertTriangle, FileText, Landmark, Copy } from "lucide-react";
import type { InvoiceStatus } from "@/types/portal";
import type { LucideProps } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useProfile } from "@/lib/supabase/hooks";

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
}

const statusConfig: Record<InvoiceStatus, { icon: Icon; color: string; label: string }> = {
  draft: { icon: FileText, color: "#64748B", label: "Draft" },
  sent: { icon: Clock, color: "#F59E0B", label: "Awaiting Payment" },
  paid: { icon: CheckCircle2, color: "#10B981", label: "Paid" },
  overdue: { icon: AlertTriangle, color: "#EF4444", label: "Overdue" },
  cancelled: { icon: FileText, color: "#64748B", label: "Cancelled" },
};

const BANK_DETAILS = {
  bank_name: "AUREXIS SOLUTION Sdn Bhd",
  bank: "Maybank",
  account_number: "5621 0812 3456",
  swift_code: "MBBEMYKL",
};

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

export default function InvoicesPage() {
  const { profile } = useProfile();
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [copied, setCopied] = useState(false);

  const loadInvoices = useCallback(async () => {
    if (!profile) return;
    const { data } = await supabase
      .from("invoices")
      .select("id, invoice_number, description, amount, currency, status, due_date, paid_at, receipt_url")
      .eq("client_id", profile.id)
      .order("created_at", { ascending: false });
    if (data) setInvoices(data as InvoiceItem[]);
  }, [profile]);

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);

  function copyAccount() {
    navigator.clipboard.writeText(BANK_DETAILS.account_number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleReceiptUpload(invoiceId: string, file: File) {
    const ext = file.name.split(".").pop();
    const path = `receipts/${invoiceId}.${ext}`;
    const { error } = await supabase.storage.from("legal-docs").upload(path, file, { upsert: true });
    if (error) return;
    const { data: urlData } = supabase.storage.from("legal-docs").getPublicUrl(path);
    await supabase
      .from("invoices")
      .update({ receipt_url: urlData.publicUrl })
      .eq("id", invoiceId);
    loadInvoices();
  }

  const totalPaid = invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.amount, 0);
  const totalPending = invoices.filter((i) => ["sent", "overdue"].includes(i.status)).reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1">Invoices & Payments</h1>
        <p className="text-sm text-[#94A3B8]">View invoices and pay via bank transfer. Upload your receipt as proof of payment.</p>
      </motion.div>

      {/* Bank details card */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <GlassCard className="!border-[#00F0FF]/10">
          <div className="flex items-center gap-2 mb-4">
            <Landmark className="w-5 h-5 text-[#00F0FF]" />
            <h2 className="text-sm font-semibold text-white">Bank Transfer Details</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-[10px] text-[#64748B] uppercase tracking-wider mb-0.5">Account Name</p>
              <p className="text-white">{BANK_DETAILS.bank_name}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#64748B] uppercase tracking-wider mb-0.5">Bank</p>
              <p className="text-white">{BANK_DETAILS.bank}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#64748B] uppercase tracking-wider mb-0.5">Account Number</p>
              <div className="flex items-center gap-2">
                <p className="text-white font-mono">{BANK_DETAILS.account_number}</p>
                <button onClick={copyAccount} className="p-1 rounded hover:bg-white/5 text-[#94A3B8] hover:text-[#00F0FF] transition-colors">
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-[#64748B] uppercase tracking-wider mb-0.5">SWIFT Code</p>
              <p className="text-white font-mono">{BANK_DETAILS.swift_code}</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <GlassCard className="!p-5">
            <p className="text-xs text-[#94A3B8] mb-1">Total Paid</p>
            <p className="text-2xl font-bold text-[#10B981]">{formatCurrency(totalPaid, "USD")}</p>
          </GlassCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <GlassCard className="!p-5">
            <p className="text-xs text-[#94A3B8] mb-1">Outstanding Balance</p>
            <p className="text-2xl font-bold text-[#F59E0B]">{formatCurrency(totalPending, "USD")}</p>
          </GlassCard>
        </motion.div>
      </div>

      {/* Invoice list */}
      <div className="space-y-3">
        {invoices.map((inv, i) => {
          const st = statusConfig[inv.status];
          const StatusIcon = st.icon;
          const showUpload = inv.status === "sent" || inv.status === "overdue";

          return (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              <GlassCard className="!p-5">
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${st.color}15` }}
                  >
                    <CreditCard className="w-5 h-5" style={{ color: st.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-[#64748B]">{inv.invoice_number}</span>
                      <div className="flex items-center gap-1">
                        <StatusIcon className="w-3 h-3" style={{ color: st.color }} />
                        <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: st.color }}>
                          {st.label}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-white truncate">{inv.description}</p>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Due {inv.due_date}
                      {inv.paid_at && ` • Paid ${inv.paid_at}`}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-white">{formatCurrency(inv.amount, inv.currency)}</p>
                    {showUpload && !inv.receipt_url && (
                      <label className="cursor-pointer inline-block">
                        <span className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-bold rounded-lg bg-[#00F0FF] text-[#02040A] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all mt-2">
                          <Upload className="w-3 h-3 mr-1.5" /> Upload Receipt
                        </span>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleReceiptUpload(inv.id, file);
                          }}
                        />
                      </label>
                    )}
                    {inv.receipt_url && (
                      <span className="text-[10px] text-[#10B981] flex items-center gap-1 mt-2 justify-end">
                        <CheckCircle2 className="w-3 h-3" /> Receipt uploaded
                      </span>
                    )}
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
