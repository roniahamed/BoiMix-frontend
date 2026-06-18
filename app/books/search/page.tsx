import { Metadata } from "next";
import { BookListing } from "@/components/shared/book-listing";

export const metadata: Metadata = {
  title: "Search Books - BoiMix",
  description: "Search for books to buy, swap, or borrow.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const q = resolvedParams?.q || "";

  return (
    <BookListing
      title={q ? `"${q}" এর জন্য সার্চ রেজাল্ট` : "বই খুঁজুন"}
      description="বইয়ের নাম, লেখক বা প্রকাশনীর নাম দিয়ে সার্চ করুন"
      defaultSearchQuery={q}
    />
  );
}
