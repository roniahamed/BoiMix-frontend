import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  BookOpenIcon,
  Building2Icon,
  GraduationCapIcon,
  LibraryIcon,
  MessageCircleIcon,
  Repeat2Icon,
  ShoppingCartIcon,
  SparklesIcon,
  StarIcon,
  UsersRoundIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { HeroCarousel } from "@/components/home/hero-carousel";
import { MainLayout } from "@/components/layout/main-layout";
import { BookCard } from "@/components/shared/book-card";
import { ScrollContainer } from "@/components/shared/scroll-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { BookCardBook } from "@/types/book";

const categories = [
  {
    title: "Fiction",
    href: "/books/category/fiction",
    icon: BookOpenIcon,
    image: "/categories/fiction.png",
  },
  {
    title: "Academic",
    href: "/books/category/academic",
    icon: GraduationCapIcon,
    image: "/categories/academic.png",
  },
  {
    title: "Self Help",
    href: "/books/category/self-help",
    icon: SparklesIcon,
    image: "/categories/self-help.png",
  },
  {
    title: "Business",
    href: "/books/category/business",
    icon: Building2Icon,
    image: "/categories/business.png",
  },
  {
    title: "Community",
    href: "/community",
    icon: UsersRoundIcon,
    image: "/categories/community.png",
  },
  {
    title: "Biography",
    href: "/books/category/biography",
    icon: UsersRoundIcon,
    image: "/categories/community.png",
  },
  {
    title: "History",
    href: "/books/category/history",
    icon: BookOpenIcon,
    image: "/categories/fiction.png",
  },
  {
    title: "Science",
    href: "/books/category/science",
    icon: SparklesIcon,
    image: "/categories/self-help.png",
  },
  {
    title: "Technology",
    href: "/books/category/technology",
    icon: Building2Icon,
    image: "/categories/business.png",
  },
  {
    title: "Poetry",
    href: "/books/category/poetry",
    icon: BookOpenIcon,
    image: "/categories/fiction.png",
  },
  {
    title: "Drama",
    href: "/books/category/drama",
    icon: UsersRoundIcon,
    image: "/categories/community.png",
  },
  {
    title: "Thriller",
    href: "/books/category/thriller",
    icon: SparklesIcon,
    image: "/categories/self-help.png",
  },
  {
    title: "Mystery",
    href: "/books/category/mystery",
    icon: BookOpenIcon,
    image: "/categories/fiction.png",
  },
  {
    title: "Romance",
    href: "/books/category/romance",
    icon: SparklesIcon,
    image: "/categories/self-help.png",
  },
  {
    title: "Sci-Fi",
    href: "/books/category/sci-fi",
    icon: Building2Icon,
    image: "/categories/business.png",
  },
  {
    title: "Comics",
    href: "/books/category/comics",
    icon: BookOpenIcon,
    image: "/categories/fiction.png",
  },
  {
    title: "Children",
    href: "/books/category/children",
    icon: GraduationCapIcon,
    image: "/categories/academic.png",
  },
  {
    title: "Religion",
    href: "/books/category/religion",
    icon: UsersRoundIcon,
    image: "/categories/community.png",
  },
  {
    title: "Philosophy",
    href: "/books/category/philosophy",
    icon: SparklesIcon,
    image: "/categories/self-help.png",
  },
  {
    title: "Travel",
    href: "/books/category/travel",
    icon: BookOpenIcon,
    image: "/categories/fiction.png",
  },
  {
    title: "Cookbooks",
    href: "/books/category/cookbooks",
    icon: Building2Icon,
    image: "/categories/business.png",
  },
  {
    title: "Art & Music",
    href: "/books/category/art-music",
    icon: SparklesIcon,
    image: "/categories/self-help.png",
  },
  {
    title: "Health",
    href: "/books/category/health",
    icon: GraduationCapIcon,
    image: "/categories/academic.png",
  },
  {
    title: "Sports",
    href: "/books/category/sports",
    icon: UsersRoundIcon,
    image: "/categories/community.png",
  },
  {
    title: "Politics",
    href: "/books/category/politics",
    icon: Building2Icon,
    image: "/categories/business.png",
  },
  {
    title: "Novels",
    href: "/books/category/novels",
    icon: BookOpenIcon,
    image: "/categories/fiction.png",
  },
  {
    title: "Literature",
    href: "/books/category/literature",
    icon: BookOpenIcon,
    image: "/categories/fiction.png",
  },
  {
    title: "Manga",
    href: "/books/category/manga",
    icon: SparklesIcon,
    image: "/categories/self-help.png",
  },
  {
    title: "Dictionary",
    href: "/books/category/dictionary",
    icon: GraduationCapIcon,
    image: "/categories/academic.png",
  },
  {
    title: "Magazines",
    href: "/books/category/magazines",
    icon: Building2Icon,
    image: "/categories/business.png",
  },
];

