import Link from "next/link";
import { Check, Info, Sparkles } from "lucide-react";

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
        <div className="mx-auto mb-8 max-w-3xl px-4 text-center sm:mb-12 sm:px-0">
          <Badge className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 font-medium tracking-wide uppercase">
            <Sparkles className="size-4" />
            Library Pass
          </Badge>
          <h1 className="text-foreground mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            BoiMix Library Memberships
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
            Choose a plan that fits your reading habits. Members get free
            delivery, extended borrow periods, and zero deposit fees for Central
            Library books.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Pay As You Go */}
          <Card className="relative flex flex-col overflow-hidden border-slate-200 bg-gradient-to-b from-slate-100/80 to-white dark:border-slate-800 dark:from-slate-900/80 dark:to-slate-950">
            <CardHeader>
              <CardTitle className="text-xl">Basic / Pay As You Go</CardTitle>
              <CardDescription>Perfect for occasional readers</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-3xl font-bold">Free</span>
              </div>
              <ul className="text-muted-foreground space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" />
                  Access to all Central Library books
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" />
                  Pay per borrow (৳50-100)
                </li>
                <li className="text-muted-foreground/60 flex items-center gap-2">
                  <Info className="size-4" />
                  Full deposit required
                </li>
                <li className="text-muted-foreground/60 flex items-center gap-2">
                  <Info className="size-4" />
                  Standard delivery fees apply
                </li>
                <li className="text-muted-foreground/60 flex items-center gap-2">
                  <Info className="size-4" />
                  14 days max borrow time
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/auth/login">Create Free Account</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Regular Pass */}
          <Card className="relative z-10 flex flex-col overflow-hidden border-blue-200 bg-gradient-to-br from-blue-100/80 via-blue-50/50 to-indigo-100/60 shadow-xl shadow-blue-900/5 lg:scale-105 dark:border-blue-800/50 dark:from-blue-950/60 dark:via-slate-900 dark:to-indigo-950/40 dark:shadow-blue-900/20">
            <div className="bg-primary absolute inset-x-0 top-0 h-1"></div>
            <div className="absolute top-4 right-4">
              <Badge>Most Popular</Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-xl">Regular Pass</CardTitle>
              <CardDescription>For the avid bookworm</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6 flex items-end gap-1">
                <span className="text-3xl font-bold">৳২৯৯</span>
                <span className="text-muted-foreground mb-1">/ month</span>
              </div>
              <ul className="text-foreground space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" />
                  <span className="font-medium">4 free borrows</span> per month
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" />
                  Zero deposit required
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" />
                  Free delivery for all library books
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" />
                  21 days max borrow time
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Subscribe Now</Button>
            </CardFooter>
          </Card>

          {/* Student Pass */}
          <Card className="relative flex flex-col overflow-hidden border-amber-200/60 bg-gradient-to-br from-amber-100/60 via-orange-50/30 to-white dark:border-amber-900/30 dark:from-amber-950/20 dark:via-slate-900 dark:to-slate-950">
            <CardHeader>
              <CardTitle className="text-xl">Student Pass</CardTitle>
              <CardDescription>Discounted for students</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6 flex items-end gap-1">
                <span className="text-3xl font-bold">৳১৯৯</span>
                <span className="text-muted-foreground mb-1">/ month</span>
              </div>
              <ul className="text-muted-foreground space-y-3 text-sm">
                <li className="text-foreground flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" />
                  <span className="font-medium">4 free borrows</span> per month
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" />
                  Zero deposit required
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" />
                  Free delivery for library books
                </li>
                <li className="flex items-center gap-2 text-orange-500">
                  <Info className="size-4" />
                  Requires valid Student ID
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Verify Student ID
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
