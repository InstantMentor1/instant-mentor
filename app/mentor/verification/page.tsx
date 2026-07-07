import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function MentorVerificationPage() {
  await requireAuth(["Mentor", "Faculty", "Institution"]);

  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black text-navy">Profile & Verification</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Complete your professional title, experience, company or college, LinkedIn, bio, skills, languages, certificates, intro video, profile photo, and verification proof.
          </p>
          <Link href="/profile" className="btn-primary mt-8">Edit profile</Link>
        </div>
      </div>
    </section>
  );
}
