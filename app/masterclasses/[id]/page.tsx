import { redirect } from "next/navigation";

export default async function LegacyWebinarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/webinars/${id}`);
}
