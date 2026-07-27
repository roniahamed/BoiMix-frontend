import { create } from "zustand";

export type ExchangeStatus =
  | "pending_proposal"
  | "counter_offered"
  | "agreement_reached"
  | "handed_over"
  | "completed"
  | "disputed"
  | "rejected";

export interface ExchangeOrder {
  id: string;
  requestedBookId: string;
  requestedBookTitle: string;
  requestedBookImage: string;
  offeredBookId: string;
  offeredBookTitle: string;
  offeredBookImage: string;
  proposerId: string; // The user initiating the exchange
  ownerId: string; // The user who owns the requested book
  status: ExchangeStatus;
  meetLocation?: string;
  meetDate?: string;
  counterOfferDetails?: {
    proposedDate?: string;
    proposedLocation?: string;
    message?: string;
  };
}

interface ExchangeState {
  exchanges: ExchangeOrder[];
  myBooks: { id: string; title: string; image: string }[];
  createProposal: (exchange: Omit<ExchangeOrder, "id" | "status">) => string;
  updateExchangeStatus: (id: string, status: ExchangeStatus) => void;
  counterOffer: (
    id: string,
    details: NonNullable<ExchangeOrder["counterOfferDetails"]>,
  ) => void;
  acceptCounterOffer: (id: string) => void;
  rejectCounterOffer: (id: string) => void;
  openDispute: (id: string, reason: string) => void;
}

export const useExchangeStore = create<ExchangeState>((set) => ({
  // Mock data representing the current user's library
  myBooks: [
    {
      id: "my-b1",
      title: "The Alchemist",
      image: "/book-covers/borrowed-light.svg",
    },
    {
      id: "my-b2",
      title: "Clean Code",
      image: "/book-covers/borrowed-light.svg",
    },
    {
      id: "my-b3",
      title: "Sapiens",
      image: "/book-covers/borrowed-light.svg",
    },
  ],

  // Mock data for initial exchanges
  exchanges: [
    {
      id: "EX-000123",
      requestedBookId: "b3",
      requestedBookTitle: "1984",
      requestedBookImage: "/book-covers/borrowed-light.svg",
      offeredBookId: "my-b2",
      offeredBookTitle: "Clean Code",
      offeredBookImage: "/book-covers/borrowed-light.svg",
      proposerId: "current-user",
      ownerId: "kamal123",
      status: "pending_proposal",
      meetLocation: "Dhanmondi Lake, Gate 3",
      meetDate: "Oct 28, 2024 at 4:00 PM",
    },
    {
      id: "EX-000456",
      requestedBookId: "my-b1",
      requestedBookTitle: "The Alchemist",
      requestedBookImage: "/book-covers/borrowed-light.svg",
      offeredBookId: "b7",
      offeredBookTitle: "To Kill a Mockingbird",
      offeredBookImage: "/book-covers/borrowed-light.svg",
      proposerId: "jamal456",
      ownerId: "current-user", // We are the owner of the requested book here
      status: "pending_proposal",
      meetLocation: "TSC, Dhaka University",
      meetDate: "Oct 29, 2024 at 3:00 PM",
    },
    {
      id: "EX-000789",
      requestedBookId: "b9",
      requestedBookTitle: "Deep Work",
      requestedBookImage: "/book-covers/borrowed-light.svg",
      offeredBookId: "my-b3",
      offeredBookTitle: "Sapiens",
      offeredBookImage: "/book-covers/borrowed-light.svg",
      proposerId: "current-user",
      ownerId: "hasan789",
      status: "agreement_reached",
      meetLocation: "TSC, Dhaka University",
      meetDate: "Oct 25, 2024 at 2:00 PM",
      counterOfferDetails: {
        proposedDate: "Oct 25, 2024",
        proposedLocation: "TSC, Dhaka University",
      },
    },
  ],

  createProposal: (exchange) => {
    const id = `EX-${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")}`;
    set((state) => ({
      exchanges: [
        ...state.exchanges,
        { ...exchange, id, status: "pending_proposal" },
      ],
    }));
    return id;
  },

  updateExchangeStatus: (id, status) => {
    set((state) => ({
      exchanges: state.exchanges.map((e) =>
        e.id === id ? { ...e, status } : e,
      ),
    }));
  },

  counterOffer: (id, details) => {
    set((state) => ({
      exchanges: state.exchanges.map((e) =>
        e.id === id
          ? { ...e, status: "counter_offered", counterOfferDetails: details }
          : e,
      ),
    }));
  },

  acceptCounterOffer: (id) => {
    set((state) => ({
      exchanges: state.exchanges.map((e) =>
        e.id === id ? { ...e, status: "agreement_reached" } : e,
      ),
    }));
  },

  rejectCounterOffer: (id) => {
    set((state) => ({
      exchanges: state.exchanges.map((e) =>
        e.id === id ? { ...e, status: "rejected" } : e,
      ),
    }));
  },

  openDispute: (id) => {
    set((state) => ({
      exchanges: state.exchanges.map((e) =>
        e.id === id ? { ...e, status: "disputed" } : e,
      ),
    }));
  },
}));
