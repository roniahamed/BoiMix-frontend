import { create } from "zustand";

export type AuthUser = {
  id: string;
  name: string;
  username?: string;
  email?: string;
  avatarUrl?: string;
  roles: string[];
};

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setSession: (user: AuthUser, accessToken?: string | null) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  setSession: (user, accessToken = null) =>
    set({
      user,
      accessToken,
      isAuthenticated: true,
    }),
  clearSession: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    }),
}));
