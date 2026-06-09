import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/api-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const auth = await requireApiAuth(["Admin"]);
  if (auth.error) return auth.error;
  const body = await request.json().catch(() => ({}));
  const mentorId = String(body.mentorId ?? "");
  const status = body.status === "rejected" ? "rejected" : "verified";
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("mentor_profiles").update({ verification_status: status }).eq("user_id", mentorId);
  if (error) {
    console.error("Mentor verification failed:", error);
    return NextResponse.json({ error: "Unable to update mentor verification." }, { status: 500 });
  }
  await admin.from("profiles").update({ verification_status: status }).eq("user_id", mentorId);
  return NextResponse.json({ success: true });
}
