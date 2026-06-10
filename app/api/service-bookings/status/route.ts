import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/api-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function PATCH(request: Request) {
  const auth = await requireApiAuth(["Mentor", "Faculty", "Institution", "Admin"]);
  if (auth.error) return auth.error;
  const body = await request.json().catch(() => ({}));
  const id = String(body.id ?? "");
  const status = String(body.status ?? "");
  const validStatuses = ["accepted", "rejected", "scheduled", "completed", "cancelled"];
  if (!id || !validStatuses.includes(status)) return NextResponse.json({ error: "Select a valid booking status." }, { status: 400 });

  const admin = createSupabaseAdminClient();
  const { data: booking } = await admin.from("service_bookings").select("*").eq("id", id).maybeSingle();
  if (!booking) return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  if (auth.profile.role !== "Admin" && booking.expert_id !== auth.user.id) {
    return NextResponse.json({ error: "You are not authorized for this booking." }, { status: 403 });
  }
  if (status === "accepted" && booking.payment_status !== "paid") {
    return NextResponse.json({ error: "Payment must be confirmed before accepting this booking." }, { status: 409 });
  }

  const update: Record<string, string | null> = { status };
  if (status === "rejected") update.rejection_reason = String(body.rejection_reason ?? "").trim() || "The expert could not accept this request.";
  if (status === "scheduled") {
    const scheduledAt = String(body.scheduled_at ?? "");
    const meetingLink = String(body.meeting_link ?? "").trim();
    if (!scheduledAt || !meetingLink) return NextResponse.json({ error: "Scheduled date/time and meeting link are required." }, { status: 400 });
    update.scheduled_at = scheduledAt;
    update.meeting_link = meetingLink;
  }
  const { error } = await admin.from("service_bookings").update(update).eq("id", id);
  if (error) {
    console.error("Unable to update service booking", error);
    return NextResponse.json({ error: "Unable to update the booking." }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
