import DashboardHeader from "@/components/DashboardHeader";
import MentorVerificationActions from "@/components/MentorVerificationActions";
import { requireAuth } from "@/lib/auth";

export default async function AdminUsersPage() {
  const { supabase, profile } = await requireAuth(["Admin"]);
  const [{ data: users }, { data: mentorProfiles }] = await Promise.all([
    supabase.from("profiles").select("*").order("created_at", { ascending: false }),
    supabase.from("mentor_profiles").select("user_id,verification_status"),
  ]);
  const mentorStatus = new Map((mentorProfiles ?? []).map((mentor) => [mentor.user_id, mentor.verification_status]));

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell">
        <DashboardHeader profile={profile} title="Beta users" description="Review student, mentor, and verification details." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(users ?? []).map((user) => (
            <article key={user.id} className="card p-6">
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800">{user.role}</span>
              <h2 className="mt-4 text-lg font-extrabold">{user.full_name}</h2>
              <p className="mt-1 text-sm text-slate-600">{user.email}</p>
              <p className="mt-4 text-sm"><strong>Organization:</strong> {user.college_or_company || "Not set"}</p>
              <p className="mt-2 text-sm"><strong>Track:</strong> {user.technical_track || "Not set"}</p>
              {["Mentor", "Faculty"].includes(user.role) && <><p className="mt-2 text-sm"><strong>Verification:</strong> {mentorStatus.get(user.user_id) ?? "pending"}</p>{mentorStatus.get(user.user_id) === "pending" && <MentorVerificationActions mentorId={user.user_id} />}</>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
