"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, BookPlus } from "lucide-react";

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

const uploadSchema = z
  .object({
    title: z.string().min(2, "বইয়ের নাম দিন (ন্যূনতম ২ অক্ষর)"),
    author: z.string().min(2, "লেখকের নাম দিন"),
    category: z.string().min(1, "ক্যাটাগরি নির্বাচন করুন"),
    condition: z.string().min(1, "বইয়ের অবস্থা নির্বাচন করুন"),
    description: z.string().min(10, "বই সম্পর্কে অন্তত ১০ অক্ষরের বিবরণ দিন"),
    isbn: z.string().optional(),
    publisher: z.string().optional(),
    language: z.string().min(1, "ভাষা নির্বাচন করুন"),
    edition: z.string().optional(),
    pageCount: z.string().optional(),

    // Listing types
    forSell: z.boolean().optional(),
    forSwap: z.boolean().optional(),
    forBorrow: z.boolean().optional(),

    price: z.string().optional(),
    swapPrice: z.string().optional(),
  })
  .refine((data) => data.forSell || data.forSwap || data.forBorrow, {
    message: "অন্তত একটি অপশন নির্বাচন করুন (বিক্রি, সোয়াপ অথবা ধার)",
    path: ["forSell"],
  })
  .refine(
    (data) =>
      !data.forSell || (data.forSell && data.price && data.price.length > 0),
    {
      message: "বিক্রির জন্য মূল্য নির্ধারণ করুন",
      path: ["price"],
    },
  );

type UploadFormValues = z.infer<typeof uploadSchema>;

const categories = [
  "ফিকশন (Fiction)",
  "নন-ফিকশন (Non-Fiction)",
  "একাডেমিক (Academic)",
  "ব্যবসা ও ক্যারিয়ার (Business)",
  "সেলফ হেল্প (Self Help)",
  "অন্যান্য (Others)",
];

const conditions = [
  "নতুন (New)",
  "প্রায় নতুন (Like New)",
  "ভালো (Good)",
  "মোটামুটি (Fair)",
  "পুরোনো (Poor)",
];

const languages = [
  "বাংলা (Bengali)",
  "ইংরেজি (English)",
  "আরবি (Arabic)",
  "অন্যান্য (Other)",
];

