import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function ExpertApprovalPage() {
  await requireAuth(["Mentor", "Faculty", "Institution"]);

  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black text-navy">Apply for Approval</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Complete your expert profile, verification proof, LinkedIn, expertise areas, intro video, and service details before requesting approval.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {["Identity proof", "Expertise proof", "Service clarity"].map((item) => (
              <div key={item} className="rounded-2xl bg-ivory p-5">
                <h2 className="font-black text-navy">{item}</h2>
                <p className="mt-2 text-sm text-slate-600">Required before your profile becomes visible to students.</p>
              </div>
            ))}
          </div>
          <Link href="/mentor/verification" className="btn-primary mt-8">Complete Profile & Verification</Link>
        </div>
      </div>
    </section>
  );
}
