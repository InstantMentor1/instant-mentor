import { notFound } from "next/navigation";
import ServiceBookingForm from "@/components/marketplace/ServiceBookingForm";
import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";
import { getPublicService } from "@/lib/marketplace-data";

export default async function BookServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [{ profile }, service] = await Promise.all([requireAuth(["Student"]), getPublicService(id)]);
  if (!service) notFound();
  return <section className="bg-[#F8FAFC] py-10"><div className="container-shell max-w-3xl"><DashboardHeader profile={profile} title="View Booking" description="Review the selected menu service, add-ons, Google Meet slot, promo code, and price breakup before checkout." /><ServiceBookingForm serviceId={service.id} title={service.title} price={Number(service.price)} /></div></section>;
}
