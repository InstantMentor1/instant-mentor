import DashboardHeader from "@/components/DashboardHeader";
import ExpertServiceForm from "@/components/marketplace/ExpertServiceForm";
import { requireAuth } from "@/lib/auth";

export default async function NewExpertServicePage() {
  const { profile } = await requireAuth(["Mentor", "Faculty", "Institution"]);
  return <section className="bg-slate-50 py-10"><div className="container-shell max-w-4xl"><DashboardHeader profile={profile} title="Create a service" description="Package one clear outcome with transparent pricing, duration, deliverables, and requirements." /><ExpertServiceForm /></div></section>;
}
