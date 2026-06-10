import { notFound } from "next/navigation";
import DashboardHeader from "@/components/DashboardHeader";
import ExpertServiceForm from "@/components/marketplace/ExpertServiceForm";
import { requireAuth } from "@/lib/auth";
import type { ExpertService } from "@/lib/marketplace";

export default async function EditExpertServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase, profile } = await requireAuth(["Mentor", "Faculty", "Institution"]);
  const { data } = await supabase.from("expert_services").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell max-w-4xl">
        <DashboardHeader
          profile={profile}
          title="Edit Service"
          description="Update the service outcome, delivery details, availability, or price."
        />
        <ExpertServiceForm initialService={data as ExpertService} />
      </div>
    </section>
  );
}
