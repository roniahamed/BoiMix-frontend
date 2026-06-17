"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
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
  const [idleHidden, setIdleHidden] = useState(false);
  const [hovered, setHovered] = useState(false);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hovered) return;

    const timer = setTimeout(() => {
      setIdleHidden(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [hovered]);

  const showControls = hovered || !idleHidden;

  return (
    <section className="bg-background py-4 md:py-6">
      <div className="boimix-container-wide grid gap-3 lg:grid-cols-[1fr_254px]">
        <div
          className="shadow-soft relative overflow-hidden rounded-xl"
          onMouseEnter={() => {
            setHovered(true);
            setIdleHidden(false);
          }}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Full-cover background image with transition */}
          <div className="relative h-[190px] sm:h-[300px] md:h-[360px]">
            {slides.map((slide, index) => (
              <div
                key={slide.title}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-in-out",
                  activeIndex === index ? "opacity-100" : "opacity-0",
                )}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
                />
                {/* Dark gradient overlay for text readability */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r",
                    slide.overlayFrom,
                    slide.overlayTo,
                  )}
                />
              </div>
            ))}

            {/* Text content on top */}
            <div className="relative z-10 flex h-full max-w-lg flex-col justify-center p-5 text-white sm:p-7 md:p-10">
              <span className="mb-2 w-fit rounded-full bg-white/20 px-3 py-0.5 text-[0.65rem] font-semibold tracking-wide text-white/90 backdrop-blur-sm sm:text-xs">
                {activeSlide.tag}
              </span>
              <h1 className="text-xl leading-tight font-bold drop-shadow sm:text-3xl md:text-4xl">
                {activeSlide.title}
              </h1>
              <p className="mt-2 max-w-md text-xs leading-5 text-white/85 drop-shadow sm:mt-3 sm:text-sm sm:leading-6">
                {activeSlide.subtitle}
              </p>
              <Button
                asChild
                className="mt-4 w-fit cursor-pointer transition-all hover:scale-105 active:scale-95"
                size="sm"
              >
                <Link href={activeSlide.href}>{activeSlide.cta}</Link>
              </Button>
            </div>
          </div>

          {/* Left arrow */}
          <Button
            type="button"
            variant="ghost"
            className={cn(
              "absolute top-1/2 left-2 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-transparent p-0 text-white transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:text-white active:scale-95 md:inline-flex",
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

          {/* Right arrow */}
          <Button
            type="button"
            variant="ghost"
            className={cn(
              "absolute top-1/2 right-2 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-transparent p-0 text-white transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:text-white active:scale-95 md:inline-flex",
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

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={cn(
                  "cursor-pointer rounded-full border border-white/70 transition-all hover:scale-110",
                  activeIndex === index
                    ? "h-2 w-5 bg-white"
                    : "size-2 bg-white/30",
                )}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <aside className="bg-card shadow-soft hidden rounded-xl border p-4 lg:block">
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
