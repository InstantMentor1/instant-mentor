import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";

export default async function MentorEarningsPage() {
  const { supabase, profile } = await requireAuth(["Mentor", "Faculty"]);
  const { data } = await supabase.from("mentor_earnings").select("*").order("created_at", { ascending: false });
  const total = (data ?? []).reduce((sum, item) => sum + Number(item.mentor_payout), 0);
  return <section className="bg-slate-50 py-10"><div className="container-shell"><DashboardHeader profile={profile} title="Mentor earnings" description="Track session payouts and payment status."/><div className="card mb-6 p-6"><p className="text-sm font-bold uppercase text-slate-500">Total mentor payout</p><p className="mt-2 text-4xl font-black text-teal-700">₹{total.toFixed(2)}</p></div><div className="grid gap-4">{(data ?? []).map(item=><article key={item.id} className="card p-5"><div className="flex justify-between gap-4"><div><h2 className="font-black">{item.service_type}</h2><p className="text-sm text-slate-600">Gross ₹{item.gross_amount} · Commission ₹{item.platform_commission}</p></div><div className="text-right"><p className="font-black">₹{item.mentor_payout}</p><p className="text-xs capitalize text-slate-500">{item.status}</p></div></div></article>)}</div>{(data ?? []).length===0&&<div className="card p-10 text-center text-slate-600">No earnings recorded yet.</div>}</div></section>;
}