const featuredBooks: BookCardBook[] = [
  {
    id: "rivers-of-dhaka",
    slug: "rivers-of-dhaka",
    title: "Rivers of Dhaka",
    author: "Nadia Rahman",
    coverUrl: "/book-covers/rivers-of-dhaka.svg",
    tags: ["sell", "borrow"],
    rating: 4.8,
    reviewCount: 42,
    price: 420,
    distance: "1.2 km",
    location: "Dhanmondi",
    condition: "excellent",
    availability: "in-stock",
    isVerifiedLibrary: true,
  },
  {
    id: "borrowed-light",
    slug: "borrowed-light",
    title: "Borrowed Light",
    author: "Arif Hossain",
    coverUrl: "/book-covers/borrowed-light.svg",
    tags: ["borrow"],
    rating: 4.6,
    reviewCount: 31,
    distance: "0.8 km",
    location: "Mirpur",
    condition: "good",
    availability: "in-stock",
    isWishlisted: true,
    isVerifiedLibrary: true,
  },
  {
    id: "swap-stories",
    slug: "swap-stories",
    title: "Swap Stories",
    author: "Maliha Karim",
    coverUrl: "/book-covers/swap-stories.svg",
    tags: ["swap", "sell"],
    rating: 4.7,
    reviewCount: 28,
    price: 360,
    distance: "2.4 km",
    location: "Uttara",
    condition: "new",
    availability: "in-stock",
  },
  {
    id: "the-reader-map",
    slug: "the-reader-map",
    title: "The Reader Map",
    author: "Samiul Islam",
    coverUrl: "/book-covers/the-reader-map.svg",
    tags: ["swap", "borrow"],
    rating: 4.5,
    reviewCount: 19,
    distance: "3.1 km",
    location: "Banani",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "market-lanes",
    slug: "market-lanes",
    title: "Market Lanes",
    author: "Tahsin Ahmed",
    coverUrl: "/book-covers/market-lanes.svg",
    tags: ["sell"],
    rating: 4.4,
    reviewCount: 16,
    price: 280,
    location: "Bashundhara",
    condition: "good",
    availability: "in-stock",
  },
  {
    id: "quiet-reviews",
    slug: "quiet-reviews",
    title: "Quiet Reviews",
    author: "Raisa Chowdhury",
    coverUrl: "/book-covers/quiet-reviews.svg",
    tags: ["borrow", "swap"],
    rating: 4.9,
    reviewCount: 52,
    distance: "1.7 km",
    location: "Mohammadpur",
    condition: "excellent",
    availability: "in-stock",
    isInCart: true,
  },
  {
    id: "song-of-padma",
    slug: "song-of-padma",
    title: "The Song of the Padma",
    author: "Tasnim Ara",
    coverUrl: "/book-covers/rivers-of-dhaka.svg",
    tags: ["sell", "borrow"],
    rating: 4.5,
    reviewCount: 23,
    price: 350,
    distance: "1.5 km",
    location: "Savar",
    condition: "good",
    availability: "in-stock",
  },
  {
    id: "chhaya-bithi",
    slug: "chhaya-bithi",
    title: "Chhaya Bithi",
    author: "Humayun Ahmed",
    coverUrl: "/book-covers/borrowed-light.svg",
    tags: ["borrow"],
    rating: 4.9,
    reviewCount: 120,
    distance: "3.5 km",
    location: "Sylhet",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "programming-basics",
    slug: "programming-basics",
    title: "Programming Basics",
    author: "Tamim Shahriar Subeen",
    coverUrl: "/book-covers/swap-stories.svg",
    tags: ["sell"],
    rating: 4.8,
    reviewCount: 85,
    price: 250,
    location: "Chittagong",
    condition: "new",
    availability: "in-stock",
  },
  {
    id: "struggles-of-life",
    slug: "struggles-of-life",
    title: "Struggles of Life",
    author: "Kazi Nazrul Islam",
    coverUrl: "/book-covers/the-reader-map.svg",
    tags: ["swap", "sell"],
    rating: 4.7,
    reviewCount: 45,
    price: 180,
    distance: "4.2 km",
    location: "Mymensingh",
    condition: "good",
    availability: "in-stock",
  },
  {
    id: "lost-sonnet",
    slug: "lost-sonnet",
    title: "The Lost Sonnet",
    author: "Rabindranath Tagore",
    coverUrl: "/book-covers/market-lanes.svg",
    tags: ["borrow", "swap"],
    rating: 4.6,
    reviewCount: 60,
    distance: "2.8 km",
    location: "Khulna",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "boi-er-pata",
    slug: "boi-er-pata",
    title: "Boi-er Pata",
    author: "Shamsur Rahman",
    coverUrl: "/book-covers/quiet-reviews.svg",
    tags: ["swap"],
    rating: 4.3,
    reviewCount: 14,
    distance: "5.0 km",
    location: "Barisal",
    condition: "fair",
    availability: "in-stock",
  },
  {
    id: "dhaka-metro",
    slug: "dhaka-metro",
    title: "Dhaka Metro Diary",
    author: "Nayeem Islam",
    coverUrl: "/book-covers/rivers-of-dhaka.svg",
    tags: ["sell", "borrow"],
    rating: 4.2,
    reviewCount: 18,
    price: 150,
    distance: "0.5 km",
    location: "Mirpur",
    condition: "good",
    availability: "in-stock",
  },
  {
    id: "sundarbans-adventure",
    slug: "sundarbans-adventure",
    title: "Sundarbans Adventure",
    author: "Muhammed Zafar Iqbal",
    coverUrl: "/book-covers/borrowed-light.svg",
    tags: ["borrow"],
    rating: 4.8,
    reviewCount: 77,
    distance: "6.2 km",
    location: "Bagerhat",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "smart-entrepreneur",
    slug: "smart-entrepreneur",
    title: "Smart Entrepreneur",
    author: "Ayman Sadiq",
    coverUrl: "/book-covers/swap-stories.svg",
    tags: ["sell"],
    rating: 4.7,
    reviewCount: 110,
    price: 320,
    location: "Banani",
    condition: "new",
    availability: "in-stock",
  },
  {
    id: "history-of-bengal",
    slug: "history-of-bengal",
    title: "History of Bengal",
    author: "Akbar Ali Khan",
    coverUrl: "/book-covers/the-reader-map.svg",
    tags: ["swap", "sell", "borrow"],
    rating: 4.9,
    reviewCount: 65,
    price: 480,
    distance: "1.9 km",
    location: "Dhanmondi",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "silent-whispers",
    slug: "silent-whispers",
    title: "Silent Whispers",
    author: "Tahmima Anam",
    coverUrl: "/book-covers/market-lanes.svg",
    tags: ["sell"],
    rating: 4.4,
    reviewCount: 21,
    price: 290,
    location: "Uttara",
    condition: "good",
    availability: "in-stock",
  },
  {
    id: "golden-age",
    slug: "golden-age",
    title: "A Golden Age",
    author: "Tahmima Anam",
    coverUrl: "/book-covers/quiet-reviews.svg",
    tags: ["borrow"],
    rating: 4.6,
    reviewCount: 39,
    distance: "2.1 km",
    location: "Gulshan",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "lalshalu",
    slug: "lalshalu",
    title: "Lalshalu",
    author: "Syed Waliullah",
    coverUrl: "/book-covers/rivers-of-dhaka.svg",
    tags: ["swap"],
    rating: 4.8,
    reviewCount: 94,
    distance: "3.7 km",
    location: "Comilla",
    condition: "good",
    availability: "in-stock",
  },
  {
    id: "pather-panchali",
    slug: "pather-panchali",
    title: "Pather Panchali",
    author: "Bibhutibhushan Bandyopadhyay",
    coverUrl: "/book-covers/borrowed-light.svg",
    tags: ["sell", "borrow"],
    rating: 4.9,
    reviewCount: 142,
    price: 190,
    distance: "4.5 km",
    location: "Jessore",
    condition: "good",
    availability: "in-stock",
  },
  {
    id: "chokher-bali",
    slug: "chokher-bali",
    title: "Chokher Bali",
    author: "Rabindranath Tagore",
    coverUrl: "/book-covers/swap-stories.svg",
    tags: ["swap", "sell"],
    rating: 4.7,
    reviewCount: 53,
    price: 220,
    distance: "2.9 km",
    location: "Pabna",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "gora-book",
    slug: "gora-book",
    title: "Gora",
    author: "Rabindranath Tagore",
    coverUrl: "/book-covers/the-reader-map.svg",
    tags: ["borrow"],
    rating: 4.8,
    reviewCount: 88,
    distance: "3.2 km",
    location: "Rajshahi",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "shesher-kobita",
    slug: "shesher-kobita",
    title: "Shesher Kobita",
    author: "Rabindranath Tagore",
    coverUrl: "/book-covers/market-lanes.svg",
    tags: ["sell"],
    rating: 4.9,
    reviewCount: 115,
    price: 160,
    location: "Bogra",
    condition: "new",
    availability: "in-stock",
  },
  {
    id: "devdas-novel",
    slug: "devdas-novel",
    title: "Devdas",
    author: "Sarat Chandra Chattopadhyay",
    coverUrl: "/book-covers/quiet-reviews.svg",
    tags: ["swap", "borrow"],
    rating: 4.5,
    reviewCount: 67,
    distance: "5.1 km",
    location: "Rangpur",
    condition: "good",
    availability: "in-stock",
  },
  {
    id: "srikanta-novel",
    slug: "srikanta-novel",
    title: "Srikanta",
    author: "Sarat Chandra Chattopadhyay",
    coverUrl: "/book-covers/rivers-of-dhaka.svg",
    tags: ["sell", "swap"],
    rating: 4.6,
    reviewCount: 41,
    price: 240,
    distance: "4.8 km",
    location: "Dinajpur",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "kopalkundala",
    slug: "kopalkundala",
    title: "Kopalkundala",
    author: "Bankim Chandra Chattopadhyay",
    coverUrl: "/book-covers/borrowed-light.svg",
    tags: ["borrow"],
    rating: 4.4,
    reviewCount: 33,
    distance: "2.7 km",
    location: "Kushtia",
    condition: "good",
    availability: "in-stock",
  },
  {
    id: "anandamath",
    slug: "anandamath",
    title: "Anandamath",
    author: "Bankim Chandra Chattopadhyay",
    coverUrl: "/book-covers/swap-stories.svg",
    tags: ["sell"],
    rating: 4.7,
    reviewCount: 59,
    price: 300,
    location: "Faridpur",
    condition: "new",
    availability: "in-stock",
  },
  {
    id: "byomkesh-samagra",
    slug: "byomkesh-samagra",
    title: "Byomkesh Samagra",
    author: "Sharadindu Bandyopadhyay",
    coverUrl: "/book-covers/the-reader-map.svg",
    tags: ["swap", "sell", "borrow"],
    rating: 4.9,
    reviewCount: 156,
    price: 650,
    distance: "3.4 km",
    location: "Tangail",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "feluda-somogro",
    slug: "feluda-somogro",
    title: "Feluda Somogro",
    author: "Satyajit Ray",
    coverUrl: "/book-covers/market-lanes.svg",
    tags: ["sell", "borrow"],
    rating: 4.9,
    reviewCount: 203,
    price: 750,
    distance: "1.8 km",
    location: "Gazipur",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "professor-shonku",
    slug: "professor-shonku",
    title: "Professor Shonku",
    author: "Satyajit Ray",
    coverUrl: "/book-covers/quiet-reviews.svg",
    tags: ["borrow", "swap"],
    rating: 4.8,
    reviewCount: 119,
    distance: "2.3 km",
    location: "Narayanganj",
    condition: "good",
    availability: "in-stock",
  },
];

