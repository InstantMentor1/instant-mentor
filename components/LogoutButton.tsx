"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <button
      className="btn-secondary !px-4 !py-2"
      onClick={async () => {
        await createSupabaseBrowserClient().auth.signOut();
        router.push("/login");
        router.refresh();
      }}
      type="button"
    >
      <LogOut size={16} /> Sign out
    </button>
  );
}
