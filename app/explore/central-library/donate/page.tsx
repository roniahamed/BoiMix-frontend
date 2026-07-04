import Link from "next/link";
import { BookUp, Gift, ShieldCheck, HeartHandshake } from "lucide-react";

import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DonatePage() {
  return (
    <MainLayout>
      <div className="container py-12 md:py-20">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge
            variant="outline"
            className="border-primary text-primary mb-4 inline-flex items-center gap-1.5 px-3 py-1 font-medium tracking-wide uppercase"
          >
            <HeartHandshake className="size-4" />
            Community Driven
          </Badge>
          <h1 className="type-display-3 text-foreground mb-4 font-bold">
            Donate Your Books
          </h1>
          <p className="type-body-lg text-muted-foreground mx-auto max-w-2xl">
            Help us build the largest digital library in Bangladesh. Donate
            books you no longer need and earn rewards while giving others the
            joy of reading.
          </p>
        </div>

        <div className="mx-auto mb-16 grid max-w-5xl gap-8 md:grid-cols-3">
          <Card className="bg-primary/5 border-none text-center shadow-none">
            <CardContent className="pt-6">
              <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <BookUp className="size-8" />
              </div>
              <h3 className="mb-2 text-lg font-bold">1. List Your Books</h3>
              <p className="text-muted-foreground text-sm">
                Scan the ISBN or manually enter the details of the books you
                want to donate.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-none text-center shadow-none">
            <CardContent className="pt-6">
              <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <ShieldCheck className="size-8" />
              </div>
              <h3 className="mb-2 text-lg font-bold">2. We Verify & Collect</h3>
              <p className="text-muted-foreground text-sm">
                Our team verifies the books. We arrange a free pick-up from your
                location.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-none text-center shadow-none">
            <CardContent className="pt-6">
              <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Gift className="size-8" />
              </div>
              <h3 className="mb-2 text-lg font-bold">3. Earn Rewards</h3>
              <p className="text-muted-foreground text-sm">
                Get free Library Pass months, BoiMix badges, and a permanent
                &quot;Donor&quot; tag on your profile.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-card mx-auto max-w-2xl rounded-2xl border p-8 text-center shadow-sm sm:p-12">
          <h2 className="type-heading mb-4 text-2xl font-bold">
            Ready to contribute?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join hundreds of readers who are making books accessible to everyone
            in Bangladesh.
          </p>
          <Button
            size="lg"
            className="h-12 w-full px-8 text-base font-bold sm:w-auto"
            asChild
          >
            <Link href="/books/upload?mode=donate">Start Donating Now</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
