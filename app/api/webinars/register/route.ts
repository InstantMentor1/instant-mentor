import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/api-auth";
import { sendWebinarRegistrationEmails } from "@/lib/webinar-email";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { webinarPriceForPlan } from "@/lib/webinars";

export async function POST(request: Request) {
  const auth = await requireApiAuth(["Student"]);
  if (auth.error) return auth.error;
  const webinarId = String((await request.json()).webinarId ?? "");
  const admin = createSupabaseAdminClient();
  const [{ data: webinar }, { data: subscription }] = await Promise.all([
    admin.from("webinars").select("*").eq("id", webinarId).eq("status", "upcoming").maybeSingle(),
    admin.from("user_subscriptions").select("plans(name)").eq("user_id", auth.user.id).eq("status", "active").order("created_at", { ascending: false }).limit(1).maybeSingle(),
  ]);
  if (!webinar) return NextResponse.json({ error: "Webinar not found." }, { status: 404 });
  const relation = subscription?.plans;
  const plan = Array.isArray(relation) ? relation[0] : relation;
  const pricing = webinarPriceForPlan(plan?.name, webinar);
  if (!pricing.allowed || pricing.finalPrice === null) {
    return NextResponse.json({ error: pricing.message }, { status: 403 });
  }
  const { count } = await admin.from("webinar_registrations").select("*", { count: "exact", head: true }).eq("webinar_id", webinarId).neq("payment_status", "cancelled");
  if ((count ?? 0) >= webinar.max_participants) {
    return NextResponse.json({ error: "This webinar has reached its participant limit." }, { status: 409 });
  }
  const finalPrice = pricing.finalPrice;
  const { error } = await admin.from("webinar_registrations").insert({
    webinar_id: webinarId,
    student_id: auth.user.id,
    original_price: webinar.price,
    final_price: finalPrice,
    discount_applied: Number(webinar.price) - finalPrice,
    plan_name: plan!.name,
    payment_status: "pending",
  });
  if (error?.code === "23505") return NextResponse.json({ error: "You are already registered for this webinar." }, { status: 409 });
  if (error) {
    console.error("Webinar registration failed:", error);
    return NextResponse.json({ error: "Unable to register for the webinar." }, { status: 500 });
  }

  let warning: string | undefined;
  try {
    const { data: mentor } = await admin.from("profiles").select("full_name,email").eq("user_id", webinar.mentor_id).single();
    if (mentor) {
      await sendWebinarRegistrationEmails({
        student: auth.profile,
        mentor,
        webinar,
        finalPrice,
        paymentStatus: "pending",
      });
    }
  } catch (emailError) {
    warning = "Registration saved, but email notification could not be sent.";
    console.error("Webinar registration email failed:", emailError);
  }
  return NextResponse.json({ success: true, finalPrice, message: pricing.message, warning });
}
