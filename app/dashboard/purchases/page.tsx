import { profileLibraryBooks } from "@/lib/mock/profile";
import { BookCard } from "@/components/shared/book-card";

export default function PurchasesPage() {
  const purchasedBooks = profileLibraryBooks.slice(4, 6);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Purchase History</h1>
        <p className="text-muted-foreground mt-2">
          Books you have bought on BoiMix.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {purchasedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
