"use client";

import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/use-cart-store";
import { cn } from "@/lib/utils";

export function CartButton({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
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
      <Link href="/cart" aria-label="Cart">
        <ShoppingCartIcon />
        {mounted && totalItems > 0 && (
          <span className="bg-accent text-accent-foreground absolute top-0.5 right-0.5 flex size-4 items-center justify-center rounded-full text-[10px] font-bold">
            {totalItems}
          </span>
        )}
      </Link>
    </Button>
  );
}
