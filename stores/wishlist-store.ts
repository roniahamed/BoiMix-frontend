import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WishlistItem = {
  id: string;
  title: string;
  coverUrl?: string;
};

type WishlistState = {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: WishlistItem) => void;
  hasItem: (id: string) => boolean;
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          if (state.items.some(({ id }) => id === item.id)) {
            return state;
          }

          return {
            items: [...state.items, item],
          };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      toggleItem: (item) => {
        if (get().hasItem(item.id)) {
          get().removeItem(item.id);
          return;
        }

        get().addItem(item);
      },
      hasItem: (id) => get().items.some((item) => item.id === id),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "boimix-wishlist",
    },
  ),
);
