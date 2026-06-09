import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/api-auth";
import { activatePaymentAccess } from "@/lib/payment-access";
import { isPaymentProductType } from "@/lib/payment-products";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const auth = await requireApiAuth(["Student"]);
  if (auth.error) return auth.error;

  const body = await request.json().catch(() => ({}));
  const orderId = String(body.razorpay_order_id ?? "");
  const paymentId = String(body.razorpay_payment_id ?? "");
  const signature = String(body.razorpay_signature ?? "");
  if (!orderId || !paymentId || !signature) {
    return NextResponse.json({ error: "Payment verification details are incomplete." }, { status: 400 });
  }

  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    console.error("Razorpay secret missing during payment verification.");
    return NextResponse.json({ error: "Razorpay test payments are not configured." }, { status: 503 });
  }

  const expected = createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  if (!safeEqual(expected, signature)) {
    console.error("Razorpay payment signature verification failed", { orderId, paymentId });
    return NextResponse.json({ error: "Payment signature verification failed." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const { data: payment } = await admin
    .from("payments")
    .select("id,user_id,product_type,status")
    .eq("razorpay_order_id", orderId)
    .eq("user_id", auth.user.id)
    .maybeSingle();
  if (!payment || !isPaymentProductType(payment.product_type)) {
    return NextResponse.json({ error: "Payment order was not found." }, { status: 404 });
  }
  if (payment.status === "paid") {
    return NextResponse.json({ success: true, message: successMessage(payment.product_type) });
  }

  const { data: claimed, error: claimError } = await admin
    .from("payments")
    .update({
      status: "pending",
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
      payment_reference: paymentId,
    })
    .eq("id", payment.id)
    .in("status", ["created", "failed"])
    .select("id")
    .maybeSingle();
  if (claimError) {
    console.error("Unable to claim verified Razorpay payment", claimError);
    return NextResponse.json({ error: "Unable to verify payment access." }, { status: 500 });
  }
  if (!claimed) {
    return NextResponse.json({ error: "Payment verification is already being processed." }, { status: 409 });
  }

  try {
    await activatePaymentAccess(admin, payment.user_id, payment.product_type);
    await admin.from("payments").update({ status: "paid" }).eq("id", payment.id);
    return NextResponse.json({
      success: true,
      message: successMessage(payment.product_type),
    });
  } catch (activationError) {
    await admin.from("payments").update({ status: "failed" }).eq("id", payment.id);
    console.error("Verified Razorpay payment access activation failed", {
      paymentId: payment.id,
      activationError,
    });
    return NextResponse.json({
      error: "Payment was verified, but access could not be activated. Please contact support.",
    }, { status: 500 });
  }
}

function safeEqual(expected: string, actual: string) {
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(actual);
  return expectedBuffer.length === actualBuffer.length && timingSafeEqual(expectedBuffer, actualBuffer);
}

function successMessage(productType: string) {
  return productType === "early_access"
    ? "Your Early Access Confirmation is active. Choose a plan to start requesting mentor sessions."
    : "Payment verified. Your session plan is now active.";
}
