import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function getActiveSessionSubscription(userId: string) {
  const admin = createSupabaseAdminClient();
  const { data: subscription, error } = await admin
    .from("user_subscriptions")
    .select("id,start_date,end_date,credit_period_started_at,session_credits_total,session_credits_used,plans(name,price,session_credits)")
    .eq("user_id", userId)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  if (!subscription) return null;

  const now = new Date();
  if (subscription.end_date && new Date(subscription.end_date) <= now) {
    await admin.from("user_subscriptions").update({ status: "expired" }).eq("id", subscription.id);
    return null;
  }

  const plan = Array.isArray(subscription.plans) ? subscription.plans[0] : subscription.plans;
  if (plan?.name !== "Launch Offer") return subscription;

  const periodStartedAt = new Date(subscription.credit_period_started_at ?? subscription.start_date);
  const nextPeriod = addMonths(periodStartedAt, 1);
  if (nextPeriod > now) return subscription;

  let currentPeriod = periodStartedAt;
  while (addMonths(currentPeriod, 1) <= now) {
    currentPeriod = addMonths(currentPeriod, 1);
  }

  const { data: refreshed, error: refreshError } = await admin
    .from("user_subscriptions")
    .update({
      credit_period_started_at: currentPeriod.toISOString(),
      session_credits_used: 0,
    })
    .eq("id", subscription.id)
    .select("id,start_date,end_date,credit_period_started_at,session_credits_total,session_credits_used,plans(name,price,session_credits)")
    .single();
  if (refreshError) throw refreshError;

  await admin.from("user_access").update({
    session_credits: refreshed.session_credits_total,
  }).eq("user_id", userId);

  return refreshed;
}

function addMonths(date: Date, months: number) {
  const result = new Date(date);
  result.setUTCMonth(result.getUTCMonth() + months);
  return result;
}
