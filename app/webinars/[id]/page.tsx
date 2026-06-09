import { notFound } from "next/navigation";
import DashboardHeader from "@/components/DashboardHeader";
import WebinarRegisterButton from "@/components/WebinarRegisterButton";
import { requireAuth } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { webinarPriceForPlan, type Webinar } from "@/lib/webinars";

export default async function WebinarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { user, profile } = await requireAuth(["Student", "Mentor", "Faculty", "Admin"]);
  const admin = createSupabaseAdminClient();
  const { data } = await admin.from("webinars").select("*").eq("id", id).maybeSingle<Webinar>();
  if (!data) notFound();
  const isOwner = data.mentor_id === user.id;
  const isAdmin = profile.role === "Admin";
  let planName: string | null = null;
  let registration: { payment_status: string } | null = null;
  if (profile.role === "Student") {
    const [{ data: subscription }, { data: registrationData }] = await Promise.all([
      admin.from("user_subscriptions").select("plans(name)").eq("user_id", user.id).eq("status", "active").order("created_at", { ascending: false }).limit(1).maybeSingle(),
      admin.from("webinar_registrations").select("payment_status").eq("webinar_id", id).eq("student_id", user.id).maybeSingle(),
    ]);
    const relation = subscription?.plans;
    planName = (Array.isArray(relation) ? relation[0] : relation)?.name ?? null;
    registration = registrationData;
  }
  const pricing = webinarPriceForPlan(planName, data);
  const canSeeLink = isOwner || isAdmin || registration?.payment_status === "paid";
  return <section className="bg-slate-50 py-10"><div className="container-shell max-w-4xl"><DashboardHeader profile={profile} title={data.title} description={`${data.technical_track} · Paid Webinar`}/><article className="card p-7"><p className="whitespace-pre-wrap leading-7 text-slate-600">{data.description}</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><p><strong>Date & Time</strong><br/>{new Date(data.scheduled_at).toLocaleString("en-IN")}</p><p><strong>Duration</strong><br/>60 minutes</p><p><strong>Mentor Price</strong><br/>₹{data.price}</p><p><strong>Maximum Participants</strong><br/>{data.max_participants}</p></div>{profile.role === "Student" && <div className={`mt-6 rounded-2xl p-5 font-semibold ${pricing.allowed ? "bg-teal-50 text-teal-800" : "bg-amber-50 text-amber-800"}`}>{pricing.message}</div>}{profile.role === "Student" && pricing.allowed && !registration && <div className="mt-6"><WebinarRegisterButton webinarId={id}/></div>}{registration && <p className="mt-6 font-semibold capitalize">Payment status: {registration.payment_status}</p>}{canSeeLink && data.meeting_link && <div className="mt-6 rounded-2xl bg-teal-50 p-5"><strong>Private Meeting Link</strong><br/><a href={data.meeting_link} target="_blank" rel="noreferrer" className="mt-2 inline-block font-bold text-teal-800 underline">{data.meeting_link}</a></div>}</article></div></section>;
}
