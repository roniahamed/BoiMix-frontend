import { UserCard } from "@/components/shared/user-card";
import type { UserProfile } from "@/types/user";

export default function FollowersPage() {
  const followers: Partial<UserProfile>[] = [
    {
      id: "1",
      name: "Hasan Mahmud",
      username: "hasan_m",
      avatarUrl: "https://i.pravatar.cc/150?u=hasan",
      location: "Dhaka",
      rating: 4.8,
    },
    {
      id: "2",
      name: "Nusrat Jahan",
      username: "nusrat_j",
      avatarUrl: "https://i.pravatar.cc/150?u=nusrat",
      location: "Mirpur",
      rating: 4.5,
    },
    {
      id: "3",
      name: "Fahim Ahmed",
      username: "fahim_a",
      avatarUrl: "https://i.pravatar.cc/150?u=fahim",
      location: "Banani",
      rating: 4.9,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Followers</h1>
        <p className="text-muted-foreground mt-2">
          Readers who follow your library.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {followers.map((user) => (
          <UserCard key={user.id} user={user as UserProfile} />
        ))}
      </div>
    </div>
  );
}
