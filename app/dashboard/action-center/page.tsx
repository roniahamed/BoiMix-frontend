"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Repeat2,
  BookOpen,
  Clock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useBorrowStore } from "@/lib/store/use-borrow-store";
import { useExchangeStore } from "@/lib/store/use-exchange-store";
import { Card, CardContent } from "@/components/ui/card";

export default function ActionCenterPage() {
  const { orders: borrowOrders } = useBorrowStore();
  const { exchanges } = useExchangeStore();
  const currentUser = "current-user";

  // Compute pending actions
  const pendingBorrowRequests = borrowOrders.filter(
    (o) => o.ownerId === currentUser && o.status === "pending_owner_review",
  );
  const pendingExchangeOffers = exchanges.filter(
    (e) => e.ownerId === currentUser && e.status === "pending_proposal",
  );
  const pendingExchangeCounterOffers = exchanges.filter(
    (e) => e.proposerId === currentUser && e.status === "counter_offered",
  );

  // Active borrowing for "due soon" (mocking due dates for now)
  const activeBorrowedBooks = borrowOrders.filter(
    (o) => o.borrowerId === currentUser && o.status === "borrow_active",
  );

  const totalActions =
    pendingBorrowRequests.length +
    pendingExchangeOffers.length +
    pendingExchangeCounterOffers.length +
    activeBorrowedBooks.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Action Center</h1>
        <p className="text-muted-foreground mt-2">
          Your centralized hub for pending requests, offers, and urgent tasks.
        </p>
      </div>

      {totalActions === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 rounded-full bg-emerald-500/10 p-4 text-emerald-500">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-foreground text-xl font-bold">
              You&apos;re all caught up!
            </h3>
            <p className="text-muted-foreground mt-2 max-w-sm">
              You don&apos;t have any pending requests, offers, or urgent tasks
              at the moment. Great job!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Borrowing & Lending Actions */}
          {(pendingBorrowRequests.length > 0 ||
            activeBorrowedBooks.length > 0) && (
            <div className="space-y-4">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <BookOpen className="h-5 w-5 text-emerald-500" /> Borrow &
                Lending
              </h2>

              <div className="grid gap-3">
                {pendingBorrowRequests.map((order) => (
                  <ActionItem
                    key={order.id}
                    icon={<AlertTriangle className="h-5 w-5" />}
                    iconColor="text-amber-500 bg-amber-500/10"
                    title={`Borrow Request for "${order.bookTitle}"`}
                    subtitle={`Requested by ${order.borrowerId}. Needs your approval.`}
                    tag="Action Required"
                    tagColor="bg-amber-100 text-amber-700"
                    linkHref="/dashboard/lent"
                    linkLabel="Review Request"
                  />
                ))}

                {activeBorrowedBooks.map((order) => (
                  <ActionItem
                    key={order.id}
                    icon={<Clock className="h-5 w-5" />}
                    iconColor="text-blue-500 bg-blue-500/10"
                    title={`Return Due Soon: "${order.bookTitle}"`}
                    subtitle={`Owned by ${order.ownerId}. Please initiate return soon.`}
                    tag="Upcoming Due"
                    tagColor="bg-blue-100 text-blue-700"
                    linkHref="/dashboard/borrowed"
                    linkLabel="View Details"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Exchanges Actions */}
          {(pendingExchangeOffers.length > 0 ||
            pendingExchangeCounterOffers.length > 0) && (
            <div className="space-y-4 border-t pt-4">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Repeat2 className="h-5 w-5 text-[#0397d3]" /> Exchanges
              </h2>

              <div className="grid gap-3">
                {pendingExchangeOffers.map((offer) => (
                  <ActionItem
                    key={offer.id}
                    icon={<Repeat2 className="h-5 w-5" />}
                    iconColor="text-[#0397d3] bg-[#0397d3]/10"
                    title={`New Exchange Offer Received`}
                    subtitle={`${offer.proposerId} wants your "${offer.requestedBookTitle}" in exchange for "${offer.offeredBookTitle}".`}
                    tag="New Offer"
                    tagColor="bg-[#0397d3]/10 text-[#0397d3]"
                    linkHref="/dashboard/exchanges/offers"
                    linkLabel="Review Offer"
                  />
                ))}

                {pendingExchangeCounterOffers.map((offer) => (
                  <ActionItem
                    key={offer.id}
                    icon={<AlertTriangle className="h-5 w-5" />}
                    iconColor="text-purple-500 bg-purple-500/10"
                    title={`Counter-Offer Received`}
                    subtitle={`${offer.ownerId} proposed changes to your exchange for "${offer.requestedBookTitle}".`}
                    tag="Counter Offer"
                    tagColor="bg-purple-100 text-purple-700"
                    linkHref="/dashboard/exchanges/offers"
                    linkLabel="Review Changes"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ActionItem({
  icon,
  iconColor,
  title,
  subtitle,
  tag,
  tagColor,
  linkHref,
  linkLabel,
}: {
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  linkHref: string;
  linkLabel: string;
}) {
  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardContent className="flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
        <div className="flex items-start gap-4">
          <div className={`shrink-0 rounded-full p-3 ${iconColor}`}>{icon}</div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-bold">{title}</h3>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${tagColor}`}
              >
                {tag}
              </span>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>
          </div>
        </div>
        <Link
          href={linkHref}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full shrink-0 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors sm:w-auto"
        >
          {linkLabel}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
