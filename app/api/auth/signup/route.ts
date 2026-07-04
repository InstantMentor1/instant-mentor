import { NextResponse } from "next/server";
import { normalizeEmail, validateAccountEmail } from "@/lib/account-validation";
import type { AppRole } from "@/lib/auth-shared";
import { isTechnicalTrack } from "@/lib/constants";
import { sendAccountSignupEmails } from "@/lib/email";
import { studentUserTypes } from "@/lib/marketplace";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

const publicRoles: AppRole[] = ["Student", "Mentor"];

function getSignupConfigError() {
  const missing = [
    ["NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL],
    ["SUPABASE_SERVICE_ROLE_KEY", process.env.SUPABASE_SERVICE_ROLE_KEY],
  ].filter(([, value]) => !value);

  if (missing.length > 0) {
    console.error("Signup configuration missing", {
      missing: missing.map(([name]) => name),
    });
    return "Account creation is not configured. Please contact support.";
  }

  return null;
}

function isDuplicateAuthError(error: { message?: string } | null | undefined) {
  const message = error?.message?.toLowerCase() ?? "";
  return (
    message.includes("already") ||
    message.includes("duplicate") ||
    message.includes("registered") ||
    message.includes("unique")
  );
}

function authSignupErrorResponse(error: { message?: string; status?: number; code?: string } | null | undefined) {
  const message = error?.message?.toLowerCase() ?? "";
  const status = error?.status;

  if (isDuplicateAuthError(error)) return duplicateAccountResponse();

  if (
    status === 401 ||
    status === 403 ||
    message.includes("jwt") ||
    message.includes("api key") ||
    message.includes("invalid key")
  ) {
    return NextResponse.json(
      { error: "Account creation service is not configured correctly. Please contact support." },
      { status: 500 },
    );
  }

  if (message.includes("password")) {
    return NextResponse.json(
      { error: "Password does not meet the account security requirements. Please use a stronger password." },
      { status: 400 },
    );
  }

  if (message.includes("email")) {
    return NextResponse.json(
      { error: "Please check your email address and try again." },
      { status: 400 },
    );
  }

  if (message.includes("database")) {
    return NextResponse.json(
      { error: "Account setup is temporarily unavailable. Please try again in a few minutes or contact support." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { error: "Account could not be created. Please try again or contact support." },
    { status: 500 },
  );
}

function duplicateAccountResponse() {
  return NextResponse.json(
    { error: "An account with this email already exists. Please log in." },
    { status: 409 },
  );
}

export async function POST(request: Request) {
  try {
    const configError = getSignupConfigError();
    if (configError) return NextResponse.json({ error: configError }, { status: 500 });

    const body = (await request.json()) as Record<string, unknown>;
    const fullName = String(body.fullName ?? "").trim();
    const email = normalizeEmail(String(body.email ?? ""));
    const phone = String(body.phone ?? "").trim();
    const role = String(body.role ?? "") as AppRole;
    const collegeOrCompany = String(body.collegeOrCompany ?? "").trim();
    const technicalTrack = String(body.technicalTrack ?? "").trim();
    const userType = String(body.userType ?? "").trim();
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
    if (role === "Student" && !studentUserTypes.includes(userType as (typeof studentUserTypes)[number])) {
      return NextResponse.json({ error: "Select your student type." }, { status: 400 });
    }
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
      return duplicateAccountResponse();
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
        user_type: role === "Student" ? userType : null,
        linkedin_or_portfolio: linkedinOrPortfolio,
        expertise_areas: expertiseAreas,
      },
    });

    if (error || !data.user) {
      console.error("Account signup failed:", {
        message: error?.message,
        status: error?.status,
        code: error?.code,
      });
      return authSignupErrorResponse(error);
    }

    let { data: profile, error: profileUpsertError } = await admin
      .from("profiles")
      .upsert(
        {
          user_id: data.user.id,
          full_name: fullName,
          email,
          phone,
          role,
          college_or_company: collegeOrCompany,
          technical_track: technicalTrack,
          technical_tracks: [technicalTrack],
          linkedin_or_portfolio: linkedinOrPortfolio || null,
          email_verified: true,
          verification_status: role === "Mentor" ? "pending" : "verified",
          user_type: role === "Student" ? userType : null,
          strikes: 0,
          account_status: "active",
        },
        { onConflict: "user_id" },
      )
      .select("id")
      .single();

    if (profileUpsertError) {
      console.error("Full profile upsert failed, retrying minimal profile upsert:", profileUpsertError);
      const fallback = await admin
        .from("profiles")
        .upsert(
          {
            user_id: data.user.id,
            full_name: fullName,
            email,
            phone,
            role,
            college_or_company: collegeOrCompany,
            technical_track: technicalTrack,
            linkedin_or_portfolio: linkedinOrPortfolio || null,
          },
          { onConflict: "user_id" },
        )
        .select("id")
        .single();
      profile = fallback.data;
      profileUpsertError = fallback.error;
    }

    if (profileUpsertError || !profile) {
      console.error("My Expert Talk profile creation failed:", profileUpsertError);
      await admin.auth.admin.deleteUser(data.user.id).catch((deleteError) => {
        console.error("Failed to roll back auth user after profile creation failure:", deleteError);
      });
      return NextResponse.json(
        { error: "Account profile could not be created. Please try again or contact support." },
        { status: 500 },
      );
    }

    if (role === "Mentor") {
      let { error: mentorProfileError } = await admin
        .from("mentor_profiles")
        .upsert(
          {
            user_id: data.user.id,
            profile_id: profile.id,
            expertise_areas: expertiseAreas,
            expertise: expertiseAreas,
            verification_status: "pending",
          },
          { onConflict: "user_id" },
        );

      if (mentorProfileError) {
        console.error("Full mentor profile upsert failed, retrying minimal mentor profile upsert:", mentorProfileError);
        const fallback = await admin
          .from("mentor_profiles")
          .upsert(
            {
              user_id: data.user.id,
              expertise_areas: expertiseAreas,
              verification_status: "pending",
            },
            { onConflict: "user_id" },
          );
        mentorProfileError = fallback.error;
      }

      if (mentorProfileError) {
        console.error("My Expert Talk mentor profile creation failed:", mentorProfileError);
      }
    }

    const { error: profileUpdateError } = await admin
      .from("profiles")
      .update({
        user_type: role === "Student" ? userType : null,
        account_status: "active",
      })
      .eq("user_id", data.user.id);
    if (profileUpdateError) {
      console.error("My Expert Talk profile metadata update failed:", profileUpdateError);
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
