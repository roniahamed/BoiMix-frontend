export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  books: {
    all: ["books"] as const,
    search: (params: unknown) => ["books", "search", params] as const,
    detail: (slug: string) => ["books", "detail", slug] as const,
  },
  notifications: {
    all: ["notifications"] as const,
  },
} as const;
