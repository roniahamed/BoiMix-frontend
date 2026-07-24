"use client";

import Image from "next/image";
import {
  MapPin,
  CalendarDays,
  MessageSquare,
  Check,
  Handshake,
  AlertTriangle,
  Repeat2,
} from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  useExchangeStore,
  ExchangeOrder,
  ExchangeStatus,
} from "@/lib/store/use-exchange-store";

export default function ActiveExchangesDashboard() {
  const { exchanges, updateExchangeStatus, openDispute } = useExchangeStore();
  const currentUser = "current-user";

  const activeExchanges = exchanges.filter(
    (e) =>
      (e.ownerId === currentUser || e.proposerId === currentUser) &&
      ["agreement_reached", "handed_over", "completed", "disputed"].includes(
        e.status,
      ),
  );

  const getStatusBadge = (status: ExchangeStatus) => {
    switch (status) {
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
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderExchangeCard = (exchange: ExchangeOrder) => {
    const isOwner = exchange.ownerId === currentUser;

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
                  {isOwner ? "Your Book" : "They Have"}
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
                  {isOwner ? "They Offer" : "You Offer"}
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
            Active Exchanges
          </h1>
          <p className="text-muted-foreground">
            Track your ongoing exchanges and manage handovers.
          </p>
        </div>

        <div className="space-y-4">
          {activeExchanges.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="bg-muted mb-4 rounded-full p-4">
                  <Repeat2 className="text-muted-foreground size-8" />
                </div>
                <h3 className="text-lg font-semibold">No active exchanges</h3>
                <p className="text-muted-foreground">
                  You don&apos;t have any ongoing exchanges right now.
                </p>
              </CardContent>
            </Card>
          ) : (
            activeExchanges.map((exchange) => renderExchangeCard(exchange))
          )}
        </div>
      </div>
    </div>
  );
}
