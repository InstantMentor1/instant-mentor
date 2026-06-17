"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { calculatePlatformFee, deliveryModes, marketplaceCategories } from "@/lib/marketplace";

const initialState = {
  title: "",
  category: "",
  description: "",
  target_audience: "",
  deliverables: "",
  requirements: "",
  price: "",
  duration_minutes: "60",
  delivery_mode: "video_call",
  availability_notes: "",
  max_bookings_per_week: "5",
  status: "active",
};

type EditableService = {
  id: string;
  title: string;
  category: string;
  description: string;
  target_audience: string;
  deliverables: string;
  requirements: string;
  price: number;
  duration_minutes: number;
  delivery_mode: string;
  availability_notes: string | null;
  max_bookings_per_week: number;
  status: string;
};

export default function ExpertServiceForm({ initialService }: { initialService?: EditableService }) {
  const router = useRouter();
  const [formData, setFormData] = useState(() =>
    initialService
      ? {
          title: initialService.title,
          category: initialService.category,
          description: initialService.description,
          target_audience: initialService.target_audience,
          deliverables: initialService.deliverables,
          requirements: initialService.requirements,
          price: String(initialService.price),
          duration_minutes: String(initialService.duration_minutes),
          delivery_mode: initialService.delivery_mode,
          availability_notes: initialService.availability_notes ?? "",
          max_bookings_per_week: String(initialService.max_bookings_per_week),
          status: initialService.status,
        }
      : initialState,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const pricePreview = calculatePlatformFee(Number(formData.price || 0));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/services", {
        method: initialService ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(initialService ? { id: initialService.id, ...formData } : formData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to save service.");
      if (!initialService) setFormData(initialState);
      router.push("/mentor/services");
      router.refresh();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to save service.");
    } finally {
      setLoading(false);
    }
  }

  function update(field: keyof typeof initialState, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-6 border-blue-100 p-6 sm:p-8">
      {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Service title"><input required className="form-input" value={formData.title} onChange={(event) => update("title", event.target.value)} placeholder="Example: Resume Review for Freshers" /></Field>
        <Field label="Category"><select required className="form-input" value={formData.category} onChange={(event) => update("category", event.target.value)}><option value="">Select category</option>{marketplaceCategories.map((category) => <option key={category}>{category}</option>)}</select></Field>
      </div>
      <Field label="Description"><textarea required rows={4} className="form-input" value={formData.description} onChange={(event) => update("description", event.target.value)} placeholder="Explain the learning need this service solves and how the session works." /></Field>
      <div className="grid gap-5 lg:grid-cols-2">
        <Field label="Who is this for?"><textarea required rows={4} className="form-input" value={formData.target_audience} onChange={(event) => update("target_audience", event.target.value)} placeholder="Students, exam aspirants, freshers, or professionals..." /></Field>
        <Field label="What students will get"><textarea required rows={4} className="form-input" value={formData.deliverables} onChange={(event) => update("deliverables", event.target.value)} placeholder="Live guidance, feedback, reviewed notes, action plan, or resources..." /></Field>
      </div>
      <Field label="Requirements before session"><textarea required rows={3} className="form-input" value={formData.requirements} onChange={(event) => update("requirements", event.target.value)} placeholder="Ask students to share resume, assignment, project link, topic, or context." /></Field>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Price set by mentor (₹)"><input required min="500" step="1" type="number" className="form-input" value={formData.price} onChange={(event) => update("price", event.target.value)} /></Field>
        <Field label="Duration (minutes)"><input required min="15" max="480" step="15" type="number" className="form-input" value={formData.duration_minutes} onChange={(event) => update("duration_minutes", event.target.value)} /></Field>
        <Field label="Delivery mode"><select required className="form-input" value={formData.delivery_mode} onChange={(event) => update("delivery_mode", event.target.value)}>{deliveryModes.map((mode) => <option key={mode.value} value={mode.value}>{mode.label}</option>)}</select></Field>
        <Field label="Max bookings/week"><input required min="1" max="100" type="number" className="form-input" value={formData.max_bookings_per_week} onChange={(event) => update("max_bookings_per_week", event.target.value)} /></Field>
      </div>
      <Field label="Availability"><input className="form-input" value={formData.availability_notes} onChange={(event) => update("availability_notes", event.target.value)} placeholder="Weekday evenings and Saturday mornings" /></Field>
      <div className="rounded-2xl bg-sky-50 p-4 text-sm font-semibold text-teal-900">
        Minimum service price is ₹500. Estimated mentor payout at this price is ₹{pricePreview.smePayout.toLocaleString("en-IN")}.
      </div>
      <Field label="Status"><select className="form-input max-w-xs" value={formData.status} onChange={(event) => update("status", event.target.value)}><option value="active">Active</option><option value="inactive">Inactive</option></select></Field>
      <button type="submit" disabled={loading} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Saving service..." : initialService ? "Save Changes" : "Create Service"}</button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold text-ink">{label}</span>{children}</label>;
}
