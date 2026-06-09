import DashboardHeader from "@/components/DashboardHeader";
import WebinarPaymentAction from "@/components/WebinarPaymentAction";
import { requireAuth } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export default async function AdminWebinarsPage() {
  const { profile } = await requireAuth(["Admin"]);
  const admin = createSupabaseAdminClient();
  const [{ data: webinars }, { data: registrations }, { data: users }] = await Promise.all([
    admin.from("webinars").select("*").order("scheduled_at"),
    admin.from("webinar_registrations").select("*").order("registered_at", { ascending: false }),
    admin.from("profiles").select("user_id,full_name,email"),
  ]);
  const webinarMap = new Map((webinars ?? []).map((item) => [item.id, item]));
  const userMap = new Map((users ?? []).map((item) => [item.user_id, item]));
  return <section className="bg-slate-50 py-10"><div className="container-shell"><DashboardHeader profile={profile} title="Webinar Management" description="Review paid webinar registrations, revenue, and mentor payouts."/><div className="grid gap-4">{(registrations ?? []).map((item) => {const webinar=webinarMap.get(item.webinar_id);const student=userMap.get(item.student_id);return <article key={item.id} className="card flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"><div><h2 className="font-black">{webinar?.title}</h2><p className="text-sm text-slate-600">{student?.full_name} · {student?.email}</p><p className="mt-1 text-sm">₹{item.final_price} · Platform ₹{(Number(item.final_price)*0.2).toFixed(2)} · Mentor ₹{(Number(item.final_price)*0.8).toFixed(2)} · <span className="capitalize">{item.payment_status}</span></p></div>{item.payment_status==="pending"&&<WebinarPaymentAction registrationId={item.id}/>}</article>})}</div>{(registrations ?? []).length===0&&<div className="card p-10 text-center text-slate-600">No webinar registrations yet.</div>}</div></section>;
}
