"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useBorrowCartStore } from "@/lib/store/use-borrow-cart-store";

type BookBorrowActionsProps = {
  book: {
    id: string;
    title: string;
    author: string;
    images: { src: string }[];
    ownerName: string;
    ownerId: string;
    borrowFee?: number;
    maxBorrowDays?: number;
    tags: string[];
  };
};

export function BookBorrowActions({ book }: BookBorrowActionsProps) {
  const router = useRouter();
  const addItem = useBorrowCartStore((state) => state.addItem);
  const items = useBorrowCartStore((state) => state.items);
  const isInCart = items.some((item) => item.id === book.id);

  const [isAdding, setIsAdding] = useState(false);

  const handleAddToBorrowCart = async () => {
    if (isInCart) {
      toast.info("Already in Cart");
      return;
    }

    setIsAdding(true);
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 600));

    addItem({
      id: book.id,
      title: book.title,
      author: book.author,
      coverUrl: book.images[0]?.src || "",
      ownerId: book.ownerId,
      ownerName: book.ownerName,
      borrowFee: book.borrowFee || 0,
      depositRequired: 300, // Mock fixed deposit for now
      maxBorrowDays: book.maxBorrowDays || 14,
    });

    toast.success("Added to Borrow Cart", {
      description: `${book.title} has been added to your borrow cart.`,
      action: {
        label: "View Cart",
        onClick: () => router.push("/cart?tab=borrow"),
      },
    });
    setIsAdding(false);
  };

  const handleBorrowNow = async () => {
    await handleAddToBorrowCart();
    router.push("/borrow/checkout");
  };

  if (!book.tags.includes("borrow")) {
    return null;
  }

  return (
    <div className="flex w-full gap-2">
      <Button
        variant="outline"
        className="h-12 flex-1 gap-2 text-base transition-all"
        onClick={handleAddToBorrowCart}
        disabled={isAdding || isInCart}
      >
        <BookOpen className="size-5" />
        {isAdding ? "Adding..." : isInCart ? "In Cart" : "Add to Cart"}
      </Button>
      <Button
        variant="default"
        className="h-12 flex-1 gap-2 bg-blue-600 text-base text-white transition-all hover:bg-blue-700"
        onClick={handleBorrowNow}
        disabled={isAdding}
      >
        Borrow Now
      </Button>
    </div>
  );
}
