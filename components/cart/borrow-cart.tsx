"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, ShieldCheck, User, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  useBorrowCartStore,
  BorrowCartItem,
} from "@/lib/store/use-borrow-cart-store";
import { useWishlistStore } from "@/lib/store/use-wishlist-store";
import { Button } from "@/components/ui/button";

export function BorrowCart() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const { items, removeItem, removeItems } = useBorrowCartStore();
  const { toggleItem: toggleWishlist, isInWishlist } = useWishlistStore();

  const handleWishlistToggle = (id: string, title: string) => {
    toggleWishlist(id);
    const inWishlist = useWishlistStore.getState().items.includes(id);
    if (inWishlist) {
      toast.success("Added to wishlist", {
        description: `${title} has been added to your wishlist.`,
      });
    } else {
      toast.info("Removed from wishlist", {
        description: `${title} has been removed from your wishlist.`,
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setMounted(true);
      // Auto-select all items on mount
      setSelectedItems(
        new Set(useBorrowCartStore.getState().items.map((i) => i.id)),
      );
    }, 0);
  }, []);

  if (!mounted) return null;

  // Group items by owner
  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.ownerId]) {
        acc[item.ownerId] = { ownerName: item.ownerName, items: [] };
      }
      acc[item.ownerId].items.push(item);
      return acc;
    },
    {} as Record<string, { ownerName: string; items: BorrowCartItem[] }>,
  );

  const allSelected = items.length > 0 && selectedItems.size === items.length;

  const toggleAll = () => {
    if (allSelected) setSelectedItems(new Set());
    else setSelectedItems(new Set(items.map((i) => i.id)));
  };

  const toggleItem = (id: string) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleOwner = (ownerItems: BorrowCartItem[]) => {
    const allSel = ownerItems.every((i) => selectedItems.has(i.id));
    setSelectedItems((prev) => {
      const next = new Set(prev);
      ownerItems.forEach((i) => (allSel ? next.delete(i.id) : next.add(i.id)));
      return next;
    });
  };

  const deleteSelected = () => {
    const idsToDelete = Array.from(selectedItems);
    removeItems(idsToDelete);
    setSelectedItems(new Set());
  };

  const selectedCartItems = items.filter((i) => selectedItems.has(i.id));
  const totalBorrowFee = selectedCartItems.reduce(
    (sum, item) => sum + item.borrowFee,
    0,
  );
  const totalDepositRequired = selectedCartItems.reduce(
    (sum, item) => sum + item.depositRequired,
    0,
  );
  const selectedCount = selectedCartItems.length;

  return (
    <div className="w-full">
      <h2 className="type-heading mb-4 text-xl">
        Your Borrow Cart ({items.length} Item{items.length !== 1 ? "s" : ""})
      </h2>

      {items.length === 0 ? (
        <div className="bg-muted/30 flex min-h-[40vh] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
          <div className="bg-primary/10 text-primary mb-4 rounded-full p-4">
            <ShieldCheck className="size-8" />
          </div>
          <h2 className="type-heading text-xl">Cart is empty!</h2>
          <p className="text-muted-foreground mt-2 max-w-sm">
            You haven&apos;t added any books to your borrow cart yet.
          </p>
          <Button asChild className="mt-6">
            <Link href="/books">Find Books to Borrow</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-2 lg:grid-cols-12 lg:gap-5">
          {/* ── Left: Cart Items ── */}
          <div className="flex flex-col gap-2 lg:col-span-8">
            {/* Select-all header */}
            <div className="bg-card border-border/30 flex items-center justify-between rounded-[3px] border px-3 py-2.5 shadow-none sm:px-4">
              <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium select-none">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="accent-primary size-4 cursor-pointer"
                />
                SELECT ALL ({items.length} ITEM{items.length !== 1 ? "S" : ""})
              </label>
              <button
                onClick={deleteSelected}
                disabled={selectedItems.size === 0}
                className="text-muted-foreground hover:text-destructive flex items-center gap-1.5 text-sm transition-colors disabled:pointer-events-none disabled:opacity-40"
              >
                <Trash2 className="size-3.5" />
                DELETE
              </button>
            </div>

            {Object.entries(groupedItems).map(([ownerId, group]) => {
              const ownerSelected = group.items.every((i) =>
                selectedItems.has(i.id),
              );
              return (
                <div
                  key={ownerId}
                  className="bg-card border-border/30 overflow-hidden rounded-[3px] border shadow-none"
                >
                  <div className="bg-muted/20 flex items-center gap-2.5 border-b px-3 py-2.5 sm:px-4">
                    <input
                      type="checkbox"
                      checked={ownerSelected}
                      onChange={() => toggleOwner(group.items)}
                      className="accent-primary size-4 cursor-pointer"
                    />
                    <User className="text-primary size-4" />
                    <Link
                      href={`/u/${ownerId}`}
                      className="flex items-center gap-1 hover:underline"
                    >
                      <span className="text-sm font-semibold">
                        {group.ownerName}
                      </span>
                      <span className="text-muted-foreground text-xs">›</span>
                    </Link>
                  </div>

                  <div className="flex flex-col divide-y">
                    {group.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-2.5 px-3 py-3 sm:gap-3 sm:px-4 sm:py-4"
                      >
                        {/* Checkbox */}
                        <div className="shrink-0 pt-0 sm:pt-8">
                          <input
                            type="checkbox"
                            checked={selectedItems.has(item.id)}
                            onChange={() => toggleItem(item.id)}
                            className="accent-primary mt-1 size-4 cursor-pointer"
                          />
                        </div>

                        {/* Cover */}
                        <Link href={`/books/${item.id}`} className="shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.coverUrl}
                            alt={item.title}
                            className="border-border/40 h-[65px] w-auto rounded-[3px] border bg-transparent object-contain transition-opacity hover:opacity-90 sm:h-[80px]"
                          />
                        </Link>

                        {/* Title + Meta + mobile price row */}
                        <div className="min-w-0 flex-1 pt-1 pl-1">
                          <Link href={`/books/${item.id}`}>
                            <p className="text-foreground line-clamp-2 cursor-pointer text-sm leading-snug font-medium transition-colors hover:text-[#f57224]">
                              {item.title}
                            </p>
                          </Link>
                          <p className="text-muted-foreground mt-1 text-[11px] sm:text-[12px]">
                            {item.author}
                          </p>

                          {/* Mobile-only: price + actions stacked below meta */}
                          <div className="mt-2 flex items-center justify-between sm:hidden">
                            <div className="flex flex-col gap-0">
                              <span className="text-[13px] font-medium text-amber-600">
                                Deposit: ৳{item.depositRequired}
                              </span>
                              <span className="text-muted-foreground text-[13px]">
                                Fee:{" "}
                                {item.borrowFee > 0
                                  ? `৳${item.borrowFee}`
                                  : "Free"}
                              </span>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4">
                              <button
                                title="Add to wishlist"
                                onClick={() =>
                                  handleWishlistToggle(item.id, item.title)
                                }
                                className={`p-1 transition-colors hover:text-rose-500 ${
                                  isInWishlist(item.id)
                                    ? "text-rose-500"
                                    : "text-[#9e9e9e]"
                                }`}
                              >
                                <Heart
                                  className="size-5"
                                  fill={
                                    isInWishlist(item.id)
                                      ? "currentColor"
                                      : "none"
                                  }
                                />
                              </button>
                              <button
                                title="Remove item"
                                onClick={() => removeItem(item.id)}
                                className="hover:text-destructive p-1 text-[#9e9e9e]"
                              >
                                <Trash2 className="size-5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Price & Actions — Desktop only */}
                        <div className="hidden w-[140px] shrink-0 flex-col gap-0.5 pt-1 sm:flex">
                          <span className="text-[14px] font-medium text-amber-600">
                            Deposit: ৳{item.depositRequired}
                          </span>
                          <span className="text-muted-foreground text-[13px]">
                            Fee:{" "}
                            {item.borrowFee > 0 ? `৳${item.borrowFee}` : "Free"}
                          </span>
                          <div className="mt-2.5 flex items-center gap-3">
                            <button
                              title="Add to wishlist"
                              onClick={() =>
                                handleWishlistToggle(item.id, item.title)
                              }
                              className={`transition-colors hover:text-rose-500 ${
                                isInWishlist(item.id)
                                  ? "text-rose-500"
                                  : "text-[#9e9e9e]"
                              }`}
                            >
                              <Heart
                                className="size-[18px]"
                                fill={
                                  isInWishlist(item.id)
                                    ? "currentColor"
                                    : "none"
                                }
                              />
                            </button>
                            <button
                              title="Remove item"
                              onClick={() => removeItem(item.id)}
                              className="hover:text-destructive text-[#9e9e9e] transition-colors"
                            >
                              <Trash2 className="size-[18px]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Right: Borrow Summary ── */}
          <div className="lg:col-span-4">
            <div className="bg-card border-border/30 sticky top-24 overflow-hidden rounded-[3px] border shadow-none">
              <div className="bg-muted/20 border-b px-5 py-3">
                <h2 className="text-base font-semibold">Borrow Summary</h2>
              </div>

              <div className="space-y-3 p-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Borrow Fees ({selectedCount} item
                    {selectedCount !== 1 ? "s" : ""})
                  </span>
                  <span className="font-medium">
                    ৳{totalBorrowFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold text-amber-600">
                  <span>Total Deposit Required</span>
                  <span className="text-lg">
                    ৳{totalDepositRequired.toLocaleString()}
                  </span>
                </div>
                <p className="text-muted-foreground mt-2 text-[11px] leading-snug">
                  * Deposit is fully refundable upon returning the books in good
                  condition.
                </p>
              </div>

              <div className="mt-2 px-5 pb-5">
                <Button
                  onClick={() => {
                    const ids = Array.from(selectedItems).join(",");
                    router.push(`/borrow/checkout?items=${ids}`);
                  }}
                  disabled={selectedCount === 0}
                  className="h-11 w-full rounded bg-blue-600 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  REVIEW & CONFIRM ({selectedCount})
                </Button>
              </div>

              <div className="text-muted-foreground space-y-2 border-t px-5 py-4 text-xs">
                <div className="flex gap-2">
                  <ShieldCheck className="text-success mt-0.5 size-4 shrink-0" />
                  <span>Eligibility check will be performed next</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
