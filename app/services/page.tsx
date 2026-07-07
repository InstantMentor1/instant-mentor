import type { Metadata } from "next";
import ServiceDiscovery from "@/components/marketplace/ServiceDiscovery";
import PageHero from "@/components/PageHero";
import { demoServices, getPublicServices } from "@/lib/marketplace-data";

export const metadata: Metadata = {
  title: "Find Expert Help | My Expert Talk",
  description: "Browse expert-created services for interview prep, exam guidance, resume review, career clarity, skill learning, rooms, micro-courses, and mentorship plans. Expert-set pricing.",
  openGraph: {
    title: "Find Expert Help | My Expert Talk",
    description: "Browse expert-created services for interview prep, exam guidance, resume review, career clarity, skill learning, rooms, micro-courses, and mentorship plans. Expert-set pricing.",
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
        title="Book the exact learning support you need."
        description="Search by need, compare expert-created listings, check price, duration, delivery method, and availability, then book the support that helps you prepare with confidence."
        ctaLabel="Find Experts"
        ctaHref="/mentors"
      />
      <ServiceDiscovery services={services} initialCategory={category} initialSearch={search} />
    </>
  );
}
