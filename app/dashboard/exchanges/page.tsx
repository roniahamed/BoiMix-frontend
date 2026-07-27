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
  MapPin,
  CalendarDays,
  Star,
  MessageCircle,
  Clock,
  ShieldCheck,
  MoreVertical,
  Check,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

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
  const { exchanges, updateExchangeStatus } = useExchangeStore();
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
                className="bg-card border-border/60 relative flex flex-col items-start gap-4 overflow-hidden rounded-xl border p-3 shadow-xs transition-colors sm:gap-6 sm:px-4 sm:py-5 xl:flex-row xl:items-center"
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
                  <div className="relative flex w-full flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-2 xl:flex-col xl:gap-3">
                    <div className="flex min-w-0 flex-1 items-start gap-2.5">
                      <Image
                        src={partnerInfo.avatar}
                        alt={partnerInfo.name}
                        width={40}
                        height={40}
                        className="border-border h-10 w-10 shrink-0 rounded-full border"
                      />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h4 className="truncate text-sm leading-tight font-bold">
                              {partnerInfo.name}
                            </h4>
                            <span className="flex shrink-0 items-center text-[11px] font-semibold text-amber-500">
                              <Star className="mr-0.5 h-3 w-3 fill-current" />
                              {partnerInfo.rating}
                              <span className="text-muted-foreground ml-1 hidden font-normal sm:inline">
                                ({partnerInfo.reviews})
                              </span>
                            </span>
                          </div>
                          <button className="text-muted-foreground ml-2 sm:hidden">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="text-muted-foreground mt-1.5 flex items-center gap-3 text-[10px] sm:hidden">
                          {exchange.meetDate && (
                            <>
                              <div className="flex items-center gap-1">
                                <CalendarDays className="h-3 w-3 shrink-0 text-blue-500" />
                                <span className="truncate">
                                  {exchange.meetDate}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 shrink-0 text-orange-500" />
                                <span className="truncate">4:00 PM</span>
                              </div>
                            </>
                          )}
                          {exchange.meetLocation && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 shrink-0 text-red-500" />
                              <span className="truncate">
                                {exchange.meetLocation}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="text-muted-foreground mt-2 hidden text-[10px] leading-snug sm:block">
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
                      <div className="text-muted-foreground border-border/40 hidden min-w-[100px] shrink-0 flex-col gap-1.5 text-[10px] sm:flex sm:border-l sm:pl-3 xl:border-t xl:border-l-0 xl:pt-3 xl:pl-0">
                        <div className="text-foreground flex items-center gap-1.5 font-medium">
                          <MapPin className="h-3 w-3 shrink-0 text-red-500" />
                          <span className="line-clamp-1 break-words">
                            {exchange.meetLocation}
                          </span>
                        </div>
                        {exchange.meetDate && (
                          <>
                            <div className="flex items-center gap-1.5">
                              <CalendarDays className="h-3 w-3 shrink-0 text-blue-500" />
                              <span className="line-clamp-1 break-words">
                                {exchange.meetDate}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3 w-3 shrink-0 text-orange-500" />
                              <span className="line-clamp-1 break-words">
                                4:00 PM
                              </span>
                            </div>
                          </>
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
                      <div className="flex w-full flex-col items-center text-center sm:items-start sm:text-left">
                        <span className="text-brand-blue mb-1.5 hidden text-[9px] font-extrabold tracking-wider uppercase sm:block">
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
                          <div className="hidden min-w-0 flex-col sm:flex">
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
                      <div className="flex w-full flex-col items-center text-center sm:items-start sm:text-left">
                        <span className="mb-1.5 hidden text-[9px] font-extrabold tracking-wider text-emerald-600 uppercase sm:block">
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
                          <div className="hidden min-w-0 flex-col sm:flex">
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
                <div className="mt-2 flex w-full shrink-0 flex-col gap-2 sm:grid sm:grid-cols-3 xl:mt-0 xl:flex xl:w-[140px] xl:flex-col">
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
                    className="bg-background border-brand-blue/30 text-brand-blue hover:bg-brand-blue/5 flex w-full items-center justify-center gap-1 rounded-full border px-3 py-1.5 text-[10px] font-semibold transition-all sm:col-span-3 xl:col-span-1"
                  >
                    <Eye className="h-3 w-3" /> Details
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Exchange Details Dialog */}
      <Dialog
        open={!!selectedExchange}
        onOpenChange={(open) => !open && setSelectedExchange(null)}
      >
        <DialogContent className="dark:bg-background h-[100dvh] max-h-[100dvh] w-full gap-0 overflow-hidden rounded-none bg-[#F8FAFC] p-0 sm:h-auto sm:max-h-[85vh] sm:max-w-[700px] sm:rounded-2xl">
          <DialogTitle className="sr-only">Exchange Details</DialogTitle>

          {selectedExchange &&
            (() => {
              const isOwner = selectedExchange.ownerId === "current-user";
              const partnerId = isOwner
                ? selectedExchange.proposerId
                : selectedExchange.ownerId;
              const partnerInfo = MOCK_USERS[partnerId] || {
                name: "Unknown",
                avatar: "https://i.pravatar.cc/150",
                rating: "0.0",
                reviews: 0,
              };
              const myBookTitle = isOwner
                ? selectedExchange.requestedBookTitle
                : selectedExchange.offeredBookTitle;
              const theirBookTitle = isOwner
                ? selectedExchange.offeredBookTitle
                : selectedExchange.requestedBookTitle;
              const myBookImage = isOwner
                ? selectedExchange.requestedBookImage
                : selectedExchange.offeredBookImage;
              const theirBookImage = isOwner
                ? selectedExchange.offeredBookImage
                : selectedExchange.requestedBookImage;
              const myBookMock = myBookTitle.toLowerCase().includes("book")
                ? MOCK_BOOKS[`book${(myBookTitle.length % 3) + 1}`]
                : MOCK_BOOKS["book1"];
              const myBookAuthor = myBookMock?.author || "Unknown Author";
              const theirBookMock = MOCK_BOOKS["book1"];
              const theirBookAuthor = theirBookMock?.author || "Unknown Author";

              // Quick status derivation for details
              const statusMap: Record<
                string,
                { label: string; color: string }
              > = {
                pending_proposal: {
                  label: "Waiting for You",
                  color: "bg-amber-100 text-amber-700 border-amber-200",
                },
                counter_offered: {
                  label: "Waiting for Partner",
                  color: "bg-blue-100 text-blue-700 border-blue-200",
                },
                agreement_reached: {
                  label: "Ready for Meetup",
                  color: "bg-emerald-100 text-emerald-700 border-emerald-200",
                },
                handed_over: {
                  label: "Handed Over",
                  color: "bg-emerald-100 text-emerald-700 border-emerald-200",
                },
                completed: {
                  label: "Completed",
                  color: "bg-gray-100 text-gray-700 border-gray-200",
                },
                cancelled: {
                  label: "Cancelled",
                  color: "bg-red-100 text-red-700 border-red-200",
                },
              };
              const sBadge =
                statusMap[selectedExchange.status] ||
                statusMap.pending_proposal;

              return (
                <div className="h-full max-h-[100dvh] overflow-y-auto p-4 pb-20 sm:max-h-[85vh] sm:p-6 sm:pb-10">
                  {/* Status Card */}
                  <div className="flex flex-col gap-4 border-b py-5">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground bg-muted/50 rounded px-2 py-1 font-mono text-[11px] font-bold tracking-wider">
                        {selectedExchange.id.substring(0, 8).toUpperCase()}
                      </span>
                      <div
                        className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${sBadge.color}`}
                      >
                        <Clock className="h-3 w-3" /> {sBadge.label}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image
                          src={partnerInfo.avatar}
                          alt={partnerInfo.name}
                          width={40}
                          height={40}
                          className="border-border rounded-full border"
                        />
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm leading-tight font-bold">
                              {partnerInfo.name}
                            </h4>
                            <span className="flex items-center gap-1 rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600">
                              <ShieldCheck className="h-3 w-3" /> 98% Trust
                              Score
                            </span>
                          </div>
                          <span className="mt-0.5 flex items-center text-[11px] font-bold text-amber-500">
                            <Star className="mr-0.5 h-3 w-3 fill-current" />{" "}
                            {partnerInfo.rating}{" "}
                            <span className="text-muted-foreground ml-1 font-normal">
                              ({partnerInfo.reviews} reviews)
                            </span>
                          </span>
                        </div>
                      </div>
                      <button className="text-brand-blue border-border hover:bg-muted hidden rounded-full border px-3 py-1.5 text-[10px] font-bold sm:block">
                        View Profile
                      </button>
                    </div>
                  </div>

                  {/* Books Card */}
                  <div className="border-b py-5">
                    <h3 className="mb-4 text-sm font-bold">Books</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-1 flex-col items-center text-center">
                        <span className="text-brand-blue mb-2 text-[10px] font-extrabold tracking-wider uppercase">
                          You Give
                        </span>
                        <Image
                          src={myBookImage}
                          alt={myBookTitle}
                          width={64}
                          height={96}
                          className="mb-2 rounded object-cover shadow-sm"
                        />
                        <h5 className="line-clamp-2 text-[11px] leading-tight font-bold">
                          {myBookTitle}
                        </h5>
                        <p className="text-muted-foreground mt-0.5 text-[10px]">
                          {myBookAuthor}
                        </p>
                        <span className="mt-1 rounded border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-600">
                          Like New
                        </span>
                      </div>

                      <Repeat2 className="text-muted-foreground mx-2 h-5 w-5 shrink-0 opacity-50" />

                      <div className="flex flex-1 flex-col items-center text-center">
                        <span className="mb-2 text-[10px] font-extrabold tracking-wider text-emerald-600 uppercase">
                          You Receive
                        </span>
                        <Image
                          src={theirBookImage}
                          alt={theirBookTitle}
                          width={64}
                          height={96}
                          className="mb-2 rounded object-cover shadow-sm"
                        />
                        <h5 className="line-clamp-2 text-[11px] leading-tight font-bold">
                          {theirBookTitle}
                        </h5>
                        <p className="text-muted-foreground mt-0.5 text-[10px]">
                          {theirBookAuthor}
                        </p>
                        <span className="mt-1 rounded border border-blue-100 bg-blue-50 px-2 py-0.5 text-[9px] font-semibold text-blue-600">
                          Good
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Exchange Timeline */}
                  <div className="overflow-x-auto border-b py-5">
                    <h3 className="mb-6 text-sm font-bold">
                      Exchange Timeline
                    </h3>
                    <div className="relative flex w-full min-w-[280px] items-center justify-between px-2 pb-2">
                      <div className="bg-border absolute top-[11px] left-0 h-0.5 w-full rounded-full" />

                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm ring-4 ring-emerald-500/20">
                          <CheckCircle2 className="h-3 w-3" />
                        </div>
                        <span className="text-foreground text-center text-[10px] font-bold">
                          Agreement
                          <br />
                          <span className="text-muted-foreground font-normal">
                            Oct 25
                          </span>
                        </span>
                      </div>

                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="border-brand-blue text-brand-blue flex h-6 w-6 items-center justify-center rounded-full border-2 bg-white shadow-sm ring-4 ring-blue-500/10">
                          <Clock className="h-3 w-3" />
                        </div>
                        <span className="text-foreground text-center text-[10px] font-bold">
                          Meetup
                          <br />
                          <span className="text-muted-foreground font-normal">
                            Oct 28
                          </span>
                        </span>
                      </div>

                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="border-muted bg-muted/30 text-muted-foreground flex h-6 w-6 items-center justify-center rounded-full border-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        </div>
                        <span className="text-muted-foreground text-center text-[10px] font-medium">
                          Handover
                          <br />
                          <span className="opacity-0">-</span>
                        </span>
                      </div>

                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="border-muted bg-muted/30 text-muted-foreground flex h-6 w-6 items-center justify-center rounded-full border-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        </div>
                        <span className="text-muted-foreground text-center text-[10px] font-medium">
                          Completed
                          <br />
                          <span className="opacity-0">-</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Meetup Details */}
                  <div className="border-b py-5">
                    <h3 className="mb-3 text-sm font-bold">Meetup Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-muted-foreground flex items-center gap-2 text-[11px]">
                          <MapPin className="text-foreground h-3.5 w-3.5" />{" "}
                          <span>
                            {selectedExchange.meetLocation || "Not Set"}
                          </span>
                        </div>
                        <button className="rounded bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600">
                          Open Map
                        </button>
                      </div>
                      <div className="text-muted-foreground flex items-center gap-2 text-[11px]">
                        <CalendarDays className="text-foreground h-3.5 w-3.5" />{" "}
                        <span>Tomorrow, Oct 28</span>
                      </div>
                      <div className="text-muted-foreground flex items-center gap-2 text-[11px]">
                        <Clock className="text-foreground h-3.5 w-3.5" />{" "}
                        <span>4:00 PM</span>
                      </div>
                    </div>
                    <div className="text-brand-blue mt-4 flex gap-2 rounded-lg bg-blue-50 p-3 text-[11px] dark:bg-blue-900/20 dark:text-blue-300">
                      <MessageCircle className="h-4 w-4 shrink-0" />
                      <span>
                        <strong>Notes:</strong> Meet near the main gate.
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="bg-card flex flex-col gap-2 rounded-xl border p-4 shadow-sm">
                    <h3 className="mb-1 text-sm font-bold">Actions</h3>

                    {/* agreement_reached → Confirm Handover */}
                    {selectedExchange.status === "agreement_reached" && (
                      <button
                        onClick={() => {
                          updateExchangeStatus(
                            selectedExchange.id,
                            "handed_over",
                          );
                          setSelectedExchange(null);
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                      >
                        <Check className="h-4 w-4" /> Confirm Handover
                      </button>
                    )}

                    {/* handed_over → Mark Completed only */}
                    {selectedExchange.status === "handed_over" && (
                      <button
                        onClick={() => {
                          updateExchangeStatus(
                            selectedExchange.id,
                            "completed",
                          );
                          setSelectedExchange(null);
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                      >
                        <Check className="h-4 w-4" /> Mark Completed
                      </button>
                    )}

                    {/* completed → all 3 steps done → Review */}
                    {selectedExchange.status === "completed" && (
                      <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-amber-300 bg-amber-50 py-2.5 text-sm font-bold text-amber-700 transition-colors hover:bg-amber-100 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />{" "}
                        Write a Review
                      </button>
                    )}

                    <div className="mt-1 flex w-full flex-wrap gap-2">
                      <button className="border-border hover:bg-muted text-brand-blue flex min-w-[100px] flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-sm font-bold whitespace-nowrap transition-colors">
                        <MessageCircle className="h-4 w-4" /> Message
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
