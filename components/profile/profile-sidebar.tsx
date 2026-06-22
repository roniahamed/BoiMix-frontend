import {
  CalendarDaysIcon,
  ClockIcon,
  GlobeIcon,
  LinkIcon,
  MapPinIcon,
  MessageCircleIcon,
  Repeat2Icon,
  StarIcon,
  BookOpenIcon,
  ShieldCheckIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { UserProfile } from "@/types/user";

type ProfileSidebarProps = {
  profile: UserProfile;
};

function getHighlightIcon(iconName: string) {
  switch (iconName) {
    case "star":
      return <StarIcon className="text-warning fill-warning size-5" />;
    case "repeat":
      return <Repeat2Icon className="text-info size-5" />;
    case "message":
      return <MessageCircleIcon className="text-success fill-success size-5" />;
    case "clock":
      return <ClockIcon className="text-success size-5" />;
    default:
      return <StarIcon className="size-5" />;
  }
}

export function ProfileSidebar({ profile }: ProfileSidebarProps) {
  return (
    <aside className="flex flex-col gap-5">
      {/* About Section */}
      <section className="border-muted rounded-[5px] border p-5">
        <h2 className="text-foreground text-base font-bold tracking-tight">
          About
        </h2>
        <p className="text-muted-foreground mt-3 text-[14px] leading-relaxed">
          {profile.bio}
        </p>

        <ul className="text-muted-foreground mt-5 space-y-3 text-[13px]">
          {profile.location && (
            <li className="flex items-center gap-2">
              <MapPinIcon className="size-4 shrink-0" />
              <span>{profile.location}</span>
            </li>
          )}
          {profile.joinedAt && (
            <li className="flex items-center gap-2">
              <CalendarDaysIcon className="size-4 shrink-0" />
              <span>{profile.joinedAt}</span>
            </li>
          )}
          {profile.socialLinks?.website && (
            <li className="flex items-center gap-2">
              <LinkIcon className="size-4 shrink-0" />
              <a
                href={`https://${profile.socialLinks.website}`}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                {profile.socialLinks.website}
              </a>
            </li>
          )}
        </ul>

        {/* Social Icons */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {profile.socialLinks?.website && (
            <a
              href={`https://${profile.socialLinks.website}`}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
            >
              <GlobeIcon className="size-5" />
              <span className="sr-only">Website</span>
            </a>
          )}
          {profile.socialLinks?.facebook && (
            <a
              href={profile.socialLinks.facebook}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center text-[#1877F2]/80 transition-colors hover:text-[#1877F2]"
            >
              <svg
                className="size-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook</span>
            </a>
          )}
          {profile.socialLinks?.twitter && (
            <a
              href={profile.socialLinks.twitter}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center text-[#1DA1F2]/80 transition-colors hover:text-[#1DA1F2]"
            >
              <svg
                className="size-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
              <span className="sr-only">Twitter</span>
            </a>
          )}
          {profile.socialLinks?.instagram && (
            <a
              href={profile.socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center text-[#E4405F]/80 transition-colors hover:text-[#E4405F]"
            >
              <svg
                className="size-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Instagram</span>
            </a>
          )}
        </div>
      </section>

      {/* Reading Interests */}
      {profile.readingInterests && profile.readingInterests.length > 0 && (
        <section className="border-muted rounded-[5px] border p-5">
          <h2 className="text-foreground text-base font-bold tracking-tight">
            Reading Interests
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.readingInterests.slice(0, 5).map((interest) => (
              <span
                key={interest}
                className="bg-muted/70 hover:bg-muted text-foreground rounded-xl px-3 py-1 text-xs font-medium"
              >
                {interest}
              </span>
            ))}
            {profile.readingInterests.length > 5 && (
              <span className="text-primary hover:bg-info-soft rounded-xl px-3 py-1 text-xs font-medium">
                +{profile.readingInterests.length - 5} more
              </span>
            )}
          </div>
        </section>
      )}

      {/* Member Highlights */}
      {profile.memberHighlights && profile.memberHighlights.length > 0 && (
        <section className="border-muted rounded-[5px] border p-5">
          <h2 className="text-foreground text-base font-bold tracking-tight">
            Member Highlights
          </h2>
          <ul className="mt-5 flex flex-col gap-4">
            {profile.memberHighlights.map((highlight, index) => (
              <li key={index} className="flex gap-3">
                <div className="mt-0.5 shrink-0">
                  {getHighlightIcon(highlight.icon)}
                </div>
                <div>
                  <p className="text-foreground text-[13px] font-bold">
                    {highlight.title}
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-[12px]">
                    {highlight.subtitle}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Badges */}
      {profile.profileBadges && profile.profileBadges.length > 0 && (
        <section className="border-muted rounded-[5px] border p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-foreground text-base font-bold tracking-tight">
              Badges
            </h2>
            <a
              href={`/u/${profile.username}/badges`}
              className="text-primary text-[13px] font-semibold hover:underline"
            >
              View all
            </a>
          </div>
          <div className="mt-5 flex flex-wrap gap-4">
            {profile.profileBadges.map((badge, idx) => {
              let IconComponent = StarIcon;
              let colorClass =
                "text-purple-500 drop-shadow-[0_4px_6px_rgba(168,85,247,0.4)]";

              if (badge.tone === "default") {
                IconComponent = BookOpenIcon;
                colorClass =
                  "text-purple-500 drop-shadow-[0_4px_6px_rgba(168,85,247,0.4)]";
              }
              if (badge.tone === "info") {
                IconComponent = Repeat2Icon;
                colorClass =
                  "text-blue-500 drop-shadow-[0_4px_6px_rgba(59,130,246,0.4)]";
              }
              if (badge.tone === "warning") {
                IconComponent = StarIcon;
                colorClass =
                  "text-orange-500 drop-shadow-[0_4px_6px_rgba(249,115,22,0.4)]";
              }
              if (badge.tone === "success") {
                IconComponent = ShieldCheckIcon; // Wait, ShieldCheckIcon needs to be imported or use another
                colorClass =
                  "text-emerald-500 drop-shadow-[0_4px_6px_rgba(16,185,129,0.4)]";
              }

              return (
                <div
                  key={idx}
                  title={badge.description}
                  className="flex cursor-default items-center justify-center transition-transform hover:-translate-y-0.5"
                >
                  <div className={cn("relative size-12", colorClass)}>
                    {/* SVG Rounded Hexagon Background */}
                    <svg
                      viewBox="0 0 100 100"
                      className="absolute inset-0 size-full"
                    >
                      <polygon
                        points="50 5, 90 28, 90 72, 50 95, 10 72, 10 28"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="10"
                        strokeLinejoin="round"
                      />
                      {/* Inner lighter border effect */}
                      <polygon
                        points="50 5, 90 28, 90 72, 50 95, 10 72, 10 28"
                        fill="transparent"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="4"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {/* Icon centered inside */}
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <IconComponent className="size-5" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </aside>
  );
}
