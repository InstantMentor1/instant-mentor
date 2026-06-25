import type { Metadata } from "next";
import ServiceDiscovery from "@/components/marketplace/ServiceDiscovery";
import PageHero from "@/components/PageHero";
import { getPublicServices } from "@/lib/marketplace-data";

export const metadata: Metadata = {
  title: "Mentor Services",
  description: "Browse mentor-created services by category, duration, availability, and price set by mentor.",
};

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;
  const services = await getPublicServices(category);

  return (
    <>
      <PageHero
        eyebrow="Learning store"
        title="Browse mentor services like store listings."
        description="Search by need, compare mentor-created listings, check duration and availability, then book the service that fits."
        ctaLabel="Create Mentor Store"
        ctaHref="/for-mentors"
      />
      <ServiceDiscovery services={services} initialCategory={category} initialSearch={search} />
    </>
  );
}
