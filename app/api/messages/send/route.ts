import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/api-auth";

export async function POST(request: Request) {
  const auth = await requireApiAuth(["Student", "Mentor", "Faculty", "Admin"]);
  if (auth.error) return auth.error;
  const body = await request.json().catch(() => ({}));
  const sessionId = String(body.sessionId ?? "");
  const message = String(body.message ?? "").trim();
  if (!sessionId) return NextResponse.json({ error: "Session ID is required." }, { status: 400 });
  if (!message) return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
  const { error } = await auth.supabase.from("session_messages").insert({
    session_id: sessionId,
    sender_id: auth.user.id,
    sender_role: auth.profile.role,
    message: message.slice(0, 2000),
  });
  if (error) {
    console.error("Message send failed:", error);
    return NextResponse.json({ error: "You cannot message in this session." }, { status: 403 });
  }
  return NextResponse.json({ success: true });
}
