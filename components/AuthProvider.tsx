"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { AppRole } from "@/lib/auth-shared";

export type ClientAuthProfile = {
  user_id: string;
  full_name: string;
  email: string;
  role: AppRole;
};

type AuthState = {
  loading: boolean;
  profile: ClientAuthProfile | null;
  setProfile: (profile: ClientAuthProfile | null) => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({
  initialProfile,
  children,
}: {
  initialProfile: ClientAuthProfile | null;
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState(initialProfile);
  const value = useMemo(() => ({ loading: false, profile, setProfile }), [profile]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}
