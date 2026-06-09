import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/api-auth";
import { sendWebinarAccessConfirmedEmail } from "@/lib/webinar-email";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const auth = await requireApiAuth(["Admin"]);
  if (auth.error) return auth.error;
  const registrationId = String((await request.json()).registrationId ?? "");
  const admin = createSupabaseAdminClient();
  const { data: registration } = await admin.from("webinar_registrations").select("*").eq("id", registrationId).maybeSingle();
  if (!registration) return NextResponse.json({ error: "Webinar registration not found." }, { status: 404 });
  if (registration.payment_status === "paid") {
    return NextResponse.json({ success: true, message: "Webinar access is already confirmed." });
  }
  const [{ data: webinar }, { data: student }] = await Promise.all([
    admin.from("webinars").select("*").eq("id", registration.webinar_id).single(),
    admin.from("profiles").select("full_name,email").eq("user_id", registration.student_id).single(),
  ]);
  if (!webinar || !student) return NextResponse.json({ error: "Webinar registration data is incomplete." }, { status: 400 });

  const { error } = await admin.from("webinar_registrations").update({ payment_status: "paid" }).eq("id", registrationId);
  if (error) return NextResponse.json({ error: "Unable to confirm webinar access." }, { status: 500 });

  const platformCommission = Number(registration.final_price) * 0.2;
  const mentorPayout = Number(registration.final_price) * 0.8;
  const { error: earningsError } = await admin.from("mentor_earnings").insert({
    mentor_id: webinar.mentor_id,
    masterclass_id: null,
    service_type: "Webinar",
    gross_amount: registration.final_price,
    platform_commission: platformCommission,
    mentor_payout: mentorPayout,
    status: "pending",
    webinar_registration_id: registration.id,
  });
  if (earningsError && earningsError.code !== "23505") {
    console.error("Webinar mentor earning insert failed:", earningsError);
  }

  let warning: string | undefined;
  try {
    await sendWebinarAccessConfirmedEmail({ student, webinar });
  } catch (emailError) {
    warning = "Access confirmed, but confirmation email could not be sent.";
    console.error("Webinar access email failed:", emailError);
  }
  return NextResponse.json({ success: true, warning });
}
