"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { dashboardNavGroups } from "@/lib/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardMenuPage() {
  const router = useRouter();

  // On desktop (lg+), redirect to /dashboard/overview since the sidebar handles navigation
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      router.replace("/dashboard/overview");
    }
  }, [router]);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4 p-4 pb-28">
      {/* User profile card - mobile only */}
      <div className="bg-card flex items-center gap-4 rounded-2xl border p-4 shadow-sm">
        <Avatar className="border-primary/20 size-14 border-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback className="text-lg font-bold">UN</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-bold">User Name</h2>
          <p className="text-muted-foreground text-sm">
            View your public profile
          </p>
        </div>
        <Link
          href="/dashboard/overview"
          className="bg-primary/10 text-primary hover:bg-primary/20 shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
        >
          Profile
        </Link>
      </div>

      {/* Dashboard groups */}
      {dashboardNavGroups.map((group) => (
        <div
          key={group.title}
          className="bg-card overflow-hidden rounded-2xl border shadow-sm"
        >
          <h3 className="bg-muted/40 text-muted-foreground border-b px-4 py-2.5 text-[11px] font-bold tracking-widest uppercase">
            {group.title}
          </h3>
          <div className="divide-y">
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:bg-muted/50 active:bg-muted flex items-center justify-between px-4 py-3.5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {Icon && (
                      <span className="bg-primary/10 flex size-8 shrink-0 items-center justify-center rounded-full">
                        <Icon
                          className="text-primary size-4"
                          aria-hidden="true"
                        />
                      </span>
                    )}
                    <span className="text-foreground font-medium">
                      {item.title}
                    </span>
                  </div>
                  <ChevronRight className="text-muted-foreground/50 size-4 shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
