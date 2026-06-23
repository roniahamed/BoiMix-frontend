import React from "react";
import { cn } from "@/lib/utils";
import {
  AwardIcon,
  BookIcon,
  RepeatIcon,
  StarIcon,
  UsersIcon,
  FlameIcon,
} from "lucide-react";

type BadgeType =
  | "book"
  | "repeat"
  | "star"
  | "users"
  | "award"
  | "flame"
  | string;
type BadgeColor =
  | "red"
  | "blue"
  | "green"
  | "purple"
  | "orange"
  | (string & {});

interface BeautifulBadgeProps {
  type?: BadgeType;
  color?: BadgeColor;
  isEarned?: boolean;
  className?: string;
  iconClassName?: string;
}

const iconMap: Record<string, React.ElementType> = {
  award: AwardIcon,
  book: BookIcon,
  repeat: RepeatIcon,
  star: StarIcon,
  users: UsersIcon,
  flame: FlameIcon,
};

const colorMap = {
  red: { primary: "#b91c1c", secondary: "#7f1d1d" },
  blue: { primary: "#1d4ed8", secondary: "#1e3a8a" },
  green: { primary: "#15803d", secondary: "#14532d" },
  purple: { primary: "#7e22ce", secondary: "#581c87" },
  orange: { primary: "#c2410c", secondary: "#7c2d12" },
};

export function BeautifulBadge({
  type = "award",
  color = "red",
  isEarned = true,
  className,
  iconClassName,
}: BeautifulBadgeProps) {
  const Icon = iconMap[type] || AwardIcon;

  const colors = colorMap[color as keyof typeof colorMap] || colorMap.red;
  const primaryColor = isEarned ? colors.primary : "#4b5563";
  const secondaryColor = isEarned ? colors.secondary : "#374151";

  const goldLight = isEarned ? "#fde047" : "#d1d5db";
  const goldMid = isEarned ? "#fbbf24" : "#9ca3af";
  const goldDark = isEarned ? "#b45309" : "#4b5563";

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className,
      )}
    >
      <svg
        viewBox="0 0 100 110"
        className="size-full drop-shadow-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={`grad-${color}-${isEarned}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
          <linearGradient
            id={`gold-border-${isEarned}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={goldLight} />
            <stop offset="50%" stopColor={goldDark} />
            <stop offset="100%" stopColor={goldMid} />
          </linearGradient>
          <linearGradient
            id={`gold-inner-${isEarned}`}
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={goldDark} />
            <stop offset="50%" stopColor={goldLight} />
            <stop offset="100%" stopColor={goldDark} />
          </linearGradient>

          <filter id="inner-shadow">
            <feOffset dx="0" dy="4" />
            <feGaussianBlur stdDeviation="3" result="offset-blur" />
            <feComposite
              operator="out"
              in="SourceGraphic"
              in2="offset-blur"
              result="inverse"
            />
            <feFlood floodColor="black" floodOpacity="0.6" result="color" />
            <feComposite
              operator="in"
              in="color"
              in2="inverse"
              result="shadow"
            />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* Outer thick gold border */}
        <polygon
          points="50,2 98,28 98,82 50,108 2,82 2,28"
          fill={`url(#gold-border-${isEarned})`}
        />

        {/* Inner gold edge to create 3D bevel effect */}
        <polygon
          points="50,8 92,31 92,79 50,102 8,79 8,31"
          fill={`url(#gold-inner-${isEarned})`}
        />

        {/* The colored center */}
        <polygon
          points="50,12 88,34 88,76 50,98 12,76 12,34"
          fill={`url(#grad-${color}-${isEarned})`}
          filter="url(#inner-shadow)"
        />

        {/* Inner thin gold ring */}
        <polygon
          points="50,18 83,36 83,74 50,92 17,74 17,36"
          fill="none"
          stroke={`url(#gold-border-${isEarned})`}
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Top accent triangle */}
        <polygon points="50,2 58,10 42,10" fill={goldLight} opacity="0.8" />
        {/* Bottom accent triangle */}
        <polygon points="50,108 58,100 42,100" fill={goldDark} opacity="0.8" />
      </svg>

      {/* Icon placed perfectly in the center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon
          className={cn("drop-shadow-lg", iconClassName)}
          style={{
            color: isEarned ? goldLight : "#e5e7eb",
            filter: isEarned
              ? "drop-shadow(0px 2px 2px rgba(0,0,0,0.5))"
              : "none",
          }}
          strokeWidth={2.5}
        />
      </div>
    </div>
  );
}
