"use client";

import { useEffect, type ReactNode } from "react";

import { setApiAccessToken } from "@/lib/api/client";
import { useAuthStore } from "@/stores/auth-store";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  useEffect(() => {
    setApiAccessToken(useAuthStore.getState().accessToken);

    return useAuthStore.subscribe((state) => {
      setApiAccessToken(state.accessToken);
    });
  }, []);

  return children;
}
