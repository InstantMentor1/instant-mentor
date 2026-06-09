import DashboardHeader from "@/components/DashboardHeader";
import WebinarCreateForm from "@/components/WebinarCreateForm";
import { requireAuth } from "@/lib/auth";

export default async function CreateWebinarPage() {
  const { profile } = await requireAuth(["Mentor", "Faculty", "Admin"]);
  return <section className="bg-slate-50 py-10"><div className="container-shell max-w-4xl"><DashboardHeader profile={profile} title="Create Webinar" description="Announce a paid 60-minute webinar for up to 100 students."/><WebinarCreateForm/></div></section>;
}
