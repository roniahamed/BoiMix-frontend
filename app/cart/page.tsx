"use client";

import Link from "next/link";
import { Trash2, ShieldCheck, Store, Heart } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useCartStore, CartItem } from "@/lib/store/use-cart-store";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const { items, removeItem, updateQuantity } = useCartStore();

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
      // Auto-select all items on mount
      setSelectedItems(new Set(useCartStore.getState().items.map((i) => i.id)));
    }, 0);
  }, []);

  if (!mounted) return null;

  // Group items by seller
  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.sellerId]) {
        acc[item.sellerId] = { sellerName: item.sellerName, items: [] };
      }
      acc[item.sellerId].items.push(item);
      return acc;
    },
    {} as Record<string, { sellerName: string; items: CartItem[] }>,
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

  const toggleSeller = (sellerItems: CartItem[]) => {
    const allSel = sellerItems.every((i) => selectedItems.has(i.id));
    setSelectedItems((prev) => {
      const next = new Set(prev);
      sellerItems.forEach((i) => (allSel ? next.delete(i.id) : next.add(i.id)));
      return next;
    });
  };

  const deleteSelected = () => {
    selectedItems.forEach((id) => removeItem(id));
    setSelectedItems(new Set());
  };

  const selectedCartItems = items.filter((i) => selectedItems.has(i.id));
  const subtotal = selectedCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const selectedCount = selectedCartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );
  const uniqueSellersCount = new Set(selectedCartItems.map((i) => i.sellerId))
    .size;
  const deliveryFee = uniqueSellersCount * 60;
  const total = subtotal + deliveryFee;

  return (
    <div className="boimix-container-wide py-6 md:py-10">
      <h1 className="type-heading mb-4 text-2xl">
        আপনার কার্ট ({items.length} Item{items.length !== 1 ? "s" : ""})
      </h1>

      {items.length === 0 ? (
        <div className="bg-muted/30 flex min-h-[40vh] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
          <div className="bg-primary/10 text-primary mb-4 rounded-full p-4">
            <ShieldCheck className="size-8" />
          </div>
          <h2 className="type-heading text-xl">কার্ট খালি!</h2>
          <p className="text-muted-foreground mt-2 max-w-sm">
            আপনার কার্টে এখনও কোনো বই যোগ করা হয়নি।
          </p>
          <Button asChild className="mt-6">
            <Link href="/books">বই খুঁজুন</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-12">
          {/* ── Left: Cart Items ── */}
          <div className="flex flex-col gap-3 lg:col-span-8">
            {/* Select-all header */}
            <div className="bg-card flex items-center justify-between rounded-lg border px-4 py-2.5">
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

            {/* Seller groups */}
            {Object.entries(groupedItems).map(([sellerId, group]) => {
              const sellerSelected = group.items.every((i) =>
                selectedItems.has(i.id),
              );
              return (
                <div
                  key={sellerId}
                  className="bg-card overflow-hidden rounded-lg border"
                >
                  {/* Seller row */}
                  <div className="bg-muted/20 flex items-center gap-2.5 border-b px-4 py-2.5">
                    <input
                      type="checkbox"
                      checked={sellerSelected}
                      onChange={() => toggleSeller(group.items)}
                      className="accent-primary size-4 cursor-pointer"
                    />
                    <Store className="text-primary size-4" />
                    <span className="text-sm font-semibold">
                      {group.sellerName}
                    </span>
                    <span className="text-muted-foreground text-xs">›</span>
                  </div>

                  {/* Items */}
                  <div className="flex flex-col divide-y">
                    {group.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 px-4 py-3"
                      >
                        {/* Checkbox */}
                        <div className="shrink-0 pt-1">
                          <input
                            type="checkbox"
                            checked={selectedItems.has(item.id)}
                            onChange={() => toggleItem(item.id)}
                            className="accent-primary size-4 cursor-pointer"
                          />
                        </div>

                        {/* Cover */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.coverUrl}
                          alt={item.title}
                          className="border-border/40 h-[90px] w-[65px] shrink-0 rounded border object-cover"
                        />

                        {/* Title + meta  (flex-1 grows) */}
                        <div className="min-w-0 flex-1">
                          <p className="text-foreground hover:text-primary line-clamp-2 cursor-pointer text-sm leading-snug font-medium">
                            {item.title}
                          </p>
                          <p className="text-muted-foreground mt-0.5 text-xs">
                            {item.author}
                          </p>
                          <p className="text-muted-foreground mt-0.5 text-xs capitalize">
                            Condition:{" "}
                            <span className="text-foreground">
                              {item.condition}
                            </span>
                          </p>
                        </div>

                        {/* Price + qty + actions — right column */}
                        <div className="flex shrink-0 flex-col items-end gap-1.5 pl-2">
                          {/* Current price */}
                          <span className="text-base font-bold text-[#f57224]">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </span>
                          {/* Original price strikethrough */}
                          {item.originalPrice &&
                            item.originalPrice > item.price && (
                              <span className="text-muted-foreground text-xs line-through">
                                ৳
                                {(
                                  item.originalPrice * item.quantity
                                ).toLocaleString()}
                              </span>
                            )}

                          {/* Qty stepper */}
                          <div className="mt-1 flex items-center overflow-hidden rounded border">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className="text-muted-foreground hover:bg-muted flex h-7 w-7 items-center justify-center border-r text-base leading-none transition-colors disabled:pointer-events-none disabled:opacity-40"
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="text-muted-foreground hover:bg-muted flex h-7 w-7 items-center justify-center border-l text-base leading-none transition-colors"
                            >
                              +
                            </button>
                          </div>

                          {/* Wishlist + Delete */}
                          <div className="mt-0.5 flex items-center gap-2">
                            <button
                              title="Add to wishlist"
                              className="text-muted-foreground transition-colors hover:text-rose-500"
                            >
                              <Heart className="size-4" />
                            </button>
                            <button
                              title="Remove item"
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="size-4" />
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

          {/* ── Right: Order Summary ── */}
          <div className="lg:col-span-4">
            <div className="bg-card sticky top-24 overflow-hidden rounded-lg border shadow-sm">
              <div className="bg-muted/20 border-b px-5 py-3">
                <h2 className="text-base font-semibold">Order Summary</h2>
              </div>

              <div className="space-y-3 p-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({selectedCount} item
                    {selectedCount !== 1 ? "s" : ""})
                  </span>
                  <span className="font-medium">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping Fee</span>
                  <span className="font-medium">
                    ৳{deliveryFee.toLocaleString()}
                  </span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-snug">
                  * ৳60/seller inside Dhaka. Final charge at checkout.
                </p>
                <div className="flex justify-between border-t pt-3 text-base font-bold">
                  <span>Total</span>
                  <span className="text-lg text-[#f57224]">
                    ৳{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="px-5 pb-5">
                <Button
                  asChild
                  className="h-11 w-full rounded bg-[#f57224] text-sm font-bold text-white hover:bg-[#e0651f]"
                >
                  <Link href="/cart/checkout">
                    PROCEED TO CHECKOUT ({selectedCount})
                  </Link>
                </Button>
              </div>

              <div className="text-muted-foreground space-y-2 border-t px-5 py-4 text-xs">
                <div className="flex gap-2">
                  <ShieldCheck className="text-success mt-0.5 size-4 shrink-0" />
                  <span>১০০% নিরাপদ পেমেন্ট গ্যারান্টি</span>
                </div>
                <div className="flex gap-2">
                  <ShieldCheck className="text-success mt-0.5 size-4 shrink-0" />
                  <span>প্রতারণা রোধে এসক্রো সিস্টেম</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
