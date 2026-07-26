"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  CalendarDays,
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  ShoppingBag,
  CreditCard,
  Receipt,
} from "lucide-react";
import { format } from "date-fns";

import { useOrderStore, Order } from "@/lib/store/use-order-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ─── Status config ─── */
const statusConfig = {
  processing: {
    label: "Processing",
    color:
      "text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
    bar: "bg-amber-400",
    icon: <Clock className="size-3" />,
    step: 1,
  },
  shipped: {
    label: "Shipped",
    color:
      "text-blue-700 bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800",
    bar: "bg-blue-500",
    icon: <Truck className="size-3" />,
    step: 2,
  },
  delivered: {
    label: "Delivered",
    color:
      "text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
    bar: "bg-emerald-500",
    icon: <CheckCircle2 className="size-3" />,
    step: 3,
  },
};

const paymentLabels: Record<Order["paymentMethod"], string> = {
  cod: "Cash on Delivery",
  bkash: "bKash",
  nagad: "Nagad",
};

/* ─── Timeline steps ─── */
const STEPS = [
  {
    key: "processing",
    label: "Order Placed",
    icon: <ShoppingBag className="size-3" />,
  },
  { key: "shipped", label: "Shipped", icon: <Truck className="size-3" /> },
  {
    key: "delivered",
    label: "Delivered",
    icon: <CheckCircle2 className="size-3" />,
  },
];

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const sc = statusConfig[order.status] || statusConfig.processing;
  const currentStep = sc.step;

  return (
    <div className="bg-card border-border/60 relative overflow-hidden rounded-xl border shadow-xs">
      {/* Left colored bar */}
      <div className={cn("absolute top-0 bottom-0 left-0 w-1", sc.bar)} />

      {/* Card Header */}
      <div className="border-border/50 bg-muted/20 flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3 pl-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5">
          {/* Order ID */}
          <div>
            <p className="text-muted-foreground text-[9px] font-extrabold tracking-wider uppercase">
              Order ID
            </p>
            <p className="font-mono text-xs font-bold tracking-wider">
              {order.id}
            </p>
          </div>
          {/* Date */}
          <div>
            <p className="text-muted-foreground text-[9px] font-extrabold tracking-wider uppercase">
              Placed On
            </p>
            <div className="flex items-center gap-1 text-xs font-semibold">
              <CalendarDays className="size-3.5 text-blue-500" />
              {format(new Date(order.date), "dd MMM yyyy")}
            </div>
          </div>
          {/* Payment */}
          <div>
            <p className="text-muted-foreground text-[9px] font-extrabold tracking-wider uppercase">
              Payment
            </p>
            <div className="flex items-center gap-1 text-xs font-semibold">
              <CreditCard className="size-3.5 text-purple-500" />
              {paymentLabels[order.paymentMethod]}
            </div>
          </div>
          {/* Total */}
          <div>
            <p className="text-muted-foreground text-[9px] font-extrabold tracking-wider uppercase">
              Total
            </p>
            <p className="text-sm font-bold">৳{order.total}</p>
          </div>
        </div>

        {/* Status badge + action */}
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold",
              sc.color,
            )}
          >
            {sc.icon}
            {sc.label}
          </div>
          <Link
            href={`/orders/tracking/${order.id}`}
            className="text-muted-foreground hover:text-foreground hover:bg-muted flex h-7 items-center gap-1 rounded-full border px-3 text-[10px] font-semibold transition-colors"
          >
            Track <ChevronRight className="size-3" />
          </Link>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="border-border/40 border-b px-6 py-4">
        <div className="relative flex items-start justify-between">
          {/* Track line */}
          <div className="bg-border absolute top-[11px] right-[11px] left-[11px] h-0.5" />
          <div
            className="absolute top-[11px] left-[11px] h-0.5 bg-emerald-500 transition-all duration-500"
            style={{
              width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
            }}
          />
          {STEPS.map((step, i) => {
            const done = i + 1 < currentStep;
            const active = i + 1 === currentStep;
            return (
              <div
                key={step.key}
                className="relative z-10 flex flex-col items-center gap-1.5"
              >
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-[10px] shadow-sm transition-all",
                    done
                      ? "bg-emerald-500 text-white ring-4 ring-emerald-500/15"
                      : active
                        ? "border-primary text-primary ring-primary/10 dark:bg-background border-2 bg-white ring-4"
                        : "border-border bg-card text-muted-foreground border-2",
                  )}
                >
                  {done ? <CheckCircle2 className="size-3" /> : step.icon}
                </div>
                <span
                  className={cn(
                    "text-center text-[9px] leading-tight font-semibold",
                    done || active
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Items */}
      <div className="px-5 pb-1 pl-6">
        {(expanded ? order.items : order.items.slice(0, 2)).map(
          (item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="border-border/30 flex gap-3 border-b py-3.5 last:border-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.coverUrl}
                alt={item.title}
                className="h-16 w-11 shrink-0 rounded object-cover shadow-sm"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <h4 className="line-clamp-1 text-sm font-bold">{item.title}</h4>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  {item.author}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-muted-foreground text-[11px]">
                    Qty: {item.quantity}
                  </span>
                  <span className="text-sm font-bold">
                    ৳{item.price * item.quantity}
                  </span>
                </div>
              </div>
            </div>
          ),
        )}

        {/* Show more / less */}
        {order.items.length > 2 && (
          <button
            onClick={() => setExpanded((p) => !p)}
            className="text-muted-foreground hover:text-foreground w-full py-2.5 text-center text-xs font-semibold transition-colors"
          >
            {expanded
              ? "Show less"
              : `+ ${order.items.length - 2} more item${order.items.length - 2 > 1 ? "s" : ""}`}
          </button>
        )}
      </div>

      {/* Footer: Subtotal breakdown */}
      <div className="border-border/40 bg-muted/10 border-t px-5 py-3 pl-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-muted-foreground flex items-center gap-4 text-[11px]">
            <span>
              Subtotal:{" "}
              <strong className="text-foreground">৳{order.subtotal}</strong>
            </span>
            <span>
              Delivery:{" "}
              <strong className="text-foreground">৳{order.deliveryFee}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold transition-colors">
              <Receipt className="size-3" /> Invoice
            </button>
            {order.status === "delivered" && (
              <button className="flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[10px] font-semibold text-amber-700 transition-colors hover:bg-amber-100 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                ⭐ Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function OrdersPage() {
  const [mounted, setMounted] = useState(false);
  const orders = useOrderStore((state) => state.orders);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="border-border/50 flex flex-col gap-1 border-b pb-5">
        <h1 className="text-foreground flex items-center gap-2.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
          <Package className="h-7 w-7 text-purple-500" />
          Purchase History
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Track your orders, view invoices, and leave reviews.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="border-border/50 flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center">
          <div className="bg-muted/40 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
            <ShoppingBag className="text-muted-foreground size-7" />
          </div>
          <h2 className="text-base font-bold">No orders yet</h2>
          <p className="text-muted-foreground mt-1 max-w-xs text-sm">
            You haven&apos;t purchased any books yet. Explore the marketplace to
            find your next read.
          </p>
          <Button asChild size="sm" className="mt-5 rounded-full">
            <Link href="/books?type=sell">
              Browse Books <ChevronRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
