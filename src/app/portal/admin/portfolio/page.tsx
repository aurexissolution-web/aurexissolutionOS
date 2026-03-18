"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import {
  Image as ImageIcon,
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  ExternalLink,
  Tag,
  Upload,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface PortfolioItemData {
  id: string;
  title: string;
  slug: string;
  description: string;
  case_study: string;
  tech_tags: string[];
  client_name: string | null;
  live_url: string | null;
  images: string[];
  created_at: string;
}

const inputClass =
  "w-full bg-[#02040A] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00F0FF] transition-colors placeholder:text-[#64748B]";

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItemData[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    case_study: "",
    tech_tags: "",
    client_name: "",
    live_url: "",
    images: [] as string[],
  });

  const loadItems = useCallback(async () => {
    const { data } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setItems(data as PortfolioItemData[]);
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  function openNew() {
    setEditingId(null);
    setForm({ title: "", description: "", case_study: "", tech_tags: "", client_name: "", live_url: "", images: [] });
    setShowEditor(true);
  }

  function openEdit(item: PortfolioItemData) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      case_study: item.case_study || "",
      tech_tags: item.tech_tags.join(", "),
      client_name: item.client_name || "",
      live_url: item.live_url || "",
      images: item.images || [],
    });
    setShowEditor(true);
  }

  async function handleSave() {
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const payload = {
      title: form.title,
      slug,
      description: form.description,
      case_study: form.case_study,
      tech_tags: form.tech_tags.split(",").map((t) => t.trim()).filter(Boolean),
      client_name: form.client_name || null,
      live_url: form.live_url || null,
      images: form.images,
    };

    if (editingId) {
      await supabase.from("portfolio_items").update(payload).eq("id", editingId);
    } else {
      await supabase.from("portfolio_items").insert(payload);
    }
    setShowEditor(false);
    loadItems();
  }

  async function handleDelete(id: string) {
    await supabase.from("portfolio_items").delete().eq("id", id);
    loadItems();
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage.from("portfolio-images").upload(fileName, file);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage.from("portfolio-images").getPublicUrl(fileName);

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, publicUrlData.publicUrl],
      }));
    } catch (err: unknown) {
      console.error("Upload error:", err);
      alert("Failed to upload image: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setIsUploading(false);
    }
  }

  function removeImage(index: number) {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Portfolio Manager</h1>
          <p className="text-sm text-[#94A3B8]">Manage case studies, upload images, and assign tech tags.</p>
        </div>
        <NeonButton onClick={openNew} className="!px-5 !py-2.5 !text-sm">
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </NeonButton>
      </motion.div>

      {/* Editor modal */}
      <AnimatePresence>
        {showEditor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setShowEditor(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            >
              <GlassCard className="!border-[#00F0FF]/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#00F0FF]" />
                    {editingId ? "Edit Project" : "New Project"}
                  </h2>
                  <button onClick={() => setShowEditor(false)} className="text-[#94A3B8] hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Project Title</label>
                    <input className={inputClass} placeholder="Project name" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Short Description</label>
                    <textarea rows={2} className={inputClass + " resize-none"} placeholder="One-liner about the project..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Case Study (Markdown)</label>
                    <textarea rows={6} className={inputClass + " resize-none font-mono text-xs"} placeholder="Detailed case study..." value={form.case_study} onChange={(e) => setForm({ ...form, case_study: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#94A3B8] mb-2">Client Name</label>
                      <input className={inputClass} placeholder="Optional" value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#94A3B8] mb-2">Live URL</label>
                      <input className={inputClass} placeholder="https://..." value={form.live_url} onChange={(e) => setForm({ ...form, live_url: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Tech Tags (comma-separated)</label>
                    <input className={inputClass} placeholder="Next.js, Supabase, AI" value={form.tech_tags} onChange={(e) => setForm({ ...form, tech_tags: e.target.value })} />
                  </div>

                  {/* Image upload placeholder */}
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Project Images</label>
                    {form.images.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {form.images.map((url, idx) => (
                          <div key={idx} className="relative w-20 h-20 rounded-md border border-white/10 overflow-hidden group">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={url} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                            <button type="button" onClick={() => removeImage(idx)} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="relative border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-[#00F0FF]/30 transition-colors cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <Upload className={`w-8 h-8 mx-auto mb-2 ${isUploading ? "text-[#00F0FF] animate-pulse" : "text-[#64748B]"}`} />
                      <p className="text-xs text-[#64748B]">{isUploading ? "Uploading..." : "Click or drag to upload high-res images"}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <NeonButton onClick={handleSave} className="!px-6 !py-3 !text-sm">
                      <Save className="w-4 h-4 mr-2" /> {editingId ? "Update" : "Create"} Project
                    </NeonButton>
                    <NeonButton variant="ghost" onClick={() => setShowEditor(false)} className="!text-sm">Cancel</NeonButton>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portfolio grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key={item.id}>
            <GlassCard hoverEffect className="!p-5">
              {/* Image placeholder */}
              {/* eslint-disable @next/next/no-img-element */}
              <div className="w-full h-36 rounded-lg bg-gradient-to-br from-[#0047FF]/10 to-[#8B5CF6]/10 border border-white/5 flex items-center justify-center mb-4 overflow-hidden">
                {item.images && item.images.length > 0 ? (
                  <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-[#64748B]" />
                )}
              </div>
              {/* eslint-enable @next/next/no-img-element */}

              <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
              <p className="text-xs text-[#94A3B8] line-clamp-2 mb-3">{item.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {item.tech_tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] flex items-center gap-0.5">
                    <Tag className="w-2.5 h-2.5" /> {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-[#64748B]">
                  {item.client_name && <span>{item.client_name} • </span>}
                  {new Date(item.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  {item.live_url && (
                    <a href={item.live_url} target="_blank" rel="noreferrer" className="p-1.5 rounded hover:bg-white/5 text-[#94A3B8] hover:text-[#00F0FF] transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button onClick={() => openEdit(item)} className="p-1.5 rounded hover:bg-white/5 text-[#94A3B8] hover:text-[#00F0FF] transition-colors">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded hover:bg-red-500/10 text-[#94A3B8] hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
