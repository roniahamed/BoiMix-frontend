"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  BookOpen,
  MapPin,
  CheckCircle2,
  Search,
  Send,
  FileText,
  Repeat2,
  X,
} from "lucide-react";
import Image from "next/image";

import { TagInput } from "@/components/ui/tag-input";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  availabilityMode: z.enum(["sell", "borrow", "swap"], {
    error: "অন্তত একটি অপশন নির্বাচন করুন (বিক্রি, সোয়াপ অথবা ধার)",
  }),
  originalPrice: z.string().optional(),
  sellPrice: z.string().optional(),
  sellQuantity: z.string().optional(),

  borrowQuantity: z.string().optional(),
  borrowDuration: z.string().optional(),
  deposit: z.string().optional(),
  borrowFee: z.string().optional(),

  swapQuantity: z.string().optional(),
  swapPreference: z.string().optional(),
  estimatedSwapValue: z.string().optional(),

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

const SectionTitle = ({ title, desc }: { title: string; desc?: string }) => (
  <div className="mb-4 border-b pb-2">
    <h2 className="text-primary text-xl font-bold">{title}</h2>
    {desc && <p className="text-muted-foreground mt-1 text-sm">{desc}</p>}
  </div>
);

const TITLE_OPTIONS = [
  "Atomic Habits",
  "Rivers of Dhaka",
  "Borrowed Light",
  "Pather Panchali",
  "Shesher Kobita",
];
const AUTHOR_OPTIONS = [
  "James Clear",
  "Nadia Rahman",
  "Rabindranath Tagore",
  "Humayun Ahmed",
  "Kazi Nazrul Islam",
];
const PUBLISHER_OPTIONS = [
  "Penguin Random House",
  "Prothoma",
  "Batighor",
  "Oitijjho",
  "Adarsha",
];
const GENRE_OPTIONS = [
  "Self Help",
  "Productivity",
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Biography",
  "Business",
  "Poetry",
];
const EDITION_OPTIONS = [
  "1st Edition",
  "2nd Edition",
  "Revised Edition",
  "Special Edition",
  "Paperback",
  "Hardcover",
];

