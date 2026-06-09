import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";

export async function POST(
  request: Request,
  context: { params: Promise<{ sessionId: string }> },
) {
  const { sessionId } = await context.params;
  const { supabase, user, profile } = await getAuthContext();
  if (!user || !profile) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const message = String((await request.json()).message ?? "").trim();
  if (!message) return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });

  const { error } = await supabase.from("session_messages").insert({
    session_id: sessionId,
    sender_id: user.id,
    sender_role: profile.role,
    message: message.slice(0, 2000),
  });

  if (error) {
    console.error("Session message insert failed:", error);
    return NextResponse.json({ error: "You cannot message in this session." }, { status: 403 });
  }

  return NextResponse.json({ success: true });
}
