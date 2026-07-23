"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookPlusIcon,
  MessageSquareIcon,
  XIcon,
  ExternalLinkIcon,
  ArrowUpIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMessageStore } from "@/lib/store/use-message-store";
import { MOCK_CONVERSATIONS, Conversation } from "@/lib/data/mock-messages";
import { UserAvatar } from "@/components/shared/user-avatar";
import { ChatWindow } from "@/components/messages/chat-window";
import { Button } from "@/components/ui/button";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function RightSidebarWidget() {
  const [msgOpen, setMsgOpen] = useState(false);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const unreadCount = useMessageStore((s) => s.unreadCount);
  const markAsRead = useMessageStore((s) => s.markAsRead);

  const handleOpenConversation = (conv: Conversation) => {
    setActiveConversation(conv);
    markAsRead(conv.id);
  };

  const handleClose = () => {
    setMsgOpen(false);
    setActiveConversation(null);
  };

  return (
    <>
      {/* Message Popup — fixed to the bottom of the screen */}
      {msgOpen && (
        <div
          className={cn(
            "bg-card border-border fixed right-[85px] bottom-0 z-50 hidden flex-col overflow-hidden rounded-t-[5px] border border-b-0 shadow-[0_0_15px_rgba(0,0,0,0.15)] md:flex",
            "h-[600px] w-[800px]",
            "animate-in slide-in-from-bottom-4 fade-in-0 duration-200",
          )}
        >
          {/* Popup header */}
          <div className="bg-primary flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2 text-white">
              <MessageSquareIcon className="h-5 w-5" />
              <span className="font-semibold">Messages</span>
              {unreadCount > 0 && (
                <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-xs font-bold">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-white hover:bg-white/20"
                asChild
              >
                <Link
                  href="/dashboard/messages"
                  aria-label="Open full inbox"
                  onClick={handleClose}
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                </Link>
              </Button>
              <button
                onClick={handleClose}
                className="rounded-full p-1 text-white transition-colors hover:bg-white/20"
                aria-label="Close"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Conversation List Sidebar */}
            <div className="border-border bg-card w-[300px] shrink-0 overflow-y-auto border-r">
              {MOCK_CONVERSATIONS.map((conv) => {
                const lastMessage = conv.messages[conv.messages.length - 1];
                const isActive = activeConversation?.id === conv.id;
                return (
                  <button
                    key={conv.id}
                    onClick={() => handleOpenConversation(conv)}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-3 border-b px-4 py-3 text-left transition-colors",
                      isActive ? "bg-muted" : "hover:bg-muted/50",
                    )}
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
                            conv.unreadCount > 0 && !isActive
                              ? "text-foreground font-semibold"
                              : "text-muted-foreground",
                          )}
                        >
                          {conv.isTyping
                            ? "Typing..."
                            : lastMessage?.text || "No messages yet"}
                        </span>
                        {conv.unreadCount > 0 && !isActive && (
                          <span className="bg-primary text-primary-foreground flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Chat Area */}
            <div className="bg-muted/10 flex flex-1 flex-col overflow-hidden">
              {activeConversation ? (
                <ChatWindow conversation={activeConversation} />
              ) : (
                <div className="text-muted-foreground flex h-full flex-col items-center justify-center">
                  <MessageSquareIcon className="mb-4 h-12 w-12 opacity-20" />
                  <p>Select a conversation to start messaging</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Strip */}
      <div className="bg-card border-border fixed top-2/3 right-0 z-50 hidden -translate-y-1/2 flex-col overflow-hidden rounded-l-[5px] border border-r-0 shadow-[0_0_15px_rgba(0,0,0,0.15)] md:flex">
        {/* Add Book */}
        <Link
          href="/books/upload"
          className="hover:bg-muted group flex flex-col items-center gap-1.5 border-b px-4 py-4 transition-colors"
          aria-label="Add a book"
        >
          <BookPlusIcon className="text-muted-foreground group-hover:text-primary h-6 w-6 transition-colors" />
          <span className="text-muted-foreground group-hover:text-primary w-14 text-center text-[11px] leading-tight font-medium transition-colors">
            Add Book
          </span>
        </Link>

        {/* Messages */}
        <button
          onClick={() => setMsgOpen((p) => !p)}
          className="hover:bg-muted group relative flex flex-col items-center gap-1.5 border-b px-4 py-4 transition-colors"
          aria-label="Messages"
          aria-expanded={msgOpen}
        >
          <div className="relative">
            <MessageSquareIcon
              className={cn(
                "h-6 w-6 transition-colors",
                msgOpen
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-primary",
              )}
            />
            {unreadCount > 0 && (
              <span className="bg-primary text-primary-foreground absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] leading-none font-bold">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>
          <span
            className={cn(
              "w-14 text-center text-[11px] leading-tight font-medium transition-colors",
              msgOpen
                ? "text-primary"
                : "text-muted-foreground group-hover:text-primary",
            )}
          >
            Messages
          </span>
        </button>

        {/* Back to Top */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="hover:bg-muted group flex flex-col items-center gap-1.5 px-4 py-4 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUpIcon className="text-muted-foreground group-hover:text-primary h-6 w-6 transition-colors" />
            <span className="text-muted-foreground group-hover:text-primary w-14 text-center text-[11px] leading-tight font-medium transition-colors">
              Back to top
            </span>
          </button>
        )}
      </div>
    </>
  );
}
