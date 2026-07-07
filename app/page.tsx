import type { Metadata } from "next";
import { MinimalLandingPage } from "@/components/marketplace/HomeSections";
import { getAuthContext } from "@/lib/auth";
import { dashboardForRole } from "@/lib/auth-shared";

export const metadata: Metadata = {
  title: "Find Expert Learning Support | My Expert Talk",
  description:
    "My Expert Talk helps students find expert-created services, custom quotes, rooms, bookings, Google Meet sessions, reviews, payments, and learning support.",
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
