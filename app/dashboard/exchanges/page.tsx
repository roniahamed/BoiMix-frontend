"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  CalendarDays,
  MessageSquare,
  Check,
  X,
  Handshake,
  AlertTriangle,
  Repeat2,
} from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

import {
  useExchangeStore,
  ExchangeOrder,
  ExchangeStatus,
} from "@/lib/store/use-exchange-store";
import { toast } from "sonner";

export default function ExchangesDashboard() {
  const {
    exchanges,
    updateExchangeStatus,
    counterOffer,
    acceptCounterOffer,
    rejectCounterOffer,
    openDispute,
  } = useExchangeStore();
  const currentUser = "current-user";

  const incomingOffers = exchanges.filter((e) => e.ownerId === currentUser);
  const myProposals = exchanges.filter((e) => e.proposerId === currentUser);

  const getStatusBadge = (status: ExchangeStatus) => {
    switch (status) {
      case "pending_proposal":
        return (
          <Badge
            variant="secondary"
            className="bg-amber-100 text-amber-800 hover:bg-amber-100/80"
          >
            Pending Review
          </Badge>
        );
      case "counter_offered":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 hover:bg-blue-100/80"
          >
            Counter Offered
          </Badge>
        );
      case "agreement_reached":
        return (
          <Badge
            variant="secondary"
            className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80"
          >
            Agreement Reached
          </Badge>
        );
      case "handed_over":
        return (
          <Badge
            variant="secondary"
            className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100/80"
          >
            Handed Over
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="default"
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            Completed
          </Badge>
        );
      case "disputed":
        return <Badge variant="destructive">Disputed</Badge>;
      case "rejected":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Rejected
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderExchangeCard = (exchange: ExchangeOrder, isIncoming: boolean) => {
    return (
      <Card key={exchange.id} className="overflow-hidden">
        <div className="bg-muted/30 flex items-center justify-between border-b px-6 py-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-muted-foreground">Exchange ID:</span>{" "}
            {exchange.id}
          </div>
          {getStatusBadge(exchange.status)}
        </div>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {/* The books */}
            <div className="flex flex-1 items-center gap-4">
              <div className="flex flex-col items-center">
                <span className="text-muted-foreground mb-2 text-xs font-semibold uppercase">
                  {isIncoming ? "Your Book" : "They Have"}
                </span>
                <div className="relative aspect-[3/4] w-20 overflow-hidden rounded-md border shadow-sm">
                  <Image
                    src={exchange.requestedBookImage}
                    alt={exchange.requestedBookTitle}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="mt-2 max-w-[80px] truncate text-xs font-semibold">
                  {exchange.requestedBookTitle}
                </span>
              </div>

              <Repeat2 className="text-muted-foreground size-5" />

              <div className="flex flex-col items-center">
                <span className="text-muted-foreground mb-2 text-xs font-semibold uppercase">
                  {isIncoming ? "They Offer" : "You Offer"}
                </span>
                <div className="relative aspect-[3/4] w-20 overflow-hidden rounded-md border shadow-sm">
                  <Image
                    src={exchange.offeredBookImage}
                    alt={exchange.offeredBookTitle}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="mt-2 max-w-[80px] truncate text-xs font-semibold">
                  {exchange.offeredBookTitle}
                </span>
              </div>
            </div>

            {/* Meetup Details */}
            {exchange.counterOfferDetails && (
              <div className="bg-muted/30 flex-1 space-y-2 rounded-lg border p-4">
                <h4 className="text-sm font-semibold">Meetup Details</h4>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <CalendarDays className="size-4" />
                  <span>{exchange.counterOfferDetails.proposedDate}</span>
                </div>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <MapPin className="size-4" />
                  <span>{exchange.counterOfferDetails.proposedLocation}</span>
                </div>
                {exchange.counterOfferDetails.message && (
                  <div className="text-muted-foreground mt-2 flex items-start gap-2 text-sm">
                    <MessageSquare className="mt-0.5 size-4 shrink-0" />
                    <span className="italic">
                      &quot;{exchange.counterOfferDetails.message}&quot;
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="bg-muted/10 border-t p-4 sm:px-6">
          <div className="flex w-full flex-wrap gap-2">
            {/* Actions for Incoming Offers */}
            {isIncoming && exchange.status === "pending_proposal" && (
              <>
                <Button
                  size="sm"
                  onClick={() =>
                    updateExchangeStatus(exchange.id, "agreement_reached")
                  }
                >
                  <Check className="mr-2 size-4" /> Accept Exchange
                </Button>
                <CounterOfferModal
                  exchange={exchange}
                  onCounterOffer={counterOffer}
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateExchangeStatus(exchange.id, "rejected")}
                >
                  <X className="mr-2 size-4" /> Decline
                </Button>
              </>
            )}

            {/* Actions for Outgoing Proposals (Counter-Offered state) */}
            {!isIncoming && exchange.status === "counter_offered" && (
              <>
                <Button
                  size="sm"
                  onClick={() => acceptCounterOffer(exchange.id)}
                >
                  <Check className="mr-2 size-4" /> Accept Counter-Offer
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => rejectCounterOffer(exchange.id)}
                >
                  <X className="mr-2 size-4" /> Decline
                </Button>
              </>
            )}

            {/* Post-Agreement Actions (Both) */}
            {exchange.status === "agreement_reached" && (
              <Button
                size="sm"
                onClick={() => updateExchangeStatus(exchange.id, "handed_over")}
              >
                <Handshake className="mr-2 size-4" /> Confirm Handover
              </Button>
            )}

            {exchange.status === "handed_over" && (
              <Button
                size="sm"
                onClick={() => updateExchangeStatus(exchange.id, "completed")}
              >
                <Check className="mr-2 size-4" /> Complete Exchange
              </Button>
            )}

            {["agreement_reached", "handed_over"].includes(exchange.status) && (
              <Button
                size="sm"
                variant="outline"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive ml-auto"
                onClick={() => openDispute(exchange.id, "Issue with exchange")}
              >
                <AlertTriangle className="mr-2 size-4" /> Dispute
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <div>
          <h1 className="type-heading text-2xl font-bold tracking-tight">
            Exchange Requests
          </h1>
          <p className="text-muted-foreground">
            Manage your incoming exchange offers and outgoing proposals.
          </p>
        </div>

        <Tabs defaultValue="incoming" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="incoming">
              Incoming Offers
              {incomingOffers.filter((e) => e.status === "pending_proposal")
                .length > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-primary text-primary-foreground ml-2"
                >
                  {
                    incomingOffers.filter(
                      (e) => e.status === "pending_proposal",
                    ).length
                  }
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="outgoing">My Proposals</TabsTrigger>
          </TabsList>

          <TabsContent value="incoming" className="space-y-4">
            {incomingOffers.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="bg-muted mb-4 rounded-full p-4">
                    <Repeat2 className="text-muted-foreground size-8" />
                  </div>
                  <h3 className="text-lg font-semibold">No incoming offers</h3>
                  <p className="text-muted-foreground">
                    You don&apos;t have any exchange requests yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              incomingOffers.map((exchange) =>
                renderExchangeCard(exchange, true),
              )
            )}
          </TabsContent>

          <TabsContent value="outgoing" className="space-y-4">
            {myProposals.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="bg-muted mb-4 rounded-full p-4">
                    <Repeat2 className="text-muted-foreground size-8" />
                  </div>
                  <h3 className="text-lg font-semibold">No proposals sent</h3>
                  <p className="text-muted-foreground">
                    Start exploring to find books you want to exchange.
                  </p>
                </CardContent>
              </Card>
            ) : (
              myProposals.map((exchange) => renderExchangeCard(exchange, false))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

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
    toast.success("Counter-offer sent successfully.");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">
          Propose Changes
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Propose Counter-Offer</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Date & Time</Label>
              <Input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Explain why you are changing the details..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Send Counter-Offer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
