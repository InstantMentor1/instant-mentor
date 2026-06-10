import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/api-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const auth = await requireApiAuth(["Student"]);
  if (auth.error) return auth.error;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return NextResponse.json({ error: "Payment verification is not configured." }, { status: 503 });
  const body = await request.json().catch(() => ({}));
  const bookingId = String(body.booking_id ?? "");
  const orderId = String(body.razorpay_order_id ?? "");
  const paymentId = String(body.razorpay_payment_id ?? "");
  const signature = String(body.razorpay_signature ?? "");
  if (!bookingId || !orderId || !paymentId || !signature) {
    return NextResponse.json({ error: "Payment confirmation is incomplete." }, { status: 400 });
  }

  const expected = createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  const valid = expected.length === signature.length && timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  if (!valid) return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });

  const admin = createSupabaseAdminClient();
  const { data: booking } = await admin.from("service_bookings").select("id,user_id").eq("id", bookingId).eq("user_id", auth.user.id).maybeSingle();
  if (!booking) return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  const { data: payment } = await admin.from("payments").select("id").eq("service_booking_id", booking.id).eq("razorpay_order_id", orderId).maybeSingle();
  if (!payment) return NextResponse.json({ error: "Payment record not found." }, { status: 404 });

  const [{ error: paymentError }, { error: bookingError }] = await Promise.all([
    admin.from("payments").update({ status: "paid", razorpay_payment_id: paymentId, razorpay_signature: signature }).eq("id", payment.id),
    admin.from("service_bookings").update({ payment_status: "paid" }).eq("id", booking.id),
  ]);
  if (paymentError || bookingError) {
    console.error("Unable to finalize service payment", { paymentError, bookingError });
    return NextResponse.json({ error: "Payment succeeded but the booking update needs review." }, { status: 500 });
  }
  return NextResponse.json({ success: true, bookingId: booking.id });
}
