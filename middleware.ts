import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { dashboardForRole, type AppRole } from "@/lib/auth-shared";

const protectedPrefixes = [
  "/student",
  "/mentor/dashboard",
  "/mentor/sessions",
  "/mentor/earnings",
  "/mentor/services",
  "/mentor/bookings",
  "/mentor/reviews",
  "/admin",
  "/sessions",
  "/messages",
  "/profile",
  "/billing",
  "/webinars",
  "/masterclasses",
  "/career-support",
  "/bookings",
];

const sharedPublicPages = ["/login", "/signup", "/early-access", "/waitlist", "/pricing"];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return response;

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = user
    ? await supabase.from("profiles").select("role").eq("user_id", user.id).maybeSingle<{ role: AppRole }>()
    : { data: null };
  const path = request.nextUrl.pathname;
  const isProtected = protectedPrefixes.some((prefix) => path.startsWith(prefix));

  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", path);
    return NextResponse.redirect(loginUrl);
  }

  if (user && profile) {
    const dashboard = dashboardForRole(profile.role);
    const isMentor = ["Mentor", "Faculty", "Institution"].includes(profile.role);
    const wrongRoleRoute =
      (path.startsWith("/student") && profile.role !== "Student") ||
      (path.startsWith("/mentor") && !isMentor) ||
      (path.startsWith("/admin") && profile.role !== "Admin") ||
      (path === "/sessions/new" && profile.role !== "Student") ||
      (path === "/bookings" && profile.role !== "Student") ||
      (path.endsWith("/book") && path.startsWith("/services/") && profile.role !== "Student") ||
      (path === "/webinars/create" && !isMentor && profile.role !== "Admin");
    const rolePublicRedirect =
      sharedPublicPages.includes(path) ||
      (isMentor && path === "/students") ||
      (profile.role === "Admin" && ["/", "/students", "/mentors"].includes(path));

    if (wrongRoleRoute || rolePublicRedirect) {
      return NextResponse.redirect(new URL(dashboard, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets).*)"],
};
