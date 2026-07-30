"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BookGalleryImage } from "@/types/book";

type BookGalleryProps = {
  images: BookGalleryImage[];
  className?: string;
};

export function BookGallery({ images, className }: BookGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  if (!selectedImage) {
    return null;
  }

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

    if (isLeftSwipe && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
    if (isRightSwipe && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className={cn("relative space-y-3", className)}>
      {/* Mobile Swipeable Gallery */}
      <div
        className="overflow-hidden sm:hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={`${image.src}-${index}`} className="w-full shrink-0">
              <div className="bg-muted relative h-[380px] overflow-hidden rounded-none border-none">
                <Image
                  src={image.src}
                  alt={image.alt || `Image ${index + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Single Image View */}
      <div className="hidden sm:block">
        <div className="w-full shrink-0">
          <div className="bg-muted relative aspect-[3/4] h-auto overflow-hidden rounded-xl border">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt || `Selected Image`}
              fill
              sizes="(min-width: 992px) 420px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 sm:hidden">
          {images.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-all",
                selectedIndex === index
                  ? "bg-primary w-4"
                  : "bg-primary/30 w-1.5",
              )}
            />
          ))}
        </div>
      )}

      {images.length > 1 && (
        <div className="hidden snap-x [scrollbar-width:none] gap-2 overflow-x-auto pb-2 sm:flex [&::-webkit-scrollbar]:hidden">
          {images.map((image, index) => (
            <Button
              key={image.src}
              type="button"
              variant="ghost"
              className={cn(
                "relative h-[50px] w-[50px] shrink-0 snap-start overflow-hidden rounded-lg border p-0",
                selectedIndex === index && "border-primary ring-ring/30 ring-2",
              )}
              onClick={() => setSelectedIndex(index)}
              aria-label={`Show image ${index + 1}`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="50px"
                className="object-cover"
              />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
