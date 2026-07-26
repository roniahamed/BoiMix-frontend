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
    <div className="bg-background flex h-full w-full flex-col gap-0 overflow-hidden md:flex-row lg:rounded-2xl lg:border lg:shadow-sm">
      {/* Sidebar / Conversation List (Hidden on Mobile) */}
      <div className="hidden w-full shrink-0 border-r md:block md:w-[380px] lg:w-[420px]">
        <ConversationList conversations={MOCK_CONVERSATIONS} />
      </div>

      {/* Chat Window */}
      <div className="bg-background fixed inset-0 z-[100] flex flex-col md:static md:z-auto md:flex-1 md:overflow-hidden md:bg-transparent">
        <ChatWindow conversation={conversation} />
      </div>
    </div>
  );
}
