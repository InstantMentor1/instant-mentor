import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/api-auth";
import { isTechnicalTrack } from "@/lib/constants";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;

  const body = await request.json().catch(() => ({}));
  const fullName = String(body.fullName ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const collegeOrCompany = String(body.collegeOrCompany ?? "").trim();
  const linkedinOrPortfolio = String(body.linkedinOrPortfolio ?? "").trim();
  const normalizedTracks: string[] = Array.isArray(body.technicalTracks)
    ? body.technicalTracks.map((value: unknown) => String(value).trim())
    : [];
  const technicalTracks = [...new Set<string>(normalizedTracks)];

  if (!fullName) {
    return NextResponse.json({ error: "Full name is required." }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json({ error: "Phone is required." }, { status: 400 });
  }
  if (!collegeOrCompany) {
    return NextResponse.json({ error: "College or company is required." }, { status: 400 });
  }
  if (technicalTracks.length === 0 || technicalTracks.some((track) => !isTechnicalTrack(track))) {
    return NextResponse.json({ error: "Select at least one valid technical track." }, { status: 400 });
  }

  const isMentor = ["Mentor", "Faculty", "Institution"].includes(auth.profile.role);
  if (isMentor && !linkedinOrPortfolio) {
    return NextResponse.json({ error: "LinkedIn or portfolio is required for mentors." }, { status: 400 });
  }
  if (linkedinOrPortfolio && !linkedinOrPortfolio.startsWith("https://")) {
    return NextResponse.json({ error: "LinkedIn or portfolio must use HTTPS." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const { error: profileError } = await admin
    .from("profiles")
    .update({
      full_name: fullName.slice(0, 120),
      phone: phone.slice(0, 30),
      college_or_company: collegeOrCompany.slice(0, 160),
      linkedin_or_portfolio: linkedinOrPortfolio || null,
      technical_track: technicalTracks[0],
      technical_tracks: technicalTracks,
    })
    .eq("user_id", auth.user.id);

  if (profileError) {
    console.error("Profile update failed:", profileError);
    return NextResponse.json({ error: "Unable to update your profile." }, { status: 500 });
  }

  if (isMentor) {
    const { error: mentorError } = await admin
      .from("mentor_profiles")
      .update({
        expertise_areas: technicalTracks,
        expertise: technicalTracks,
      })
      .eq("user_id", auth.user.id);

    if (mentorError) {
      console.error("Mentor expertise update failed:", mentorError);
      return NextResponse.json(
        { error: "Your profile was updated, but mentor expertise could not be synchronized." },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({
    success: true,
    message: "Your profile has been updated successfully.",
  });
}
