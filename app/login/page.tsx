import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { getAuthContext } from "@/lib/auth";
import { dashboardForRole } from "@/lib/auth-shared";

export default async function LoginPage() {
  const { profile } = await getAuthContext();
  if (profile) redirect(dashboardForRole(profile.role));

  return (
    <section className="section-pad bg-hero-glow">
      <div className="container-shell">
        <div className="mb-8 text-center">
          <span className="eyebrow">Member access</span>
          <h1 className="text-4xl font-black">Sign in to My Expert Talk</h1>
          <p className="mt-3 text-slate-600">Your dashboard, mentor bookings, messages, and meeting links stay private.</p>
        </div>
        <AuthForm mode="login" />
      </div>
    </section>
  );
}
