"use client";

import { useState } from "react";
import {
  MessageSquareIcon,
  XIcon,
  ArrowLeftIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMessageStore } from "@/lib/store/use-message-store";
import { MOCK_CONVERSATIONS, Conversation } from "@/lib/data/mock-messages";
import { UserAvatar } from "@/components/shared/user-avatar";
import { ChatWindow } from "@/components/messages/chat-window";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FloatingMessageWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const unreadCount = useMessageStore((s) => s.unreadCount);
  const markAsRead = useMessageStore((s) => s.markAsRead);

  const handleOpenConversation = (conv: Conversation) => {
    setActiveConversation(conv);
    markAsRead(conv.id);
  };

  const handleBack = () => setActiveConversation(null);

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      {/* Widget Panel */}
      {isOpen && (
        <div
          className={cn(
            "bg-card border-border flex flex-col overflow-hidden rounded-2xl border shadow-2xl",
            "h-[520px] w-[360px]",
            "animate-in slide-in-from-bottom-4 fade-in-0 duration-200",
          )}
        >
          {/* Panel Header */}
          <div className="bg-primary flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2 text-white">
              {activeConversation ? (
                <>
                  <button
                    onClick={handleBack}
                    className="mr-1 rounded-full p-1 transition-colors hover:bg-white/20"
                    aria-label="Back to conversations"
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                  </button>
                  <UserAvatar
                    name={activeConversation.user.name}
                    src={activeConversation.user.avatar}
                    className="h-7 w-7 text-xs"
                  />
                  <div>
                    <p className="text-sm leading-tight font-semibold">
                      {activeConversation.user.name}
                    </p>
                    <p className="text-xs text-white/70">
                      {activeConversation.user.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <MessageSquareIcon className="h-5 w-5" />
                  <span className="font-semibold">Messages</span>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-xs font-bold">
                      {unreadCount}
                    </span>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center gap-1">
              {/* Open full inbox */}
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-white hover:bg-white/20"
                asChild
              >
                <Link
                  href="/dashboard/messages"
                  aria-label="Open full inbox"
                  onClick={() => setIsOpen(false)}
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                </Link>
              </Button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setActiveConversation(null);
                }}
                className="rounded-full p-1 text-white transition-colors hover:bg-white/20"
                aria-label="Close messages"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {activeConversation ? (
              // Chat window (no header since panel header takes care of it)
              <ChatWindow conversation={activeConversation} compact />
            ) : (
              // Conversation list
              <div className="flex-1 overflow-y-auto">
                {MOCK_CONVERSATIONS.length === 0 ? (
                  <div className="text-muted-foreground flex flex-col items-center justify-center gap-3 py-16 text-center">
                    <MessageSquareIcon className="h-10 w-10 opacity-30" />
                    <p className="text-sm">No messages yet</p>
                  </div>
                ) : (
                  MOCK_CONVERSATIONS.map((conv) => {
                    const lastMessage = conv.messages[conv.messages.length - 1];
                    return (
                      <button
                        key={conv.id}
                        onClick={() => handleOpenConversation(conv)}
                        className="hover:bg-muted/50 flex w-full cursor-pointer items-center gap-3 border-b px-4 py-3 text-left transition-colors"
                      >
                        <div className="relative shrink-0">
                          <UserAvatar
                            name={conv.user.name}
                            src={conv.user.avatar}
                            className="h-10 w-10"
                          />
                          {conv.user.isOnline && (
                            <span className="border-card absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 bg-green-500" />
                          )}
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold">
                              {conv.user.name}
                            </span>
                            <span className="text-muted-foreground text-xs">
                              {conv.lastMessageTime}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={cn(
                                "truncate text-xs",
                                conv.unreadCount > 0
                                  ? "text-foreground font-semibold"
                                  : "text-muted-foreground",
                              )}
                            >
                              {conv.isTyping
                                ? "Typing..."
                                : lastMessage?.text || "No messages yet"}
                            </span>
                            {conv.unreadCount > 0 && (
                              <span className="bg-primary text-primary-foreground flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold">
                                {conv.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
          if (isOpen) setActiveConversation(null);
        }}
        aria-label="Toggle messages"
        className={cn(
          "bg-primary text-primary-foreground relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all",
          "hover:bg-primary/90 hover:scale-105 active:scale-95",
          "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        )}
      >
        {isOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MessageSquareIcon className="h-6 w-6" />
        )}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
