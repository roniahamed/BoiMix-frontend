import { ConversationList } from "@/components/messages/conversation-list";
import { MOCK_CONVERSATIONS } from "@/lib/data/mock-messages";
import { MessageSquareDashed, Lock } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="bg-background flex h-full w-full flex-col gap-0 overflow-hidden md:flex-row lg:rounded-2xl lg:border lg:shadow-sm">
      {/* Sidebar / ConversationList */}
      <div className="w-full shrink-0 border-r md:w-[380px] lg:w-[420px]">
        <ConversationList conversations={MOCK_CONVERSATIONS} />
      </div>

      {/* Empty State for Chat Window (Desktop Only) */}
      <div className="bg-muted/30 hidden flex-1 flex-col items-center justify-center p-8 text-center md:flex">
        <div className="bg-primary/10 mb-8 flex h-32 w-32 items-center justify-center rounded-full shadow-inner">
          <MessageSquareDashed
            className="text-primary h-16 w-16"
            strokeWidth={1.5}
          />
        </div>
        <h3 className="text-foreground mb-3 text-3xl font-light tracking-tight">
          BoiMix Messages
        </h3>
        <p className="text-muted-foreground mb-12 max-w-sm text-[15px] leading-relaxed">
          Select a conversation from the list to start chatting about book
          exchanges, purchases, and more.
        </p>

        <div className="text-muted-foreground/60 flex items-center gap-1.5 text-xs font-medium">
          <Lock className="h-3 w-3" />
          <span>Your personal messages are private and secure.</span>
        </div>
      </div>
    </div>
  );
}
