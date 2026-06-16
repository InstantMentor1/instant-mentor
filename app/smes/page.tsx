import type { Metadata } from "next";
import ServiceDiscovery from "@/components/marketplace/ServiceDiscovery";
import PageHero from "@/components/PageHero";
import { getPublicServices } from "@/lib/marketplace-data";

export const metadata: Metadata = {
  title: "Explore SME Profiles",
  description:
    "Search verified SME profiles and compare expertise items by domain, price, duration, availability, and outcome.",
};

export default async function SmesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;
  const services = await getPublicServices();

  return (
    <>
      <PageHero
        eyebrow="Verified SME marketplace"
        title="Explore SME profiles and expertise menus."
        description="Search verified Subject Matter Experts and compare outcome, SME-set price, duration, delivery format, availability, and deliverables before booking."
      />
      <ServiceDiscovery
        services={services}
        initialCategory={category}
        initialSearch={search}
      />
    </>
  );
}
