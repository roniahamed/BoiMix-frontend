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
  Users,
  Send,
  ShieldCheck,
  PhoneCall,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { BookGallery } from "@/components/shared/book-gallery";
import { UserBadge } from "@/components/shared/user-badge";
import { RatingStars } from "@/components/shared/rating-stars";
import { ReviewCard } from "@/components/shared/review-card";

import { BookConditionBadge } from "@/components/shared/book-condition-badge";
import { BookCard } from "@/components/shared/book-card";
import type { BookCardBook } from "@/types/book";
import { ReviewForm } from "@/components/shared/review-form";
import { BookHeaderActions } from "@/components/shared/book-header-actions";

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
      <div className="bg-card border p-6 shadow-sm lg:p-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-4 lg:col-start-1">
            <div className="mx-auto max-w-[320px]">
              <BookGallery images={MOCK_BOOK.images} />
            </div>
          </div>

          {/* Right Column: Info & Actions */}
          <div className="flex flex-col justify-between lg:col-span-8 lg:col-start-5">
            <div className="space-y-6">
              {/* Header & Badges */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-4">
                  {MOCK_BOOK.tags.includes("sell") && (
                    <span className="text-warning text-sm font-semibold">
                      Sell
                    </span>
                  )}
                  {MOCK_BOOK.tags.includes("swap") && (
                    <span className="text-info text-sm font-semibold">
                      Swap
                    </span>
                  )}
                  {MOCK_BOOK.tags.includes("borrow") && (
                    <span className="text-success text-sm font-semibold">
                      Borrow
                    </span>
                  )}
                </div>
                <BookHeaderActions />
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

              <div className="mb-4 flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <RatingStars rating={MOCK_BOOK.rating} />
                    <span className="text-muted-foreground text-sm font-medium">
                      {MOCK_BOOK.rating}{" "}
                      <a
                        href="#reviews"
                        className="hover:text-primary transition-colors hover:underline"
                      >
                        ({MOCK_BOOK.reviewCount} Reviews)
                      </a>
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm font-medium">
                  Condition:{" "}
                  <a
                    href={`/explore?condition=${MOCK_BOOK.condition}`}
                    className="text-primary capitalize hover:underline"
                  >
                    {MOCK_BOOK.condition}
                  </a>
                </p>
              </div>

              <div className="text-muted-foreground mt-4 flex items-center gap-2 text-sm font-medium">
                <Users className="text-primary size-4" />
                ১২০ জনের পছন্দের তালিকায় আছে
              </div>

              <div className="text-muted-foreground mt-2 flex items-center gap-1.5 text-sm">
                ক্যাটাগরি:{" "}
                <a
                  href={`/explore?category=${encodeURIComponent(MOCK_BOOK.genre)}`}
                  className="text-primary font-medium hover:underline"
                >
                  {MOCK_BOOK.genre}
                </a>
              </div>

              <hr className="my-6 border-t" />

              {/* Pricing & Actions Section */}
              <div className="space-y-6">
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
                <img
                  src={MOCK_OWNER.avatarUrl}
                  alt={MOCK_OWNER.name}
                  className="size-12 rounded-full border bg-white object-cover"
                />
                <div>
                  <h4 className="text-foreground text-lg font-semibold">
                    {MOCK_OWNER.name}
                  </h4>
                  <div className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-sm">
                    <MapPin className="size-4" />
                    {MOCK_OWNER.location}
                  </div>
                  {!!MOCK_OWNER.badges?.length && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {MOCK_OWNER.badges.map((badge) => (
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
                  {MOCK_OWNER.rating} ({MOCK_BOOK.reviewCount} Reviews)
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
            {MOCK_BOOK.description}
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
              <div className="text-muted-foreground p-3 font-medium">ভাষা</div>
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
              <div className="text-muted-foreground p-3 font-medium">ISBN</div>
              <div className="col-span-2 p-3 font-medium">{MOCK_BOOK.isbn}</div>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        {MOCK_BOOK.tableOfContents && MOCK_BOOK.tableOfContents.length > 0 && (
          <div className="bg-card border p-5 shadow-sm lg:p-6">
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
          <div className="bg-card border p-5 shadow-sm lg:p-6">
            <h3 className="type-heading mb-4 text-xl">ইনডেক্স (Index)</h3>
            <ul className="text-muted-foreground bg-card list-inside list-disc space-y-1.5 rounded-xl border p-5">
              {MOCK_BOOK.index.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Reviews */}
        <div
          id="reviews"
          className="bg-card scroll-mt-24 border p-5 shadow-sm lg:p-6"
        >
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
