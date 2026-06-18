"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
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

const uploadSchema = z
  .object({
    isbn: z.string().optional(),
    title: z.string().min(2, "বইয়ের নাম দিন (ন্যূনতম ২ অক্ষর)"),
    author: z.string().min(2, "লেখকের নাম দিন"),
    publisher: z.string().optional(),
    genre: z.string().optional(),
    language: z.string().optional(),
    edition: z.string().optional(),
    pageCount: z.string().optional(),
    description: z
      .string()
      .min(10, "বই সম্পর্কে অন্তত ১০ অক্ষরের বিবরণ দিন")
      .max(1000),

    // Availability
    forSell: z.boolean().optional(),
    sellPrice: z.string().optional(),
    sellQuantity: z.string().optional(),

    forBorrow: z.boolean().optional(),
    borrowQuantity: z.string().optional(),
    borrowDuration: z.string().optional(),
    deposit: z.string().optional(),

    forSwap: z.boolean().optional(),
    swapQuantity: z.string().optional(),
    swapPreference: z.string().optional(),

    // Condition
    condition: z.string().min(1, "বইয়ের অবস্থা নির্বাচন করুন"),

    // Location
    locationType: z.enum(["default", "custom"]),
    locationAddress: z.string().optional(),

    // Additional info
    tags: z.string().optional(),
    editionDetails: z.string().optional(),
    conditionNote: z.string().optional(),
  })
  .refine((data) => data.forSell || data.forSwap || data.forBorrow, {
    message: "অন্তত একটি অপশন নির্বাচন করুন (বিক্রি, সোয়াপ অথবা ধার)",
    path: ["forSell"],
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
  <div className="mb-6 border-b pb-2">
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
    setValue,
    control,
    formState: { errors },
  } = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      forSell: false,
      forSwap: false,
      forBorrow: false,
      locationType: "default",
      condition: "Excellent",
    },
  });

  const forSell = useWatch({ control, name: "forSell" });
  const forBorrow = useWatch({ control, name: "forBorrow" });
  const forSwap = useWatch({ control, name: "forSwap" });
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
      <div className="boimix-container py-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-primary text-3xl font-bold">Add New Book</h1>
            <p className="text-muted-foreground text-sm">
              List your book for sell, swap or borrow
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
          <div className="bg-card space-y-12 rounded-2xl border p-6 shadow-sm md:p-8">
            {/* Upload Photos */}
            <div>
              <SectionTitle
                title="Upload Photos"
                desc="Upload clear photos of your book"
              />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold">Front Cover *</Label>
                  <ImageUploader
                    file={frontCover}
                    onChange={setFrontCover}
                    className="aspect-[3/4] w-full"
                    label="Upload Photo"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold">Back Cover</Label>
                  <ImageUploader
                    file={backCover}
                    onChange={setBackCover}
                    className="aspect-[3/4] w-full"
                    label="Upload Photo"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold">Inside Pages</Label>
                  <ImageUploader
                    file={insidePages}
                    onChange={setInsidePages}
                    className="aspect-[3/4] w-full"
                    label="Upload Photo"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold">
                    Table of Contents
                  </Label>
                  <ImageUploader
                    file={tocImage}
                    onChange={setTocImage}
                    className="aspect-[3/4] w-full"
                    label="Upload Photo"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold">
                    Index (if any)
                  </Label>
                  <ImageUploader
                    file={indexImage}
                    onChange={setIndexImage}
                    className="aspect-[3/4] w-full"
                    label="Upload Photo"
                  />
                </div>
              </div>
              <p className="text-muted-foreground mt-4 text-xs">
                You can upload up to 10 images (JPG, PNG • Max 5MB each)
              </p>
            </div>

            {/* Book Information */}
            <div>
              <SectionTitle title="Book Information" />
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>ISBN (Optional)</Label>
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

                <div className="grid gap-6 md:grid-cols-2">
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

                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Publisher</Label>
                    <Input
                      placeholder="e.g. Penguin Random House"
                      {...register("publisher")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Genre (Optional)</Label>
                    <Select onValueChange={(val) => setValue("genre", val)}>
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
                  </div>
                  <div className="space-y-2">
                    <Label>Language (Optional)</Label>
                    <Select onValueChange={(val) => setValue("language", val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Bengali">Bengali</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
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
                  <Label>Description *</Label>
                  <Textarea
                    placeholder="Tiny Changes, Remarkable Results..."
                    className={`min-h-[120px] ${errors.description ? "border-destructive" : ""}`}
                    {...register("description")}
                  />
                  <div className="mt-1 flex justify-between">
                    {errors.description ? (
                      <p className="text-destructive text-xs">
                        {errors.description.message}
                      </p>
                    ) : (
                      <div />
                    )}
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
                  className={`rounded-xl border p-5 transition-colors ${forSell ? "border-success bg-success/5" : ""}`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="bg-success/20 text-success flex h-8 w-8 items-center justify-center rounded-full font-bold">
                        ৳
                      </div>
                      <div>
                        <h3
                          className={`font-semibold ${forSell ? "text-success" : ""}`}
                        >
                          Sell
                        </h3>
                        <p className="text-muted-foreground text-xs">
                          List this book for sale
                        </p>
                      </div>
                    </div>
                    <Checkbox
                      checked={forSell}
                      onCheckedChange={(val) =>
                        setValue("forSell", val as boolean)
                      }
                      className="data-[state=checked]:bg-success data-[state=checked]:border-success rounded-full"
                    />
                  </div>

                  {forSell && (
                    <div className="animate-in fade-in zoom-in-95 space-y-4 duration-200">
                      <div className="space-y-2">
                        <Label className="text-xs">Selling Price (৳) *</Label>
                        <Input
                          type="number"
                          placeholder="450"
                          {...register("sellPrice")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Quantity *</Label>
                        <Input
                          type="number"
                          placeholder="1"
                          {...register("sellQuantity")}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Borrow Card */}
                <div
                  className={`rounded-xl border p-5 transition-colors ${forBorrow ? "border-primary bg-primary/5" : ""}`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="bg-primary/20 text-primary flex h-8 w-8 items-center justify-center rounded-full">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div>
                        <h3
                          className={`font-semibold ${forBorrow ? "text-primary" : ""}`}
                        >
                          Borrow
                        </h3>
                        <p className="text-muted-foreground text-xs">
                          Allow others to borrow
                        </p>
                      </div>
                    </div>
                    <Checkbox
                      checked={forBorrow}
                      onCheckedChange={(val) =>
                        setValue("forBorrow", val as boolean)
                      }
                      className="rounded-full"
                    />
                  </div>

                  {forBorrow && (
                    <div className="animate-in fade-in zoom-in-95 space-y-4 duration-200">
                      <div className="space-y-2">
                        <Label className="text-xs">Borrow Quantity *</Label>
                        <Input
                          type="number"
                          placeholder="3"
                          {...register("borrowQuantity")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Borrow Duration *</Label>
                        <Select
                          onValueChange={(val) =>
                            setValue("borrowDuration", val)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="7 days" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">7 days</SelectItem>
                            <SelectItem value="14">14 days</SelectItem>
                            <SelectItem value="30">30 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Deposit (Optional)</Label>
                        <div className="relative">
                          <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                            ৳
                          </span>
                          <Input
                            type="number"
                            placeholder="300"
                            className="pl-7"
                            {...register("deposit")}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Swap Card */}
                <div
                  className={`rounded-xl border p-5 transition-colors ${forSwap ? "border-warning bg-warning/5" : ""}`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="bg-warning/20 text-warning flex h-8 w-8 items-center justify-center rounded-full">
                        <Repeat2 className="h-4 w-4" />
                      </div>
                      <div>
                        <h3
                          className={`font-semibold ${forSwap ? "text-warning" : ""}`}
                        >
                          Swap
                        </h3>
                        <p className="text-muted-foreground text-xs">
                          Swap this book
                        </p>
                      </div>
                    </div>
                    <Checkbox
                      checked={forSwap}
                      onCheckedChange={(val) =>
                        setValue("forSwap", val as boolean)
                      }
                      className="data-[state=checked]:bg-warning data-[state=checked]:border-warning rounded-full"
                    />
                  </div>

                  {forSwap && (
                    <div className="animate-in fade-in zoom-in-95 space-y-4 duration-200">
                      <div className="space-y-2">
                        <Label className="text-xs">Swap Quantity *</Label>
                        <Input
                          type="number"
                          placeholder="2"
                          {...register("swapQuantity")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Swap Preference</Label>
                        <Select
                          onValueChange={(val) =>
                            setValue("swapPreference", val)
                          }
                        >
                          <SelectTrigger>
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
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {errors.forSell && !forSell && !forBorrow && !forSwap && (
                <p className="text-destructive mt-4 text-sm">
                  {errors.forSell.message}
                </p>
              )}
            </div>

            {/* Condition */}
            <div>
              <SectionTitle
                title="Condition"
                desc="Select the condition of your book"
              />
              <RadioGroup
                onValueChange={(val) => setValue("condition", val)}
                defaultValue="Excellent"
                className="grid gap-4 sm:grid-cols-2 md:grid-cols-5"
              >
                {conditions.map((c) => (
                  <Label
                    key={c.value}
                    htmlFor={c.value}
                    className={`hover:bg-muted/50 flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${condition === c.value ? "border-primary bg-primary/5" : ""}`}
                  >
                    <RadioGroupItem
                      value={c.value}
                      id={c.value}
                      className="mt-1"
                    />
                    <div>
                      <p
                        className={`font-semibold ${condition === c.value ? "text-primary" : ""}`}
                      >
                        {c.label}
                      </p>
                      <p className="text-muted-foreground mt-0.5 text-xs leading-tight">
                        {c.desc}
                      </p>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* Location */}
            <div>
              <SectionTitle title="Location" desc="Choose your book location" />
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <RadioGroup
                    onValueChange={(val) =>
                      setValue("locationType", val as "default" | "custom")
                    }
                    defaultValue="default"
                    className="flex flex-col gap-4"
                  >
                    <Label
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${locationType === "default" ? "border-primary bg-primary/5" : ""}`}
                    >
                      <RadioGroupItem value="default" />
                      <div>
                        <span
                          className={`block font-semibold ${locationType === "default" ? "text-primary" : ""}`}
                        >
                          Use Profile Default Location
                        </span>
                        <span className="text-muted-foreground text-xs">
                          Mirpur 10, Dhaka
                        </span>
                      </div>
                    </Label>
                    <Label
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${locationType === "custom" ? "border-primary bg-primary/5" : ""}`}
                    >
                      <RadioGroupItem value="custom" className="mt-1" />
                      <div className="w-full">
                        <span
                          className={`mb-2 block font-semibold ${locationType === "custom" ? "text-primary" : ""}`}
                        >
                          Use Different Location
                        </span>
                        {locationType === "custom" && (
                          <Input
                            placeholder="Enter new address..."
                            {...register("locationAddress")}
                            className="bg-background"
                          />
                        )}
                      </div>
                    </Label>
                  </RadioGroup>
                </div>

                <div className="bg-muted relative flex h-full min-h-[160px] w-full items-center justify-center overflow-hidden rounded-xl border">
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
              <SectionTitle title="Additional Information" desc="(Optional)" />
              <div className="grid gap-6 sm:grid-cols-3">
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
              <div className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
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
                    <div className="text-muted-foreground mt-2 flex items-center justify-between border-t pt-1 text-xs">
                      <div className="mt-2 flex items-center gap-1">
                        <CheckCircle2 className="text-primary h-3 w-3" />{" "}
                        {condition}
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <MapPin className="text-primary h-3 w-3" />{" "}
                        {locationType === "default"
                          ? "Mirpur 10, Dhaka"
                          : locationAddressWatch || "Custom Location"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-primary/5 border-primary/10 rounded-xl border p-5">
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
