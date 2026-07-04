import type { Metadata } from "next";
import ServiceDiscovery from "@/components/marketplace/ServiceDiscovery";
import PageHero from "@/components/PageHero";
import { demoServices, getPublicServices } from "@/lib/marketplace-data";

export const metadata: Metadata = {
  title: "Find Expert Help | My Expert Talk",
  description: "Browse verified mentor services for interview prep, exam guidance, resume review, and career clarity. Mentor-set pricing.",
  openGraph: {
    title: "Find Expert Help | My Expert Talk",
    description: "Browse verified mentor services for interview prep, exam guidance, resume review, and career clarity. Mentor-set pricing.",
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
        eyebrow="1:1 mentor services"
        title="Book focused practice before interviews, drives, and career moves."
        description="Search by need, compare mentor-created listings, check duration and availability, then book the support that helps you speak, prepare, and decide with confidence."
        ctaLabel="Create Mentor Store"
        ctaHref="/for-mentors"
      />
      <ServiceDiscovery services={services} initialCategory={category} initialSearch={search} />
    </>
  );
}
