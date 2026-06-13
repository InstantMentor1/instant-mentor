import type { Metadata } from "next";
import ServiceDiscovery from "@/components/marketplace/ServiceDiscovery";
import PageHero from "@/components/PageHero";
import { getPublicServices } from "@/lib/marketplace-data";

export const metadata: Metadata = {
  title: "Explore Expert Services",
  description:
    "Search and compare expert-created services by category, price, duration, availability, and expected outcome.",
};

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;
  const services = await getPublicServices();

  return (
    <>
      <PageHero
        eyebrow="Expert service marketplace"
        title="Explore services created by verified experts."
        description="Search expert profiles and compare the service outcome, expert-set price, duration, delivery format, availability, and deliverables before booking."
      />
      <ServiceDiscovery
        services={services}
        initialCategory={category}
        initialSearch={search}
      />
    </>
  );
}
