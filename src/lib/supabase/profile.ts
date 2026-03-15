import type { ClientProfile, UserRole } from "@/types/portal";
import type { User } from "@supabase/supabase-js";
import { supabase } from "./client";

const DEFAULT_ADMIN_EMAILS = ["aurexissolution@gmail.com"];

const parseEmailList = (value?: string) =>
  (value ? value.split(",") : [])
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

const adminEmails = new Set<string>([
  ...DEFAULT_ADMIN_EMAILS,
  ...parseEmailList(process.env.NEXT_PUBLIC_ADMIN_EMAILS),
]);

const salesEmails = new Set<string>(parseEmailList(process.env.NEXT_PUBLIC_SALES_EMAILS));

export function determineRoleFromEmail(email?: string | null): UserRole {
  const normalized = email?.toLowerCase();
  if (normalized && adminEmails.has(normalized)) {
    return "admin";
  }
  if (normalized && salesEmails.has(normalized)) {
    return "sales";
  }
  return "client";
}

export function portalSectionForRole(role: UserRole): "client" | "admin" | "sales" {
  if (role === "admin") return "admin";
  if (role === "sales") return "sales";
  return "client";
}

export function portalRouteForRole(role: UserRole): string {
  return `/portal/${portalSectionForRole(role)}`;
}

export async function ensureUserProfile(user: User): Promise<ClientProfile> {
  const desiredRole = determineRoleFromEmail(user.email);
  const { data: profile, error } = await supabase
    .from("client_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  if (!profile) {
    const { data: created, error: insertError } = await supabase
      .from("client_profiles")
      .insert({
        user_id: user.id,
        role: desiredRole,
        contact_email: user.email ?? "",
        contact_name: user.user_metadata?.full_name ?? "",
        company_name: user.user_metadata?.company ?? "",
        contact_phone: "",
        billing_address: "",
        billing_preferences: "",
      })
      .select("*")
      .single();

    if (insertError || !created) {
      throw insertError ?? new Error("Failed to create client profile");
    }

    return created as ClientProfile;
  }

  if (desiredRole !== "client" && profile.role !== desiredRole) {
    const { data: updated, error: updateError } = await supabase
      .from("client_profiles")
      .update({ role: desiredRole })
      .eq("id", profile.id)
      .select("*")
      .single();

    if (updateError) {
      throw updateError;
    }

    if (updated) {
      return updated as ClientProfile;
    }
  }

  return profile as ClientProfile;
}
