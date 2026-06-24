import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  items: string[]; // Store only book IDs
  toggleItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (id) =>
        set((state) => ({
          items: state.items.includes(id)
            ? state.items.filter((i) => i !== id)
            : [...state.items, id],
        })),
      isInWishlist: (id) => get().items.includes(id),
    }),
    {
      name: "boimix-wishlist-storage",
    },
  ),
);
