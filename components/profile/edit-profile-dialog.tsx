"use client";

import { useState, useEffect } from "react";
import { CameraIcon, SaveIcon, MapPin, Search } from "lucide-react";
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
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

        <form onSubmit={handleSave} className="mt-4 space-y-8">
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
                <Input defaultValue={profile.name} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Title / Role</label>
                <Input
                  defaultValue={profile.role || ""}
                  placeholder="e.g. Avid Reader"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">
                  Reading Interests (comma separated)
                </label>
                <Input
                  defaultValue={profile.readingInterests?.join(", ") || ""}
                  placeholder="Fiction, Thriller, Tech"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Bio</label>
                <Textarea
                  defaultValue={profile.bio || ""}
                  rows={3}
                  placeholder="Tell the community about yourself..."
                />
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
                  onChange={(e) => setLocationAddress(e.target.value)}
                  placeholder="Type your location or select on map"
                  className="pl-9"
                />
              </div>
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
