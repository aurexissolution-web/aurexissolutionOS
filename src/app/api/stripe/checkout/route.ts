import { NextRequest, NextResponse } from "next/server";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

export async function POST(request: NextRequest) {
  try {
    if (!STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
    }

    const body = await request.json();
    const { invoice_id, amount, currency, description, client_email } = body;

    if (!amount || !currency) {
      return NextResponse.json({ error: "Missing amount or currency" }, { status: 400 });
    }

    // Create Stripe Checkout Session
    const params = new URLSearchParams();
    params.append("payment_method_types[]", "card");
    params.append("line_items[0][price_data][currency]", currency.toLowerCase());
    params.append("line_items[0][price_data][product_data][name]", description || `Invoice ${invoice_id}`);
    params.append("line_items[0][price_data][unit_amount]", String(Math.round(amount * 100))); // cents
    params.append("line_items[0][quantity]", "1");
    params.append("mode", "payment");
    params.append("success_url", `${request.nextUrl.origin}/portal/client/invoices?paid=${invoice_id}`);
    params.append("cancel_url", `${request.nextUrl.origin}/portal/client/invoices?cancelled=${invoice_id}`);
    if (client_email) {
      params.append("customer_email", client_email);
    }
    params.append("metadata[invoice_id]", invoice_id || "");

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const session = await res.json();

    if (!res.ok) {
      console.error("Stripe error:", session);
      return NextResponse.json({ error: session.error?.message || "Stripe error" }, { status: 400 });
    }

    return NextResponse.json({ url: session.url, session_id: session.id });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
