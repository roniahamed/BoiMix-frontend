"use client";

import { ImagePlusIcon, RefreshCcw, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ImageUploadProps = {
  title?: string;
  required?: boolean;
  file?: File | null;
  previewUrl?: string;
  className?: string;
  onChange?: (file: File | null) => void;
};

export function ImageUpload({
  title,
  required,
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
    <div
      className={cn(
        "bg-card flex flex-col gap-3 rounded-xl border p-3 shadow-sm",
        className,
      )}
    >
      {title && (
        <div className="flex items-center justify-between text-sm font-semibold">
          <span>
            {title} {required && <span className="text-destructive">*</span>}
          </span>
        </div>
      )}

      <div className="bg-muted/20 relative flex min-h-[160px] flex-1 items-center justify-center overflow-hidden rounded-lg">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt=""
              fill
              sizes="320px"
              className="object-cover"
            />
            <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white">
              <CheckCircle2 className="text-success fill-success h-6 w-6 text-white" />
            </div>
          </>
        ) : (
          <div className="text-muted-foreground flex flex-col items-center gap-2 p-4 text-center">
            <ImagePlusIcon className="h-8 w-8 opacity-20" />
          </div>
        )}
      </div>

      <Button
        type="button"
        variant="outline"
        className="text-primary border-primary/20 hover:bg-primary/5 w-full"
        onClick={() => document.getElementById(inputId)?.click()}
      >
        {imageUrl ? (
          <>
            <RefreshCcw className="mr-2 h-4 w-4" /> Change Photo
          </>
        ) : (
          "Upload Photo"
        )}
      </Button>

      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => onChange?.(event.target.files?.[0] ?? null)}
      />
    </div>
  );
}
