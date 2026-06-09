import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import WebinarRegisterButton from "@/components/WebinarRegisterButton";
import { requireAuth } from "@/lib/auth";
import { webinarPriceForPlan, type Webinar } from "@/lib/webinars";

export default async function WebinarsPage() {
  const { supabase, profile } = await requireAuth(["Student", "Mentor", "Faculty", "Admin"]);
  const [{ data: webinarsData }, { data: subscription }, { data: registrations }] = await Promise.all([
    supabase.from("webinars").select("id,mentor_id,title,description,technical_track,scheduled_at,price,duration_minutes,max_participants,status,access_type,created_at,updated_at").order("scheduled_at"),
    profile.role === "Student" ? supabase.from("user_subscriptions").select("plans(name)").eq("status", "active").order("created_at", { ascending: false }).limit(1).maybeSingle() : Promise.resolve({ data: null }),
    profile.role === "Student" ? supabase.from("webinar_registrations").select("webinar_id,payment_status") : Promise.resolve({ data: [] }),
  ]);
  const relation = subscription?.plans;
  const plan = Array.isArray(relation) ? relation[0] : relation;
  const registrationMap = new Map((registrations ?? []).map((item) => [item.webinar_id, item.payment_status]));
  const webinars = (webinarsData ?? []) as Webinar[];

  return <section className="bg-slate-50 py-10"><div className="container-shell"><DashboardHeader profile={profile} title="Webinar Hub" description="No free webinar access. Webinar pricing depends on your active plan."/>
    {["Mentor", "Faculty", "Admin"].includes(profile.role) && <div className="mb-8"><Link href="/webinars/create" className="btn-primary">Create Webinar</Link>{profile.role === "Admin" && <Link href="/admin/webinars" className="btn-secondary ml-3">Manage Registrations</Link>}</div>}
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{webinars.map((webinar) => {
      const pricing = webinarPriceForPlan(plan?.name, webinar);
      const registrationStatus = registrationMap.get(webinar.id);
      return <article key={webinar.id} className="card p-6"><span className="text-xs font-bold uppercase text-teal-700">{webinar.technical_track}</span><h2 className="mt-2 text-xl font-black">{webinar.title}</h2><p className="mt-3 line-clamp-3 text-sm text-slate-600">{webinar.description}</p><p className="mt-4 text-sm font-semibold">{new Date(webinar.scheduled_at).toLocaleString("en-IN")} · 60 minutes</p><p className="mt-2 text-lg font-black text-teal-700">₹{webinar.price}</p>{profile.role === "Student" && <p className={`mt-2 text-sm font-semibold ${pricing.allowed ? "text-teal-700" : "text-amber-700"}`}>{pricing.message}</p>}<div className="mt-5 flex flex-wrap gap-2"><Link href={`/webinars/${webinar.id}`} className="btn-secondary !px-4 !py-2">View Details</Link>{profile.role === "Student" && !registrationStatus && pricing.allowed && <WebinarRegisterButton webinarId={webinar.id}/>} {registrationStatus && <span className="rounded-full bg-amber-50 px-3 py-2 text-xs font-bold capitalize text-amber-800">{registrationStatus}</span>}</div></article>;
    })}</div>{webinars.length === 0 && <div className="card p-10 text-center text-slate-600">No webinars are scheduled yet.</div>}
  </div></section>;
}
