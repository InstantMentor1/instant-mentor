import { redirect } from "next/navigation";

export default async function SmeProfileCompatPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/services/${slug}`);
}
