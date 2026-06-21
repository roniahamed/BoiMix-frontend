import type { BookCardBook } from "@/types/book";
import type {
  UserProfile,
  UserProfileActivity,
  UserProfileReview,
  UserSummary,
} from "@/types/user";

export const mockProfiles: UserProfile[] = [
  {
    id: "user-rahim",
    name: "Rahim Sheikh",
    username: "rahim_sheikh",
    avatarUrl: "https://i.pravatar.cc/240?u=rahim_sheikh",
    coverUrl: "/banners/swap-community.png",
    location: "Mirpur, Dhaka",
    reputation: 96,
    rating: 4.9,
    bio: "Dhaka-based reader sharing Bangla classics, swap-friendly paperbacks, and well-kept library finds with nearby readers.",
    joinedAt: "Joined March 2024",
    responseRate: 98,
    responseTime: "Usually replies within 2 hours",
    badges: [
      { label: "Verified Reader", tone: "info" },
      { label: "Top Swapper", tone: "success" },
      { label: "Fast Responder", tone: "warning" },
    ],
    profileBadges: [
      {
        label: "Verified Reader",
        tone: "info",
        description: "Identity and profile details reviewed by BoiMix.",
        earnedAt: "Mar 2024",
      },
      {
        label: "Top Swapper",
        tone: "success",
        description: "Completed multiple successful book swaps with readers.",
        earnedAt: "Oct 2024",
      },
      {
        label: "Careful Keeper",
        tone: "success",
        description: "Consistently shares books in good condition.",
        earnedAt: "Jan 2025",
      },
      {
        label: "Fast Responder",
        tone: "warning",
        description: "Keeps conversations active and replies quickly.",
        earnedAt: "Feb 2025",
      },
    ],
    stats: {
      booksShared: 42,
      reviewsWritten: 18,
      swapsCompleted: 27,
      borrowLends: 34,
      followers: 245,
      following: 118,
    },
    locationDetails: {
      district: "Dhaka",
      area: "Mirpur 10",
      serviceArea: ["Mirpur", "Dhanmondi", "Banani", "Uttara"],
      meetingPreference:
        "Prefers public handover points near metro stations or book cafes.",
      privacyNote:
        "Exact address is shared only after a borrow, sale, or swap request is accepted.",
    },
  },
];

export const profileLibraryBooks: BookCardBook[] = [
  {
    id: "profile-book-1",
    slug: "pather-panchali",
    title: "Pather Panchali",
    author: "Bibhutibhushan Bandyopadhyay",
    coverUrl: "/book-covers/song-of-padma.svg",
    tags: ["swap", "borrow"],
    rating: 4.9,
    reviewCount: 142,
    distance: "1.2 km",
    location: "Mirpur",
    condition: "good",
    availability: "in-stock",
    providerType: "user",
    isVerifiedUser: true,
  },
  {
    id: "profile-book-2",
    slug: "history-of-bengal",
    title: "History of Bengal",
    author: "Akbar Ali Khan",
    coverUrl: "/book-covers/history-of-bengal.svg",
    tags: ["sell", "borrow"],
    rating: 4.8,
    reviewCount: 65,
    price: 480,
    originalPrice: 600,
    distance: "1.9 km",
    location: "Mirpur",
    condition: "excellent",
    availability: "in-stock",
    providerType: "user",
    isVerifiedUser: true,
  },
  {
    id: "profile-book-3",
    slug: "smart-entrepreneur",
    title: "Smart Entrepreneur",
    author: "Ayman Sadiq",
    coverUrl: "/book-covers/smart-entrepreneur.svg",
    tags: ["sell"],
    rating: 4.7,
    reviewCount: 110,
    price: 320,
    originalPrice: 400,
    location: "Mirpur",
    condition: "new",
    availability: "in-stock",
    providerType: "user",
    isVerifiedUser: true,
  },
  {
    id: "profile-book-4",
    slug: "quiet-reviews",
    title: "Quiet Reviews",
    author: "Raisa Chowdhury",
    coverUrl: "/book-covers/quiet-reviews.svg",
    tags: ["borrow", "swap"],
    rating: 4.9,
    reviewCount: 52,
    distance: "1.7 km",
    location: "Mirpur",
    condition: "excellent",
    availability: "in-stock",
    providerType: "user",
    isVerifiedUser: true,
  },
];

