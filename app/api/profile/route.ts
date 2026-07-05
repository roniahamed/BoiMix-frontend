import data from "@/lib/data/profileData.json";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (username) {
    const profile = (data.mockProfiles as { username: string }[]).find(
      (p) => p.username === username,
    );

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({
      profile,
      books: (data as { profileLibraryBooks: unknown }).profileLibraryBooks,
      reviews: (data as { profileReviews: unknown }).profileReviews,
      activity: (data as { profileActivity: unknown }).profileActivity,
    });
  }

  return NextResponse.json(data.mockProfiles);
}
