import { Notification } from "@/types/notification";

export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "swap_accepted",
    title: "Swap Accepted!",
    description:
      "Hasan Mahmud accepted your swap offer for 'Rich Dad Poor Dad'. Click to view agreement details.",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    isRead: false,
    isArchived: false,
    actionUrl: "/swap/agreement/swp-123",
    actorName: "Hasan Mahmud",
  },
  {
    id: "notif-2",
    type: "message",
    title: "New Message",
    description:
      "Rakib sent you a message: 'Hey, is the book still available?'",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    isRead: false,
    isArchived: false,
    actionUrl: "/dashboard/messages/rakib_hasan",
    actorName: "Rakib Hasan",
  },
  {
    id: "notif-3",
    type: "borrow_request",
    title: "Borrow Request Received",
    description: "Nusrat Jahan wants to borrow your copy of 'The Alchemist'.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    isRead: true,
    isArchived: false,
    actionUrl: "/borrow/request/req-456",
    actorName: "Nusrat Jahan",
  },
  {
    id: "notif-4",
    type: "review",
    title: "New 5-Star Review!",
    description:
      "Fahim Ahmed left a 5-star review on your profile: 'Great experience borrowing...'",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    isRead: true,
    isArchived: false,
    actionUrl: "/u/my_username/reviews",
    actorName: "Fahim Ahmed",
  },
  {
    id: "notif-5",
    type: "system",
    title: "Welcome to BoiMix!",
    description:
      "Your account has been successfully verified. Explore your library and join the reading community.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 1 week ago
    isRead: true,
    isArchived: true,
    actionUrl: "/explore/central-library",
  },
  {
    id: "notif-6",
    type: "borrow_returned",
    title: "Book Returned Successfully",
    description:
      "Your book 'Sapiens' has been marked as returned by the borrower. Please confirm.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    isRead: true,
    isArchived: true,
    actionUrl: "/borrow/return/ret-789",
  },
];
