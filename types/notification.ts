export type NotificationType =
  | "system"
  | "message"
  | "borrow_request"
  | "borrow_approved"
  | "borrow_returned"
  | "swap_offer"
  | "swap_accepted"
  | "review";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  createdAt: string;
  isRead: boolean;
  actionUrl?: string;
  actorId?: string;
  actorName?: string;
  actorAvatar?: string;
}
