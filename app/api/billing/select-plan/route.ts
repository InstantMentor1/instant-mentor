import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/api-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const auth = await requireApiAuth(["Student"]);
  if (auth.error) return auth.error;
  const planId = String((await request.json()).planId ?? "");
  const admin = createSupabaseAdminClient();
  const { data: plan } = await admin.from("plans").select("*").eq("id", planId).eq("is_active", true).maybeSingle();
  if (!plan) return NextResponse.json({ error: "Select a valid plan." }, { status: 400 });

  const { data: payment, error } = await admin
    .from("payments")
    .insert({
      user_id: auth.user.id,
      plan_id: plan.id,
      amount: plan.price * Math.max(plan.min_purchase_months, 1),
      status: "pending",
      payment_method: "manual",
    })
    .select("id")
    .single();
  if (error) {
    console.error("Plan selection failed:", error);
    return NextResponse.json({ error: "Unable to save plan selection." }, { status: 500 });
  }
  return NextResponse.json({
    success: true,
    paymentId: payment.id,
    message: "Plan selected. Access will activate after admin confirms payment.",
  });
}
