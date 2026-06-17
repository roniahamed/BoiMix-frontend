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
  SearchIcon,
  ShoppingCartIcon,
  SparklesIcon,
  StarIcon,
  UsersRoundIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { MainLayout } from "@/components/layout/main-layout";
import { BadgePill } from "@/components/shared/badge-pill";
import { BookCard } from "@/components/shared/book-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { BookCardBook } from "@/types/book";

const categories = [
  { title: "Fiction", href: "/books/category/fiction", icon: BookOpenIcon },
  {
    title: "Academic",
    href: "/books/category/academic",
    icon: GraduationCapIcon,
  },
  { title: "Self Help", href: "/books/category/self-help", icon: SparklesIcon },
  { title: "Business", href: "/books/category/business", icon: Building2Icon },
  { title: "Community", href: "/community", icon: UsersRoundIcon },
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
];

const newBooks: BookCardBook[] = [
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
  featuredBooks[0],
  featuredBooks[2],
];

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
      <HeroSection />
      <CategorySection />
      <BookSection
        title="Trending Books"
        href="/books/trending"
        books={featuredBooks}
      />
      <BookSection title="New Books" href="/books/new" books={newBooks} muted />
      <CentralLibrarySection />
      <MarketplaceSection />
      <SwapBooksSection />
      <CommunitySection />
      <SponsorsSection />
      <NewsletterSection />
    </MainLayout>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[72svh] overflow-hidden">
      <Image
        src="/brand/boimix-cover.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gray-900/45" />
      <div className="from-background absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t to-transparent" />
      <div className="boimix-container-wide relative flex min-h-[72svh] items-center py-16">
        <div className="max-w-2xl text-white">
          <BadgePill
            tone="warning"
            className="bg-warning text-warning-foreground mb-4"
          >
            One platform. Endless stories.
          </BadgePill>
          <h1 className="type-heading">BoiMix</h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-white/90">
            Read, share, swap, and grow with books from nearby readers and the
            central BoiMix library.
          </p>
          <form
            action="/books/search"
            role="search"
            className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                name="q"
                type="search"
                placeholder="Search books, authors, ISBN..."
                className="shadow-card h-12 border-white/40 bg-white pl-9 text-gray-800"
              />
            </div>
            <Button type="submit" size="lg">
              Search
            </Button>
          </form>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="primary">
              <Link href="/explore/central-library">
                <LibraryIcon />
                Borrow Books
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white">
              <Link href="/explore/store">
                <ShoppingCartIcon />
                Buy Books
              </Link>
            </Button>
            <Button asChild size="lg" variant="success">
              <Link href="/explore/swaps">
                <Repeat2Icon />
                Swap Books
              </Link>
            </Button>
          </div>
          <dl className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-left">
            {[
              ["12k+", "Books"],
              ["4.8", "Avg rating"],
              ["64", "Areas"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-lg border border-white/20 bg-white/12 p-3 backdrop-blur"
              >
                <dt className="text-xs text-white/70">{label}</dt>
                <dd className="mt-1 text-xl font-bold text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function CategorySection() {
  return (
    <section className="boimix-section-sm">
      <div className="boimix-container-wide">
        <SectionHeader title="Categories" href="/books" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.href}
                href={category.href}
                className="bg-card shadow-soft hover:shadow-card flex items-center gap-3 rounded-lg border p-4 transition-all hover:-translate-y-0.5"
              >
                <span className="bg-info-soft text-info inline-flex size-10 items-center justify-center rounded-lg">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-foreground font-semibold">
                  {category.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BookSection({
  title,
  href,
  books,
  muted = false,
}: {
  title: string;
  href: string;
  books: BookCardBook[];
  muted?: boolean;
}) {
  return (
    <section
      className={muted ? "boimix-section-sm bg-muted/45" : "boimix-section-sm"}
    >
      <div className="boimix-container-wide">
        <SectionHeader title={title} href={href} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard key={`${title}-${book.id}`} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CentralLibrarySection() {
  return (
    <section className="boimix-section">
      <div className="boimix-container-wide grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
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
        <div className="grid gap-4 sm:grid-cols-3">
          {featuredBooks.slice(0, 3).map((book) => (
            <BookCard key={`library-${book.id}`} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MarketplaceSection() {
  return (
    <section className="boimix-section bg-muted/45">
      <div className="boimix-container-wide grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="grid gap-4 sm:grid-cols-3">
          {[newBooks[0], featuredBooks[0], featuredBooks[2]].map((book) => (
            <BookCard key={`market-${book.id}`} book={book} />
          ))}
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
  return (
    <section className="boimix-section">
      <div className="boimix-container-wide grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
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
        <div className="grid gap-4 sm:grid-cols-3">
          {[featuredBooks[2], featuredBooks[3], newBooks[1]].map((book) => (
            <BookCard key={`swap-${book.id}`} book={book} />
          ))}
        </div>
      </div>
    </section>
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
    <div className="bg-card shadow-soft rounded-lg border p-6">
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
    <section className="boimix-section-sm bg-muted/45">
      <div className="boimix-container-wide">
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
    <section className="boimix-section-sm">
      <div className="boimix-container-wide">
        <SectionHeader title="Sponsors" href="/featured-libraries" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor}
              className="bg-card text-muted-foreground shadow-soft flex min-h-24 items-center justify-center rounded-lg border p-4 text-center font-semibold"
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
