import type { Metadata } from "next";
import {
  ExpertDiscoveryProblemSection,
  ExpertMarketplaceCategoriesSection,
  ExpertMarketplaceCTASection,
  ExpertMarketplaceHeroSection,
  ExpertMarketplaceHowItWorksSection,
  ExpertPartnerSection,
  ExpertServiceMarketplaceSolutionSection,
  ExpertServiceMenuSection,
  InstitutionExpertAccessSection,
  WhyInstantMentorIsDifferentSection,
} from "@/components/marketplace/HomeSections";
import { getAuthContext } from "@/lib/auth";
import { dashboardForRole } from "@/lib/auth-shared";
import { getPublicServices } from "@/lib/marketplace-data";

export const metadata: Metadata = {
  title: "Learn Directly From Experts, Mentors, and Educators",
  description:
    "My Expert Talk helps students and learners join expert talks, explore mentor-led services, access recordings, and book guidance sessions.",
};

export default async function Home() {
  const [{ profile }, services] = await Promise.all([
    getAuthContext(),
    getPublicServices(),
  ]);

  return (
    <>
      <ExpertMarketplaceHeroSection dashboardHref={profile ? dashboardForRole(profile.role) : null} />
      <ExpertDiscoveryProblemSection />
      <ExpertServiceMarketplaceSolutionSection />
      <ExpertMarketplaceHowItWorksSection />
      <ExpertServiceMenuSection services={services.slice(0, 6)} />
      <ExpertMarketplaceCategoriesSection />
      <ExpertPartnerSection />
      <WhyInstantMentorIsDifferentSection />
      <InstitutionExpertAccessSection />
      <ExpertMarketplaceCTASection />
    </>
  );
}
