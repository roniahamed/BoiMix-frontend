"use client";

import { useState } from "react";
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
  Tag,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    required_error: "অন্তত একটি অপশন নির্বাচন করুন (বিক্রি, সোয়াপ অথবা ধার)",
  }),
  sellPrice: z.string().optional(),
  sellQuantity: z.string().optional(),

  borrowQuantity: z.string().optional(),
  borrowDuration: z.string().optional(),
  deposit: z.string().optional(),

  swapQuantity: z.string().optional(),
  swapPreference: z.string().optional(),

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
                You can upload up to 10 images (JPG, PNG • Max 5MB each)
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
                    <Input
                      placeholder="e.g. Atomic Habits"
                      {...register("title")}
                      className={errors.title ? "border-destructive" : ""}
                    />
                    {errors.title && (
                      <p className="text-destructive text-xs">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Author *</Label>
                    <Input
                      placeholder="e.g. James Clear"
                      {...register("author")}
                      className={errors.author ? "border-destructive" : ""}
                    />
                    {errors.author && (
                      <p className="text-destructive text-xs">
                        {errors.author.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Publisher</Label>
                    <Input
                      placeholder="e.g. Penguin Random House"
                      {...register("publisher")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Genre</Label>
                    <Controller
                      control={control}
                      name="genre"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || undefined}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Genre" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Self Help">Self Help</SelectItem>
                            <SelectItem value="Productivity">
                              Productivity
                            </SelectItem>
                            <SelectItem value="Fiction">Fiction</SelectItem>
                          </SelectContent>
                        </Select>
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
                          <SelectTrigger>
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
                    <Input
                      placeholder="e.g. 1st Edition"
                      {...register("edition")}
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
                desc="(Select all that apply)"
              />
              <div className="grid gap-4 md:grid-cols-3">
                {/* Sell Card */}
                <div
                  className={`cursor-pointer rounded-xl border p-4 transition-colors ${forSell ? "border-success bg-success/5" : "hover:bg-muted/50"}`}
                  onClick={() =>
                    setValue("availabilityMode", "sell", {
                      shouldValidate: true,
                    })
                  }
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="bg-success/10 text-success flex h-8 w-8 items-center justify-center rounded-full">
                        <Tag className="fill-success h-4 w-4" />
                      </div>
                      <div>
                        <h3
                          className={`font-semibold ${forSell ? "text-success" : ""}`}
                        >
                          Sell
                        </h3>
                        <p className="text-muted-foreground mt-0.5 text-xs">
                          List this book for sale
                        </p>
                      </div>
                    </div>
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${forSell ? "border-success bg-success text-white" : "border-muted-foreground/30"}`}
                    >
                      {forSell && <CheckCircle2 className="h-4 w-4" />}
                    </div>
                  </div>

                  {forSell && (
                    <div
                      className="animate-in fade-in zoom-in-95 mt-6 space-y-4 duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold">
                          Selling Price (৳){" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          type="number"
                          placeholder="450"
                          {...register("sellPrice")}
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold">
                          Quantity <span className="text-destructive">*</span>
                        </Label>
                        <div className="bg-background flex h-10 w-[120px] items-center overflow-hidden rounded-md border">
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
                  )}
                </div>

                {/* Borrow Card */}
                <div
                  className={`cursor-pointer rounded-xl border p-4 transition-colors ${forBorrow ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
                  onClick={() =>
                    setValue("availabilityMode", "borrow", {
                      shouldValidate: true,
                    })
                  }
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full">
                        <BookOpen className="fill-primary h-4 w-4" />
                      </div>
                      <div>
                        <h3
                          className={`font-semibold ${forBorrow ? "text-primary" : ""}`}
                        >
                          Borrow
                        </h3>
                        <p className="text-muted-foreground mt-0.5 text-xs">
                          Allow others to borrow
                        </p>
                      </div>
                    </div>
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${forBorrow ? "border-primary bg-primary text-white" : "border-muted-foreground/30"}`}
                    >
                      {forBorrow && <CheckCircle2 className="h-4 w-4" />}
                    </div>
                  </div>

                  {forBorrow && (
                    <div
                      className="animate-in fade-in zoom-in-95 mt-6 space-y-4 duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold">
                          Borrow Quantity{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          type="number"
                          placeholder="3"
                          {...register("borrowQuantity")}
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold">
                          Borrow Duration{" "}
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
                              <SelectTrigger className="bg-background">
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
                            placeholder="300"
                            className="bg-background pl-7"
                            {...register("deposit")}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Swap Card */}
                <div
                  className={`cursor-pointer rounded-xl border p-4 transition-colors ${forSwap ? "border-warning bg-warning/5" : "hover:bg-muted/50"}`}
                  onClick={() =>
                    setValue("availabilityMode", "swap", {
                      shouldValidate: true,
                    })
                  }
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="bg-warning/10 text-warning flex h-8 w-8 items-center justify-center rounded-full">
                        <Repeat2 className="h-4 w-4" />
                      </div>
                      <div>
                        <h3
                          className={`font-semibold ${forSwap ? "text-warning" : ""}`}
                        >
                          Swap
                        </h3>
                        <p className="text-muted-foreground mt-0.5 text-xs">
                          Swap this book
                        </p>
                      </div>
                    </div>
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${forSwap ? "border-warning bg-warning text-white" : "border-muted-foreground/30"}`}
                    >
                      {forSwap && <CheckCircle2 className="h-4 w-4" />}
                    </div>
                  </div>

                  {forSwap && (
                    <div className="animate-in fade-in zoom-in-95 mt-6 space-y-4 duration-200">
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold">
                          Swap Quantity{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          type="number"
                          placeholder="2"
                          {...register("swapQuantity")}
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold">
                          Swap Preference
                        </Label>
                        <Controller
                          control={control}
                          name="swapPreference"
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value || undefined}
                            >
                              <SelectTrigger className="bg-background">
                                <SelectValue placeholder="Any Book" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Any">Any Book</SelectItem>
                                <SelectItem value="Fiction">
                                  Fiction only
                                </SelectItem>
                                <SelectItem value="Same Value">
                                  Same Value
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div>
                  )}
                </div>
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
                          className="flex-1 cursor-pointer"
                        >
                          <p
                            className={`text-sm font-semibold ${field.value === c.value ? "text-primary" : ""}`}
                          >
                            {c.label}
                          </p>
                          <p className="text-muted-foreground mt-0.5 text-xs leading-tight">
                            {c.desc}
                          </p>
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
                            className="flex-1 cursor-pointer"
                          >
                            <span
                              className={`block text-sm font-semibold ${field.value === "default" ? "text-primary" : ""}`}
                            >
                              Use Profile Default Location
                            </span>
                            <span className="text-muted-foreground text-xs">
                              Mirpur 10, Dhaka
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
                              <div className="mt-4 space-y-4">
                                <Input
                                  placeholder="Enter new address..."
                                  {...register("locationAddress")}
                                  className="bg-background"
                                />
                                <div className="space-y-2">
                                  <Label className="text-muted-foreground block text-xs font-semibold">
                                    Pin on Map (Optional)
                                  </Label>
                                  <LocationMap
                                    lat={getValues("locationLat")}
                                    lng={getValues("locationLng")}
                                    onChange={(lat, lng) => {
                                      setValue("locationLat", lat);
                                      setValue("locationLng", lng);
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </RadioGroup>
                    )}
                  />
                </div>

                <div className="bg-muted relative flex h-full min-h-[140px] w-full items-center justify-center overflow-hidden rounded-xl border">
                  <Image
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800"
                    alt="Map"
                    fill
                    className="object-cover opacity-50"
                  />
                  <MapPin className="text-primary relative z-10 h-8 w-8 drop-shadow-md" />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <SectionTitle title="Additional Information (Optional)" />
              <div className="grid gap-5 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label className="text-xs">Tags</Label>
                  <Input
                    placeholder="e.g. Motivational, Best Seller..."
                    {...register("tags")}
                  />
                  <p className="text-muted-foreground text-xs">
                    Press Enter to add tags
                  </p>
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
          <div className="bg-background/80 fixed right-0 bottom-0 left-0 z-50 border-t p-4 shadow-lg backdrop-blur-md md:relative md:border-none md:bg-transparent md:p-0 md:shadow-none">
            <div className="boimix-container flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                className="text-primary border-primary w-full min-w-[140px] md:w-auto"
              >
                <FileText className="mr-2 h-4 w-4" /> Save Draft
              </Button>
              <Button
                type="submit"
                className="w-full min-w-[160px] md:w-auto"
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
