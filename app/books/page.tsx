import { Metadata } from "next";
import { BookListing } from "@/components/shared/book-listing";

export const metadata: Metadata = {
  title: "Books - BoiMix",
  description: "Browse thousands of books to buy, exchange, or borrow.",
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BooksPage(props: Props) {
  const params = await props.searchParams;
  const typeParam = params.type;

  let initialFilters: Record<string, string[]> = {};
  let title = "সব বই";
  let description = "আপনার পছন্দের বই খুঁজুন, ধার নিন বা এক্সচেঞ্জ করুন";

  if (typeParam === "borrow") {
    initialFilters = { listingType: ["borrow"] };
    title = "Central Library";
    description = "Browse official BoiMix library inventory.";
  } else if (typeParam === "sell") {
    initialFilters = { listingType: ["sell"] };
    title = "Marketplace";
    description = "Explore marketplace books from BoiMix and readers.";
  } else if (typeParam === "exchange") {
    initialFilters = { listingType: ["exchange"] };
    title = "Exchanges";
    description = "Find peer-to-peer exchange opportunities.";
  }

  return (
    <BookListing
      title={title}
      description={description}
      initialFilters={initialFilters}
    />
  );
}
