import DashboardHeader from "@/components/DashboardHeader";
import ManualPaymentAction from "@/components/ManualPaymentAction";
import { requireAuth } from "@/lib/auth";

export default async function AdminPaymentsPage() {
  const { supabase, profile } = await requireAuth(["Admin"]);
  const [{ data }, { data: users }] = await Promise.all([
    supabase.from("payments").select("*,plans(name)").order("created_at", { ascending: false }),
    supabase.from("profiles").select("user_id,full_name,email"),
  ]);
  const userMap = new Map((users ?? []).map((user) => [user.user_id, user]));
  return <section className="bg-slate-50 py-10"><div className="container-shell"><DashboardHeader profile={profile} title="Payments" description="Review Razorpay test payments and legacy manual payment requests."/><div className="grid gap-4">{(data ?? []).map(payment=>{const user=userMap.get(payment.user_id);const productLabel=payment.plans?.name ?? String(payment.product_type ?? "Payment").replaceAll("_", " ");return <article key={payment.id} className="card flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"><div><h2 className="font-black">{user?.full_name ?? "Student"} · {productLabel}</h2><p className="text-sm text-slate-600">{user?.email} · ₹{payment.amount} · <span className="capitalize">{payment.status}</span></p><p className="mt-1 text-xs text-slate-500">{payment.payment_method ?? "unknown"} {payment.razorpay_payment_id ? `· ${payment.razorpay_payment_id}` : ""}</p></div>{payment.status === "pending" && payment.payment_method === "manual" && <ManualPaymentAction paymentId={payment.id}/>}</article>})}</div></div></section>;
}
