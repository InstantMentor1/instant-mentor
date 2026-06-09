import { NextResponse } from "next/server";
import { normalizeEmail, validateAccountEmail } from "@/lib/account-validation";
import type { AppRole } from "@/lib/auth-shared";
import { isTechnicalTrack } from "@/lib/constants";
import { sendAccountSignupEmails } from "@/lib/email";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

const publicRoles: AppRole[] = ["Student", "Mentor"];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const fullName = String(body.fullName ?? "").trim();
    const email = normalizeEmail(String(body.email ?? ""));
    const phone = String(body.phone ?? "").trim();
    const role = String(body.role ?? "") as AppRole;
    const collegeOrCompany = String(body.collegeOrCompany ?? "").trim();
    const technicalTrack = String(body.technicalTrack ?? "").trim();
    const linkedinOrPortfolio = String(body.linkedinOrPortfolio ?? "").trim();
    const expertiseAreas = Array.isArray(body.expertiseAreas)
      ? body.expertiseAreas.map((value: unknown) => String(value).trim()).filter(Boolean)
      : [];
    const password = String(body.password ?? "");
    const confirmPassword = String(body.confirmPassword ?? "");

    if (!fullName) return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    if (!email) return NextResponse.json({ error: "Email is required." }, { status: 400 });
    if (!phone) return NextResponse.json({ error: "Phone is required." }, { status: 400 });
    if (!publicRoles.includes(role)) return NextResponse.json({ error: "Select a valid account role." }, { status: 400 });
    if (!collegeOrCompany) return NextResponse.json({ error: "College or company is required." }, { status: 400 });
    if (!isTechnicalTrack(technicalTrack)) return NextResponse.json({ error: "Select a valid technical track." }, { status: 400 });
    if (role === "Mentor" && !linkedinOrPortfolio) {
      return NextResponse.json({ error: "LinkedIn or portfolio is required for mentors." }, { status: 400 });
    }
    if (role === "Mentor" && expertiseAreas.length === 0) {
      return NextResponse.json({ error: "Select at least one mentor expertise area." }, { status: 400 });
    }
    if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    if (password !== confirmPassword) return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });

    const emailError = validateAccountEmail(email, role);
    if (emailError) return NextResponse.json({ error: emailError }, { status: 400 });

    const admin = createSupabaseAdminClient();
    const { data: existing } = await admin
      .from("profiles")
      .select("id")
      .eq("email", email)
      .maybeSingle();
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        phone,
        role,
        college_or_company: collegeOrCompany,
        technical_track: technicalTrack,
        linkedin_or_portfolio: linkedinOrPortfolio,
        expertise_areas: expertiseAreas,
      },
    });

    if (error || !data.user) {
      console.error("Account signup failed:", error);
      const duplicate = error?.message.toLowerCase().includes("already");
      return NextResponse.json(
        { error: duplicate ? "An account with this email already exists." : "Unable to create your account right now." },
        { status: duplicate ? 409 : 500 },
      );
    }

    let warning: string | undefined;
    try {
      await sendAccountSignupEmails({ fullName, email, role, collegeOrCompany });
    } catch (emailSendError) {
      warning = "Your account was created, but the welcome email could not be sent right now.";
      console.error("Account signup email failed:", emailSendError);
    }

    return NextResponse.json({
      success: true,
      message: "Account created successfully. You can sign in now.",
      warning,
    });
  } catch (error) {
    console.error("Unexpected account signup error:", error);
    return NextResponse.json({ error: "Unable to process signup." }, { status: 500 });
  }
}
