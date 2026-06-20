"use client";

import { ImagePlusIcon, RefreshCcw, CheckCircle2, X } from "lucide-react";
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

      <div
        className={`bg-muted/20 relative flex min-h-[160px] flex-1 items-center justify-center overflow-hidden rounded-lg ${!imageUrl ? "hover:bg-muted/40 cursor-pointer transition-colors" : ""}`}
        onClick={() => !imageUrl && document.getElementById(inputId)?.click()}
      >
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt=""
              fill
              sizes="320px"
              className="object-cover"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange?.(null);
                  const inputElement = document.getElementById(
                    inputId,
                  ) as HTMLInputElement;
                  if (inputElement) inputElement.value = "";
                }}
                className="text-destructive hover:bg-destructive flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:text-white"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm">
                <CheckCircle2 className="text-success fill-success h-6 w-6 text-white" />
              </div>
            </div>
          </>
        ) : (
          <div className="text-muted-foreground flex flex-col items-center gap-2 p-4 text-center">
            <ImagePlusIcon className="h-8 w-8 opacity-20" />
            <span className="text-xs font-medium">Click to upload</span>
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