const newBooks: BookCardBook[] = [...featuredBooks].reverse();

const communityPosts = [
  {
    title: "A week of campus book swaps",
    author: "Sadia Noor",
    stat: "18 replies",
  },
  {
    title: "Best Bangla translations this month",
    author: "Imran Kabir",
    stat: "34 reactions",
  },
  {
    title: "Reading list for first-year students",
    author: "Nusrat Jahan",
    stat: "12 saves",
  },
];

const sponsors = [
  "Pathagar Circle",
  "Dhaka Readers",
  "Campus Shelf",
  "BookBridge",
];

export default function Home() {
  return (
    <MainLayout>
      <HeroCarousel />
      <CategorySection />
      <BookSection
        title="Trending Books"
        href="/books/trending"
        books={featuredBooks}
      />
      <BookSection title="New Books" href="/books/new" books={newBooks} />
      <CentralLibrarySection />
      <MarketplaceSection />
      <SwapBooksSection />
      <CommunitySection />
      <SponsorsSection />
      <NewsletterSection />
    </MainLayout>
  );
}

function CategorySection() {
  return (
    <section className="py-4 md:py-6">
      <div className="boimix-container-wide bg-card border-border/50 rounded-xl border p-4 shadow-sm md:p-6">
        <SectionHeader title="Categories" href="/books" />
        <ScrollContainer>
          {categories.map((category) => {
            return (
              <Link
                key={category.href}
                href={category.href}
                className="group flex w-[76px] shrink-0 flex-col items-center gap-1.5 text-center sm:w-[90px] md:w-[100px]"
              >
                <div className="group-hover:border-primary border-border bg-card relative h-12 w-12 overflow-hidden rounded-full border transition-all duration-300 group-hover:shadow-sm sm:h-16 sm:w-16 md:h-20 md:w-20">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(min-width: 768px) 80px, 48px"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="text-foreground group-hover:text-primary text-[0.7rem] leading-tight font-semibold transition-colors sm:text-[0.75rem] md:text-xs">
                  {category.title}
                </span>
              </Link>
            );
          })}
        </ScrollContainer>
      </div>
    </section>
  );
}

