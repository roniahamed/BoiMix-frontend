import { Metadata } from "next";
import {
  MapPin,
  MessageCircle,
  Repeat2,
  ShoppingCart,
  BookOpen,
  Heart,
  Share2,
  Star,
  User,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { BookGallery } from "@/components/shared/book-gallery";
import { UserCard } from "@/components/shared/user-card";
import { RatingStars } from "@/components/shared/rating-stars";
import { ReviewCard } from "@/components/shared/review-card";
import { BadgePill } from "@/components/shared/badge-pill";
import { BookConditionBadge } from "@/components/shared/book-condition-badge";
import { BookCard } from "@/components/shared/book-card";
import type { BookCardBook } from "@/types/book";
import { ReviewForm } from "@/components/shared/review-form";

export const metadata: Metadata = {
  title: "Book Details - BoiMix",
  description: "View details of this book.",
};

const MOCK_BOOK = {
  id: "book-123",
  title: "অপরাজিত",
  author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
  publisher: "মিত্র ও ঘোষ পাবলিশার্স",
  isbn: "978-9849204481",
  genre: "Classic Fiction",
  language: "বাংলা",
  edition: "১ম সংস্করণ",
  pages: 350,
  description:
    "অপরাজিত বাংলা সাহিত্যের অন্যতম শ্রেষ্ঠ ঔপন্যাসিক বিভূতিভূষণ বন্দ্যোপাধ্যায়ের একটি কালজয়ী উপন্যাস। এটি পথের পাঁচালী উপন্যাসের সিক্যুয়েল। এতে অপুর বেড়ে ওঠা, শহরের জীবন, এবং তার আত্মানুসন্ধানের চমৎকার বিবরণ রয়েছে। অপরাজিত বাংলা সাহিত্যের অন্যতম শ্রেষ্ঠ ঔপন্যাসিক বিভূতিভূষণ বন্দ্যোপাধ্যায়ের একটি কালজয়ী উপন্যাস। এটি পথের পাঁচালী উপন্যাসের সিক্যুয়েল। এতে অপুর বেড়ে ওঠা, শহরের জীবন, এবং তার আত্মানুসন্ধানের চমৎকার বিবরণ রয়েছে।",
  images: [
    {
      src: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800",
      alt: "Cover image",
    },
    {
      src: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800",
      alt: "Inside page",
    },
    {
      src: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800",
      alt: "Back cover",
    },
  ],
  tags: ["sell"],
  availability: {
    sell: 1,
    borrow: 2,
    swap: 1,
  },
  location: "মিরপুর ১০, ঢাকা",
  distance: "১.২ কি.মি.",
  condition: "excellent" as const,
  price: 250,
  originalPrice: 350,
  swapPrice: 300,
  rating: 4.8,
  reviewCount: 24,
  totalBorrow: 15,
  totalSell: 5,
  totalSwap: 2,
  tableOfContents: [
    "প্রথম অধ্যায়: অপুর শৈশব",
    "দ্বিতীয় অধ্যায়: শহরে আগমন",
    "তৃতীয় অধ্যায়: বিশ্ববিদ্যালয়ের দিনগুলো",
    "চতুর্থ অধ্যায়: জীবন সংগ্রাম",
    "পঞ্চম অধ্যায়: অপরূপ প্রকৃতি ও অন্তর্দৃষ্টি",
  ],
  index: ["ক - কলকাতা, কাশীবাজার", "খ - খুকু", "গ - গঙ্গা"],
};

const MOCK_OWNER = {
  id: "user-1",
  name: "রহিম শেখ",
  username: "rahim_sheikh",
  avatarUrl: "https://i.pravatar.cc/150?u=rahim",
  location: "মিরপুর, ঢাকা",
  rating: 4.9,
  badges: [
    { label: "Top Swapper", variant: "success" as const },
    { label: "Verified", variant: "info" as const },
  ],
};

const MOCK_REVIEWS = [
  {
    id: "r1",
    authorName: "তানিয়া আহমেদ",
    authorAvatar: "https://i.pravatar.cc/150?u=tania",
    rating: 5,
    date: "2 days ago",
    content:
      "বইটি একদম নতুনের মতোই ছিল। রহিম ভাইয়ের ব্যবহার অনেক ভালো। খুব দ্রুতই বইটি হাতে পেয়েছি।",
  },
  {
    id: "r2",
    authorName: "সাকিব হাসান",
    authorAvatar: "https://i.pravatar.cc/150?u=sakib",
    rating: 4,
    date: "1 week ago",
    content:
      "দারুণ একটি বই। তবে কভারের একটা কোণায় একটু ভাজ ছিল, তা ছাড়া সব ঠিক আছে।",
  },
];

const MOCK_RECOMMENDED_BOOKS: BookCardBook[] = [
  {
    id: "rec-1",
    slug: "pather-panchali",
    title: "পথের পাঁচালী",
    author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
    coverUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400",
    tags: ["sell"],
    rating: 4.9,
    reviewCount: 156,
    price: 200,
    originalPrice: 300,
    condition: "good",
    availability: "in-stock",
    location: "মিরপুর ১০, ঢাকা",
    distance: "১.২ কি.মি.",
  },
  {
    id: "rec-2",
    slug: "aranyak",
    title: "আরণ্যক",
    author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
    coverUrl:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400",
    tags: ["swap"],
    rating: 4.8,
    reviewCount: 89,
    condition: "excellent",
    availability: "in-stock",
    location: "ধানমন্ডি, ঢাকা",
    distance: "৩.৫ কি.মি.",
  },
  {
    id: "rec-3",
    slug: "chander-pahar",
    title: "চাঁদের পাহাড়",
    author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
    coverUrl:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=400",
    tags: ["borrow"],
    rating: 4.9,
    reviewCount: 210,
    condition: "excellent",
    availability: "in-stock",
    location: "বনানী, ঢাকা",
    distance: "৬ কি.মি.",
  },
  {
    id: "rec-4",
    slug: "ichamati",
    title: "ইছামতী",
    author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
    coverUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400",
    tags: ["sell"],
    rating: 4.7,
    reviewCount: 45,
    price: 180,
    originalPrice: 250,
    condition: "fair",
    availability: "in-stock",
    location: "উত্তরা, ঢাকা",
    distance: "১২ কি.মি.",
  },
];

export default function BookDetailsPage() {
  return (
    <div className="boimix-container pt-8 pb-24 md:py-12">
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-5 lg:col-start-1">
          <div className="sticky top-24">
            <BookGallery images={MOCK_BOOK.images} />
          </div>
        </div>

        {/* Right Column: Info & Actions */}
        <div className="space-y-6 lg:col-span-7 lg:col-start-6">
          {/* Header & Badges */}
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                {MOCK_BOOK.tags.includes("sell") && (
                  <BadgePill tone="warning">Sell</BadgePill>
                )}
                {MOCK_BOOK.tags.includes("swap") && (
                  <BadgePill tone="info">Swap</BadgePill>
                )}
                {MOCK_BOOK.tags.includes("borrow") && (
                  <BadgePill tone="success">Borrow</BadgePill>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full"
                >
                  <Heart className="size-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full"
                >
                  <Share2 className="size-5" />
                </Button>
              </div>
            </div>

            <h1 className="type-heading mb-2 text-2xl leading-tight md:text-3xl lg:text-4xl">
              {MOCK_BOOK.title}
            </h1>
            <p className="text-muted-foreground mb-4 text-base md:text-lg">
              লেখক:{" "}
              <span className="text-foreground font-medium">
                {MOCK_BOOK.author}
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <RatingStars rating={MOCK_BOOK.rating} />
                <span className="text-muted-foreground text-sm font-medium">
                  {MOCK_BOOK.rating} ({MOCK_BOOK.reviewCount} Reviews)
                </span>
              </div>
              <span className="text-muted-foreground hidden sm:block">•</span>
              <BookConditionBadge condition={MOCK_BOOK.condition} />
            </div>
          </div>

          <hr className="border-t" />

          {/* Pricing & Actions Box */}
          <div className="bg-card rounded-2xl border p-5 shadow-sm">
            <div className="mb-6">
              {MOCK_BOOK.tags.includes("sell") && (
                <div>
                  <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Buy Price
                  </p>
                  <div className="flex items-end gap-2">
                    <p className="text-accent text-3xl font-bold">
                      ৳{MOCK_BOOK.price}
                    </p>
                    <p className="text-muted-foreground mb-1 text-sm line-through">
                      ৳{MOCK_BOOK.originalPrice}
                    </p>
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {MOCK_BOOK.availability.sell} copy available
                  </p>
                </div>
              )}
              {MOCK_BOOK.tags.includes("swap") && (
                <div>
                  <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Estimated Swap Value
                  </p>
                  <div className="flex items-end gap-2">
                    <p className="text-foreground text-3xl font-bold">
                      ৳{MOCK_BOOK.swapPrice}
                    </p>
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Depends on book condition
                  </p>
                </div>
              )}
              {MOCK_BOOK.tags.includes("borrow") && (
                <div>
                  <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Borrow Cost
                  </p>
                  <div className="flex items-end gap-2">
                    <p className="text-success text-3xl font-bold">Free</p>
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Library members only
                  </p>
                </div>
              )}
            </div>

            {/* Desktop Actions (Hidden on Mobile) */}
            <div className="hidden sm:block">
              {MOCK_BOOK.tags.includes("sell") && (
                <Button className="h-12 w-full gap-2 text-base">
                  <ShoppingCart className="size-5" />
                  Add to Cart
                </Button>
              )}
              {MOCK_BOOK.tags.includes("swap") && (
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 w-full gap-2 text-base">
                  <Repeat2 className="size-5" />
                  Swap Request
                </Button>
              )}
              {MOCK_BOOK.tags.includes("borrow") && (
                <Button
                  variant="success"
                  className="h-12 w-full gap-2 text-base"
                >
                  <BookOpen className="size-5" />
                  Borrow Book
                </Button>
              )}
            </div>
          </div>

          {/* Uploader / Location Summary */}
          <div className="bg-muted/30 rounded-2xl border p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={MOCK_OWNER.avatarUrl}
                  alt={MOCK_OWNER.name}
                  className="h-10 w-10 rounded-full border bg-white"
                />
                <div>
                  <p className="text-sm font-medium">
                    Uploaded by{" "}
                    <span className="text-primary font-semibold">
                      {MOCK_OWNER.name}
                    </span>
                  </p>
                  <div className="text-muted-foreground mt-0.5 flex items-center gap-1 text-xs">
                    <MapPin className="size-3" />
                    {MOCK_BOOK.location} ({MOCK_BOOK.distance})
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 gap-2">
                <MessageCircle className="size-4" />
                Contact Uploader
              </Button>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="flex gap-6 pt-2">
            <div>
              <p className="text-muted-foreground text-xs font-medium uppercase">
                Borrowed
              </p>
              <p className="font-semibold">{MOCK_BOOK.totalBorrow} times</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-medium uppercase">
                Sold
              </p>
              <p className="font-semibold">{MOCK_BOOK.totalSell} times</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-medium uppercase">
                Swapped
              </p>
              <p className="font-semibold">{MOCK_BOOK.totalSwap} times</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-12 border-t" />

      {/* Details Section (Full Width Below) */}
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-8 lg:col-start-1">
          {/* Summary */}
          <div>
            <h3 className="type-heading mb-4 text-xl">সারাংশ (Summary)</h3>
            <p className="text-muted-foreground text-justify leading-relaxed">
              {MOCK_BOOK.description}
            </p>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="type-heading mb-4 text-xl">
              বইয়ের বিস্তারিত তথ্য (Specifications)
            </h3>
            <div className="overflow-hidden rounded-xl border text-sm">
              <div className="bg-muted/30 grid grid-cols-3 border-b">
                <div className="text-muted-foreground p-3 font-medium">
                  প্রকাশক
                </div>
                <div className="col-span-2 p-3 font-medium">
                  {MOCK_BOOK.publisher}
                </div>
              </div>
              <div className="grid grid-cols-3 border-b">
                <div className="text-muted-foreground p-3 font-medium">
                  ক্যাটাগরি
                </div>
                <div className="col-span-2 p-3 font-medium">
                  {MOCK_BOOK.genre}
                </div>
              </div>
              <div className="bg-muted/30 grid grid-cols-3 border-b">
                <div className="text-muted-foreground p-3 font-medium">
                  ভাষা
                </div>
                <div className="col-span-2 p-3 font-medium">
                  {MOCK_BOOK.language}
                </div>
              </div>
              <div className="grid grid-cols-3 border-b">
                <div className="text-muted-foreground p-3 font-medium">
                  সংস্করণ
                </div>
                <div className="col-span-2 p-3 font-medium">
                  {MOCK_BOOK.edition}
                </div>
              </div>
              <div className="bg-muted/30 grid grid-cols-3 border-b">
                <div className="text-muted-foreground p-3 font-medium">
                  পৃষ্ঠা সংখ্যা
                </div>
                <div className="col-span-2 p-3 font-medium">
                  {MOCK_BOOK.pages}
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-muted-foreground p-3 font-medium">
                  ISBN
                </div>
                <div className="col-span-2 p-3 font-medium">
                  {MOCK_BOOK.isbn}
                </div>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          {MOCK_BOOK.tableOfContents &&
            MOCK_BOOK.tableOfContents.length > 0 && (
              <div>
                <h3 className="type-heading mb-4 text-xl">
                  সূচিপত্র (Table of Contents)
                </h3>
                <ul className="text-muted-foreground bg-card list-inside list-disc space-y-1.5 rounded-xl border p-5">
                  {MOCK_BOOK.tableOfContents.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

          {/* Index */}
          {MOCK_BOOK.index && MOCK_BOOK.index.length > 0 && (
            <div>
              <h3 className="type-heading mb-4 text-xl">ইনডেক্স (Index)</h3>
              <ul className="text-muted-foreground bg-card list-inside list-disc space-y-1.5 rounded-xl border p-5">
                {MOCK_BOOK.index.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Reviews */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="type-heading text-xl">
                রিভিউ ({MOCK_BOOK.reviewCount})
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 hidden sm:flex"
                >
                  রিভিউ লিখুন
                </Button>
                <Button
                  variant="ghost"
                  className="text-primary hover:bg-primary/10 hover:text-primary"
                >
                  সবগুলো দেখুন
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {MOCK_REVIEWS.map((review) => (
                <ReviewCard
                  key={review.id}
                  reviewerName={review.authorName}
                  reviewerAvatarUrl={review.authorAvatar}
                  rating={review.rating}
                  body={review.content}
                  createdAt={review.date}
                />
              ))}
            </div>

            <ReviewForm bookTitle={MOCK_BOOK.title} />
          </div>
        </div>

        {/* Details Sidebar placeholder (e.g. related products) */}
        <div className="hidden space-y-6 lg:col-span-3 lg:col-start-10 lg:block">
          <div className="bg-muted/20 sticky top-24 rounded-xl border p-5">
            <h4 className="text-muted-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
              Seller Information
            </h4>
            <UserCard user={MOCK_OWNER} />
            <div className="mt-6">
              <p className="text-muted-foreground text-center text-xs">
                More books from this seller coming soon...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Books Section */}
      <div className="mt-16">
        <h2 className="type-heading mb-6 text-2xl">
          একই ধরনের আরও বই (Similar Books)
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {MOCK_RECOMMENDED_BOOKS.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="bg-background fixed bottom-0 left-0 z-50 w-full border-t p-3 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] sm:hidden">
        <div className="boimix-container flex gap-2">
          {MOCK_BOOK.tags.includes("sell") && (
            <Button className="h-12 flex-1 gap-2 shadow-md">
              <ShoppingCart className="size-4" />
              <span className="text-base font-semibold">Add to Cart</span>
            </Button>
          )}
          {MOCK_BOOK.tags.includes("swap") && (
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary h-12 flex-1 gap-2 shadow-sm hover:text-white"
            >
              <Repeat2 className="size-4" />
              <span className="font-semibold">Swap</span>
            </Button>
          )}
          {MOCK_BOOK.tags.includes("borrow") && (
            <Button variant="success" className="h-12 flex-1 gap-2 shadow-sm">
              <BookOpen className="size-4" />
              <span className="font-semibold">Borrow</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
