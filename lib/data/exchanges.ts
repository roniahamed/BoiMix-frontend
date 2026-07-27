import { ExchangeStatus } from "@/lib/store/use-exchange-store";

export const getStatusBadge = (
  status: ExchangeStatus,
  isActionRequiredByMe: boolean,
) => {
  if (status === "pending_proposal" || status === "counter_offered") {
    if (isActionRequiredByMe) {
      return {
        label: "Waiting for You",
        color: "text-amber-600 bg-amber-500/15 border-amber-500/20",
        icon: "🟡",
      };
    }
    return {
      label: "Waiting for Partner",
      color: "text-blue-600 bg-blue-500/15 border-blue-500/20",
      icon: "🔵",
    };
  }
  if (status === "agreement_reached") {
    return {
      label: "Ready for Meetup",
      color: "text-emerald-600 bg-emerald-500/15 border-emerald-500/20",
      icon: "🟢",
    };
  }
  if (status === "handed_over" || status === "completed") {
    return {
      label: "Completed",
      color: "text-green-600 bg-green-500/15 border-green-500/20",
      icon: "✅",
    };
  }
  if (status === "disputed") {
    return {
      label: "Disputed",
      color: "text-red-600 bg-red-500/15 border-red-500/20",
      icon: "🔴",
    };
  }
  if (status === "rejected") {
    return {
      label: "Cancelled",
      color: "text-red-600 bg-red-500/15 border-red-500/20",
      icon: "🔴",
    };
  }
  return {
    label: "Unknown",
    color: "text-muted-foreground bg-muted border-border",
    icon: "⚪",
  };
};

export const MOCK_USERS: Record<
  string,
  {
    name: string;
    avatar: string;
    rating: string;
    reviews: number;
    completedSwaps: number;
    memberSince: string;
  }
> = {
  kamal123: {
    name: "Kamal Hossain",
    avatar:
      "https://ui-avatars.com/api/?name=Kamal+Hossain&background=0D8ABC&color=fff",
    rating: "4.8",
    reviews: 125,
    completedSwaps: 52,
    memberSince: "2024",
  },
  jamal456: {
    name: "Jamal Uddin",
    avatar:
      "https://ui-avatars.com/api/?name=Jamal+Uddin&background=2b8a3e&color=fff",
    rating: "4.5",
    reviews: 89,
    completedSwaps: 34,
    memberSince: "2023",
  },
  hasan789: {
    name: "Hasan Mahmud",
    avatar:
      "https://ui-avatars.com/api/?name=Hasan+Mahmud&background=e67e22&color=fff",
    rating: "4.9",
    reviews: 210,
    completedSwaps: 105,
    memberSince: "2022",
  },
};

export const MOCK_BOOKS: Record<
  string,
  { author: string; condition: string; format: string }
> = {
  book1: {
    author: "Humayun Ahmed",
    condition: "Like New",
    format: "Hardcover",
  },
  book2: { author: "Zafar Iqbal", condition: "Good", format: "Paperback" },
  book3: {
    author: "Samaresh Majumdar",
    condition: "Acceptable",
    format: "Hardcover",
  },
};
