import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/api-auth";
import { isTechnicalTrack } from "@/lib/constants";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const auth = await requireApiAuth(["Mentor", "Faculty", "Admin"]);
  if (auth.error) return auth.error;
  const body = await request.json().catch(() => ({}));
  const title = String(body.title ?? "").trim();
  const description = String(body.description ?? "").trim();
  const technicalTrack = String(body.technicalTrack ?? "").trim();
  const scheduledAt = String(body.scheduledAt ?? "");
  const meetingLink = String(body.meetingLink ?? "").trim();
  const price = Number(body.price);
  const maxParticipants = Number(body.maxParticipants ?? 100);
  const accessType = body.accessType === "premium" ? "premium" : "regular";

  if (!title || !description || !isTechnicalTrack(technicalTrack) || !scheduledAt) {
    return NextResponse.json({ error: "Complete all required webinar fields." }, { status: 400 });
  }
  if (!Number.isFinite(price) || price < 149) return NextResponse.json({ error: "Webinar price must be at least ₹149." }, { status: 400 });
  if (price > 249) return NextResponse.json({ error: "Webinar price cannot exceed ₹249." }, { status: 400 });
  if (!Number.isInteger(maxParticipants) || maxParticipants < 1 || maxParticipants > 100) {
    return NextResponse.json({ error: "Maximum participants allowed per webinar is 100." }, { status: 400 });
  }
  if (meetingLink && !meetingLink.startsWith("https://")) {
    return NextResponse.json({ error: "Meeting link must use HTTPS." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from("webinars").insert({
    mentor_id: auth.user.id,
    title,
    description,
    technical_track: technicalTrack,
    scheduled_at: scheduledAt,
    meeting_link: meetingLink || null,
    price,
    duration_minutes: 60,
    max_participants: maxParticipants,
    access_type: accessType,
    status: "upcoming",
  }).select("*").single();
  if (error) {
    console.error("Webinar creation failed:", error);
    return NextResponse.json({ error: "Unable to create webinar." }, { status: 500 });
  }
  return NextResponse.json({ success: true, webinar: data });
}
