import { create } from "zustand";

export type SwapStatus =
  | "pending_proposal"
  | "counter_offered"
  | "agreement_reached"
  | "handed_over"
  | "completed"
  | "disputed"
  | "rejected";

export interface SwapOrder {
  id: string;
  requestedBookId: string;
  requestedBookTitle: string;
  requestedBookImage: string;
  offeredBookId: string;
  offeredBookTitle: string;
  offeredBookImage: string;
  proposerId: string; // The user initiating the swap
  ownerId: string; // The user who owns the requested book
  status: SwapStatus;
  counterOfferDetails?: {
    proposedDate?: string;
    proposedLocation?: string;
    message?: string;
  };
}

interface SwapState {
  swaps: SwapOrder[];
  myBooks: { id: string; title: string; image: string }[];
  createProposal: (swap: Omit<SwapOrder, "id" | "status">) => string;
  updateSwapStatus: (id: string, status: SwapStatus) => void;
  counterOffer: (
    id: string,
    details: NonNullable<SwapOrder["counterOfferDetails"]>,
  ) => void;
  acceptCounterOffer: (id: string) => void;
  rejectCounterOffer: (id: string) => void;
  openDispute: (id: string, reason: string) => void;
}

export const useSwapStore = create<SwapState>((set) => ({
  // Mock data representing the current user's library
  myBooks: [
    {
      id: "my-b1",
      title: "The Alchemist",
      image: "/images/books/placeholder.jpg",
    },
    {
      id: "my-b2",
      title: "Clean Code",
      image: "/images/books/placeholder.jpg",
    },
    {
      id: "my-b3",
      title: "Sapiens",
      image: "/images/books/placeholder.jpg",
    },
  ],

  // Mock data for initial swaps
  swaps: [
    {
      id: "SW-000123",
      requestedBookId: "b3",
      requestedBookTitle: "1984",
      requestedBookImage: "/images/books/placeholder.jpg",
      offeredBookId: "my-b2",
      offeredBookTitle: "Clean Code",
      offeredBookImage: "/images/books/placeholder.jpg",
      proposerId: "current-user",
      ownerId: "kamal123",
      status: "pending_proposal",
    },
    {
      id: "SW-000456",
      requestedBookId: "my-b1",
      requestedBookTitle: "The Alchemist",
      requestedBookImage: "/images/books/placeholder.jpg",
      offeredBookId: "b7",
      offeredBookTitle: "To Kill a Mockingbird",
      offeredBookImage: "/images/books/placeholder.jpg",
      proposerId: "jamal456",
      ownerId: "current-user", // We are the owner of the requested book here
      status: "pending_proposal",
    },
  ],

  createProposal: (swap) => {
    const id = `SW-${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")}`;
    set((state) => ({
      swaps: [...state.swaps, { ...swap, id, status: "pending_proposal" }],
    }));
    return id;
  },

  updateSwapStatus: (id, status) => {
    set((state) => ({
      swaps: state.swaps.map((s) => (s.id === id ? { ...s, status } : s)),
    }));
  },

  counterOffer: (id, details) => {
    set((state) => ({
      swaps: state.swaps.map((s) =>
        s.id === id
          ? { ...s, status: "counter_offered", counterOfferDetails: details }
          : s,
      ),
    }));
  },

  acceptCounterOffer: (id) => {
    set((state) => ({
      swaps: state.swaps.map((s) =>
        s.id === id ? { ...s, status: "agreement_reached" } : s,
      ),
    }));
  },

  rejectCounterOffer: (id) => {
    set((state) => ({
      swaps: state.swaps.map((s) =>
        s.id === id ? { ...s, status: "rejected" } : s,
      ),
    }));
  },

  openDispute: (id) => {
    set((state) => ({
      swaps: state.swaps.map((s) =>
        s.id === id ? { ...s, status: "disputed" } : s,
      ),
    }));
  },
}));
