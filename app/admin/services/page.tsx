import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";

export default async function AdminServicesPage() {
  const { supabase, profile } = await requireAuth(["Admin"]);
  const { data } = await supabase.from("expert_services").select("*").order("created_at", { ascending: false });
  const services = data ?? [];
  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell">
        <DashboardHeader profile={profile} title="SME Expertise Items" description="Review active and inactive SME-created expertise menus." />
        <div className="grid gap-5 lg:grid-cols-2">
          {services.map((service) => (
            <article key={service.id} className="card p-6">
              <div className="flex justify-between gap-4">
                <div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold capitalize">{service.status}</span><h2 className="mt-4 text-xl font-black">{service.title}</h2><p className="mt-1 text-sm text-slate-500">{service.category}</p></div>
                <p className="text-2xl font-black text-teal-800">₹{Number(service.price).toLocaleString("en-IN")}</p>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{service.description}</p>
              <Link href={`/services/${service.id}`} className="mt-4 inline-block text-sm font-bold text-teal-700">Open public page -&gt;</Link>
            </article>
          ))}
        </div>
        {services.length === 0 && <div className="card p-10 text-center text-slate-600">No SME expertise items have been created yet.</div>}
      </div>
    </section>
  );
}
