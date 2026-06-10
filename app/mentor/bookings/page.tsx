import DashboardHeader from "@/components/DashboardHeader";
import BookingStatusActions from "@/components/marketplace/BookingStatusActions";
import { requireAuth } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export default async function ExpertBookingsPage() {
  const { profile } = await requireAuth(["Mentor", "Faculty", "Institution"]);
  const admin = createSupabaseAdminClient();
  const { data } = await admin.from("service_bookings").select("*,expert_services(title,category,duration_minutes)").eq("expert_id", profile.user_id).order("created_at", { ascending: false });
  const bookings = data ?? [];
  const userIds = Array.from(new Set(bookings.map((booking) => booking.user_id)));
  const { data: users } = userIds.length ? await admin.from("profiles").select("user_id,full_name,email").in("user_id", userIds) : { data: [] };
  const userMap = new Map((users ?? []).map((user) => [user.user_id, user]));
  return <section className="bg-slate-50 py-10"><div className="container-shell"><DashboardHeader profile={profile} title="Service Bookings" description="Review paid requests, accept the right fit, schedule privately, and complete delivery." /><div className="grid gap-5 lg:grid-cols-2">{bookings.map((booking) => { const user = userMap.get(booking.user_id); return <article key={booking.id} className="card p-6"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase text-teal-700">{booking.expert_services?.category}</p><h2 className="mt-2 text-xl font-black">{booking.expert_services?.title}</h2><p className="mt-1 text-sm text-slate-500">{user?.full_name ?? "User"} · {user?.email}</p></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold capitalize">{booking.status}</span></div><div className="mt-4 space-y-3 text-sm text-slate-600"><p><strong className="text-ink">Goal:</strong> {booking.user_goal}</p><p><strong className="text-ink">Requirement:</strong> {booking.requirement_details}</p><p><strong className="text-ink">Preferred:</strong> {booking.preferred_date} · {booking.preferred_time}</p><p><strong className="text-ink">Payment:</strong> <span className="capitalize">{booking.payment_status}</span> · ₹{Number(booking.price).toLocaleString("en-IN")}</p></div><BookingStatusActions id={booking.id} status={booking.status} paymentStatus={booking.payment_status} /></article>; })}</div>{bookings.length === 0 && <div className="card p-10 text-center text-slate-600">No service bookings have arrived yet.</div>}</div></section>;
}
