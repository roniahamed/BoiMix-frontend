import { Metadata } from "next";
import { BookListing } from "@/components/shared/book-listing";

type Props = {
  params: Promise<{ genre: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const genre = resolvedParams.genre;
  return {
    title: `${genre} Books - BoiMix`,
    description: `Browse all books in the ${genre} category.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const genre = resolvedParams.genre;
  const formattedGenre =
    genre.charAt(0).toUpperCase() + genre.slice(1).replace(/-/g, " ");

  return (
    <BookListing
      title={`ক্যাটাগরি: ${formattedGenre}`}
      description={`"${formattedGenre}" ক্যাটাগরির সব বই`}
    />
  );
}
