export type BookAvailabilityMode =
  | "sell"
  | "swap"
  | "borrow"
  | "wishlist"
  | "collection"
  | "library";

export type BookCondition = "new" | "excellent" | "good" | "fair" | "poor";

export type BookAvailabilityStatus = "in-stock" | "out-of-stock";

export type BookCardBook = {
  id: string;
  slug: string;
  title: string;
  author: string;
  coverUrl: string;
  tags: BookAvailabilityMode[];
  rating: number;
  reviewCount: number;
  price?: number;
  originalPrice?: number;
  distance?: string;
  location?: string;
  condition: BookCondition;
  availability: BookAvailabilityStatus;
  isWishlisted?: boolean;
  isInCart?: boolean;
  providerType?: "library" | "user";
  isVerifiedUser?: boolean;
};

export type BookGalleryImage = {
  src: string;
  alt: string;
};
