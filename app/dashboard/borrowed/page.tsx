"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function BorrowedPage() {
  const {
    orders,
    updateOrderStatus,
    acceptCounterOffer,
    rejectCounterOffer,
    processPayment,
    submitReview,
  } = useBorrowStore();

  const [selectedOrder, setSelectedOrder] = useState<BorrowOrder | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  // Show all mock orders for now (since borrowerId is "current-user")
  const activeOrders = orders.filter((o) => o.borrowerId === "current-user");

  const handlePayClick = (order: BorrowOrder) => {
    setSelectedOrder(order);
    setIsPaymentModalOpen(true);
  };

  const handleConfirmPayment = () => {
    if (selectedOrder) {
      processPayment(selectedOrder.id);
      setIsPaymentModalOpen(false);
    }
  };

  const handleReviewClick = (order: BorrowOrder) => {
    setSelectedOrder(order);
    setRating(5);
    setReviewComment("");
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = () => {
    if (selectedOrder) {
      submitReview(selectedOrder.id, { rating, comment: reviewComment });
      setIsReviewModalOpen(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Borrowed Books</h1>
        <p className="text-muted-foreground mt-2">
          Track books you have requested or are currently borrowing.
        </p>
      </div>

      {activeOrders.length === 0 ? (
        <div className="text-muted-foreground py-12 text-center">
          You don&apos;t have any active borrow requests.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {activeOrders.map((order) => (
            <Card key={order.id} className="flex flex-col">
              <CardContent className="flex flex-1 gap-4 p-4">
                <div className="bg-muted relative h-28 w-20 shrink-0 overflow-hidden rounded-sm border">
                  <Image
                    src={order.bookImage}
                    fill
                    alt={order.bookTitle}
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <Link
                    href={`/borrow/active/${order.id}`}
                    className="hover:underline"
                  >
                    <h3 className="line-clamp-2 text-base font-semibold">
                      {order.bookTitle}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Owner: {order.ownerId}
                  </p>

                  {order.status === "counter_offered" &&
                    order.counterOfferDetails && (
                      <div className="mt-2 rounded border border-amber-200 bg-amber-50 p-2 text-xs text-amber-800">
                        <p className="mb-1 font-semibold">
                          Owner proposed changes:
                        </p>
                        <p>Date: {order.counterOfferDetails.proposedDate}</p>
                        <p>
                          Location: {order.counterOfferDetails.proposedLocation}
                        </p>
                        {order.counterOfferDetails.message && (
                          <p className="mt-1 italic">
                            &quot;{order.counterOfferDetails.message}&quot;
                          </p>
                        )}
                      </div>
                    )}

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
                  <p className="text-muted-foreground text-sm">
                    Waiting for owner&apos;s response...
                  </p>
                )}

                {order.status === "counter_offered" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => acceptCounterOffer(order.id)}
                    >
                      Accept Changes
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => rejectCounterOffer(order.id)}
                    >
                      Decline
                    </Button>
                  </>
                )}

                {order.status === "accepted" && (
                  <Button size="sm" onClick={() => handlePayClick(order)}>
                    Pay Borrow Fee (৳{order.borrowFee})
                  </Button>
                )}

                {order.status === "paid" && (
                  <p className="text-sm text-blue-600">
                    Payment successful. Waiting for owner to hand over the book.
                  </p>
                )}

                {order.status === "handed_over_by_owner" && (
                  <Button
                    size="sm"
                    onClick={() => updateOrderStatus(order.id, "borrow_active")}
                  >
                    Confirm Received
                  </Button>
                )}

                {order.status === "borrow_active" && (
                  <Button
                    size="sm"
                    onClick={() =>
                      updateOrderStatus(order.id, "return_initiated")
                    }
                  >
                    Initiate Return
                  </Button>
                )}

                {order.status === "completed" && !order.review && (
                  <Button size="sm" onClick={() => handleReviewClick(order)}>
                    Leave a Review
                  </Button>
                )}

                {order.review && (
                  <p className="text-sm text-green-600">
                    Review submitted ({order.review.rating}/5)
                  </p>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground mb-4 text-sm">
              To proceed with this borrow request, please pay the borrow fee.
              The deposit is already locked from your available limit.
            </p>
            <div className="rounded-lg border p-4">
              <div className="flex justify-between font-medium">
                <span>Borrow Fee</span>
                <span>৳{selectedOrder?.borrowFee}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPaymentModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmPayment}>
              Pay ৳{selectedOrder?.borrowFee}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave a Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Rating (1-5)</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Comment</Label>
              <Textarea
                placeholder="How was the book condition and your experience?"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsReviewModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmitReview}>Submit Review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
