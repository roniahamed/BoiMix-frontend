import { ConversationList } from "@/components/messages/conversation-list";
import { ChatWindow } from "@/components/messages/chat-window";
import { MOCK_CONVERSATIONS } from "@/lib/data/mock-messages";
import { notFound } from "next/navigation";

export default function MessageDetailsPage({
  params,
}: {
  params: { username: string };
}) {
  const conversation = MOCK_CONVERSATIONS.find(
    (c) => c.user.username === params.username,
  );

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
      <div className="bg-card flex flex-1 flex-col overflow-hidden rounded-lg border">
        <ChatWindow conversation={conversation} />
      </div>
    </div>
  );
}
