"use client";

import { ImagePlusIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type ImageUploadProps = {
  label?: string;
  file?: File | null;
  previewUrl?: string;
  className?: string;
  onChange?: (file: File | null) => void;
};

export function ImageUpload({
  label = "Upload image",
  file,
  previewUrl,
  className,
  onChange,
}: ImageUploadProps) {
  const inputId = useId();
  const objectUrl = useMemo(() => {
    if (!file) {
      return undefined;
    }

    return URL.createObjectURL(file);
  }, [file]);
  const imageUrl = objectUrl ?? previewUrl;

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={inputId}>{label}</Label>
      <div className="bg-muted/40 relative flex min-h-40 items-center justify-center overflow-hidden rounded-lg border border-dashed">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt=""
              fill
              sizes="320px"
              className="object-cover"
            />
            <Button
              type="button"
              variant="danger"
              size="icon-sm"
              className="absolute top-2 right-2"
              onClick={() => onChange?.(null)}
              aria-label="Remove image"
            >
              <XIcon />
            </Button>
          </>
        ) : (
          <Label
            htmlFor={inputId}
            className="text-muted-foreground flex cursor-pointer flex-col items-center gap-2 p-6 text-center text-sm"
          >
            <ImagePlusIcon className="text-primary size-8" />
            Choose an image
          </Label>
        )}
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => onChange?.(event.target.files?.[0] ?? null)}
        />
      </div>
    </div>
  );
}
