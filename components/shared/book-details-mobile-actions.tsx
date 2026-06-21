"use client";

import { useEffect, useState } from "react";
import { BookOpen, Repeat2, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";

type BookDetailsMobileActionsProps = {
  tags: string[];
};

export function BookDetailsMobileActions({
  tags,
}: BookDetailsMobileActionsProps) {
  const [bottomOffset, setBottomOffset] = useState(0);

  useEffect(() => {
    const updateBottomOffset = () => {
      const viewport = window.visualViewport;

      if (!viewport) {
        setBottomOffset(0);
        return;
      }

      const nextOffset = Math.max(
        0,
        window.innerHeight - viewport.height - viewport.offsetTop,
      );

      setBottomOffset(nextOffset);
    };

    updateBottomOffset();

    window.addEventListener("resize", updateBottomOffset, { passive: true });
    window.addEventListener("scroll", updateBottomOffset, { passive: true });
    window.visualViewport?.addEventListener("resize", updateBottomOffset);
    window.visualViewport?.addEventListener("scroll", updateBottomOffset);

    return () => {
      window.removeEventListener("resize", updateBottomOffset);
      window.removeEventListener("scroll", updateBottomOffset);
      window.visualViewport?.removeEventListener("resize", updateBottomOffset);
      window.visualViewport?.removeEventListener("scroll", updateBottomOffset);
    };
  }, []);

  return (
    <nav
      className="bg-background/95 fixed inset-x-0 z-50 border-t backdrop-blur sm:hidden"
      style={{
        bottom: `calc(${bottomOffset}px + env(safe-area-inset-bottom))`,
        transform: "translate3d(0, 0, 0)",
        willChange: "bottom",
      }}
      aria-label="Book actions"
    >
      <div className="boimix-container flex h-16 w-full items-center gap-3 py-2">
        {tags.includes("sell") && (
          <Button className="h-12 flex-1 gap-2 text-base font-semibold shadow-sm">
            <ShoppingCart className="size-5" />
            <span>Add to Cart</span>
          </Button>
        )}
        {tags.includes("swap") && (
          <Button className="h-12 flex-1 gap-2 text-base font-semibold shadow-sm">
            <Repeat2 className="size-5" />
            <span>Swap</span>
          </Button>
        )}
        {tags.includes("borrow") && (
          <Button className="h-12 flex-1 gap-2 text-base font-semibold shadow-sm">
            <BookOpen className="size-5" />
            <span>Borrow</span>
          </Button>
        )}
      </div>
    </nav>
  );
}
