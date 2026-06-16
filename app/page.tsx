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
  title: "Real Expertise for Serious Students",
  description:
    "Mentrix connects serious students with verified subject-matter experts who create their own expertise menus and set their own pricing.",
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
