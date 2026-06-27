"use client";

import Link from "next/link";
import { HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/lib/store/use-wishlist-store";
import { cn } from "@/lib/utils";

export function WishlistButton({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const items = useWishlistStore((state) => state.items);
  const totalItems = items.length;

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("relative", className)}
      asChild
    >
      <Link href="/wishlist" aria-label="Wishlist">
        <HeartIcon />
        {mounted && totalItems > 0 && (
          <span className="bg-accent text-accent-foreground absolute top-0.5 right-0.5 flex size-4 items-center justify-center rounded-full text-[10px] font-bold">
            {totalItems}
          </span>
        )}
      </Link>
    </Button>
  );
}
