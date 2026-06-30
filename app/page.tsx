import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  BookMarkedIcon,
  BookOpenIcon,
  Building2Icon,
  GraduationCapIcon,
  LibraryIcon,
  MessageCircleIcon,
  Repeat2Icon,
  ShoppingCartIcon,
  SparklesIcon,
  StarIcon,
  UserIcon,
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
    coverUrl: "https://covers.openlibrary.org/b/id/10521270-L.jpg",
    tags: ["sell"],
    rating: 4.8,
    reviewCount: 42,
    price: 420,
    originalPrice: 550,
    distance: "1.2 km",
    location: "Dhanmondi",
    condition: "excellent",
    availability: "in-stock",
    providerType: "library",
  },
  {
    id: "borrowed-light",
    slug: "borrowed-light",
    title: "Borrowed Light",
    author: "Arif Hossain",
    coverUrl: "https://covers.openlibrary.org/b/id/12534524-L.jpg",
    tags: ["borrow"],
    rating: 4.6,
    reviewCount: 31,
    distance: "0.8 km",
    location: "Mirpur",
    condition: "good",
    availability: "in-stock",
    isWishlisted: true,
    providerType: "library",
  },
  {
    id: "swap-stories",
    slug: "swap-stories",
    title: "Swap Stories",
    author: "Maliha Karim",
    coverUrl: "https://covers.openlibrary.org/b/id/8259443-L.jpg",
    tags: ["swap"],
    rating: 4.7,
    reviewCount: 28,
    price: 360,
    originalPrice: 450,
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
    coverUrl: "https://covers.openlibrary.org/b/id/12836261-L.jpg",
    tags: ["swap"],
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
    coverUrl: "https://covers.openlibrary.org/b/id/10425026-L.jpg",
    tags: ["sell"],
    rating: 4.4,
    reviewCount: 16,
    price: 280,
    originalPrice: 350,
    location: "Bashundhara",
    condition: "good",
    availability: "in-stock",
  },
  {
    id: "quiet-reviews",
    slug: "quiet-reviews",
    title: "Quiet Reviews",
    author: "Raisa Chowdhury",
    coverUrl: "https://covers.openlibrary.org/b/id/10521271-L.jpg",
    tags: ["borrow"],
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
    coverUrl: "https://covers.openlibrary.org/b/id/12534525-L.jpg",
    tags: ["sell"],
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
    coverUrl: "https://covers.openlibrary.org/b/id/8259444-L.jpg",
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
    coverUrl: "https://covers.openlibrary.org/b/id/12836262-L.jpg",
    tags: ["sell"],
    rating: 4.8,
    reviewCount: 85,
    price: 250,
    originalPrice: 320,
    location: "Chittagong",
    condition: "new",
    availability: "in-stock",
  },
  {
    id: "struggles-of-life",
    slug: "struggles-of-life",
    title: "Struggles of Life",
    author: "Kazi Nazrul Islam",
    coverUrl: "https://covers.openlibrary.org/b/id/10425027-L.jpg",
    tags: ["swap"],
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
    coverUrl: "https://covers.openlibrary.org/b/id/10521270-L.jpg",
    tags: ["borrow"],
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
    coverUrl: "https://covers.openlibrary.org/b/id/12534524-L.jpg",
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
    coverUrl: "https://covers.openlibrary.org/b/id/8259443-L.jpg",
    tags: ["sell"],
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
    coverUrl: "https://covers.openlibrary.org/b/id/12836261-L.jpg",
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
    coverUrl: "https://covers.openlibrary.org/b/id/10425026-L.jpg",
    tags: ["sell"],
    rating: 4.7,
    reviewCount: 110,
    price: 320,
    originalPrice: 400,
    providerType: "user",
    isVerifiedUser: true,
    location: "Banani",
    condition: "new",
    availability: "in-stock",
  },
  {
    id: "history-of-bengal",
    slug: "history-of-bengal",
    title: "History of Bengal",
    author: "Akbar Ali Khan",
    coverUrl: "https://covers.openlibrary.org/b/id/10521271-L.jpg",
    tags: ["swap"],
    rating: 4.9,
    reviewCount: 65,
    price: 480,
    originalPrice: 600,
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
    coverUrl: "https://covers.openlibrary.org/b/id/12534525-L.jpg",
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
    coverUrl: "https://covers.openlibrary.org/b/id/8259444-L.jpg",
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
    coverUrl: "https://covers.openlibrary.org/b/id/12836262-L.jpg",
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
    coverUrl: "https://covers.openlibrary.org/b/id/10425027-L.jpg",
    tags: ["sell"],
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
    coverUrl: "https://covers.openlibrary.org/b/id/10521270-L.jpg",
    tags: ["swap"],
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
    coverUrl: "https://covers.openlibrary.org/b/id/12534524-L.jpg",
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
    coverUrl: "https://covers.openlibrary.org/b/id/8259443-L.jpg",
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
    coverUrl: "https://covers.openlibrary.org/b/id/12836261-L.jpg",
    tags: ["swap"],
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
    coverUrl: "https://covers.openlibrary.org/b/id/10425026-L.jpg",
    tags: ["sell"],
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
    coverUrl: "https://covers.openlibrary.org/b/id/10521271-L.jpg",
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
    coverUrl: "https://covers.openlibrary.org/b/id/12534525-L.jpg",
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
    coverUrl: "https://covers.openlibrary.org/b/id/8259444-L.jpg",
    tags: ["swap"],
    rating: 4.9,
    reviewCount: 156,
    price: 650,
    originalPrice: 800,
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
    coverUrl: "https://covers.openlibrary.org/b/id/12836262-L.jpg",
    tags: ["sell"],
    rating: 4.9,
    reviewCount: 203,
    price: 750,
    originalPrice: 950,
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
    coverUrl: "https://covers.openlibrary.org/b/id/10425027-L.jpg",
    tags: ["borrow"],
    rating: 4.8,
    reviewCount: 119,
    distance: "2.3 km",
    location: "Narayanganj",
    condition: "good",
    availability: "in-stock",
  },
];

