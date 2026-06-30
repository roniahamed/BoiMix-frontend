import { NextResponse } from 'next/server';
import data from '@/lib/data/profileData.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  
  if (username) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const profile = (data.mockProfiles as any[]).find((p: any) => p.username === username);
      if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json({
          profile,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          books: (data as any).profileLibraryBooks,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          reviews: (data as any).profileReviews,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          activity: (data as any).profileActivity
      });
  }
  
  return NextResponse.json(data);
}
