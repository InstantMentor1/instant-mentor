import { NextResponse } from "next/server";
import { normalizeEmail } from "@/lib/account-validation";
import { dashboardForRole, type AppRole } from "@/lib/auth-shared";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";

function isSupabaseConnectionError(error: { message?: string; status?: number } | null | undefined) {
  const message = error?.message?.toLowerCase() ?? "";
  return error?.status === 0 || message.includes("fetch failed") || message.includes("enotfound");
}

function normalizeRole(value: unknown): AppRole {
  return value === "Mentor" || value === "Faculty" || value === "Institution" || value === "Admin"
    ? value
    : "Student";
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = normalizeEmail(String(body.email ?? ""));
    const password = String(body.password ?? "");
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) {
      if (isSupabaseConnectionError(error)) {
        console.error("Login Supabase connection failed:", error);
        return NextResponse.json(
          { error: "Database connection is currently unavailable. Please contact support." },
          { status: 503 },
        );
      }
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const admin = createSupabaseAdminClient();
    let { data: profile, error: profileError } = await admin
      .from("profiles")
      .select("role,email")
      .eq("user_id", data.user.id)
      .maybeSingle();
    if (profileError) {
      console.error("Login profile lookup failed:", profileError);
      if (isSupabaseConnectionError(profileError)) {
        return NextResponse.json(
          { error: "Database connection is currently unavailable. Please contact support." },
          { status: 503 },
        );
      }
    }

    if (!profile) {
      const userRole = normalizeRole(data.user.user_metadata?.role);
      const fullName =
        String(data.user.user_metadata?.full_name ?? "").trim() ||
        data.user.email?.split("@")[0] ||
        "My Expert Talk User";
      const userEmail = normalizeEmail(data.user.email ?? email);
      const { data: repairedProfile, error: repairError } = await admin
        .from("profiles")
        .upsert(
          {
            user_id: data.user.id,
            full_name: fullName,
            email: userEmail,
            phone: data.user.user_metadata?.phone ? String(data.user.user_metadata.phone) : null,
            role: userRole,
            college_or_company: String(data.user.user_metadata?.college_or_company ?? "Not provided"),
            technical_track: String(data.user.user_metadata?.technical_track ?? "Career Roadmap Guidance"),
            technical_tracks: [String(data.user.user_metadata?.technical_track ?? "Career Roadmap Guidance")],
            linkedin_or_portfolio: data.user.user_metadata?.linkedin_or_portfolio
              ? String(data.user.user_metadata.linkedin_or_portfolio)
              : null,
            email_verified: Boolean(data.user.email_confirmed_at),
            verification_status: userRole === "Mentor" ? "pending" : "verified",
            user_type: userRole === "Student" ? "Recent Graduate" : null,
            strikes: 0,
            account_status: "active",
          },
          { onConflict: "user_id" },
        )
        .select("role,email")
        .single();

      if (repairError || !repairedProfile) {
        console.error("Full login profile repair failed, retrying minimal repair:", repairError);
        const fallbackRepair = await admin
          .from("profiles")
          .upsert(
            {
              user_id: data.user.id,
              full_name: fullName,
              email: userEmail,
              phone: data.user.user_metadata?.phone ? String(data.user.user_metadata.phone) : null,
              role: userRole,
              college_or_company: String(data.user.user_metadata?.college_or_company ?? "Not provided"),
              technical_track: String(data.user.user_metadata?.technical_track ?? "Career Roadmap Guidance"),
              linkedin_or_portfolio: data.user.user_metadata?.linkedin_or_portfolio
                ? String(data.user.user_metadata.linkedin_or_portfolio)
                : null,
            },
            { onConflict: "user_id" },
          )
          .select("role,email")
          .single();

        if (fallbackRepair.error || !fallbackRepair.data) {
          console.error("Minimal login profile repair failed:", fallbackRepair.error);
          await supabase.auth.signOut();
          return NextResponse.json({ error: "Account profile could not be repaired. Please contact support." }, { status: 500 });
        }

        profile = fallbackRepair.data;
      } else {
        profile = repairedProfile;
      }

      if (userRole === "Mentor" || userRole === "Faculty") {
        const { error: mentorRepairError } = await admin
          .from("mentor_profiles")
          .upsert(
            {
              user_id: data.user.id,
              expertise_areas: [String(data.user.user_metadata?.technical_track ?? "Career Roadmap Guidance")],
              verification_status: "pending",
            },
            { onConflict: "user_id" },
          );
        if (mentorRepairError) {
          console.error("Login mentor profile repair failed:", mentorRepairError);
        }
      }

    }

    if ("account_status" in profile && profile.account_status === "disabled") {
      await supabase.auth.signOut();
      return NextResponse.json({ error: "This account is disabled. Please contact support." }, { status: 403 });
    }

    return NextResponse.json({ success: true, redirectTo: dashboardForRole(profile.role) });
  } catch (error) {
    console.error("Unexpected login error:", error);
    if (isSupabaseConnectionError(error as { message?: string; status?: number })) {
      return NextResponse.json(
        { error: "Database connection is currently unavailable. Please contact support." },
        { status: 503 },
      );
    }
    return NextResponse.json({ error: "Unable to sign in right now. Please try again." }, { status: 500 });
  }
}
