"use client";

import { useState } from "react";
import { MessageCircle, Star, User, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
  bookTitle: string;
}

export function ReviewForm({ bookTitle }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submit
    console.log("Submitting review:", { rating, name, review });
  };

  return (
    <div className="bg-card mt-8 rounded-xl border p-6 shadow-sm">
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

      <form onSubmit={handleSubmit} className="space-y-6">
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
            আপনার নাম
          </label>
          <div className="relative">
            <User className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন..."
              className="border-input bg-background focus:border-primary focus:ring-primary w-full rounded-md border py-2.5 pr-4 pl-10 text-sm transition-all outline-none focus:ring-1"
              required
            />
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

        <Button
          type="submit"
          className="w-full gap-2 py-6 text-base font-bold shadow-md"
        >
          <Send className="size-4" />
          রিভিউ সাবমিট করুন
        </Button>

        <p className="text-muted-foreground text-center text-xs">
          আপনার রিভিউ অ্যাডমিন অনুমোদনের পর প্রকাশ করা হবে
        </p>
      </form>
    </div>
  );
}
