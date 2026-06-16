import { redirect } from "next/navigation";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (search) params.set("search", search);
  redirect(`/smes${params.size ? `?${params.toString()}` : ""}`);
}
