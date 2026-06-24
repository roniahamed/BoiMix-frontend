import { BookCard } from "@/components/shared/book-card";
import { profileLibraryBooks } from "@/lib/mock/profile";

export default function WishlistPage() {
  const wishlistBooks = profileLibraryBooks.slice(3, 8);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Wishlist</h1>
        <p className="text-muted-foreground mt-2">
          Books you&apos;ve saved to read or buy later.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {wishlistBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
