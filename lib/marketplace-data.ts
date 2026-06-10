import "server-only";
import { sampleServices, type ExpertService } from "@/lib/marketplace";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function getPublicServices(category?: string): Promise<ExpertService[]> {
  try {
    const admin = createSupabaseAdminClient();
    let query = admin.from("expert_services").select("*").eq("status", "active").order("created_at", { ascending: false });
    if (category) query = query.eq("category", category);
    const { data: services, error } = await query;
    if (error) {
      console.error("Unable to load expert services", error);
      return category ? getSampleServiceCards().filter((service) => service.category === category) : getSampleServiceCards();
    }
    if (!services?.length) {
      return category ? getSampleServiceCards().filter((service) => service.category === category) : getSampleServiceCards();
    }

    const expertIds = Array.from(new Set(services.map((service) => service.expert_id)));
    const serviceIds = services.map((service) => service.id);
    const [{ data: profiles }, { data: reviews }] = await Promise.all([
      admin.from("profiles").select("user_id,full_name,college_or_company,linkedin_or_portfolio").in("user_id", expertIds),
      admin.from("service_reviews").select("service_id,rating").in("service_id", serviceIds),
    ]);
    const profileMap = new Map((profiles ?? []).map((profile) => [profile.user_id, profile]));

    return services.map((service) => {
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
    console.error("Unable to load public service marketplace", error);
    return category ? getSampleServiceCards().filter((service) => service.category === category) : getSampleServiceCards();
  }
}

export async function getPublicService(id: string): Promise<ExpertService | null> {
  const sample = getSampleServiceCards().find((service) => service.id === id);
  if (sample) return sample;

  try {
    const admin = createSupabaseAdminClient();
    const { data: service, error } = await admin.from("expert_services").select("*").eq("id", id).eq("status", "active").maybeSingle();
    if (error || !service) return null;
    const [{ data: profile }, { data: reviews }] = await Promise.all([
      admin.from("profiles").select("full_name,college_or_company,linkedin_or_portfolio").eq("user_id", service.expert_id).maybeSingle(),
      admin.from("service_reviews").select("rating").eq("service_id", service.id),
    ]);
    return {
      ...service,
      price: Number(service.price),
      expert: profile,
      rating: reviews?.length ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length : null,
      review_count: reviews?.length ?? 0,
    } as ExpertService;
  } catch (error) {
    console.error("Unable to load expert service", error);
    return null;
  }
}

export function getSampleServiceCards(): ExpertService[] {
  const now = new Date().toISOString();
  return sampleServices.map((service) => ({
    ...service,
    expert_id: "sample",
    description: service.deliverables,
    target_audience: "Students, job seekers, professionals, founders, and teams seeking focused guidance.",
    requirements: "Share your goal, current situation, and relevant links or documents before the session.",
    availability_notes: "Availability is confirmed after the booking request.",
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
