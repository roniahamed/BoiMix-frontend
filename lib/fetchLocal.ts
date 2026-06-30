import booksData from '@/lib/data/books.json';
import categoriesData from '@/lib/data/categories.json';
import readersData from '@/lib/data/readers.json';
import communityData from '@/lib/data/community.json';
import sponsorsData from '@/lib/data/sponsors.json';
import testimonialsData from '@/lib/data/testimonials.json';
import profileData from '@/lib/data/profileData.json';
import bookDetails from '@/lib/data/bookDetails.json';
import trackingData from '@/lib/data/tracking.json';
import humayunBooks from '@/lib/data/humayunBooks.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchLocal(endpoint: string): Promise<any> {
  if (endpoint.includes('/api/profile')) return profileData;
  if (endpoint.includes('/api/categories')) return categoriesData;
  if (endpoint.includes('/api/readers')) return readersData;
  if (endpoint.includes('/api/community')) return communityData;
  if (endpoint.includes('/api/sponsors')) return sponsorsData;
  if (endpoint.includes('/api/testimonials')) return testimonialsData;
  if (endpoint.includes('/api/orders/tracking')) return trackingData;
  if (endpoint.includes('/api/authors/humayun-ahmed/books')) return humayunBooks;
  
  if (endpoint.includes('/api/books/')) {
      const parts = endpoint.split('/');
      const slug = parts[parts.length - 1];
      return {
        ...bookDetails,
        book: {
          ...bookDetails.book,
          id: `book-${slug}`,
          title: slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Book'
        }
      };
  }
  
  if (endpoint.includes('/api/books')) {
      return booksData;
  }

  return {};
}
