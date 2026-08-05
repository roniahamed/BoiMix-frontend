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

    const unsubscribe = useAuthStore.subscribe((state) => {
      setApiAccessToken(state.accessToken);
    });

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth-storage") {
        const wasAuthenticated = useAuthStore.getState().isAuthenticated;

        let isNowAuthenticated = false;
        if (e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            isNowAuthenticated = parsed?.state?.isAuthenticated === true;
          } catch (err) {
            // Ignore parse error
          }
        }

        if (wasAuthenticated && !isNowAuthenticated) {
          window.location.reload();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      unsubscribe();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return children;
}
