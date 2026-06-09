import { notFound } from "next/navigation";
import DashboardHeader from "@/components/DashboardHeader";
import MentorSessionActions from "@/components/MentorSessionActions";
import { requireAuth } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { canSeeMeetingLink, type SessionRequest } from "@/lib/sessions";

export default async function SessionDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, profile } = await requireAuth(["Student", "Mentor", "Admin"]);
  const { data } = await supabase.from("session_requests").select("*").eq("id", id).maybeSingle<SessionRequest>();
  if (!data) notFound();

  const admin = createSupabaseAdminClient();
  const [{ data: student }, { data: mentor }] = await Promise.all([
    admin.from("profiles").select("full_name").eq("user_id", data.student_id).maybeSingle(),
    data.mentor_id ? admin.from("profiles").select("full_name").eq("user_id", data.mentor_id).maybeSingle() : Promise.resolve({ data: null }),
  ]);

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell max-w-5xl">
        <DashboardHeader profile={profile} title={data.title} description={`${data.session_type} · ${data.technical_track}`} />
        <div className="card p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <p><strong>Student:</strong><br />{student?.full_name}</p>
            <p><strong>Mentor:</strong><br />{mentor?.full_name ?? "Awaiting assignment"}</p>
            <p><strong>Status:</strong><br /><span className="capitalize">{data.status}</span></p>
            <p><strong>Preferred time:</strong><br />{data.preferred_date} at {data.preferred_time}</p>
          </div>
          <div className="mt-6 border-t border-slate-200 pt-6"><h2 className="font-extrabold">Session context</h2><p className="mt-2 whitespace-pre-wrap leading-7 text-slate-600">{data.description}</p></div>
          {canSeeMeetingLink(data) && <div className="mt-6 rounded-2xl bg-teal-50 p-5"><strong>Private meeting link</strong><br /><a className="mt-2 inline-block font-bold text-teal-800 underline" href={data.meeting_link!} target="_blank" rel="noreferrer">{data.meeting_link}</a></div>}
          {data.rejection_reason && <div className="mt-6 rounded-2xl bg-red-50 p-5 text-red-800"><strong>Rejection reason:</strong> {data.rejection_reason}</div>}
        </div>
        {["Mentor", "Faculty"].includes(profile.role) && ["assigned", "accepted"].includes(data.status) && <div className="mt-6"><MentorSessionActions sessionId={data.id} status={data.status} /></div>}
      </div>
    </section>
  );
}
