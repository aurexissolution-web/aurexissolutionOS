import { NextRequest, NextResponse } from "next/server";
import { calculateAnnualWaste } from "@/lib/calculator";

const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, staff, wage, hours } = body;

    if (typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
    }

    const staffNum = Number(staff);
    const wageNum = Number(wage);
    const hoursNum = Number(hours);

    if (!Number.isFinite(staffNum) || staffNum < 1) {
      return NextResponse.json({ success: false, error: "Invalid staff count" }, { status: 400 });
    }
    if (!Number.isFinite(wageNum) || wageNum < 0) {
      return NextResponse.json({ success: false, error: "Invalid wage" }, { status: 400 });
    }
    if (!Number.isFinite(hoursNum) || hoursNum < 0 || hoursNum > 168) {
      return NextResponse.json({ success: false, error: "Invalid hours" }, { status: 400 });
    }

    const annualWaste = calculateAnnualWaste(staffNum, wageNum, hoursNum);
    const timestamp = new Date().toISOString();

    const lead = {
      timestamp,
      email,
      staff: staffNum,
      wage: wageNum,
      hours: hoursNum,
      annualWaste,
    };

    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        const res = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
          redirect: "follow",
        });
        if (!res.ok) {
          console.error("[calculator-leads] Sheets webhook non-OK:", res.status, await res.text());
        }
      } catch (err) {
        console.error("[calculator-leads] Sheets webhook error:", err);
      }
    } else {
      console.log("[calculator-leads] (no webhook configured) lead:", lead);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[calculator-leads] error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
