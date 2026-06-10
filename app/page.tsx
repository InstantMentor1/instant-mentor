import type { Metadata } from "next";
import {
  ExpertAccessProblemSection,
  ExpertEarningsSection,
  FeaturedExpertServicesSection,
  InstitutionProgramsSection,
  MarketplaceCategoriesGrid,
  MarketplaceCTASection,
  MarketplaceDifferenceSection,
  MarketplaceHeroSection,
  MarketplaceHowItWorksSection,
  ServiceMenuMarketplaceSection,
} from "@/components/marketplace/HomeSections";
import { getAuthContext } from "@/lib/auth";
import { dashboardForRole } from "@/lib/auth-shared";
import { sampleServices, type ExpertService } from "@/lib/marketplace";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Expert Service Marketplace | Instant Mentor",
  description:
    "Book verified experts for career, education, skills, academic, startup, and business guidance with transparent prices and clear deliverables.",
};

export default async function Home() {
  const { profile } = await getAuthContext();
  const services = await getFeaturedServices();

  return (
    <>
      <MarketplaceHeroSection dashboardHref={profile ? dashboardForRole(profile.role) : null} />
      <ExpertAccessProblemSection />
      <ServiceMenuMarketplaceSection />
      <MarketplaceHowItWorksSection />
      <MarketplaceCategoriesGrid />
      <FeaturedExpertServicesSection services={services} />
      <ExpertEarningsSection />
      <MarketplaceDifferenceSection />
      <InstitutionProgramsSection />
      <MarketplaceCTASection />
    </>
  );
}

async function getFeaturedServices(): Promise<ExpertService[]> {
  try {
    const admin = createSupabaseAdminClient();
    const { data: rows, error } = await admin
      .from("expert_services")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) {
      console.error("Unable to load featured expert services", error);
      return sampleServiceCards();
    }
    if (!rows?.length) return sampleServiceCards();

    const expertIds = Array.from(new Set(rows.map((service) => service.expert_id)));
    const [{ data: profiles }, { data: reviews }] = await Promise.all([
      admin.from("profiles").select("user_id,full_name,college_or_company,linkedin_or_portfolio").in("user_id", expertIds),
      admin.from("service_reviews").select("service_id,rating").in("service_id", rows.map((service) => service.id)),
    ]);
    const profileMap = new Map((profiles ?? []).map((item) => [item.user_id, item]));

    return rows.map((service) => {
      const serviceReviews = (reviews ?? []).filter((review) => review.service_id === service.id);
      return {
        ...service,
        price: Number(service.price),
        expert: profileMap.get(service.expert_id) ?? null,
        rating: serviceReviews.length
          ? serviceReviews.reduce((total, review) => total + review.rating, 0) / serviceReviews.length
          : null,
        review_count: serviceReviews.length,
      } as ExpertService;
    });
  } catch (error) {
    console.error("Unable to load marketplace homepage", error);
    return sampleServiceCards();
  }
}

function sampleServiceCards(): ExpertService[] {
  const now = new Date().toISOString();
  return sampleServices.map((service) => ({
    ...service,
    expert_id: "sample",
    description: service.deliverables,
    target_audience: "Students, professionals, founders, and teams seeking focused expert guidance.",
    requirements: "Share your current context, goal, and relevant links before the session.",
    availability_notes: "Availability confirmed after booking request.",
    max_bookings_per_week: 5,
    status: "active",
    created_at: now,
    updated_at: now,
    expert: {
      full_name: service.expertName,
      college_or_company: service.expertRole,
      linkedin_or_portfolio: null,
    },
    rating: null,
    review_count: 0,
  }));
}
