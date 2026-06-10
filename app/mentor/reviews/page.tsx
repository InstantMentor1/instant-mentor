import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";

export default async function ExpertReviewsPage() {
  const { supabase, profile } = await requireAuth(["Mentor", "Faculty", "Institution"]);
  const { data } = await supabase.from("service_reviews").select("*,expert_services(title)").order("created_at", { ascending: false });
  const reviews = data ?? [];
  const average = reviews.length ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length : 0;
  return <section className="bg-slate-50 py-10"><div className="container-shell"><DashboardHeader profile={profile} title="Reviews" description="Build marketplace reputation through reviews from completed, verified bookings." /><div className="card mb-7 p-6"><p className="text-xs font-bold uppercase text-slate-500">Average rating</p><p className="mt-2 text-4xl font-black text-teal-700">{reviews.length ? average.toFixed(1) : "New"}</p><p className="mt-1 text-sm text-slate-500">{reviews.length} verified reviews</p></div><div className="grid gap-5 lg:grid-cols-2">{reviews.map((review) => <article key={review.id} className="card p-6"><p className="font-black text-amber-600">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p><h2 className="mt-3 font-black">{review.expert_services?.title ?? "Expert service"}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{review.review || "Rating submitted after a completed booking."}</p></article>)}</div>{reviews.length === 0 && <div className="card p-10 text-center text-slate-600">Completed-booking reviews will appear here.</div>}</div></section>;
}