function BookSection({
  title,
  href,
  books,
}: {
  title: string;
  href: string;
  books: BookCardBook[];
}) {
  return (
    <section className="py-4 md:py-6">
      <div className="boimix-container-wide bg-card border-border/50 rounded-xl border p-4 shadow-sm md:p-6">
        <SectionHeader title={title} href={href} />
        <ScrollContainer>
          {books.map((book) => (
            <BookCard
              key={`${title}-${book.id}`}
              book={book}
              className="w-[150px] shrink-0 sm:w-[165px] lg:w-[180px]"
            />
          ))}
        </ScrollContainer>
      </div>
    </section>
  );
}

function CentralLibrarySection() {
  const books = featuredBooks
    .filter((b) => b.isVerifiedLibrary || b.tags.includes("borrow"))
    .slice(0, 12);

  return (
    <section className="py-4 md:py-6">
      <div className="boimix-container-wide bg-card grid gap-6 rounded-xl p-4 shadow-sm md:p-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <FeaturePanel
          title="Central Library"
          href="/explore/central-library"
          icon={LibraryIcon}
          tone="info"
          description="Verified BoiMix-owned books for borrowing and buying, organized for readers who want trusted access."
          stats={[
            ["4,200+", "Library books"],
            ["7 days", "Borrow window"],
            ["Verified", "Inventory"],
          ]}
        />
        <div className="w-full min-w-0">
          <HorizontalBookRow books={books} rowKey="library" />
        </div>
      </div>
    </section>
  );
}