const newBooks: BookCardBook[] = [...featuredBooks].reverse();
const nearbyBooks: BookCardBook[] = [...featuredBooks].slice(2, 14);
const forYouBooks: BookCardBook[] = [...featuredBooks].slice(5, 17);

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
      <PersonalizationSection />
      <CategorySection />
      <BookSection
        title="Trending Books"
        href="/books/trending"
        books={featuredBooks}
      />
      <AuthorSpotlightSection />
      <BookSection title="New Books" href="/books/new" books={newBooks} />
      <BookSection
        title="Nearby You"
        href="/books/near-me"
        books={nearbyBooks}
      />
      <BookSection
        title="Only For You"
        href="/books/for-you"
        books={forYouBooks}
      />
      <CentralLibrarySection />
      <MarketplaceSection />
      <SwapBooksSection />
      <CommunityReaderSection />
      <CommunitySection />
      <TestimonialsSection />
      <SponsorsSection />
      <NewsletterSection />
    </MainLayout>
  );
}

function CategorySection() {
  return (
    <section className="py-2 md:py-3">
      <div className="boimix-container-wide bg-card border-border/50 rounded-lg border p-4 shadow-none md:p-6">
        <SectionHeader title="Categories" href="/books" />
        <ScrollContainer autoScroll arrowClassName="top-[35px]">
          {categories.map((category) => {
            return (
              <Link
                key={category.href}
                href={category.href}
                className="group flex w-[76px] shrink-0 flex-col items-center gap-1.5 text-center sm:w-[90px] md:w-[100px]"
              >
                <div className="group-hover:border-primary border-border bg-card relative h-[70px] w-[70px] shrink-0 overflow-hidden rounded-[10px] border transition-all duration-300 group-hover:shadow-none">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="70px"
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
    <section className="py-2 md:py-3">
      <div className="boimix-container-wide md:bg-card md:border-border/50 md:rounded-lg md:border md:p-6 md:shadow-none">
        <SectionHeader title={title} href={href} />
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:hidden">
          {books.slice(0, 10).map((book) => (
            <BookCard
              key={`mobile-${title}-${book.id}`}
              book={book}
              className="w-full"
            />
          ))}
        </div>
        <div className="hidden md:mt-4 md:block">
          <ScrollContainer>
            {books.map((book) => (
              <BookCard
                key={`desktop-${title}-${book.id}`}
                book={book}
                className="w-[160px] shrink-0 md:w-[180px] lg:w-[200px]"
              />
            ))}
          </ScrollContainer>
        </div>
      </div>
    </section>
  );
}

function CentralLibrarySection() {
  const books = featuredBooks
    .filter((b) => b.providerType === "library" || b.tags.includes("borrow"))
    .slice(0, 12);

  return (
    <section className="py-2 md:py-3">
      <div className="boimix-container-wide md:bg-card md:border-border/50 grid gap-6 md:rounded-lg md:border md:p-6 md:shadow-none lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
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
    <section className="py-2 md:py-3">
      <div className="boimix-container-wide md:bg-card md:border-border/50 grid gap-6 md:rounded-lg md:border md:p-6 md:shadow-none lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="w-full min-w-0">
          <HorizontalBookRow books={books} rowKey="market" />
        </div>
        <FeaturePanel
          title="Marketplace"
          href="/books"
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
    <section className="py-2 md:py-3">
      <div className="boimix-container-wide md:bg-card md:border-border/50 grid gap-6 md:rounded-lg md:border md:p-6 md:shadow-none lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
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
    <>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:hidden">
        {books.slice(0, 10).map((book) => (
          <BookCard
            key={`mobile-${rowKey}-${book.id}`}
            book={book}
            className="w-full"
          />
        ))}
      </div>
      <div className="hidden md:mt-4 md:block">
        <ScrollContainer>
          {books.map((book) => (
            <BookCard
              key={`desktop-${rowKey}-${book.id}`}
              book={book}
              className="w-[160px] shrink-0 md:w-[180px] lg:w-[200px]"
            />
          ))}
        </ScrollContainer>
      </div>
    </>
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

function CommunityReaderSection() {
  const readers = [
    {
      name: "Sadia Noor",
      books: 42,
      swaps: 18,
      reviews: 9,
      badge: "Top Swapper",
    },
    {
      name: "Imran Kabir",
      books: 87,
      swaps: 31,
      reviews: 24,
      badge: "Book Lover",
    },
    {
      name: "Nusrat Jahan",
      books: 55,
      swaps: 12,
      reviews: 16,
      badge: "Reviewer",
    },
    {
      name: "Tanvir Ahmed",
      books: 33,
      swaps: 27,
      reviews: 5,
      badge: "Active Reader",
    },
  ];

  return (
    <section className="py-2 md:py-3">
      <div className="boimix-container-wide">
        <div className="from-primary/10 via-card to-info/5 border-primary/10 overflow-hidden rounded-lg border bg-gradient-to-br p-6 shadow-none md:p-8">
          {/* Header */}
          <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="bg-primary/10 mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1">
                <UsersRoundIcon className="text-primary size-4" />
                <span className="text-primary text-xs font-semibold tracking-wide">
                  Community Readers
                </span>
              </div>
              <h2 className="text-foreground text-2xl font-bold md:text-3xl">
                পড়ার আনন্দ ভাগ করো
              </h2>
              <p className="text-muted-foreground mt-2 max-w-md text-sm leading-6">
                হাজারো পাঠকের সাথে যুক্ত হও। বই ধার করো, পর্যালোচনা করো, বিনিময়
                করো — একটি সক্রিয় পাঠক সম্প্রদায়ে।
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/community">
                সব দেখুন <ArrowRightIcon className="size-4" />
              </Link>
            </Button>
          </div>

          {/* Stats row */}
          <div className="mb-6 grid grid-cols-3 gap-3 sm:grid-cols-3">
            {[
              {
                icon: UsersRoundIcon,
                label: "Active Readers",
                value: "12,400+",
              },
              { icon: BookMarkedIcon, label: "Books Shared", value: "38,200+" },
              {
                icon: MessageCircleIcon,
                label: "Reviews Posted",
                value: "5,800+",
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-card/70 flex flex-col items-center gap-1 rounded-lg p-4 text-center shadow-none backdrop-blur-sm"
              >
                <Icon className="text-primary size-5" aria-hidden="true" />
                <p className="text-foreground text-lg font-bold">{value}</p>
                <p className="text-muted-foreground text-xs">{label}</p>
              </div>
            ))}
          </div>

          {/* Reader cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {readers.map((reader) => (
              <Link
                key={reader.name}
                href={`/community/readers/${reader.name.toLowerCase().replace(" ", "-")}`}
                className="bg-card/80 hover:border-primary group flex flex-col gap-3 rounded-lg border p-4 shadow-none backdrop-blur-sm transition-all hover:shadow-md"
              >
                {/* Avatar placeholder */}
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 flex size-10 items-center justify-center rounded-full">
                    <UserIcon className="text-primary size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-foreground truncate text-sm font-semibold">
                      {reader.name}
                    </p>
                    <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[0.6rem] font-medium">
                      {reader.badge}
                    </span>
                  </div>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-3 gap-1 text-center text-[0.65rem]">
                  <div>
                    <p className="text-foreground font-bold">{reader.books}</p>
                    <p className="text-muted-foreground">Books</p>
                  </div>
                  <div>
                    <p className="text-foreground font-bold">{reader.swaps}</p>
                    <p className="text-muted-foreground">Swaps</p>
                  </div>
                  <div>
                    <p className="text-foreground font-bold">
                      {reader.reviews}
                    </p>
                    <p className="text-muted-foreground">Reviews</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href="/auth/register">
                <UserIcon className="size-4" />
                Join the Community
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/community/leaderboard">
                <StarIcon className="size-4" />
                Leaderboard দেখুন
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className="py-2 md:py-3">
      <div className="boimix-container-wide bg-card border-border/50 rounded-lg border p-4 shadow-none md:p-6">
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
    <section className="py-2 md:py-3">
      <div className="boimix-container-wide bg-card border-border/50 rounded-lg border p-4 shadow-none md:p-6">
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

function PersonalizationSection() {
  const recentlyViewed = featuredBooks.slice(0, 3);
  return (
    <section className="py-2 md:py-3">
      <div className="boimix-container-wide">
        <div className="from-primary/10 via-card to-info/5 border-primary/10 rounded-lg border bg-gradient-to-r p-4 shadow-none md:p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* User Greeting */}
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 border-primary/30 flex size-12 shrink-0 items-center justify-center rounded-full border">
                <UserIcon className="text-primary size-6" />
              </div>
              <div>
                <h2 className="text-foreground text-xl font-bold md:text-2xl">
                  Welcome, রনি আহমেদ!
                </h2>
                <p className="text-muted-foreground text-xs md:text-sm">
                  আজকে নতুন কি বই পড়তে চান?
                </p>
              </div>
            </div>

            {/* Dashboard widgets */}
            <div className="grid flex-1 gap-4 sm:grid-cols-2 md:max-w-xl">
              {/* Recently Viewed */}
              <div className="bg-card/75 border-border rounded-lg border p-3 shadow-xs">
                <p className="text-muted-foreground mb-2 text-[0.7rem] font-bold tracking-wider uppercase">
                  Recently Viewed
                </p>
                <div className="flex gap-2">
                  {recentlyViewed.map((book) => (
                    <Link
                      key={`recent-${book.id}`}
                      href={`/books/${book.slug}`}
                      className="group relative flex-1 text-center"
                    >
                      <div className="bg-muted relative mx-auto aspect-[3/4] w-10 overflow-hidden rounded-xs shadow-xs transition-transform group-hover:scale-105">
                        <Image
                          src={book.coverUrl}
                          alt={book.title}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <p className="text-foreground group-hover:text-primary mt-1 line-clamp-1 text-[0.62rem] font-semibold">
                        {book.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Active Swaps Card */}
              <div className="bg-card/75 border-border flex items-center justify-between rounded-lg border p-3 shadow-xs">
                <div className="min-w-0">
                  <p className="text-muted-foreground text-[0.7rem] font-bold tracking-wider uppercase">
                    Active Swaps
                  </p>
                  <p className="text-foreground mt-1 text-base font-bold">
                    2 Pending Swaps
                  </p>
                  <p className="text-muted-foreground truncate text-[0.65rem]">
                    1 awaiting handover • 1 check details
                  </p>
                </div>
                <Button
                  asChild
                  size="sm"
                  className="h-8 shrink-0 px-2.5 text-xs"
                >
                  <Link href="/dashboard/swaps">View</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AuthorSpotlightSection() {
  // Mock books by Humayun Ahmed
  const humayunBooks: BookCardBook[] = [
    {
      id: "chhaya-bithi",
      slug: "chhaya-bithi",
      title: "Chhaya Bithi",
      author: "Humayun Ahmed",
      coverUrl: "https://covers.openlibrary.org/b/id/10521270-L.jpg",
      tags: ["borrow"],
      rating: 4.9,
      reviewCount: 120,
      distance: "3.5 km",
      location: "Sylhet",
      condition: "excellent",
      availability: "in-stock",
    },
    {
      id: "himu-somogro",
      slug: "himu-somogro",
      title: "Himu Somogro",
      author: "Humayun Ahmed",
      coverUrl: "https://covers.openlibrary.org/b/id/12534524-L.jpg",
      tags: ["sell"],
      rating: 4.8,
      reviewCount: 95,
      price: 350,
      distance: "1.2 km",
      location: "Dhanmondi",
      condition: "good",
      availability: "in-stock",
    },
    {
      id: "misir-ali-unsolved",
      slug: "misir-ali-unsolved",
      title: "Misir Ali Somogro",
      author: "Humayun Ahmed",
      coverUrl: "https://covers.openlibrary.org/b/id/8259443-L.jpg",
      tags: ["borrow"],
      rating: 4.7,
      reviewCount: 82,
      distance: "2.1 km",
      location: "Mirpur",
      condition: "excellent",
      availability: "in-stock",
    },
    {
      id: "deyal-novel",
      slug: "deyal-novel",
      title: "Deyal",
      author: "Humayun Ahmed",
      coverUrl: "https://covers.openlibrary.org/b/id/12836261-L.jpg",
      tags: ["sell"],
      rating: 4.9,
      reviewCount: 154,
      price: 450,
      location: "Uttara",
      condition: "new",
      availability: "in-stock",
    },
  ];

  return (
    <section className="py-2 md:py-3">
      <div className="boimix-container-wide">
        <div className="md:bg-card md:border-border/50 md:rounded-lg md:border md:p-6 md:shadow-none">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="type-subheading text-foreground">
              Author Spotlight
            </h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/authors/humayun-ahmed">
                All Authors <ArrowRightIcon className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
            {/* Left Column: Author Card */}
            <div className="from-primary/10 via-primary/5 to-info/10 border-primary/20 flex flex-col justify-between rounded-lg border bg-gradient-to-br p-5 shadow-xs">
              <div>
                <div className="flex items-center gap-4">
                  {/* Styled avatar placeholder */}
                  <div className="bg-primary/20 border-primary/40 text-primary relative flex size-16 shrink-0 items-center justify-center rounded-full border text-xl font-bold">
                    HA
                  </div>
                  <div>
                    <h3 className="text-foreground text-lg font-bold">
                      হুমায়ূন আহমেদ
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Humayun Ahmed • (1948 - 2012)
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground mt-4 text-xs leading-5">
                  বিংশ শতাব্দীর অন্যতম জনপ্রিয় বাঙালি কথাসাহিত্যিক ও নাট্যকার।
                  তাঁর সৃষ্ট হিমু, মিসির আলি এবং রূপা চরিত্রগুলো বাঙালি পাঠক
                  সমাজে দারুণ জনপ্রিয়। BoiMix এ তাঁর বইগুলো পাঠকদের মাঝে সবচেয়ে
                  বেশি আদান-প্রদান করা হয়।
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 text-center">
                  <div className="bg-card border-border rounded-lg border p-2">
                    <p className="text-foreground text-sm font-bold">150+</p>
                    <p className="text-muted-foreground text-[0.65rem]">
                      Books Listed
                    </p>
                  </div>
                  <div className="bg-card border-border rounded-lg border p-2">
                    <p className="text-foreground text-sm font-bold">4.9 ★</p>
                    <p className="text-muted-foreground text-[0.65rem]">
                      Avg Rating
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <Button size="sm" className="flex-1 text-xs">
                  Follow
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                >
                  <Link href="/authors/humayun-ahmed/books">Explore Books</Link>
                </Button>
              </div>
            </div>

            {/* Right Column: Author Books */}
            <div className="flex min-w-0 flex-col justify-center">
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:hidden">
                {humayunBooks.slice(0, 10).map((book) => (
                  <BookCard
                    key={`mobile-spotlight-${book.id}`}
                    book={book}
                    className="w-full"
                  />
                ))}
              </div>
              <div className="hidden md:mt-4 md:block">
                <ScrollContainer>
                  {humayunBooks.map((book) => (
                    <BookCard
                      key={`desktop-spotlight-${book.id}`}
                      book={book}
                      className="w-[160px] shrink-0 md:w-[180px] lg:w-[200px]"
                    />
                  ))}
                </ScrollContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "তানভীর আহমেদ",
      role: "Verified Swapper",
      location: "Dhanmondi, Dhaka",
      quote:
        "আমি ধানমন্ডিতে আমার ভার্সিটির পুরোনো টেক্সটবইগুলো ৩টি নতুন গল্পের বইয়ের সাথে বদলেছি! প্রক্রিয়াটি খুবই সহজ এবং ঝামেলাহীন ছিল।",
      rating: 5,
    },
    {
      name: "সুমাইয়া রহমান",
      role: "Library Borrower",
      location: "Mirpur, Dhaka",
      quote:
        "BoiMix-এর ভেরিফাইড সেন্ট্রাল লাইব্রেরির বইগুলো দারুণ কাজের। ডেলিভারি খুবই দ্রুত ছিল এবং বইয়ের কন্ডিশনও ছিল চমৎকার।",
      rating: 5,
    },
    {
      name: "ইমরান কবীর",
      role: "Store Buyer",
      location: "Uttara, Dhaka",
      quote:
        "দোকানের চেয়ে অনেক কম দামে এখান থেকে আমি বই কিনতে পারছি। সেই সাথে পুরোনো বইগুলো বিক্রি করে নতুন বই কেনার টাকাও উঠে যাচ্ছে।",
      rating: 5,
    },
  ];

  return (
    <section className="py-2 md:py-3">
      <div className="boimix-container-wide bg-card border-border/50 rounded-lg border p-4 shadow-none md:p-6">
        <div className="mb-6 text-center">
          <h2 className="text-foreground text-2xl font-bold md:text-3xl">
            পাঠকদের মতামত
          </h2>
          <p className="text-muted-foreground mt-1.5 text-xs md:text-sm">
            BoiMix ব্যবহার করে আমাদের হাজারো পাঠক যেভাবে উপকৃত হচ্ছেন
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={`${t.name}-${idx}`}
              className="bg-card shadow-soft hover:border-primary/30 flex flex-col justify-between rounded-lg border p-5 transition-all hover:-translate-y-0.5"
            >
              <div>
                {/* Rating stars */}
                <div className="text-warning mb-3.5 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <StarIcon key={i} className="fill-warning size-3.5" />
                  ))}
                </div>
                {/* Review Text */}
                <blockquote className="text-foreground text-xs leading-5 font-medium">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              {/* User Meta */}
              <div className="mt-5 flex items-center gap-3">
                <div className="bg-primary/10 flex size-9 shrink-0 items-center justify-center rounded-full">
                  <UserIcon className="text-primary size-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-foreground truncate text-xs font-bold">
                    {t.name}
                  </p>
                  <p className="text-muted-foreground truncate text-[0.65rem]">
                    {t.role} • {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
