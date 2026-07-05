"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ShoppingBag, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BuyCart } from "@/components/cart/buy-cart";
import { BorrowCart } from "@/components/cart/borrow-cart";
import { useCartStore } from "@/lib/store/use-cart-store";
import { useBorrowCartStore } from "@/lib/store/use-borrow-cart-store";

function CartPageContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") === "borrow" ? "borrow" : "buy";

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [mounted, setMounted] = useState(false);

  const buyItemsCount = useCartStore((state) => state.items.length);
  const borrowItemsCount = useBorrowCartStore((state) => state.items.length);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  if (!mounted) return null;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-6 md:py-10">
      <h1 className="type-heading mb-6 text-2xl md:text-3xl">Your Cart</h1>

      <Tabs
        defaultValue={activeTab}
        onValueChange={(val) => {
          setActiveTab(val);
          window.history.replaceState(null, "", `/cart?tab=${val}`);
        }}
        className="min-h-[600px] w-full"
      >
        <TabsList className="mb-8 grid h-12 w-full max-w-[400px] grid-cols-2">
          <TabsTrigger
            value="buy"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 text-base"
          >
            <ShoppingBag className="size-4" />
            Buy ({buyItemsCount})
          </TabsTrigger>
          <TabsTrigger
            value="borrow"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 text-base"
          >
            <BookOpen className="size-4" />
            Borrow ({borrowItemsCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="buy" className="m-0 mt-2">
          <BuyCart />
        </TabsContent>

        <TabsContent value="borrow" className="m-0 mt-2">
          <BorrowCart />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading cart...</div>}>
      <CartPageContent />
    </Suspense>
  );
}
