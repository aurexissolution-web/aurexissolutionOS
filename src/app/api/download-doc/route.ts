import { supabaseAdmin } from "@/lib/supabase/server";
import { verifyAuth } from "@/lib/auth/verify";
import { NextRequest, NextResponse } from "next/server";

const SUPABASE_HOST = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : "";

export async function GET(req: NextRequest) {
  const user = await verifyAuth(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const fileUrl = searchParams.get("url");

  if (!fileUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  // Validate the URL belongs to our Supabase project (prevent open redirect)
  try {
    const parsedUrl = new URL(fileUrl);
    if (parsedUrl.hostname !== SUPABASE_HOST) {
      return NextResponse.json({ error: "Invalid file URL" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const storagePathMatch = fileUrl.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)/);
    if (!storagePathMatch) {
      return NextResponse.json({ error: "Invalid storage URL" }, { status: 400 });
    }

    const bucket = storagePathMatch[1];
    const filePath = storagePathMatch[2].split("?")[0];

    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .createSignedUrl(filePath, 60);

    if (error || !data?.signedUrl) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return NextResponse.redirect(data.signedUrl);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
