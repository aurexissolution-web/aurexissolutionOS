import { supabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

const CONTEXT_PREAMBLE = `
You are the Aurexis Architect (Aurexis Solution). Answer questions about Aurexis, its services, and process. Be professional, concise, and action-oriented.

What Aurexis does: architect intelligent ecosystems combining custom AI agents, high-performance web platforms, and data-driven growth.

Services:
- AI Automation: custom LLM agents, RAG pipelines, and workflow automation to remove operational friction.
- Web Engineering: ultra-fast Next.js/headless platforms, conversion + SEO focused.
- Mobile Ecosystems: scalable iOS/Android apps with React Native.

Process: Discovery & Audit → Architecture Blueprint → Agile 2-week sprints → Launch & Scale.
`;

type OpenRouterResponse = {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  error?: {
    message?: string;
    code?: string;
  };
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { message?: unknown; session_id?: unknown } | null;
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const sessionId = typeof body?.session_id === "string" ? body.session_id.trim() : "";

  if (!message) {
    return Response.json({ error: "Message is required" }, { status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "OPENROUTER_API_KEY is not set" },
      { status: 501 }
    );
  }

  const model = process.env.OPENROUTER_MODEL || "openrouter/auto";
  const referer = process.env.OPENROUTER_HTTP_REFERER || "http://localhost:3000";
  const title = process.env.OPENROUTER_APP_TITLE || "Aurexis Architect";

  // Load recent conversation history for context
  let historyMessages: { role: string; content: string }[] = [];
  if (sessionId) {
    const { data: history } = await supabaseAdmin
      .from("chat_logs")
      .select("role, content")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })
      .limit(20);
    if (history) {
      historyMessages = history.map((h) => ({ role: h.role, content: h.content }));
    }
  }

  const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": referer,
      "X-Title": title,
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: "system", content: CONTEXT_PREAMBLE },
        ...historyMessages,
        { role: "user", content: message }
      ],
      temperature: 0.3,
      max_tokens: 350,
    }),
  });

  const json = (await upstream.json().catch(() => null)) as OpenRouterResponse | null;

  if (!upstream.ok) {
    const errorMsg = json?.error?.message || `Upstream error (${upstream.status})`;
    const errorCode = json?.error?.code;
    const status = errorCode === "insufficient_quota" || upstream.status === 429 ? 429 : 502;
    return Response.json({ error: errorMsg }, { status });
  }

  const answer = json?.choices?.[0]?.message?.content?.trim() ?? "";

  // Persist both messages to chat_logs for learning
  if (sessionId) {
    const rows = [
      { session_id: sessionId, role: "user", content: message },
      { session_id: sessionId, role: "assistant", content: answer },
    ];
    supabaseAdmin.from("chat_logs").insert(rows).then(() => {});
  }

  return Response.json({ answer }, { status: 200 });
}
