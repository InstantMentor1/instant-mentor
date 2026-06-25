import PageHero from "@/components/PageHero";
import ServiceDiscovery from "@/components/marketplace/ServiceDiscovery";
import { getPublicServices } from "@/lib/marketplace-data";

export const metadata = {
  title: "Explore Experts | My Expert Talk",
  description:
    "Search verified mentor services and compare outcomes by category, price, duration, availability, and format.",
};

export default async function LegacyMentorsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const services = await getPublicServices(category);

  return (
    <>
      <PageHero
        eyebrow="Verified expert marketplace"
        title="Explore expert profiles and service menus."
        description="Search verified experts and compare outcome, expert-set price, duration, delivery format, availability, and deliverables before booking."
      />
      <ServiceDiscovery services={services} initialCategory={category} />
    </>
  );
}
