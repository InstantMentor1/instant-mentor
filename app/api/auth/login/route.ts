import { NextResponse } from "next/server";
import { normalizeEmail, validateAccountEmail } from "@/lib/account-validation";
import { dashboardForRole } from "@/lib/auth-shared";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = normalizeEmail(String(body.email ?? ""));
  const password = String(body.password ?? "");
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role,email")
    .eq("user_id", data.user.id)
    .maybeSingle();
  if (!profile) {
    await supabase.auth.signOut();
    return NextResponse.json({ error: "Account profile not found. Please contact support." }, { status: 403 });
  }

  const eligibilityError = validateAccountEmail(profile.email, profile.role);
  if (eligibilityError && profile.role !== "Admin") {
    await supabase.auth.signOut();
    return NextResponse.json(
      { error: "This account is not eligible for My Expert Talk access. Please use your college, institution, or professional email." },
      { status: 403 },
    );
  }

  return NextResponse.json({ success: true, redirectTo: dashboardForRole(profile.role) });
}
