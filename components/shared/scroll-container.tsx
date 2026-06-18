"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ScrollContainerProps = {
  children: ReactNode;
  className?: string;
  autoScroll?: boolean;
};

export function ScrollContainer({
  children,
  className,
  autoScroll = false,
}: ScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const checkScrollLimits = () => {
    const el = containerRef.current;
    if (!el) return;

    // Check if we can scroll left (scrollLeft > 5px)
    setShowLeft(el.scrollLeft > 5);

    // Check if we can scroll right (scrollLeft < maxScroll - 5px)
    const maxScroll = el.scrollWidth - el.clientWidth;
    setShowRight(el.scrollLeft < maxScroll - 5);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Run check initially
    checkScrollLimits();

    el.addEventListener("scroll", checkScrollLimits);
    window.addEventListener("resize", checkScrollLimits);

    // Re-check after images/content might have loaded
    const timer = setTimeout(checkScrollLimits, 500);

    return () => {
      el.removeEventListener("scroll", checkScrollLimits);
      window.removeEventListener("resize", checkScrollLimits);
      clearTimeout(timer);
    };
  }, [children]);

  // Auto-scroll logic
  useEffect(() => {
    if (!autoScroll || isHovered) return;

    const interval = setInterval(() => {
      const el = containerRef.current;
      if (!el) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 5) {
        // Reached the end, scroll back to start smoothly
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Scroll right slightly
        el.scrollBy({ left: el.clientWidth * 0.5, behavior: "smooth" });
      }
    }, 4000); // Auto scroll every 4 seconds

    return () => clearInterval(interval);
  }, [autoScroll, isHovered]);

  const scroll = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;

    // Scroll by 75% of visible width
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="group/scroll relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <Button
        type="button"
        variant="secondary"
        size="icon"
        className={cn(
          "border-border bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary absolute top-1/2 -left-3 z-20 hidden h-10 w-10 -translate-y-1/2 cursor-pointer rounded-full border shadow-lg transition-all duration-300 hover:scale-110 focus-visible:ring-2 active:scale-95 md:-left-6 md:inline-flex md:h-12 md:w-12",
          showLeft
            ? "translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-4 opacity-0",
        )}
        onClick={() => scroll("left")}
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      <div
        ref={containerRef}
        className={cn(
          "-mx-4 flex scrollbar-none gap-3 overflow-x-auto scroll-smooth px-4 py-1 pb-3 md:gap-4",
          className,
        )}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
        }}
      >
        {children}
      </div>

      <Button
        type="button"
        variant="secondary"
        size="icon"
        className={cn(
          "border-border bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary absolute top-1/2 -right-3 z-20 hidden h-10 w-10 -translate-y-1/2 cursor-pointer rounded-full border shadow-lg transition-all duration-300 hover:scale-110 focus-visible:ring-2 active:scale-95 md:-right-6 md:inline-flex md:h-12 md:w-12",
          showRight
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-4 opacity-0",
        )}
        onClick={() => scroll("right")}
        aria-label="Scroll right"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </Button>
    </div>
  );
}
