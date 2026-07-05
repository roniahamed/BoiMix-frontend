"use client";

import { cn } from "@/lib/utils";
import { Conversation } from "@/lib/data/mock-messages";
import { UserAvatar } from "@/components/shared/user-avatar";
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

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="border-b p-4">
        <h2 className="text-xl font-bold">Messages</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => {
          const isActive = pathname.includes(conv.user.username);
          const lastMessage = conv.messages[conv.messages.length - 1];

          return (
            <Link
              key={conv.id}
              href={`/dashboard/messages/${conv.user.username}`}
              className={cn(
                "hover:bg-muted/50 flex cursor-pointer items-center gap-3 border-b p-4 transition-colors",
                isActive && "bg-muted",
              )}
            >
              <div className="relative">
                <UserAvatar
                  name={conv.user.name}
                  src={conv.user.avatar}
                  className="h-12 w-12"
                />
                {conv.user.isOnline && (
                  <span className="border-background absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 bg-green-500" />
                )}
              </div>
              <div className="flex flex-1 flex-col overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{conv.user.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {conv.lastMessageTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "truncate text-sm",
                      conv.unreadCount > 0
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground",
                    )}
                  >
                    {conv.isTyping ? (
                      <span className="text-primary italic">Typing...</span>
                    ) : lastMessage?.attachment ? (
                      <span className="flex items-center gap-1 italic">
                        🖼️{" "}
                        {lastMessage.attachment.type === "image"
                          ? "Photo"
                          : "File"}
                      </span>
                    ) : (
                      lastMessage?.text || "No messages yet"
                    )}
                  </span>
                  {conv.unreadCount > 0 && (
                    <span className="bg-primary text-primary-foreground flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
