"use client";

import Link from "next/link";
import { CheckCircle2, FileText, Package } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/lib/store/use-order-store";

export default function OrderSuccessPage() {
  const [mounted, setMounted] = useState(false);
  const orders = useOrderStore((state) => state.orders);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  if (!mounted) {
    return null;
  }

  const latestOrder = orders.length > 0 ? orders[0] : null;
  const orderId = latestOrder
    ? latestOrder.id
    : "ORD-" +
      Math.floor(12345 * 1000000)
        .toString()
        .padStart(6, "0");

  return (
    <div className="boimix-container-wide flex min-h-[70vh] flex-col items-center justify-center py-12 text-center">
      <div className="bg-success/10 text-success mb-8 flex size-24 items-center justify-center rounded-full sm:size-32">
        <CheckCircle2 className="size-12 sm:size-16" />
      </div>

      <h1 className="type-heading mb-4 text-3xl sm:text-4xl">
        অর্ডার সফল হয়েছে!
      </h1>
      <p className="text-muted-foreground mx-auto max-w-lg text-lg">
        আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। সেলারকে নোটিফিকেশন পাঠানো হয়েছে।
      </p>

      <div className="bg-card mt-8 mb-10 overflow-hidden rounded-xl border p-6 shadow-sm sm:min-w-[400px]">
        <div className="text-muted-foreground mb-4 text-sm">Order ID</div>
        <div className="text-foreground font-mono text-2xl font-bold tracking-widest">
          {orderId}
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Button asChild size="lg" className="h-14 gap-2 px-8 text-base">
          <Link href={`/orders/tracking/${orderId}`}>
            <Package className="size-5" />
            Track Order
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="h-14 gap-2 px-8 text-base"
        >
          <Link href="/dashboard/purchases">
            <FileText className="size-5" />
            View All Orders
          </Link>
        </Button>
      </div>

      <div className="mt-12">
        <Button
          asChild
          variant="link"
          className="text-muted-foreground hover:text-primary"
        >
          <Link href="/books">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
