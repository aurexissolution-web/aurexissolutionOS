import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

function verifyStripeSignature(payload: string, sigHeader: string, secret: string): boolean {
  try {
    const parts = sigHeader.split(",").reduce((acc, part) => {
      const [key, value] = part.split("=");
      acc[key.trim()] = value;
      return acc;
    }, {} as Record<string, string>);

    const timestamp = parts["t"];
    const signature = parts["v1"];
    if (!timestamp || !signature) return false;

    // Reject if timestamp is more than 5 minutes old
    const tolerance = 300;
    const timestampSec = parseInt(timestamp, 10);
    if (Math.abs(Date.now() / 1000 - timestampSec) > tolerance) return false;

    const signedPayload = `${timestamp}.${payload}`;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(signedPayload)
      .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!STRIPE_WEBHOOK_SECRET) {
      console.warn("Stripe webhook secret not configured");
      return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
    }

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    if (!verifyStripeSignature(body, signature, STRIPE_WEBHOOK_SECRET)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

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
