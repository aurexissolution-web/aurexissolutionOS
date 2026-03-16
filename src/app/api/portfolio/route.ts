import { supabaseAdmin } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");

  if (slug) {
    const { data, error } = await supabaseAdmin
      .from("portfolio_items")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return Response.json({ data: null }, { status: 404 });
    }
    return Response.json({ data });
  }

  const { data, error } = await supabaseAdmin
    .from("portfolio_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ data: [] }, { status: 500 });
  }

  return Response.json({ data: data ?? [] });
}
