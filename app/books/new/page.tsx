import { Metadata } from "next";
import { BookListing } from "@/components/shared/book-listing";

export const metadata: Metadata = {
  title: "New Arrivals - BoiMix",
  description: "Browse the newest books added to BoiMix.",
};

export default function NewArrivalsPage() {
  return (
    <BookListing
      title="নতুন বই"
      description="সম্প্রতি ওয়েবসাইটে যুক্ত হওয়া সব নতুন বই"
    />
  );
}
