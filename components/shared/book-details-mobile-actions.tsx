"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { BookOpen, Repeat2, ShoppingCart, CreditCard } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/use-cart-store";
import { useBorrowCartStore } from "@/lib/store/use-borrow-cart-store";

type BookDetailsMobileActionsProps = {
  book: {
    id: string;
    title: string;
    author: string;
    price: number;
    condition: string;
    images: { src: string }[];
    sellerName: string;
    sellerId: string;
    tags: string[];
    borrowFee?: number;
    maxBorrowDays?: number;
  };
};

export function BookDetailsMobileActions({
  book,
}: BookDetailsMobileActionsProps) {
  const [bottomOffset, setBottomOffset] = useState(0);
  const frameRef = useRef<number | null>(null);
  const lastOffsetRef = useRef(0);

  useEffect(() => {
    const updateBottomOffset = () => {
      const viewport = window.visualViewport;

      if (!viewport) {
        setBottomOffset(0);
        return;
      }

      const nextOffset = Math.round(
        Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop),
      );

      if (lastOffsetRef.current === nextOffset) {
        return;
      }

      lastOffsetRef.current = nextOffset;

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = window.requestAnimationFrame(() => {
        setBottomOffset(nextOffset);
      });
    };

    updateBottomOffset();

    window.addEventListener("resize", updateBottomOffset, { passive: true });
    window.visualViewport?.addEventListener("resize", updateBottomOffset);
    window.visualViewport?.addEventListener("scroll", updateBottomOffset);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("resize", updateBottomOffset);
      window.visualViewport?.removeEventListener("resize", updateBottomOffset);
      window.visualViewport?.removeEventListener("scroll", updateBottomOffset);
    };
  }, []);

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
    await new Promise((resolve) => setTimeout(resolve, 600));
    addItem({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
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
      await new Promise((resolve) => setTimeout(resolve, 600));
      addItem({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        condition: book.condition,
        coverUrl: book.images[0]?.src || "",
        sellerName: book.sellerName,
        sellerId: book.sellerId,
      });
    }
    router.push(`/cart/checkout?items=${book.id}`);
  };

  const addBorrowItem = useBorrowCartStore((state) => state.addItem);
  const setDirectCheckoutItem = useBorrowCartStore(
    (state) => state.setDirectCheckoutItem,
  );
  const borrowItems = useBorrowCartStore((state) => state.items);
  const isInBorrowCart = borrowItems.some((item) => item.id === book.id);
  const [isAddingBorrow, setIsAddingBorrow] = useState(false);

  const handleAddToBorrowCart = async () => {
    if (isInBorrowCart) {
      router.push("/cart?tab=borrow");
      return;
    }

    setIsAddingBorrow(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    addBorrowItem({
      id: book.id,
      title: book.title,
      author: book.author,
      coverUrl: book.images[0]?.src || "",
      ownerId: book.sellerId,
      ownerName: book.sellerName,
      borrowFee: book.borrowFee || 0,
      depositRequired: 300,
      maxBorrowDays: book.maxBorrowDays || 14,
      isPro: book.tags.includes("pro"),
      isPremium: book.tags.includes("premium"),
      minTrustScoreRequired: 80,
      minRatingRequired: 4.0,
    });

    toast.success("Added to Borrow Cart", {
      description: `${book.title} has been added to your borrow cart.`,
      action: {
        label: "Go to Cart",
        onClick: () => router.push("/cart?tab=borrow"),
      },
    });
    setIsAddingBorrow(false);
  };

  const handleBorrowNow = () => {
    setDirectCheckoutItem({
      id: book.id,
      title: book.title,
      author: book.author,
      coverUrl: book.images[0]?.src || "",
      ownerId: book.sellerId,
      ownerName: book.sellerName,
      borrowFee: book.borrowFee || 0,
      depositRequired: 300,
      maxBorrowDays: book.maxBorrowDays || 14,
      isPro: book.tags.includes("pro"),
      isPremium: book.tags.includes("premium"),
      minTrustScoreRequired: 80,
      minRatingRequired: 4.0,
    });
    router.push("/borrow/checkout?direct=true");
  };

  return (
    <>
      <div
        className="bg-background/95 pointer-events-none fixed inset-x-0 bottom-0 z-40 backdrop-blur sm:hidden"
        style={{
          height: `calc(env(safe-area-inset-bottom) + ${bottomOffset}px)`,
          transform: "translate3d(0, 0, 0)",
        }}
      />

      <nav
        className="bg-background/95 fixed inset-x-0 z-50 border-t backdrop-blur sm:hidden"
        style={{
          bottom: `${bottomOffset}px`,
          paddingBottom: "env(safe-area-inset-bottom)",
          transform: "translate3d(0, 0, 0)",
        }}
        aria-label="Book actions"
      >
        <div className="boimix-container flex h-12 w-full items-center gap-3">
          {book.tags.includes("sell") && (
            <>
              <Button
                className="h-11 flex-1 gap-2 bg-[#f57224] px-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#d65e1c] active:scale-[0.98]"
                onClick={handleBuyNow}
                disabled={isAdding || isBuying}
              >
                <CreditCard className="size-4" />
                <span>{isBuying ? "Processing..." : "Buy Now"}</span>
              </Button>
              <Button
                variant="default"
                className="h-11 flex-1 gap-2 px-2 text-sm font-semibold shadow-sm transition-all"
                onClick={handleAddToCart}
                disabled={isAdding || isBuying}
              >
                <ShoppingCart className="size-4" />
                <span>
                  {isAdding ? "Adding..." : isInCart ? "Go to Cart" : "Add"}
                </span>
              </Button>
            </>
          )}
          {book.tags.includes("swap") && (
            <Button className="h-11 flex-1 gap-2 bg-[#f57224] text-base font-semibold text-white shadow-sm transition-all hover:bg-[#d65e1c] active:scale-[0.98]">
              <Repeat2 className="size-5" />
              <span>Swap</span>
            </Button>
          )}
          {book.tags.includes("borrow") && (
            <>
              <Button
                className="h-11 flex-1 gap-2 bg-[#f57224] px-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#d65e1c] active:scale-[0.98]"
                onClick={handleBorrowNow}
                disabled={isAddingBorrow}
              >
                <BookOpen className="size-4" />
                <span>Borrow Now</span>
              </Button>
              <Button
                variant="default"
                className="h-11 flex-1 gap-2 px-2 text-sm font-semibold shadow-sm transition-all"
                onClick={handleAddToBorrowCart}
                disabled={isAddingBorrow}
              >
                <ShoppingCart className="size-4" />
                <span>
                  {isAddingBorrow
                    ? "Adding..."
                    : isInBorrowCart
                      ? "Go to Cart"
                      : "Add to Borrow"}
                </span>
              </Button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
