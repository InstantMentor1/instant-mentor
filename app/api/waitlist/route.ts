import { NextResponse } from "next/server";
import {
  sendAdminNotificationEmail,
  sendVerificationEmail,
  sendWaitlistConfirmationEmail,
} from "@/lib/email";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import {
  createVerificationToken,
  determineVerification,
  normalizeEmail,
  type WaitlistInput,
} from "@/lib/waitlist";
import {
  isWaitlistRole,
  validateWaitlistForm,
  type WaitlistFormData,
  type WaitlistRole,
} from "@/lib/validation";

export const runtime = "nodejs";

function text(value: unknown, maxLength = 500) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  try {
    let body: Record<string, unknown>;

    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch (error) {
      console.error("Waitlist request contains invalid JSON:", error);
      return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
    }

    const rawRole = body.role;
    if (rawRole && !isWaitlistRole(rawRole)) {
      return NextResponse.json({ error: "Please select a valid role." }, { status: 400 });
    }

    const formData: WaitlistFormData = {
      fullName: text(body.fullName, 120),
      email: normalizeEmail(text(body.email, 254)),
      phone: text(body.phone, 30),
      role: isWaitlistRole(rawRole) ? rawRole : "",
      collegeOrCompany: text(body.collegeOrCompany, 200),
      domainOfInterest: text(body.domainOfInterest, 150),
      linkedinOrPortfolio: text(body.linkedinOrPortfolio, 500),
      message: text(body.message, 2000),
    };

    if (process.env.NODE_ENV === "development") {
      console.info("Waitlist form data received:", {
        email: formData.email,
        role: formData.role,
        hasPhone: Boolean(formData.phone),
        hasOrganization: Boolean(formData.collegeOrCompany),
        hasDomain: Boolean(formData.domainOfInterest),
        hasProfile: Boolean(formData.linkedinOrPortfolio),
      });
    }

    const validation = validateWaitlistForm(formData);
    if (!validation.valid) {
      console.error("Waitlist validation failed:", {
        email: formData.email,
        role: formData.role,
        errors: validation.errors,
      });
      return NextResponse.json(
        {
          error: Object.values(validation.errors)[0] ?? "Please check the form fields.",
          fieldErrors: validation.errors,
        },
        { status: 400 },
      );
    }

    const input: WaitlistInput = {
      ...formData,
      role: formData.role as WaitlistRole,
    };
    const verification = determineVerification(input);
    console.info("Waitlist validation passed:", { email: input.email, role: input.role });

    const tokenData = verification.requiresEmailVerification
      ? createVerificationToken()
      : undefined;
    let supabase;

    try {
      supabase = createSupabaseAdminClient();
    } catch (error) {
      console.error("Waitlist database client creation failed:", error);
      return NextResponse.json(
        { error: "Database connection is not configured." },
        { status: 503 },
      );
    }

    const { data: existingSignup, error: duplicateCheckError } = await supabase
      .from("waitlist_signups")
      .select("id")
      .ilike("email", input.email)
      .limit(1)
      .maybeSingle();

    if (duplicateCheckError) {
      console.error("Supabase duplicate email check failed:", {
        email: input.email,
        code: duplicateCheckError.code,
        message: duplicateCheckError.message,
        details: duplicateCheckError.details,
        hint: duplicateCheckError.hint,
      });
      return NextResponse.json(
        { error: "We could not check your waitlist status. Please try again." },
        { status: 500 },
      );
    }

    if (existingSignup) {
      console.info("Duplicate waitlist signup blocked:", { email: input.email });
      return NextResponse.json(
        { error: "This email has already joined the Instant Mentor waitlist." },
        { status: 409 },
      );
    }

    const { data, error } = await supabase
      .from("waitlist_signups")
      .insert({
        full_name: input.fullName,
        email: input.email,
        phone: input.phone,
        role: input.role,
        college_or_company: input.collegeOrCompany,
        domain_of_interest: input.domainOfInterest,
        linkedin_or_portfolio: input.linkedinOrPortfolio || null,
        message: input.message || null,
        verification_method: verification.method,
        verification_status: verification.status,
        email_verified: false,
        email_verification_token: tokenData?.tokenHash ?? null,
        email_verification_sent_at: tokenData ? new Date().toISOString() : null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase waitlist insert failed:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
        email: input.email,
        role: input.role,
      });

      if (error.code === "23505" || error.message.toLowerCase().includes("duplicate")) {
        return NextResponse.json(
          { error: "This email has already joined the waitlist." },
          { status: 409 },
        );
      }

      return NextResponse.json(
        { error: "We could not save your waitlist request. Please try again." },
        { status: 500 },
      );
    }

    console.info("Waitlist signup saved:", {
      id: data.id,
      email: input.email,
      role: input.role,
      verificationMethod: verification.method,
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    const verificationLink =
      tokenData && siteUrl
        ? `${siteUrl}/api/verify-email?token=${encodeURIComponent(tokenData.token)}`
        : undefined;
    const emailUser = {
      ...input,
      verificationMethod: verification.method,
      verificationStatus: verification.status,
    };
    const emailFailures: string[] = [];

    if (tokenData && !siteUrl) {
      console.error(
        "Waitlist signup saved, but verification email link was not created because NEXT_PUBLIC_SITE_URL is missing.",
        { id: data.id, email: input.email },
      );
    }

    try {
      const result = await sendWaitlistConfirmationEmail(emailUser);
      console.info("Gmail customer confirmation email sent:", {
        signupId: data.id,
        email: input.email,
        messageId: result.messageId,
      });
    } catch (error) {
      emailFailures.push("confirmation");
      console.error("Gmail customer confirmation email failed:", { signupId: data.id, email: input.email, error });
    }

    try {
      const result = await sendAdminNotificationEmail(emailUser);
      console.info("Gmail admin notification email sent:", {
        signupId: data.id,
        messageId: result.messageId,
      });
    } catch (error) {
      emailFailures.push("admin");
      console.error("Gmail admin notification email failed:", { signupId: data.id, email: input.email, error });
    }

    if (verificationLink) {
      try {
        const result = await sendVerificationEmail(emailUser, verificationLink);
        console.info("Gmail verification email sent:", {
          signupId: data.id,
          email: input.email,
          messageId: result.messageId,
        });
      } catch (error) {
        emailFailures.push("verification");
        console.error("Gmail verification email failed:", { signupId: data.id, email: input.email, error });
      }
    }

    if (emailFailures.length > 0) {
      return NextResponse.json(
        {
          success: true,
          message: "You're on the list. Your signup was saved successfully, but confirmation email could not be sent right now.",
          signupSaved: true,
          emailFailures,
        },
        { status: 202 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "You're on the list. A confirmation email has been sent to your registered email address.",
      verificationMethod: verification.method,
      verificationStatus: verification.status,
      emailSent: true,
    });
  } catch (error) {
    console.error("Unexpected waitlist submission failure:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while saving your request. Please try again." },
      { status: 500 },
    );
  }
}
