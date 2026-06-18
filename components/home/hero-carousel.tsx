"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  UsersIcon,
  BookOpenIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    tag: "Mega Book Festival",
    title: "মেগা বই উৎসব",
    subtitle: "নির্বাচিত বইগুলোতে ৫০% পর্যন্ত ছাড়! সীমিত সময়ের অফার।",
    image: "/banners/book-festival.png",
    href: "/explore/festival",
    cta: "এখনই দেখুন",
    overlayFrom: "from-amber-950/75",
    overlayTo: "to-orange-900/40",
  },
  {
    tag: "Library Membership",
    title: "Central Library সদস্যপদ",
    subtitle:
      "BoiMix Central Library-তে যোগ দিন। হাজারো বই বিনামূল্যে ধার করুন।",
    image: "/banners/library-membership.png",
    href: "/explore/central-library",
    cta: "Borrow Books",
    overlayFrom: "from-sky-950/80",
    overlayTo: "to-teal-900/40",
  },
  {
    tag: "Book Swap Community",
    title: "পড়া শেষ? এখন Swap করুন!",
    subtitle: "আপনার পাড়া বা ক্যাম্পাসের মানুষদের সাথে বই বিনিময় করুন সহজেই।",
    image: "/banners/swap-community.png",
    href: "/explore/swaps",
    cta: "Start Swapping",
    overlayFrom: "from-violet-950/80",
    overlayTo: "to-purple-800/40",
  },
];

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  // Separate state for displayed text — updates with a delay so text fades
  // out before swapping content, eliminating the "bleed-through" flicker.
  const [textIndex, setTextIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  const [idleHidden, setIdleHidden] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setActiveIndex((current) => (current + 1) % slides.length);
    }
    if (isRightSwipe) {
      setActiveIndex(
        (current) => (current - 1 + slides.length) % slides.length,
      );
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Auto-advance
  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, []);

  // When activeIndex changes: fade out text → swap content → fade in.
  // Using only the setTimeout branch avoids calling setState synchronously
  // inside the effect body (which triggers the react-hooks/set-state-in-effect lint rule).
  useEffect(() => {
    // Step 1 – hide text via a near-instant timeout (avoids inline setState in effect)
    const hide = setTimeout(() => setTextVisible(false), 0);
    // Step 2 – swap content + show after 280 ms so the fade-out completes first
    const show = setTimeout(() => {
      setTextIndex(activeIndex);
      setTextVisible(true);
    }, 280);
    return () => {
      clearTimeout(hide);
      clearTimeout(show);
    };
  }, [activeIndex]);

  // Idle-hide arrows
  useEffect(() => {
    if (hovered) return;
    const timer = setTimeout(() => setIdleHidden(true), 2000);
    return () => clearTimeout(timer);
  }, [hovered]);

  const showControls = hovered || !idleHidden;
  const slide = slides[textIndex];

  return (
    <section className="bg-background py-4 md:py-6">
      <div className="boimix-container-wide grid gap-3 lg:grid-cols-[1fr_254px]">
        {/* Carousel wrapper — Left Column */}
        <div
          className="shadow-soft relative overflow-hidden rounded-2xl select-none"
          onMouseEnter={() => {
            setHovered(true);
            setIdleHidden(false);
          }}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* ── Images layer (z-0) ── */}
          <div className="relative h-[190px] sm:h-[300px] md:h-[360px]">
            {slides.map((s, index) => (
              <div
                key={s.image}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-in-out",
                  activeIndex === index ? "opacity-100" : "opacity-0",
                )}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 75vw"
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r",
                    s.overlayFrom,
                    s.overlayTo,
                  )}
                />
              </div>
            ))}

            {/* ── Text layer (z-10) — fades independently ── */}
            <div
              className={cn(
                "absolute inset-0 z-10 flex flex-col justify-center p-5 text-white transition-opacity duration-250 ease-in-out sm:p-7 md:p-10",
                textVisible ? "opacity-100" : "opacity-0",
              )}
              style={{ willChange: "opacity", transform: "translateZ(0)" }}
            >
              <span className="mb-2 w-fit rounded-full bg-white/20 px-3 py-0.5 text-[0.65rem] font-semibold tracking-wide text-white/90 backdrop-blur-sm sm:text-xs">
                {slide.tag}
              </span>
              <h2
                className="max-w-lg text-xl leading-tight font-bold sm:text-3xl md:text-4xl"
                style={{
                  textShadow: "0 2px 8px rgba(0,0,0,0.45)",
                  transform: "translateZ(0)",
                }}
              >
                {slide.title}
              </h2>
              <p className="mt-2 max-w-md text-xs leading-5 text-white/85 drop-shadow sm:mt-3 sm:text-sm sm:leading-6">
                {slide.subtitle}
              </p>
              <Button
                asChild
                className="mt-4 w-fit cursor-pointer transition-all hover:scale-105 active:scale-95"
                size="sm"
              >
                <Link href={slide.href}>{slide.cta}</Link>
              </Button>
            </div>

            {/* ── Arrow buttons (z-20) ── */}
            <Button
              type="button"
              variant="ghost"
              className={cn(
                "absolute top-[40%] left-4 z-20 hidden h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/25 p-0 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/25 active:scale-95 md:inline-flex lg:top-1/2",
                showControls
                  ? "pointer-events-auto scale-100 opacity-100"
                  : "pointer-events-none scale-90 opacity-0",
              )}
              onClick={() =>
                setActiveIndex(
                  (current) => (current - 1 + slides.length) % slides.length,
                )
              }
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="size-8" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              className={cn(
                "absolute top-[40%] right-4 z-20 hidden h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/25 p-0 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/25 active:scale-95 md:inline-flex lg:top-1/2",
                showControls
                  ? "pointer-events-auto scale-100 opacity-100"
                  : "pointer-events-none scale-90 opacity-0",
              )}
              onClick={() =>
                setActiveIndex((current) => (current + 1) % slides.length)
              }
              aria-label="Next slide"
            >
              <ChevronRightIcon className="size-8" />
            </Button>

            {/* ── Dot indicators (z-20) ── */}
            <div className="absolute top-4 right-6 z-20 hidden gap-2 lg:flex">
              {slides.map((s, index) => (
                <button
                  key={s.image}
                  type="button"
                  className={cn(
                    "cursor-pointer rounded-full border border-white/70 transition-all hover:scale-110",
                    activeIndex === index
                      ? "h-2.5 w-8 bg-white"
                      : "size-2.5 bg-white/30 backdrop-blur-sm",
                  )}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ── Mobile dot indicators (z-20, visible only below lg) ── */}
          <div className="absolute right-0 bottom-3 left-0 z-20 flex items-center justify-center gap-2 lg:hidden">
            {slides.map((s, index) => (
              <button
                key={s.image}
                type="button"
                className={cn(
                  "cursor-pointer rounded-full border border-white/70 transition-all",
                  activeIndex === index
                    ? "h-2 w-6 bg-white"
                    : "size-2 bg-white/40 backdrop-blur-sm",
                )}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <aside className="hidden h-[190px] flex-col gap-2 sm:h-[300px] md:h-[360px] lg:flex">
          <Link
            href="/explore/central-library"
            className="group border-primary/30 bg-primary/20 hover:border-primary/50 hover:bg-primary/30 dark:border-primary/40 dark:bg-primary/30 dark:hover:bg-primary/40 relative flex flex-1 flex-col justify-center rounded-xl border p-4 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="bg-background/90 text-primary ring-primary/20 mb-1 w-fit rounded-lg p-2 shadow-sm ring-1 backdrop-blur-md transition-transform group-hover:scale-105">
              <BookOpenIcon className="size-4" />
            </div>
            <h3 className="text-foreground text-xs font-bold xl:text-sm">
              Central Library
            </h3>
            <p className="text-muted-foreground text-[10px] leading-snug font-medium xl:text-xs">
              Borrow from 10k+ books for free
            </p>
          </Link>

          <Link
            href="/community"
            className="group border-primary/30 bg-primary/20 hover:border-primary/50 hover:bg-primary/30 dark:border-primary/40 dark:bg-primary/30 dark:hover:bg-primary/40 relative flex flex-1 flex-col justify-center rounded-xl border p-4 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="bg-background/90 text-primary ring-primary/20 mb-1 w-fit rounded-lg p-2 shadow-sm ring-1 backdrop-blur-md transition-transform group-hover:scale-105">
              <UsersIcon className="size-4" />
            </div>
            <h3 className="text-foreground text-xs font-bold xl:text-sm">
              Community
            </h3>
            <p className="text-muted-foreground text-[10px] leading-snug font-medium xl:text-xs">
              Connect with fellow readers
            </p>
          </Link>

          <Link
            href="/explore/offers"
            className="group border-primary/30 bg-primary/20 hover:border-primary/50 hover:bg-primary/30 dark:border-primary/40 dark:bg-primary/30 dark:hover:bg-primary/40 relative flex flex-1 flex-col justify-center rounded-xl border p-4 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="bg-background/90 text-primary ring-primary/20 mb-1 w-fit rounded-lg p-2 shadow-sm ring-1 backdrop-blur-md transition-transform group-hover:scale-105">
              <ShoppingCartIcon className="size-4" />
            </div>
            <h3 className="text-foreground text-xs font-bold xl:text-sm">
              Marketplace
            </h3>
            <p className="text-muted-foreground text-[10px] leading-snug font-medium xl:text-xs">
              Buy books at huge discounts
            </p>
          </Link>
        </aside>
      </div>
    </section>
  );
}
