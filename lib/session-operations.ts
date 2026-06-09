import "server-only";
import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/api-auth";
import {
  sendSessionAssignedEmail,
  sendSessionRejectedEmail,
  sendSessionScheduledEmails,
} from "@/lib/session-email";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { SessionRequest } from "@/lib/sessions";

export async function handleSessionAction(request: Request, action: string, routeId?: string) {
  const auth = await requireApiAuth(["Mentor", "Faculty", "Admin"]);
  if (auth.error) return auth.error;
  const { user, profile } = auth;
  const body = await request.json().catch(() => ({}));
  const id = routeId ?? String(body.sessionId ?? "");
  if (!id) return NextResponse.json({ error: "Session ID is required." }, { status: 400 });

  const admin = createSupabaseAdminClient();
  const { data: current } = await admin
    .from("session_requests")
    .select("*")
    .eq("id", id)
    .maybeSingle<SessionRequest>();
  if (!current) return NextResponse.json({ error: "Session not found." }, { status: 404 });

  const isAdmin = profile.role === "Admin";
  const isAssignedMentor =
    ["Mentor", "Faculty"].includes(profile.role) && current.mentor_id === user.id;
  if (!isAdmin && !isAssignedMentor) {
    return NextResponse.json({ error: "Not authorized for this session." }, { status: 403 });
  }

  let update: Record<string, unknown>;
  if (action === "assign" && isAdmin) {
    const mentorId = String(body.mentorId ?? "");
    const { data: mentor } = await admin
      .from("profiles")
      .select("user_id,full_name,email,role")
      .eq("user_id", mentorId)
      .in("role", ["Mentor", "Faculty"])
      .maybeSingle();
    if (!mentor) return NextResponse.json({ error: "Select a valid mentor." }, { status: 400 });
    update = { mentor_id: mentorId, status: "assigned" };
  } else if (action === "accept" && isAssignedMentor) {
    const { data: mentorDetails } = await admin
      .from("mentor_profiles")
      .select("expertise")
      .eq("user_id", user.id)
      .maybeSingle();
    if (
      Array.isArray(mentorDetails?.expertise) &&
      mentorDetails.expertise.length > 0 &&
      !mentorDetails.expertise.includes(current.technical_track)
    ) {
      return NextResponse.json({ error: "This session does not match your verified expertise." }, { status: 403 });
    }
    update = { status: "accepted" };
  } else if (action === "schedule" && (isAdmin || isAssignedMentor)) {
    const scheduledAt = String(body.scheduledAt ?? "");
    const meetingLink = String(body.meetingLink ?? "").trim();
    if (!scheduledAt || !meetingLink.startsWith("https://")) {
      return NextResponse.json({ error: "Scheduled time and a secure meeting link are required." }, { status: 400 });
    }
    update = { status: "scheduled", scheduled_at: scheduledAt, meeting_link: meetingLink };
  } else if (action === "reject" && isAssignedMentor) {
    const rejectionReason = String(body.rejectionReason ?? "").trim();
    if (!rejectionReason) return NextResponse.json({ error: "A rejection reason is required." }, { status: 400 });
    update = { status: "rejected", rejection_reason: rejectionReason, meeting_link: null };
  } else if (action === "complete" && (isAdmin || isAssignedMentor)) {
    if (current.status !== "scheduled") {
      return NextResponse.json({ error: "Only scheduled sessions can be completed." }, { status: 400 });
    }
    update = { status: "completed" };
  } else {
    return NextResponse.json({ error: "Invalid session action." }, { status: 400 });
  }

  const { data: updated, error } = await admin
    .from("session_requests")
    .update(update)
    .eq("id", id)
    .select("*")
    .single<SessionRequest>();
  if (error) {
    console.error("Session action failed:", { action, id, error });
    return NextResponse.json({ error: "Unable to update session." }, { status: 500 });
  }

  if (action === "complete" && updated.mentor_id) {
    const { data: subscription } = await admin
      .from("user_subscriptions")
      .select("id,session_credits_used")
      .eq("user_id", updated.student_id)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (subscription) {
      await admin.from("user_subscriptions").update({
        session_credits_used: subscription.session_credits_used + 1,
      }).eq("id", subscription.id);
    }
    const gross = Number(updated.price);
    const commission = gross * Number(updated.platform_commission_percent) / 100;
    const payout = gross * Number(updated.mentor_payout_percent) / 100;
    await admin.from("mentor_earnings").upsert({
      mentor_id: updated.mentor_id,
      session_id: updated.id,
      service_type: updated.session_type,
      gross_amount: gross,
      platform_commission: commission,
      mentor_payout: payout,
      status: "pending",
    }, { onConflict: "session_id" });
  }

  let warning: string | undefined;
  try {
    if (action === "assign" && updated.mentor_id) {
      const { data: mentor } = await admin.from("profiles").select("full_name,email").eq("user_id", updated.mentor_id).single();
      if (mentor) await sendSessionAssignedEmail(updated, mentor);
    }
    if (["schedule", "reject"].includes(action) && updated.mentor_id) {
      const [{ data: student }, { data: mentor }] = await Promise.all([
        admin.from("profiles").select("full_name,email").eq("user_id", updated.student_id).single(),
        admin.from("profiles").select("full_name,email").eq("user_id", updated.mentor_id).single(),
      ]);
      if (student && mentor && action === "schedule") await sendSessionScheduledEmails(updated, student, mentor);
      if (student && action === "reject") await sendSessionRejectedEmail(updated, student);
    }
  } catch (emailError) {
    warning = "The update was saved, but an email notification could not be sent.";
    console.error("Session action email failed:", { action, id, emailError });
  }

  return NextResponse.json({ success: true, session: updated, warning });
}
