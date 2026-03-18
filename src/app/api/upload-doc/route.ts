import { supabaseAdmin } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const clientId = formData.get("client_id") as string | null;
  const docName = formData.get("name") as string | null;
  const docType = formData.get("type") as string | null;

  if (!file || !clientId || !docName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const ext = file.name.split(".").pop();
  const filePath = `documents/${clientId}/${Date.now()}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error: uploadErr } = await supabaseAdmin.storage
    .from("legal-docs")
    .upload(filePath, buffer, {
      upsert: true,
      contentType: file.type,
    });

  if (uploadErr) {
    return NextResponse.json({ error: uploadErr.message }, { status: 500 });
  }

  const { data: urlData } = supabaseAdmin.storage.from("legal-docs").getPublicUrl(filePath);

  const { error: insertErr } = await supabaseAdmin.from("documents").insert({
    client_id: clientId,
    name: docName,
    type: docType || "other",
    file_url: urlData.publicUrl,
    status: "pending",
  });

  if (insertErr) {
    return NextResponse.json({ error: insertErr.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, file_url: urlData.publicUrl });
}
