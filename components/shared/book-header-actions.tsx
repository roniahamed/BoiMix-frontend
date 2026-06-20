"use client";

import { useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BookHeaderActions() {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "BoiMix - Book Details",
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      alert("Link copied to clipboard!");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleWishlist}
        className={cn(
          "rounded-full transition-colors",
          isWishlisted
            ? "text-red-500 hover:bg-red-50 hover:text-red-600"
            : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
        )}
      >
        <Heart className={cn("size-5", isWishlisted && "fill-current")} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleShare}
        className="text-muted-foreground hover:bg-primary/5 hover:text-primary rounded-full transition-colors"
      >
        <Share2 className="size-5" />
      </Button>
    </div>
  );
}
