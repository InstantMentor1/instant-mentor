import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { hashVerificationToken } from "@/lib/waitlist";

export const runtime = "nodejs";

function verificationPage(title: string, message: string, success: boolean) {
  return new Response(
    `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>${title} | Instant Mentor</title>
        </head>
        <body style="margin:0;background:#f8fafc;font-family:Arial,sans-serif;color:#102a36">
          <main style="min-height:100vh;display:grid;place-items:center;padding:24px">
            <section style="width:min(520px,100%);box-sizing:border-box;background:#fff;border:1px solid #e2e8f0;border-radius:24px;padding:40px;text-align:center;box-shadow:0 20px 50px -24px rgba(6,79,77,.28)">
              <div style="width:64px;height:64px;margin:0 auto 20px;border-radius:50%;display:grid;place-items:center;background:${success ? "#eaf8f7" : "#fef2f2"};color:${success ? "#006460" : "#b91c1c"};font-size:32px">${success ? "✓" : "!"}</div>
              <h1 style="margin:0;font-size:28px">${title}</h1>
              <p style="margin:16px 0 28px;line-height:1.7;color:#475569">${message}</p>
              <a href="/waitlist" style="display:inline-block;background:#006460;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:bold">Return to Instant Mentor</a>
            </section>
          </main>
        </body>
      </html>`,
    {
      status: success ? 200 : 400,
      headers: { "content-type": "text/html; charset=utf-8" },
    },
  );
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");

  if (!token || token.length < 32) {
    return verificationPage(
      "Invalid verification link",
      "This email verification link is missing or invalid.",
      false,
    );
  }

  try {
    const supabase = createSupabaseAdminClient();
    const tokenHash = hashVerificationToken(token);
    const { data, error } = await supabase
      .from("waitlist_signups")
      .select("id, role, verification_status, email_verified")
      .eq("email_verification_token", tokenHash)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return verificationPage(
        "Verification link expired",
        "This link has already been used or is no longer valid.",
        false,
      );
    }

    if (data.email_verified) {
      return verificationPage(
        "Email already verified",
        "Your email has already been verified successfully.",
        true,
      );
    }

    const nextStatus = data.role === "Institution" ? "pending" : "verified";
    const { error: updateError } = await supabase
      .from("waitlist_signups")
      .update({
        email_verified: true,
        verification_status: nextStatus,
        email_verification_token: null,
      })
      .eq("id", data.id);

    if (updateError) {
      throw new Error(updateError.message);
    }

    const message =
      data.role === "Institution"
        ? "Your email is verified. Your institution request is now pending admin approval."
        : "Your email has been verified successfully. Your Instant Mentor request is confirmed.";

    return verificationPage("Email verified", message, true);
  } catch (error) {
    console.error("Email verification failed:", error);
    return verificationPage(
      "Verification unavailable",
      "We could not verify this email right now. Please try the link again later.",
      false,
    );
  }
}
