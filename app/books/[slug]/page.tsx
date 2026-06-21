import { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  MessageCircle,
  Repeat2,
  ShoppingCart,
  BookOpen,
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
import { ScrollContainer } from "@/components/shared/scroll-container";
import type { BookCardBook } from "@/types/book";
import { BookHeaderActions } from "@/components/shared/book-header-actions";
import { BookReviews } from "@/components/shared/book-reviews";
import { BookQA } from "@/components/shared/book-qa";
import { MobileNavbar } from "@/components/layout/mobile-navbar";

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
  tags: ["swap"],
  availability: {
    sell: 0,
    borrow: 0,
    swap: 1,
  },
  location: "মিরপুর ১০, ঢাকা",
  distance: "১.২ কি.মি.",
  condition: "excellent" as const,
  price: 250,
  originalPrice: 350,
  swapPrice: 300,
  borrowFee: 50,
  maxBorrowDays: 14,
  swapPreferences: ["Fiction", "Self Help", "Any Book"],
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
  followers: 245,
  badges: [
    { label: "Top Swapper", variant: "success" as const },
    { label: "Verified", variant: "info" as const },
  ],
};

const MOCK_REVIEWS = [
  {
    id: "r1",
    authorName: "Dipto Hossain",
    authorAvatar: "",
    rating: 1,
    date: "06 Jan 2025",
    content: "বইটা বিশেষ কিছু নেই খুবই বাজে একটা বই।",
    helpfulCount: 12,
  },
  {
    id: "r2",
    authorName: "Azizul Hakim",
    authorAvatar: "https://i.pravatar.cc/150?u=azizul",
    rating: 1,
    date: "14 Feb 2024",
    content: "faltu boi khube faltu keu kinben na",
    helpfulCount: 39,
  },
  {
    id: "r3",
    authorName: "Mahfuz Ahmed Emon",
    authorAvatar: "https://i.pravatar.cc/150?u=mahfuz",
    rating: 5,
    date: "19 Oct 2025",
    content: "Great book on laws of attractions.",
    helpfulCount: 3,
  },
  {
    id: "r4",
    authorName: "Sabbir Hasan",
    authorAvatar: "",
    rating: 4,
    date: "12 Dec 2023",
    content: "Valoi lagse, kintu ar o details thakle valo hoto.",
    helpfulCount: 5,
  },
  {
    id: "r5",
    authorName: "Nusrat Jahan",
    authorAvatar: "",
    rating: 5,
    date: "10 Nov 2023",
    content: "Excellent read! Highly recommended for everyone.",
    helpfulCount: 12,
  },
  {
    id: "r6",
    authorName: "Rakib Uddin",
    authorAvatar: "",
    rating: 3,
    date: "05 Sep 2023",
    content: "Average book. Not bad but not great either.",
    helpfulCount: 1,
  },
  {
    id: "r7",
    authorName: "Tariqul Islam",
    authorAvatar: "",
    rating: 2,
    date: "01 Aug 2023",
    content: "Didn't meet my expectations. Delivery was late too.",
    helpfulCount: 0,
  },
];

