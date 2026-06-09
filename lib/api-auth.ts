import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import type { AppRole, AuthProfile } from "@/lib/auth";
import type { User } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

type ApiAuthResult =
  | { error: NextResponse; user?: never; profile?: never; supabase?: never }
  | {
      error: null;
      user: User;
      profile: AuthProfile;
      supabase: SupabaseClient;
    };

export async function requireApiAuth(roles?: AppRole[]): Promise<ApiAuthResult> {
  const context = await getAuthContext();
  if (!context.user || !context.profile) {
    return { error: NextResponse.json({ error: "Authentication required." }, { status: 401 }) };
  }
  if (roles && !roles.includes(context.profile.role)) {
    return { error: NextResponse.json({ error: "You are not authorized for this action." }, { status: 403 }) };
  }
  return {
    user: context.user,
    profile: context.profile,
    supabase: context.supabase,
    error: null,
  };
}
