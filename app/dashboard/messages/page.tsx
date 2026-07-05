import { ConversationList } from "@/components/messages/conversation-list";
import { MOCK_CONVERSATIONS } from "@/lib/data/mock-messages";
import { MessageSquareIcon } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="flex h-[calc(100vh-140px)] flex-col gap-4 md:flex-row">
      {/* Sidebar / Conversation List */}
      <div className="bg-card w-full overflow-hidden rounded-lg border md:w-1/3 lg:w-1/4">
        <ConversationList conversations={MOCK_CONVERSATIONS} />
      </div>

      {/* Empty State for Chat Window (Desktop Only) */}
      <div className="bg-card text-muted-foreground hidden flex-1 flex-col items-center justify-center rounded-lg border p-8 text-center md:flex">
        <div className="bg-muted mb-4 flex h-20 w-20 items-center justify-center rounded-full">
          <MessageSquareIcon className="text-muted-foreground/50 h-10 w-10" />
        </div>
        <h3 className="text-foreground mb-2 text-xl font-semibold">
          Your Messages
        </h3>
        <p className="max-w-md">
          Select a conversation from the list to start chatting about book
          swaps, purchases, and more.
        </p>
      </div>
    </div>
  );
}
