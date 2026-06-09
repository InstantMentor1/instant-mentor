import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";

export default async function CareerSupportPage() {
  const { profile } = await requireAuth(["Student"]);
  return <section className="bg-slate-50 py-10"><div className="container-shell"><DashboardHeader profile={profile} title="Career support" description="Focused help for resumes, interviews, placements, and career roadmaps."/><div className="grid gap-5 md:grid-cols-3">{["Resume & interview support","Placement preparation","Career roadmap guidance"].map(item=><article key={item} className="card p-6"><h2 className="text-xl font-black">{item}</h2><p className="mt-3 text-sm leading-6 text-slate-600">Request a private session with a mentor experienced in this area.</p><Link href="/sessions/new" className="btn-primary mt-5 !px-4 !py-2">Request support</Link></article>)}</div></div></section>;
}
