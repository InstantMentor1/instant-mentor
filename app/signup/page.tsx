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
          <span className="eyebrow">Create your account</span>
          <h1 className="text-4xl font-black">Join Mentrix</h1>
          <p className="mt-3 text-slate-600">Mentrix is exclusively for students and verified SME partners. Students book serious expertise; SMEs publish their own expertise menu.</p>
        </div>
        <AuthForm mode="signup" />
      </div>
    </section>
  );
}
