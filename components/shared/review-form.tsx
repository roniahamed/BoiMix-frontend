"use client";

import { useState } from "react";
import { MessageCircle, Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ReviewFormProps {
  bookTitle: string;
  isModal?: boolean;
  onCancel?: () => void;
}

export function ReviewForm({ bookTitle, isModal, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("দয়া করে রেটিং দিন!");
      return;
    }
    // Simulate submit
    toast.success("আপনার রিভিউটি সফলভাবে সাবমিট হয়েছে!");
    setRating(0);
    setReview("");
    if (onCancel) onCancel();
  };

  return (
    <div
      className={cn(
        "bg-card mt-8 w-full rounded-xl border p-6 shadow-sm md:p-8",
        isModal && "mt-0 border-0 bg-transparent p-0 shadow-none",
      )}
    >
      {!isModal && (
        <div className="mb-6 flex items-start gap-4">
          <div className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-full">
            <MessageCircle className="size-6" />
          </div>
          <div>
            <h4 className="type-heading text-lg">রিভিউ দিন</h4>
            <p className="text-muted-foreground text-sm">
              {bookTitle} সম্পর্কে আপনার মতামত দিন
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-foreground mb-2 block text-sm font-medium">
            রেটিং দিন
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className={cn(
                  "size-8 cursor-pointer transition-colors",
                  (hoveredRating || rating) >= star
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground hover:text-amber-400",
                )}
              />
            ))}
            <span className="text-muted-foreground ml-2 text-sm">
              ({rating}/5)
            </span>
          </div>
        </div>

        <div>
          <label className="text-foreground mb-2 block text-sm font-medium">
            আপনার রিভিউ
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="আপনার অভিজ্ঞতা শেয়ার করুন..."
            rows={4}
            className="border-input bg-background focus:border-primary focus:ring-primary w-full rounded-md border p-3 text-sm transition-all outline-none focus:ring-1"
            required
          />
        </div>

        <div
          className={cn(
            "flex gap-3",
            isModal ? "mt-4 flex-row justify-end" : "flex-col",
          )}
        >
          {isModal && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            className={cn(
              "gap-2 shadow-md",
              !isModal ? "w-full py-4 text-base font-bold" : "",
            )}
          >
            <Send className="size-4" />
            রিভিউ সাবমিট করুন
          </Button>
        </div>

        {!isModal && (
          <p className="text-muted-foreground mt-2 text-center text-xs">
            আপনার রিভিউ অ্যাডমিন অনুমোদনের পর প্রকাশ করা হবে
          </p>
        )}
      </form>
    </div>
  );
}
