"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function BookingCartButton({
  price,
  href,
  label = "Add",
}: {
  price: number;
  href: string;
  label?: string;
}) {
  const [added, setAdded] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setAdded(true)}
        className="inline-flex items-center justify-center gap-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
      >
        <Plus size={15} /> {label}
      </button>
      {added && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-14px_35px_-24px_rgba(15,23,42,0.45)] backdrop-blur">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-2xl bg-slate-900 px-4 py-3 text-white">
            <p className="text-sm font-black">1 service added · ₹{price.toLocaleString("en-IN")}</p>
            <Link href={href} className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-black text-white hover:bg-blue-700">
              View Booking
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
