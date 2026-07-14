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

interface LocationSuggestion {
  geometry: { coordinates: [number, number] };
  properties: { name: string; city?: string; country?: string };
}

export function EditProfileDialog({
  profile,
  children,
}: EditProfileDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [locationAddress, setLocationAddress] = useState(
    profile.location || "",
  );
  const [locationLat, setLocationLat] = useState<number | undefined>(23.8103);
  const [locationLng, setLocationLng] = useState<number | undefined>(90.4125);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<
    LocationSuggestion[]
  >([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    if (isTyping && locationAddress && locationAddress.length > 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSearchingLocation(true);

      setShowSuggestions(true);
      const timer = setTimeout(() => {
        fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(locationAddress)}&lat=23.8103&lon=90.4125&limit=15`,
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
          .catch((err) => console.error("Geocoding error", err))
          .finally(() => setIsSearchingLocation(false));
      }, 300);
      return () => {
        clearTimeout(timer);
        setIsSearchingLocation(false);
      };
    } else if (!isTyping) {
      setShowSuggestions(false);
    }
  }, [locationAddress, isTyping]);

  const [readingInterests, setReadingInterests] = useState<string[]>(
    profile.readingInterests || [],
  );
  const [interestInput, setInterestInput] = useState("");

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

  const onSubmit = async (data: ProfileFormValues) => {
    setLocationError("");
    if (!locationAddress || !locationLat || !locationLng) {
      setLocationError(
        "Please select a valid location from the map or suggestions.",
      );
      toast.error("Please select a valid location.");
      return;
    }

    setIsSaving(true);
    // Simulate API call with all data
    console.log("Saving profile data:", {
      ...data,
      locationAddress,
      locationLat,
      locationLng,
      readingInterests,
    });
    setTimeout(() => {
      setIsSaving(false);
      setOpen(false);
      toast.success("Profile updated successfully!");
    }, 1000);
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
                <Image
                  src={profile.coverUrl || "/placeholder.svg"}
                  alt="Cover Preview"
                  fill
                  className="object-cover transition-all group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="gap-2"
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
                <div className="bg-muted border-border group relative h-16 w-16 overflow-hidden rounded-full border-2">
                  <Image
                    src={profile.avatarUrl || "/placeholder.svg"}
                    alt="Avatar Preview"
                    fill
                    className="object-cover transition-all group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <CameraIcon className="h-4 w-4 text-white" />
                  </div>
                </div>
                <Button type="button" variant="outline" size="sm">
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
                <label className="text-sm font-medium">Title / Role</label>
                <Input
                  {...register("role")}
                  placeholder="e.g. Avid Reader"
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
                  <Input
                    value={interestInput}
                    onChange={(e) => setInterestInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
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
                      }
                    }}
                    placeholder="Type an interest and press Enter or comma"
                  />
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

          <div className="flex flex-col space-y-4 border-t pt-4">
            <label className="text-sm font-medium">Location</label>

            <div className="space-y-2">
              <div className="relative">
                <MapPin className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  value={locationAddress}
                  onChange={(e) => {
                    setLocationAddress(e.target.value);
                    setIsTyping(true);
                    setLocationError("");
                  }}
                  placeholder="Type your location or select on map"
                  className={`pr-9 pl-9 ${locationError ? "border-destructive" : ""}`}
                  onFocus={() => {
                    if (locationSuggestions.length > 0)
                      setShowSuggestions(true);
                  }}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                />

                {locationAddress && (
                  <button
                    type="button"
                    onClick={() => {
                      setLocationAddress("");
                      setShowSuggestions(false);
                      setLocationSuggestions([]);
                      setIsTyping(false);
                    }}
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                  >
                    <Search className="hidden h-4 w-4" />{" "}
                    {/* Hidden search just to keep the import used if needed, actually we can just use X */}
                    <span className="text-xl leading-none">&times;</span>
                  </button>
                )}

                {showSuggestions &&
                  (locationSuggestions.length > 0 || isSearchingLocation) && (
                    <div className="bg-popover text-popover-foreground animate-in fade-in zoom-in-95 absolute top-full z-50 mt-1 flex max-h-64 w-full flex-col overflow-hidden rounded-md border shadow-md">
                      <div className="border-border bg-muted/30 flex items-center justify-between border-b px-4 py-2 text-xs font-medium">
                        <span>Suggestions</span>
                        <button
                          type="button"
                          onClick={() => setShowSuggestions(false)}
                          className="text-muted-foreground hover:bg-muted hover:text-foreground rounded p-1 transition-colors"
                        >
                          <span className="sr-only">Close suggestions</span>
                          <span className="text-base leading-none">
                            &times;
                          </span>
                        </button>
                      </div>
                      <div className="overflow-y-auto">
                        {isSearchingLocation ? (
                          <div className="text-muted-foreground flex items-center justify-center py-6 text-sm">
                            <div className="border-primary mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                            Searching for locations...
                          </div>
                        ) : (
                          locationSuggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              type="button"
                              className="hover:bg-muted border-border/50 flex w-full flex-col items-start border-b px-4 py-2 text-left text-sm transition-colors last:border-b-0"
                              onClick={() => {
                                const props = suggestion.properties;
                                const address = [
                                  props.name,
                                  props.city,
                                  props.country,
                                ]
                                  .filter(Boolean)
                                  .join(", ");

                                setIsTyping(false);
                                setLocationAddress(address);
                                setLocationLat(
                                  suggestion.geometry.coordinates[1],
                                );
                                setLocationLng(
                                  suggestion.geometry.coordinates[0],
                                );
                                setShowSuggestions(false);
                              }}
                            >
                              <span className="font-medium">
                                {suggestion.properties.name}
                              </span>
                              <span className="text-muted-foreground text-xs">
                                {[
                                  suggestion.properties.city,
                                  suggestion.properties.country,
                                ]
                                  .filter(Boolean)
                                  .join(", ")}
                              </span>
                            </button>
                          ))
                        )}
                        {!isSearchingLocation &&
                          locationSuggestions.length === 0 && (
                            <div className="text-muted-foreground py-4 text-center text-sm">
                              No locations found
                            </div>
                          )}
                      </div>
                    </div>
                  )}
              </div>
              {locationError && (
                <p className="text-destructive text-xs">{locationError}</p>
              )}
            </div>

            <div className="h-[400px] w-full overflow-hidden rounded-xl border">
              {open && (
                <LocationMap
                  key={open ? "map-open" : "map-closed"}
                  lat={locationLat}
                  lng={locationLng}
                  onChange={(lat, lng) => {
                    setLocationLat(lat);
                    setLocationLng(lng);
                  }}
                />
              )}
            </div>
            <p className="text-muted-foreground mt-2 text-xs">
              Drag the map and click to pinpoint your exact location for better
              book exchanges.
            </p>
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
