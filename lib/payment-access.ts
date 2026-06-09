import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { paymentProducts, type PaymentProductType } from "@/lib/payment-products";

export async function activatePaymentAccess(
  admin: SupabaseClient,
  userId: string,
  productType: PaymentProductType,
) {
  const product = paymentProducts[productType];

  if (productType === "early_access") {
    const { error } = await admin.from("user_access").upsert({
      user_id: userId,
      early_access_confirmed: true,
    }, { onConflict: "user_id" });
    if (error) throw error;
    return;
  }

  const { data: plan, error: planError } = await admin
    .from("plans")
    .select("id")
    .eq("name", product.planName)
    .eq("is_active", true)
    .single();
  if (planError || !plan) throw planError ?? new Error("Payment plan is not configured.");

  const startedAt = new Date();
  const expiresAt = product.durationMonths
    ? addMonths(startedAt, product.durationMonths).toISOString()
    : null;

  const { error: expireError } = await admin
    .from("user_subscriptions")
    .update({ status: "expired" })
    .eq("user_id", userId)
    .eq("status", "active");
  if (expireError) throw expireError;

  const { error: subscriptionError } = await admin.from("user_subscriptions").insert({
    user_id: userId,
    plan_id: plan.id,
    status: "active",
    start_date: startedAt.toISOString(),
    end_date: expiresAt,
    session_credits_total: product.credits,
    session_credits_used: 0,
  });
  if (subscriptionError) throw subscriptionError;

  const { error: accessError } = await admin.from("user_access").upsert({
    user_id: userId,
    early_access_confirmed: true,
    active_plan: productType,
    plan_started_at: startedAt.toISOString(),
    plan_expires_at: expiresAt,
    session_credits: product.credits,
  }, { onConflict: "user_id" });
  if (accessError) throw accessError;
}

function addMonths(date: Date, months: number) {
  const result = new Date(date);
  result.setUTCMonth(result.getUTCMonth() + months);
  return result;
}
