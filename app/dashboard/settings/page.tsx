"use client";

import { useState, useEffect } from "react";
import { Camera, MapPin, Building, Globe, Map, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [mapPosition, setMapPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    {
      lat: string;
      lon: string;
      display_name: string;
      address?: Record<string, string>;
    }[]
  >([]);

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
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length > 2) {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(searchQuery)}`,
          );
          const data = await res.json();
          setSearchResults(data);
        } catch (err) {
          console.error("Search failed", err);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSelectResult = async (result: {
    lat: string;
    lon: string;
    display_name: string;
    address?: Record<string, string>;
  }) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    setSearchResults([]);
    setSearchQuery(result.display_name);
    handleLocationChange(lat, lng, result.address);
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
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      );
      const data = await res.json();

      if (data.address) {
        setAddressDetails((prev) => ({
          ...prev,
          street:
            data.address.road ||
            data.address.suburb ||
            data.address.neighbourhood ||
            data.address.village ||
            "",
          city:
            data.address.city || data.address.town || data.address.county || "",
          state: data.address.state || "",
          zip: data.address.postcode
            ? String(data.address.postcode)
            : data.address.postal_code
              ? String(data.address.postal_code)
              : "",
          country: data.address.country || "",
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
            value="account"
            className="data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none border-b-2 border-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none"
          >
            Account
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
                      src="/placeholder-user.jpg"
                      alt="Profile picture"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-medium">
                      RA
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Profile Picture</h3>
                  <p className="text-muted-foreground max-w-sm text-sm">
                    Upload a high-res image (JPG, PNG, or GIF). Maximum file
                    size of 2MB.
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <Button variant="default" size="sm" className="shadow-sm">
                      Upload New
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
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
                      defaultValue="Roni Ahamed"
                      className="bg-muted/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">
                      Username
                    </Label>
                    <Input
                      id="username"
                      defaultValue="roni"
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
                    defaultValue="Love reading. Love sharing. Let's build a community of book lovers."
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
                        onChange={(e) =>
                          setAddressDetails({
                            ...addressDetails,
                            street: e.target.value,
                          })
                        }
                        className="bg-muted/20 pl-9"
                      />
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
              <Button className="shadow-sm">Save Profile</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6 outline-none">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>
                Update your email address and password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="roni@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Update Account</Button>
            </CardFooter>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Permanently delete your account and all associated data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
            </CardContent>
            <CardFooter className="border-destructive/20 bg-destructive/5 border-t px-6 py-4">
              <Button variant="destructive">Delete Account</Button>
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
                <Switch defaultChecked />
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
                <Switch defaultChecked />
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
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
