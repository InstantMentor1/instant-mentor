import type { Metadata } from "next";
import ServiceDiscovery from "@/components/marketplace/ServiceDiscovery";
import PageHero from "@/components/PageHero";
import { demoServices, getPublicServices } from "@/lib/marketplace-data";

export const metadata: Metadata = {
  title: "Find Support Menus | My Expert Talk",
  description: "Browse expert menu services for interview prep, exam guidance, resume review, career clarity, skill learning, rooms, packages, add-ons, and mentorship plans.",
  openGraph: {
    title: "Find Support Menus | My Expert Talk",
    description: "Browse expert menu services for interview prep, exam guidance, resume review, career clarity, skill learning, rooms, packages, add-ons, and mentorship plans.",
    siteName: "My Expert Talk",
    images: [{ url: "/my-expert-talk-logo.png", alt: "My Expert Talk" }],
  },
};

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;
  const liveServices = await getPublicServices(category);
  const services = liveServices.length > 0 ? liveServices : demoServices;

  return (
    <>
      <PageHero
        eyebrow="Expert-created services"
        title="Choose from verified expert menus."
        description="Search by need, compare fixed menu prices, duration, delivery method, add-ons, promo eligibility, and availability, then book a Google Meet slot."
        ctaLabel="Browse Expert Menus"
        ctaHref="/mentors"
      />
      <ServiceDiscovery services={services} initialCategory={category} initialSearch={search} />
    </>
  );
}
