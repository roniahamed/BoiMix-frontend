import { NextResponse } from 'next/server';
import bookDetails from '@/lib/data/bookDetails.json';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Return the book details. If you had multiple books, you would find the one matching 'slug'.
  // But since the dummy data is just a single mock structure, we return it.
  // We can update the 'slug' dynamically in the response to match the requested slug.
  const responseData = {
    ...bookDetails,
    book: {
      ...bookDetails.book,
      id: `book-${slug}`,
      title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) // basic formatting
    }
  };

  return NextResponse.json(responseData);
}
