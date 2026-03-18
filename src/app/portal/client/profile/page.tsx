"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { User, Building2, Mail, Phone, MapPin, CreditCard, Save, CheckCircle2, Camera } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { useProfile } from "@/lib/supabase/hooks";

interface ProfileForm {
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  billing_address: string;
  billing_preferences: string;
  avatar_url: string;
}

const inputClass =
  "w-full bg-[#02040A] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00F0FF] transition-colors placeholder:text-[#64748B]";

export default function ClientProfilePage() {
  const { profile, loading } = useProfile();
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<ProfileForm>({
    company_name: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    billing_address: "",
    billing_preferences: "",
    avatar_url: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        company_name: profile.company_name || "",
        contact_name: profile.contact_name || "",
        contact_email: profile.contact_email || "",
        contact_phone: profile.contact_phone || "",
        billing_address: profile.billing_address || "",
        billing_preferences: profile.billing_preferences || "",
        avatar_url: profile.avatar_url || "",
      });
    }
  }, [profile]);

  async function handleAvatarUpload(file: File) {
    if (!profile) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `avatars/${profile.id}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true });

    if (uploadErr) {
      // Try creating the bucket if it doesn't exist
      await supabase.storage.createBucket("avatars", { public: true });
      await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    }

    const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
    const avatarUrl = urlData.publicUrl + "?t=" + Date.now();

    await supabase
      .from("client_profiles")
      .update({ avatar_url: avatarUrl, updated_at: new Date().toISOString() })
      .eq("id", profile.id);

    setForm((prev) => ({ ...prev, avatar_url: avatarUrl }));
    setUploading(false);
  }

  function update(key: keyof ProfileForm, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!profile) return;
    const { avatar_url: _avatar, ...formWithoutAvatar } = form;
    await supabase
      .from("client_profiles")
      .update({ ...formWithoutAvatar, updated_at: new Date().toISOString() })
      .eq("id", profile.id);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (loading) {
    return <div className="text-[#94A3B8] text-sm p-8">Loading profile...</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1">Client Profile</h1>
        <p className="text-sm text-[#94A3B8]">Manage your company details, contact info, and billing preferences.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <GlassCard>
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center gap-3 pb-4 border-b border-white/5">
              <label className="relative cursor-pointer group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#00F0FF]/50 transition-colors bg-white/5 flex items-center justify-center">
                  {form.avatar_url ? (
                    <Image
                      src={form.avatar_url}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <User className="w-10 h-10 text-white/20" />
                  )}
                </div>
                <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleAvatarUpload(file);
                  }}
                />
              </label>
              <p className="text-xs text-[#64748B]">{uploading ? "Uploading..." : "Click to change photo"}</p>
            </div>

            {/* Company */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[#94A3B8] mb-2">
                <Building2 className="w-4 h-4 text-[#00F0FF]" /> Company Name
              </label>
              <input
                className={inputClass}
                value={form.company_name}
                onChange={(e) => update("company_name", e.target.value)}
              />
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[#94A3B8] mb-2">
                  <User className="w-4 h-4 text-[#00F0FF]" /> Contact Name
                </label>
                <input
                  className={inputClass}
                  value={form.contact_name}
                  onChange={(e) => update("contact_name", e.target.value)}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[#94A3B8] mb-2">
                  <Mail className="w-4 h-4 text-[#00F0FF]" /> Email
                </label>
                <input
                  type="email"
                  className={inputClass}
                  value={form.contact_email}
                  onChange={(e) => update("contact_email", e.target.value)}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[#94A3B8] mb-2">
                <Phone className="w-4 h-4 text-[#00F0FF]" /> Phone
              </label>
              <input
                className={inputClass}
                value={form.contact_phone}
                onChange={(e) => update("contact_phone", e.target.value)}
              />
            </div>

            {/* Billing */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[#94A3B8] mb-2">
                <MapPin className="w-4 h-4 text-[#00F0FF]" /> Billing Address
              </label>
              <textarea
                rows={2}
                className={inputClass + " resize-none"}
                value={form.billing_address}
                onChange={(e) => update("billing_address", e.target.value)}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[#94A3B8] mb-2">
                <CreditCard className="w-4 h-4 text-[#00F0FF]" /> Billing Preferences
              </label>
              <input
                className={inputClass}
                value={form.billing_preferences}
                onChange={(e) => update("billing_preferences", e.target.value)}
              />
            </div>

            {/* Save */}
            <div className="flex items-center gap-4 pt-2">
              <NeonButton onClick={handleSave} className="!px-6 !py-3 !text-sm">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </NeonButton>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1.5 text-sm text-[#10B981]"
                >
                  <CheckCircle2 className="w-4 h-4" /> Saved
                </motion.span>
              )}
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
