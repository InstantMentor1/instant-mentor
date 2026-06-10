import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";

export default async function ExpertEarningsPage() {
  const { supabase, profile } = await requireAuth(["Mentor", "Faculty", "Institution"]);
  const { data } = await supabase.from("service_bookings").select("id,price,status,payment_status,created_at,expert_services(title)").eq("payment_status", "paid").order("created_at", { ascending: false });
  const bookings = data ?? [];
  const gross = bookings.reduce((sum, item) => sum + Number(item.price), 0);
  const platformCommission = gross * 0.2;
  const payout = gross * 0.8;
  return <section className="bg-slate-50 py-10"><div className="container-shell"><DashboardHeader profile={profile} title="Expert earnings" description="Track paid service bookings, platform commission, and your estimated payout." /><div className="grid gap-4 sm:grid-cols-3"><div className="card p-6"><p className="text-xs font-bold uppercase text-slate-500">Gross bookings</p><p className="mt-2 text-3xl font-black">₹{gross.toLocaleString("en-IN")}</p></div><div className="card p-6"><p className="text-xs font-bold uppercase text-slate-500">Platform commission (20%)</p><p className="mt-2 text-3xl font-black">₹{platformCommission.toLocaleString("en-IN")}</p></div><div className="card p-6"><p className="text-xs font-bold uppercase text-slate-500">Expert payout (80%)</p><p className="mt-2 text-3xl font-black text-teal-700">₹{payout.toLocaleString("en-IN")}</p></div></div><div className="mt-8 grid gap-4">{bookings.map((booking) => { const service = Array.isArray(booking.expert_services) ? booking.expert_services[0] : booking.expert_services; return <article key={booking.id} className="card flex items-center justify-between gap-4 p-5"><div><h2 className="font-black">{service?.title ?? "Expert service"}</h2><p className="mt-1 text-xs text-slate-500 capitalize">{booking.status} · {new Date(booking.created_at).toLocaleDateString("en-IN")}</p></div><div className="text-right"><p className="font-black">₹{(Number(booking.price) * 0.8).toLocaleString("en-IN")}</p><p className="text-xs text-slate-500">Expert payout</p></div></article>; })}</div>{bookings.length === 0 && <div className="card mt-8 p-10 text-center text-slate-600">No paid service bookings yet.</div>}</div></section>;
}
