import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLinkProps = {
  className?: string;
  compact?: boolean;
};

export function BrandLink({ className, compact = false }: BrandLinkProps) {
  return (
    <Link
      href="/"
      className={cn(
        "focus-visible:ring-ring/50 inline-flex items-center rounded-md focus-visible:ring-[3px] focus-visible:outline-none",
        className,
      )}
      aria-label="BoiMix home"
    >
      <Image
        src="/brand/boimix-logo.png"
        alt="BoiMix"
        width={compact ? 100 : 150}
        height={compact ? 34 : 48}
        className={cn(
          "object-contain",
          compact ? "h-8 w-24" : "h-12 w-[150px]",
        )}
        priority
      />
    </Link>
  );
}
