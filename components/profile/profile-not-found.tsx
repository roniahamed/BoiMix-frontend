import Link from "next/link";
import { UserXIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";

export function ProfileNotFound() {
  return (
    <div className="boimix-container py-10 md:py-14">
      <EmptyState
        icon={UserXIcon}
        title="Reader profile not found"
        description="This public profile is unavailable or the username may have changed."
        action={
          <Button asChild>
            <Link href="/books">Browse books</Link>
          </Button>
        }
      />
    </div>
  );
}
