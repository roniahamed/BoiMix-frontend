import { BookListing } from "@/components/shared/book-listing";

export default function BorrowBooksPage() {
  return (
    <BookListing
      title="Borrow Books"
      description="Explore books available for borrowing from our Central Library and the community."
      initialFilters={{ availability: ["borrow"] }}
    />
  );
}
