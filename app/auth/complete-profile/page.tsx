"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, UploadCloud, MapPin, Search } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { searchLocation } from "@/lib/api-client";
import { useAuthStore } from "@/stores/auth-store";

const profileSchema = z.object({
  location: z.string().min(2, "আপনার এলাকা নির্বাচন করুন"),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function CompleteProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const setSession = useAuthStore((state) => state.setSession);
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);

  // Avatar Upload State
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Location Search State
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);
  const [locationSearchText, setLocationSearchText] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (locationSearchText.length > 2) {
      setIsSearchingLocation(true);
      const timer = setTimeout(() => {
        searchLocation(locationSearchText)
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
    } else {
      setShowSuggestions(false);
      setLocationSuggestions([]);
    }
  }, [locationSearchText]);

  const handleSelectLocation = (locationName: string) => {
    setValue("location", locationName, { shouldValidate: true });
    setLocationSearchText(locationName);
    setShowSuggestions(false);
  };

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      const { apiClient } = await import("@/lib/api/client");
      const formData = new FormData();
      if (data.location) formData.append("location", data.location);
      if (data.bio) formData.append("bio", data.bio);
      if (avatarFile) formData.append("avatar", avatarFile);

      const res = await apiClient.patch("/profiles/me", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update local state if needed (e.g. setting avatarUrl)
      if (user) {
        let newAvatarUrl = res.data.avatarUrl || user.avatarUrl;
        if (!res.data.avatarUrl && avatarFile) {
          // Temporarily use object URL until backend processes the image
          newAvatarUrl = URL.createObjectURL(avatarFile);
        }
        setSession({
          ...user,
          name: res.data.name || res.data.full_name || user.name,
          username: res.data.username || user.username,
          avatarUrl: newAvatarUrl,
        }, accessToken);
      }

      let redirectQuery = "";
      if (typeof window !== "undefined") {
        const searchParams = new URLSearchParams(window.location.search);
        const r = searchParams.get("redirect");
        if (r) redirectQuery = `?redirect=${encodeURIComponent(r)}`;
      }
      router.push(`/auth/choose-language${redirectQuery}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Complete Profile Error:", error);
      const msg = error?.response?.data?.detail || error?.message || "Failed to update profile.";
      alert(msg);
    } finally {
      setIsLoading(false);
    }
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
        {/* Avatar Upload */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleAvatarChange}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="bg-muted hover:border-primary relative flex h-24 w-24 cursor-pointer overflow-hidden items-center justify-center rounded-full border-2 border-dashed border-gray-300 transition-colors"
          >
            {avatarPreview ? (
              <Image src={avatarPreview} alt="Avatar Preview" fill className="object-cover" />
            ) : (
              <UploadCloud className="text-muted-foreground size-8" />
            )}
          </div>
          <span className="text-muted-foreground text-xs font-medium">
            প্রোফাইল ছবি আপলোড করুন
          </span>
        </div>

        {/* Location Search */}
        <div className="space-y-2 relative">
          <Label htmlFor="location">এলাকা</Label>
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              id="location"
              value={locationSearchText}
              onChange={(e) => setLocationSearchText(e.target.value)}
              placeholder="সার্চ করুন (যেমন: ধানমন্ডি, ঢাকা)"
              className={`pl-9 ${
                errors.location
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }`}
            />
            {/* Hidden actual input for react-hook-form */}
            <input type="hidden" {...register("location")} />
          </div>
          {isSearchingLocation && (
            <div className="text-xs text-muted-foreground mt-1">খুঁজছি...</div>
          )}
          {errors.location && (
            <p className="text-destructive text-sm mt-1">
              {errors.location.message}
            </p>
          )}

          {/* Suggestions Dropdown */}
          {showSuggestions && locationSuggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full rounded-md border bg-card py-1 shadow-lg max-h-60 overflow-auto">
              {locationSuggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-muted"
                  onClick={() => handleSelectLocation(suggestion.display_name)}
                >
                  <MapPin className="size-4 text-muted-foreground shrink-0" />
                  <span className="truncate">{suggestion.display_name}</span>
                </li>
              ))}
            </ul>
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
          onClick={() => {
            let redirectQuery = "";
            if (typeof window !== "undefined") {
              const searchParams = new URLSearchParams(window.location.search);
              const r = searchParams.get("redirect");
              if (r) redirectQuery = `?redirect=${encodeURIComponent(r)}`;
            }
            router.push(`/auth/choose-language${redirectQuery}`);
          }}
          className="text-muted-foreground hover:text-primary text-sm font-medium underline-offset-4 hover:underline"
        >
          এখন স্কিপ করুন
        </button>
      </div>
    </div>
  );
}
