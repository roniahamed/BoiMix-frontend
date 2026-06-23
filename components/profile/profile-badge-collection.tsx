import { BeautifulBadge } from "@/components/shared/beautiful-badge";
import type { UserProfileBadge } from "@/types/user";

type ProfileBadgeCollectionProps = {
  badges: UserProfileBadge[];
};

export function ProfileBadgeCollection({
  badges,
}: ProfileBadgeCollectionProps) {
  const earnedBadges = badges.filter((b) => b.isEarned);
  const inProgressBadges = badges.filter((b) => !b.isEarned);

  return (
    <div className="space-y-10">
      {/* Earned Badges Section */}
      {earnedBadges.length > 0 && (
        <section>
          <div className="mb-5">
            <h2 className="text-foreground text-lg font-bold tracking-tight">
              Earned Badges ({earnedBadges.length})
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Badges you&apos;ve earned for being an active and trusted member
              of BoiMix.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {earnedBadges.map((badge, idx) => (
              <article
                key={idx}
                className="bg-card border-border/50 flex flex-col items-center rounded-[5px] border p-4 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
              >
                <BeautifulBadge
                  type={badge.icon}
                  color={badge.badgeColor || "red"}
                  isEarned={badge.isEarned}
                  className="mb-3 h-[64px] w-[56px]"
                  iconClassName="size-7"
                />
                <h3 className="text-foreground text-[13px] font-bold">
                  {badge.label}
                </h3>
                <p className="text-muted-foreground mt-1.5 line-clamp-2 text-[11px] leading-snug">
                  {badge.description}
                </p>
                {badge.earnedAt && (
                  <p className="text-muted-foreground mt-3 text-[10px] font-medium">
                    Earned on
                    <br />
                    {badge.earnedAt}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Badges in Progress Section */}
      {inProgressBadges.length > 0 && (
        <section>
          <div className="mb-5">
            <h2 className="text-foreground text-lg font-bold tracking-tight">
              Badges in Progress ({inProgressBadges.length})
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Keep going! You&apos;re close to earning these badges.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            {inProgressBadges.map((badge, idx) => (
              <article
                key={idx}
                className="bg-card border-border/50 rounded-[5px] border p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-center gap-4">
                  <div className="shrink-0">
                    <BeautifulBadge
                      type={badge.icon}
                      color={badge.badgeColor || "red"}
                      isEarned={false}
                      className="h-[60px] w-[54px]"
                      iconClassName="size-6"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-foreground text-[13px] font-bold">
                      {badge.label}
                    </h3>
                    <p className="text-muted-foreground mt-1 truncate text-[11px]">
                      {badge.description}
                    </p>

                    {badge.progress && (
                      <div className="mt-4">
                        <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full shadow-inner">
                          <div
                            className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${(badge.progress.current / badge.progress.required) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="mt-1.5 flex justify-end">
                          <span className="text-muted-foreground text-[10px] font-medium">
                            {badge.progress.current} / {badge.progress.required}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
