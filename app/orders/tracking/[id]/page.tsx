import Link from "next/link";
import {
  Package,
  MapPin,
  Phone,
  User,
  Calendar,
  CreditCard,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Timeline } from "@/components/shared/timeline";
import { fetchLocal } from "@/lib/fetchLocal";

export default async function OrderTrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
  const trackingEvents: any[] = await fetchLocal('/api/orders/tracking');

  return (
    <div className="boimix-container-wide py-8 md:py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="type-heading text-2xl sm:text-3xl">Track Order</h1>
          <p className="text-muted-foreground mt-1 font-mono text-sm">
            Order ID: {id}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/orders">Back to Orders</Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Tracking Timeline */}
        <div className="lg:col-span-7">
          <div className="bg-card rounded-xl border p-6 shadow-sm sm:p-8">
            <h2 className="type-heading mb-6 flex items-center gap-2 text-xl">
              <Package className="text-primary size-5" />
              Order Status
            </h2>
            <div className="relative">
              {/* Vertical line connecting timeline items */}
              <div className="bg-border absolute top-4 bottom-4 left-[11px] w-[2px]" />
              <Timeline items={trackingEvents} className="relative z-10" />
            </div>

            <div className="bg-info/10 text-info mt-8 rounded-lg p-4 text-sm">
              <p>
                <strong>Note:</strong> Escrow payment will be released to the
                seller only after you confirm receiving the package in good
                condition.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Order Details */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          {/* Delivery Details */}
          <div className="bg-card rounded-xl border p-6 shadow-sm">
            <h2 className="type-heading mb-4 text-lg">Delivery Information</h2>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <User className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                <div>
                  <p className="font-medium">রহিম শেখ</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                <div>
                  <p className="text-muted-foreground">01711-223344</p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                <div>
                  <p className="text-muted-foreground">
                    বাড়ি ১২, রাস্তা ৫, সেকশন ৬<br />
                    মিরপুর, ঢাকা
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-card rounded-xl border p-6 shadow-sm">
            <h2 className="type-heading mb-4 text-lg">Payment Details</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground flex items-center gap-2">
                  <CreditCard className="size-4" />
                  <span>Method</span>
                </div>
                <span className="font-medium">bKash (Escrow)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="size-4" />
                  <span>Date</span>
                </div>
                <span className="font-medium">24 Jun 2026, 10:05 AM</span>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold">Total Paid</span>
                  <span className="text-accent text-lg font-bold">৳300</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
