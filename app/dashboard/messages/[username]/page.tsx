"use client";

import { useEffect, use } from "react";
import { ConversationList } from "@/components/messages/conversation-list";
import { ChatWindow } from "@/components/messages/chat-window";
import { MOCK_CONVERSATIONS } from "@/lib/data/mock-messages";
import { useMessageStore } from "@/lib/store/use-message-store";
import { notFound } from "next/navigation";

export default function MessageDetailsPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const resolvedParams = use(params);
  const conversation = MOCK_CONVERSATIONS.find(
    (c) => c.user.username === resolvedParams.username,
  );

  const markAsRead = useMessageStore((s) => s.markAsRead);

  useEffect(() => {
    if (conversation?.id) {
      markAsRead(conversation.id);
    }
  }, [conversation?.id, markAsRead]);

  if (!conversation) {
    notFound();
  }

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col gap-4 md:flex-row">
      {/* Sidebar / Conversation List (Hidden on Mobile) */}
      <div className="bg-card hidden overflow-hidden rounded-lg border md:block md:w-1/3 lg:w-1/4">
        <ConversationList conversations={MOCK_CONVERSATIONS} />
      </div>

      {/* Chat Window */}
      <div className="bg-background md:bg-card fixed inset-0 z-[100] flex flex-col md:static md:z-auto md:flex-1 md:overflow-hidden md:rounded-lg md:border">
        <ChatWindow conversation={conversation} />
      </div>
    </div>
  );
}
