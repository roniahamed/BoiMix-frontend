import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "./use-cart-store";

export type Order = {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  deliveryFee: number;
  subtotal: number;
  status: "processing" | "shipped" | "delivered";
  paymentMethod: "cod" | "bkash" | "nagad";
};

type OrderStore = {
  orders: Order[];
  addOrder: (order: Order) => void;
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) =>
        set((state) => ({ orders: [order, ...state.orders] })),
    }),
    {
      name: "boimix-orders",
    },
  ),
);