export default function BookUploadPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);

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
    },
  });

  const forSell = useWatch({ control, name: "forSell" });

  const onSubmit = async (data: UploadFormValues) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log({ ...data, coverImage, backImage });
    setIsLoading(false);

    // Redirect to success or book details page
    router.push("/books");
  };

  return (
    <div className="boimix-container py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center space-x-4">
          <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
            <BookPlus className="size-6" />
          </div>
          <div>
            <h1 className="type-heading text-3xl font-bold">
              নতুন বই যুক্ত করুন
            </h1>
            <p className="text-muted-foreground mt-1">
              আপনার বই অন্যকে ধার দিতে, সোয়াপ করতে বা বিক্রি করতে ফর্মটি পূরণ
              করুন
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-card space-y-8 rounded-2xl border p-6 shadow-sm md:p-8"
        >
          {/* Top Row: Image & Basic Info */}
          <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
            {/* Image Upload */}
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block text-base">বইয়ের কভার ছবি *</Label>
                <ImageUploader
                  file={coverImage}
                  onChange={setCoverImage}
                  label="সামনের কভার আপলোড করুন"
                  className="w-full"
                />
              </div>
              <div>
                <Label className="mb-2 block text-base">বইয়ের পেছনের ছবি</Label>
                <ImageUploader
                  file={backImage}
                  onChange={setBackImage}
                  label="পেছনের কভার আপলোড করুন"
                  className="w-full"
                />
              </div>
              <p className="text-muted-foreground mt-2 text-xs">
                (ভালো মানের ছবি দিলে বইয়ের প্রতি আগ্রহ বাড়ে)
              </p>
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">বইয়ের নাম *</Label>
                <Input
                  id="title"
                  placeholder="যেমন: অপি"
                  {...register("title")}
                  className={
                    errors.title
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                />
                {errors.title && (
                  <p className="text-destructive text-sm">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">লেখকের নাম *</Label>
                <Input
                  id="author"
                  placeholder="যেমন: হুমায়ূন আহমেদ"
                  {...register("author")}
                  className={
                    errors.author
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                />
                {errors.author && (
                  <p className="text-destructive text-sm">
                    {errors.author.message}
                  </p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>ক্যাটাগরি *</Label>
                  <Select onValueChange={(val) => setValue("category", val)}>
                    <SelectTrigger
                      className={
                        errors.category
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }
                    >
                      <SelectValue placeholder="নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-destructive text-sm">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>অবস্থা (Condition) *</Label>
                  <Select onValueChange={(val) => setValue("condition", val)}>
                    <SelectTrigger
                      className={
                        errors.condition
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }
                    >
                      <SelectValue placeholder="নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((cond) => (
                        <SelectItem key={cond} value={cond}>
                          {cond}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.condition && (
                    <p className="text-destructive text-sm">
                      {errors.condition.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>ভাষা *</Label>
                  <Select onValueChange={(val) => setValue("language", val)}>
                    <SelectTrigger
                      className={
                        errors.language
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }
                    >
                      <SelectValue placeholder="নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.language && (
                    <p className="text-destructive text-sm">
                      {errors.language.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <hr className="border-t" />

          {/* Listing Options */}
          <div className="space-y-4">
            <h3 className="type-heading text-lg">
              কী করতে চান? (অন্তত একটি নির্বাচন করুন) *
            </h3>

            <div className="grid gap-4 sm:grid-cols-3">
              {/* Sell Option */}
              <div className="bg-background flex flex-col space-y-3 rounded-xl border p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="forSell"
                    className="mt-1"
                    onCheckedChange={(val) =>
                      setValue("forSell", val as boolean)
                    }
                  />
                  <Label htmlFor="forSell" className="font-medium">
                    বিক্রি করতে চাই
                  </Label>
                </div>
                {forSell && (
                  <div className="pl-7">
                    <div className="relative">
                      <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                        ৳
                      </span>
                      <Input
                        type="number"
                        placeholder="মূল্য"
                        className={`pl-8 ${errors.price ? "border-destructive" : ""}`}
                        {...register("price")}
                      />
                    </div>
                    {errors.price && (
                      <p className="text-destructive mt-1 text-xs">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Swap Option */}
              <div className="bg-background flex flex-col space-y-3 rounded-xl border p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="forSwap"
                    className="mt-1"
                    onCheckedChange={(val) =>
                      setValue("forSwap", val as boolean)
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor="forSwap" className="font-medium">
                      সোয়াপ করতে চাই
                    </Label>
                    <p className="text-muted-foreground text-xs leading-tight">
                      অন্য বইয়ের বিনিময়ে এই বইটি দিতে চাই
                    </p>
                  </div>
                </div>
                {useWatch({ control, name: "forSwap" }) && (
                  <div className="pt-2 pl-7">
                    <div className="relative">
                      <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                        ৳
                      </span>
                      <Input
                        type="number"
                        placeholder="সোয়াপ ভ্যালু (আনুমানিক)"
                        className={`pl-8 ${errors.swapPrice ? "border-destructive" : ""}`}
                        {...register("swapPrice")}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Borrow Option */}
              <div className="bg-background flex items-start space-x-3 rounded-xl border p-4">
                <Checkbox
                  id="forBorrow"
                  className="mt-1"
                  onCheckedChange={(val) =>
                    setValue("forBorrow", val as boolean)
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="forBorrow" className="font-medium">
                    ধার দিতে চাই
                  </Label>
                  <p className="text-muted-foreground text-xs leading-tight">
                    সেন্ট্রাল লাইব্রেরির মাধ্যমে বিনামূল্যে পড়তে দিতে চাই
                  </p>
                </div>
              </div>
            </div>
            {errors.forSell && !forSell && (
              <p className="text-destructive text-sm">
                {errors.forSell.message}
              </p>
            )}
          </div>

          <hr className="border-t" />

          {/* Additional Details */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="publisher">প্রকাশক (ঐচ্ছিক)</Label>
              <Input
                id="publisher"
                placeholder="প্রকাশনীর নাম"
                {...register("publisher")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN (ঐচ্ছিক)</Label>
              <Input
                id="isbn"
                placeholder="বইয়ের পেছনে থাকা বারকোড নাম্বার"
                {...register("isbn")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edition">সংস্করণ (ঐচ্ছিক)</Label>
              <Input
                id="edition"
                placeholder="যেমন: ১ম সংস্করণ, ২০২৩"
                {...register("edition")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pageCount">পৃষ্ঠা সংখ্যা (ঐচ্ছিক)</Label>
              <Input
                id="pageCount"
                type="number"
                placeholder="যেমন: ৩৫০"
                {...register("pageCount")}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">বিবরণ / সারাংশ *</Label>
              <Textarea
                id="description"
                placeholder="বইটি সম্পর্কে কিছু লিখুন..."
                className={`min-h-[120px] ${errors.description ? "border-destructive focus-visible:ring-destructive" : ""}`}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-destructive text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-5 animate-spin" />
                আপলোড হচ্ছে...
              </>
            ) : (
              "বই যুক্ত করুন"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
