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
  clearCart: () => void;
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
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "boimix-borrow-cart-storage",
    },
  ),
);
