export interface ActivePassWalletItem {
  id: string;
  name: string;
  type: "standard" | "vip";
  durationDays: number;
  borrowLimit: string;
  expires: string;
  status: "Ready";
}

export const MOCK_ACTIVE_PASSES: ActivePassWalletItem[] = [
  {
    id: "#PASS-8841",
    name: "Standard Borrow Pass",
    type: "standard",
    durationDays: 14,
    borrowLimit: "৳ 1,000",
    expires: "15 Aug 2026",
    status: "Ready",
  },
  {
    id: "#PASS-9902",
    name: "VIP Express Borrow Pass",
    type: "vip",
    durationDays: 21,
    borrowLimit: "৳ 2,000",
    expires: "30 Aug 2026",
    status: "Ready",
  },
];

export const MOCK_SATISFYING_HISTORY = [
  {
    id: "#PASS-7712",
    bookTitle: "Atomic Habits",
    borrowedDate: "10 Jul 2026",
    returnedDate: "24 Jul 2026",
    status: "On Time",
    xpEarned: "+50 XP",
  },
  {
    id: "#PASS-6620",
    bookTitle: "The Psychology of Money",
    borrowedDate: "25 Jun 2026",
    returnedDate: "09 Jul 2026",
    status: "On Time",
    xpEarned: "+50 XP",
  },
  {
    id: "#PASS-5541",
    bookTitle: "Deep Work",
    borrowedDate: "12 May 2026",
    returnedDate: "26 May 2026",
    status: "On Time",
    xpEarned: "+50 XP",
  },
];
