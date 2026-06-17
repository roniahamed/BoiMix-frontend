"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const slides = [
  {
    title: "Borrow from Central Library",
    subtitle: "Verified BoiMix books ready for readers across Bangladesh.",
    image: "/brand/boimix-cover.png",
    href: "/explore/central-library",
    cta: "Borrow Books",
    accent: "bg-primary",
  },
  {
    title: "Buy and Sell Reader Books",
    subtitle: "Find affordable books from local readers and trusted shelves.",
    image: "/book-covers/market-lanes.svg",
    href: "/explore/store",
    cta: "Browse Store",
    accent: "bg-warning",
  },
  {
    title: "Swap Stories Nearby",
    subtitle: "Exchange books peer to peer with simple swap requests.",
    image: "/book-covers/swap-stories.svg",
    href: "/explore/swaps",
    cta: "Start Swapping",
    accent: "bg-success",
  },
];

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-100 py-5">
      <div className="boimix-container-wide grid gap-3 lg:grid-cols-[1fr_254px]">
        <div className="bg-card shadow-soft relative overflow-hidden rounded-md border">
          <div className="relative h-[236px] md:h-[292px]">
            <Image
              src={activeSlide.image}
              alt=""
              fill
              priority
              sizes="(min-width: 1200px) 1040px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/45" />
            <div
              className={`absolute inset-y-0 left-0 w-1.5 ${activeSlide.accent}`}
            />
            <div className="relative flex h-full max-w-xl flex-col justify-center p-6 text-white md:p-8">
              <p className="type-badge text-warning mb-3">BoiMix Highlights</p>
              <h1 className="text-3xl leading-tight font-bold md:text-4xl">
                {activeSlide.title}
              </h1>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/85 md:text-base">
                {activeSlide.subtitle}
              </p>
              <form
                action="/books/search"
                role="search"
                className="mt-5 flex max-w-md gap-2"
              >
                <div className="relative min-w-0 flex-1">
                  <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input
                    name="q"
                    type="search"
                    placeholder="Search books..."
                    className="h-10 border-white/50 bg-white pl-9 text-gray-800"
                  />
                </div>
                <Button type="submit" size="sm">
                  Search
                </Button>
              </form>
              <Button asChild className="mt-4 w-fit" size="sm">
                <Link href={activeSlide.href}>{activeSlide.cta}</Link>
              </Button>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-2 hidden -translate-y-1/2 bg-white/80 text-gray-800 hover:bg-white md:inline-flex"
            onClick={() =>
              setActiveIndex(
                (current) => (current - 1 + slides.length) % slides.length,
              )
            }
            aria-label="Previous slide"
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-2 hidden -translate-y-1/2 bg-white/80 text-gray-800 hover:bg-white md:inline-flex"
            onClick={() =>
              setActiveIndex((current) => (current + 1) % slides.length)
            }
            aria-label="Next slide"
          >
            <ChevronRightIcon />
          </Button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={cn(
                  "size-2 rounded-full border border-white/70",
                  activeIndex === index ? "bg-white" : "bg-white/30",
                )}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <aside className="bg-card shadow-soft hidden rounded-md border p-4 lg:block">
          <div className="bg-info-soft rounded-md p-4 text-center">
            <p className="text-info text-sm font-semibold">Today on BoiMix</p>
            <p className="text-foreground mt-2 text-2xl font-bold">3 ways</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Borrow, buy, or swap from one reader-friendly shelf.
            </p>
          </div>
          <div className="mt-4 grid gap-2 text-sm">
            {["Central Library", "Marketplace", "Peer Swap"].map((item) => (
              <div
                key={item}
                className="bg-background text-foreground rounded-md border px-3 py-2 font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
