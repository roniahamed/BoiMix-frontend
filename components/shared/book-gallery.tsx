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

  if (!selectedImage) {
    return null;
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex w-full snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto sm:block sm:overflow-visible [&::-webkit-scrollbar]:hidden">
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={cn(
              "w-full shrink-0 snap-center",
              index === selectedIndex ? "block" : "block sm:hidden",
            )}
          >
            <div className="bg-muted relative aspect-[3/4] overflow-hidden rounded-xl border">
              <Image
                src={image.src}
                alt={image.alt || `Image ${index + 1}`}
                fill
                sizes="(min-width: 992px) 420px, 100vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>
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
