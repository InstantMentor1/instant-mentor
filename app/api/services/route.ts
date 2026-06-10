import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/api-auth";
import { deliveryModes, marketplaceCategories } from "@/lib/marketplace";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const auth = await requireApiAuth(["Mentor", "Faculty", "Institution"]);
  if (auth.error) return auth.error;
  const body = await request.json().catch(() => ({}));
  const title = String(body.title ?? "").trim();
  const category = String(body.category ?? "").trim();
  const description = String(body.description ?? "").trim();
  const targetAudience = String(body.target_audience ?? "").trim();
  const deliverables = String(body.deliverables ?? "").trim();
  const requirements = String(body.requirements ?? "").trim();
  const price = Number(body.price);
  const durationMinutes = Number(body.duration_minutes);
  const deliveryMode = String(body.delivery_mode ?? "");
  const availabilityNotes = String(body.availability_notes ?? "").trim();
  const maxBookings = Number(body.max_bookings_per_week);

  if (!title) return NextResponse.json({ error: "Service title is required." }, { status: 400 });
  if (!marketplaceCategories.includes(category as (typeof marketplaceCategories)[number])) {
    return NextResponse.json({ error: "Select a valid service category." }, { status: 400 });
  }
  if (!description) return NextResponse.json({ error: "Service description is required." }, { status: 400 });
  if (!targetAudience) return NextResponse.json({ error: "Target audience is required." }, { status: 400 });
  if (!deliverables) return NextResponse.json({ error: "Service deliverables are required." }, { status: 400 });
  if (!requirements) return NextResponse.json({ error: "Pre-session requirements are required." }, { status: 400 });
  if (!Number.isFinite(price) || price <= 0) return NextResponse.json({ error: "Enter a valid service price." }, { status: 400 });
  if (!Number.isInteger(durationMinutes) || durationMinutes < 15 || durationMinutes > 480) {
    return NextResponse.json({ error: "Duration must be between 15 and 480 minutes." }, { status: 400 });
  }
  if (!deliveryModes.some((mode) => mode.value === deliveryMode)) {
    return NextResponse.json({ error: "Select a valid delivery mode." }, { status: 400 });
  }
  if (!Number.isInteger(maxBookings) || maxBookings < 1 || maxBookings > 100) {
    return NextResponse.json({ error: "Weekly booking limit must be between 1 and 100." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from("expert_services").insert({
    expert_id: auth.user.id,
    title,
    category,
    description,
    target_audience: targetAudience,
    deliverables,
    requirements,
    price,
    duration_minutes: durationMinutes,
    delivery_mode: deliveryMode,
    availability_notes: availabilityNotes || null,
    max_bookings_per_week: maxBookings,
    status: body.status === "inactive" ? "inactive" : "active",
  }).select("*").single();

  if (error) {
    console.error("Unable to create expert service", error);
    return NextResponse.json({ error: "Unable to create the service right now." }, { status: 500 });
  }
  return NextResponse.json({ success: true, service: data });
}

export async function PATCH(request: Request) {
  const auth = await requireApiAuth(["Mentor", "Faculty", "Institution"]);
  if (auth.error) return auth.error;
  const body = await request.json().catch(() => ({}));
  const id = String(body.id ?? "");
  if (!id) return NextResponse.json({ error: "A valid service is required." }, { status: 400 });

  if (body.title !== undefined) {
    const title = String(body.title ?? "").trim();
    const category = String(body.category ?? "").trim();
    const description = String(body.description ?? "").trim();
    const targetAudience = String(body.target_audience ?? "").trim();
    const deliverables = String(body.deliverables ?? "").trim();
    const requirements = String(body.requirements ?? "").trim();
    const price = Number(body.price);
    const durationMinutes = Number(body.duration_minutes);
    const deliveryMode = String(body.delivery_mode ?? "");
    const availabilityNotes = String(body.availability_notes ?? "").trim();
    const maxBookings = Number(body.max_bookings_per_week);

    if (!title) return NextResponse.json({ error: "Service title is required." }, { status: 400 });
    if (!marketplaceCategories.includes(category as (typeof marketplaceCategories)[number])) {
      return NextResponse.json({ error: "Select a valid service category." }, { status: 400 });
    }
    if (!description || !targetAudience || !deliverables || !requirements) {
      return NextResponse.json({ error: "Complete all required service details." }, { status: 400 });
    }
    if (!Number.isFinite(price) || price <= 0) {
      return NextResponse.json({ error: "Enter a valid service price." }, { status: 400 });
    }
    if (!Number.isInteger(durationMinutes) || durationMinutes < 15 || durationMinutes > 480) {
      return NextResponse.json({ error: "Duration must be between 15 and 480 minutes." }, { status: 400 });
    }
    if (!deliveryModes.some((mode) => mode.value === deliveryMode)) {
      return NextResponse.json({ error: "Select a valid delivery mode." }, { status: 400 });
    }
    if (!Number.isInteger(maxBookings) || maxBookings < 1 || maxBookings > 100) {
      return NextResponse.json({ error: "Weekly booking limit must be between 1 and 100." }, { status: 400 });
    }

    const admin = createSupabaseAdminClient();
    const { error } = await admin.from("expert_services").update({
      title,
      category,
      description,
      target_audience: targetAudience,
      deliverables,
      requirements,
      price,
      duration_minutes: durationMinutes,
      delivery_mode: deliveryMode,
      availability_notes: availabilityNotes || null,
      max_bookings_per_week: maxBookings,
      status: body.status === "inactive" ? "inactive" : "active",
    }).eq("id", id).eq("expert_id", auth.user.id);

    if (error) {
      console.error("Unable to edit expert service", error);
      return NextResponse.json({ error: "Unable to update the service." }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  }

  const status = body.status === "active" ? "active" : body.status === "inactive" ? "inactive" : null;
  if (!status) return NextResponse.json({ error: "A valid service status is required." }, { status: 400 });

  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("expert_services").update({ status }).eq("id", id).eq("expert_id", auth.user.id);
  if (error) {
    console.error("Unable to update expert service", error);
    return NextResponse.json({ error: "Unable to update the service." }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const auth = await requireApiAuth(["Mentor", "Faculty", "Institution"]);
  if (auth.error) return auth.error;
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Service ID is required." }, { status: 400 });
  const admin = createSupabaseAdminClient();
  const { count } = await admin.from("service_bookings").select("*", { count: "exact", head: true }).eq("service_id", id);
  if ((count ?? 0) > 0) {
    return NextResponse.json({ error: "Disable this service instead because it already has bookings." }, { status: 409 });
  }
  const { error } = await admin.from("expert_services").delete().eq("id", id).eq("expert_id", auth.user.id);
  if (error) {
    console.error("Unable to delete expert service", error);
    return NextResponse.json({ error: "Unable to delete the service." }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
