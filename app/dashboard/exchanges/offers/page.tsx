"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  CalendarDays,
  MessageSquare,
  Check,
  X,
  Repeat2,
  ArrowLeft,
  Clock,
  BookOpen,
  Send,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import {
  useExchangeStore,
  ExchangeOrder,
  ExchangeStatus,
} from "@/lib/store/use-exchange-store";
import { toast } from "sonner";

/* ─── Mock partner data ─── */
const MOCK_PARTNERS: Record<
  string,
  {
    name: string;
    avatar: string;
    rating: string;
    reviews: number;
    since: string;
  }
> = {
  jamal456: {
    name: "Jamal Rahman",
    avatar: "https://i.pravatar.cc/150?u=jamal456",
    rating: "4.8",
    reviews: 24,
    since: "2023",
  },
  hasan789: {
    name: "Hasan Ali",
    avatar: "https://i.pravatar.cc/150?u=hasan789",
    rating: "4.5",
    reviews: 12,
    since: "2024",
  },
  kamal123: {
    name: "Kamal Hossain",
    avatar: "https://i.pravatar.cc/150?u=kamal123",
    rating: "4.9",
    reviews: 38,
    since: "2022",
  },
};

/* ─── Status configuration ─── */
const getStatusBadge = (status: ExchangeStatus, isMyAction: boolean) => {
  if (status === "pending_proposal") {
    return isMyAction
      ? {
          label: "Waiting for You",
          color: "text-amber-600 bg-amber-500/15 border-amber-500/20",
          icon: "🟡",
          bar: "bg-amber-400",
        }
      : {
          label: "Awaiting Response",
          color: "text-blue-600 bg-blue-500/10 border-blue-500/20",
          icon: "🔵",
          bar: "bg-blue-400",
        };
  }
  if (status === "counter_offered") {
    return isMyAction
      ? {
          label: "Counter Received",
          color: "text-purple-600 bg-purple-500/10 border-purple-500/20",
          icon: "🟣",
          bar: "bg-purple-400",
        }
      : {
          label: "Counter Sent",
          color: "text-blue-600 bg-blue-500/10 border-blue-500/20",
          icon: "🔵",
          bar: "bg-blue-400",
        };
  }
  return {
    label: status,
    color: "text-muted-foreground bg-muted border-border",
    icon: "⚪",
    bar: "bg-muted",
  };
};

/* ─── Empty state component ─── */
const EmptyState = ({ type }: { type: "incoming" | "outgoing" }) => (
  <div className="border-border/50 flex flex-col items-center justify-center rounded-2xl border py-14 text-center">
    <div className="bg-muted/40 text-muted-foreground mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
      {type === "incoming" ? (
        <BookOpen className="size-7" />
      ) : (
        <Send className="size-7" />
      )}
    </div>
    <h3 className="text-base font-bold">
      {type === "incoming" ? "No incoming offers" : "No proposals sent"}
    </h3>
    <p className="text-muted-foreground mt-1 max-w-[260px] text-sm">
      {type === "incoming"
        ? "When someone wants your book, it will appear here."
        : "Browse books and send an exchange request to get started."}
    </p>
    {type === "outgoing" && (
      <Link
        href="/books"
        className="bg-primary text-primary-foreground mt-4 rounded-full px-4 py-1.5 text-xs font-semibold shadow-sm"
      >
        Browse Books
      </Link>
    )}
  </div>
);

