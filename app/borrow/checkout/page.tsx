"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useBorrowCartStore,
  BorrowCartItem,
} from "@/lib/store/use-borrow-cart-store";
import { useBorrowStore } from "@/lib/store/use-borrow-store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Truck,
  ArrowLeft,
  Trash2,
  Calendar,
  CreditCard,
  Wallet,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import { ProgressStepper } from "@/components/borrow/progress-stepper";
import { EligibilityCard } from "@/components/borrow/eligibility-card";

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDirect = searchParams.get("direct") === "true";

  const {
    items: cartItems,
    directCheckoutItem,
    removeItem,
    clearCart,
  } = useBorrowCartStore();
  const items =
    isDirect && directCheckoutItem ? [directCheckoutItem] : cartItems;
  const { addOrder, wallet, orders } = useBorrowStore();

  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Group items by ownerId
  const itemsByOwner = items.reduce(
    (acc, item) => {
      if (!acc[item.ownerId]) {
        acc[item.ownerId] = {
          ownerName: item.ownerName,
          items: [],
        };
      }
      acc[item.ownerId].items.push(item);
      return acc;
    },
    {} as Record<string, { ownerName: string; items: BorrowCartItem[] }>,
  );

  // Form State
  const [ownerMethods, setOwnerMethods] = useState<
    Record<string, "meetup" | "courier">
  >(
    Object.keys(itemsByOwner).reduce(
      (acc, ownerId) => {
        acc[ownerId] = "meetup";
        return acc;
      },
      {} as Record<string, "meetup" | "courier">,
    ),
  );
  const [ownerMessages, setOwnerMessages] = useState<Record<string, string>>(
    {},
  );
  const [paymentMethod, setPaymentMethod] = useState<
    "bkash" | "nagad" | "card" | "wallet"
  >("bkash");

  const handleMethodChange = (
    ownerId: string,
    method: "meetup" | "courier",
  ) => {
    setOwnerMethods((prev) => ({ ...prev, [ownerId]: method }));
  };

  const totalBorrowFee = items.reduce((sum, item) => sum + item.borrowFee, 0);
  const totalDepositRequired = items.reduce(
    (sum, item) => sum + item.depositRequired,
    0,
  );
  const totalPayable = totalBorrowFee + 80; // Assuming fixed 80 tk courier fee if any, or flat processing fee

  const activeOrdersCount = orders.filter(
    (o) => o.borrowerId === "current-user" && o.status !== "completed",
  ).length;
  const isEligible =
    wallet.availableLimit >= totalDepositRequired && activeOrdersCount < 2;

  const handleSubmit = () => {
    if (items.length === 0) return;
    setIsSubmitting(true);

    setTimeout(() => {
      items.forEach((item) => {
        addOrder({
          bookId: item.id,
          bookTitle: item.title,
          bookImage: item.coverUrl || "/images/books/placeholder.jpg",
          borrowerId: "current-user",
          ownerId: item.ownerId,
          handoverMethod: ownerMethods[item.ownerId] || "meetup",
          depositLocked: item.depositRequired,
          borrowFee: item.borrowFee,
        });
      });

      if (!isDirect) {
        clearCart();
      }
      toast.success("Borrow Requests Sent Successfully!");
      router.push(`/dashboard/borrowed`);
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
        <BookOpen className="text-muted-foreground mx-auto mb-4 size-16" />
        <h1 className="mb-4 text-2xl font-bold">Your Borrow Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">
          Browse the library to find books to borrow.
        </p>
        <Button asChild>
          <Link href="/">Browse Books</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-md px-4 py-8 md:max-w-3xl">
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            checkoutStep > 1
              ? setCheckoutStep((prev) => (prev - 1) as 1 | 2 | 3)
              : router.back()
          }
        >
          <ArrowLeft className="size-5" />
        </Button>
        <h1 className="ml-2 text-lg font-semibold">
          {checkoutStep === 1 && "Eligibility Check"}
          {checkoutStep === 2 && "Request to Borrow"}
          {checkoutStep === 3 && "Payment"}
        </h1>
      </div>

      <ProgressStepper
        currentStep={checkoutStep}
        totalSteps={6}
        className="mb-8 hidden sm:block"
        labels={[
          "Request",
          "Review",
          "Payment",
          "Active",
          "Returning",
          "Completed",
        ]}
      />

      <div className="mb-6">
        {/* STEP 1: ELIGIBILITY */}
        {checkoutStep === 1 && (
          <div className="animate-in slide-in-from-bottom-4 space-y-6">
            <EligibilityCard
              depositRequired={totalDepositRequired}
              availableLimit={wallet.availableLimit}
              activeOrders={activeOrdersCount}
            />
            <Button
              className="h-12 w-full bg-blue-600 text-lg hover:bg-blue-700"
              disabled={!isEligible}
              onClick={() => setCheckoutStep(2)}
            >
              Continue
            </Button>
          </div>
        )}

        {/* STEP 2: REQUEST DETAILS */}
        {checkoutStep === 2 && (
          <div className="animate-in slide-in-from-bottom-4 space-y-6">
            {Object.entries(itemsByOwner).map(([ownerId, group]) => (
              <Card
                key={ownerId}
                className="overflow-hidden rounded-xl border shadow-sm"
              >
                <CardContent className="p-0">
                  <div className="bg-muted/30 border-b p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full font-bold">
                          {group.ownerName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Owner</p>
                          <p className="text-sm font-semibold">
                            {group.ownerName}
                          </p>
                        </div>
                      </div>
                      <span className="rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-600">
                        {group.items.length} Books
                      </span>
                    </div>

                    <div className="space-y-3">
                      {group.items.map((item) => (
                        <div
                          key={item.id}
                          className="bg-background flex gap-3 rounded-lg border p-3"
                        >
                          <div className="relative aspect-[3/4] w-12 shrink-0 overflow-hidden rounded">
                            <Image
                              src={
                                item.coverUrl || "/images/books/placeholder.jpg"
                              }
                              fill
                              alt={item.title}
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="line-clamp-1 text-sm font-semibold">
                              {item.title}
                            </h4>
                            <p className="text-muted-foreground text-xs">
                              {item.author}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive h-8 w-8"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-5 p-5">
                    <div>
                      <Label className="mb-3 block text-sm font-semibold">
                        Choose Delivery Method
                      </Label>
                      <RadioGroup
                        value={ownerMethods[ownerId] || "meetup"}
                        onValueChange={(val) =>
                          handleMethodChange(
                            ownerId,
                            val as "meetup" | "courier",
                          )
                        }
                        className="grid gap-3"
                      >
                        <Label
                          htmlFor={`meetup-${ownerId}`}
                          className="hover:bg-muted/50 flex cursor-pointer items-center justify-between rounded-lg border-2 p-3 [&:has([data-state=checked])]:border-blue-600 [&:has([data-state=checked])]:bg-blue-50 dark:[&:has([data-state=checked])]:bg-blue-950/20"
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem
                              value="meetup"
                              id={`meetup-${ownerId}`}
                              className="text-blue-600"
                            />
                            <div className="flex items-center gap-2">
                              <MapPin className="size-5 text-blue-600" />
                              <div>
                                <p className="text-sm font-semibold">Meetup</p>
                                <p className="text-muted-foreground text-xs">
                                  Meet in person
                                </p>
                              </div>
                            </div>
                          </div>
                        </Label>
                        <Label
                          htmlFor={`courier-${ownerId}`}
                          className="hover:bg-muted/50 flex cursor-pointer items-center justify-between rounded-lg border-2 p-3 [&:has([data-state=checked])]:border-blue-600 [&:has([data-state=checked])]:bg-blue-50 dark:[&:has([data-state=checked])]:bg-blue-950/20"
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem
                              value="courier"
                              id={`courier-${ownerId}`}
                              className="text-blue-600"
                            />
                            <div className="flex items-center gap-2">
                              <Truck className="size-5 text-blue-600" />
                              <div>
                                <p className="text-sm font-semibold">Courier</p>
                                <p className="text-muted-foreground text-xs">
                                  Deliver via courier
                                </p>
                              </div>
                            </div>
                          </div>
                        </Label>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-xs font-semibold">
                          Preferred Date & Time
                        </Label>
                        <div className="relative">
                          <Calendar className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                          <Input
                            type="datetime-local"
                            className="pl-9 text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-xs font-semibold">
                          Preferred Location
                        </Label>
                        <div className="relative">
                          <MapPin className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                          <Input
                            placeholder="e.g. Dhanmondi, Dhaka"
                            className="pl-9 text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-xs font-semibold">
                          Message to Owner (optional)
                        </Label>
                        <Textarea
                          placeholder="Write a message..."
                          className="h-20 resize-none text-sm"
                          value={ownerMessages[ownerId] || ""}
                          onChange={(e) =>
                            setOwnerMessages((prev) => ({
                              ...prev,
                              [ownerId]: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              className="h-12 w-full bg-blue-600 text-lg hover:bg-blue-700"
              onClick={() => setCheckoutStep(3)}
            >
              Proceed to Payment
            </Button>
          </div>
        )}

        {/* STEP 3: PAYMENT */}
        {checkoutStep === 3 && (
          <div className="animate-in slide-in-from-bottom-4 space-y-6">
            <Card className="overflow-hidden rounded-xl border shadow-sm">
              <CardContent className="p-0">
                <div className="bg-muted/30 border-b p-5">
                  <h3 className="mb-4 font-bold">Payment Breakdown</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Borrow Fee ({items.length} items)
                      </span>
                      <span className="font-medium">৳{totalBorrowFee}</span>
                    </div>
                    <div className="flex justify-between font-medium text-amber-600 dark:text-amber-500">
                      <span>Security Deposit (Locked)</span>
                      <span>৳{totalDepositRequired}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Courier Fee (Est.)
                      </span>
                      <span className="font-medium">৳80</span>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/5 flex items-center justify-between border-b p-5">
                  <span className="text-primary text-lg font-bold">
                    Total Payable
                  </span>
                  <span className="text-primary text-xl font-bold">
                    ৳{totalPayable}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="mb-4 font-bold">Select Payment Method</h3>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(val) =>
                      setPaymentMethod(
                        val as "bkash" | "nagad" | "card" | "wallet",
                      )
                    }
                    className="space-y-3"
                  >
                    <Label
                      htmlFor="bkash"
                      className="hover:bg-muted/50 flex cursor-pointer items-center justify-between rounded-lg border-2 p-3 [&:has([data-state=checked])]:border-blue-600 [&:has([data-state=checked])]:bg-blue-50 dark:[&:has([data-state=checked])]:bg-blue-950/20"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem
                          value="bkash"
                          id="bkash"
                          className="text-blue-600"
                        />
                        <span className="font-semibold">bKash</span>
                      </div>
                    </Label>
                    <Label
                      htmlFor="nagad"
                      className="hover:bg-muted/50 flex cursor-pointer items-center justify-between rounded-lg border-2 p-3 [&:has([data-state=checked])]:border-blue-600 [&:has([data-state=checked])]:bg-blue-50 dark:[&:has([data-state=checked])]:bg-blue-950/20"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem
                          value="nagad"
                          id="nagad"
                          className="text-blue-600"
                        />
                        <span className="font-semibold">Nagad</span>
                      </div>
                    </Label>
                    <Label
                      htmlFor="card"
                      className="hover:bg-muted/50 flex cursor-pointer items-center justify-between rounded-lg border-2 p-3 [&:has([data-state=checked])]:border-blue-600 [&:has([data-state=checked])]:bg-blue-50 dark:[&:has([data-state=checked])]:bg-blue-950/20"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem
                          value="card"
                          id="card"
                          className="text-blue-600"
                        />
                        <span className="flex items-center gap-2 font-semibold">
                          <CreditCard className="size-4" /> Card
                        </span>
                      </div>
                    </Label>
                    <Label
                      htmlFor="wallet"
                      className="hover:bg-muted/50 flex cursor-pointer items-center justify-between rounded-lg border-2 p-3 [&:has([data-state=checked])]:border-blue-600 [&:has([data-state=checked])]:bg-blue-50 dark:[&:has([data-state=checked])]:bg-blue-950/20"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem
                          value="wallet"
                          id="wallet"
                          className="text-blue-600"
                        />
                        <div className="flex flex-col">
                          <span className="flex items-center gap-2 font-semibold">
                            <Wallet className="size-4" /> Wallet Balance
                          </span>
                          <span className="text-muted-foreground ml-6 text-xs">
                            ৳{wallet.availableLimit} available
                          </span>
                        </div>
                      </div>
                    </Label>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Button
              className="h-12 w-full bg-blue-600 text-lg hover:bg-blue-700"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Securely Processing..." : `Pay ৳${totalPayable}`}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BorrowCartPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto p-8 text-center">
          Loading checkout...
        </div>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}
