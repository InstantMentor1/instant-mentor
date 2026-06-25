import DashboardHeader from "@/components/DashboardHeader";
import ExpertServiceForm from "@/components/marketplace/ExpertServiceForm";
import { requireAuth } from "@/lib/auth";

export default async function NewExpertServicePage() {
  const { profile } = await requireAuth(["Mentor", "Faculty", "Institution"]);
  return <section className="bg-ivory py-10"><div className="container-shell max-w-4xl"><DashboardHeader profile={profile} title="Create Service" description="Define the student outcome, mentor-set price, duration, deliverables, requirements, and availability." /><ExpertServiceForm /></div></section>;
}
