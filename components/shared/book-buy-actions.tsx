"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, CreditCard } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/use-cart-store";

type BookBuyActionsProps = {
  book: {
    id: string;
    title: string;
    author: string;
    price: number;
    originalPrice?: number;
    condition: string;
    images: { src: string }[];
    sellerName: string;
    sellerId: string;
    tags: string[];
  };
};

export function BookBuyActions({ book }: BookBuyActionsProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const isInCart = items.some((item) => item.id === book.id);

  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const handleAddToCart = async () => {
    if (isInCart) {
      router.push("/cart");
      return;
    }

    setIsAdding(true);
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 600));

    addItem({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      originalPrice: book.originalPrice,
      condition: book.condition,
      coverUrl: book.images[0]?.src || "",
      sellerName: book.sellerName,
      sellerId: book.sellerId,
    });

    toast.success("Added to cart", {
      description: `${book.title} has been added to your cart.`,
      action: {
        label: "Go to Cart",
        onClick: () => router.push("/cart"),
      },
    });
    setIsAdding(false);
  };

  const handleBuyNow = async () => {
    setIsBuying(true);
    if (!isInCart) {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 600));
      addItem({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        originalPrice: book.originalPrice,
        condition: book.condition,
        coverUrl: book.images[0]?.src || "",
        sellerName: book.sellerName,
        sellerId: book.sellerId,
      });
    }
    router.push(`/cart/checkout?items=${book.id}`);
  };

  if (!book.tags.includes("sell")) {
    return null;
  }

  return (
    <div className="flex w-full gap-2">
      <Button
        variant="default"
        className="h-12 flex-1 gap-2 text-base transition-all"
        onClick={handleAddToCart}
        disabled={isAdding || isBuying}
      >
        <ShoppingCart className="size-5" />
        {isAdding ? "Adding..." : isInCart ? "Go to Cart" : "Add to Cart"}
      </Button>
      <Button
        className="h-12 flex-1 gap-2 bg-[#f57224] text-base text-white transition-all hover:bg-[#d65e1c] active:scale-[0.98]"
        onClick={handleBuyNow}
        disabled={isAdding || isBuying}
      >
        <CreditCard className="size-5" />
        {isBuying ? "Processing..." : "Buy Now"}
      </Button>
    </div>
  );
}
