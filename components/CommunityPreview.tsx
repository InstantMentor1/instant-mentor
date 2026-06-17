import Link from "next/link";
import { ArrowRight, BookOpenCheck, MessageCircleQuestion, Network, Radio, Users } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const communityActions = [
  { title: "Study Groups", text: "Build consistency with students preparing for similar subjects, roles, and interviews.", icon: BookOpenCheck },
  { title: "Career Communities", text: "Follow the tracks that matter to your next internship, placement, or career move.", icon: Users },
  { title: "Peer Discussions", text: "Compare approaches, share useful resources, and learn how others solve practical problems.", icon: MessageCircleQuestion },
  { title: "Mentor AMAs", text: "Join focused conversations where professionals answer career and technical questions.", icon: Radio },
  { title: "Networking Opportunities", text: "Meet ambitious peers and professionals through relevant sessions and track-based activity.", icon: Network },
];

export default function CommunityPreview({ tracks }: { tracks: readonly string[] }) {
  return (
    <section className="section-pad bg-slate-50" aria-labelledby="community-preview-title">
      <div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow="Community learning"
            title="You’re Not Learning Alone"
            description="My Expert Talk brings focused peer learning and professional guidance into the same trusted environment."
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
        <div className="grid gap-4 sm:grid-cols-2">
          {communityActions.map(({ title, text, icon: Icon }) => (
            <article key={title} className={`card flex items-start gap-4 p-6 ${title === "Networking Opportunities" ? "sm:col-span-2" : ""}`}>
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
