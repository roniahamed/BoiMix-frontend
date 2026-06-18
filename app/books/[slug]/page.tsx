import { Metadata } from "next";
import {
  MapPin,
  MessageCircle,
  Repeat2,
  ShoppingCart,
  BookOpen,
  Heart,
  Share2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { BookGallery } from "@/components/shared/book-gallery";
import { UserCard } from "@/components/shared/user-card";
import { RatingStars } from "@/components/shared/rating-stars";
import { ReviewCard } from "@/components/shared/review-card";
import { BadgePill } from "@/components/shared/badge-pill";
import { BookConditionBadge } from "@/components/shared/book-condition-badge";

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
  tags: ["sell", "swap", "borrow"],
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

export default function BookDetailsPage() {
  return (
    <div className="boimix-container py-8 md:py-12">
      <div className="grid gap-12 lg:grid-cols-12">
        {/* Left Column: Gallery & Owner Info */}
        <div className="space-y-8 lg:col-span-4 lg:col-start-1">
          <BookGallery images={MOCK_BOOK.images} />

          <div className="space-y-4">
            <h3 className="type-heading text-lg">বইটির মালিক</h3>
            <UserCard user={MOCK_OWNER} />
            <Button variant="outline" className="w-full gap-2">
              <MessageCircle className="size-4" />
              মালিককে মেসেজ দিন
            </Button>
          </div>
        </div>

        {/* Right Column: Book Info & Actions */}
        <div className="lg:col-span-8 lg:col-start-5">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
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
              <h1 className="type-heading mb-2 text-3xl md:text-4xl">
                {MOCK_BOOK.title}
              </h1>
              <p className="text-muted-foreground text-lg">
                {MOCK_BOOK.author}
              </p>
            </div>

            <div className="flex gap-2 sm:flex-col sm:items-end">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary rounded-full"
              >
                <Heart className="size-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary rounded-full"
              >
                <Share2 className="size-5" />
              </Button>
            </div>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <RatingStars rating={MOCK_BOOK.rating} />
              <span className="text-muted-foreground text-sm font-medium">
                ({MOCK_BOOK.reviewCount} Reviews)
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium sm:justify-end">
              <MapPin className="text-muted-foreground size-4" />
              {MOCK_BOOK.location}
              <span className="text-muted-foreground">
                ({MOCK_BOOK.distance})
              </span>
            </div>
          </div>

          {/* Action Cards */}
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            {MOCK_BOOK.tags.includes("sell") && (
              <div className="bg-card flex flex-col items-center justify-between rounded-xl border p-4 text-center shadow-sm">
                <div className="mb-4">
                  <p className="text-muted-foreground mb-1 text-sm font-medium">
                    কিনুন
                  </p>
                  <p className="text-accent text-2xl font-bold">
                    ৳{MOCK_BOOK.price}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {MOCK_BOOK.availability.sell} টি স্টকে আছে
                  </p>
                </div>
                <Button className="w-full gap-2">
                  <ShoppingCart className="size-4" />
                  Add to Cart
                </Button>
              </div>
            )}

            {MOCK_BOOK.tags.includes("swap") && (
              <div className="bg-card flex flex-col items-center justify-between rounded-xl border p-4 text-center shadow-sm">
                <div className="mb-4">
                  <p className="text-muted-foreground mb-1 text-sm font-medium">
                    বিনিময় করুন
                  </p>
                  <p className="text-foreground text-2xl font-bold">Swap</p>
                  <p className="text-muted-foreground text-xs">
                    সোয়াপ ভ্যালু: ৳{MOCK_BOOK.swapPrice}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary w-full gap-2 hover:text-white"
                >
                  <Repeat2 className="size-4" />
                  Swap Request
                </Button>
              </div>
            )}

            {MOCK_BOOK.tags.includes("borrow") && (
              <div className="bg-card flex flex-col items-center justify-between rounded-xl border p-4 text-center shadow-sm">
                <div className="mb-4">
                  <p className="text-muted-foreground mb-1 text-sm font-medium">
                    ধার নিন
                  </p>
                  <p className="text-foreground text-2xl font-bold">Borrow</p>
                  <p className="text-muted-foreground text-xs">
                    লাইব্রেরি মেম্বারদের জন্য
                  </p>
                </div>
                <Button variant="success" className="w-full gap-2">
                  <BookOpen className="size-4" />
                  Borrow Book
                </Button>
              </div>
            )}
          </div>

          <hr className="mb-8 border-t" />

          {/* Book Information Grid */}
          <div className="mb-10">
            <h3 className="type-heading mb-6 text-xl">বইয়ের বিস্তারিত তথ্য</h3>
            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">প্রকাশক</span>
                <span className="font-medium">{MOCK_BOOK.publisher}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">ক্যাটাগরি</span>
                <span className="font-medium">{MOCK_BOOK.genre}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">ভাষা</span>
                <span className="font-medium">{MOCK_BOOK.language}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">সংস্করণ</span>
                <span className="font-medium">{MOCK_BOOK.edition}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">পৃষ্ঠা সংখ্যা</span>
                <span className="font-medium">{MOCK_BOOK.pages}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">ISBN</span>
                <span className="font-medium">{MOCK_BOOK.isbn}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">বইয়ের অবস্থা</span>
                <BookConditionBadge condition={MOCK_BOOK.condition} />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="bg-muted/30 mb-10 grid grid-cols-3 gap-4 rounded-2xl border p-6">
            <div className="text-center">
              <p className="text-foreground text-2xl font-bold">
                {MOCK_BOOK.totalBorrow}
              </p>
              <p className="text-muted-foreground text-xs">
                বার ধার নেওয়া হয়েছে
              </p>
            </div>
            <div className="border-x text-center">
              <p className="text-foreground text-2xl font-bold">
                {MOCK_BOOK.totalSell}
              </p>
              <p className="text-muted-foreground text-xs">বার বিক্রি হয়েছে</p>
            </div>
            <div className="text-center">
              <p className="text-foreground text-2xl font-bold">
                {MOCK_BOOK.totalSwap}
              </p>
              <p className="text-muted-foreground text-xs">বার সোয়াপ হয়েছে</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-10">
            <h3 className="type-heading mb-4 text-xl">সারাংশ</h3>
            <p className="text-muted-foreground leading-relaxed">
              {MOCK_BOOK.description}
            </p>
          </div>

          {/* Table of Contents */}
          {MOCK_BOOK.tableOfContents &&
            MOCK_BOOK.tableOfContents.length > 0 && (
              <div className="mb-10">
                <h3 className="type-heading mb-4 text-xl">সূচিপত্র</h3>
                <ul className="text-muted-foreground list-disc space-y-2 pl-5">
                  {MOCK_BOOK.tableOfContents.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

          <hr className="mb-10 border-t" />

          {/* Reviews Section */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="type-heading text-xl">
                রিভিউ ({MOCK_BOOK.reviewCount})
              </h3>
              <Button
                variant="ghost"
                className="text-primary hover:bg-primary/10 hover:text-primary"
              >
                সবগুলো দেখুন
              </Button>
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

            <div className="bg-muted/50 mt-6 rounded-lg p-6 text-center">
              <p className="text-muted-foreground mb-4">
                বইটি ধার, সোয়াপ বা কেনার পরেই আপনি রিভিউ দিতে পারবেন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
