import type { Metadata } from "next";
import { MinimalLandingPage } from "@/components/marketplace/HomeSections";
import { getAuthContext } from "@/lib/auth";
import { dashboardForRole } from "@/lib/auth-shared";

export const metadata: Metadata = {
  title: "Expert Learning Menu Marketplace | My Expert Talk",
  description:
    "My Expert Talk helps students browse verified expert menus, choose services and add-ons, apply promo codes, book Google Meet slots, pay, and learn live.",
};

export default async function Home() {
  const { profile } = await getAuthContext();

  return (
    <MinimalLandingPage
      dashboardHref={profile ? dashboardForRole(profile.role) : null}
      role={profile?.role ?? null}
    />
  );
}
