import { supabaseAdmin } from "@/lib/supabase/server";
import { verifyAdmin } from "@/lib/auth/verify";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const clientId = formData.get("client_id") as string | null;
  const docName = formData.get("name") as string | null;
  const docType = formData.get("type") as string | null;

  if (!file || !clientId || !docName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
  }

  if (!/^[0-9a-f-]{36}$/i.test(clientId)) {
    return NextResponse.json({ error: "Invalid client ID" }, { status: 400 });
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
