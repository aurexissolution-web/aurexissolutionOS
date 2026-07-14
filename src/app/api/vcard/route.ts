import { NextResponse } from "next/server";
import { buildVCard } from "@/lib/founder-card/vcard";
import { founderCard } from "@/data/founder-card";

export const runtime = "nodejs";

export async function GET() {
  try {
    const vcard = buildVCard();
    return new NextResponse(vcard, {
      status: 200,
      headers: {
        // Explicit type required — the site sets X-Content-Type-Options: nosniff.
        "Content-Type": "text/vcard; charset=utf-8",
        "Content-Disposition": `attachment; filename="${founderCard.vcardFileName}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error("[/api/vcard] failed to build vCard", err);
    return NextResponse.json(
      { error: "Unable to generate contact card." },
      { status: 500 },
    );
  }
}
