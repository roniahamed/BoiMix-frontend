import { BookCard } from "@/components/shared/book-card";
import { fetchLocal } from "@/lib/fetchLocal";

export default async function SalesPage() {
  const { profileLibraryBooks } = await fetchLocal("/api/profile");

  const soldBooks = profileLibraryBooks.slice(8, 10);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sales History</h1>
        <p className="text-muted-foreground mt-2">
          Books you have sold to other readers.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {soldBooks.map((book: any) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
