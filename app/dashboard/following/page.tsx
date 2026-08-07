"use client";

import { UserCard } from "@/components/shared/user-card";
import type { UserProfile } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { fetchFollowing } from "@/lib/api-client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";

function FollowingUserCard({ user }: { user: any }) {
  const [isUnfollowing, setIsUnfollowing] = useState(false);
  const queryClient = useQueryClient();

  const handleUnfollow = async () => {
    setIsUnfollowing(true);
    try {
      await apiRequest({
        url: `/profiles/${user.username}/follow/`,
        method: "DELETE",
      });
      toast.success(`Unfollowed ${user.full_name || user.username}`);
      queryClient.invalidateQueries({ queryKey: ["following"] });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to unfollow");
    } finally {
      setIsUnfollowing(false);
    }
  };

  return (
    <UserCard
      user={
        {
          id: user.id || user.username,
          name: user.full_name || user.name || user.username,
          username: user.username,
          avatarUrl: user.avatarUrl || user.avatar_url,
          location: user.location,
          rating: user.rating,
        } as UserProfile
      }
      action={
        <Button
          variant="outline"
          size="sm"
          onClick={handleUnfollow}
          disabled={isUnfollowing}
        >
          {isUnfollowing ? "..." : "Unfollow"}
        </Button>
      }
    />
  );
}

export default function FollowingPage() {
  const {
    data: following = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["following"],
    queryFn: fetchFollowing,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Following</h1>
        <p className="text-muted-foreground mt-2">Readers you are following.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-destructive p-8 text-center">
          Failed to load following.
        </div>
      ) : following.length === 0 ? (
        <div className="text-muted-foreground p-8 text-center">
          You are not following anyone yet.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {}
          {following.map((user: any) => (
            <FollowingUserCard key={user.username || user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
