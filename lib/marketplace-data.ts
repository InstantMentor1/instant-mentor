import "server-only";
import type { ExpertService } from "@/lib/marketplace";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function getPublicServices(category?: string): Promise<ExpertService[]> {
  try {
    const admin = createSupabaseAdminClient();
    let query = admin
      .from("expert_services")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(24);
    if (category) query = query.eq("category", category);
    const { data: services, error } = await withTimeout(
      query,
      { data: [], error: null, count: null, status: 200, statusText: "OK", success: true },
      4500,
    );
    if (error) {
      console.error("Unable to load expert services", error);
      return [];
    }
    if (!services?.length) return [];

    const expertIds = Array.from(new Set(services.map((service) => service.expert_id)));
    const serviceIds = services.map((service) => service.id);
    const [{ data: profiles }, { data: reviews }] = await Promise.all([
      withTimeout(
        admin.from("profiles").select("user_id,full_name,college_or_company,linkedin_or_portfolio").in("user_id", expertIds),
        { data: [], error: null, count: null, status: 200, statusText: "OK", success: true },
        2500,
      ),
      withTimeout(
        admin.from("service_reviews").select("service_id,rating").in("service_id", serviceIds),
        { data: [], error: null, count: null, status: 200, statusText: "OK", success: true },
        2500,
      ),
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
    return [];
  }
}

function withTimeout<T>(promise: PromiseLike<T>, fallback: T, ms: number): Promise<T> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

export async function getPublicService(id: string): Promise<ExpertService | null> {
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
