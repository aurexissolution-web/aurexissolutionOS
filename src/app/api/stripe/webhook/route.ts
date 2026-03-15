import { NextRequest, NextResponse } from "next/server";

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!STRIPE_WEBHOOK_SECRET) {
      console.warn("Stripe webhook secret not configured");
      return NextResponse.json({ received: true, warning: "No webhook secret configured" });
    }

    // For production, verify the signature using Stripe SDK
    // For now, we parse the event and process it
    let event;
    try {
      event = JSON.parse(body);
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const invoiceId = session.metadata?.invoice_id;

        if (invoiceId) {
          // TODO: Update invoice status in Supabase to 'paid'
          console.log(`[Stripe Webhook] Invoice ${invoiceId} paid. Session: ${session.id}`);
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const intent = event.data.object;
        console.log(`[Stripe Webhook] Payment failed: ${intent.id}`);
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
