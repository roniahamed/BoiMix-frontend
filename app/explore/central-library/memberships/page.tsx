import Link from "next/link";
import { Check, Info, Sparkles, AlertCircle, BookOpen } from "lucide-react";

import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MembershipsPage() {
  return (
    <MainLayout>
      <div className="boimix-container py-8 sm:py-12 md:py-20">
        <div className="mx-auto mb-10 max-w-3xl px-4 text-center sm:px-0">
          <Badge className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 font-medium tracking-wide uppercase">
            <Sparkles className="size-4" />
            Library Memberships & Passes
          </Badge>
          <h1 className="text-foreground mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            How to Borrow Books
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
            BoiMix Central Library uses a simple two-step system. First, become
            a member with a one-time refundable deposit. Then, use borrow passes
            to order books whenever you want!
          </p>
        </div>

        {/* STEP 1: MEMBERSHIP DEPOSIT */}
        <div className="mb-16 md:mb-24">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <div className="mb-3 inline-flex h-8 items-center justify-center rounded-full bg-blue-100 px-4 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
              Step 1
            </div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
              One-Time Membership Deposit
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Valid for 4 years. This deposit acts as security and defines the
              maximum price limit of the books you can borrow.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {/* Basic Member */}
            <Card className="relative flex flex-col overflow-hidden border-slate-200 bg-gradient-to-b from-slate-100/80 to-white dark:border-slate-800 dark:from-slate-900/80 dark:to-slate-950">
              <div className="absolute top-0 right-0 rounded-bl-lg bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                Includes 5 Free Books!
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Basic Member</CardTitle>
                <CardDescription>Perfect for regular readers</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6 flex items-end gap-1">
                  <span className="text-4xl font-bold">৳৫০০</span>
                  <span className="text-muted-foreground mb-1">/ deposit</span>
                </div>
                <ul className="text-muted-foreground space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    <span>
                      Borrow books priced up to <strong>৳500</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    <span>
                      Membership valid for <strong>4 years</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    <span>
                      <strong>Welcome Gift:</strong> Borrow 5 Books for Free
                      (valid for 2 months)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    <span>
                      <strong>Bonus:</strong> Unlimited free borrowing of 5000+
                      donated books!
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-500">
                    <Info className="mt-0.5 size-4 shrink-0" />
                    Deposit is refundable upon cancellation
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Become Basic Member
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Member */}
            <Card className="relative flex flex-col overflow-hidden border-blue-200 bg-gradient-to-br from-blue-100/80 via-blue-50/50 to-indigo-100/60 shadow-xl shadow-blue-900/5 dark:border-blue-800/50 dark:from-blue-950/60 dark:via-slate-900 dark:to-indigo-950/40 dark:shadow-blue-900/20">
              <div className="absolute inset-x-0 top-0 h-1 bg-blue-600"></div>
              <div className="absolute top-3 right-3">
                <Badge className="bg-blue-600 text-white hover:bg-blue-700">
                  Premium Choice
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Premium Member</CardTitle>
                <CardDescription>
                  For avid readers & expensive books
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6 flex items-end gap-1">
                  <span className="text-4xl font-bold">৳১০০০</span>
                  <span className="text-muted-foreground mb-1">/ deposit</span>
                </div>
                <ul className="text-foreground space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                    <span>
                      Borrow books priced up to <strong>৳1000</strong> or more
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                    <span>
                      Membership valid for <strong>4 years</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                    <span>
                      <strong>Welcome Gift:</strong> Borrow 5 Books for Free
                      (valid for 2 months)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                    <span>
                      <strong>Bonus:</strong> Unlimited free borrowing of 5000+
                      donated books!
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-500 dark:text-slate-400">
                    <Info className="mt-0.5 size-4 shrink-0" />
                    Deposit is refundable upon cancellation
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  Become Premium Member
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* STEP 2: BORROW PASSES */}
        <div>
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <div className="mb-3 inline-flex h-8 items-center justify-center rounded-full bg-orange-100 px-4 text-sm font-bold text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
              Step 2
            </div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
              Borrow Passes (Top-Up)
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Borrow passes are used to order <strong>Premium Books</strong>.
              Once you exhaust your welcome passes, simply top up with a borrow
              pass package whenever you want to read more.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Mini Pass */}
            <Card className="relative flex flex-col overflow-hidden border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Mini Pass</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6 flex flex-col">
                  <span className="text-4xl font-bold">৳৪০</span>
                </div>
                <ul className="text-muted-foreground space-y-4 text-sm">
                  <li className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                      <BookOpen className="size-4 text-slate-600 dark:text-slate-300" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        2 Books
                      </p>
                      <p className="text-xs">Borrow capacity</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                      <AlertCircle className="size-4 text-slate-600 dark:text-slate-300" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        1 Month
                      </p>
                      <p className="text-xs">Pass validity</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Buy Mini Pass
                </Button>
              </CardFooter>
            </Card>

            {/* Standard Pass */}
            <Card className="relative z-10 flex flex-col overflow-hidden border-amber-200/60 bg-gradient-to-br from-amber-100/60 via-orange-50/30 to-white shadow-xl shadow-amber-900/5 lg:scale-105 dark:border-amber-900/30 dark:from-amber-950/20 dark:via-slate-900 dark:to-slate-950 dark:shadow-amber-900/20">
              <div className="absolute inset-x-0 top-0 h-1 bg-amber-500"></div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-amber-500 text-white hover:bg-amber-600">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Standard Pass</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6 flex flex-col">
                  <span className="text-4xl font-bold">৳৭০</span>
                </div>
                <ul className="text-foreground space-y-4 text-sm">
                  <li className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                      <BookOpen className="size-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        4 Books
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Borrow capacity
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                      <AlertCircle className="size-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        1 Month
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Pass validity
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-amber-500 text-white hover:bg-amber-600">
                  Buy Standard Pass
                </Button>
              </CardFooter>
            </Card>

            {/* Pro Pass */}
            <Card className="relative flex flex-col overflow-hidden border-emerald-200/60 bg-gradient-to-br from-emerald-100/60 via-emerald-50/30 to-white dark:border-emerald-900/30 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-950">
              <div className="absolute top-4 right-4">
                <Badge
                  variant="outline"
                  className="border-emerald-500 text-emerald-600 dark:text-emerald-400"
                >
                  Best Value
                </Badge>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Pro Pass</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6 flex flex-col">
                  <span className="text-4xl font-bold">৳১০০</span>
                </div>
                <ul className="text-muted-foreground space-y-4 text-sm">
                  <li className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <BookOpen className="size-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        7 Books
                      </p>
                      <p className="text-xs">Borrow capacity</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <AlertCircle className="size-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        2 Months
                      </p>
                      <p className="text-xs">Pass validity</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20"
                >
                  Buy Pro Pass
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
