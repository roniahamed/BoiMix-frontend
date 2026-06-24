import { profileLibraryBooks } from "@/lib/mock/profile";
import { BookCard } from "@/components/shared/book-card";

export default function BorrowedPage() {
  const borrowedBooks = profileLibraryBooks.slice(6, 8);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Borrowed Books</h1>
        <p className="text-muted-foreground mt-2">
          Books you are currently borrowing from other readers.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {borrowedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
