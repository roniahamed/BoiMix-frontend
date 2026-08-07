"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  BookOpen,
  MapPin,
  CheckCircle2,
  Send,
  Repeat2,
  X,
  Wand2,
} from "lucide-react";
import Image from "next/image";

import { TagInput } from "@/components/ui/tag-input";
import { apiRequest } from "@/lib/api/client";
import { searchLocation, reverseGeocode } from "@/lib/api-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {} from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreatableCombobox } from "@/components/ui/creatable-combobox";
import { ImageUploader } from "@/components/shared/image-uploader";

const LocationMap = dynamic(() => import("@/components/shared/location-map"), {
  ssr: false,
  loading: () => (
    <div className="bg-muted flex h-[300px] w-full animate-pulse items-center justify-center rounded-xl">
      <MapPin className="text-muted-foreground h-8 w-8 opacity-50" />
    </div>
  ),
});

const uploadSchema = z.object({
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

type UploadFormValues = z.infer<typeof uploadSchema>;

const conditions = [
  { value: "New", label: "New", desc: "Brand new book" },
  { value: "Excellent", label: "Excellent", desc: "Like new, no visible wear" },
  { value: "Good", label: "Good", desc: "Light wear, overall good" },
  { value: "Fair", label: "Fair", desc: "Noticeable wear" },
  { value: "Poor", label: "Poor", desc: "Heavily used" },
];

const SectionTitle = ({
  title,
  desc,
  icon: Icon,
  step,
}: {
  title: string;
  desc?: string;
  icon?: React.ElementType;
  step?: number;
}) => (
  <div className="border-border/60 mb-5 flex items-center gap-3 border-b pb-3">
    {step && (
      <div className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-xl text-xs font-black">
        {step}
      </div>
    )}
    {Icon && !step && (
      <div className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-xl">
        <Icon className="size-4" />
      </div>
    )}
    <div>
      <h2 className="text-foreground text-lg font-extrabold tracking-tight sm:text-xl">
        {title}
      </h2>
      {desc && <p className="text-muted-foreground mt-0.5 text-xs">{desc}</p>}
    </div>
  </div>
);

const QUICK_FILL_BOOKS: Record<
  string,
  {
    title: string;
    author: string;
    publisher: string;
    genre: string;
    edition: string;
    pageCount: string;
    description: string;
    isbn: string;
    originalPrice: string;
    sellPrice: string;
    condition: string;
  }
> = {
  "atomic-habits": {
    title: "Atomic Habits",
    author: "James Clear",
    publisher: "Penguin Random House",
    genre: "Self Help",
    edition: "1st Edition",
    pageCount: "320",
    description:
      "An easy & proven way to build good habits & break bad ones. Very practical and actionable insights for daily life.",
    isbn: "9781847941831",
    originalPrice: "650",
    sellPrice: "450",
    condition: "Excellent",
  },
  "pather-panchali": {
    title: "Pather Panchali",
    author: "Bibhutibhushan Bandyopadhyay",
    publisher: "Ananda Publishers",
    genre: "Fiction",
    edition: "Special Edition",
    pageCount: "380",
    description:
      "Classic Bengali masterpiece capturing the rural life and childhood experiences of Apu and Durga.",
    isbn: "9788172151608",
    originalPrice: "400",
    sellPrice: "250",
    condition: "Good",
  },
  "shesher-kobita": {
    title: "Shesher Kobita",
    author: "Rabindranath Tagore",
    publisher: "Visva-Bharati",
    genre: "Fiction",
    edition: "1st Edition",
    pageCount: "220",
    description:
      "A poetic novel by Rabindranath Tagore exploring romantic idealism and intellectual love in Shillong.",
    isbn: "9788175224323",
    originalPrice: "350",
    sellPrice: "220",
    condition: "Excellent",
  },
  "programming-basics": {
    title: "Programming Basics in C",
    author: "Tamim Shahriar Subeen",
    publisher: "Adarsha",
    genre: "Science Fiction",
    edition: "2nd Edition",
    pageCount: "250",
    description:
      "The most popular beginner-friendly programming book in Bengali for computer science students and hobbyists.",
    isbn: "9789849045512",
    originalPrice: "300",
    sellPrice: "200",
    condition: "New",
  },
};

export function UploadBookForm({
  formId,
  showActions = true,
  onSuccess,
}: {
  formId?: string;
  showActions?: boolean;
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const duplicateId = searchParams.get("duplicate");

  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(
    !!(editId || duplicateId),
  );
  const [autofillMessage, setAutofillMessage] = useState<string | null>(null);

  const [titleOptions, setTitleOptions] = useState<string[]>([]);
  const [authorOptions, setAuthorOptions] = useState<string[]>([]);
  const [publisherOptions, setPublisherOptions] = useState<string[]>([]);
  const [genreOptions, setGenreOptions] = useState<string[]>([]);
  const [languageOptions, setLanguageOptions] = useState<string[]>([
    "English",
    "Bengali",
  ]);
  const [isbnOptions, setIsbnOptions] = useState<string[]>([]);

  // Image states
  const [frontCover, setFrontCover] = useState<File | null>(null);
  const [frontCoverUrl, setFrontCoverUrl] = useState<string | null>(null);
  const [backCover, setBackCover] = useState<File | null>(null);
  const [backCoverUrl, setBackCoverUrl] = useState<string | null>(null);
  const [insidePages, setInsidePages] = useState<File | null>(null);
  const [insidePagesUrl, setInsidePagesUrl] = useState<string | null>(null);
  const [tocImage, setTocImage] = useState<File | null>(null);
  const [tocImageUrl, setTocImageUrl] = useState<string | null>(null);
  const [indexImage, setIndexImage] = useState<File | null>(null);
  const [indexImageUrl, setIndexImageUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      locationType: "default",
      condition: "Excellent",
    },
  });

  useEffect(() => {
    const idToFetch = editId || duplicateId;
    if (idToFetch) {
      setIsFetchingData(true);
      apiRequest<any>({
        url: `/books/${idToFetch}/`,
        method: "GET",
      })
        .then((responseData) => {
          const data = responseData.book || responseData;
          if (data.title) setValue("title", data.title);
          if (data.author) setValue("author", data.author);
          if (data.publisher) setValue("publisher", data.publisher);
          if (data.genre) setValue("genre", data.genre);
          if (data.language) setValue("language", data.language);
          if (data.edition) setValue("edition", data.edition);
          if (data.pages != null) setValue("pageCount", data.pages.toString());
          if (data.description) setValue("description", data.description);
          if (data.isbn) setValue("isbn", data.isbn);
          // tags mapped to comma separated
          if (data.tags) setValue("tags", data.tags.join(", "));
          if (data.condition) setValue("condition", data.condition);
          if (data.conditionNote) setValue("conditionNote", data.conditionNote);
          if (data.editionDetails)
            setValue("editionDetails", data.editionDetails);

          if (data.price != null) setValue("sellPrice", data.price.toString());
          if (data.original_price != null)
            setValue("originalPrice", data.original_price.toString());
          if (data.exchange_price != null)
            setValue("estimatedExchangeValue", data.exchange_price.toString());
          if (data.estimatedExchangeValue != null)
            setValue(
              "estimatedExchangeValue",
              data.estimatedExchangeValue.toString(),
            );

          if (data.borrow_fee != null)
            setValue("borrowFee", data.borrow_fee.toString());
          if (data.deposit != null)
            setValue("deposit", data.deposit.toString());
          if (data.max_borrow_days != null)
            setValue("borrowDuration", data.max_borrow_days.toString());

          if (data.exchangePreferences && data.exchangePreferences.length > 0) {
            setValue("exchangePreference", data.exchangePreferences[0]);
          }

          if (data.locationType)
            setValue("locationType", data.locationType as any);
          if (data.locationAddress) {
            setValue("locationAddress", data.locationAddress);
            setTimeout(() => {
              const el = document.getElementById(
                "location-address-input",
              ) as HTMLInputElement;
              if (el) el.scrollLeft = 0;
            }, 100);
          }
          if (data.locationLat) setValue("locationLat", data.locationLat);
          if (data.locationLng) setValue("locationLng", data.locationLng);

          // Use availability object to determine mode and quantities
          if (data.availabilityMode) {
            setValue("availabilityMode", data.availabilityMode as any);
          } else if (data.availability) {
            if (data.availability.sell > 0)
              setValue("availabilityMode", "sell");
            else if (data.availability.borrow > 0)
              setValue("availabilityMode", "borrow");
            else if (data.availability.exchange > 0)
              setValue("availabilityMode", "exchange");
          }
          if (data.availability) {
            if (data.availability.sell > 0)
              setValue("sellQuantity", data.availability.sell.toString());
            if (data.availability.borrow > 0)
              setValue("borrowQuantity", data.availability.borrow.toString());
            if (data.availability.exchange > 0)
              setValue(
                "exchangeQuantity",
                data.availability.exchange.toString(),
              );
          }
          if (data.images && data.images.length > 0) {
            const frontCoverImg = data.images.find(
              (img: any) =>
                img.type === "frontCover" || img.type === "frontCoverUrl",
            );
            if (frontCoverImg) setFrontCoverUrl(frontCoverImg.src);
            else if (data.coverUrl) setFrontCoverUrl(data.coverUrl);

            const backCover = data.images.find(
              (img: any) =>
                img.type === "backCover" || img.type === "backCoverUrl",
            );
            if (backCover) setBackCoverUrl(backCover.src);

            const insidePages = data.images.find(
              (img: any) =>
                img.type === "insidePages" || img.type === "insidePagesUrl",
            );
            if (insidePages) setInsidePagesUrl(insidePages.src);

            const tocImage = data.images.find(
              (img: any) =>
                img.type === "tocImage" || img.type === "tocImageUrl",
            );
            if (tocImage) setTocImageUrl(tocImage.src);

            const indexImage = data.images.find(
              (img: any) =>
                img.type === "indexImage" || img.type === "indexImageUrl",
            );
            if (indexImage) setIndexImageUrl(indexImage.src);
          } else if (data.coverUrl) {
            setFrontCoverUrl(data.coverUrl);
          }

          setAutofillMessage(
            editId
              ? `Editing details for "${data.title}"`
              : `Duplicating "${data.title}"`,
          );
        })
        .catch((err) => {
          toast.error("Failed to load listing details");
          console.error(err);
        })
        .finally(() => {
          setIsFetchingData(false);
        });
    }
  }, [editId, duplicateId, setValue]);

  const fetchSuggestions = useCallback(
    (q: string, type: string, setter: (opts: string[]) => void) => {
      const queryParam = q ? encodeURIComponent(q.trim()) : "";
      apiRequest<any>({
        url: `/search/suggestions/?q=${queryParam}&type=${type}`,
        method: "GET",
      })
        .then((data) => {
          if (data.suggestions) {
            setter(data.suggestions);
          }
        })
        .catch((err) => {
          if (err?.status !== 429) {
            console.error(err);
          }
        });
    },
    [],
  );

  const handleTitleSelect = useCallback(
    (newTitle: string) => {
      if (!newTitle || !newTitle.trim()) return;

      apiRequest<any>({
        url: `/books/details-by-title/?title=${encodeURIComponent(newTitle.trim())}`,
        method: "GET",
      })
        .then((data) => {
          if (data.author)
            setValue("author", data.author, { shouldValidate: true });
          if (data.publisher)
            setValue("publisher", data.publisher, { shouldValidate: true });
          if (data.genre)
            setValue("genre", data.genre, { shouldValidate: true });
          if (data.isbn) setValue("isbn", data.isbn, { shouldValidate: true });
          if (data.pages)
            setValue("pageCount", data.pages.toString(), {
              shouldValidate: true,
            });
          if (data.description)
            setValue("description", data.description, { shouldValidate: true });
          if (data.coverUrl) setFrontCoverUrl(data.coverUrl);

          setAutofillMessage(
            `✨ Auto-filled book details for "${data.title || newTitle}"!`,
          );
          setTimeout(() => setAutofillMessage(null), 5000);
        })
        .catch(() => {});
    },
    [setValue],
  );

  const handleIsbnSelect = useCallback(
    (newIsbn: string) => {
      if (!newIsbn || !newIsbn.trim()) return;

      setIsLoading(true);
      apiRequest<any>({
        url: `/books/isbn/${encodeURIComponent(newIsbn.trim())}/`,
        method: "GET",
      })
        .then((data) => {
          if (data.title)
            setValue("title", data.title, { shouldValidate: true });
          if (data.author)
            setValue("author", data.author, { shouldValidate: true });
          if (data.publisher)
            setValue("publisher", data.publisher, { shouldValidate: true });
          if (data.genre)
            setValue("genre", data.genre, { shouldValidate: true });
          if (data.pages)
            setValue("pageCount", data.pages.toString(), {
              shouldValidate: true,
            });
          if (data.description)
            setValue("description", data.description, { shouldValidate: true });
          if (data.coverUrl) setFrontCoverUrl(data.coverUrl);

          setAutofillMessage(`✨ Auto-filled details for ISBN "${newIsbn}"!`);
          setTimeout(() => setAutofillMessage(null), 5000);
        })
        .catch(() => {
          setAutofillMessage("❌ No details found for this ISBN.");
          setTimeout(() => setAutofillMessage(null), 3000);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [setValue],
  );

  useEffect(() => {
    apiRequest<any>({ url: "/books/filters/", method: "GET" })
      .then((data) => {
        setAuthorOptions(data.authors?.map((a: any) => a.label) || []);
        setPublisherOptions(data.publishers?.map((p: any) => p.label) || []);
        setGenreOptions(data.categories?.map((c: any) => c.label) || []);
        setLanguageOptions(
          data.languages?.map((l: any) => l.label) || ["English", "Bengali"],
        );
      })
      .catch(console.error);

    fetchSuggestions("", "title", setTitleOptions);
    fetchSuggestions("", "isbn", setIsbnOptions);
  }, [fetchSuggestions]);

  const handleIsbnAutoFill = async () => {
    const currentIsbn = getValues("isbn");
    if (!currentIsbn) {
      setAutofillMessage("⚠️ Please enter an ISBN first.");
      setTimeout(() => setAutofillMessage(null), 3000);
      return;
    }

    setIsLoading(true);
    try {
      const data = await apiRequest<any>({
        url: `/books/isbn/${currentIsbn}/`,
        method: "GET",
      });

      setValue("title", data.title || "", { shouldValidate: true });
      setValue("author", data.author || "", { shouldValidate: true });
      setValue("publisher", data.publisher || "", { shouldValidate: true });
      setValue("genre", data.genre || "", { shouldValidate: true });
      setValue("pageCount", data.pages ? data.pages.toString() : "", {
        shouldValidate: true,
      });
      setValue("description", data.description || "", { shouldValidate: true });
      if (data.coverUrl) setFrontCoverUrl(data.coverUrl);

      setAutofillMessage(`✨ Auto-filled book details for "${data.title}"!`);
      setTimeout(() => setAutofillMessage(null), 5000);
    } catch (err) {
      setAutofillMessage("❌ No matching book found for this ISBN.");
      setTimeout(() => setAutofillMessage(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  interface LocationSuggestion {
    display_name: string;
    lat: number;
    lng: number;
  }

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<
    LocationSuggestion[]
  >([]);
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);

  const availabilityMode = useWatch({ control, name: "availabilityMode" });
  const forSell = availabilityMode === "sell";
  const forBorrow = availabilityMode === "borrow";
  const forExchange = availabilityMode === "exchange";
  const condition = useWatch({ control, name: "condition" });
  const locationType = useWatch({ control, name: "locationType" });
  const descriptionValue = useWatch({
    control,
    name: "description",
    defaultValue: "",
  });

  // Preview watchers
  const titleWatch = useWatch({ control, name: "title" });
  const authorWatch = useWatch({ control, name: "author" });
  const sellPriceWatch = useWatch({ control, name: "sellPrice" });
  const borrowQuantityWatch = useWatch({ control, name: "borrowQuantity" });
  const exchangeQuantityWatch = useWatch({ control, name: "exchangeQuantity" });
  const locationAddressWatch = useWatch({ control, name: "locationAddress" });
  const locationLatWatch = useWatch({ control, name: "locationLat" });
  const locationLngWatch = useWatch({ control, name: "locationLng" });

  useEffect(() => {
    if (
      locationType === "custom" &&
      locationAddressWatch &&
      locationAddressWatch.length > 2
    ) {
      setIsSearchingLocation(true);

      setShowSuggestions(true);
      const timer = setTimeout(() => {
        searchLocation(locationAddressWatch)
          .then((features) => {
            setLocationSuggestions(features);
            setShowSuggestions(features.length > 0);
          })
          .catch((err) => console.error("Geocoding error", err))
          .finally(() => setIsSearchingLocation(false));
      }, 500);
      return () => {
        clearTimeout(timer);
        setIsSearchingLocation(false);
      };
    }
  }, [locationAddressWatch, locationType]);

  const onSubmit = async (values: UploadFormValues) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (
            value === "" &&
            [
              "originalPrice",
              "exchangePrice",
              "estimatedExchangeValue",
              "borrowFee",
              "deposit",
              "maxBorrowDays",
            ].includes(key)
          ) {
            // Skip empty numeric fields
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      // Append image files if they exist
      if (frontCover) formData.append("frontCover", frontCover);
      else if (frontCoverUrl !== null)
        formData.append("frontCoverUrl", frontCoverUrl);

      if (backCover) formData.append("backCover", backCover);
      else if (backCoverUrl !== null)
        formData.append("backCoverUrl", backCoverUrl);

      if (insidePages) formData.append("insidePages", insidePages);
      else if (insidePagesUrl !== null)
        formData.append("insidePagesUrl", insidePagesUrl);

      if (tocImage) formData.append("tocImage", tocImage);
      else if (tocImageUrl !== null)
        formData.append("tocImageUrl", tocImageUrl);

      if (indexImage) formData.append("indexImage", indexImage);
      else if (indexImageUrl !== null)
        formData.append("indexImageUrl", indexImageUrl);

      const url = editId ? `/books/${editId}/` : "/books/";
      const method = editId ? "PATCH" : "POST";

      await apiRequest({
        url,
        method,
        data: formData,
      });

      toast.success(
        editId
          ? "Listing updated successfully!"
          : "Book published successfully!",
      );
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/dashboard/library");
      }
    } catch (err: any) {
      console.error("Failed to upload book", err);
      let errorMsg = err?.message || "Failed to save book. Please try again.";
      if (err?.details?.locationType) {
        errorMsg = Array.isArray(err.details.locationType)
          ? err.details.locationType[0]
          : err.details.locationType;
        setError("locationType", { type: "manual", message: errorMsg });
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onError = (errors: any) => {
    console.error("Form validation errors:", errors);
    const errorMessages = Object.values(errors)
      .map((err: any) => err?.message)
      .filter(Boolean)
      .join("\n");

    if (errorMessages) {
      toast.error(`Validation failed:\n${errorMessages}`);
    } else {
      toast.error("Please fill all required fields correctly.");
    }
  };

  return (
    <div className="w-full">
      <div className="py-2 sm:py-4">
        <div className="mb-6 flex items-center gap-4">
          <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-primary text-2xl font-bold">
              {editId
                ? "Edit Book Details"
                : duplicateId
                  ? "Duplicate Book"
                  : "Add New Book"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {editId
                ? "Update your listing information"
                : "List your book for sell, exchange or borrow"}
            </p>
          </div>
        </div>

        {isFetchingData ? (
          <div className="bg-card flex h-64 items-center justify-center rounded-2xl border shadow-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
              <p className="text-muted-foreground">Loading details...</p>
            </div>
          </div>
        ) : (
          <form
            id={formId}
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-6 pb-8"
          >
            <div className="bg-card space-y-8 rounded-2xl border p-2 shadow-sm sm:p-4 md:p-6">
              {/* Upload Photos */}
              <div>
                <SectionTitle
                  title="Book Images"
                  desc="Upload clear photos of your book"
                />
                <div className="mb-3 grid grid-cols-2 gap-4 md:grid-cols-5">
                  <ImageUploader
                    file={frontCover}
                    previewUrl={frontCoverUrl || undefined}
                    onChange={(file) => {
                      setFrontCover(file);
                      if (file) setFrontCoverUrl(null);
                      else setFrontCoverUrl("");
                    }}
                    title="Front Cover"
                    required={!frontCoverUrl}
                    className="aspect-[3/4] md:aspect-auto"
                  />
                  <ImageUploader
                    file={backCover}
                    previewUrl={backCoverUrl || undefined}
                    onChange={(file) => {
                      setBackCover(file);
                      if (file) setBackCoverUrl(null);
                      else setBackCoverUrl("");
                    }}
                    title="Back Cover"
                    className="aspect-[3/4] md:aspect-auto"
                  />
                  <ImageUploader
                    file={insidePages}
                    previewUrl={insidePagesUrl || undefined}
                    onChange={(file) => {
                      setInsidePages(file);
                      if (file) setInsidePagesUrl(null);
                      else setInsidePagesUrl("");
                    }}
                    title="Inside Pages"
                    className="aspect-[3/4] md:aspect-auto"
                  />
                  <ImageUploader
                    file={tocImage}
                    previewUrl={tocImageUrl || undefined}
                    onChange={(file) => {
                      setTocImage(file);
                      if (file) setTocImageUrl(null);
                      else setTocImageUrl("");
                    }}
                    title="Table of Contents"
                    className="aspect-[3/4] md:aspect-auto"
                  />
                  <ImageUploader
                    file={indexImage}
                    previewUrl={indexImageUrl || undefined}
                    onChange={(file) => {
                      setIndexImage(file);
                      if (file) setIndexImageUrl(null);
                      else setIndexImageUrl("");
                    }}
                    title="Index (if any)"
                    className="aspect-[3/4] md:aspect-auto"
                  />
                </div>
                <p className="text-muted-foreground mt-4 text-xs font-medium">
                  You can upload up to 5 images (JPG, PNG • Max 5MB each)
                </p>
              </div>

              {/* Book Information */}
              <div>
                <SectionTitle
                  title="Book Information"
                  desc="Provide basic details for your book"
                  icon={BookOpen}
                />

                {autofillMessage && (
                  <div className="bg-primary/15 text-primary animate-in fade-in mb-4 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold">
                    <CheckCircle2 className="size-4 shrink-0" />
                    <span>{autofillMessage}</span>
                  </div>
                )}

                <div className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>ISBN</Label>
                      <Controller
                        control={control}
                        name="isbn"
                        render={({ field }) => (
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <CreatableCombobox
                                options={isbnOptions}
                                value={field.value || ""}
                                onChange={(val) => {
                                  field.onChange(val);
                                  handleIsbnSelect(val);
                                }}
                                onSearchChange={(search) =>
                                  fetchSuggestions(
                                    search,
                                    "isbn",
                                    setIsbnOptions,
                                  )
                                }
                                placeholder="e.g. 9781847941831"
                              />
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleIsbnAutoFill}
                              className="text-primary border-primary shrink-0 gap-2"
                            >
                              <Wand2 className="h-4 w-4" /> Auto Fill
                            </Button>
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Book Title *</Label>
                      <Controller
                        control={control}
                        name="title"
                        render={({ field }) => (
                          <CreatableCombobox
                            options={titleOptions}
                            value={field.value || ""}
                            onChange={(val) => {
                              field.onChange(val);
                              handleTitleSelect(val);
                            }}
                            onSearchChange={(search) =>
                              fetchSuggestions(search, "title", setTitleOptions)
                            }
                            placeholder="e.g. Atomic Habits"
                            className={errors.title ? "border-destructive" : ""}
                          />
                        )}
                      />
                      {errors.title && (
                        <p className="text-destructive text-xs">
                          {errors.title.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Author *</Label>
                      <Controller
                        control={control}
                        name="author"
                        render={({ field }) => (
                          <CreatableCombobox
                            options={authorOptions}
                            value={field.value || ""}
                            onChange={field.onChange}
                            onSearchChange={(search) =>
                              fetchSuggestions(
                                search,
                                "author",
                                setAuthorOptions,
                              )
                            }
                            placeholder="e.g. James Clear"
                            className={
                              errors.author ? "border-destructive" : ""
                            }
                          />
                        )}
                      />
                      {errors.author && (
                        <p className="text-destructive text-xs">
                          {errors.author.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid items-start gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Publisher</Label>
                      <Controller
                        control={control}
                        name="publisher"
                        render={({ field }) => (
                          <CreatableCombobox
                            options={publisherOptions}
                            value={field.value || ""}
                            onChange={field.onChange}
                            onSearchChange={(search) =>
                              fetchSuggestions(
                                search,
                                "publisher",
                                setPublisherOptions,
                              )
                            }
                            placeholder="e.g. Penguin Random House"
                          />
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Genre</Label>
                      <Controller
                        control={control}
                        name="genre"
                        render={({ field }) => (
                          <CreatableCombobox
                            options={genreOptions}
                            value={field.value || ""}
                            onChange={field.onChange}
                            onSearchChange={(search) =>
                              fetchSuggestions(search, "genre", setGenreOptions)
                            }
                            placeholder="Select Genre"
                          />
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Controller
                        control={control}
                        name="language"
                        render={({ field }) => (
                          <CreatableCombobox
                            options={languageOptions}
                            value={field.value || ""}
                            onChange={field.onChange}
                            placeholder="Select Language"
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Edition</Label>
                      <Controller
                        control={control}
                        name="edition"
                        render={({ field }) => (
                          <CreatableCombobox
                            options={[
                              "1st Edition",
                              "2nd Edition",
                              "Revised Edition",
                              "Special Edition",
                              "Paperback",
                              "Hardcover",
                            ]}
                            value={field.value || ""}
                            onChange={field.onChange}
                            placeholder="e.g. 1st Edition"
                          />
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Page Count</Label>
                      <Input
                        type="number"
                        placeholder="e.g. 320"
                        {...register("pageCount")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Tiny Changes, Remarkable Results..."
                      className={`min-h-[100px] ${errors.description ? "border-destructive" : ""}`}
                      {...register("description")}
                    />
                    <div className="mt-1 flex justify-end">
                      <p className="text-muted-foreground text-xs">
                        {descriptionValue?.length || 0}/1000
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div>
                <SectionTitle
                  title="Availability"
                  desc="Choose how you want to offer this book"
                />
                <div className="space-y-6">
                  <Controller
                    control={control}
                    name="availabilityMode"
                    render={({ field }) => (
                      <div className="flex w-full flex-row gap-4">
                        <button
                          type="button"
                          onClick={() => field.onChange("sell")}
                          className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border p-4 transition-colors ${field.value === "sell" ? "border-primary bg-primary/5 text-primary font-bold" : "hover:bg-muted"}`}
                        >
                          <span className="font-medium">Sell</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => field.onChange("borrow")}
                          className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border p-4 transition-colors ${field.value === "borrow" ? "border-primary bg-primary/5 text-primary font-bold" : "hover:bg-muted"}`}
                        >
                          <span className="font-medium">Borrow</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => field.onChange("exchange")}
                          className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border p-4 transition-colors ${field.value === "exchange" ? "border-primary bg-primary/5 text-primary font-bold" : "hover:bg-muted"}`}
                        >
                          <span className="font-medium">Exchange</span>
                        </button>
                      </div>
                    )}
                  />

                  {forSell && (
                    <div className="animate-in fade-in zoom-in-95 bg-muted/20 w-full rounded-xl border p-5 duration-200">
                      <div className="grid items-start gap-6 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold">
                            Original Price (৳)
                          </Label>
                          <Input
                            type="number"
                            placeholder="e.g. 600"
                            {...register("originalPrice")}
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold">
                            Discounted Price (৳){" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            type="number"
                            placeholder="e.g. 450"
                            {...register("sellPrice")}
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold">
                            Quantity <span className="text-destructive">*</span>
                          </Label>
                          <div className="bg-background flex h-10 w-full items-center overflow-hidden rounded-md border">
                            <button
                              type="button"
                              className="hover:bg-muted text-muted-foreground flex h-full items-center justify-center px-3 text-lg transition-colors"
                              onClick={() => {
                                const current = parseInt(
                                  getValues("sellQuantity") || "1",
                                );
                                if (current > 1)
                                  setValue(
                                    "sellQuantity",
                                    (current - 1).toString(),
                                  );
                              }}
                            >
                              -
                            </button>
                            <div className="bg-border h-full w-px" />
                            <input
                              type="number"
                              placeholder="e.g. 1"
                              className="w-full [appearance:textfield] bg-transparent text-center text-sm font-medium outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                              {...register("sellQuantity")}
                            />
                            <div className="bg-border h-full w-px" />
                            <button
                              type="button"
                              className="hover:bg-muted text-muted-foreground flex h-full items-center justify-center px-3 text-lg transition-colors"
                              onClick={() => {
                                const current = parseInt(
                                  getValues("sellQuantity") || "1",
                                );
                                setValue(
                                  "sellQuantity",
                                  (current + 1).toString(),
                                );
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {forBorrow && (
                    <div className="animate-in fade-in zoom-in-95 bg-muted/20 w-full rounded-xl border p-5 duration-200">
                      <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold">
                            Borrow Quantity{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            type="number"
                            placeholder="e.g. 3"
                            {...register("borrowQuantity")}
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold">
                            Max Borrow Duration{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Controller
                            control={control}
                            name="borrowDuration"
                            render={({ field }) => (
                              <Select
                                onValueChange={field.onChange}
                                value={field.value || undefined}
                              >
                                <SelectTrigger className="bg-background w-full">
                                  <SelectValue placeholder="7 days" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="7">7 days</SelectItem>
                                  <SelectItem value="14">14 days</SelectItem>
                                  <SelectItem value="30">30 days</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold">
                            Deposit{" "}
                            <span className="text-muted-foreground font-normal">
                              (Optional)
                            </span>
                          </Label>
                          <div className="relative">
                            <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm font-semibold">
                              ৳
                            </span>
                            <Input
                              type="number"
                              placeholder="e.g. 300"
                              className="bg-background pl-7"
                              {...register("deposit")}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold">
                            Borrow Fee{" "}
                            <span className="text-muted-foreground font-normal">
                              (Optional)
                            </span>
                          </Label>
                          <div className="relative">
                            <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm font-semibold">
                              ৳
                            </span>
                            <Input
                              type="number"
                              placeholder="e.g. 50"
                              className="bg-background pl-7"
                              {...register("borrowFee")}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {forExchange && (
                    <div className="animate-in fade-in zoom-in-95 bg-muted/20 w-full rounded-xl border p-5 duration-200">
                      <div className="grid items-start gap-6 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold">
                            Exchange Quantity{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            type="number"
                            placeholder="e.g. 1"
                            {...register("exchangeQuantity")}
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold">
                            Estimated Exchange Value (৳)
                          </Label>
                          <Input
                            type="number"
                            placeholder="e.g. 300"
                            {...register("estimatedExchangeValue")}
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold">
                            Exchange Preference Categories{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Controller
                            control={control}
                            name="exchangePreference"
                            render={({ field }) => (
                              <CreatableCombobox
                                options={[
                                  "Any Book",
                                  "Fiction only",
                                  "Same Value",
                                  "Academic Books",
                                  "Non-Fiction",
                                  "Self Help",
                                ]}
                                value={field.value || ""}
                                onChange={field.onChange}
                                placeholder="e.g. Any Book"
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {errors.availabilityMode && (
                  <p className="text-destructive mt-3 text-sm">
                    {errors.availabilityMode.message}
                  </p>
                )}
              </div>

              {/* Condition */}
              {availabilityMode !== "borrow" && (
                <div>
                  <SectionTitle
                    title="Condition"
                    desc="Select the condition of your book"
                    icon={CheckCircle2}
                  />
                  <Controller
                    control={control}
                    name="condition"
                    render={({ field }) => (
                      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-5">
                        {conditions.map((c) => {
                          const isSelected = field.value === c.value;
                          return (
                            <button
                              key={c.value}
                              type="button"
                              onClick={() => field.onChange(c.value)}
                              className={`flex items-start gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200 ${
                                isSelected
                                  ? "border-primary bg-primary/5 ring-primary/20 shadow-sm ring-1"
                                  : "hover:border-primary/40 hover:bg-muted/50 border-border/80"
                              }`}
                            >
                              <div
                                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${isSelected ? "border-primary bg-primary" : "border-input bg-background"}`}
                              >
                                {isSelected && (
                                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                                )}
                              </div>
                              <div className="flex flex-1 flex-col gap-1">
                                <span className="text-foreground text-sm font-bold">
                                  {c.label}
                                </span>
                                <span className="text-muted-foreground text-xs leading-relaxed">
                                  {c.desc}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  />
                </div>
              )}

              {/* Location */}
              <div>
                <SectionTitle
                  title="Location"
                  desc="Choose your book location"
                />
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <Controller
                      control={control}
                      name="locationType"
                      render={({ field }) => (
                        <div className="flex flex-col gap-3">
                          <button
                            type="button"
                            onClick={() => field.onChange("default")}
                            className={`relative flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${field.value === "default" ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
                          >
                            <div
                              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${field.value === "default" ? "border-primary bg-primary" : "border-input bg-background"}`}
                            >
                              {field.value === "default" && (
                                <div className="h-1.5 w-1.5 rounded-full bg-white" />
                              )}
                            </div>
                            <span
                              className={`block text-sm font-semibold ${field.value === "default" ? "text-primary" : ""}`}
                            >
                              Use Profile Default Location
                            </span>
                          </button>

                          <div
                            className={`relative flex flex-col gap-2 rounded-xl border p-3 transition-all ${field.value === "custom" ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
                          >
                            <button
                              type="button"
                              onClick={() => field.onChange("custom")}
                              className="flex w-full items-center gap-3 text-left"
                            >
                              <div
                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${field.value === "custom" ? "border-primary bg-primary" : "border-input bg-background"}`}
                              >
                                {field.value === "custom" && (
                                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                                )}
                              </div>
                              <span
                                className={`block text-sm font-semibold ${field.value === "custom" ? "text-primary" : ""}`}
                              >
                                Use Different Location
                              </span>
                            </button>
                            {field.value === "custom" && (
                              <div className="relative">
                                <Input
                                  id="location-address-input"
                                  placeholder="Enter new address..."
                                  {...register("locationAddress")}
                                  className="bg-background mt-2"
                                  onFocus={() => {
                                    if (locationSuggestions.length > 0)
                                      setShowSuggestions(true);
                                  }}
                                  onBlur={() => {
                                    setTimeout(
                                      () => setShowSuggestions(false),
                                      200,
                                    );
                                  }}
                                />
                                {showSuggestions &&
                                  (locationSuggestions.length > 0 ||
                                    isSearchingLocation) && (
                                    <div className="bg-popover absolute z-[1000] mt-1 max-h-[250px] w-full overflow-y-auto rounded-md border shadow-md">
                                      <div className="bg-popover/90 sticky top-0 z-10 flex justify-end border-b p-1 backdrop-blur-sm">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6"
                                          onMouseDown={(e) => {
                                            e.preventDefault();
                                            setShowSuggestions(false);
                                          }}
                                        >
                                          <X className="h-4 w-4" />
                                        </Button>
                                      </div>
                                      {isSearchingLocation ? (
                                        <div className="text-muted-foreground flex items-center justify-center py-6 text-sm">
                                          <div className="border-primary mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                                          Searching for locations...
                                        </div>
                                      ) : (
                                        locationSuggestions.map((sug, i) => (
                                          <div
                                            key={i}
                                            className="hover:bg-muted cursor-pointer px-4 py-2 text-sm"
                                            onMouseDown={(e) => {
                                              e.preventDefault();
                                              setValue(
                                                "locationAddress",
                                                sug.display_name,
                                                { shouldValidate: true },
                                              );
                                              setTimeout(() => {
                                                const el =
                                                  document.getElementById(
                                                    "location-address-input",
                                                  ) as HTMLInputElement;
                                                if (el) el.scrollLeft = 0;
                                              }, 10);
                                              setValue("locationLat", sug.lat);
                                              setValue("locationLng", sug.lng);
                                              setShowSuggestions(false);
                                            }}
                                          >
                                            <div className="font-medium">
                                              {sug.display_name.split(",")[0]}
                                            </div>
                                            <div className="text-muted-foreground text-xs">
                                              {sug.display_name
                                                .split(",")
                                                .slice(1)
                                                .join(",")
                                                .trim()}
                                            </div>
                                          </div>
                                        ))
                                      )}
                                      {!isSearchingLocation &&
                                        locationSuggestions.length === 0 && (
                                          <div className="text-muted-foreground py-4 text-center text-sm">
                                            No locations found
                                          </div>
                                        )}
                                    </div>
                                  )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    />
                    {errors.locationType && (
                      <p className="text-destructive mt-1 text-sm font-medium">
                        {errors.locationType.message}
                      </p>
                    )}
                  </div>

                  <div className="bg-muted/20 relative h-[200px] w-full overflow-hidden rounded-xl border md:h-auto">
                    <LocationMap
                      lat={locationLatWatch}
                      lng={locationLngWatch}
                      onChange={(lat, lng) => {
                        if (locationType === "custom") {
                          setValue("locationLat", lat);
                          setValue("locationLng", lng);
                          reverseGeocode(lat, lng)
                            .then((data) => {
                              if (data && data.display_name) {
                                setValue("locationAddress", data.display_name, {
                                  shouldValidate: true,
                                });
                              } else if (data && data.address) {
                                // Fallback logic just in case
                                const addr = data.address;
                                const parts = [
                                  addr.road,
                                  addr.neighbourhood,
                                  addr.suburb || addr.locality,
                                  addr.city || addr.town || addr.village,
                                  addr.state,
                                  addr.country,
                                ].filter(Boolean);
                                const address = Array.from(new Set(parts)).join(
                                  ", ",
                                );
                                if (address) {
                                  setValue("locationAddress", address, {
                                    shouldValidate: true,
                                  });
                                }
                              }
                            })
                            .catch((err) =>
                              console.error("Reverse geocoding error", err),
                            );
                        }
                      }}
                    />
                    {locationType !== "custom" && (
                      <div
                        className="bg-background/20 absolute inset-0 z-[1000] cursor-not-allowed"
                        title="Select 'Use Different Location' to interact with the map"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <SectionTitle title="Additional Information (Optional)" />
                <div className="grid gap-5 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="text-xs">Tags (SEO Keywords)</Label>
                    <Controller
                      control={control}
                      name="tags"
                      render={({ field }) => (
                        <TagInput
                          value={field.value || ""}
                          onChange={field.onChange}
                          placeholder="e.g. Motivational, Best Seller..."
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Edition Details</Label>
                    <Input
                      placeholder="e.g. Reprint, Special Edition"
                      {...register("editionDetails")}
                    />
                  </div>
                  {availabilityMode !== "borrow" && (
                    <div className="space-y-2">
                      <Label className="text-xs">Book Condition Note</Label>
                      <Input
                        placeholder="Any additional note about the condition"
                        {...register("conditionNote")}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Preview */}
              <div>
                <SectionTitle title="Preview" />
                <div className="grid gap-5 md:grid-cols-[1.5fr_1fr]">
                  {/* Mock Card Preview */}
                  <div className="bg-card/50 flex items-start gap-4 rounded-xl border p-4">
                    <div className="bg-muted relative h-32 w-24 shrink-0 overflow-hidden rounded border">
                      {frontCover || frontCoverUrl ? (
                        <img
                          src={
                            frontCover
                              ? URL.createObjectURL(frontCover)
                              : frontCoverUrl!
                          }
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-muted-foreground flex h-full w-full items-center justify-center p-2 text-center text-xs">
                          Cover Image
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h4 className="text-primary text-lg font-bold">
                          {titleWatch || "Book Title"}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {authorWatch || "Author Name"}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {forSell && (
                          <span className="border-success text-success rounded-full border px-2 py-0.5 text-[10px] font-medium">
                            Sell
                          </span>
                        )}
                        {forBorrow && (
                          <span className="border-primary text-primary rounded-full border px-2 py-0.5 text-[10px] font-medium">
                            Borrow
                          </span>
                        )}
                        {forExchange && (
                          <span className="border-warning text-warning rounded-full border px-2 py-0.5 text-[10px] font-medium">
                            Exchange
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                        {forSell && (
                          <div className="text-success flex items-center gap-1 font-semibold">
                            <span>৳</span> {sellPriceWatch || "450"}
                          </div>
                        )}
                        {forBorrow && (
                          <div className="text-muted-foreground flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />{" "}
                            {borrowQuantityWatch || "3"} available
                          </div>
                        )}
                        {forExchange && (
                          <div className="text-muted-foreground flex items-center gap-1">
                            <Repeat2 className="h-3 w-3" />{" "}
                            {exchangeQuantityWatch || "2"} available
                          </div>
                        )}
                      </div>
                      <div className="text-muted-foreground mt-2 flex items-center justify-between border-t pt-2 text-xs">
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="text-primary h-3 w-3" />{" "}
                          {condition}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="text-primary h-3 w-3" />{" "}
                          {locationType === "default"
                            ? "Mirpur 10, Dhaka"
                            : locationAddressWatch || "Custom Location"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="bg-primary/5 border-primary/10 rounded-xl border p-4">
                    <h4 className="text-primary mb-3 text-sm font-bold">
                      Tips for Better Listing
                    </h4>
                    <ul className="text-muted-foreground space-y-2 text-xs">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="text-primary h-4 w-4" /> Upload
                        clear and original photos
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="text-primary h-4 w-4" /> Add
                        detailed description
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="text-primary h-4 w-4" /> Set
                        fair price
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="text-primary h-4 w-4" />{" "}
                        Respond quickly to messages
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {showActions && (
              <div className="mt-8 flex justify-end pb-10 md:pb-0">
                <Button
                  type="submit"
                  className="h-14 w-full rounded-xl text-base font-medium md:h-12 md:w-auto md:px-10"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    editId ? (
                      "Updating..."
                    ) : (
                      "Publishing..."
                    )
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />{" "}
                      {editId ? "Update Book" : "Publish Book"}
                    </>
                  )}
                </Button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
