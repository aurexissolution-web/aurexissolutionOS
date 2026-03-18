import { supabaseAdmin } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileUrl = searchParams.get("url");

  if (!fileUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  try {
    // Extract the path from the full public URL
    // URL format: https://<project>.supabase.co/storage/v1/object/public/<bucket>/<path>
    const storagePathMatch = fileUrl.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)/);
    if (!storagePathMatch) {
      return NextResponse.redirect(fileUrl);
    }

    const bucket = storagePathMatch[1];
    const filePath = storagePathMatch[2].split("?")[0]; // strip query params

    // Generate a signed URL valid for 60 seconds using admin client
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .createSignedUrl(filePath, 60);

    if (error || !data?.signedUrl) {
      // Fall back to direct URL if signed URL fails
      return NextResponse.redirect(fileUrl);
    }

    return NextResponse.redirect(data.signedUrl);
  } catch {
    return NextResponse.redirect(fileUrl);
  }
}
