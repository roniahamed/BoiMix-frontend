import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/shared/book-card";
import { profileLibraryBooks } from "@/lib/mock/profile";

export default function CartPage() {
  const cartBooks = profileLibraryBooks.slice(1, 3);
  const subtotal = cartBooks.reduce((acc, book) => acc + (book.price || 0), 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
        <p className="text-muted-foreground mt-2">
          Review your items before checkout.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {cartBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
        <div className="bg-card h-fit space-y-4 rounded-lg border p-6">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="flex justify-between border-b pb-4 text-sm">
            <span className="text-muted-foreground">
              Subtotal ({cartBooks.length} items)
            </span>
            <span>৳{subtotal}</span>
          </div>
          <div className="flex justify-between border-b pb-4 text-sm">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span>৳60</span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>৳{subtotal + 60}</span>
          </div>
          <Button className="w-full" size="lg">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
