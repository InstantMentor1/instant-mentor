import { NextResponse } from "next/server";
import { normalizeEmail } from "@/lib/account-validation";
import { dashboardForRole } from "@/lib/auth-shared";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function isSupabaseConnectionError(error: { message?: string; status?: number } | null | undefined) {
  const message = error?.message?.toLowerCase() ?? "";
  return error?.status === 0 || message.includes("fetch failed") || message.includes("enotfound");
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

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role,email,account_status")
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
      await supabase.auth.signOut();
      return NextResponse.json({ error: "Account profile not found. Please contact support." }, { status: 403 });
    }

    if (profile.account_status === "disabled") {
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
