import DashboardHeader from "@/components/DashboardHeader";
import ProfileForm from "@/components/ProfileForm";
import { requireAuth } from "@/lib/auth";

export default async function ProfilePage() {
  const { supabase, profile } = await requireAuth();
  const isMentor = ["Mentor", "Faculty", "Institution"].includes(profile.role);
  const { data: mentorProfile } = isMentor
    ? await supabase
        .from("mentor_profiles")
        .select("expertise_areas,expertise")
        .eq("user_id", profile.user_id)
        .maybeSingle()
    : { data: null };
  const profileTracks = profile.technical_tracks ?? [];
  const mentorExpertise = mentorProfile?.expertise ?? [];
  const mentorExpertiseAreas = mentorProfile?.expertise_areas ?? [];
  const selectedTracks = profileTracks.length > 0
    ? profileTracks
    : mentorExpertise.length > 0
      ? mentorExpertise
      : mentorExpertiseAreas.length > 0
        ? mentorExpertiseAreas
        : profile.technical_track
          ? [profile.technical_track]
          : [];

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell max-w-3xl">
        <DashboardHeader profile={profile} title="Profile" description="Update your details and learning or expertise tracks." />
        <ProfileForm profile={profile} selectedTracks={selectedTracks} />
      </div>
    </section>
  );
}