export const profileReviews: UserProfileReview[] = [
  {
    id: "review-1",
    bookTitle: "Pather Panchali",
    bookSlug: "pather-panchali",
    rating: 5,
    createdAt: "12 May 2026",
    body: "A beautiful copy and a warm story. The condition was exactly as described, and the handover was easy.",
    helpfulCount: 18,
  },
  {
    id: "review-2",
    bookTitle: "History of Bengal",
    bookSlug: "history-of-bengal",
    rating: 4,
    createdAt: "02 Apr 2026",
    body: "Dense but rewarding. Rahim's note on which chapters to start with made the read much easier.",
    helpfulCount: 9,
  },
  {
    id: "review-3",
    bookTitle: "Quiet Reviews",
    bookSlug: "quiet-reviews",
    rating: 5,
    createdAt: "18 Feb 2026",
    body: "Great borrower and careful reader. Returned the book on time with a thoughtful review.",
    helpfulCount: 12,
  },
];

export const profileActivity: UserProfileActivity[] = [
  {
    id: "activity-1",
    type: "listed",
    title: "Listed History of Bengal",
    description: "Added a clean hardcover copy for sale and borrow.",
    createdAt: "Today",
  },
  {
    id: "activity-2",
    type: "swap",
    title: "Completed a swap",
    description: "Swapped Pather Panchali with a reader from Dhanmondi.",
    createdAt: "2 days ago",
  },
  {
    id: "activity-3",
    type: "review",
    title: "Wrote a review",
    description: "Reviewed Quiet Reviews and marked it as a recommended read.",
    createdAt: "1 week ago",
  },
  {
    id: "activity-4",
    type: "badge",
    title: "Earned Careful Keeper",
    description: "Recognized for sharing books in excellent condition.",
    createdAt: "Jan 2025",
  },
];

export const profileFollowers: UserSummary[] = [
  {
    id: "user-nusrat",
    name: "Nusrat Jahan",
    username: "nusrat_reads",
    avatarUrl: "https://i.pravatar.cc/160?u=nusrat_reads",
    location: "Dhanmondi, Dhaka",
    rating: 4.8,
    badges: [{ label: "Reviewer", tone: "info" }],
  },
  {
    id: "user-sabbir",
    name: "Sabbir Hasan",
    username: "sabbir_books",
    avatarUrl: "https://i.pravatar.cc/160?u=sabbir_books",
    location: "Banani, Dhaka",
    rating: 4.7,
    badges: [{ label: "Swapper", tone: "success" }],
  },
  {
    id: "user-tasnim",
    name: "Tasnim Ara",
    username: "tasnim_library",
    avatarUrl: "https://i.pravatar.cc/160?u=tasnim_library",
    location: "Uttara, Dhaka",
    rating: 4.9,
    badges: [{ label: "Verified", tone: "info" }],
  },
];

export const profileFollowing: UserSummary[] = [
  {
    id: "user-arif",
    name: "Arif Hossain",
    username: "arif_pages",
    avatarUrl: "https://i.pravatar.cc/160?u=arif_pages",
    location: "Mirpur, Dhaka",
    rating: 4.6,
    badges: [{ label: "Borrower", tone: "success" }],
  },
  {
    id: "user-maliha",
    name: "Maliha Karim",
    username: "maliha_swap",
    avatarUrl: "https://i.pravatar.cc/160?u=maliha_swap",
    location: "Mohammadpur, Dhaka",
    rating: 4.8,
    badges: [{ label: "Top Swapper", tone: "success" }],
  },
];

export function getUserProfile(username: string) {
  return mockProfiles.find((profile) => profile.username === username);
}
