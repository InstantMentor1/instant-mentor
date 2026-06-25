"use client";

import { FormEvent, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { domains } from "@/lib/constants";
import {
  validateWaitlistForm,
  type WaitlistField,
  type WaitlistFieldErrors,
  type WaitlistFormData,
  type WaitlistRole,
} from "@/lib/validation";

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-100";

function FieldError({
  field,
  errors,
}: {
  field: WaitlistField;
  errors: WaitlistFieldErrors;
}) {
  if (!errors[field]) return null;

  return <span className="mt-2 block text-xs font-semibold text-red-700">{errors[field]}</span>;
}

export default function WaitlistForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [succesmentorssage, setSuccesmentorssage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<WaitlistFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState<WaitlistRole | "">("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setFieldErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: WaitlistFormData = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      role,
      collegeOrCompany: String(formData.get("collegeOrCompany") ?? ""),
      domainOfInterest: String(formData.get("domainOfInterest") ?? ""),
      linkedinOrPortfolio: String(formData.get("linkedinOrPortfolio") ?? ""),
      message: String(formData.get("message") ?? ""),
    };
    const validation = validateWaitlistForm(payload);

    if (!validation.valid) {
      setFieldErrors(validation.errors);
      setErrorMessage("Please correct the highlighted fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as {
        message?: string;
        error?: string;
        fieldErrors?: WaitlistFieldErrors;
      } | null;

      if (!response.ok) {
        if (result?.fieldErrors) setFieldErrors(result.fieldErrors);
        throw new Error(result?.error || "Unable to join the waitlist. Please try again.");
      }

      formRef.current?.reset();
      setRole("");
      setSuccesmentorssage(
        result?.message || "Thank you for joining the My Expert Talk waitlist. We'll contact you soon.",
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to join the waitlist. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (succesmentorssage) {
    return (
      <div className="card flex min-h-96 flex-col items-center justify-center p-8 text-center" role="status">
        <span className="mb-5 rounded-full bg-teal-50 p-4 text-teal-700">
          <CheckCircle2 size={42} />
        </span>
        <h2 className="text-2xl font-extrabold text-ink">You&apos;re on the list.</h2>
        <p className="mt-3 max-w-md leading-7 text-slate-600">
          {succesmentorssage}
        </p>
        <button type="button" className="mt-6 text-sm font-bold text-teal-700 hover:text-teal-900" onClick={() => setSuccesmentorssage("")}>
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="card grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
      <label className="text-sm font-bold text-slate-700">
        Full Name
        <input required name="fullName" type="text" autoComplete="name" placeholder="Your full name" className={inputClass} aria-invalid={Boolean(fieldErrors.fullName)} />
        <FieldError field="fullName" errors={fieldErrors} />
      </label>
      <label className="text-sm font-bold text-slate-700">
        Email
        <input required name="email" type="email" autoComplete="email" placeholder="you@college.edu.in" className={inputClass} aria-invalid={Boolean(fieldErrors.email)} />
        <FieldError field="email" errors={fieldErrors} />
      </label>
      <label className="text-sm font-bold text-slate-700">
        Phone Number
        <input required name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" className={inputClass} aria-invalid={Boolean(fieldErrors.phone)} />
        <FieldError field="phone" errors={fieldErrors} />
      </label>
      <label className="text-sm font-bold text-slate-700">
        Role
        <select required name="role" value={role} onChange={(event) => setRole(event.target.value as WaitlistRole | "")} className={inputClass} aria-invalid={Boolean(fieldErrors.role)}>
          <option value="" disabled>Select your role</option>
          <option>Student</option>
          <option>Mentor</option>
          <option>Faculty</option>
        </select>
        <FieldError field="role" errors={fieldErrors} />
      </label>
      <label className="text-sm font-bold text-slate-700">
        College or Company Name
        <input required name="collegeOrCompany" type="text" autoComplete="organization" placeholder="Your school, college, or company" className={inputClass} aria-invalid={Boolean(fieldErrors.collegeOrCompany)} />
        <FieldError field="collegeOrCompany" errors={fieldErrors} />
      </label>
      <label className="text-sm font-bold text-slate-700">
        Domain of Interest
        <select
          required
          name="domainOfInterest"
          defaultValue=""
          className={inputClass}
          aria-invalid={Boolean(fieldErrors.domainOfInterest)}
        >
          <option value="" disabled>Select your domain of interest</option>
          {domains.map((domain) => (
            <option key={domain} value={domain}>{domain}</option>
          ))}
        </select>
        <FieldError field="domainOfInterest" errors={fieldErrors} />
      </label>
      <label className="text-sm font-bold text-slate-700 sm:col-span-2">
        LinkedIn or Portfolio URL
        <input required={role === "Mentor" || role === "Faculty"} name="linkedinOrPortfolio" type="url" placeholder="https://linkedin.com/in/your-profile" className={inputClass} aria-invalid={Boolean(fieldErrors.linkedinOrPortfolio)} />
        <span className="mt-2 block text-xs font-normal leading-5 text-slate-500">
          Required for mentors and faculty.
        </span>
        <FieldError field="linkedinOrPortfolio" errors={fieldErrors} />
      </label>
      <label className="text-sm font-bold text-slate-700 sm:col-span-2">
        Message
        <textarea name="message" rows={4} placeholder="What would you like help with?" className={inputClass} />
      </label>
      {errorMessage && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 sm:col-span-2" role="alert">
          <AlertCircle className="mt-0.5 shrink-0" size={18} />
          <p>{errorMessage}</p>
        </div>
      )}
      <button type="submit" disabled={isSubmitting} className="btn-primary disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2">
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={17} /> Submitting...
          </>
        ) : (
          <>
            Get Early Access <Send size={17} />
          </>
        )}
      </button>
    </form>
  );
}
