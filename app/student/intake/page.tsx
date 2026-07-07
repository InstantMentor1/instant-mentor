import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";
import { studentUserTypes } from "@/lib/marketplace";

export default async function StudentIntakePage() {
  const { profile } = await requireAuth(["Student"]);

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell max-w-3xl">
        <DashboardHeader
          profile={profile}
          title="Student Intake"
          description="Keep your student context current so My Expert Talk can recommend the right expert-created services."
        />
        <div className="card space-y-5 p-7">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-teal-700">Current student type</p>
            <h2 className="mt-2 text-2xl font-black">{profile.user_type ?? "Not selected"}</h2>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Supported types</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {studentUserTypes.map((type) => <span key={type} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700">{type}</span>)}
            </div>
          </div>
          <p className="rounded-2xl bg-teal-50 p-4 text-sm font-semibold text-teal-900">
            To edit your current profile details, open Profile and update your domain, tracks, and contact information.
          </p>
          <Link href="/profile" className="btn-primary">Update Profile</Link>
        </div>
      </div>
    </section>
  );
}
