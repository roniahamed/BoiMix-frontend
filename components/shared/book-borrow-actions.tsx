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
  const setDirectCheckoutItem = useBorrowCartStore(
    (state) => state.setDirectCheckoutItem,
  );
  const items = useBorrowCartStore((state) => state.items);
  const isInCart = items.some((item) => item.id === book.id);

  const [isAdding, setIsAdding] = useState(false);

  const handleAddToBorrowCart = async () => {
    if (isInCart) {
      router.push("/cart?tab=borrow");
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
        label: "Go to Cart",
        onClick: () => router.push("/cart?tab=borrow"),
      },
    });
    setIsAdding(false);
  };

  const handleBorrowNow = () => {
    setDirectCheckoutItem({
      id: book.id,
      title: book.title,
      author: book.author,
      coverUrl: book.images[0]?.src || "",
      ownerId: book.ownerId,
      ownerName: book.ownerName,
      borrowFee: book.borrowFee || 0,
      depositRequired: 300,
      maxBorrowDays: book.maxBorrowDays || 14,
    });
    router.push("/borrow/checkout?direct=true");
  };

  if (!book.tags.includes("borrow")) {
    return null;
  }

  return (
    <div className="flex w-full gap-2">
      <Button
        variant={isInCart ? "outline" : "default"}
        className={`h-12 flex-1 gap-2 text-base transition-all ${
          isInCart
            ? "border-primary text-primary hover:text-primary hover:bg-blue-50"
            : ""
        }`}
        onClick={handleAddToBorrowCart}
        disabled={isAdding}
      >
        <BookOpen className="size-5" />
        {isAdding ? "Adding..." : isInCart ? "Go to Cart" : "Add to Borrow"}
      </Button>
      <Button
        variant="default"
        className="h-12 flex-1 gap-2 bg-[#f57224] text-base text-white transition-all hover:bg-[#d65e1c]"
        onClick={handleBorrowNow}
        disabled={isAdding}
      >
        Borrow Now
      </Button>
    </div>
  );
}
