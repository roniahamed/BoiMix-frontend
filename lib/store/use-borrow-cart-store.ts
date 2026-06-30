import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BorrowCartItem = {
  id: string; // book ID
  title: string;
  author: string;
  coverUrl: string;
  ownerId: string;
  ownerName: string;
  borrowFee: number;
  depositRequired: number;
  maxBorrowDays: number;
};

type BorrowCartState = {
  items: BorrowCartItem[];
  addItem: (item: BorrowCartItem) => void;
  removeItem: (id: string) => void;
  removeItems: (ids: string[]) => void;
  clearCart: () => void;
  directCheckoutItem: BorrowCartItem | null;
  setDirectCheckoutItem: (item: BorrowCartItem | null) => void;
};

export const useBorrowCartStore = create<BorrowCartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          if (state.items.find((i) => i.id === item.id)) {
            return state; // Already in cart
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      removeItems: (ids) =>
        set((state) => {
          const idSet = new Set(ids);
          return { items: state.items.filter((i) => !idSet.has(i.id)) };
        }),
      clearCart: () => set({ items: [] }),
      directCheckoutItem: null,
      setDirectCheckoutItem: (item) => set({ directCheckoutItem: item }),
    }),
    {
      name: "boimix-borrow-cart-storage",
    },
  ),
);
