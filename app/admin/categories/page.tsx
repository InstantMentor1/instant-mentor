import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";
import { marketplaceCategories } from "@/lib/marketplace";

export default async function AdminCategoriesPage() {
  const { profile } = await requireAuth(["Admin"]);
  return <section className="bg-slate-50 py-10"><div className="container-shell"><DashboardHeader profile={profile} title="Service categories" description="Categories are centrally managed in code to keep filters and expert service forms consistent." /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{marketplaceCategories.map((category) => <article key={category} className="card p-5 font-black">{category}</article>)}</div></div></section>;
}
