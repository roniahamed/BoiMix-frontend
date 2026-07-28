"use client";

import { Conversation, Message } from "@/lib/data/mock-messages";
import { MessageBubble } from "@/components/shared/message-bubble";
import { TypingIndicator } from "@/components/messages/typing-indicator";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeftIcon,
  ArrowLeftRightIcon,
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
  compact?: boolean;
  onBack?: () => void;
};

const MY_BOOKS = [
  {
    id: "my-1",
    title: "Atomic Habits",
    author: "James Clear",
    cover:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "my-2",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    cover:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "my-3",
    title: "Deep Work",
    author: "Cal Newport",
    cover:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&auto=format&fit=crop&q=80",
  },
];

const THEIR_BOOKS = [
  {
    id: "their-1",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    cover:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "their-2",
    title: "The Alchemist",
    author: "Paulo Coelho",
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "their-3",
    title: "Sapiens: A Brief History",
    author: "Yuval Noah Harari",
    cover:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&auto=format&fit=crop&q=80",
  },
];

export function ChatWindow({
  conversation,
  className,
  compact = false,
  onBack,
}: ChatWindowProps) {
  const { user } = conversation;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const prefill = searchParams.get("prefill");

  const [activeConvId, setActiveConvId] = useState(conversation.id);
  const [messages, setMessages] = useState<Message[]>(conversation.messages);
  const [isTyping, setIsTyping] = useState(conversation.isTyping || false);
  const [inputValue, setInputValue] = useState(
    prefill ? decodeURIComponent(prefill) : "",
  );

  if (conversation.id !== activeConvId) {
    setActiveConvId(conversation.id);
    setMessages(conversation.messages);
    setIsTyping(conversation.isTyping || false);
  }

  // Exchange proposal modal states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMyBook, setSelectedMyBook] = useState(MY_BOOKS[0].id);
  const [selectedTheirBook, setSelectedTheirBook] = useState(THEIR_BOOKS[0].id);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: "me",
      text: textToSend.trim(),
      time: "Just now",
      isRead: false,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");

    // Simulate response after typing
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const replyMsg: Message = {
          id: `reply-${Date.now()}`,
          senderId: user.id,
          text: "Sounds great! Let's arrange a time and place to swap the books. 👍",
          time: "Just now",
          isRead: true,
        };
        setMessages((prev) => [...prev, replyMsg]);
      }, 1500);
    }, 800);
  };

  const handleSendExchangeProposal = () => {
    const myBook = MY_BOOKS.find((b) => b.id === selectedMyBook) || MY_BOOKS[0];
    const theirBook =
      THEIR_BOOKS.find((b) => b.id === selectedTheirBook) || THEIR_BOOKS[0];

    const proposalMsg: Message = {
      id: `prop-msg-${Date.now()}`,
      senderId: "me",
      text: `I would like to exchange my copy of "${myBook.title}" for your copy of "${theirBook.title}". Let me know if that works for you!`,
      time: "Just now",
      isRead: false,
      exchangeProposal: {
        id: `prop-${Date.now()}`,
        offeringBook: {
          title: myBook.title,
          author: myBook.author,
          cover: myBook.cover,
        },
        requestingBook: {
          title: theirBook.title,
          author: theirBook.author,
          cover: theirBook.cover,
        },
        status: "pending",
      },
    };

    setMessages((prev) => [...prev, proposalMsg]);
    setDialogOpen(false);
  };

  const handleAcceptProposal = (proposalId: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.exchangeProposal && msg.exchangeProposal.id === proposalId) {
          return {
            ...msg,
            exchangeProposal: {
              ...msg.exchangeProposal,
              status: "accepted",
            },
          };
        }
        return msg;
      }),
    );
  };

  const handleDeclineProposal = (proposalId: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.exchangeProposal && msg.exchangeProposal.id === proposalId) {
          return {
            ...msg,
            exchangeProposal: {
              ...msg.exchangeProposal,
              status: "declined",
            },
          };
        }
        return msg;
      }),
    );
  };

  return (
    <div className={cn("flex flex-1 flex-col overflow-hidden", className)}>
      {/* Chat Header */}
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
                  <span className="border-background bg-success ring-background/10 absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 ring-1" />
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

          <div className="flex items-center gap-2">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="h-9 bg-emerald-600 px-3 font-bold text-white shadow-xs hover:bg-emerald-700"
                >
                  <ArrowLeftRightIcon className="mr-1.5 h-4 w-4" />
                  Propose Exchange
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Propose a Book Exchange</DialogTitle>
                  <DialogDescription>
                    Select the book from your library you want to offer and the
                    book you want in return from {user.name}.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <label className="text-muted-foreground text-xs font-bold uppercase">
                      Your Book (Offering)
                    </label>
                    <Select
                      value={selectedMyBook}
                      onValueChange={setSelectedMyBook}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a book to offer" />
                      </SelectTrigger>
                      <SelectContent>
                        {MY_BOOKS.map((b) => (
                          <SelectItem key={b.id} value={b.id}>
                            {b.title} — {b.author}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-center">
                    <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full">
                      <ArrowLeftRightIcon className="text-primary h-4 w-4" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-muted-foreground text-xs font-bold uppercase">
                      Their Book (Requesting)
                    </label>
                    <Select
                      value={selectedTheirBook}
                      onValueChange={setSelectedTheirBook}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a book to request" />
                      </SelectTrigger>
                      <SelectContent>
                        {THEIR_BOOKS.map((b) => (
                          <SelectItem key={b.id} value={b.id}>
                            {b.title} — {b.author}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    className="bg-emerald-600 font-bold text-white hover:bg-emerald-700"
                    onClick={handleSendExchangeProposal}
                  >
                    Send Exchange Offer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground rounded-full"
            >
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
            exchangeProposal={
              msg.exchangeProposal
                ? {
                    ...msg.exchangeProposal,
                    onAccept: () =>
                      handleAcceptProposal(msg.exchangeProposal!.id),
                    onDecline: () =>
                      handleDeclineProposal(msg.exchangeProposal!.id),
                  }
                : undefined
            }
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
            handleSendMessage(inputValue);
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
