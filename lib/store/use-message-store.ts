import { create } from "zustand";
import { MOCK_CONVERSATIONS } from "@/lib/data/mock-messages";

type MessageStore = {
  unreadCount: number;
  readConversationIds: Set<string>;
  markAsRead: (conversationId: string) => void;
  markAllAsRead: () => void;
};

// Seed initial unread count from mock data
const initialUnread = MOCK_CONVERSATIONS.filter(
  (c) => c.unreadCount > 0,
).length;

export const useMessageStore = create<MessageStore>((set) => ({
  unreadCount: initialUnread,
  readConversationIds: new Set<string>(),
  markAsRead: (conversationId: string) =>
    set((state) => {
      if (state.readConversationIds.has(conversationId)) return state;
      const newRead = new Set(state.readConversationIds);
      newRead.add(conversationId);
      return {
        readConversationIds: newRead,
        unreadCount: Math.max(0, state.unreadCount - 1),
      };
    }),
  markAllAsRead: () =>
    set({
      unreadCount: 0,
      readConversationIds: new Set(MOCK_CONVERSATIONS.map((c) => c.id)),
    }),
}));
