import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/api-auth";
import { calculatePlatformFee } from "@/lib/marketplace";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const auth = await requireApiAuth(["Student"]);
  if (auth.error) return auth.error;
  const body = await request.json().catch(() => ({}));
  const serviceId = String(body.service_id ?? "");
  const specificGoal = String(body.specific_goal ?? "").trim();
  const alreadyTried = String(body.already_tried ?? "").trim();
  const institutionProgram = String(body.institution_program ?? "").trim();
  const preferredDate = String(body.preferred_date ?? "");
  const preferredTime = String(body.preferred_time ?? "").trim();
  const attachmentLink = String(body.attachment_link ?? "").trim();
  const promoCode = String(body.promo_code ?? "").trim().toUpperCase();
  const addOnRecording = body.add_on_recording === true;
  const addOnNotes = body.add_on_notes === true;
  const depositAcknowledged = body.deposit_acknowledged === true;

  if (!serviceId) return NextResponse.json({ error: "Service is required." }, { status: 400 });
  if (specificGoal.length < 50) return NextResponse.json({ error: "Please explain your specific goal in at least 50 characters." }, { status: 400 });
  if (alreadyTried.length < 30) return NextResponse.json({ error: "Please share what you already tried in at least 30 characters." }, { status: 400 });
  if (!institutionProgram) return NextResponse.json({ error: "Learning context is required." }, { status: 400 });
  if (!preferredDate) return NextResponse.json({ error: "Preferred date is required." }, { status: 400 });
  if (!preferredTime) return NextResponse.json({ error: "Preferred time is required." }, { status: 400 });
  if (!depositAcknowledged) return NextResponse.json({ error: "Please acknowledge the booking deposit and no-show policy." }, { status: 400 });

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const publicKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  if (!keyId || !keySecret || !publicKeyId) {
    console.error("Razorpay service booking configuration missing");
    return NextResponse.json({ error: "Online payment is not configured right now." }, { status: 503 });
  }
  if (![keyId, publicKeyId].every((key) => key.startsWith("rzp_test_"))) {
    return NextResponse.json({ error: "Only Razorpay test mode is enabled." }, { status: 503 });
  }

  const admin = createSupabaseAdminClient();
  if ((auth.profile.account_status === "disabled") || (auth.profile.strikes ?? 0) >= 3) {
    return NextResponse.json(
      { error: "Your booking access has been disabled due to 3 no-shows. Contact support@myexperttalk.com to appeal." },
      { status: 403 },
    );
  }
  const { data: service } = await admin.from("expert_services").select("*").eq("id", serviceId).eq("status", "active").maybeSingle();
  if (!service) return NextResponse.json({ error: "This service is unavailable." }, { status: 404 });
  if (Number(service.price) < 99) {
    return NextResponse.json({ error: "This service is below the My Expert Talk minimum menu price and cannot be booked." }, { status: 409 });
  }
  const basePrice = Number(service.price);
  const addOnTotal = (addOnRecording ? 199 : 0) + (addOnNotes ? 299 : 0);
  const subtotal = basePrice + addOnTotal;
  const discount = promoCode === "MET10" ? Math.round(subtotal * 0.1) : 0;
  const finalPrice = Math.max(99, subtotal - discount);
  const fee = calculatePlatformFee(finalPrice);

  const { data: booking, error: bookingError } = await admin.from("service_bookings").insert({
    service_id: service.id,
    user_id: auth.user.id,
    expert_id: service.expert_id,
    user_goal: specificGoal,
    requirement_details: `${specificGoal}\n\nAlready tried:\n${alreadyTried}\n\nLearning context:\n${institutionProgram}`,
    booking_intent: {
      specific_goal: specificGoal,
      already_tried: alreadyTried,
      institution_program: institutionProgram,
      promo_code: promoCode || null,
      add_ons: {
        recording: addOnRecording,
        action_plan_pdf: addOnNotes,
      },
      subtotal,
      discount,
    },
    deposit_acknowledged: true,
    preferred_date: preferredDate,
    preferred_time: preferredTime,
    attachment_link: attachmentLink || null,
    price: finalPrice,
    platform_commission_percent: fee.commissionPercent,
    expert_payout_percent: 100 - fee.commissionPercent,
    status: "pending",
    payment_status: "pending",
  }).select("id").single();
  if (bookingError) {
    console.error("Unable to create service booking", bookingError);
    return NextResponse.json({ error: "Unable to create your booking." }, { status: 500 });
  }

  const { data: payment, error: paymentError } = await admin.from("payments").insert({
    user_id: auth.user.id,
    service_booking_id: booking.id,
    product_type: "expert_service",
    amount: finalPrice,
    currency: "INR",
    status: "created",
    payment_method: "razorpay",
  }).select("id").single();
  if (paymentError) {
    console.error("Unable to create service payment", paymentError);
    await admin.from("service_bookings").delete().eq("id", booking.id);
    return NextResponse.json({ error: "Unable to start payment." }, { status: 500 });
  }

  const gatewayResponse = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Math.round(finalPrice * 100),
      currency: "INR",
      receipt: `svc_${booking.id.replaceAll("-", "").slice(0, 30)}`,
      notes: { booking_id: booking.id, service_id: service.id, user_id: auth.user.id },
    }),
  });
  if (!gatewayResponse.ok) {
    console.error("Razorpay service order failed", await gatewayResponse.text());
    await Promise.all([
      admin.from("payments").update({ status: "failed" }).eq("id", payment.id),
      admin.from("service_bookings").update({ payment_status: "failed" }).eq("id", booking.id),
    ]);
    return NextResponse.json({ error: "Razorpay could not create the test order." }, { status: 502 });
  }

  const order = await gatewayResponse.json() as { id: string; amount: number; currency: string };
  await admin.from("payments").update({ razorpay_order_id: order.id }).eq("id", payment.id);
  return NextResponse.json({
    bookingId: booking.id,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: publicKeyId,
    serviceName: service.title,
    customer: { name: auth.profile.full_name, email: auth.profile.email, contact: auth.profile.phone ?? "" },
  });
}
