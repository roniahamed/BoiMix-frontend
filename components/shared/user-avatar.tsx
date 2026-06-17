import Image from "next/image";
import { UserIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type UserAvatarProps = {
  name: string;
  src?: string;
  className?: string;
};

export function UserAvatar({ name, src, className }: UserAvatarProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      className={cn(
        "bg-muted text-muted-foreground inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-semibold",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          width={80}
          height={80}
          className="size-full object-cover"
        />
      ) : initials ? (
        initials
      ) : (
        <UserIcon className="size-4" aria-hidden="true" />
      )}
    </span>
  );
}
