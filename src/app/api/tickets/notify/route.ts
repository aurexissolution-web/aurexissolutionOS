import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { client_name, subject, urgency, category, description } = body;

    if (!client_name || !subject || !urgency) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Build Telegram message
    const urgencyEmoji: Record<string, string> = {
      low: "🟢",
      medium: "🟡",
      high: "🟠",
      critical: "🔴",
    };

    const message = [
      `${urgencyEmoji[urgency] || "⚪"} *New Support Ticket*`,
      ``,
      `*Client:* ${client_name}`,
      `*Subject:* ${subject}`,
      `*Category:* ${category || "General"}`,
      `*Urgency:* ${urgency.toUpperCase()}`,
      ``,
      `*Description:*`,
      description || "No description provided.",
      ``,
      `_via Aurexis Client Portal_`,
    ].join("\n");

    // Send to Telegram if configured
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

      const res = await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Telegram API error:", err);
        return NextResponse.json({ success: true, telegram: false, error: err });
      }

      return NextResponse.json({ success: true, telegram: true });
    }

    // If Telegram not configured, just log
    console.log("[Ticket Notification]", message);
    return NextResponse.json({ success: true, telegram: false, message: "Telegram not configured — logged to console." });
  } catch (error) {
    console.error("Ticket notification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
