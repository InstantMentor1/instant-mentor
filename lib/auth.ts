import "server-only";
import { redirect } from "next/navigation";
import { dashboardForRole, type AppRole } from "@/lib/auth-shared";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type { AppRole } from "@/lib/auth-shared";

export type AuthProfile = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: AppRole;
  college_or_company: string | null;
  technical_track: string | null;
  technical_tracks: string[];
  linkedin_or_portfolio: string | null;
  user_type: string | null;
  strikes: number;
  account_status: "active" | "disabled";
  created_at: string;
};

export async function getAuthContext() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { supabase, user: null, profile: null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle<AuthProfile>();

  return { supabase, user, profile };
}

export async function requireAuth(roles?: AppRole[]) {
  const context = await getAuthContext();

  if (!context.user) redirect("/login");
  if (!context.profile) redirect("/signup?error=profile");

  if (roles && !roles.includes(context.profile.role)) {
    redirect(dashboardForRole(context.profile.role));
  }

  return {
    supabase: context.supabase,
    user: context.user,
    profile: context.profile,
  };
}
