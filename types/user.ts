export type UserBadgeTone = "default" | "success" | "warning" | "info";

export type UserBadge = {
  label: string;
  tone?: UserBadgeTone;
};

export type UserSummary = {
  id: string;
  name: string;
  username?: string;
  avatarUrl?: string;
  location?: string;
  reputation?: number;
  rating?: number;
  badges?: UserBadge[];
};

export type UserProfileStats = {
  booksShared: number;
  reviewsWritten: number;
  swapsCompleted: number;
  borrowLends: number;
  followers: number;
  following: number;
};

export type UserProfileBadge = UserBadge & {
  description: string;
  earnedAt?: string;
};

export type UserProfileReview = {
  id: string;
  bookTitle: string;
  bookSlug: string;
  rating: number;
  body: string;
  createdAt: string;
  helpfulCount?: number;
};

export type UserProfileActivity = {
  id: string;
  type: "review" | "listed" | "swap" | "borrow" | "badge";
  title: string;
  description: string;
  createdAt: string;
};

export type UserProfileLocation = {
  district: string;
  area: string;
  serviceArea: string[];
  meetingPreference: string;
  privacyNote: string;
};

export type UserProfile = UserSummary & {
  username: string;
  coverUrl: string;
  bio: string;
  joinedAt: string;
  responseRate: number;
  responseTime: string;
  stats: UserProfileStats;
  profileBadges: UserProfileBadge[];
  locationDetails: UserProfileLocation;
};
