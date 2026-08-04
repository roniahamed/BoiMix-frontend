"use client";

import { UserCard } from "@/components/shared/user-card";
import type { UserProfile } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { fetchFollowing } from "@/lib/api-client";
import { Loader2 } from "lucide-react";

export default function FollowingPage() {
  const { data: following = [], isLoading, error } = useQuery({
    queryKey: ["following"],
    queryFn: fetchFollowing,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Following</h1>
        <p className="text-muted-foreground mt-2">
          Readers you are following.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="p-8 text-center text-destructive">
          Failed to load following.
        </div>
      ) : following.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          You are not following anyone yet.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {following.map((user: any) => (
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
