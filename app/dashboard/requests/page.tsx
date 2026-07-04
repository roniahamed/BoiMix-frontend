"use client";

import { useState } from "react";
import Image from "next/image";
import { useBorrowStore, BorrowOrder } from "@/lib/store/use-borrow-store";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function OwnerRequestsPage() {
  const { orders, updateOrderStatus, counterOffer, rejectCounterOffer } =
    useBorrowStore();
  const [selectedOrder, setSelectedOrder] = useState<BorrowOrder | null>(null);
  const [isCounterModalOpen, setIsCounterModalOpen] = useState(false);
  const [proposedDate, setProposedDate] = useState("");
  const [proposedLocation, setProposedLocation] = useState("");
  const [message, setMessage] = useState("");

  // In a real app, filter by ownerId === currentUser.id
  const incomingRequests = orders.filter(
    (o) =>
      o.status === "pending_owner_review" ||
      o.status === "counter_offered" ||
      o.status === "accepted" ||
      o.status === "paid" ||
      o.status === "handed_over_by_owner" ||
      o.status === "return_initiated",
  );

  const handleAccept = (id: string) => {
    updateOrderStatus(id, "accepted");
  };

  const handleReject = (id: string) => {
    rejectCounterOffer(id);
  };

  const handleCounterOffer = () => {
    if (selectedOrder) {
      counterOffer(selectedOrder.id, {
        proposedDate,
        proposedLocation,
        message,
      });
      setIsCounterModalOpen(false);
    }
  };

  const handleHandover = (id: string) => {
    updateOrderStatus(id, "handed_over_by_owner");
  };

  const handleConfirmReturn = (id: string) => {
    updateOrderStatus(id, "completed");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Incoming Requests</h1>
        <p className="text-muted-foreground mt-2">
          Manage borrow requests for your books.
        </p>
      </div>

      {incomingRequests.length === 0 ? (
        <div className="text-muted-foreground py-12 text-center">
          No incoming requests at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {incomingRequests.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="bg-muted relative h-32 w-full shrink-0 border-b sm:h-auto sm:w-28 sm:border-r sm:border-b-0">
                    <Image
                      src={order.bookImage}
                      fill
                      alt={order.bookTitle}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="line-clamp-1 font-semibold">
                          {order.bookTitle}
                        </h3>
                        <p className="text-muted-foreground mt-1 text-xs">
                          Requested by:{" "}
                          <span className="text-foreground font-medium">
                            {order.borrowerId}
                          </span>
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-[10px] uppercase"
                      >
                        {order.status.replace(/_/g, " ")}
                      </Badge>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {order.status === "pending_owner_review" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleAccept(order.id)}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsCounterModalOpen(true);
                            }}
                          >
                            Propose Changes
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(order.id)}
                          >
                            Decline
                          </Button>
                        </>
                      )}

                      {order.status === "counter_offered" && (
                        <p className="text-xs text-amber-600">
                          Waiting for borrower to respond to counter-offer...
                        </p>
                      )}

                      {order.status === "accepted" && (
                        <p className="text-xs text-blue-600">
                          Accepted. Waiting for borrower to pay the fee.
                        </p>
                      )}

                      {order.status === "paid" && (
                        <Button
                          size="sm"
                          onClick={() => handleHandover(order.id)}
                        >
                          Confirm Handover
                        </Button>
                      )}

                      {order.status === "return_initiated" && (
                        <Button
                          size="sm"
                          onClick={() => handleConfirmReturn(order.id)}
                        >
                          Confirm Book Returned
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Counter Offer Modal */}
      <Dialog open={isCounterModalOpen} onOpenChange={setIsCounterModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Propose Changes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Proposed Date & Time</Label>
              <Input
                placeholder="e.g., Tomorrow at 5 PM"
                value={proposedDate}
                onChange={(e) => setProposedDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Proposed Location</Label>
              <Input
                placeholder="e.g., Central Library Entrance"
                value={proposedLocation}
                onChange={(e) => setProposedLocation(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Message to Borrower</Label>
              <Textarea
                placeholder="Explain why you are proposing these changes..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCounterModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCounterOffer}>Send Counter Offer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
