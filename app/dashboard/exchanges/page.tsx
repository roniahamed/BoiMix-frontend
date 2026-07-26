"use client";

import { useState } from "react";
import Image from "next/image";
import {
  useExchangeStore,
  ExchangeOrder,
  ExchangeStatus,
} from "@/lib/store/use-exchange-store";
import {
  Repeat2,
  CheckCircle2,
  Eye,
  MessageSquare,
  MapPin,
  CalendarDays,
  Star,
  MessageCircle,
  HelpCircle,
  Clock,
  XCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const getStatusBadge = (
  status: ExchangeStatus,
  isActionRequiredByMe: boolean,
) => {
  if (status === "pending_proposal" || status === "counter_offered") {
    if (isActionRequiredByMe) {
      return {
        label: "Waiting for You",
        color: "text-amber-600 bg-amber-500/15 border-amber-500/20",
        icon: "🟡",
      };
    }
    return {
      label: "Waiting for Partner",
      color: "text-blue-600 bg-blue-500/15 border-blue-500/20",
      icon: "🔵",
    };
  }
  if (status === "agreement_reached") {
    return {
      label: "Ready for Meetup",
      color: "text-emerald-600 bg-emerald-500/15 border-emerald-500/20",
      icon: "🟢",
    };
  }
  if (status === "handed_over" || status === "completed") {
    return {
      label: "Completed",
      color: "text-green-600 bg-green-500/15 border-green-500/20",
      icon: "✅",
    };
  }
  if (status === "disputed") {
    return {
      label: "Disputed",
      color: "text-red-600 bg-red-500/15 border-red-500/20",
      icon: "🔴",
    };
  }
  if (status === "rejected") {
    return {
      label: "Cancelled",
      color: "text-red-600 bg-red-500/15 border-red-500/20",
      icon: "🔴",
    };
  }
  return {
    label: "Unknown",
    color: "text-muted-foreground bg-muted border-border",
    icon: "⚪",
  };
};

const MOCK_USERS: Record<
  string,
  {
    name: string;
    avatar: string;
    rating: string;
    reviews: number;
    completedSwaps: number;
    memberSince: string;
  }
> = {
  kamal123: {
    name: "Kamal Hossain",
    avatar: "https://i.pravatar.cc/150?u=kamal123",
    rating: "4.8",
    reviews: 125,
    completedSwaps: 52,
    memberSince: "2024",
  },
  jamal456: {
    name: "Jamal Uddin",
    avatar: "https://i.pravatar.cc/150?u=jamal456",
    rating: "4.5",
    reviews: 89,
    completedSwaps: 34,
    memberSince: "2023",
  },
  hasan789: {
    name: "Hasan Mahmud",
    avatar: "https://i.pravatar.cc/150?u=hasan789",
    rating: "4.9",
    reviews: 210,
    completedSwaps: 105,
    memberSince: "2022",
  },
};

const MOCK_BOOKS: Record<
  string,
  { author: string; condition: string; format: string }
> = {
  book1: {
    author: "Humayun Ahmed",
    condition: "Like New",
    format: "Hardcover",
  },
  book2: { author: "Zafar Iqbal", condition: "Good", format: "Paperback" },
  book3: {
    author: "Samaresh Majumdar",
    condition: "Acceptable",
    format: "Hardcover",
  },
};

export default function ActiveExchangesDashboard() {
  const { exchanges, updateExchangeStatus, counterOffer } = useExchangeStore();
  const currentUser = "current-user";

  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedExchange, setSelectedExchange] =
    useState<ExchangeOrder | null>(null);

  const myExchanges = exchanges.filter(
    (e) => e.ownerId === currentUser || e.proposerId === currentUser,
  );

  const getSortPriority = (e: ExchangeOrder) => {
    const isOwner = e.ownerId === currentUser;
    const isProposer = e.proposerId === currentUser;
    if (isOwner && e.status === "pending_proposal") return 1;
    if (isProposer && e.status === "counter_offered") return 1;
    if (e.status === "agreement_reached") return 2;
    if (isProposer && e.status === "pending_proposal") return 3;
    if (isOwner && e.status === "counter_offered") return 3;
    if (e.status === "completed" || e.status === "handed_over") return 4;
    return 5;
  };

  const sortedExchanges = [...myExchanges].sort(
    (a, b) => getSortPriority(a) - getSortPriority(b),
  );

  const filteredExchanges = sortedExchanges.filter((e) => {
    const priority = getSortPriority(e);
    if (activeTab === "all") return true;
    if (activeTab === "needs_action") return priority === 1;
    if (activeTab === "upcoming") return priority === 2;
    if (activeTab === "waiting") return priority === 3;
    if (activeTab === "completed") return priority === 4;
    return true;
  });

  const getCount = (tab: string) => {
    if (tab === "all") return sortedExchanges.length;
    if (tab === "needs_action")
      return sortedExchanges.filter((e) => getSortPriority(e) === 1).length;
    if (tab === "upcoming")
      return sortedExchanges.filter((e) => getSortPriority(e) === 2).length;
    if (tab === "waiting")
      return sortedExchanges.filter((e) => getSortPriority(e) === 3).length;
    if (tab === "completed")
      return sortedExchanges.filter((e) => getSortPriority(e) === 4).length;
    return 0;
  };

  return (
    <div className="space-y-6 pb-20 sm:space-y-8">
      {/* Header */}
      <div className="border-border/50 flex flex-col gap-4 border-b pb-5">
        <div>
          <h1 className="text-foreground flex items-center gap-2.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
            <Repeat2 className="h-7 w-7 text-indigo-500" /> Active Exchanges
          </h1>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
            Track your ongoing exchanges, manage handovers, and coordinate
            meetups.
          </p>
        </div>

        {/* Quick Filters / Tabs */}
        <div className="hide-scrollbar flex gap-2 overflow-x-auto pt-2">
          {[
            { id: "all", label: "All" },
            { id: "needs_action", label: "Needs Action" },
            { id: "upcoming", label: "Upcoming" },
            { id: "waiting", label: "Waiting" },
            { id: "completed", label: "Completed" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tab.label}
              <span
                className={`flex h-5 items-center justify-center rounded-full px-2 text-[10px] ${
                  activeTab === tab.id
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-background/50 text-muted-foreground"
                }`}
              >
                {getCount(tab.id)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Exchanges List */}
      <div className="space-y-4">
        {filteredExchanges.length === 0 ? (
          <div className="border-border/50 flex flex-col items-center justify-center rounded-2xl border py-12 text-center">
            <Repeat2 className="text-muted-foreground/30 mb-4 h-16 w-16" />
            <h3 className="text-lg font-bold">No exchanges found</h3>
            <p className="text-muted-foreground text-sm">
              You don&apos;t have any exchanges in this category.
            </p>
          </div>
        ) : (
          filteredExchanges.map((exchange) => {
            const isOwner = exchange.ownerId === currentUser;
            const isProposer = exchange.proposerId === currentUser;

            let isActionRequiredByMe = false;
            if (isOwner && exchange.status === "pending_proposal")
              isActionRequiredByMe = true;
            if (isProposer && exchange.status === "counter_offered")
              isActionRequiredByMe = true;

            const statusBadge = getStatusBadge(
              exchange.status,
              isActionRequiredByMe,
            );
            const partnerId = isOwner ? exchange.proposerId : exchange.ownerId;
            const partnerInfo = MOCK_USERS[partnerId] || {
              name: "Unknown User",
              avatar: "https://i.pravatar.cc/150?u=unknown",
              rating: "0.0",
              reviews: 0,
              completedSwaps: 0,
              memberSince: "2024",
            };

            const myBookTitle = isOwner
              ? exchange.requestedBookTitle
              : exchange.offeredBookTitle;
            const myBookImage = isOwner
              ? exchange.requestedBookImage
              : exchange.offeredBookImage;
            const theirBookTitle = isOwner
              ? exchange.offeredBookTitle
              : exchange.requestedBookTitle;
            const theirBookImage = isOwner
              ? exchange.offeredBookImage
              : exchange.requestedBookImage;

            const myBookMock =
              MOCK_BOOKS[`book${(myBookTitle.length % 3) + 1}`] ||
              MOCK_BOOKS["book1"];
            const theirBookMock =
              MOCK_BOOKS[`book${(theirBookTitle.length % 3) + 1}`] ||
              MOCK_BOOKS["book1"];

            return (
              <div
                key={exchange.id}
                className="bg-card border-border/60 relative flex flex-col items-start gap-6 overflow-hidden rounded-xl border px-4 py-5 shadow-xs transition-colors xl:flex-row xl:items-center"
              >
                {/* Status Color Left Border */}
                <div
                  className={`absolute top-0 bottom-0 left-0 w-1 ${
                    statusBadge.color.includes("amber")
                      ? "bg-amber-400"
                      : statusBadge.color.includes("emerald")
                        ? "bg-emerald-400"
                        : statusBadge.color.includes("blue")
                          ? "bg-blue-400"
                          : "bg-muted"
                  }`}
                />

                {/* Col 1: ID, Status, Partner & Location */}
                <div className="border-border/40 flex w-full shrink-0 flex-col xl:w-[260px] xl:border-r xl:pr-6">
                  {/* Top: ID & Status */}
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-muted-foreground bg-muted/30 rounded px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider">
                      {exchange.id.substring(0, 8).toUpperCase()}
                    </span>
                    <div
                      className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${statusBadge.color}`}
                    >
                      <span>{statusBadge.icon}</span>
                      {statusBadge.label}
                    </div>
                  </div>

                  {/* Bottom: Partner & Location */}
                  <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
                    <div className="flex items-start gap-2.5">
                      <Image
                        src={partnerInfo.avatar}
                        alt={partnerInfo.name}
                        width={40}
                        height={40}
                        className="border-border h-10 w-10 shrink-0 rounded-full border"
                      />
                      <div className="flex flex-col">
                        <h4 className="text-sm leading-tight font-bold">
                          {partnerInfo.name}
                        </h4>
                        <span className="mt-0.5 flex items-center text-[11px] font-semibold text-amber-500">
                          <Star className="mr-0.5 h-3 w-3 fill-current" />{" "}
                          {partnerInfo.rating}
                          <span className="text-muted-foreground ml-1 font-normal">
                            ({partnerInfo.reviews})
                          </span>
                        </span>
                        <div className="text-muted-foreground mt-2 text-[10px] leading-snug">
                          <span className="text-foreground font-bold">
                            {partnerInfo.completedSwaps}
                          </span>{" "}
                          Completed Swaps
                          <br />
                          Member since {partnerInfo.memberSince}
                        </div>
                      </div>
                    </div>

                    {exchange.meetLocation && (
                      <div className="text-muted-foreground border-border/40 flex min-w-0 flex-col gap-1.5 text-[10px] sm:border-l sm:pl-3">
                        <div className="text-foreground flex items-center gap-1.5 font-medium">
                          <MapPin className="h-3 w-3 shrink-0 text-red-500" />
                          <span className="line-clamp-1 break-words">
                            {exchange.meetLocation}
                          </span>
                        </div>
                        {exchange.meetDate && (
                          <div className="flex items-center gap-1.5">
                            <CalendarDays className="h-3 w-3 shrink-0 text-blue-500" />
                            <span className="line-clamp-1 break-words">
                              {exchange.meetDate} at 4:00 PM
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <svg
                            className="h-3 w-3 shrink-0 text-emerald-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 21v-7.5a2.25 2.25 0 00-2.25-2.25h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5m8.25-3a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                            />
                          </svg>
                          2.1 km away
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Col 2: Books */}
                <div className="border-border/40 border-border/10 flex w-full shrink-0 flex-col border-y py-4 xl:w-[320px] xl:border-y-0 xl:border-r xl:py-0 xl:pr-6">
                  <div className="flex h-full items-center justify-between gap-2">
                    {/* You Give */}
                    <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                      <div className="flex w-full flex-col">
                        <span className="text-brand-blue mb-1.5 text-[9px] font-extrabold tracking-wider uppercase">
                          You Give
                        </span>
                        <div className="flex gap-2">
                          <Image
                            src={myBookImage}
                            alt={myBookTitle}
                            width={44}
                            height={64}
                            className="h-16 w-11 shrink-0 rounded object-cover shadow-sm"
                          />
                          <div className="flex min-w-0 flex-col">
                            <h5 className="line-clamp-2 text-[11px] leading-tight font-bold">
                              {myBookTitle}
                            </h5>
                            <p className="text-muted-foreground mt-0.5 line-clamp-1 text-[10px]">
                              {myBookMock.author}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Repeat2 className="text-muted-foreground h-4 w-4 shrink-0 opacity-50" />

                    {/* You Receive */}
                    <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                      <div className="flex w-full flex-col">
                        <span className="mb-1.5 text-[9px] font-extrabold tracking-wider text-emerald-600 uppercase">
                          You Receive
                        </span>
                        <div className="flex gap-2">
                          <Image
                            src={theirBookImage}
                            alt={theirBookTitle}
                            width={44}
                            height={64}
                            className="h-16 w-11 shrink-0 rounded object-cover shadow-sm"
                          />
                          <div className="flex min-w-0 flex-col">
                            <h5 className="line-clamp-2 text-[11px] leading-tight font-bold">
                              {theirBookTitle}
                            </h5>
                            <p className="text-muted-foreground mt-0.5 line-clamp-1 text-[10px]">
                              {theirBookMock.author}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Col 3: Progress Tracker */}
                <div className="border-border/40 flex w-full min-w-0 flex-1 flex-col justify-center overflow-hidden xl:w-auto xl:min-w-[220px] xl:border-r xl:pr-6">
                  <span className="text-muted-foreground mb-3 text-[9px] font-extrabold tracking-wider uppercase">
                    Progress
                  </span>
                  <div className="relative mx-auto flex w-full max-w-[300px] items-center justify-between xl:mx-0">
                    <div className="bg-border/50 absolute top-[9px] right-[15px] left-[15px] z-0 h-0.5"></div>

                    {/* Agreement */}
                    <div className="relative z-10 flex w-12 flex-col items-center gap-1.5">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${["agreement_reached", "handed_over", "completed"].includes(exchange.status) ? "bg-emerald-500 text-white" : "bg-card border-muted border-2"}`}
                      >
                        {[
                          "agreement_reached",
                          "handed_over",
                          "completed",
                        ].includes(exchange.status) ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <div className="bg-muted-foreground/30 h-1.5 w-1.5 rounded-full"></div>
                        )}
                      </div>
                      <span className="text-foreground text-center text-[9px] font-semibold">
                        Agreement
                        <br />
                        <span className="text-muted-foreground font-normal">
                          Oct 25
                        </span>
                      </span>
                    </div>

                    {/* Meetup */}
                    <div className="relative z-10 flex w-12 flex-col items-center gap-1.5">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${["handed_over", "completed"].includes(exchange.status) ? "bg-emerald-500 text-white" : exchange.status === "agreement_reached" ? "bg-card border-brand-blue text-brand-blue border-2" : "bg-card border-muted border-2"}`}
                      >
                        {["handed_over", "completed"].includes(
                          exchange.status,
                        ) ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : exchange.status === "agreement_reached" ? (
                          <Clock className="h-3 w-3" />
                        ) : (
                          <div className="bg-muted-foreground/30 h-1.5 w-1.5 rounded-full"></div>
                        )}
                      </div>
                      <span className="text-foreground text-center text-[9px] font-semibold">
                        Meetup
                        <br />
                        <span className="text-muted-foreground font-normal">
                          Oct 28
                        </span>
                      </span>
                    </div>

                    {/* Handover */}
                    <div className="relative z-10 flex w-12 flex-col items-center gap-1.5">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${exchange.status === "completed" ? "bg-emerald-500 text-white" : exchange.status === "handed_over" ? "bg-card border-2 border-amber-500 text-amber-500" : "bg-card border-muted border-2"}`}
                      >
                        {exchange.status === "completed" ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : exchange.status === "handed_over" ? (
                          <Clock className="h-3 w-3" />
                        ) : (
                          <div className="bg-muted-foreground/30 h-1.5 w-1.5 rounded-full"></div>
                        )}
                      </div>
                      <span className="text-foreground text-center text-[9px] font-semibold">
                        Handover
                        <br />
                        <span className="text-muted-foreground font-normal">
                          -
                        </span>
                      </span>
                    </div>

                    {/* Completed */}
                    <div className="relative z-10 flex w-12 flex-col items-center gap-1.5">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${exchange.status === "completed" ? "bg-emerald-500 text-white" : "bg-card border-muted border-2"}`}
                      >
                        {exchange.status === "completed" ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <div className="bg-muted-foreground/30 h-1.5 w-1.5 rounded-full"></div>
                        )}
                      </div>
                      <span className="text-foreground text-center text-[9px] font-semibold">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Col 4: Actions */}
                <div className="mt-2 grid w-full shrink-0 grid-cols-2 justify-center gap-2 sm:grid-cols-3 xl:mt-0 xl:flex xl:w-[140px] xl:flex-col">
                  {isActionRequiredByMe &&
                    exchange.status === "pending_proposal" && (
                      <button
                        onClick={() =>
                          updateExchangeStatus(exchange.id, "agreement_reached")
                        }
                        className="bg-brand-blue hover:bg-brand-blue/90 w-full rounded-full px-3 py-1.5 text-center text-[10px] font-bold text-white shadow-sm transition-all"
                      >
                        Accept Request
                      </button>
                    )}
                  {exchange.status === "agreement_reached" && (
                    <button
                      onClick={() =>
                        updateExchangeStatus(exchange.id, "handed_over")
                      }
                      className="w-full rounded-full bg-emerald-600 px-3 py-1.5 text-center text-[10px] font-bold text-white shadow-sm transition-all hover:bg-emerald-700"
                    >
                      Confirm Handover
                    </button>
                  )}
                  {exchange.status === "handed_over" && (
                    <button
                      onClick={() =>
                        updateExchangeStatus(exchange.id, "completed")
                      }
                      className="w-full rounded-full bg-emerald-600 px-3 py-1.5 text-center text-[10px] font-bold text-white shadow-sm transition-all hover:bg-emerald-700"
                    >
                      Mark Completed
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedExchange(exchange)}
                    className="bg-background border-brand-blue/30 text-brand-blue hover:bg-brand-blue/5 flex w-full items-center justify-center gap-1 rounded-full border px-3 py-1.5 text-[10px] font-semibold transition-all"
                  >
                    <Eye className="h-3 w-3" /> Details
                  </button>
                  <button className="bg-background border-brand-blue/30 text-brand-blue hover:bg-brand-blue/5 flex w-full items-center justify-center gap-1 rounded-full border px-3 py-1.5 text-[10px] font-semibold transition-all">
                    <MessageSquare className="h-3 w-3" /> Message
                  </button>

                  {["pending_proposal", "agreement_reached"].includes(
                    exchange.status,
                  ) && (
                    <CounterOfferModal
                      exchange={exchange}
                      onCounterOffer={counterOffer}
                    />
                  )}

                  {isActionRequiredByMe &&
                    exchange.status === "pending_proposal" && (
                      <button
                        onClick={() =>
                          updateExchangeStatus(exchange.id, "rejected")
                        }
                        className="bg-background border-danger/30 text-danger hover:bg-danger/10 flex w-full items-center justify-center gap-1 rounded-full border px-3 py-1.5 text-[10px] font-semibold transition-all"
                      >
                        <XCircle className="h-3 w-3" /> Decline
                      </button>
                    )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed right-4 bottom-20 flex flex-col gap-3 sm:right-8 sm:bottom-8">
        <button className="bg-background text-foreground hover:bg-muted border-border flex h-12 w-12 items-center justify-center rounded-full border shadow-lg transition-transform hover:scale-105">
          <HelpCircle className="h-5 w-5" />
        </button>
        <button className="bg-primary text-primary-foreground shadow-primary/30 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105">
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>

      {/* Exchange Details Dialog */}
      <Dialog
        open={!!selectedExchange}
        onOpenChange={(open) => !open && setSelectedExchange(null)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Exchange Details</DialogTitle>
          </DialogHeader>
          {selectedExchange && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="mb-1 text-sm font-bold">Exchange ID</h4>
                  <p className="text-muted-foreground text-xs">
                    {selectedExchange.id}
                  </p>
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-bold">Status</h4>
                  <p className="text-muted-foreground text-xs capitalize">
                    {selectedExchange.status.replace("_", " ")}
                  </p>
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-bold">Meeting Location</h4>
                  <p className="text-muted-foreground text-xs">
                    {selectedExchange.meetLocation || "Not set"}
                  </p>
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-bold">Meeting Time</h4>
                  <p className="text-muted-foreground text-xs">
                    {selectedExchange.meetDate
                      ? `${selectedExchange.meetDate} at 4:00 PM`
                      : "Not set"}
                  </p>
                </div>
              </div>

              <div className="border-border/50 mt-4 border-t pt-4">
                <h4 className="mb-3 text-sm font-bold">Books Exchanged</h4>
                <div className="flex flex-col gap-3">
                  <div className="bg-muted/30 border-border/50 flex items-center justify-between rounded-lg border p-3">
                    <span className="text-brand-blue text-xs font-semibold">
                      You Give:
                    </span>
                    <span className="line-clamp-1 max-w-[60%] text-right text-xs font-medium">
                      {selectedExchange.proposerId === "current-user"
                        ? selectedExchange.offeredBookTitle
                        : selectedExchange.requestedBookTitle}
                    </span>
                  </div>
                  <div className="bg-muted/30 border-border/50 flex items-center justify-between rounded-lg border p-3">
                    <span className="text-xs font-semibold text-emerald-600">
                      You Receive:
                    </span>
                    <span className="line-clamp-1 max-w-[60%] text-right text-xs font-medium">
                      {selectedExchange.proposerId === "current-user"
                        ? selectedExchange.requestedBookTitle
                        : selectedExchange.offeredBookTitle}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <button
              onClick={() => setSelectedExchange(null)}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 w-full rounded-xl px-4 py-2 text-sm font-bold transition-all"
            >
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CounterOfferModal({
  exchange,
  onCounterOffer,
  onClick,
}: {
  exchange: ExchangeOrder;
  onCounterOffer: (
    id: string,
    details: NonNullable<ExchangeOrder["counterOfferDetails"]>,
  ) => void;
  onClick?: (e: React.MouseEvent) => void;
}) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(
    exchange.counterOfferDetails?.proposedLocation ||
      exchange.meetLocation ||
      "",
  );
  const [date, setDate] = useState(
    exchange.counterOfferDetails?.proposedDate || exchange.meetDate || "",
  );
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCounterOffer(exchange.id, {
      proposedLocation: location,
      proposedDate: date,
      message,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onClick={(e) => e.stopPropagation()} className="flex w-full">
        <DialogTrigger asChild>
          <button
            onClick={onClick}
            className="bg-background border-border/80 text-foreground hover:bg-muted flex w-full items-center justify-center gap-1 rounded-full border px-3 py-1.5 text-[10px] font-semibold transition-all"
          >
            Change Location
          </button>
        </DialogTrigger>
      </div>
      <DialogContent
        className="sm:max-w-[425px]"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Propose New Meeting Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 text-sm">
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="e.g. Dhanmondi Lake 3:00 PM"
              />
            </div>
            <div className="space-y-2">
              <Label>Date & Time</Label>
              <Input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                placeholder="e.g. Oct 24, 2024"
              />
            </div>
            <div className="space-y-2">
              <Label>Message to Partner (Optional)</Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Let them know why you are changing the meetup details..."
              />
            </div>
          </div>
          <DialogFooter>
            <button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[40px] items-center justify-center rounded-xl px-4 py-2 text-sm font-bold shadow-2xs transition-all"
            >
              Send New Details
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
