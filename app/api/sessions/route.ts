import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { sendNewSessionAdminEmail } from "@/lib/session-email";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { SessionRequest } from "@/lib/sessions";
import { isSessionType, isTechnicalTrack } from "@/lib/constants";

export async function POST(request: Request) {
  const { user, profile } = await getAuthContext();
  if (!user || !profile) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  if (profile.role !== "Student") return NextResponse.json({ error: "Only students can request sessions." }, { status: 403 });

  const body = await request.json();
  const technicalTrack = String(body.technicalTrack ?? "").trim();
  const sessionType = String(body.sessionType ?? "").trim();
  const title = String(body.title ?? "").trim();
  const description = String(body.description ?? "").trim();
  const preferredDate = String(body.preferredDate ?? "").trim();
  const preferredTime = String(body.preferredTime ?? "").trim();
  const attachmentLink = String(body.attachmentLink ?? "").trim();

  if (!isTechnicalTrack(technicalTrack) || !isSessionType(sessionType) || !title || !description || !preferredDate || !preferredTime) {
    return NextResponse.json({ error: "Please complete all session request fields." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const { data: subscription } = await admin
    .from("user_subscriptions")
    .select("id,session_credits_total,session_credits_used,plans(price,session_credits)")
    .eq("user_id", user.id)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!subscription) {
    return NextResponse.json({ error: "Choose a plan to unlock session requests." }, { status: 402 });
  }
  if (subscription.session_credits_used >= subscription.session_credits_total) {
    return NextResponse.json({ error: "You have used all session credits. Upgrade your plan or buy a single session." }, { status: 402 });
  }
  const subscriptionPlan = subscription
    ? Array.isArray(subscription.plans)
      ? subscription.plans[0]
      : subscription.plans
    : null;

  const { data: commission } = await admin
    .from("commission_rules")
    .select("platform_commission_percent,mentor_payout_percent")
    .eq("service_type", sessionType)
    .maybeSingle();
  const { data, error } = await admin
    .from("session_requests")
    .insert({
      student_id: user.id,
      technical_track: technicalTrack,
      session_type: sessionType,
      title: title.slice(0, 160),
      description: description.slice(0, 3000),
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      attachment_link: attachmentLink || null,
      status: "pending",
      price: Number(subscriptionPlan?.price ?? 0) / Number(subscriptionPlan?.session_credits ?? 1),
      platform_commission_percent: commission?.platform_commission_percent ?? 20,
      mentor_payout_percent: commission?.mentor_payout_percent ?? 80,
    })
    .select("*")
    .single<SessionRequest>();

  if (error) {
    console.error("Session request insert failed:", error);
    return NextResponse.json({ error: "Unable to save the session request." }, { status: 500 });
  }

  let emailWarning: string | undefined;
  try {
    await sendNewSessionAdminEmail(data, profile);
  } catch (emailError) {
    emailWarning = "Session saved, but email notification could not be sent right now.";
    console.error("New session admin email failed:", emailError);
  }

  return NextResponse.json({
    success: true,
    session: data,
    message: "Your session request has been submitted. A mentor will review it soon.",
    warning: emailWarning,
  });
}
