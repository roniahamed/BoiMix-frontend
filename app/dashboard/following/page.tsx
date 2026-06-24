import { UserCard } from "@/components/shared/user-card";
import type { UserProfile } from "@/types/user";

export default function FollowingPage() {
  const following: Partial<UserProfile>[] = [
    {
      id: "1",
      name: "Tanvir Hossain",
      username: "tanvir_h",
      avatarUrl: "https://i.pravatar.cc/150?u=tanvir",
      location: "Gulshan",
      rating: 4.7,
    },
    {
      id: "2",
      name: "Ayman Sadiq",
      username: "ayman_s",
      avatarUrl: "https://i.pravatar.cc/150?u=ayman",
      location: "Banani",
      rating: 4.9,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Following</h1>
        <p className="text-muted-foreground mt-2">Readers you are following.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {following.map((user) => (
          <UserCard key={user.id} user={user as UserProfile} />
        ))}
      </div>
    </div>
  );
}
