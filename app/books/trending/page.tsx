import { Metadata } from "next";
import { BookListing } from "@/components/shared/book-listing";

export const metadata: Metadata = {
  title: "Trending Books - BoiMix",
  description: "Browse the most popular and trending books on BoiMix.",
};

export default function TrendingPage() {
  return (
    <BookListing
      title="ট্রেন্ডিং বই"
      description="এই মুহূর্তে সবচেয়ে জনপ্রিয় বইগুলো"
    />
  );
}
