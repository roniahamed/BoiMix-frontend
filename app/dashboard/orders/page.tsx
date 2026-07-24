"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Calendar } from "lucide-react";
import { format } from "date-fns";

import { useOrderStore } from "@/lib/store/use-order-store";
import { Button } from "@/components/ui/button";

export default function PurchasesPage() {
  const [mounted, setMounted] = useState(false);
  const orders = useOrderStore((state) => state.orders);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  if (!mounted) {
    return null; // Or skeleton
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Purchase History</h1>
        <p className="text-muted-foreground mt-2">
          Your BoiMix order history and current status.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
          <Package className="text-muted-foreground mb-4 size-12 opacity-50" />
          <h2 className="text-xl font-semibold">No Orders Found</h2>
          <p className="text-muted-foreground mt-2 max-w-sm">
            You haven&apos;t purchased any books yet. Explore the marketplace to
            find your next great read.
          </p>
          <Button asChild className="mt-6">
            <Link href="/books?type=sell">Browse Books</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-card overflow-hidden rounded-xl border shadow-sm"
            >
              <div className="bg-muted/30 flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4">
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  <div>
                    <p className="text-muted-foreground text-xs tracking-wider uppercase">
                      Order Placed
                    </p>
                    <div className="mt-1 flex items-center gap-1.5 font-medium">
                      <Calendar className="size-4" />
                      {format(new Date(order.date), "dd MMM yyyy")}
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs tracking-wider uppercase">
                      Total
                    </p>
                    <p className="mt-1 font-medium">৳{order.total}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs tracking-wider uppercase">
                      Order ID
                    </p>
                    <p className="mt-1 font-mono font-medium">{order.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`focus:ring-ring inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                      order.status === "processing"
                        ? "bg-primary text-primary-foreground hover:bg-primary/80 border-transparent"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent"
                    }`}
                  >
                    {order.status}
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/orders/tracking/${order.id}`}>Track</Link>
                  </Button>
                </div>
              </div>

              <div className="divide-y p-6">
                {order.items.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.coverUrl}
                      alt={item.title}
                      className="h-24 w-16 rounded-md object-cover shadow-sm"
                    />
                    <div className="flex flex-1 flex-col">
                      <h4 className="line-clamp-1 font-semibold">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {item.author}
                      </p>

                      <div className="mt-auto flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-accent font-medium">
                          ৳{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
