import DashboardHeader from "@/components/DashboardHeader";
import BookingStatusActions from "@/components/marketplace/BookingStatusActions";
import { requireAuth } from "@/lib/auth";

export default async function AdminBookingsPage() {
  const { supabase, profile } = await requireAuth(["Admin"]);
  const { data } = await supabase.from("service_bookings").select("*,expert_services(title,category)").order("created_at", { ascending: false });
  const bookings = data ?? [];
  return <section className="bg-slate-50 py-10"><div className="container-shell"><DashboardHeader profile={profile} title="Marketplace bookings" description="Monitor payment, fulfillment, scheduling, and booking status across the marketplace." /><div className="grid gap-5 lg:grid-cols-2">{bookings.map((booking) => <article key={booking.id} className="card p-6"><div className="flex justify-between gap-4"><div><p className="text-xs font-bold uppercase text-teal-700">{booking.expert_services?.category}</p><h2 className="mt-2 text-xl font-black">{booking.expert_services?.title}</h2></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold capitalize">{booking.status}</span></div><p className="mt-4 text-sm text-slate-600">{booking.user_goal}</p><p className="mt-3 font-black">₹{Number(booking.price).toLocaleString("en-IN")} · <span className="capitalize">{booking.payment_status}</span></p><BookingStatusActions id={booking.id} status={booking.status} paymentStatus={booking.payment_status} /></article>)}</div>{bookings.length === 0 && <div className="card p-10 text-center text-slate-600">No marketplace bookings yet.</div>}</div></section>;
}
