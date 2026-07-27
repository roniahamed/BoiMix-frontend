import * as z from "zod";

export const uploadSchema = z.object({
  isbn: z.string().optional(),
  title: z.string().min(2, "বইয়ের নাম দিন (ন্যূনতম ২ অক্ষর)"),
  author: z.string().min(2, "লেখকের নাম দিন"),
  publisher: z.string().optional(),
  genre: z.string().optional(),
  language: z.string().optional(),
  edition: z.string().optional(),
  pageCount: z.string().optional(),
  description: z.string().optional(),

  // Availability
  availabilityMode: z.enum(["sell", "borrow", "exchange"], {
    error: "অন্তত একটি অপশন নির্বাচন করুন (বিক্রি, এক্সচেঞ্জ অথবা ধার)",
  }),
  originalPrice: z.string().optional(),
  sellPrice: z.string().optional(),
  sellQuantity: z.string().optional(),

  borrowQuantity: z.string().optional(),
  borrowDuration: z.string().optional(),
  deposit: z.string().optional(),
  borrowFee: z.string().optional(),

  exchangeQuantity: z.string().optional(),
  exchangePreference: z.string().optional(),
  estimatedExchangeValue: z.string().optional(),

  // Condition
  condition: z.string().min(1, "বইয়ের অবস্থা নির্বাচন করুন"),

  // Location
  locationType: z.enum(["default", "custom"]),
  locationAddress: z.string().optional(),
  locationLat: z.number().optional(),
  locationLng: z.number().optional(),

  // Additional info
  tags: z.string().optional(),
  editionDetails: z.string().optional(),
  conditionNote: z.string().optional(),
});

export type UploadFormValues = z.infer<typeof uploadSchema>;

export const conditions = [
  { value: "New", label: "New", desc: "Brand new book" },
  { value: "Excellent", label: "Excellent", desc: "Like new, no visible wear" },
  { value: "Good", label: "Good", desc: "Light wear, overall good" },
  { value: "Fair", label: "Fair", desc: "Noticeable wear" },
  { value: "Poor", label: "Poor", desc: "Heavily used" },
];

export const TITLE_OPTIONS = [
  "Atomic Habits",
  "Rivers of Dhaka",
  "Borrowed Light",
  "Pather Panchali",
  "Shesher Kobita",
];

export const AUTHOR_OPTIONS = [
  "James Clear",
  "Nadia Rahman",
  "Rabindranath Tagore",
  "Humayun Ahmed",
  "Kazi Nazrul Islam",
];

export const PUBLISHER_OPTIONS = [
  "Anupam Prokashani",
  "Penguin Random House",
  "Prothoma Prokashan",
  "Anyaprokash",
];

export const GENRE_OPTIONS = [
  "Self Development",
  "Fiction",
  "History",
  "Poetry",
  "Sci-Fi",
];

export const LANGUAGE_OPTIONS = ["Bengali", "English"];