function MarketplaceSection() {
  const books = featuredBooks
    .filter((b) => b.tags.includes("sell"))
    .slice(0, 12);

  return (
    <section className="py-4 md:py-6">
      <div className="boimix-container-wide bg-card grid gap-6 rounded-xl p-4 shadow-sm md:p-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="w-full min-w-0">
          <HorizontalBookRow books={books} rowKey="market" />
        </div>
        <FeaturePanel
          title="Marketplace"
          href="/explore/store"
          icon={ShoppingCartIcon}
          tone="warning"
          description="Buy and sell books through reader listings with clear condition, price, location, and availability."
          stats={[
            ["৳280+", "Starting price"],
            ["Near you", "Local listings"],
            ["Reader", "Owned books"],
          ]}
        />
      </div>
    </section>
  );
}

function SwapBooksSection() {
  const books = featuredBooks
    .filter((b) => b.tags.includes("swap"))
    .slice(0, 12);

  return (
    <section className="py-4 md:py-6">
      <div className="boimix-container-wide bg-card grid gap-6 rounded-xl p-4 shadow-sm md:p-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <FeaturePanel
          title="Swap Books"
          href="/explore/swaps"
          icon={Repeat2Icon}
          tone="success"
          description="Trade books peer to peer with structured swap requests, counters, agreements, and handover paths."
          stats={[
            ["Peer", "To peer"],
            ["Counter", "Offers"],
            ["Safe", "Handover"],
          ]}
        />
        <div className="w-full min-w-0">
          <HorizontalBookRow books={books} rowKey="swap" />
        </div>
      </div>
    </section>
  );
}

