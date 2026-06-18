"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, UploadCloud, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const profileSchema = z.object({
  location: z.string().min(2, "আপনার এলাকা নির্বাচন করুন"),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function CompleteProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    setIsLoading(false);
    router.push("/auth/choose-language");
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="type-heading text-3xl">প্রোফাইল সম্পূর্ণ করুন</h1>
        <p className="text-muted-foreground text-sm">
          আপনার সম্পর্কে আরও কিছু তথ্য দিন
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Avatar Upload Placeholder */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="bg-muted hover:border-primary flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-gray-300 transition-colors">
            <UploadCloud className="text-muted-foreground size-8" />
          </div>
          <span className="text-muted-foreground text-xs font-medium">
            প্রোফাইল ছবি আপলোড করুন
          </span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">এলাকা</Label>
          <div className="relative">
            <MapPin className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              id="location"
              placeholder="যেমন: ধানমন্ডি, ঢাকা"
              {...register("location")}
              className={`pl-9 ${
                errors.location
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }`}
            />
          </div>
          {errors.location && (
            <p className="text-destructive text-sm">
              {errors.location.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">আপনার সম্পর্কে (ঐচ্ছিক)</Label>
          <Input
            id="bio"
            placeholder="আপনার প্রিয় বই বা শখ সম্পর্কে লিখুন..."
            {...register("bio")}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              অপেক্ষা করুন...
            </>
          ) : (
            "পরবর্তী ধাপ"
          )}
        </Button>
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={() => router.push("/auth/choose-language")}
          className="text-muted-foreground hover:text-primary text-sm font-medium underline-offset-4 hover:underline"
        >
          এখন স্কিপ করুন
        </button>
      </div>
    </div>
  );
}
