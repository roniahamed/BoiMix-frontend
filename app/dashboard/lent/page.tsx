"use client";

import { useState } from "react";
import { useBorrowStore, BorrowOrder } from "@/lib/store/use-borrow-store";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function LentPage() {
  const { orders, updateOrderStatus, counterOffer } = useBorrowStore();

  // Show all mock orders where the user is the owner
  const activeOrders = orders.filter((o) => o.ownerId === "current-user");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lent Books</h1>
        <p className="text-muted-foreground mt-2">
          Manage borrow requests from others and track books you have lent out.
        </p>
      </div>

      {activeOrders.length === 0 ? (
        <div className="text-muted-foreground py-12 text-center">
          You don&apos;t have any books currently requested or lent out.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {activeOrders.map((order) => (
            <Card key={order.id} className="flex flex-col">
              <CardContent className="flex flex-1 gap-4 p-4">
                <div className="bg-muted relative h-28 w-20 shrink-0 overflow-hidden rounded-sm border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={order.bookImage}
                    alt={order.bookTitle}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="line-clamp-2 text-base font-semibold">
                    {order.bookTitle}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Borrower: {order.borrowerId}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-muted-foreground font-mono text-xs">
                      ID: {order.id}
                    </span>
                    <Badge
                      variant="secondary"
                      className="text-[10px] uppercase"
                    >
                      {order.status.replace(/_/g, " ")}
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 flex flex-wrap gap-2 border-t p-3">
                {order.status === "pending_owner_review" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => updateOrderStatus(order.id, "accepted")}
                    >
                      Accept Request
                    </Button>
                    <CounterOfferModal
                      order={order}
                      onCounterOffer={counterOffer}
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateOrderStatus(order.id, "rejected")}
                    >
                      Decline
                    </Button>
                  </>
                )}

                {order.status === "counter_offered" && (
                  <p className="text-muted-foreground text-sm">
                    Waiting for borrower to accept changes...
                  </p>
                )}

                {order.status === "accepted" && (
                  <p className="text-sm text-amber-600">
                    Waiting for borrower to pay the fee...
                  </p>
                )}

                {order.status === "paid" && (
                  <Button
                    size="sm"
                    onClick={() =>
                      updateOrderStatus(order.id, "handed_over_by_owner")
                    }
                  >
                    Confirm Handed Over
                  </Button>
                )}

                {order.status === "borrow_active" && (
                  <p className="text-sm font-medium text-green-600">
                    Book is currently with the borrower.
                  </p>
                )}

                {order.status === "return_initiated" && (
                  <Button
                    size="sm"
                    onClick={() => updateOrderStatus(order.id, "completed")}
                  >
                    Confirm Return Received
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function CounterOfferModal({
  order,
  onCounterOffer,
}: {
  order: BorrowOrder;
  onCounterOffer: (
    id: string,
    details: NonNullable<BorrowOrder["counterOfferDetails"]>,
  ) => void;
}) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(
    order.counterOfferDetails?.proposedLocation || "",
  );
  const [date, setDate] = useState(
    order.counterOfferDetails?.proposedDate || "",
  );
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCounterOffer(order.id, {
      proposedLocation: location,
      proposedDate: date,
      message,
    });
    setOpen(false);
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
              <Label>Message to Borrower</Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Let them know why you are changing the meetup details..."
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
