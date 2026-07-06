"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  className?: string;
}

export function BackButton({ className }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`text-muted-foreground hover:text-foreground flex items-center gap-2 px-3 font-semibold ${className || ""}`}
      onClick={() => router.back()}
    >
      <ArrowLeftIcon className="h-4 w-4" />
      Back
    </Button>
  );
}
