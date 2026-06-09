import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { getAuthContext } from "@/lib/auth";
import { dashboardForRole } from "@/lib/auth-shared";

export default async function SignupPage() {
  const { profile } = await getAuthContext();
  if (profile) redirect(dashboardForRole(profile.role));

  return (
    <section className="section-pad bg-hero-glow">
      <div className="container-shell">
        <div className="mb-8 text-center">
          <span className="eyebrow">Technical Beta</span>
          <h1 className="text-4xl font-black">Create your early access account</h1>
          <p className="mt-3 text-slate-600">Students and mentors receive separate, protected workspaces.</p>
        </div>
        <AuthForm mode="signup" />
      </div>
    </section>
  );
}
