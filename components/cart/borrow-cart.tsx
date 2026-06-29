"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, ShieldCheck, User } from "lucide-react";
import { useEffect, useState } from "react";

import {
  useBorrowCartStore,
  BorrowCartItem,
} from "@/lib/store/use-borrow-cart-store";
import { Button } from "@/components/ui/button";

export function BorrowCart() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, clearCart } = useBorrowCartStore();

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
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

  const totalBorrowFee = items.reduce((sum, item) => sum + item.borrowFee, 0);
  const totalDepositRequired = items.reduce(
    (sum, item) => sum + item.depositRequired,
    0,
  );

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
            <div className="bg-card border-border/30 flex items-center justify-between rounded-[3px] border px-3 py-2.5 shadow-none sm:px-4">
              <span className="text-sm font-medium">
                BOOKS GROUPED BY OWNER
              </span>
              <button
                onClick={clearCart}
                className="text-muted-foreground hover:text-destructive flex items-center gap-1.5 text-sm transition-colors"
              >
                <Trash2 className="size-3.5" />
                CLEAR CART
              </button>
            </div>

            {Object.entries(groupedItems).map(([ownerId, group]) => (
              <div
                key={ownerId}
                className="bg-card border-border/30 overflow-hidden rounded-[3px] border shadow-none"
              >
                <div className="bg-muted/20 flex items-center gap-2.5 border-b px-3 py-2.5 sm:px-4">
                  <User className="text-primary size-4" />
                  <Link
                    href={`/u/${ownerId}`}
                    className="flex items-center gap-1 hover:underline"
                  >
                    <span className="text-sm font-semibold">
                      {group.ownerName}
                    </span>
                  </Link>
                </div>

                <div className="flex flex-col divide-y">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-2.5 px-3 py-3 sm:gap-3 sm:px-4 sm:py-4"
                    >
                      <Link href={`/books/${item.id}`} className="shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.coverUrl}
                          alt={item.title}
                          className="border-border/40 h-[65px] w-auto rounded-[3px] border bg-transparent object-contain transition-opacity hover:opacity-90 sm:h-[80px]"
                        />
                      </Link>

                      <div className="min-w-0 flex-1 pt-1 pl-1">
                        <Link href={`/books/${item.id}`}>
                          <p className="text-foreground line-clamp-2 cursor-pointer text-sm leading-snug font-medium transition-colors hover:text-[#f57224]">
                            {item.title}
                          </p>
                        </Link>
                        <p className="text-muted-foreground mt-1 text-[11px] sm:text-[12px]">
                          {item.author}
                        </p>

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
                          <button
                            title="Remove item"
                            onClick={() => removeItem(item.id)}
                            className="hover:text-destructive p-1 text-[#9e9e9e]"
                          >
                            <Trash2 className="size-5" />
                          </button>
                        </div>
                      </div>

                      <div className="hidden w-[140px] shrink-0 flex-col gap-0.5 pt-1 sm:flex">
                        <span className="text-[14px] font-medium text-amber-600">
                          Deposit: ৳{item.depositRequired}
                        </span>
                        <span className="text-muted-foreground text-[13px]">
                          Fee:{" "}
                          {item.borrowFee > 0 ? `৳${item.borrowFee}` : "Free"}
                        </span>
                        <div className="mt-2.5">
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
            ))}
          </div>

          {/* ── Right: Borrow Summary ── */}
          <div className="lg:col-span-4">
            <div className="bg-card border-border/30 sticky top-24 overflow-hidden rounded-[3px] border shadow-none">
              <div className="bg-muted/20 border-b px-5 py-3">
                <h2 className="text-base font-semibold">Borrow Summary</h2>
              </div>

              <div className="space-y-3 p-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Borrow Fees</span>
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
                  onClick={() => router.push(`/borrow/checkout`)}
                  className="h-11 w-full rounded bg-blue-600 text-sm font-bold text-white hover:bg-blue-700"
                >
                  REVIEW & CONFIRM BORROW
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
