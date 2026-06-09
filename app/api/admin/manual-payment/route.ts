import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/api-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const auth = await requireApiAuth(["Admin"]);
  if (auth.error) return auth.error;
  const body = await request.json().catch(() => ({}));
  const paymentId = String(body.paymentId ?? "");
  const reference = String(body.paymentReference ?? "").trim();
  const admin = createSupabaseAdminClient();
  const { data: payment } = await admin
    .from("payments")
    .select("*,plans(*)")
    .eq("id", paymentId)
    .maybeSingle();
  if (!payment || !payment.plans) return NextResponse.json({ error: "Payment not found." }, { status: 404 });

  const plan = payment.plans;
  const endDate = plan.billing_period === "monthly"
    ? new Date(Date.now() + Math.max(plan.min_purchase_months, 1) * 30 * 86400000).toISOString()
    : null;
  const credits = plan.session_credits * Math.max(plan.min_purchase_months, 1);
  const { error: subscriptionError } = await admin.from("user_subscriptions").insert({
    user_id: payment.user_id,
    plan_id: plan.id,
    status: "active",
    end_date: endDate,
    session_credits_total: credits,
  });
  if (subscriptionError) {
    console.error("Subscription activation failed:", subscriptionError);
    return NextResponse.json({ error: "Unable to activate subscription." }, { status: 500 });
  }
  await admin.from("payments").update({
    status: "paid",
    payment_reference: reference || null,
  }).eq("id", paymentId);
  return NextResponse.json({ success: true });
}
