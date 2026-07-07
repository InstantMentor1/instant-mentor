"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { AlertCircle, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

type AuthFormProps = {
  mode: "login" | "signup";
};

const fieldClass =
  "mt-2 w-full rounded-2xl border border-navy/15 bg-white px-4 py-3 text-sm outline-none focus:border-academic focus:ring-4 focus:ring-skysoft";

export default function AuthForm({ mode }: AuthFormProps) {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState<"Student" | "Mentor">("Student");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim().toLowerCase();
    const password = String(form.get("password") ?? "");

    try {
      if (mode === "signup") {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...Object.fromEntries(form.entries()),
            email,
            password,
            role,
            expertiseAreas: form.getAll("expertiseAreas"),
          }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        const loginResponse = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const loginResult = await loginResponse.json();
        if (!loginResponse.ok) {
          setMessage(result.warning ? `${result.message} ${result.warning}` : result.message);
          throw new Error(loginResult.error);
        }
        window.location.assign(loginResult.redirectTo);
        return;
      }

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      const next = searchParams.get("next");
      window.location.assign(next?.startsWith("/") ? next : result.redirectTo);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to complete authentication.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card mx-auto grid max-w-2xl gap-5 p-6 sm:grid-cols-2 sm:p-8">
      {mode === "signup" && (
        <>
          <label className="text-sm font-bold text-slate-700">
            Full Name
            <input className={fieldClass} required name="fullName" autoComplete="name" />
          </label>
          <label className="text-sm font-bold text-slate-700">
            Account type
            <select className={fieldClass} name="role" value={role} onChange={(e) => setRole(e.target.value as "Student" | "Mentor")}>
              <option value="Student">Student</option>
              <option value="Mentor">Expert / Mentor</option>
            </select>
          </label>
        </>
      )}
      <label className="text-sm font-bold text-slate-700">
        Email
        <input className={fieldClass} required name="email" type="email" autoComplete="email" />
      </label>
      <label className="text-sm font-bold text-slate-700">
        Password
        <input className={fieldClass} required minLength={8} name="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} />
      </label>
      {mode === "signup" && (
        <label className="text-sm font-bold text-slate-700">
          Confirm Password
          <input className={fieldClass} required minLength={8} name="confirmPassword" type="password" autoComplete="new-password" />
        </label>
      )}

      {error && (
        <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 sm:col-span-2" role="alert">
          <AlertCircle size={18} className="shrink-0" /> {error}
        </div>
      )}
      {message && <div className="rounded-xl border border-academic/20 bg-skysoft p-4 text-sm text-navy sm:col-span-2">{message}</div>}

      <button className="btn-primary sm:col-span-2" disabled={loading}>
        {loading && <Loader2 size={17} className="animate-spin" />}
        {mode === "login" ? "Sign In" : "Create Account"}
      </button>
      <p className="text-center text-sm text-slate-600 sm:col-span-2">
        {mode === "login" ? "Need an account?" : "Already registered?"}{" "}
        <Link className="font-bold text-coral" href={mode === "login" ? "/signup" : "/login"}>
          {mode === "login" ? "Sign up" : "Sign in"}
        </Link>
      </p>
    </form>
  );
}
