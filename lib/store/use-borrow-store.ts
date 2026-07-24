import { create } from "zustand";

export type BorrowStatus =
  | "pending_owner_review"
  | "counter_offered"
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
  counterOfferDetails?: {
    proposedDate?: string;
    proposedLocation?: string;
    message?: string;
  };
  review?: {
    rating: number;
    comment: string;
  };
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
  counterOffer: (
    id: string,
    details: NonNullable<BorrowOrder["counterOfferDetails"]>,
  ) => void;
  acceptCounterOffer: (id: string) => void;
  rejectCounterOffer: (id: string) => void;
  processPayment: (id: string) => void;
  submitReview: (
    id: string,
    review: NonNullable<BorrowOrder["review"]>,
  ) => void;
}

export const useBorrowStore = create<BorrowState>((set) => ({
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
    {
      id: "BR-000246",
      bookId: "b2",
      bookTitle: "Atomic Habits",
      bookImage:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=200&fit=crop",
      borrowerId: "user-99",
      ownerId: "current-user",
      status: "pending_owner_review",
      handoverMethod: "meetup",
      depositLocked: 500,
      borrowFee: 80,
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
  counterOffer: (id, details) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id
          ? {
              ...order,
              status: "counter_offered",
              counterOfferDetails: details,
            }
          : order,
      ),
    }));
  },
  acceptCounterOffer: (id) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, status: "accepted" } : order,
      ),
    }));
  },
  rejectCounterOffer: (id) => {
    set((state) => {
      const orders = state.orders.map((order) =>
        order.id === id
          ? { ...order, status: "rejected" as BorrowStatus }
          : order,
      );
      const order = state.orders.find((o) => o.id === id);
      let wallet = state.wallet;
      if (order) {
        wallet = {
          ...wallet,
          locked: wallet.locked - order.depositLocked,
          availableLimit: wallet.availableLimit + order.depositLocked,
        };
      }
      return { orders, wallet };
    });
  },
  processPayment: (id) => {
    set((state) => {
      const order = state.orders.find((o) => o.id === id);
      if (!order) return state;
      // Normally deduct borrowFee here from real wallet
      return {
        orders: state.orders.map((o) =>
          o.id === id ? { ...o, status: "paid" } : o,
        ),
      };
    });
  },
  submitReview: (id, review) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, review } : order,
      ),
    }));
  },
}));
