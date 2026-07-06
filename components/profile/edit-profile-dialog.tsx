"use client";

import { useState } from "react";
import { CameraIcon, SaveIcon } from "lucide-react";
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

interface EditProfileDialogProps {
  profile: UserProfile;
  children: React.ReactNode;
}

export function EditProfileDialog({
  profile,
  children,
}: EditProfileDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information, photos, and reading interests.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="mt-4 space-y-6">
          {/* Cover Photo */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Cover Photo</label>
            <div className="bg-muted group relative h-32 w-full overflow-hidden rounded-xl">
              <Image
                src={profile.coverUrl}
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
                  <CameraIcon className="h-4 w-4" /> Change Cover
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
                  src={profile.avatarUrl}
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                defaultValue={profile.location || ""}
                placeholder="e.g. Dhaka, BD"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Reading Interests (comma separated)
              </label>
              <Input
                defaultValue={profile.readingInterests?.join(", ") || ""}
                placeholder="Fiction, Thriller, Tech"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <Textarea
              defaultValue={profile.bio || ""}
              rows={3}
              placeholder="Tell the community about yourself..."
            />
          </div>

          <DialogFooter>
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
