// Server-side: imported by server components / route handlers.
// Client-side helpers in reviews-admin.ts.

import { supabaseAdmin } from "@/lib/supabase/server";
import type { Review } from "@/types/portal";

export async function fetchApprovedReviews(limit = 50): Promise<Review[]> {
  const { data, error } = await supabaseAdmin
    .from("reviews")
    .select("*")
    .eq("status", "approved")
    .order("featured", { ascending: false })
    .order("approved_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("[reviews] fetchApprovedReviews error:", error);
    return [];
  }
  return (data ?? []) as Review[];
}
