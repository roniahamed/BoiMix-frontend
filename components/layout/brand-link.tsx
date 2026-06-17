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
        "focus-visible:ring-ring/50 inline-flex items-center gap-2 rounded-md focus-visible:ring-[3px] focus-visible:outline-none",
        className,
      )}
      aria-label="BoiMix home"
    >
      <Image
        src="/brand/boimix-logo.png"
        alt=""
        width={36}
        height={36}
        className="size-9 rounded-md object-contain"
        priority
      />
      {!compact && (
        <span className="font-display text-foreground text-xl font-bold">
          BoiMix
        </span>
      )}
    </Link>
  );
}
