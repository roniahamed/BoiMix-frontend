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
      <div className="bg-muted relative aspect-[3/4] overflow-hidden rounded-xl border">
        <Image
          src={selectedImage.src}
          alt={selectedImage.alt}
          fill
          sizes="(min-width: 992px) 420px, 100vw"
          className="object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <Button
              key={image.src}
              type="button"
              variant="ghost"
              className={cn(
                "relative aspect-[3/4] h-auto overflow-hidden rounded-lg border p-0",
                selectedIndex === index && "border-primary ring-ring/30 ring-2",
              )}
              onClick={() => setSelectedIndex(index)}
              aria-label={`Show image ${index + 1}`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
