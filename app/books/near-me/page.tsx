import { Metadata } from "next";
import { BookListing } from "@/components/shared/book-listing";

export const metadata: Metadata = {
  title: "Nearby Books - BoiMix",
  description: "Find books available near your location.",
};

export default function NearbyPage() {
  return (
    <BookListing
      title="আশেপাশের বই"
      description="আপনার কাছাকাছি থাকা ইউজারদের বইগুলো"
    />
  );
}
