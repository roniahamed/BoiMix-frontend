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
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const prefill = searchParams.get("prefill");
  const [inputValue, setInputValue] = useState(
    prefill ? decodeURIComponent(prefill) : "",
  );

  useEffect(() => {
    // Scroll container to bottom without affecting window scroll
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  return (
    <div className={cn("flex flex-1 flex-col overflow-hidden", className)}>
      {/* Chat Header — hidden in compact/widget mode */}
      {!compact && (
        <div className="bg-background flex items-center justify-between border-b px-4 py-3 shadow-xs">
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
              <Button
                variant="ghost"
                size="icon"
                className="-ml-2 shrink-0 md:hidden"
                asChild
              >
                <Link href="/dashboard/messages">
                  <ArrowLeftIcon className="h-5 w-5" />
                </Link>
              </Button>
            )}

            <Link
              href={`/u/${user.username}`}
              className="flex items-center gap-3 transition-opacity hover:opacity-80"
            >
              <div className="relative">
                <UserAvatar
                  name={user.name}
                  src={user.avatar}
                  className="h-10 w-10 border shadow-xs"
                />
                {user.isOnline && (
                  <span className="border-background bg-success ring-background/10 absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 ring-1"></span>
                )}
              </div>
              <div className="flex flex-col">
                <div className="text-foreground leading-tight font-semibold">
                  {user.name}
                </div>
                <div className="text-muted-foreground text-xs font-medium">
                  {user.isOnline ? (
                    <span className="text-success">Online</span>
                  ) : (
                    user.lastSeen || "Offline"
                  )}
                </div>
              </div>
            </Link>
          </div>

          <div className="text-muted-foreground flex items-center gap-1">
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVerticalIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div
        ref={scrollContainerRef}
        className="bg-muted/30 flex flex-1 flex-col gap-4 overflow-y-auto p-4 sm:p-6"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(0,0,0,0.02) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div className="my-4 flex justify-center">
          <span className="bg-background/80 text-muted-foreground rounded-full border px-3 py-1 text-[11px] font-medium shadow-xs backdrop-blur-sm">
            Conversation started
          </span>
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
            <div className="bg-card text-foreground rounded-2xl rounded-bl-sm border px-4 py-2.5 shadow-sm">
              <TypingIndicator />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-background border-t p-3 sm:p-4">
        <form
          className="bg-muted/20 focus-within:ring-primary/20 focus-within:border-primary/50 flex items-center gap-2 rounded-full border px-2 py-1.5 shadow-inner transition-all focus-within:ring-2"
          onSubmit={(e) => {
            e.preventDefault();
            // Mock send action
            setInputValue("");
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="text-muted-foreground hover:text-foreground shrink-0 rounded-full"
          >
            <PaperclipIcon className="h-5 w-5" />
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border-0 bg-transparent px-1 text-[15px] shadow-none focus-visible:ring-0"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!inputValue.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 rounded-full transition-transform active:scale-95 disabled:opacity-50"
          >
            <SendIcon className="ml-0.5 h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
