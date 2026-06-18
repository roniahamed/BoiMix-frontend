import { Metadata } from "next";
import { BookListing } from "@/components/shared/book-listing";

export const metadata: Metadata = {
  title: "Books - BoiMix",
  description: "Browse thousands of books to buy, swap, or borrow.",
};

export default function BooksPage() {
  return (
    <BookListing
      title="সব বই"
      description="আপনার পছন্দের বই খুঁজুন, ধার নিন বা সোয়াপ করুন"
    />
  );
}
