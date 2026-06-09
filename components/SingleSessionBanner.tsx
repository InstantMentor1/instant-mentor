import Link from "next/link";
import { ArrowRight, MessageCircleQuestion } from "lucide-react";

export default function SingleSessionBanner() {
  return (
    <div className="mb-10 flex flex-col items-start justify-between gap-5 rounded-3xl border border-teal-200 bg-teal-50 p-6 sm:flex-row sm:items-center sm:p-8">
      <div className="flex items-start gap-4">
        <span className="shrink-0 rounded-2xl bg-teal-700 p-3 text-white" aria-hidden="true">
          <MessageCircleQuestion size={24} />
        </span>
        <div>
          <h3 className="text-xl font-black text-ink">Start with one focused mentor session for ₹69</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">Get help with one doubt or decision before choosing a monthly plan.</p>
        </div>
      </div>
      <Link href="/signup" className="btn-primary shrink-0">Book Single Session <ArrowRight size={17} /></Link>
    </div>
  );
}
