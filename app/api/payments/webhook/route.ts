import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { activatePaymentAccess } from "@/lib/payment-access";
import { isPaymentProductType } from "@/lib/payment-products";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

type RazorpayWebhook = {
  event?: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
      };
    };
  };
};

export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("Razorpay webhook secret is not configured.");
    return NextResponse.json({ error: "Webhook is not configured." }, { status: 503 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  if (!safeEqual(expected, signature)) {
    console.error("Razorpay webhook signature verification failed.");
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  const event = JSON.parse(rawBody) as RazorpayWebhook;
  const orderId = event.payload?.payment?.entity?.order_id;
  const gatewayPaymentId = event.payload?.payment?.entity?.id;
  if (!orderId) return NextResponse.json({ received: true });

  const admin = createSupabaseAdminClient();
  const { data: payment } = await admin
    .from("payments")
    .select("id,user_id,product_type,status")
    .eq("razorpay_order_id", orderId)
    .maybeSingle();
  if (!payment) return NextResponse.json({ received: true });

  if (event.event === "payment.failed") {
    await admin.from("payments").update({
      status: "failed",
      razorpay_payment_id: gatewayPaymentId ?? null,
    }).eq("id", payment.id).neq("status", "paid");
    return NextResponse.json({ received: true });
  }

  if (event.event !== "payment.captured" || payment.status === "paid") {
    return NextResponse.json({ received: true });
  }
  if (!isPaymentProductType(payment.product_type)) {
    console.error("Razorpay webhook payment has an invalid product type", { paymentId: payment.id });
    return NextResponse.json({ received: true });
  }

  const { data: claimed } = await admin
    .from("payments")
    .update({
      status: "pending",
      razorpay_payment_id: gatewayPaymentId ?? null,
      payment_reference: gatewayPaymentId ?? null,
    })
    .eq("id", payment.id)
    .in("status", ["created", "failed"])
    .select("id")
    .maybeSingle();
  if (!claimed) return NextResponse.json({ received: true });

  try {
    await activatePaymentAccess(admin, payment.user_id, payment.product_type);
    await admin.from("payments").update({ status: "paid" }).eq("id", payment.id);
  } catch (activationError) {
    await admin.from("payments").update({ status: "failed" }).eq("id", payment.id);
    console.error("Razorpay webhook access activation failed", {
      paymentId: payment.id,
      activationError,
    });
    return NextResponse.json({ error: "Access activation failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

function safeEqual(expected: string, actual: string) {
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(actual);
  return expectedBuffer.length === actualBuffer.length && timingSafeEqual(expectedBuffer, actualBuffer);
}
