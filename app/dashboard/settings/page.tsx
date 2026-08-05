"use client";

import { useState, useEffect } from "react";
import { Camera, MapPin, Building, Globe, Map, User, Copy, Loader2, CheckCircle2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import { useAuthStore } from "@/stores";
import { apiRequest } from "@/lib/api/client";

import dynamic from "next/dynamic";
const LocationMap = dynamic(() => import("@/components/shared/location-map"), {
  ssr: false,
});
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  const { user, isAuthenticated, updateUser } = useAuthStore();
  const [mapPosition, setMapPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    {
      lat: number;
      lng: number;
      display_name: string;
      address?: Record<string, string>;
    }[]
  >([]);

  const [streetResults, setStreetResults] = useState<
    {
      lat: number;
      lng: number;
      display_name: string;
      address?: Record<string, string>;
    }[]
  >([]);
  const [showStreetSuggestions, setShowStreetSuggestions] = useState(false);

  const [usernameStatus, setUsernameStatus] = useState<"idle" | "loading" | "available" | "taken" | "invalid">("idle");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [isSavingPrefs, setIsSavingPrefs] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "",
    username: "",
    designation: "",
    bio: "",
  });
  
  const [preferences, setPreferences] = useState({
    email_notifications: true,
    push_notifications: true,
    marketing_emails: false,
    language: "en"
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("/placeholder-user.jpg");

  const [addressDetails, setAddressDetails] = useState({
    street: "",
    city: "Dhaka",
    state: "",
    zip: "",
    country: "Bangladesh",
    lat: "",
    lng: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      apiRequest<any>({ url: `/profiles/me/`, method: "GET" })
        .then((data) => {
          setProfile({
            fullName: data.name || "",
            username: data.username || "",
            designation: data.role || "",
            bio: data.bio || "",
          });
          setOriginalUsername(data.username || "");
          if (data.avatarUrl) {
            setAvatarPreview(data.avatarUrl);
          }
          if (data.locationDetails) {
            setAddressDetails((prev) => ({
              ...prev,
              city: data.locationDetails.area || data.locationDetails.city || "Dhaka",
              state: data.locationDetails.state || data.locationDetails.district || "",
              street: data.locationDetails.street || "",
              zip: data.locationDetails.zip || "",
              country: data.locationDetails.country || "Bangladesh",
              lat: data.locationDetails.lat || "",
              lng: data.locationDetails.lng || "",
            }));
          }
        })
        .catch(console.error);

      apiRequest<any>({ url: `/profiles/me/preferences/`, method: "GET" })
        .then((data) => {
          if (data) {
            setPreferences({
              email_notifications: data.email_notifications ?? true,
              push_notifications: data.push_notifications ?? true,
              marketing_emails: data.marketing_emails ?? false,
              language: data.language || "en"
            });
          }
        })
        .catch(console.error);
    }
  }, [isAuthenticated, user?.username]);

  const handleSaveProfile = async () => {
    if (!isAuthenticated) return;
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("full_name", profile.fullName);
      formData.append("username", profile.username);
      formData.append("bio", profile.bio);
      formData.append("designation", profile.designation);
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }
      
      if (addressDetails.street) formData.append("location_street", addressDetails.street);
      if (addressDetails.city) formData.append("location_city", addressDetails.city);
      if (addressDetails.state) formData.append("location_state", addressDetails.state);
      if (addressDetails.zip) formData.append("location_postal_code", addressDetails.zip);
      if (addressDetails.country) formData.append("location_country", addressDetails.country);
      if (addressDetails.lat && addressDetails.lng) {
        formData.append("location_lat", parseFloat(addressDetails.lat).toFixed(6));
        formData.append("location_lng", parseFloat(addressDetails.lng).toFixed(6));
      }
      
      await apiRequest({
        url: "/profiles/me/",
        method: "PATCH",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      
      // Update the auth store with the new details
      updateUser({
        name: profile.fullName,
        username: profile.username,
        // Optional: update avatar URL if the backend returns it in the response, 
        // but for now updating name and username is critical to prevent 404s.
      });

      toast.success("Profile saved successfully!");
    } catch (err: any) {
      console.error("Failed to save profile", err);
      toast.error(err.message || "Failed to save profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePreferences = async () => {
    if (!isAuthenticated) return;
    setIsSavingPrefs(true);
    try {
      await apiRequest({
        url: "/profiles/me/preferences/",
        method: "PATCH",
        data: preferences,
      });
      toast.success("Preferences saved successfully!");
    } catch (err: any) {
      console.error("Failed to save preferences", err);
      toast.error(err.message || "Failed to save preferences.");
    } finally {
      setIsSavingPrefs(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length > 2) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data = await apiRequest<{results: any[]}>({ 
            url: `/locations/search/?q=${encodeURIComponent(searchQuery)}`, 
            method: 'GET' 
          });
          setSearchResults(data.results || []);
        } catch (err) {
          console.error("Search failed", err);
        }
      } else {
        setSearchResults([]);
      }
    }, 300); // Reduced debounce to 300ms for faster feedback

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (addressDetails.street.trim().length > 2 && showStreetSuggestions) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data = await apiRequest<{results: any[]}>({ 
            url: `/locations/search/?q=${encodeURIComponent(addressDetails.street)}`, 
            method: 'GET' 
          });
          setStreetResults(data.results || []);
        } catch (err) {
          console.error("Street search failed", err);
        }
      } else {
        setStreetResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [addressDetails.street, showStreetSuggestions]);

  useEffect(() => {
    if (profile.username === originalUsername || !profile.username) {
      setUsernameStatus("idle");
      setUsernameMessage("");
      return;
    }

    const timer = setTimeout(async () => {
      setUsernameStatus("loading");
      try {
        const data = await apiRequest<{available: boolean, message: string}>({
          url: `/profiles/check-username/?username=${encodeURIComponent(profile.username)}`,
          method: "GET"
        });
        if (data.available) {
          setUsernameStatus("available");
        } else {
          setUsernameStatus("taken");
          setUsernameMessage(data.message || "Username is not available");
        }
      } catch (err: any) {
        setUsernameStatus("invalid");
        setUsernameMessage(err.message || "Invalid username");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [profile.username, originalUsername]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectResult = async (result: any) => {
    const lat = result.lat;
    const lng = result.lng;
    setSearchResults([]);
    setSearchQuery(result.display_name);
    handleLocationChange(lat, lng, result.address);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStreetSelect = (result: any) => {
    setShowStreetSuggestions(false);
    setStreetResults([]);
    handleLocationChange(
      result.lat,
      result.lng,
      result.address,
    );
  };

  const handleLocationChange = async (
    lat: number,
    lng: number,
    preloadedAddress?: Record<string, string>,
  ) => {
    setMapPosition({ lat, lng });

    if (preloadedAddress) {
      setAddressDetails((prev) => ({
        ...prev,
        street:
          preloadedAddress.road ||
          preloadedAddress.suburb ||
          preloadedAddress.neighbourhood ||
          preloadedAddress.village ||
          "",
        city:
          preloadedAddress.city ||
          preloadedAddress.town ||
          preloadedAddress.county ||
          "",
        state: preloadedAddress.state || "",
        zip: preloadedAddress.postcode
          ? String(preloadedAddress.postcode)
          : preloadedAddress.postal_code
            ? String(preloadedAddress.postal_code)
            : "",
        country: preloadedAddress.country || "",
        lat: lat.toString(),
        lng: lng.toString(),
      }));
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await apiRequest<any>({
        url: `/locations/reverse/?lat=${lat}&lng=${lng}`,
        method: "GET",
      });

      if (data && data.address) {
        const address = data.address;
        setAddressDetails((prev) => ({
          ...prev,
          street:
            address.road ||
            address.suburb ||
            address.neighbourhood ||
            address.village ||
            "",
          city:
            address.city || address.town || address.county || "",
          state: address.state || "",
          zip: address.postcode
            ? String(address.postcode)
            : address.postal_code
              ? String(address.postal_code)
              : "",
          country: address.country || "",
          lat: lat.toString(),
          lng: lng.toString(),
        }));
      }
    } catch (err) {
      console.error("Failed to fetch address", err);
      setAddressDetails((prev) => ({
        ...prev,
        lat: lat.toString(),
        lng: lng.toString(),
      }));
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="scrollbar-hide w-full justify-start overflow-x-auto rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none border-b-2 border-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none border-b-2 border-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none"
          >
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 outline-none">
          <Card className="border-muted/50 overflow-hidden shadow-sm">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="text-xl">Profile Information</CardTitle>
              <CardDescription>
                Update your personal details and address. This information will
                be displayed on your public profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <div className="group relative cursor-pointer">
                  <Avatar className="border-background h-24 w-24 border-4 shadow-md transition-opacity group-hover:opacity-80">
                    <AvatarImage
                      src={avatarPreview}
                      alt="Profile picture"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-medium">
                      {profile.fullName?.charAt(0) || user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <label htmlFor="avatar-upload" className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <Camera className="h-8 w-8 text-white" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setAvatarFile(file);
                        setAvatarPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Profile Picture</h3>
                  <p className="text-muted-foreground max-w-sm text-sm">
                    Upload a high-res image (JPG, PNG, or GIF). Maximum file
                    size of 2MB.
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <Button variant="default" size="sm" className="shadow-sm" onClick={() => document.getElementById("avatar-upload")?.click()}>
                      Upload New
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        setAvatarFile(null);
                        setAvatarPreview("/placeholder-user.jpg");
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <hr className="border-muted/60" />

              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <User className="text-primary h-5 w-5" />
                  Personal Details
                </h3>
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={profile.fullName}
                      onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                      className="bg-muted/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium flex items-center justify-between">
                      <span>Username</span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(profile.username);
                          toast.success("Username copied to clipboard!");
                        }}
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </button>
                    </Label>
                    <div className="relative">
                      <Input
                        id="username"
                        value={profile.username}
                        onChange={(e) => setProfile({...profile, username: e.target.value.toLowerCase()})}
                        className={cn("bg-muted/20", usernameStatus === "taken" || usernameStatus === "invalid" ? "border-destructive focus-visible:ring-destructive" : "")}
                      />
                      {usernameStatus === "loading" && (
                        <div className="absolute right-3 top-2.5">
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        </div>
                      )}
                      {usernameStatus === "available" && (
                        <div className="absolute right-3 top-2.5">
                          <CheckCircle2Icon className="h-4 w-4 text-success" />
                        </div>
                      )}
                    </div>
                    {usernameStatus === "taken" || usernameStatus === "invalid" ? (
                      <p className="text-xs text-destructive">{usernameMessage}</p>
                    ) : usernameStatus === "available" ? (
                      <p className="text-xs text-success">Username is available</p>
                    ) : null}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label
                      htmlFor="designation"
                      className="text-sm font-medium"
                    >
                      Designation
                    </Label>
                    <Input
                      id="designation"
                      placeholder="e.g. Software Engineer, Teacher, Student"
                      value={profile.designation}
                      onChange={(e) => setProfile({...profile, designation: e.target.value})}
                      className="bg-muted/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    rows={3}
                    className="bg-muted/20 resize-none"
                  />
                  <p className="text-muted-foreground text-xs">
                    Write a short introduction about yourself.
                  </p>
                </div>
              </div>

              <hr className="border-muted/60" />

              {/* Address Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <MapPin className="text-primary h-5 w-5" />
                    Address Details
                  </h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/20 hover:bg-primary/5 text-primary gap-2"
                      >
                        <Map className="h-4 w-4" /> Pick from Map
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Select your location</DialogTitle>
                      </DialogHeader>
                      <div className="my-2 flex flex-col gap-3">
                        <form
                          onSubmit={handleSearch}
                          className="relative z-10 flex gap-2"
                        >
                          <Input
                            placeholder="Search for a location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1"
                          />
                        </form>

                        {searchResults.length > 0 && (
                          <div className="bg-background absolute top-28 right-6 left-6 z-50 max-h-48 overflow-y-auto rounded-md border shadow-md">
                            {searchResults.map((result, idx) => (
                              <button
                                key={idx}
                                className="hover:bg-muted focus:bg-muted w-full border-b px-4 py-2 text-left text-sm outline-none last:border-0"
                                onClick={() => handleSelectResult(result)}
                              >
                                {result.display_name}
                              </button>
                            ))}
                          </div>
                        )}

                        <div className="relative z-0 h-[300px] w-full overflow-hidden rounded-md border">
                          <LocationMap
                            lat={mapPosition?.lat}
                            lng={mapPosition?.lng}
                            onChange={handleLocationChange}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogTrigger asChild>
                          <Button type="submit">Confirm Location</Button>
                        </DialogTrigger>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="street" className="text-sm font-medium">
                      Street Address
                    </Label>
                    <div className="relative">
                      <Map className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                      <Input
                        id="street"
                        placeholder="e.g. 123 Bookworm Lane"
                        value={addressDetails.street}
                        onChange={(e) => {
                          setAddressDetails({
                            ...addressDetails,
                            street: e.target.value,
                          });
                          setShowStreetSuggestions(true);
                        }}
                        onBlur={() =>
                          setTimeout(() => setShowStreetSuggestions(false), 200)
                        }
                        className="bg-muted/20 pl-9"
                      />
                      {showStreetSuggestions && streetResults.length > 0 && (
                        <div className="bg-background absolute top-11 right-0 left-0 z-50 max-h-48 overflow-y-auto rounded-md border shadow-md">
                          {streetResults.map((result, idx) => (
                            <button
                              key={idx}
                              className="hover:bg-muted focus:bg-muted w-full border-b px-4 py-2 text-left text-sm outline-none last:border-0"
                              onClick={() => handleStreetSelect(result)}
                              type="button"
                            >
                              {result.display_name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium">
                        City
                      </Label>
                      <div className="relative">
                        <Building className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                        <Input
                          id="city"
                          value={addressDetails.city}
                          onChange={(e) =>
                            setAddressDetails({
                              ...addressDetails,
                              city: e.target.value,
                            })
                          }
                          className="bg-muted/20 pl-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-sm font-medium">
                        State/Province
                      </Label>
                      <Input
                        id="state"
                        placeholder="e.g. Dhaka"
                        value={addressDetails.state}
                        onChange={(e) =>
                          setAddressDetails({
                            ...addressDetails,
                            state: e.target.value,
                          })
                        }
                        className="bg-muted/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zip" className="text-sm font-medium">
                        Zip / Postal Code
                      </Label>
                      <Input
                        id="zip"
                        placeholder="e.g. 1200"
                        value={addressDetails.zip}
                        onChange={(e) =>
                          setAddressDetails({
                            ...addressDetails,
                            zip: e.target.value,
                          })
                        }
                        className="bg-muted/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:w-1/2">
                    <Label htmlFor="country" className="text-sm font-medium">
                      Country
                    </Label>
                    <div className="relative">
                      <Globe className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                      <Input
                        id="country"
                        value={addressDetails.country}
                        onChange={(e) =>
                          setAddressDetails({
                            ...addressDetails,
                            country: e.target.value,
                          })
                        }
                        className="bg-muted/20 pl-9"
                      />
                    </div>
                  </div>

                  {addressDetails.lat && addressDetails.lng && (
                    <p className="text-muted-foreground text-xs">
                      Coordinates captured:{" "}
                      {parseFloat(addressDetails.lat).toFixed(4)},{" "}
                      {parseFloat(addressDetails.lng).toFixed(4)}
                    </p>
                  )}
                  <input type="hidden" name="lat" value={addressDetails.lat} />
                  <input type="hidden" name="lng" value={addressDetails.lng} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 flex items-center justify-between border-t px-6 py-4">
              <p className="text-muted-foreground text-sm">
                Don&apos;t forget to save your changes.
              </p>
              <Button onClick={handleSaveProfile} disabled={isSaving || usernameStatus === "taken" || usernameStatus === "invalid"} className="shadow-sm">
                {isSaving ? "Saving..." : "Save Profile"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 outline-none">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive and how.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">
                    Email Notifications
                  </Label>
                  <p className="text-muted-foreground text-sm">
                    Receive emails about your account activity and exchanges.
                  </p>
                </div>
                <Switch 
                  checked={preferences.email_notifications}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, email_notifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">
                    Push Notifications
                  </Label>
                  <p className="text-muted-foreground text-sm">
                    Receive push notifications in your browser.
                  </p>
                </div>
                <Switch 
                  checked={preferences.push_notifications}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, push_notifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">
                    Marketing Emails
                  </Label>
                  <p className="text-muted-foreground text-sm">
                    Receive emails about new features, updates, and offers.
                  </p>
                </div>
                <Switch 
                  checked={preferences.marketing_emails}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, marketing_emails: checked })}
                />
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 flex items-center justify-end border-t px-6 py-4">
              <Button onClick={handleSavePreferences} disabled={isSavingPrefs} className="shadow-sm">
                {isSavingPrefs ? "Saving..." : "Save Preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
