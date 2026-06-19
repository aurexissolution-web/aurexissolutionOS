import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { ReviewAvatarKey } from "@/types/portal";

export const runtime = "nodejs";

// Per-IP rate limiter: up to 5 submissions per hour. Generous enough
// for repeat testing / a small team submitting reviews at once, while
// still cheap protection against spam bursts (real spam hits in dozens
// per second, not 5 per hour).
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissionsByIp = new Map<string, number[]>();

const VALID_AVATARS: ReviewAvatarKey[] = [
  "cyan",
  "violet",
  "emerald",
  "amber",
  "cyan-violet",
  "amber-emerald",
  "silver",
  "constellation",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const history = (submissionsByIp.get(ip) ?? []).filter((t) => t > cutoff);
  if (history.length >= RATE_LIMIT_MAX) {
    submissionsByIp.set(ip, history);
    return true;
  }
  history.push(now);
  submissionsByIp.set(ip, history);
  // Opportunistic cleanup
  if (submissionsByIp.size > 1000) {
    for (const [k, ts] of submissionsByIp.entries()) {
      const filtered = ts.filter((t) => t > cutoff);
      if (filtered.length === 0) submissionsByIp.delete(k);
      else submissionsByIp.set(k, filtered);
    }
  }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
    }

    // Honeypot — if filled, silently succeed (don't tip off the bot)
    if (typeof body.website === "string" && body.website.length > 0) {
      return NextResponse.json({ success: true });
    }

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: `Slow down — you've hit the limit of ${RATE_LIMIT_MAX} submissions per hour. Try again in a bit.`,
        },
        { status: 429 },
      );
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const role = typeof body.role === "string" ? body.role.trim() : "";
    const content = typeof body.content === "string" ? body.content.trim() : "";
    const ratingRaw = Number(body.rating);
    const avatar_key = typeof body.avatar_key === "string" ? body.avatar_key : "cyan";
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!name || name.length > 80) {
      return NextResponse.json({ success: false, error: "Name is required (max 80 chars)" }, { status: 400 });
    }
    if (role.length > 120) {
      return NextResponse.json({ success: false, error: "Role too long" }, { status: 400 });
    }
    if (!Number.isFinite(ratingRaw) || ratingRaw < 1 || ratingRaw > 5) {
      return NextResponse.json({ success: false, error: "Rating must be 1-5 stars" }, { status: 400 });
    }
    if (!content || content.length < 8 || content.length > 320) {
      return NextResponse.json({ success: false, error: "Review must be 8-320 characters" }, { status: 400 });
    }
    if (!VALID_AVATARS.includes(avatar_key as ReviewAvatarKey)) {
      return NextResponse.json({ success: false, error: "Invalid avatar selection" }, { status: 400 });
    }
    if (email && (email.length > 120 || !EMAIL_REGEX.test(email))) {
      return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("reviews").insert({
      name,
      role,
      rating: Math.round(ratingRaw),
      content,
      avatar_key,
      email: email || null,
      status: "pending",
    });

    if (error) {
      console.error("[reviews] insert error:", error);
      return NextResponse.json({ success: false, error: "Could not save review" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[reviews] route error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
