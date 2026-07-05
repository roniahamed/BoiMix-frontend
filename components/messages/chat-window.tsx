"use client";

import { Conversation } from "@/lib/data/mock-messages";
import { MessageBubble } from "@/components/shared/message-bubble";
import { TypingIndicator } from "@/components/messages/typing-indicator";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeftIcon,
  MoreVerticalIcon,
  PaperclipIcon,
  SendIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type ChatWindowProps = {
  conversation: Conversation;
  className?: string;
  /** When true, hides the internal chat header (used in floating widget) */
  compact?: boolean;
  onBack?: () => void;
};

export function ChatWindow({
  conversation,
  className,
  compact = false,
  onBack,
}: ChatWindowProps) {
  const { user, messages, isTyping } = conversation;
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom on mount and when messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className={cn("flex flex-1 flex-col overflow-hidden", className)}>
      {/* Chat Header — hidden in compact/widget mode */}
      {!compact && (
        <div className="bg-background flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-3">
            {onBack ? (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={onBack}
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" className="md:hidden" asChild>
                <Link href="/dashboard/messages">
                  <ArrowLeftIcon className="h-5 w-5" />
                </Link>
              </Button>
            )}

            <Link
              href={`/u/${user.username}`}
              className="flex items-center gap-3"
            >
              <UserAvatar
                name={user.name}
                src={user.avatar}
                className="h-10 w-10"
              />
              <div>
                <div className="leading-tight font-semibold">{user.name}</div>
                <div className="text-muted-foreground text-xs">
                  {user.isOnline ? "Online" : user.lastSeen || "Offline"}
                </div>
              </div>
            </Link>
          </div>

          <Button variant="ghost" size="icon">
            <MoreVerticalIcon className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Messages Area */}
      <div className="bg-muted/10 flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div className="text-muted-foreground my-2 text-center text-xs">
          Conversation started
        </div>

        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg.text}
            time={msg.time}
            mine={msg.senderId === "me"}
            isRead={msg.isRead}
            attachment={msg.attachment}
          />
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground rounded-2xl rounded-bl-sm px-4 py-2">
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="bg-background border-t p-4">
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            // Mock send action
          }}
        >
          <Button
            variant="outline"
            size="icon"
            type="button"
            className="shrink-0"
          >
            <PaperclipIcon className="h-4 w-4" />
          </Button>
          <Input placeholder="Type your message..." className="flex-1" />
          <Button
            type="submit"
            size="icon"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
