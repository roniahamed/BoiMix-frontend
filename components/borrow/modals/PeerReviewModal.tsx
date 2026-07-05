"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Star, ArrowLeft, CheckCircle2 } from "lucide-react";

type PeerReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
};

export function PeerReviewModal({ isOpen, onClose }: PeerReviewModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating from 1 to 5 stars.");
      return;
    }

    setIsSubmitting(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    toast.success("Review Submitted", {
      description: "Thank you for sharing your experience!",
    });

    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="overflow-hidden border-0 p-0 sm:max-w-md">
        <div className="bg-white">
          <div className="flex items-center border-b p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="mr-2"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <div className="flex-1 text-center">
              <h2 className="font-bold">Order Completed</h2>
            </div>
            <div className="w-9" /> {/* Spacer */}
          </div>

          <div className="p-6">
            <div className="mb-6 flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle2 className="size-8" />
              </div>
              <h3 className="text-xl font-bold">Order Completed!</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Your deposit has been released to your wallet.
              </p>
            </div>

            <div className="bg-muted/30 mb-8 rounded-xl p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Deposit Released
                </span>
                <span className="font-bold text-green-600">+ ৳400</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Current Wallet Balance
                </span>
                <span className="font-bold">৳1250</span>
              </div>
            </div>

            <div className="mb-4 text-center">
              <h4 className="mb-2 font-bold">Review your Experience</h4>
              <p className="text-muted-foreground mb-4 text-xs">
                How was the interaction with the other party? Your review helps
                build a trustworthy community.
              </p>

              <div className="mb-6 flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      className={`size-8 ${
                        star <= (hoverRating || rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground fill-transparent"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <Textarea
                placeholder="Write a review... (Optional)"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="min-h-[100px] resize-none text-sm"
              />
            </div>

            <Button
              className="h-12 w-full bg-blue-600 text-lg hover:bg-blue-700"
              onClick={handleSubmit}
              disabled={isSubmitting || rating === 0}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
