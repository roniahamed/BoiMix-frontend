"use client";

import { useState } from "react";
import {
  BookOpen,
  Check,
  UserPlus,
  CreditCard,
  Repeat,
  Building,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MembershipsPublicPage() {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    name: string;
    price: string;
    type: "deposit" | "pass";
    details?: string;
  } | null>(null);

  const handleOpenCheckout = (
    name: string,
    price: string,
    type: "deposit" | "pass",
    details?: string,
  ) => {
    setSelectedItem({ name, price, type, details });
    setCheckoutModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 pt-8 pb-20">
      {/* Top Header Badge & Title */}
      <div className="space-y-3 text-center">
        <div className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-extrabold tracking-wider uppercase">
          <BookOpen className="h-3.5 w-3.5" /> Library Memberships & Passes
        </div>

        <h1 className="text-foreground text-3xl font-black tracking-tight sm:text-4xl">
          How to Borrow Books
        </h1>

        <p className="text-muted-foreground mx-auto max-w-2xl text-xs leading-relaxed font-medium sm:text-sm">
          BoiMix Central Library uses a simple two-step system.{" "}
          <strong className="text-foreground">First</strong>, become a member
          with a one-time non-refundable fee.{" "}
          <strong className="text-foreground">Then</strong>, use borrow passes
          to order books whenever you want!
        </p>
      </div>

      {/* STEP 1: One-Time Membership Fee */}
      <div className="space-y-6">
        <div className="space-y-1 text-center">
          <span className="bg-primary/10 text-primary inline-block rounded-full px-3 py-0.5 text-xs font-bold">
            Step 1
          </span>
          <h2 className="text-foreground text-xl font-black sm:text-2xl">
            One-Time Membership Fee
          </h2>
          <p className="text-muted-foreground text-xs font-medium">
            Valid for 4 years. This membership defines the maximum price limit
            of the books you can borrow.
          </p>
        </div>

        {/* 3 Membership Cards */}
        <div className="grid gap-6 sm:grid-cols-3">
          {/* Card 1: Basic Member */}
          <div className="bg-card border-border/70 hover:border-primary/40 relative flex flex-col justify-between rounded-3xl border p-6 shadow-xs transition-all hover:shadow-md">
            <span className="absolute -top-3 left-6 rounded-full bg-emerald-500 px-3 py-0.5 text-[10px] font-black tracking-wider text-white uppercase shadow-xs">
              Includes 5 Free Books!
            </span>

            <div className="space-y-4 pt-1">
              <div>
                <h3 className="text-foreground text-lg font-black">
                  Basic Member
                </h3>
                <p className="text-muted-foreground text-xs font-medium">
                  Perfect for casual readers
                </p>
              </div>

              <div>
                <p className="text-foreground text-3xl font-black">
                  ৳ 500{" "}
                  <span className="text-muted-foreground text-xs font-semibold">
                    / 4 years
                  </span>
                </p>
              </div>

              <ul className="text-muted-foreground border-border/40 space-y-2.5 border-t pt-4 text-xs font-medium">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>
                    Borrow books priced up to{" "}
                    <strong className="text-foreground">৳ 500</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>
                    Membership valid for{" "}
                    <strong className="text-foreground">4 years</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>
                    <strong className="text-foreground">Welcome Gift:</strong>{" "}
                    Borrow 5 Books For Free (valid for 2 months) for Premium
                    books
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>
                    <strong className="text-foreground">Bonus:</strong> Borrow 1
                    donated book completely free every month!
                  </span>
                </li>
              </ul>
            </div>

            <button
              onClick={() =>
                handleOpenCheckout(
                  "Basic Membership",
                  "৳ 500",
                  "deposit",
                  "Borrow limit up to ৳500",
                )
              }
              className="bg-muted hover:bg-muted/80 text-foreground mt-6 w-full rounded-xl py-2.5 text-xs font-extrabold transition-all active:scale-95"
            >
              Become Basic Member
            </button>
          </div>

          {/* Card 2: Standard Member */}
          <div className="bg-card border-primary relative flex flex-col justify-between rounded-3xl border-2 p-6 shadow-md">
            <span className="bg-primary text-primary-foreground absolute -top-3 left-6 rounded-full px-3 py-0.5 text-[10px] font-black tracking-wider uppercase shadow-xs">
              Standard Choice
            </span>

            <div className="space-y-4 pt-1">
              <div>
                <h3 className="text-foreground text-lg font-black">
                  Standard Member
                </h3>
                <p className="text-muted-foreground text-xs font-medium">
                  For avid readers & new books
                </p>
              </div>

              <div>
                <p className="text-foreground text-3xl font-black">
                  ৳ 1,000{" "}
                  <span className="text-muted-foreground text-xs font-semibold">
                    / 4 years
                  </span>
                </p>
              </div>

              <ul className="text-muted-foreground border-border/40 space-y-2.5 border-t pt-4 text-xs font-medium">
                <li className="flex items-start gap-2">
                  <Check className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Borrow books priced up to{" "}
                    <strong className="text-foreground">৳ 1,000</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Membership valid for{" "}
                    <strong className="text-foreground">4 years</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <strong className="text-foreground">Welcome Gift:</strong>{" "}
                    Borrow 5 Books For Free (valid for 2 months) for Premium
                    books
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <strong className="text-foreground">Bonus:</strong> Borrow 1
                    donated book completely free every month!
                  </span>
                </li>
              </ul>
            </div>

            <button
              onClick={() =>
                handleOpenCheckout(
                  "Standard Membership",
                  "৳ 1,000",
                  "deposit",
                  "Borrow limit up to ৳1,000",
                )
              }
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 w-full rounded-xl py-2.5 text-xs font-black shadow-sm transition-all active:scale-95"
            >
              Become Standard Member
            </button>
          </div>

          {/* Card 3: Premium Member */}
          <div className="bg-card border-border/70 relative flex flex-col justify-between rounded-3xl border p-6 shadow-xs transition-all hover:border-purple-500/40 hover:shadow-md">
            <span className="absolute -top-3 left-6 rounded-full bg-purple-600 px-3 py-0.5 text-[10px] font-black tracking-wider text-white uppercase shadow-xs">
              Premium Choice
            </span>

            <div className="space-y-4 pt-1">
              <div>
                <h3 className="text-foreground text-lg font-black">
                  Premium Member
                </h3>
                <p className="text-muted-foreground text-xs font-medium">
                  For very expensive premium books
                </p>
              </div>

              <div>
                <p className="text-foreground text-3xl font-black">
                  ৳ 2,000{" "}
                  <span className="text-muted-foreground text-xs font-semibold">
                    / 4 years
                  </span>
                </p>
              </div>

              <ul className="text-muted-foreground border-border/40 space-y-2.5 border-t pt-4 text-xs font-medium">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                  <span>
                    Borrow books priced up to{" "}
                    <strong className="text-foreground">৳ 2,000 or more</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                  <span>
                    Membership valid for{" "}
                    <strong className="text-foreground">4 years</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                  <span>
                    <strong className="text-foreground">Welcome Gift:</strong>{" "}
                    Borrow 5 Books For Free (valid for 2 months) for Premium
                    books
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                  <span>
                    <strong className="text-foreground">Bonus:</strong> Borrow 1
                    donated book completely free every month!
                  </span>
                </li>
              </ul>
            </div>

            <button
              onClick={() =>
                handleOpenCheckout(
                  "Premium Membership",
                  "৳ 2,000",
                  "deposit",
                  "Borrow limit up to ৳2,000+",
                )
              }
              className="mt-6 w-full rounded-xl bg-purple-500/10 py-2.5 text-xs font-extrabold text-purple-600 transition-all hover:bg-purple-500/20 active:scale-95"
            >
              Become Premium Member
            </button>
          </div>
        </div>
      </div>

      {/* STEP 2: Borrow Passes (Top-Up) */}
      <div className="space-y-6 pt-4">
        <div className="space-y-1 text-center">
          <span className="inline-block rounded-full bg-amber-500/15 px-3 py-0.5 text-xs font-bold text-amber-600">
            Step 2
          </span>
          <h2 className="text-foreground text-xl font-black sm:text-2xl">
            Borrow Passes (Top-Up)
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xs font-medium">
            Borrow passes are{" "}
            <strong className="text-foreground">always required</strong> to
            order Premium Books. Once you exhaust your welcome passes, simply
            top up with a package whenever you want to read more and premium
            books.
          </p>
        </div>

        {/* 3 Pass Cards */}
        <div className="grid gap-6 sm:grid-cols-3">
          {/* Mini Pass */}
          <div className="bg-card border-border/70 hover:border-primary/40 relative flex flex-col justify-between rounded-3xl border p-6 shadow-xs transition-all">
            <div className="space-y-4">
              <h3 className="text-foreground text-lg font-black">Mini Pass</h3>
              <p className="text-foreground text-3xl font-black">৳ 40</p>

              <div className="border-border/40 text-muted-foreground space-y-2 border-t pt-4 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <span className="bg-muted text-foreground flex h-7 w-7 items-center justify-center rounded-lg font-bold">
                    📖
                  </span>
                  <div>
                    <p className="text-foreground font-extrabold">2 Books</p>
                    <p className="text-muted-foreground text-[11px]">
                      Borrow capacity
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="bg-muted text-foreground flex h-7 w-7 items-center justify-center rounded-lg font-bold">
                    🕒
                  </span>
                  <div>
                    <p className="text-foreground font-extrabold">1 Month</p>
                    <p className="text-muted-foreground text-[11px]">
                      Pass validity
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                handleOpenCheckout(
                  "Mini Borrow Pass",
                  "৳ 40",
                  "pass",
                  "2 Books • 1 Month Validity",
                )
              }
              className="bg-muted hover:bg-muted/80 text-foreground mt-6 w-full rounded-xl py-2.5 text-xs font-extrabold transition-all active:scale-95"
            >
              Buy Mini Pass
            </button>
          </div>

          {/* Standard Pass (Most Popular) */}
          <div className="bg-card relative flex flex-col justify-between rounded-3xl border-2 border-amber-500 p-6 shadow-md">
            <span className="absolute -top-3 left-6 rounded-full bg-amber-500 px-3 py-0.5 text-[10px] font-black tracking-wider text-slate-950 uppercase shadow-xs">
              Most Popular
            </span>

            <div className="space-y-4">
              <h3 className="text-foreground text-lg font-black">
                Standard Pass
              </h3>
              <p className="text-foreground text-3xl font-black">৳ 70</p>

              <div className="border-border/40 text-muted-foreground space-y-2 border-t pt-4 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 font-bold text-amber-600">
                    📖
                  </span>
                  <div>
                    <p className="text-foreground font-extrabold">4 Books</p>
                    <p className="text-muted-foreground text-[11px]">
                      Borrow capacity
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 font-bold text-amber-600">
                    🕒
                  </span>
                  <div>
                    <p className="text-foreground font-extrabold">1 Month</p>
                    <p className="text-muted-foreground text-[11px]">
                      Pass validity
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                handleOpenCheckout(
                  "Standard Borrow Pass",
                  "৳ 70",
                  "pass",
                  "4 Books • 1 Month Validity",
                )
              }
              className="mt-6 w-full rounded-xl bg-amber-500 py-2.5 text-xs font-black text-slate-950 shadow-xs transition-all hover:bg-amber-400 active:scale-95"
            >
              Buy Standard Pass
            </button>
          </div>

          {/* Pro Pass (Best Value) */}
          <div className="bg-card border-border/70 relative flex flex-col justify-between rounded-3xl border p-6 shadow-xs transition-all hover:border-emerald-500/40">
            <span className="absolute -top-3 left-6 rounded-full bg-emerald-500 px-3 py-0.5 text-[10px] font-black tracking-wider text-white uppercase shadow-xs">
              Best Value
            </span>

            <div className="space-y-4">
              <h3 className="text-foreground text-lg font-black">Pro Pass</h3>
              <p className="text-foreground text-3xl font-black">৳ 100</p>

              <div className="border-border/40 text-muted-foreground space-y-2 border-t pt-4 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 font-bold text-emerald-600">
                    📖
                  </span>
                  <div>
                    <p className="text-foreground font-extrabold">7 Books</p>
                    <p className="text-muted-foreground text-[11px]">
                      Borrow capacity
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 font-bold text-emerald-600">
                    🕒
                  </span>
                  <div>
                    <p className="text-foreground font-extrabold">2 Months</p>
                    <p className="text-muted-foreground text-[11px]">
                      Pass validity
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                handleOpenCheckout(
                  "Pro Borrow Pass",
                  "৳ 100",
                  "pass",
                  "7 Books • 2 Months Validity",
                )
              }
              className="bg-muted hover:bg-muted/80 text-foreground mt-6 w-full rounded-xl py-2.5 text-xs font-extrabold transition-all active:scale-95"
            >
              Buy Pro Pass
            </button>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS SECTION */}
      <div className="border-border/50 space-y-6 border-t pt-6 text-center">
        <div className="space-y-1">
          <h2 className="text-foreground text-xl font-black sm:text-2xl">
            How It Works
          </h2>
          <p className="text-muted-foreground text-xs font-medium">
            Four simple steps to start your reading journey
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          <div className="bg-card border-border/60 space-y-2 rounded-2xl border p-5 text-center shadow-2xs">
            <div className="bg-primary/10 text-primary mx-auto flex h-12 w-12 items-center justify-center rounded-2xl">
              <UserPlus className="h-6 w-6" />
            </div>
            <h3 className="text-foreground text-sm font-bold">
              1. Become a Member
            </h3>
            <p className="text-muted-foreground text-xs font-medium">
              Pay the one-time fee to set your borrow limit and unlock the
              library.
            </p>
          </div>

          <div className="bg-card border-border/60 space-y-2 rounded-2xl border p-5 text-center shadow-2xs">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
              <CreditCard className="h-6 w-6" />
            </div>
            <h3 className="text-foreground text-sm font-bold">
              2. Get Welcome Gift
            </h3>
            <p className="text-muted-foreground text-xs font-medium">
              Instantly receive 5 free book borrows to use within your first 2
              months.
            </p>
          </div>

          <div className="bg-card border-border/60 space-y-2 rounded-2xl border p-5 text-center shadow-2xs">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-500">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-foreground text-sm font-bold">
              3. Borrow & Read
            </h3>
            <p className="text-muted-foreground text-xs font-medium">
              Order books online and get them delivered. Plus, read 1 donated
              book free every month!
            </p>
          </div>

          <div className="bg-card border-border/60 space-y-2 rounded-2xl border p-5 text-center shadow-2xs">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
              <Repeat className="h-6 w-6" />
            </div>
            <h3 className="text-foreground text-sm font-bold">
              4. Top-Up Passes
            </h3>
            <p className="text-muted-foreground text-xs font-medium">
              When your free passes run out, buy top-up packages to keep
              reading.
            </p>
          </div>
        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <div className="border-border/50 space-y-4 border-t pt-6">
        <div className="space-y-1 text-center">
          <h2 className="text-foreground text-xl font-black sm:text-2xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-xs font-medium">
            Got questions? We&apos;ve got answers.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full max-w-3xl space-y-2"
        >
          <AccordionItem
            value="faq-1"
            className="bg-card border-border/60 rounded-xl border px-4"
          >
            <AccordionTrigger className="text-foreground text-xs font-bold hover:no-underline sm:text-sm">
              Is the membership fee refundable?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-xs font-medium">
              The one-time deposit acts as security while your membership is
              active. It is non-refundable during the 4-year period.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="faq-2"
            className="bg-card border-border/60 rounded-xl border px-4"
          >
            <AccordionTrigger className="text-foreground text-xs font-bold hover:no-underline sm:text-sm">
              What happens after 4 years?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-xs font-medium">
              After 4 years, you can renew your membership for another cycle or
              request a security deposit settlement minus any pending dues.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="faq-3"
            className="bg-card border-border/60 rounded-xl border px-4"
          >
            <AccordionTrigger className="text-foreground text-xs font-bold hover:no-underline sm:text-sm">
              Can I borrow Premium books for free?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-xs font-medium">
              Yes! Your 5 Welcome Gift passes allow you to borrow premium books
              for free in your first 2 months.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="faq-4"
            className="bg-card border-border/60 rounded-xl border px-4"
          >
            <AccordionTrigger className="text-foreground text-xs font-bold hover:no-underline sm:text-sm">
              How do the free donated books work?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-xs font-medium">
              Every month, you can borrow 1 book donated by the community with
              zero pass consumption.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="faq-5"
            className="bg-card border-border/60 rounded-xl border px-4"
          >
            <AccordionTrigger className="text-foreground text-xs font-bold hover:no-underline sm:text-sm">
              How long can I keep a borrowed book?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-xs font-medium">
              Standard loan period is 14 to 21 days depending on your pass type,
              with free extension options in your dashboard.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Checkout Modal Dialog */}
      <Dialog open={checkoutModalOpen} onOpenChange={setCheckoutModalOpen}>
        {selectedItem && (
          <DialogContent className="max-w-md space-y-4 rounded-2xl p-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg font-extrabold">
                <Building className="text-primary h-5 w-5" /> Confirm Order &
                Checkout
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs">
                You are purchasing {selectedItem.name} ({selectedItem.price})
              </DialogDescription>
            </DialogHeader>

            <div className="bg-muted/40 border-border/50 space-y-2 rounded-xl border p-4 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-muted-foreground">Item Name:</span>
                <span className="text-foreground font-bold">
                  {selectedItem.name}
                </span>
              </div>

              {selectedItem.details && (
                <div className="flex justify-between font-semibold">
                  <span className="text-muted-foreground">
                    Capacity / Benefit:
                  </span>
                  <span className="text-foreground font-bold">
                    {selectedItem.details}
                  </span>
                </div>
              )}

              <div className="border-border/30 flex justify-between border-t pt-2 font-semibold">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-bold text-emerald-600">
                  bKash / Nagad Escrow
                </span>
              </div>

              <div className="border-border/30 text-foreground flex justify-between border-t pt-2 text-sm font-extrabold">
                <span>Total Amount:</span>
                <span className="text-primary">{selectedItem.price}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  alert(
                    `Successfully completed purchase of ${selectedItem.name}! Added to your active BoiMix Library account.`,
                  );
                  setCheckoutModalOpen(false);
                }}
                className="bg-primary text-primary-foreground w-full rounded-xl py-2.5 text-xs font-bold shadow-md transition-transform active:scale-95"
              >
                Pay & Confirm Checkout
              </button>

              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="bg-muted text-foreground w-full rounded-xl py-2 text-xs font-bold"
              >
                Cancel
              </button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
