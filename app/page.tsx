import type { Metadata } from "next";
import { MinimalLandingPage } from "@/components/marketplace/HomeSections";
import { getAuthContext } from "@/lib/auth";
import { dashboardForRole } from "@/lib/auth-shared";

export const metadata: Metadata = {
  title: "Learn Directly From Experts, Mentors, and Educators",
  description:
    "My Expert Talk helps students and learners join expert talks, explore mentor-led services, access recordings, and book guidance sessions.",
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