const MOCK_QA = [
  {
    id: "qa1",
    question:
      "এই বইটা কবে ছাপাবে? মানে এটা তো pdf আকারে পাওয়া যাচ্ছে? বাট প্রকাশনী থেকে কবে প্রকাশ করবে??",
    asker: "Md Fardin Hossain",
    askDate: "03 Jan, 2024",
    answer:
      "প্রিয় গ্রাহক, দুঃখিত, এটি নির্ভর করে প্রকাশনী কর্তৃক রিপ্রিন্ট করার মাধ্যমে; তাই নিশ্চিতভাবে বলা যাচ্ছে না কবে পাওয়া যাবে। ধন্যবাদ।",
    answerer: "Zakariya Arif",
    answerDate: "03 Jan, 2024",
  },
  {
    id: "qa2",
    question: "Is this the hardcover edition?",
    asker: "Tanvir Ahmed",
    askDate: "12 Feb, 2024",
    answer: "No, this is the paperback edition.",
    answerer: "BoiMix Support",
    answerDate: "13 Feb, 2024",
  },
  {
    id: "qa3",
    question: "Boi tar pages koto gulo?",
    asker: "Samiya Rahman",
    askDate: "05 Mar, 2024",
    answer: "এই বইটিতে মোট ৩২০ টি পৃষ্ঠা রয়েছে।",
    answerer: "BoiMix Support",
    answerDate: "06 Mar, 2024",
  },
  {
    id: "qa4",
    question: "Delivery charge koto nibe outside Dhaka?",
    asker: "Kamrul Hasan",
    askDate: "20 Apr, 2024",
  },
  {
    id: "qa5",
    question: "Boi ta ki English version e ase?",
    asker: "Rifat Ali",
    askDate: "15 May, 2024",
    answer: "দুঃখিত, বর্তমানে শুধু বাংলা সংস্করণটিই আমাদের কাছে আছে।",
    answerer: "BoiMix Support",
    answerDate: "16 May, 2024",
  },
  {
    id: "qa6",
    question: "Order korle kobe pabo?",
    asker: "Jubayer Hossain",
    askDate: "22 Jun, 2024",
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
  {
    id: "rec-5",
    slug: "devdas",
    title: "দেবদাস",
    author: "শরৎচন্দ্র চট্টোপাধ্যায়",
    coverUrl:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400",
    tags: ["borrow"],
    rating: 4.6,
    reviewCount: 320,
    condition: "good",
    availability: "in-stock",
    location: "মিরপুর, ঢাকা",
    distance: "২.০ কি.মি.",
  },
  {
    id: "rec-6",
    slug: "srikanta",
    title: "শ্রীকান্ত",
    author: "শরৎচন্দ্র চট্টোপাধ্যায়",
    coverUrl:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400",
    tags: ["swap", "sell"],
    rating: 4.8,
    reviewCount: 110,
    price: 250,
    originalPrice: 350,
    condition: "excellent",
    availability: "in-stock",
    location: "মোহাম্মদপুর, ঢাকা",
    distance: "৪.২ কি.মি.",
  },
  {
    id: "rec-7",
    slug: "bela-furabar-age",
    title: "বেলা ফুরাবার আগে",
    author: "আরিফ আজাদ",
    coverUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400",
    tags: ["sell"],
    rating: 4.9,
    reviewCount: 540,
    price: 300,
    originalPrice: 400,
    condition: "new",
    availability: "in-stock",
    location: "উত্তরা, ঢাকা",
    distance: "৮ কি.মি.",
  },
  {
    id: "rec-8",
    slug: "paradoxical-sajid",
    title: "প্যারাডক্সিক্যাল সাজিদ",
    author: "আরিফ আজাদ",
    coverUrl:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=400",
    tags: ["borrow"],
    rating: 4.8,
    reviewCount: 890,
    condition: "excellent",
    availability: "out-of-stock",
    location: "খিলক্ষেত, ঢাকা",
    distance: "৯.৫ কি.মি.",
  },
];

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Find the book in recommendations to see if it has specific tags,
  // or use test slugs, or default to "sell"
  const foundBook = MOCK_RECOMMENDED_BOOKS.find((b) => b.slug === slug);

  const currentTag =
    slug === "test-sell"
      ? "sell"
      : slug === "test-swap"
        ? "swap"
        : slug === "test-borrow"
          ? "borrow"
          : foundBook
            ? foundBook.tags[0]
            : "sell";

  const currentBook = { ...MOCK_BOOK, tags: [currentTag] };

  // Adjust availability based on the tag so it looks realistic
  if (currentTag === "sell") {
    currentBook.availability = { sell: 3, borrow: 0, swap: 0 };
  } else if (currentTag === "borrow") {
    currentBook.availability = { sell: 0, borrow: 2, swap: 0 };
  } else if (currentTag === "swap") {
    currentBook.availability = { sell: 0, borrow: 0, swap: 1 };
  }

  return (
    <div className="sm:boimix-container w-full pt-0 pb-24 sm:px-4 md:px-6 md:pt-8 md:pb-12">
      <div className="bg-card border-y p-0 shadow-sm sm:rounded-xl sm:border sm:p-6 lg:p-8">
        <div className="grid gap-4 md:gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-4 lg:col-start-1">
            <div className="relative mx-auto w-full sm:max-w-[320px]">
              {/* Mobile Top Navigation (Overlaid on Image) */}
              <div className="absolute top-4 right-4 left-4 z-20 flex items-center justify-between md:hidden">
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
                    <Link href="/dashboard/cart">
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
                  {currentBook.tags.includes("swap") && (
                    <span className="text-info text-sm font-semibold">
                      Swap
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
                {currentBook.tags.includes("swap") && (
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      Estimated Swap Value
                    </span>
                    <span className="text-foreground text-xl leading-none font-bold">
                      ৳{currentBook.swapPrice}
                    </span>
                    {currentBook.swapPreferences &&
                      currentBook.swapPreferences.length > 0 && (
                        <span className="text-muted-foreground mt-1 text-xs leading-tight">
                          <span className="text-foreground font-semibold">
                            Preferences:
                          </span>{" "}
                          {currentBook.swapPreferences.join(", ")}
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
                  {currentBook.tags.includes("swap") && (
                    <div>
                      <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                        Estimated Swap Value
                      </p>
                      <div className="flex items-end gap-2">
                        <p className="text-foreground text-3xl font-bold">
                          ৳{currentBook.swapPrice}
                        </p>
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-muted-foreground text-xs">
                          Depends on book condition
                        </p>
                      </div>

                      {currentBook.swapPreferences &&
                        currentBook.swapPreferences.length > 0 && (
                          <div className="mt-4">
                            <p className="text-foreground mb-2 text-sm font-semibold">
                              Swap Preferences:
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {currentBook.swapPreferences.map((pref) => (
                                <span
                                  key={pref}
                                  className="bg-primary/10 text-primary rounded-md px-2.5 py-1 text-xs font-medium"
                                >
                                  {pref}
                                </span>
                              ))}
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
                  {currentBook.tags.includes("sell") && (
                    <Button className="h-12 w-full gap-2 text-base">
                      <ShoppingCart className="size-5" />
                      Add to Cart
                    </Button>
                  )}
                  {currentBook.tags.includes("swap") && (
                    <Button className="h-12 w-full gap-2 text-base">
                      <Repeat2 className="size-5" />
                      Swap Request
                    </Button>
                  )}
                  {currentBook.tags.includes("borrow") && (
                    <Button className="h-12 w-full gap-2 text-base">
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={MOCK_OWNER.avatarUrl}
                  alt={MOCK_OWNER.name}
                  className="size-12 rounded-full border bg-white object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-foreground text-lg font-semibold">
                      {MOCK_OWNER.name}
                    </h4>
                    <span className="text-muted-foreground/50 hidden shrink-0 sm:inline">
                      •
                    </span>
                    <div className="text-muted-foreground flex items-center gap-1 text-sm font-medium">
                      <Users className="size-4" />
                      {MOCK_OWNER.followers} Followers
                    </div>
                  </div>
                  <div className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-sm">
                    <MapPin className="size-4 shrink-0" />
                    <span className="truncate">{MOCK_OWNER.location}</span>
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
                  {MOCK_OWNER.rating} ({currentBook.reviewCount} Reviews)
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

        <BookReviews reviews={MOCK_REVIEWS} bookTitle={MOCK_BOOK.title} />

        <BookQA qas={MOCK_QA} />
      </div>

      {/* Similar Books Section */}
      <div className="mt-16">
        <h2 className="type-heading mb-6 text-2xl">
          একই ধরনের আরও বই (Similar Books)
        </h2>
        <ScrollContainer>
          {MOCK_RECOMMENDED_BOOKS.map((book) => (
            <div
              key={book.id}
              className="w-[140px] shrink-0 snap-start sm:w-[160px]"
            >
              <BookCard book={book} />
            </div>
          ))}
        </ScrollContainer>
      </div>

      {/* Recently Viewed Books Section */}
      <div className="mt-12">
        <h2 className="type-heading mb-6 text-2xl">
          সম্প্রতি দেখা বই (Recently Viewed)
        </h2>
        <ScrollContainer>
          {MOCK_RECOMMENDED_BOOKS.slice()
            .reverse()
            .map((book) => (
              <div
                key={book.id}
                className="w-[140px] shrink-0 snap-start sm:w-[160px]"
              >
                <BookCard book={book} />
              </div>
            ))}
        </ScrollContainer>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="pb-safe fixed bottom-0 left-0 z-50 flex w-full sm:hidden">
        {currentBook.tags.includes("sell") && (
          <Button className="h-[60px] flex-1 gap-2 rounded-none text-lg">
            <ShoppingCart className="size-5" />
            <span className="font-semibold">Add to Cart</span>
          </Button>
        )}
        {currentBook.tags.includes("swap") && (
          <Button className="h-[60px] flex-1 gap-2 rounded-none text-lg">
            <Repeat2 className="size-5" />
            <span className="font-semibold">Swap</span>
          </Button>
        )}
        {currentBook.tags.includes("borrow") && (
          <Button className="h-[60px] flex-1 gap-2 rounded-none text-lg">
            <BookOpen className="size-5" />
            <span className="font-semibold">Borrow</span>
          </Button>
        )}
      </div>
    </div>
  );
}
