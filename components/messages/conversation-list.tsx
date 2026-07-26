"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Conversation } from "@/lib/data/mock-messages";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ConversationListProps = {
  conversations: Conversation[];
  className?: string;
};

export function ConversationList({
  conversations,
  className,
}: ConversationListProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((conv) => {
    const q = searchQuery.toLowerCase();
    return (
      conv.user.name.toLowerCase().includes(q) ||
      conv.user.username.toLowerCase().includes(q)
    );
  });

  return (
    <div className={cn("bg-background/50 flex h-full flex-col", className)}>
      <div className="bg-background z-10 border-b px-4 py-3 shadow-xs">
        <h2 className="mb-3 text-[19px] font-bold tracking-tight">Messages</h2>
        <div className="group relative">
          <SearchIcon className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-muted/30 focus-visible:bg-background focus-visible:border-primary/50 focus-visible:ring-primary/20 h-10 rounded-xl border-transparent pl-9 shadow-inner transition-all"
          />
        </div>
      </div>
      <div className="flex-1 scrollbar-none overflow-y-auto">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conv) => {
            const isActive = pathname.includes(conv.user.username);
            const lastMessage = conv.messages[conv.messages.length - 1];

            return (
              <Link
                key={conv.id}
                href={`/dashboard/messages/${conv.user.username}`}
                className={cn(
                  "hover:bg-muted/50 border-border/50 group relative flex cursor-pointer items-center gap-3 overflow-hidden border-b p-3.5 transition-all",
                  isActive
                    ? "bg-primary/5 hover:bg-primary/10"
                    : "bg-transparent",
                )}
              >
                {isActive && (
                  <div className="bg-primary absolute top-0 bottom-0 left-0 w-1 rounded-r-full" />
                )}

                <div className="relative shrink-0">
                  <UserAvatar
                    name={conv.user.name}
                    src={conv.user.avatar}
                    className="h-12 w-12 border shadow-xs transition-transform group-hover:scale-105"
                  />
                  {conv.user.isOnline && (
                    <span className="border-background bg-success ring-background/10 absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 ring-1" />
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <div className="mb-0.5 flex items-center justify-between">
                    <span
                      className={cn(
                        "truncate pr-2 text-[15px] font-semibold",
                        isActive ? "text-primary" : "text-foreground",
                      )}
                    >
                      {conv.user.name}
                    </span>
                    <span
                      className={cn(
                        "shrink-0 text-[11px] whitespace-nowrap",
                        conv.unreadCount > 0
                          ? "text-primary font-bold"
                          : "text-muted-foreground font-medium",
                      )}
                    >
                      {conv.lastMessageTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "truncate text-[13px] leading-relaxed",
                        conv.unreadCount > 0
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground",
                      )}
                    >
                      {conv.isTyping ? (
                        <span className="text-primary animate-pulse font-medium">
                          Typing...
                        </span>
                      ) : lastMessage?.attachment ? (
                        <span className="flex items-center gap-1 font-medium">
                          <span className="text-muted-foreground">🖼️</span>{" "}
                          {lastMessage.attachment.type === "image"
                            ? "Photo"
                            : "File"}
                        </span>
                      ) : (
                        lastMessage?.text || "No messages yet"
                      )}
                    </span>
                    {conv.unreadCount > 0 && (
                      <span className="bg-primary text-primary-foreground flex h-[18px] min-w-[18px] shrink-0 items-center justify-center rounded-full px-1 text-[10px] font-bold shadow-xs">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-muted-foreground flex min-h-[200px] flex-col items-center justify-center p-8 text-center text-sm">
            <SearchIcon className="mb-3 h-8 w-8 opacity-20" />
            <p>No conversations found</p>
          </div>
        )}
      </div>
    </div>
  );
}