/* ─── Main page ─── */
export default function ExchangeOffersPage() {
  const {
    exchanges,
    updateExchangeStatus,
    counterOffer,
    acceptCounterOffer,
    rejectCounterOffer,
  } = useExchangeStore();
  const currentUser = "current-user";

  const incomingOffers = exchanges.filter(
    (e) =>
      e.ownerId === currentUser &&
      (e.status === "pending_proposal" || e.status === "counter_offered"),
  );
  const myProposals = exchanges.filter(
    (e) =>
      e.proposerId === currentUser &&
      (e.status === "pending_proposal" || e.status === "counter_offered"),
  );

  const pendingCount = incomingOffers.filter(
    (e) => e.status === "pending_proposal",
  ).length;

  const renderCard = (exchange: ExchangeOrder, isIncoming: boolean) => {
    const isMyAction =
      (isIncoming && exchange.status === "pending_proposal") ||
      (!isIncoming && exchange.status === "counter_offered");

    const badge = getStatusBadge(exchange.status, isMyAction);
    const partnerId = isIncoming ? exchange.proposerId : exchange.ownerId;
    const partner = MOCK_PARTNERS[partnerId] || {
      name: "Book User",
      avatar: `https://i.pravatar.cc/150?u=${partnerId}`,
      rating: "4.5",
      reviews: 5,
      since: "2024",
    };

    const myBookTitle = isIncoming
      ? exchange.requestedBookTitle
      : exchange.offeredBookTitle;
    const myBookImg = isIncoming
      ? exchange.requestedBookImage
      : exchange.offeredBookImage;
    const theirBookTitle = isIncoming
      ? exchange.offeredBookTitle
      : exchange.requestedBookTitle;
    const theirBookImg = isIncoming
      ? exchange.offeredBookImage
      : exchange.requestedBookImage;

    const meetLocation =
      exchange.counterOfferDetails?.proposedLocation || exchange.meetLocation;
    const meetDate =
      exchange.counterOfferDetails?.proposedDate || exchange.meetDate;

    return (
      <div
        key={exchange.id}
        className="bg-card border-border/60 relative flex flex-col items-start gap-4 overflow-hidden rounded-xl border p-3 shadow-xs transition-colors sm:gap-6 sm:px-4 sm:py-5 xl:flex-row xl:items-center"
      >
        {/* Left color bar */}
        <div className={cn("absolute top-0 bottom-0 left-0 w-1", badge.bar)} />

        {/* ── Col 1: Partner & Status ── */}
        <div className="border-border/40 flex w-full shrink-0 flex-col pl-2 xl:w-[240px] xl:border-r xl:pr-6">
          {/* ID + Status */}
          <div className="mb-3 flex items-center gap-2">
            <span className="text-muted-foreground bg-muted/30 rounded px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider">
              {exchange.id.substring(0, 10).toUpperCase()}
            </span>
            <div
              className={cn(
                "flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold",
                badge.color,
              )}
            >
              <span>{badge.icon}</span>
              {badge.label}
            </div>
          </div>

          {/* Partner info */}
          <div className="flex items-center gap-2.5">
            <Image
              src={partner.avatar}
              alt={partner.name}
              width={36}
              height={36}
              className="border-border h-9 w-9 shrink-0 rounded-full border object-cover"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="truncate text-sm leading-tight font-bold">
                  {partner.name}
                </h4>
                <span className="flex shrink-0 items-center text-[11px] font-semibold text-amber-500">
                  <Star className="mr-0.5 h-3 w-3 fill-current" />
                  {partner.rating}
                </span>
              </div>
              <p className="text-muted-foreground text-[10px]">
                {partner.reviews} reviews · Since {partner.since}
              </p>
            </div>
          </div>

          {/* Meetup info — mobile visible */}
          {meetLocation && (
            <div className="text-muted-foreground mt-2.5 flex flex-col gap-1 xl:hidden">
              <div className="flex items-center gap-1.5 text-[10px]">
                <MapPin className="h-3 w-3 shrink-0 text-red-500" />
                <span className="line-clamp-1">{meetLocation}</span>
              </div>
              {meetDate && (
                <div className="flex items-center gap-1.5 text-[10px]">
                  <CalendarDays className="h-3 w-3 shrink-0 text-blue-500" />
                  <span>{meetDate}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-600">
                <svg
                  className="h-3 w-3 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0V3m0 18l6-6m-6 6l-6-6"
                  />
                </svg>
                <span>2.1 km away</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Col 2: Books ── */}
        <div className="border-border/40 flex w-full shrink-0 items-center justify-between gap-2 border-y py-4 xl:w-[300px] xl:border-y-0 xl:border-r xl:py-0 xl:pr-6">
          {/* My book */}
          <div className="flex min-w-0 flex-1 flex-col items-center gap-1 text-center sm:items-start sm:text-left">
            <span className="text-brand-blue mb-1 hidden text-[9px] font-extrabold tracking-wider uppercase sm:block">
              {isIncoming ? "Your Book" : "They Have"}
            </span>
            <div className="flex gap-2">
              <Image
                src={myBookImg}
                alt={myBookTitle}
                width={44}
                height={64}
                className="h-16 w-11 shrink-0 rounded object-cover shadow-sm"
              />
              <div className="hidden min-w-0 flex-col justify-center sm:flex">
                <h5 className="line-clamp-2 text-[11px] leading-tight font-bold">
                  {myBookTitle}
                </h5>
              </div>
            </div>
          </div>

          <Repeat2 className="text-muted-foreground h-4 w-4 shrink-0 opacity-40" />

          {/* Their book */}
          <div className="flex min-w-0 flex-1 flex-col items-center gap-1 text-center sm:items-start sm:text-left">
            <span className="mb-1 hidden text-[9px] font-extrabold tracking-wider text-emerald-600 uppercase sm:block">
              {isIncoming ? "They Offer" : "Your Book"}
            </span>
            <div className="flex gap-2">
              <Image
                src={theirBookImg}
                alt={theirBookTitle}
                width={44}
                height={64}
                className="h-16 w-11 shrink-0 rounded object-cover shadow-sm"
              />
              <div className="hidden min-w-0 flex-col justify-center sm:flex">
                <h5 className="line-clamp-2 text-[11px] leading-tight font-bold">
                  {theirBookTitle}
                </h5>
              </div>
            </div>
          </div>
        </div>

        {/* ── Col 3: Meetup (desktop) ── */}
        {meetLocation && (
          <div className="border-border/40 text-muted-foreground hidden w-[160px] shrink-0 flex-col gap-2 text-[10px] xl:flex xl:border-r xl:pr-6">
            <span className="text-muted-foreground mb-1 text-[9px] font-extrabold tracking-wider uppercase">
              Meetup
            </span>
            <div className="text-foreground flex items-start gap-1.5 font-medium">
              <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-red-500" />
              <span className="line-clamp-2">{meetLocation}</span>
            </div>
            {meetDate && (
              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-3 w-3 shrink-0 text-blue-500" />
                <span>{meetDate}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 font-medium text-emerald-600">
              <svg
                className="h-3 w-3 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>2.1 km away</span>
            </div>
            {exchange.counterOfferDetails?.message && (
              <div className="flex items-start gap-1.5">
                <MessageSquare className="text-primary/60 mt-0.5 h-3 w-3 shrink-0" />
                <span className="line-clamp-2 italic">
                  &quot;{exchange.counterOfferDetails.message}&quot;
                </span>
              </div>
            )}
          </div>
        )}

        {/* ── Col 4: Actions ── */}
        <div className="flex w-full shrink-0 flex-col gap-2 sm:flex-row xl:w-[130px] xl:flex-col">
          {/* Incoming + pending */}
          {isIncoming && exchange.status === "pending_proposal" && (
            <>
              <button
                onClick={() => {
                  updateExchangeStatus(exchange.id, "agreement_reached");
                  toast.success("Exchange accepted!");
                }}
                className="bg-brand-blue hover:bg-brand-blue/90 w-full rounded-full px-3 py-1.5 text-center text-[10px] font-bold text-white shadow-sm transition-all"
              >
                <Check className="mr-1 inline h-3 w-3" />
                Accept
              </button>
              <CounterOfferModal
                exchange={exchange}
                onCounterOffer={counterOffer}
              />
              <button
                onClick={() => {
                  updateExchangeStatus(exchange.id, "rejected");
                  toast.error("Declined.");
                }}
                className="border-border text-muted-foreground hover:bg-muted w-full rounded-full border px-3 py-1.5 text-center text-[10px] font-semibold transition-all"
              >
                <X className="mr-1 inline h-3 w-3" />
                Decline
              </button>
            </>
          )}

          {/* Outgoing + counter_offered */}
          {!isIncoming && exchange.status === "counter_offered" && (
            <>
              <button
                onClick={() => {
                  acceptCounterOffer(exchange.id);
                  toast.success("Counter-offer accepted!");
                }}
                className="bg-brand-blue hover:bg-brand-blue/90 w-full rounded-full px-3 py-1.5 text-center text-[10px] font-bold text-white shadow-sm transition-all"
              >
                <Check className="mr-1 inline h-3 w-3" />
                Accept Counter
              </button>
              <button
                onClick={() => {
                  rejectCounterOffer(exchange.id);
                  toast.error("Counter-offer declined.");
                }}
                className="border-border text-muted-foreground hover:bg-muted w-full rounded-full border px-3 py-1.5 text-center text-[10px] font-semibold transition-all"
              >
                <X className="mr-1 inline h-3 w-3" />
                Decline
              </button>
            </>
          )}

          {/* Outgoing + pending — no action */}
          {!isIncoming && exchange.status === "pending_proposal" && (
            <p className="text-muted-foreground text-center text-[10px]">
              <Clock className="mr-1 inline h-3 w-3" />
              Waiting for response…
            </p>
          )}

          {/* Incoming + counter_offered — already sent counter */}
          {isIncoming && exchange.status === "counter_offered" && (
            <p className="text-muted-foreground text-center text-[10px]">
              <Send className="mr-1 inline h-3 w-3" />
              Counter sent, awaiting reply…
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="border-border/50 flex flex-col gap-3 border-b pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/exchanges"
            className="text-muted-foreground hover:text-foreground hover:bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-foreground flex items-center gap-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              <Repeat2 className="h-6 w-6 text-indigo-500" />
              Exchange Offers
            </h1>
            <p className="text-muted-foreground mt-0.5 text-xs sm:text-sm">
              Review incoming requests and manage your outgoing proposals.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="incoming" className="w-full">
        <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
          {/* Custom pill tabs */}
          <TabsList className="h-auto gap-2 bg-transparent p-0">
            <TabsTrigger
              value="incoming"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted text-muted-foreground flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-none transition-all data-[state=active]:shadow-md"
            >
              Incoming
              <span className="bg-primary-foreground/20 data-[state=inactive]:bg-background/50 flex h-5 items-center justify-center rounded-full px-2 text-[10px]">
                {incomingOffers.length}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="outgoing"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted text-muted-foreground flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-none transition-all data-[state=active]:shadow-md"
            >
              My Proposals
              <span className="bg-background/50 flex h-5 items-center justify-center rounded-full px-2 text-[10px]">
                {myProposals.length}
              </span>
            </TabsTrigger>
          </TabsList>

          {pendingCount > 0 && (
            <span className="ml-auto flex shrink-0 items-center gap-1.5 self-center rounded-full bg-amber-500/15 px-3 py-1 text-[10px] font-bold text-amber-600">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
              {pendingCount} action{pendingCount > 1 ? "s" : ""} needed
            </span>
          )}
        </div>

        <TabsContent value="incoming" className="mt-4 space-y-4">
          {incomingOffers.length === 0 ? (
            <EmptyState type="incoming" />
          ) : (
            incomingOffers.map((e) => renderCard(e, true))
          )}
        </TabsContent>

        <TabsContent value="outgoing" className="mt-4 space-y-4">
          {myProposals.length === 0 ? (
            <EmptyState type="outgoing" />
          ) : (
            myProposals.map((e) => renderCard(e, false))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ─── Counter Offer Modal ─── */
function CounterOfferModal({
  exchange,
  onCounterOffer,
}: {
  exchange: ExchangeOrder;
  onCounterOffer: (
    id: string,
    details: NonNullable<ExchangeOrder["counterOfferDetails"]>,
  ) => void;
}) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(
    exchange.counterOfferDetails?.proposedLocation || "",
  );
  const [date, setDate] = useState(
    exchange.counterOfferDetails?.proposedDate || "",
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
    toast.success("Counter-offer sent!");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="border-border text-muted-foreground hover:bg-muted w-full rounded-full border px-3 py-1.5 text-center text-[10px] font-semibold transition-all">
          <Repeat2 className="mr-1 inline h-3 w-3" />
          Counter
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Propose Counter-Offer</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Preferred Location</Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Dhanmondi Lake"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Preferred Date &amp; Time</Label>
              <Input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. Oct 28, 2024 at 4:00 PM"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Message (optional)</Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Explain the change…"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">
              <Send className="mr-2 h-3.5 w-3.5" />
              Send Counter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
