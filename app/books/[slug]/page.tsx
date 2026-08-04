import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  MessageCircle,
  Repeat2,
  ShoppingCart,
  Star,
  Users,
  ShieldCheck,
  PhoneCall,
  Home,
  MoreVertical,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { BookGallery } from "@/components/shared/book-gallery";
import { UserBadge } from "@/components/shared/user-badge";
import { RatingStars } from "@/components/shared/rating-stars";
import { BookCard } from "@/components/shared/book-card";
import type { BookCardBook } from "@/types/book";
import { ScrollContainer } from "@/components/shared/scroll-container";
import { BookHeaderActions } from "@/components/shared/book-header-actions";
import { BookReviews } from "@/components/shared/book-reviews";
import { BookQA } from "@/components/shared/book-qa";
import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { BookDetailsMobileActions } from "@/components/shared/book-details-mobile-actions";
import { BookBuyActions } from "@/components/shared/book-buy-actions";
import { BookBorrowActions } from "@/components/shared/book-borrow-actions";
import { fetchBookDetails, fetchBooks } from "@/lib/api-client";

export const metadata: Metadata = {
  title: "Book Details - BoiMix",
  description: "View details of this book.",
};

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const bookDetailsData = await fetchBookDetails(slug).catch(() => null);
  
  if (!bookDetailsData) {
    return <div className="p-8 text-center">Book not found.</div>;
  }
  
  const {
    book: API_BOOK,
    owner: API_OWNER,
    reviews: API_REVIEWS,
    qa: API_QA,
  } = bookDetailsData;

  const fallbackImages = [
    { src: "/placeholder-book.png", alt: "Cover" },
    { src: "/placeholder-book.png", alt: "Inside page" },
    { src: "/placeholder-book.png", alt: "Back cover" },
  ];
  
  // Build gallery images: prefer API images, then cover URL from book listing, else fallbacks
  const BASE_BOOKS = await fetchBooks();
  const foundBase = BASE_BOOKS.find((b: BookCardBook) => b.slug === slug);
  
  const apiImages = API_BOOK.images && API_BOOK.images.length > 0 ? API_BOOK.images : null;
  const coverUrl = foundBase?.coverUrl || null;
  
  const galleryImages = apiImages
    ?? (coverUrl ? [
        { src: coverUrl.replace("w=400", "w=800"), alt: `${API_BOOK.title} — Cover` },
        ...fallbackImages.slice(1),
      ] : fallbackImages);

  const currentBook = {
    ...API_BOOK,
    // Normalize price fields
    price: parseFloat(API_BOOK.price) || foundBase?.price || 0,
    originalPrice: API_BOOK.original_price ? parseFloat(API_BOOK.original_price) : (foundBase?.originalPrice ?? null),
    images: galleryImages,
    // Availability comes directly from API
    availability: API_BOOK.availability,
    tags: API_BOOK.tags?.length > 0 ? API_BOOK.tags : (foundBase?.tags ?? ["sell"]),
    rating: foundBase?.rating ?? API_BOOK.rating ?? 0,
    reviewCount: foundBase?.reviewCount ?? 0,
    location: API_BOOK.locationAddress || foundBase?.location || "Dhaka",
    distance: foundBase?.distance ?? null,
    exchangePrice: API_BOOK.exchange_price ? parseFloat(API_BOOK.exchange_price) : (API_BOOK.estimatedExchangeValue ?? null),
    exchangePreferences: API_BOOK.exchangePreferences ?? [],
    borrowFee: API_BOOK.borrow_fee ? parseFloat(API_BOOK.borrow_fee) : null,
    deposit: API_BOOK.deposit ? parseFloat(API_BOOK.deposit) : null,
    maxBorrowDays: API_BOOK.max_borrow_days ?? null,
  };

  return (
    <div
      className="mx-auto w-full max-w-[1200px] overflow-x-hidden overscroll-x-none px-0 pt-0 pb-20 sm:px-4 md:px-6 md:pt-8 md:pb-12"
      style={{ touchAction: "pan-y" }}
    >
      <div className="fixed top-4 right-4 left-4 z-50 flex items-center justify-between md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/40 hover:text-white"
          asChild
        >
          <Link href="/">
            <Home className="size-4.5" />
          </Link>
        </Button>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/40 hover:text-white"
            asChild
          >
            <Link href="/cart">
              <ShoppingCart className="size-4.5" />
            </Link>
          </Button>
          <MobileNavbar>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/40 hover:text-white"
            >
              <MoreVertical className="size-4.5" />
            </Button>
          </MobileNavbar>
        </div>
      </div>

      <div className="bg-card border-y p-0 shadow-sm sm:rounded-xl sm:border sm:p-6 lg:p-8">
        <div className="grid gap-4 md:gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-4 lg:col-start-1">
            <div className="relative mx-auto w-full sm:max-w-[320px]">
              <BookGallery images={currentBook.images} />
            </div>
          </div>

          {/* Right Column: Info & Actions */}
          <div className="flex flex-col justify-between px-4 sm:px-0 lg:col-span-8 lg:col-start-5">
            <div className="flex flex-col">
              {/* Header Actions & Pricing */}
              <div className="mb-3 flex flex-wrap items-center justify-between gap-4 md:mb-4">
                <div className="flex flex-wrap items-center gap-3">
                  {currentBook.tags.includes("sell") && (
                    <span className="text-warning text-sm font-semibold">
                      Sell
                    </span>
                  )}
                  {currentBook.tags.includes("exchange") && (
                    <span className="text-info text-sm font-semibold">
                      Exchange
                    </span>
                  )}
                  {currentBook.tags.includes("borrow") && (
                    <span className="text-success text-sm font-semibold">
                      Borrow
                    </span>
                  )}
                </div>

                <BookHeaderActions />
              </div>

              {/* Mobile Pricing (Hidden on Desktop) */}
              <div className="mb-4 flex flex-col sm:hidden">
                {currentBook.tags.includes("sell") && (
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      Buy Price
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-accent text-xl leading-none font-bold">
                        ৳{currentBook.price}
                      </span>
                      <span className="text-muted-foreground text-sm leading-none line-through">
                        ৳{currentBook.originalPrice}
                      </span>
                    </div>
                  </div>
                )}
                {currentBook.tags.includes("exchange") && (
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      Estimated Exchange Value
                    </span>
                    <span className="text-foreground text-xl leading-none font-bold">
                      ৳{currentBook.exchangePrice || 350}
                    </span>
                    {currentBook.exchangePreferences &&
                      currentBook.exchangePreferences.length > 0 && (
                        <span className="text-muted-foreground mt-1 text-xs leading-tight">
                          <span className="text-foreground font-semibold">
                            Preferences:
                          </span>{" "}
                          {currentBook.exchangePreferences.join(", ")}
                        </span>
                      )}
                  </div>
                )}
                {currentBook.tags.includes("borrow") && (
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      Borrow Cost
                    </span>
                    <span className="text-foreground text-xl leading-none font-bold">
                      {currentBook.borrowFee
                        ? `৳${currentBook.borrowFee}`
                        : "Free"}
                    </span>
                    <span className="text-muted-foreground mt-1 text-xs leading-none">
                      <span className="text-foreground font-semibold">
                        Max Duration:
                      </span>{" "}
                      {currentBook.maxBorrowDays} days
                    </span>
                  </div>
                )}
              </div>

              <h1 className="type-heading mb-2 text-2xl leading-tight md:text-3xl lg:text-4xl">
                {currentBook.title}
              </h1>
              <p className="text-muted-foreground mb-4 text-base md:text-lg">
                লেখক:{" "}
                <span className="text-foreground font-medium">
                  {currentBook.author}
                </span>
              </p>

              <div className="mb-4 flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <RatingStars rating={currentBook.rating} />
                    <span className="text-muted-foreground text-sm font-medium">
                      {currentBook.rating}{" "}
                      <a
                        href="#reviews"
                        className="text-primary hover:text-primary/80 font-semibold underline transition-colors"
                      >
                        ({currentBook.reviewCount} Reviews)
                      </a>
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm font-medium">
                  Condition:{" "}
                  <a
                    href={`/explore?condition=${currentBook.condition}`}
                    className="text-primary capitalize hover:underline"
                  >
                    {currentBook.condition}
                  </a>
                </p>

                <div className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm font-medium">
                  <MapPin className="size-4 shrink-0" />
                  <span>{currentBook.location}</span>
                  <span className="text-muted-foreground/50 shrink-0">•</span>
                  <span className="text-foreground shrink-0">
                    {currentBook.distance} দূরে
                  </span>
                </div>
                <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                  <Users className="text-primary size-4" />
                  ১২০ জনের পছন্দের তালিকায় আছে
                </div>

                <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                  ক্যাটাগরি:{" "}
                  <a
                    href={`/explore?category=${encodeURIComponent(currentBook.genre)}`}
                    className="text-primary font-medium hover:underline"
                  >
                    {currentBook.genre}
                  </a>
                </div>
              </div>

              <hr className="my-4 hidden border-t sm:my-6 sm:block" />

              {/* Pricing & Actions Section (Hidden on Mobile) */}
              <div className="hidden space-y-4 sm:block">
                <div className="mb-4">
                  {currentBook.tags.includes("sell") && (
                    <div>
                      <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                        Buy Price
                      </p>
                      <div className="flex items-end gap-2">
                        <p className="text-accent text-3xl font-bold">
                          ৳{currentBook.price}
                        </p>
                        <p className="text-muted-foreground mb-1 text-sm line-through">
                          ৳{currentBook.originalPrice}
                        </p>
                      </div>
                      <p className="text-muted-foreground mt-1 text-xs">
                        {currentBook.availability.sell} copy available
                      </p>
                    </div>
                  )}
                  {currentBook.tags.includes("exchange") && (
                    <div>
                      <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                        Estimated Exchange Value
                      </p>
                      <div className="flex items-end gap-2">
                        <p className="text-foreground text-3xl font-bold">
                          ৳{currentBook.exchangePrice || 350}
                        </p>
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-muted-foreground text-xs">
                          Depends on book condition
                        </p>
                      </div>

                      {currentBook.exchangePreferences &&
                        currentBook.exchangePreferences.length > 0 && (
                          <div className="mt-4">
                            <p className="text-foreground mb-2 text-sm font-semibold">
                              Exchange Preferences:
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {currentBook.exchangePreferences.map(
                                (pref: string) => (
                                  <span
                                    key={pref}
                                    className="bg-primary/10 text-primary rounded-md px-2.5 py-1 text-xs font-medium"
                                  >
                                    {pref}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  )}
                  {currentBook.tags.includes("borrow") && (
                    <div>
                      <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                        Borrow Cost
                      </p>
                      <div className="flex items-end gap-2">
                        {currentBook.borrowFee ? (
                          <p className="text-foreground text-3xl font-bold">
                            ৳{currentBook.borrowFee}
                          </p>
                        ) : (
                          <p className="text-success text-3xl font-bold">
                            Free
                          </p>
                        )}
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-muted-foreground text-xs">
                          {currentBook.borrowFee
                            ? "Fixed borrow fee"
                            : "Subscription required"}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          <span className="text-foreground font-semibold">
                            Max Duration:
                          </span>{" "}
                          {currentBook.maxBorrowDays} days
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Desktop Actions (Hidden on Mobile) */}
                <div className="mx-auto hidden w-full max-w-[500px] gap-3 sm:flex sm:flex-col">
                  <BookBuyActions
                    book={{
                      id: currentBook.id,
                      title: currentBook.title,
                      author: currentBook.author,
                      price: currentBook.price,
                      originalPrice: currentBook.originalPrice,
                      condition: currentBook.condition,
                      images: currentBook.images,
                      sellerName: API_OWNER.name,
                      sellerId: API_OWNER.id,
                      tags: currentBook.tags,
                    }}
                  />
                  {currentBook.tags.includes("exchange") && (
                    <Button asChild className="h-12 w-full gap-2 text-base">
                      <Link href={`/exchange/offer/${currentBook.id}`}>
                        <Repeat2 className="size-5" />
                        Exchange Request
                      </Link>
                    </Button>
                  )}
                  <BookBorrowActions
                    book={{
                      id: currentBook.id,
                      title: currentBook.title,
                      author: currentBook.author,
                      images: currentBook.images,
                      ownerName: API_OWNER.name,
                      ownerId: API_OWNER.id,
                      borrowFee: currentBook.borrowFee,
                      maxBorrowDays: currentBook.maxBorrowDays,
                      tags: currentBook.tags,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section (Full Width Below) */}
      <div className="mt-4 space-y-4">
        {/* Seller Info Card */}
        <div className="bg-card border p-5 shadow-sm lg:p-6">
          <h3 className="type-heading mb-4 text-xl">
            সেলার ইনফরমেশন (Seller Information)
          </h3>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <div className="flex items-start gap-4">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full border bg-white">
                  <Image
                    src={API_OWNER.avatarUrl || `https://ui-avatars.com/api/?name=${API_OWNER.name}`}
                    alt={API_OWNER.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-foreground text-lg font-semibold">
                      {API_OWNER.name}
                    </h4>
                    <span className="text-muted-foreground/50 hidden shrink-0 sm:inline">
                      •
                    </span>
                    <div className="text-muted-foreground flex items-center gap-1 text-sm font-medium">
                      <Users className="size-4" />
                      {API_OWNER.followers} Followers
                    </div>
                  </div>
                  <div className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-sm">
                    <MapPin className="size-4 shrink-0" />
                    <span className="truncate">{API_OWNER.location}</span>
                  </div>
                  {!!API_OWNER.badges?.length && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {API_OWNER.badges.map((badge: any) => (
                        <UserBadge key={badge.label} {...badge} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
                <div className="text-success flex items-center gap-1.5">
                  <ShieldCheck className="size-4" />
                  Trust Score: 98%
                </div>
                <div className="text-primary flex items-center gap-1.5">
                  <Star className="fill-primary size-4" />
                  {API_OWNER.rating} ({currentBook.reviewCount} Reviews)
                </div>
              </div>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto">
              <Button variant="outline" className="w-full gap-2 sm:w-auto">
                <MessageCircle className="size-4" />
                Message
              </Button>
              <Button className="w-full gap-2 sm:w-auto">
                <PhoneCall className="size-4" />
                Contact Seller
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-card border p-5 shadow-sm lg:p-6">
          <h3 className="type-heading mb-4 text-xl">সারাংশ (Summary)</h3>
          <p className="text-muted-foreground text-justify leading-relaxed">
            {API_BOOK.description || "কোনো সারাংশ দেওয়া নেই।"}
          </p>
        </div>

        {/* Specifications */}
        <div className="bg-card border p-5 shadow-sm lg:p-6">
          <h3 className="type-heading mb-4 text-xl">
            বইয়ের বিস্তারিত তথ্য (Specifications)
          </h3>
          <div className="overflow-hidden rounded-xl border text-sm">
            <div className="bg-muted/30 grid grid-cols-3 border-b">
              <div className="text-muted-foreground p-3 font-medium">
                প্রকাশক
              </div>
              <div className="col-span-2 p-3 font-medium">
                {API_BOOK.publisher || "-"}
              </div>
            </div>
            <div className="grid grid-cols-3 border-b">
              <div className="text-muted-foreground p-3 font-medium">
                ক্যাটাগরি
              </div>
              <div className="col-span-2 p-3 font-medium">
                {API_BOOK.genre || "-"}
              </div>
            </div>
            <div className="bg-muted/30 grid grid-cols-3 border-b">
              <div className="text-muted-foreground p-3 font-medium">ভাষা</div>
              <div className="col-span-2 p-3 font-medium">
                {API_BOOK.language || "-"}
              </div>
            </div>
            <div className="grid grid-cols-3 border-b">
              <div className="text-muted-foreground p-3 font-medium">
                সংস্করণ
              </div>
              <div className="col-span-2 p-3 font-medium">
                {API_BOOK.edition || "-"}
              </div>
            </div>
            <div className="bg-muted/30 grid grid-cols-3 border-b">
              <div className="text-muted-foreground p-3 font-medium">
                পৃষ্ঠা সংখ্যা
              </div>
              <div className="col-span-2 p-3 font-medium">
                {API_BOOK.pages || "-"}
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-muted-foreground p-3 font-medium">ISBN</div>
              <div className="col-span-2 p-3 font-medium">{API_BOOK.isbn || "-"}</div>
            </div>
          </div>
        </div>

        <BookReviews reviews={API_REVIEWS} bookTitle={API_BOOK.title} />

        <BookQA qas={API_QA} />
      </div>

      {/* Similar Books Section */}
      {bookDetailsData.recommended && bookDetailsData.recommended.length > 0 && (
        <div className="mt-16">
          <h2 className="type-heading mb-6 text-2xl">
            একই ধরনের আরও বই (Similar Books)
          </h2>
          <ScrollContainer>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {bookDetailsData.recommended.map((book: any) => (
              <div
                key={book.id}
                className="w-[140px] shrink-0 snap-start sm:w-[160px]"
              >
                <BookCard book={book} />
              </div>
            ))}
          </ScrollContainer>
        </div>
      )}

      {/* Recently Viewed Books Section */}
      {bookDetailsData.recommended && bookDetailsData.recommended.length > 0 && (
        <div className="mt-12">
          <h2 className="type-heading mb-6 text-2xl">
            সম্প্রতি দেখা বই (Recently Viewed)
          </h2>
          <ScrollContainer>
            {bookDetailsData.recommended
              .slice()
              .reverse()
              .map((book: BookCardBook) => (
                <div
                  key={book.id}
                  className="w-[140px] shrink-0 snap-start sm:w-[160px]"
                >
                  <BookCard book={book} />
                </div>
              ))}
          </ScrollContainer>
        </div>
      )}

      <BookDetailsMobileActions
        book={{
          id: currentBook.id,
          title: currentBook.title,
          author: currentBook.author,
          price: currentBook.price,
          condition: currentBook.condition,
          images: currentBook.images,
          sellerName: API_OWNER.name,
          sellerId: API_OWNER.id,
          tags: currentBook.tags,
        }}
      />
    </div>
  );
}
