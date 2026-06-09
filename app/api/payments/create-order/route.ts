import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/api-auth";
import { isPaymentProductType, paymentProducts } from "@/lib/payment-products";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const auth = await requireApiAuth(["Student"]);
  if (auth.error) return auth.error;

  const body = await request.json().catch(() => ({}));
  const productType = body.product_type;
  if (!isPaymentProductType(productType)) {
    return NextResponse.json({ error: "Select a valid payment product." }, { status: 400 });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const publicKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  if (!keyId || !keySecret || !publicKeyId) {
    console.error("Razorpay test configuration missing", {
      hasKeyId: Boolean(keyId),
      hasKeySecret: Boolean(keySecret),
      hasPublicKeyId: Boolean(publicKeyId),
    });
    return NextResponse.json({ error: "Razorpay test payments are not configured." }, { status: 503 });
  }
  if (![keyId, publicKeyId].every((key) => key.startsWith("rzp_test_"))) {
    console.error("Razorpay live key rejected because test mode is required.");
    return NextResponse.json({ error: "Only Razorpay test mode is enabled." }, { status: 503 });
  }

  const product = paymentProducts[productType];
  const admin = createSupabaseAdminClient();
  const { data: access } = await admin
    .from("user_access")
    .select("early_access_confirmed")
    .eq("user_id", auth.user.id)
    .maybeSingle();
  if (productType === "early_access" && access?.early_access_confirmed) {
    return NextResponse.json({ error: "Your Early Access Confirmation is already active." }, { status: 409 });
  }
  if (productType !== "early_access" && !access?.early_access_confirmed) {
    return NextResponse.json({
      error: "Confirm your early-access interest for ₹1 before purchasing a session plan.",
    }, { status: 403 });
  }

  let planId: string | null = null;
  if (product.planName) {
    const { data: plan } = await admin
      .from("plans")
      .select("id")
      .eq("name", product.planName)
      .eq("is_active", true)
      .maybeSingle();
    if (!plan) return NextResponse.json({ error: "This plan is not configured." }, { status: 503 });
    planId = plan.id;
  }

  const { data: payment, error: paymentError } = await admin
    .from("payments")
    .insert({
      user_id: auth.user.id,
      product_type: productType,
      plan_id: planId,
      amount: product.amountPaise / 100,
      currency: "INR",
      status: "created",
      payment_method: "razorpay",
    })
    .select("id")
    .single();
  if (paymentError) {
    console.error("Unable to create local Razorpay payment", paymentError);
    return NextResponse.json({ error: "Unable to start payment." }, { status: 500 });
  }

  const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: product.amountPaise,
      currency: "INR",
      receipt: `im_${payment.id.replaceAll("-", "").slice(0, 30)}`,
      notes: {
        payment_id: payment.id,
        user_id: auth.user.id,
        product_type: productType,
      },
    }),
  });

  if (!razorpayResponse.ok) {
    const gatewayError = await razorpayResponse.text();
    console.error("Razorpay order creation failed", {
      status: razorpayResponse.status,
      gatewayError,
    });
    await admin.from("payments").update({ status: "failed" }).eq("id", payment.id);
    return NextResponse.json({ error: "Razorpay could not create the test order." }, { status: 502 });
  }

  const order = await razorpayResponse.json() as { id: string; amount: number; currency: string };
  const { error: orderUpdateError } = await admin
    .from("payments")
    .update({ razorpay_order_id: order.id })
    .eq("id", payment.id);
  if (orderUpdateError) {
    console.error("Unable to save Razorpay order ID", orderUpdateError);
    return NextResponse.json({ error: "Unable to save the payment order." }, { status: 500 });
  }

  return NextResponse.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: publicKeyId,
    productName: product.name,
    customer: {
      name: auth.profile.full_name,
      email: auth.profile.email,
      contact: auth.profile.phone ?? "",
    },
  });
}
