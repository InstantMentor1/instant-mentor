import Link from "next/link";
import { ArrowRight, BookOpenCheck, MessageCircleQuestion, Users } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const communityActions = [
  { title: "Ask focused questions", text: "Bring a specific doubt, decision, or preparation challenge.", icon: MessageCircleQuestion },
  { title: "Learn across tracks", text: "Discover useful perspectives beyond your immediate coursework.", icon: BookOpenCheck },
  { title: "Grow with peers", text: "Build consistency alongside students working toward similar goals.", icon: Users },
];

export default function CommunityPreview({ tracks }: { tracks: readonly string[] }) {
  return (
    <section className="section-pad bg-slate-50" aria-labelledby="community-preview-title">
      <div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow="Community learning"
            title="A focused network for technical growth"
            description="Follow relevant tracks, prepare better questions, and learn from the challenges other students are solving."
          />
          <div className="flex flex-wrap gap-2">
            {tracks.slice(0, 8).map((track) => (
              <span key={track} className="rounded-full border border-teal-100 bg-white px-3 py-2 text-xs font-bold text-teal-800">
                {track}
              </span>
            ))}
          </div>
          <Link href="/signup" className="btn-primary mt-7">
            Create Student Account <ArrowRight size={17} />
          </Link>
        </div>
        <div className="grid gap-4">
          {communityActions.map(({ title, text, icon: Icon }) => (
            <article key={title} className="card flex items-start gap-4 p-6">
              <span className="shrink-0 rounded-2xl bg-teal-50 p-3 text-teal-700" aria-hidden="true">
                <Icon size={23} />
              </span>
              <div>
                <h3 className="font-extrabold text-ink">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
