import AdminAssignMentor from "@/components/AdminAssignMentor";
import DashboardHeader from "@/components/DashboardHeader";
import SessionCard from "@/components/SessionCard";
import { requireAuth } from "@/lib/auth";
import type { SessionRequest } from "@/lib/sessions";

export default async function AdminSessionsPage() {
  const { supabase, profile } = await requireAuth(["Admin"]);
  const [{ data: sessionsData }, { data: mentorsData }] = await Promise.all([
    supabase.from("session_requests").select("*").order("created_at", { ascending: false }),
    supabase.from("profiles").select("user_id,full_name,technical_track").eq("role", "Mentor").order("full_name"),
  ]);
  const sessions = (sessionsData ?? []) as SessionRequest[];
  const mentors = mentorsData ?? [];

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell">
        <DashboardHeader profile={profile} title="Session operations" description="Assign verified mentors and monitor every beta session." />
        <div className="grid gap-5 lg:grid-cols-2">
          {sessions.map((session) => (
            <div key={session.id}>
              <SessionCard session={session} />
              {!session.mentor_id && <AdminAssignMentor sessionId={session.id} mentors={mentors} />}
            </div>
          ))}
        </div>
        {sessions.length === 0 && <div className="card p-10 text-center text-slate-600">No session requests yet.</div>}
      </div>
    </section>
  );
}
