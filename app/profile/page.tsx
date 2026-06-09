import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";

export default async function ProfilePage() {
  const { profile } = await requireAuth();
  return <section className="bg-slate-50 py-10"><div className="container-shell max-w-3xl"><DashboardHeader profile={profile} title="Profile" description="Your verified Instant Mentor identity." /><div className="card grid gap-5 p-7 sm:grid-cols-2">{Object.entries({Name:profile.full_name,Email:profile.email,Role:profile.role,Organization:profile.college_or_company,Track:profile.technical_track,Phone:profile.phone}).map(([label,value])=><p key={label}><span className="text-xs font-bold uppercase text-slate-500">{label}</span><br/><strong>{value || "Not set"}</strong></p>)}</div></div></section>;
}
