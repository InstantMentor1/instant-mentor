import { notFound } from "next/navigation";
import ServiceBookingForm from "@/components/marketplace/ServiceBookingForm";
import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";
import { getPublicService } from "@/lib/marketplace-data";

export default async function BookServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [{ profile }, service] = await Promise.all([requireAuth(["Student"]), getPublicService(id)]);
  if (!service || service.expert_id === "sample") notFound();
  return <section className="bg-slate-50 py-10"><div className="container-shell max-w-3xl"><DashboardHeader profile={profile} title="Request this expert service" description="Share your exact goal, select a preferred time, and complete secure test checkout." /><ServiceBookingForm serviceId={service.id} title={service.title} price={Number(service.price)} /></div></section>;
}