export default function BookUploadPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Image states
  const [frontCover, setFrontCover] = useState<File | null>(null);
  const [backCover, setBackCover] = useState<File | null>(null);
  const [insidePages, setInsidePages] = useState<File | null>(null);
  const [tocImage, setTocImage] = useState<File | null>(null);
  const [indexImage, setIndexImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      locationType: "default",
      condition: "Excellent",
    },
  });

  interface LocationSuggestion {
    geometry: {
      coordinates: [number, number];
    };
    properties: {
      name: string;
      street?: string;
      locality?: string;
      city?: string;
      state?: string;
      country?: string;
    };
  }

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<
    LocationSuggestion[]
  >([]);

  const availabilityMode = useWatch({ control, name: "availabilityMode" });
  const forSell = availabilityMode === "sell";
  const forBorrow = availabilityMode === "borrow";
  const forSwap = availabilityMode === "swap";
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
  const swapQuantityWatch = useWatch({ control, name: "swapQuantity" });
  const locationAddressWatch = useWatch({ control, name: "locationAddress" });
  const locationLatWatch = useWatch({ control, name: "locationLat" });
  const locationLngWatch = useWatch({ control, name: "locationLng" });

  useEffect(() => {
    if (
      locationType === "custom" &&
      locationAddressWatch &&
      locationAddressWatch.length > 2
    ) {
      const timer = setTimeout(() => {
        fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(locationAddressWatch)}&lat=23.8103&lon=90.4125&limit=5`,
        )
          .then((res) => res.json())
          .then((data) => {
            if (data && data.features && data.features.length > 0) {
              setLocationSuggestions(data.features);
              setShowSuggestions(true);
            } else {
              setLocationSuggestions([]);
            }
          })
          .catch((err) => console.error("Geocoding error", err));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [locationAddressWatch, locationType]);

  const onSubmit = async (data: UploadFormValues) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log({
      ...data,
      frontCover,
      backCover,
      insidePages,
      tocImage,
      indexImage,
    });
    setIsLoading(false);
    router.push("/books");
  };

  return (
    <div className="bg-muted/10 min-h-screen">
      <div className="boimix-container py-4">
        <div className="mb-6 flex items-center gap-4">
          <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-primary text-2xl font-bold">Add New Book</h1>
            <p className="text-muted-foreground text-sm">
              List your book for sell, swap or borrow
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-24">
          <div className="bg-card space-y-8 rounded-2xl border p-4 shadow-sm md:p-6">
            {/* Upload Photos */}
            <div>
              <SectionTitle
                title="Book Images"
                desc="Upload clear photos of your book"
              />
              <div className="mb-3 grid grid-cols-2 gap-4 md:grid-cols-5">
                <ImageUploader
                  file={frontCover}
                  onChange={setFrontCover}
                  title="Front Cover"
                  required
                  className="aspect-[3/4] md:aspect-auto"
                />
                <ImageUploader
                  file={backCover}
                  onChange={setBackCover}
                  title="Back Cover"
                  className="aspect-[3/4] md:aspect-auto"
                />
                <ImageUploader
                  file={insidePages}
                  onChange={setInsidePages}
                  title="Inside Pages"
                  className="aspect-[3/4] md:aspect-auto"
                />
                <ImageUploader
                  file={tocImage}
                  onChange={setTocImage}
                  title="Table of Contents"
                  className="aspect-[3/4] md:aspect-auto"
                />
                <ImageUploader
                  file={indexImage}
                  onChange={setIndexImage}
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
              <SectionTitle title="Book Information" />
              <div className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>ISBN</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g. 9781847941831"
                        {...register("isbn")}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="text-primary border-primary shrink-0 gap-2"
                      >
                        <Search className="h-4 w-4" /> Auto Fill
                      </Button>
                    </div>
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
                          options={TITLE_OPTIONS}
                          value={field.value || ""}
                          onChange={field.onChange}
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
                          options={AUTHOR_OPTIONS}
                          value={field.value || ""}
                          onChange={field.onChange}
                          placeholder="e.g. James Clear"
                          className={errors.author ? "border-destructive" : ""}
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
                          options={PUBLISHER_OPTIONS}
                          value={field.value || ""}
                          onChange={field.onChange}
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
                          options={GENRE_OPTIONS}
                          value={field.value || ""}
                          onChange={field.onChange}
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || undefined}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Bengali">Bengali</SelectItem>
                          </SelectContent>
                        </Select>
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
                          options={EDITION_OPTIONS}
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
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value || undefined}
                      className="flex w-full flex-row gap-4"
                    >
                      <label
                        className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border p-4 transition-colors ${field.value === "sell" ? "border-primary bg-primary/5 text-primary" : "hover:bg-muted"}`}
                      >
                        <RadioGroupItem value="sell" className="sr-only" />
                        <span className="font-medium">Sell</span>
                      </label>
                      <label
                        className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border p-4 transition-colors ${field.value === "borrow" ? "border-primary bg-primary/5 text-primary" : "hover:bg-muted"}`}
                      >
                        <RadioGroupItem value="borrow" className="sr-only" />
                        <span className="font-medium">Borrow</span>
                      </label>
                      <label
                        className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border p-4 transition-colors ${field.value === "swap" ? "border-primary bg-primary/5 text-primary" : "hover:bg-muted"}`}
                      >
                        <RadioGroupItem value="swap" className="sr-only" />
                        <span className="font-medium">Swap</span>
                      </label>
                    </RadioGroup>
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

                {forSwap && (
                  <div className="animate-in fade-in zoom-in-95 bg-muted/20 w-full rounded-xl border p-5 duration-200">
                    <div className="grid items-start gap-6 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold">
                          Swap Quantity{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          type="number"
                          placeholder="e.g. 1"
                          {...register("swapQuantity")}
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold">
                          Estimated Swap Value (৳)
                        </Label>
                        <Input
                          type="number"
                          placeholder="e.g. 300"
                          {...register("estimatedSwapValue")}
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold">
                          Swap Preference Categories{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Controller
                          control={control}
                          name="swapPreference"
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
            <div>
              <SectionTitle
                title="Condition"
                desc="Select the condition of your book"
              />
              <Controller
                control={control}
                name="condition"
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value || "Excellent"}
                    className="grid gap-3 sm:grid-cols-2 md:grid-cols-5"
                  >
                    {conditions.map((c) => (
                      <div
                        key={c.value}
                        className={`hover:bg-muted/50 relative flex items-start gap-3 rounded-xl border p-3 transition-colors ${field.value === c.value ? "border-primary bg-primary/5" : ""}`}
                      >
                        <RadioGroupItem
                          value={c.value}
                          id={`condition-${c.value}`}
                          className="mt-1"
                        />
                        <Label
                          htmlFor={`condition-${c.value}`}
                          className="flex flex-1 cursor-pointer flex-row flex-wrap items-center gap-x-2 gap-y-0.5"
                        >
                          <span
                            className={`text-sm font-semibold ${field.value === c.value ? "text-primary" : ""}`}
                          >
                            {c.label}
                          </span>
                          <span className="text-muted-foreground text-xs leading-tight">
                            {c.desc}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* Location */}
            <div>
              <SectionTitle title="Location" desc="Choose your book location" />
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <Controller
                    control={control}
                    name="locationType"
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value || "default"}
                        className="flex flex-col gap-3"
                      >
                        <div
                          className={`relative flex items-center gap-3 rounded-xl border p-3 ${field.value === "default" ? "border-primary bg-primary/5" : ""}`}
                        >
                          <RadioGroupItem value="default" id="loc-default" />
                          <Label
                            htmlFor="loc-default"
                            className="flex flex-1 cursor-pointer flex-row items-center gap-2"
                          >
                            <span
                              className={`block text-sm font-semibold ${field.value === "default" ? "text-primary" : ""}`}
                            >
                              Use Profile Default Location
                            </span>
                          </Label>
                        </div>
                        <div
                          className={`relative flex items-start gap-3 rounded-xl border p-3 ${field.value === "custom" ? "border-primary bg-primary/5" : ""}`}
                        >
                          <RadioGroupItem
                            value="custom"
                            id="loc-custom"
                            className="mt-1"
                          />
                          <div className="w-full">
                            <Label
                              htmlFor="loc-custom"
                              className="mb-2 block cursor-pointer"
                            >
                              <span
                                className={`block text-sm font-semibold ${field.value === "custom" ? "text-primary" : ""}`}
                              >
                                Use Different Location
                              </span>
                            </Label>
                            {field.value === "custom" && (
                              <div className="relative">
                                <Input
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
                                  locationSuggestions.length > 0 && (
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
                                      {locationSuggestions.map((sug, i) => (
                                        <div
                                          key={i}
                                          className="hover:bg-muted cursor-pointer px-4 py-2 text-sm"
                                          onMouseDown={(e) => {
                                            e.preventDefault();
                                            const props = sug.properties || {};
                                            const rawAddressParts = [
                                              props.name,
                                              props.street,
                                              props.locality,
                                              props.city,
                                              props.state,
                                              props.country,
                                            ].filter(Boolean);
                                            const address = Array.from(
                                              new Set(rawAddressParts),
                                            ).join(", ");
                                            setValue(
                                              "locationAddress",
                                              address,
                                              { shouldValidate: true },
                                            );
                                            setValue(
                                              "locationLat",
                                              sug.geometry.coordinates[1],
                                            );
                                            setValue(
                                              "locationLng",
                                              sug.geometry.coordinates[0],
                                            );
                                            setShowSuggestions(false);
                                          }}
                                        >
                                          <div className="font-medium">
                                            {sug.properties.name ||
                                              sug.properties.street ||
                                              sug.properties.locality ||
                                              "Unknown Location"}
                                          </div>
                                          <div className="text-muted-foreground text-xs">
                                            {Array.from(
                                              new Set(
                                                [
                                                  sug.properties.street,
                                                  sug.properties.locality,
                                                  sug.properties.city,
                                                  sug.properties.state,
                                                  sug.properties.country,
                                                ].filter(Boolean),
                                              ),
                                            ).join(", ")}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                              </div>
                            )}
                          </div>
                        </div>
                      </RadioGroup>
                    )}
                  />
                </div>

                <div className="bg-muted/20 relative h-[200px] w-full overflow-hidden rounded-xl border md:h-auto">
                  <LocationMap
                    lat={locationLatWatch}
                    lng={locationLngWatch}
                    onChange={(lat, lng) => {
                      if (locationType === "custom") {
                        setValue("locationLat", lat);
                        setValue("locationLng", lng);
                        fetch(
                          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
                        )
                          .then((res) => res.json())
                          .then((data) => {
                            if (data && data.address) {
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
                  <Label className="text-xs">Tags</Label>
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
                <div className="space-y-2">
                  <Label className="text-xs">Book Condition Note</Label>
                  <Input
                    placeholder="Any additional note about the condition"
                    {...register("conditionNote")}
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            <div>
              <SectionTitle title="Preview" />
              <div className="grid gap-5 md:grid-cols-[1.5fr_1fr]">
                {/* Mock Card Preview */}
                <div className="bg-card/50 flex items-start gap-4 rounded-xl border p-4">
                  <div className="bg-muted relative h-32 w-24 shrink-0 overflow-hidden rounded border">
                    {frontCover ? (
                      <Image
                        src={URL.createObjectURL(frontCover)}
                        alt="Preview"
                        fill
                        className="object-cover"
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
                        {titleWatch || "Atomic Habits"}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {authorWatch || "James Clear"}
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
                      {forSwap && (
                        <span className="border-warning text-warning rounded-full border px-2 py-0.5 text-[10px] font-medium">
                          Swap
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
                      {forSwap && (
                        <div className="text-muted-foreground flex items-center gap-1">
                          <Repeat2 className="h-3 w-3" />{" "}
                          {swapQuantityWatch || "2"} available
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
                      <CheckCircle2 className="text-primary h-4 w-4" /> Set fair
                      price
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="text-primary h-4 w-4" /> Respond
                      quickly to messages
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Actions */}
          <div
            className="bg-card fixed right-0 bottom-[var(--bottom-offset)] left-0 z-40 border-t md:relative md:bottom-0 md:z-auto md:border-none md:bg-transparent md:p-0 md:shadow-none"
            style={
              {
                "--bottom-offset":
                  "calc(64px + max(12px, env(safe-area-inset-bottom)))",
              } as React.CSSProperties
            }
          >
            <div className="md:boimix-container flex w-full flex-row md:justify-end md:gap-4">
              <Button
                type="button"
                variant="outline"
                className="text-primary border-primary h-14 flex-1 rounded-none border-y-0 border-r border-l-0 md:h-10 md:w-auto md:flex-none md:rounded-md md:border"
              >
                <FileText className="mr-2 h-4 w-4" /> Save Draft
              </Button>
              <Button
                type="submit"
                className="h-14 flex-1 rounded-none md:h-10 md:w-auto md:flex-none md:rounded-md"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Publishing..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Publish Book
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
