"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  CalendarDays,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useExchangeStore } from "@/lib/store/use-exchange-store";
import { fetchLocal } from "@/lib/fetchLocal";
import type { BookCardBook } from "@/types/book";
import Link from "next/link";

export default function ExchangeOfferPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const resolvedParams = use(params);
  const bookId = resolvedParams.bookId;
  const router = useRouter();

  const [requestedBook, setRequestedBook] = useState<BookCardBook | null>(null);
  const [loading, setLoading] = useState(true);

  const myBooks = useExchangeStore((state) => state.myBooks);
  const createProposal = useExchangeStore((state) => state.createProposal);

  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [proposedLocation, setProposedLocation] = useState("");
  const [proposedDate, setProposedDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadBook() {
      try {
        const books = await fetchLocal("/api/books");
        const found =
          books.find((b: BookCardBook) => b.id === bookId) || books[0];
        setRequestedBook(found);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadBook();
  }, [bookId]);

  if (loading || !requestedBook) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="text-primary size-8 animate-spin" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookId) {
      toast.error("Please select a book to offer.");
      return;
    }
    if (!proposedLocation || !proposedDate) {
      toast.error("Please provide a meetup location and date.");
      return;
    }

    setIsSubmitting(true);
    const offeredBook = myBooks.find((b) => b.id === selectedBookId)!;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    createProposal({
      requestedBookId: requestedBook.id,
      requestedBookTitle: requestedBook.title,
      requestedBookImage: requestedBook.coverUrl,
      offeredBookId: offeredBook.id,
      offeredBookTitle: offeredBook.title,
      offeredBookImage: offeredBook.image,
      proposerId: "current-user",
      ownerId: requestedBook.providerType === "library" ? "lib_1" : "usr_1",
      counterOfferDetails: {
        proposedDate,
        proposedLocation,
        message,
      },
    });

    toast.success("Exchange proposal sent successfully!");
    router.push("/dashboard/exchanges");
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 md:py-12">
      <Button variant="ghost" asChild className="mb-6 -ml-4 gap-2">
        <Link href={`/books/${requestedBook.slug}`}>
          <ArrowLeft className="size-4" />
          Back to Book
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="type-heading text-3xl">Propose an Exchange</h1>
        <p className="text-muted-foreground mt-2">
          Select a book from your library to offer in exchange for{" "}
          <span className="text-foreground font-semibold">
            {requestedBook.title}
          </span>
          .
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-12">
        {/* Left Column: The Exchange Visualization */}
        <div className="md:col-span-7">
          <Card className="bg-muted/30 p-6 shadow-sm">
            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
              {/* What they want */}
              <div className="flex flex-col items-center text-center">
                <span className="text-muted-foreground mb-3 text-sm font-semibold tracking-wider uppercase">
                  You Receive
                </span>
                <div className="relative aspect-[3/4] w-28 overflow-hidden rounded-md border shadow-md">
                  <Image
                    src={requestedBook.coverUrl}
                    alt={requestedBook.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="mt-3 max-w-[120px] truncate text-sm font-semibold">
                  {requestedBook.title}
                </span>
              </div>

              {/* Arrow */}
              <div className="bg-background flex size-12 items-center justify-center rounded-full border shadow-sm">
                <ArrowRight className="text-muted-foreground size-5" />
              </div>

              {/* What they offer */}
              <div className="flex flex-col items-center text-center">
                <span className="text-muted-foreground mb-3 text-sm font-semibold tracking-wider uppercase">
                  You Offer
                </span>
                <div className="bg-background relative flex aspect-[3/4] w-28 items-center justify-center overflow-hidden rounded-md border border-dashed shadow-sm">
                  {selectedBookId ? (
                    <Image
                      src={
                        myBooks.find((b) => b.id === selectedBookId)?.image ||
                        ""
                      }
                      alt="Selected Book"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-muted-foreground text-xs">
                      Select below
                    </span>
                  )}
                </div>
                <span className="mt-3 max-w-[120px] truncate text-sm font-semibold">
                  {selectedBookId
                    ? myBooks.find((b) => b.id === selectedBookId)?.title
                    : "---"}
                </span>
              </div>
            </div>
          </Card>

          {/* Book Selection */}
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold">Your Library</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {myBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => setSelectedBookId(book.id)}
                  className={`relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${
                    selectedBookId === book.id
                      ? "border-primary bg-primary/5"
                      : "hover:border-border bg-card border-transparent"
                  }`}
                >
                  <div className="bg-muted relative aspect-[3/4] w-full">
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="truncate text-sm font-medium">{book.title}</p>
                  </div>
                  {selectedBookId === book.id && (
                    <div className="bg-primary absolute top-2 right-2 rounded-full p-1 text-white shadow-md">
                      <CheckCircle2 className="size-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Meetup Details */}
        <div className="md:col-span-5">
          <Card className="sticky top-24 shadow-sm">
            <CardContent className="p-6">
              <h3 className="mb-6 text-lg font-semibold">Meetup Proposal</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Proposed Location
                  </label>
                  <div className="relative">
                    <MapPin className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input
                      placeholder="e.g. TSC, DU"
                      className="pl-9"
                      value={proposedLocation}
                      onChange={(e) => setProposedLocation(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Proposed Date & Time
                  </label>
                  <div className="relative">
                    <CalendarDays className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input
                      placeholder="e.g. Tomorrow at 5 PM"
                      className="pl-9"
                      value={proposedDate}
                      onChange={(e) => setProposedDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Message (Optional)
                  </label>
                  <Input
                    placeholder="Say hi to the owner!"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="mt-8 w-full font-bold"
                size="lg"
                disabled={
                  isSubmitting ||
                  !selectedBookId ||
                  !proposedLocation ||
                  !proposedDate
                }
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-5 animate-spin" />
                    Sending Proposal...
                  </>
                ) : (
                  "Send Exchange Proposal"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
