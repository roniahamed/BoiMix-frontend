import { create } from "zustand";

interface OptimisticProfileState {
  avatarUrl: string | null;
  coverUrl: string | null;
  setOptimisticAvatar: (url: string | null) => void;
  setOptimisticCover: (url: string | null) => void;
  clearOptimistic: () => void;
}

export const useOptimisticProfileStore = create<OptimisticProfileState>(
  (set) => ({
    avatarUrl: null,
    coverUrl: null,
    setOptimisticAvatar: (url) => set({ avatarUrl: url }),
    setOptimisticCover: (url) => set({ coverUrl: url }),
    clearOptimistic: () => set({ avatarUrl: null, coverUrl: null }),
  }),
);
