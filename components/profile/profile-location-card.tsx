import { MapPinIcon, ShieldCheckIcon } from "lucide-react";

import { BadgePill } from "@/components/shared/badge-pill";
import type { UserProfileLocation } from "@/types/user";

type ProfileLocationCardProps = {
  location: UserProfileLocation;
};

export function ProfileLocationCard({ location }: ProfileLocationCardProps) {
  return (
    <section className="bg-card rounded-lg border p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="bg-info-soft text-primary inline-flex size-11 shrink-0 items-center justify-center rounded-full">
          <MapPinIcon className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h2 className="text-foreground text-xl font-bold">
            {location.area}, {location.district}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            {location.meetingPreference}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-foreground text-sm font-semibold">Service areas</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {location.serviceArea.map((area) => (
            <BadgePill key={area} tone="info">
              {area}
            </BadgePill>
          ))}
        </div>
      </div>

      <div className="bg-success-soft text-success mt-5 flex gap-2 rounded-lg p-4 text-sm leading-6">
        <ShieldCheckIcon
          className="mt-0.5 size-4 shrink-0"
          aria-hidden="true"
        />
        <p>{location.privacyNote}</p>
      </div>
    </section>
  );
}
