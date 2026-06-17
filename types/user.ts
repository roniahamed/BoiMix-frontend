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
