"use client";

import { UserCard } from "@/components/shared/user-card";
import type { UserProfile } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { fetchFollowers } from "@/lib/api-client";
import { Loader2 } from "lucide-react";

export default function FollowersPage() {
  const { data: followers = [], isLoading, error } = useQuery({
    queryKey: ["followers"],
    queryFn: fetchFollowers,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Followers</h1>
        <p className="text-muted-foreground mt-2">
          Readers who follow your library.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="p-8 text-center text-destructive">
          Failed to load followers.
        </div>
      ) : followers.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          You have no followers yet.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {followers.map((user: any) => (
            <UserCard 
              key={user.username || user.id} 
              user={{
                id: user.id,
                name: user.full_name || user.name || user.username,
                username: user.username,
                avatarUrl: user.avatarUrl || user.avatar_url || `https://ui-avatars.com/api/?name=${user.username}&background=random`,
                location: user.location,
                rating: user.rating,
              } as UserProfile} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
