"use client";

import { useState, useEffect } from "react";
import { CameraIcon, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { UserProfile } from "@/types/user";
import Image from "next/image";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { apiRequest } from "@/lib/api/client";
import { useAuthStore } from "@/stores/auth-store";
import React from "react";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  role: z.string().max(50, "Role cannot exceed 50 characters.").optional(),
  bio: z.string().max(500, "Bio cannot exceed 500 characters.").optional(),
});
type ProfileFormValues = z.infer<typeof profileSchema>;

const LocationMap = dynamic(() => import("@/components/shared/location-map"), {
  ssr: false,
  loading: () => (
    <div className="bg-muted flex h-[250px] w-full animate-pulse items-center justify-center rounded-xl">
      <MapPin className="text-muted-foreground h-8 w-8 opacity-50" />
    </div>
  ),
});

interface EditProfileDialogProps {
  profile: UserProfile;
  children: React.ReactNode;
}
import { searchLocation, reverseGeocode } from "@/lib/api-client";

interface LocationSuggestion {
  display_name: string;
  lat: number;
  lng: number;
}

export function EditProfileDialog({
  profile,
  children,
}: EditProfileDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(profile.avatarUrl || "");
  const [coverPreview, setCoverPreview] = useState<string>(profile.coverUrl || "");

  const avatarInputRef = React.useRef<HTMLInputElement>(null);
  const coverInputRef = React.useRef<HTMLInputElement>(null);

  const [readingInterests, setReadingInterests] = useState<string[]>(
    profile.readingInterests || [],
  );
  const [interestInput, setInterestInput] = useState("");
  const [interestSuggestions, setInterestSuggestions] = useState<{id: string, name: string}[]>([]);
  const [isSearchingInterests, setIsSearchingInterests] = useState(false);
  const [showInterestSuggestions, setShowInterestSuggestions] = useState(false);

  useEffect(() => {
    if (interestInput && interestInput.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSearchingInterests(true);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowInterestSuggestions(true);
      const timer = setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        apiRequest<any[]>({ url: `/profiles/reading-interests/?q=${encodeURIComponent(interestInput)}`, method: "GET" })
          .then((data) => {
            setInterestSuggestions(data || []);
          })
          .catch((err) => console.error("Error fetching interests", err))
          .finally(() => setIsSearchingInterests(false));
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowInterestSuggestions(false);
      setInterestSuggestions([]);
    }
  }, [interestInput]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name || "",
      role: profile.role || "",
      bio: profile.bio || "",
    },
  });

  const { updateUser } = useAuthStore();

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSaving(true);
    
    try {
      const formData = new FormData();
      formData.append("full_name", data.name);
      if (data.role) formData.append("designation", data.role);
      if (data.bio) formData.append("bio", data.bio);
      
      if (avatarFile) formData.append("avatar", avatarFile);
      if (coverFile) formData.append("cover", coverFile);
      
      if (readingInterests.length > 0) {
        formData.append("reading_interests", JSON.stringify(readingInterests));
      }

      await apiRequest<unknown>({
        url: "/profiles/me/",
        method: "PATCH",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update local auth store so UI reacts
      updateUser({
        name: data.name,
      });

      toast.success("Profile updated successfully!");
      setOpen(false);
      
      // Optionally refresh the page to get all new details
      window.location.reload();
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] !w-[95vw] !max-w-[1000px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information, photos, and reading interests.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-8">
          <div className="space-y-6">
            {/* Cover Photo */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Cover Photo</label>
              <div className="bg-muted group relative h-32 w-full overflow-hidden rounded-xl">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={coverInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setCoverFile(file);
                      setCoverPreview(URL.createObjectURL(file));
                    }
                  }}
                />
                {coverPreview ? (
                  <Image
                    src={coverPreview}
                    alt="Cover Preview"
                    fill
                    className="object-cover transition-all group-hover:brightness-75"
                  />
                ) : (
                  <div className="absolute inset-0 bg-primary/10 transition-all group-hover:brightness-75" />
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="gap-2"
                    onClick={() => coverInputRef.current?.click()}
                  >
                    <CameraIcon className="h-4 w-4" /> Change
                  </Button>
                </div>
              </div>
            </div>

            {/* Avatar Photo */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Profile Picture</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={avatarInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setAvatarFile(file);
                      setAvatarPreview(URL.createObjectURL(file));
                    }
                  }}
                />
                <div className="bg-muted border-border group relative h-16 w-16 overflow-hidden rounded-full border-2">
                  <Image
                    src={avatarPreview || "/placeholder.svg"}
                    alt="Avatar Preview"
                    fill
                    className="object-cover transition-all group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <CameraIcon className="h-4 w-4 text-white" />
                  </div>
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => avatarInputRef.current?.click()}
                >
                  Upload New
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  {...register("name")}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-destructive text-xs">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Designation</label>
                <Input
                  {...register("role")}
                  placeholder="e.g. Software Engineer, Teacher, Student"
                  className={errors.role ? "border-destructive" : ""}
                />
                {errors.role && (
                  <p className="text-destructive text-xs">
                    {errors.role.message}
                  </p>
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Reading Interests</label>
                <div className="flex flex-col gap-2">
                  {readingInterests.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {readingInterests.map((interest, idx) => (
                        <span
                          key={idx}
                          className="bg-primary/10 text-primary flex items-center gap-1 rounded-full py-1 pr-2 pl-3 text-sm font-medium"
                        >
                          {interest}
                          <button
                            type="button"
                            onClick={() => {
                              setReadingInterests(
                                readingInterests.filter((_, i) => i !== idx),
                              );
                            }}
                            className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                          >
                            <span className="sr-only">Remove {interest}</span>
                            <span
                              aria-hidden="true"
                              className="text-base leading-none"
                            >
                              &times;
                            </span>
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="relative">
                    <Input
                      value={interestInput}
                      onChange={(e) => setInterestInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === "," || e.key === " ") {
                          e.preventDefault();
                          const newInterest = interestInput
                            .trim()
                            .replace(/^,+|,+$/g, "");
                          if (
                            newInterest &&
                            !readingInterests.includes(newInterest)
                          ) {
                            setReadingInterests([
                              ...readingInterests,
                              newInterest,
                            ]);
                          }
                          setInterestInput("");
                          setShowInterestSuggestions(false);
                        }
                      }}
                      onFocus={() => {
                        if (interestInput.length > 0) setShowInterestSuggestions(true);
                      }}
                      onBlur={() => {
                        setTimeout(() => setShowInterestSuggestions(false), 200);
                      }}
                      placeholder="Type an interest and press Enter or select from dropdown"
                    />

                    {showInterestSuggestions && (
                      <div className="bg-popover text-popover-foreground absolute z-50 mt-1 max-h-48 w-full overflow-auto rounded-md border shadow-md">
                        {isSearchingInterests ? (
                          <div className="text-muted-foreground py-2 text-center text-xs">
                            Searching...
                          </div>
                        ) : interestSuggestions.length > 0 ? (
                          interestSuggestions.map((suggestion) => (
                            <div
                              key={suggestion.id}
                              className="hover:bg-accent hover:text-accent-foreground cursor-pointer px-4 py-2 text-sm"
                              onClick={() => {
                                if (!readingInterests.includes(suggestion.name)) {
                                  setReadingInterests([...readingInterests, suggestion.name]);
                                }
                                setInterestInput("");
                                setShowInterestSuggestions(false);
                              }}
                            >
                              {suggestion.name}
                            </div>
                          ))
                        ) : (
                          <div className="text-muted-foreground py-2 text-center text-xs">
                            Press enter to add &quot;{interestInput}&quot;
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Bio</label>
                <Textarea
                  {...register("bio")}
                  rows={3}
                  placeholder="Tell the community about yourself..."
                  className={errors.bio ? "border-destructive" : ""}
                />
                {errors.bio && (
                  <p className="text-destructive text-xs">
                    {errors.bio.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
