"use client";

import { useState } from "react";
import {
  useExchangeStore,
  ExchangeOrder,
} from "@/lib/store/use-exchange-store";
import { Repeat2 } from "lucide-react";
import { ExchangeCard } from "@/components/dashboard/exchanges/exchange-card";
import { ExchangeDetailsDialog } from "@/components/dashboard/exchanges/exchange-details-dialog";

export default function ActiveExchangesDashboard() {
  const { exchanges } = useExchangeStore();
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
          filteredExchanges.map((exchange) => (
            <ExchangeCard
              key={exchange.id}
              exchange={exchange}
              currentUser={currentUser}
              onSelect={setSelectedExchange}
            />
          ))
        )}
      </div>

      {/* Exchange Details Dialog */}
      <ExchangeDetailsDialog
        selectedExchange={selectedExchange}
        onClose={() => setSelectedExchange(null)}
      />
    </div>
  );
}