function HorizontalBookRow({
  books,
  rowKey,
}: {
  books: BookCardBook[];
  rowKey: string;
}) {
  return (
    <ScrollContainer>
      {books.map((book) => (
        <BookCard
          key={`${rowKey}-${book.id}`}
          book={book}
          className="w-[150px] shrink-0 sm:w-[165px] lg:w-[180px]"
        />
      ))}
    </ScrollContainer>
  );
}

function FeaturePanel({
  title,
  href,
  icon: Icon,
  tone,
  description,
  stats,
}: {
  title: string;
  href: string;
  icon: LucideIcon;
  tone: "info" | "warning" | "success";
  description: string;
  stats: [string, string][];
}) {
  const toneClass = {
    info: "bg-info-soft text-info",
    warning: "bg-warning-soft text-warning",
    success: "bg-success-soft text-success",
  }[tone];

  return (
    <div className="bg-card shadow-soft rounded-lg p-6">
      <span
        className={`inline-flex size-12 items-center justify-center rounded-lg ${toneClass}`}
      >
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h2 className="text-foreground mt-5 text-2xl font-semibold">{title}</h2>
      <p className="text-muted-foreground mt-3 text-sm leading-6">
        {description}
      </p>
      <dl className="mt-5 grid grid-cols-3 gap-2">
        {stats.map(([value, label]) => (
          <div key={label} className="bg-muted/60 rounded-lg p-3">
            <dt className="text-muted-foreground text-[0.7rem]">{label}</dt>
            <dd className="text-foreground mt-1 text-sm font-bold">{value}</dd>
          </div>
        ))}
      </dl>
      <Button asChild className="mt-5">
        <Link href={href}>
          Explore
          <ArrowRightIcon />
        </Link>
      </Button>
    </div>
  );
}

function CommunitySection() {
  return (
    <section className="py-4 md:py-6">
      <div className="boimix-container-wide bg-card border-border/50 rounded-xl border p-4 shadow-sm md:p-6">
        <SectionHeader title="Community Posts" href="/community" />
        <div className="grid gap-4 md:grid-cols-3">
          {communityPosts.map((post) => (
            <article
              key={post.title}
              className="bg-card shadow-soft rounded-lg border p-5"
            >
              <span className="bg-info-soft text-info inline-flex size-10 items-center justify-center rounded-lg">
                <MessageCircleIcon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-foreground mt-4 leading-6 font-semibold">
                {post.title}
              </h3>
              <div className="text-muted-foreground mt-4 flex items-center justify-between gap-2 text-sm">
                <span>{post.author}</span>
                <span>{post.stat}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SponsorsSection() {
  return (
    <section className="py-4 md:py-6">
      <div className="boimix-container-wide bg-card border-border/50 rounded-xl border p-4 shadow-sm md:p-6">
        <SectionHeader title="Sponsors" href="/featured-libraries" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor}
              className="bg-muted text-muted-foreground shadow-soft flex min-h-24 items-center justify-center rounded-lg border p-4 text-center font-semibold"
            >
              {sponsor}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="boimix-section-sm bg-brand-navy text-white">
      <div className="boimix-container grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <div className="text-warning flex items-center gap-2">
            <StarIcon className="fill-warning size-5" aria-hidden="true" />
            <span className="type-badge">BoiMix updates</span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold">Newsletter</h2>
          <p className="mt-2 text-sm leading-6 text-white/75">
            Fresh books, reader picks, and community highlights.
          </p>
        </div>
        <form action="/newsletter" className="flex flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            name="email"
            required
            placeholder="Email address"
            className="h-11 border-white/30 bg-white text-gray-800"
          />
          <Button type="submit" variant="accent" className="h-11">
            Join
          </Button>
        </form>
      </div>
    </section>
  );
}

function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <h2 className="type-subheading text-foreground">{title}</h2>
      <Button asChild variant="ghost" size="sm">
        <Link href={href}>
          See all
          <ArrowRightIcon />
        </Link>
      </Button>
    </div>
  );
}
