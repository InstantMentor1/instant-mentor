import { notFound } from "next/navigation";
import ChatBox from "@/components/ChatBox";
import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";

export default async function MessagesPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  const { supabase, profile } = await requireAuth(["Student", "Mentor", "Admin"]);
  const [{ data: session }, { data: messages }] = await Promise.all([
    supabase.from("session_requests").select("id,title,status").eq("id", sessionId).maybeSingle(),
    supabase.from("session_messages").select("*").eq("session_id", sessionId).order("created_at"),
  ]);
  if (!session) notFound();

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell max-w-4xl">
        <DashboardHeader profile={profile} title="Pre-session chat" description={session.title} />
        <div className="card p-6">
          <div className="space-y-3">
            {(messages ?? []).map((message) => (
              <div key={message.id} className={`max-w-[85%] rounded-2xl p-4 ${message.sender_id === profile.user_id ? "ml-auto bg-teal-700 text-white" : "bg-slate-100"}`}>
                <p className="text-xs font-bold uppercase opacity-70">{message.sender_role}</p>
                <p className="mt-1 whitespace-pre-wrap text-sm">{message.message}</p>
              </div>
            ))}
            {(messages ?? []).length === 0 && <p className="py-8 text-center text-slate-500">No messages yet. Share context before the session.</p>}
          </div>
          <ChatBox sessionId={sessionId} />
        </div>
      </div>
    </section>
  );
}
