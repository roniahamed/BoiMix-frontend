import Link from "next/link";
import {
  Package,
  MapPin,
  Phone,
  User,
  CreditCard,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Truck,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { fetchLocal } from "@/lib/fetchLocal";
import { TimelineItem } from "@/components/shared/timeline";

export default async function OrderTrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trackingEvents: TimelineItem[] = await fetchLocal(
    "/api/orders/tracking",
  );

  // Determine current status based on the last completed event
  const lastCompletedIndex = trackingEvents
    .map((e) => e.completed)
    .lastIndexOf(true);
  const isDelivered =
    trackingEvents.length > 0 &&
    lastCompletedIndex === trackingEvents.length - 1;

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-6 md:py-10">
      {/* Header */}
      <div className="border-border/50 flex flex-col gap-3 border-b pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/orders"
            className="text-muted-foreground hover:text-foreground hover:bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-foreground text-2xl font-extrabold tracking-tight sm:text-3xl">
                Track Order
              </h1>
              <div
                className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold ${isDelivered ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400" : "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-400"}`}
              >
                {isDelivered ? (
                  <CheckCircle2 className="size-3" />
                ) : (
                  <Truck className="size-3" />
                )}
                {isDelivered ? "Delivered" : "In Transit"}
              </div>
            </div>
            <p className="text-muted-foreground mt-1 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase sm:text-sm">
              <Package className="size-4" /> ORDER ID:{" "}
              <span className="text-foreground font-mono">{id}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Tracking Timeline */}
        <div className="lg:col-span-7">
          <div className="bg-card border-border/60 relative overflow-hidden rounded-xl border shadow-xs">
            {/* Top colored bar for the card */}
            <div className="absolute top-0 right-0 left-0 h-1 bg-blue-500" />

            <div className="border-border/40 border-b px-6 py-4">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <Truck className="size-5 text-blue-500" />
                Shipping Status
              </h2>
            </div>

            <div className="p-6 sm:p-8">
              <div className="relative">
                {/* Vertical line */}
                <div className="bg-border/60 absolute top-4 bottom-4 left-[15px] w-[2px]" />

                <div className="relative z-10 space-y-8">
                  {trackingEvents.map((item, index) => {
                    const isLastCompleted = index === lastCompletedIndex;
                    return (
                      <div key={index} className="flex gap-5">
                        <div
                          className={`flex size-8 shrink-0 items-center justify-center rounded-full shadow-sm ring-4 ${
                            item.completed
                              ? isLastCompleted
                                ? "bg-blue-500 text-white ring-blue-500/20"
                                : "bg-emerald-500 text-white ring-emerald-500/10"
                              : "border-border/60 bg-muted text-muted-foreground border-2 ring-transparent"
                          }`}
                        >
                          {item.completed ? (
                            isLastCompleted ? (
                              <Truck className="size-4" />
                            ) : (
                              <CheckCircle2 className="size-4" />
                            )
                          ) : (
                            <Clock className="size-4" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1 pt-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3
                              className={`font-bold ${item.completed ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {item.title}
                            </h3>
                            {item.time && (
                              <time
                                className={`text-[11px] font-semibold tracking-wider uppercase ${item.completed ? "text-muted-foreground" : "text-muted-foreground/50"}`}
                              >
                                {item.time}
                              </time>
                            )}
                          </div>
                          {item.description && (
                            <p
                              className={`mt-1.5 text-sm ${item.completed ? "text-muted-foreground" : "text-muted-foreground/60"}`}
                            >
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Escrow Note */}
            <div className="border-t border-blue-100/50 bg-blue-50/50 p-5 dark:border-blue-900/30 dark:bg-blue-950/10">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-blue-500" />
                <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
                  <strong className="text-foreground">
                    Payment Protected:
                  </strong>{" "}
                  Your payment is securely held in escrow. It will only be
                  released to the seller after you receive and confirm the
                  package in good condition.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Details */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          {/* Delivery Details */}
          <div className="bg-card border-border/60 rounded-xl border shadow-xs">
            <div className="border-border/40 border-b px-5 py-4">
              <h2 className="flex items-center gap-2 text-base font-bold">
                <MapPin className="size-4.5 text-red-500" />
                Delivery Information
              </h2>
            </div>
            <div className="flex flex-col gap-4 p-5 text-sm">
              <div className="flex items-start gap-3">
                <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-full">
                  <User className="text-muted-foreground size-4" />
                </div>
                <div className="pt-1.5">
                  <p className="font-bold">রহিম শেখ</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-full">
                  <Phone className="text-muted-foreground size-4" />
                </div>
                <div className="pt-1.5">
                  <p className="text-muted-foreground font-medium">
                    01711-223344
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-full">
                  <MapPin className="text-muted-foreground size-4" />
                </div>
                <div className="pt-1">
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    বাড়ি ১২, রাস্তা ৫, সেকশন ৬<br />
                    মিরপুর, ঢাকা
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-card border-border/60 rounded-xl border shadow-xs">
            <div className="border-border/40 border-b px-5 py-4">
              <h2 className="flex items-center gap-2 text-base font-bold">
                <CreditCard className="size-4.5 text-purple-500" />
                Payment Details
              </h2>
            </div>
            <div className="flex flex-col gap-4 p-5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-semibold">
                  Method
                </span>
                <span className="flex items-center gap-1.5 font-bold">
                  bKash{" "}
                  <span className="rounded-md bg-purple-100 px-1.5 py-0.5 text-[9px] tracking-wider text-purple-700 uppercase dark:bg-purple-900/30 dark:text-purple-400">
                    Escrow
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-semibold">
                  Date
                </span>
                <span className="font-bold">24 Jun 2026, 10:05 AM</span>
              </div>

              <div className="border-border/50 border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-[11px] font-bold tracking-wider uppercase">
                    Total Paid
                  </span>
                  <span className="text-foreground text-xl font-extrabold">
                    ৳300
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full rounded-full font-bold shadow-sm"
            asChild
          >
            <Link href="/dashboard/orders">
              <ArrowLeft className="mr-2 size-4" /> Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
