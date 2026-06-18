import { BookListing } from "@/components/shared/book-listing";

export default function TopRatedBooksPage() {
  return (
    <BookListing
      title="Top Rated Books"
      description="Discover the highest-rated books across the platform as reviewed by our community."
      initialSortBy="rating"
    />
  );
}
