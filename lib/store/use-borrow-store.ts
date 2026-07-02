import { create } from "zustand";

export type BorrowStatus =
  | "pending_owner_review"
  | "accepted"
  | "rejected"
  | "paid"
  | "handed_over_by_owner"
  | "borrow_active"
  | "return_initiated"
  | "completed"
  | "disputed";

export interface BorrowOrder {
  id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  borrowerId: string;
  ownerId: string;
  status: BorrowStatus;
  handoverMethod: "meetup" | "courier";
  depositLocked: number;
  borrowFee: number;
  startDate?: string;
  endDate?: string;
  trackingId?: string; // Only for courier return
  disputeReason?: string;
}

interface BorrowState {
  orders: BorrowOrder[];
  wallet: {
    totalDeposit: number;
    locked: number;
    availableLimit: number;
  };
  addOrder: (order: Omit<BorrowOrder, "status" | "id">) => string;
  updateOrderStatus: (id: string, status: BorrowStatus) => void;
  submitTrackingId: (id: string, trackingId: string) => void;
  openDispute: (id: string, reason: string) => void;
}

export const useBorrowStore = create<BorrowState>((set, get) => ({
  wallet: {
    totalDeposit: 1000,
    locked: 300,
    availableLimit: 500000,
  },
  orders: [
    {
      id: "BR-000245",
      bookId: "b1",
      bookTitle: "Pather Panchali",
      bookImage: "/images/books/placeholder.jpg",
      borrowerId: "user-1",
      ownerId: "rahim123",
      status: "pending_owner_review",
      handoverMethod: "meetup",
      depositLocked: 300,
      borrowFee: 50,
    },
  ],
  addOrder: (order) => {
    const id = `BR-${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")}`;

    const newOrder: BorrowOrder = {
      ...order,
      id,
      status: "pending_owner_review",
    };

    set((state) => ({
      orders: [...state.orders, newOrder],
      wallet: {
        ...state.wallet,
        locked: state.wallet.locked + order.depositLocked,
        availableLimit: state.wallet.availableLimit - order.depositLocked,
      },
    }));

    return id;
  },
  updateOrderStatus: (id, status) => {
    set((state) => {
      const orders = state.orders.map((order) => {
        if (order.id === id) {
          return { ...order, status };
        }
        return order;
      });

      // Handle deposit release on complete
      let wallet = state.wallet;
      if (status === "completed") {
        const order = state.orders.find((o) => o.id === id);
        if (order) {
          wallet = {
            ...wallet,
            locked: wallet.locked - order.depositLocked,
            availableLimit: wallet.availableLimit + order.depositLocked,
          };
        }
      }

      return { orders, wallet };
    });
  },
  submitTrackingId: (id, trackingId) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id
          ? { ...order, status: "return_initiated", trackingId }
          : order,
      ),
    }));
  },
  openDispute: (id, reason) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id
          ? { ...order, status: "disputed", disputeReason: reason }
          : order,
      ),
    }));
  },
}));
