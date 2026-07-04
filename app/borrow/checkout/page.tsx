"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useBorrowCartStore,
  BorrowCartItem,
} from "@/lib/store/use-borrow-cart-store";
import { useBorrowStore } from "@/lib/store/use-borrow-store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Truck,
  ArrowLeft,
  Trash2,
  Calendar,
  CreditCard,
  Wallet,
  BookOpen,
  OctagonXIcon,
} from "lucide-react";
import { toast } from "sonner";
import { ProgressStepper } from "@/components/borrow/progress-stepper";
import { EligibilityCard } from "@/components/borrow/eligibility-card";
import { BD_DISTRICTS, BD_THANAS } from "@/lib/data/bd-locations";

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDirect = searchParams.get("direct") === "true";

  const {
    items: allCartItems,
    directCheckoutItem,
    removeItem,
    removeItems,
    clearCart,
  } = useBorrowCartStore();

  const selectedIds = searchParams.get("items")
    ? new Set(searchParams.get("items")?.split(","))
    : null;

  const cartItems =
    selectedIds && selectedIds.size > 0
      ? allCartItems.filter((i) => selectedIds.has(i.id))
      : allCartItems;

  const items =
    isDirect && directCheckoutItem ? [directCheckoutItem] : cartItems;
  const { addOrder, wallet, orders } = useBorrowStore();

  const [checkoutStep, setCheckoutStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Group items by ownerId
  const itemsByOwner = items.reduce(
    (acc, item) => {
      if (!acc[item.ownerId]) {
        acc[item.ownerId] = {
          ownerName: item.ownerName,
          items: [],
        };
      }
      acc[item.ownerId].items.push(item);
      return acc;
    },
    {} as Record<string, { ownerName: string; items: BorrowCartItem[] }>,
  );

  // Form State
  const [ownerMethods, setOwnerMethods] = useState<
    Record<string, "meetup" | "courier">
  >(
    Object.keys(itemsByOwner).reduce(
      (acc, ownerId) => {
        acc[ownerId] = "meetup";
        return acc;
      },
      {} as Record<string, "meetup" | "courier">,
    ),
  );
  const [ownerMessages, setOwnerMessages] = useState<Record<string, string>>(
    {},
  );
  const [meetupLocation, setMeetupLocation] = useState<Record<string, string>>(
    {},
  );
  const [meetupDateTime, setMeetupDateTime] = useState<Record<string, string>>(
    {},
  );
  const [courierDistrict, setCourierDistrict] = useState<
    Record<string, string>
  >({});
  const [courierThana, setCourierThana] = useState<Record<string, string>>({});
  const [courierAddress, setCourierAddress] = useState<Record<string, string>>(
    {},
  );
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const MOCK_OWNER_LOCATIONS = [
    "Dhanmondi, Dhaka",
    "Mirpur 10, Dhaka",
    "Gulshan 1, Dhaka",
  ];

  const [paymentMethod, setPaymentMethod] = useState<
    "bkash" | "nagad" | "card" | "wallet"
  >("bkash");

  const handleMethodChange = (
    ownerId: string,
    method: "meetup" | "courier",
  ) => {
    setOwnerMethods((prev) => ({ ...prev, [ownerId]: method }));
  };

  const totalBorrowFee = items.reduce((sum, item) => sum + item.borrowFee, 0);
  const totalDepositRequired = items.reduce(
    (sum, item) => sum + item.depositRequired,
    0,
  );
  const totalCourierFee = Object.entries(ownerMethods).reduce(
    (sum, [ownerId, method]) => {
      if (method === "courier") {
        const districtId = courierDistrict[ownerId];
        return sum + (districtId === "47" ? 70 : 120); // 47 is Dhaka
      }
      return sum;
    },
    0,
  );
  const totalPayable = totalBorrowFee + totalCourierFee;

  const activeOrdersCount = orders.filter(
    (o) => o.borrowerId === "current-user" && o.status !== "completed",
  ).length;
  const isEligible =
    wallet.availableLimit >= totalDepositRequired && activeOrdersCount < 100;

  const isStep2Valid = Object.keys(itemsByOwner).every((ownerId) => {
    const method = ownerMethods[ownerId] || "meetup";
    if (method === "meetup") {
      return (
        !!meetupLocation[ownerId] &&
        !!meetupDateTime[ownerId] &&
        phone.trim().length >= 11
      );
    } else {
      return (
        !!courierDistrict[ownerId] &&
        !!courierThana[ownerId] &&
        !!courierAddress[ownerId] &&
        fullName.trim().length > 0 &&
        phone.trim().length >= 11
      );
    }
  });

  const handleSubmitRequest = () => {
    if (isStep2Valid) {
      setErrors({});
      handleSubmit();
      return;
    }

    const missing: string[] = [];
    const newErrors: Record<string, string> = {};
    Object.keys(itemsByOwner).forEach((ownerId) => {
      const method = ownerMethods[ownerId] || "meetup";
      if (method === "meetup") {
        if (!meetupLocation[ownerId]) {
          newErrors[`meetupLocation-${ownerId}`] = "Location is required";
          missing.push("Meetup Location");
        }
        if (!meetupDateTime[ownerId]) {
          newErrors[`meetupDateTime-${ownerId}`] = "Date & Time is required";
          missing.push("Preferred Date & Time");
        }
        if (phone.trim().length < 11) {
          newErrors.phone = "11-digit phone required";
          missing.push("Phone Number");
        }
      } else {
        if (!courierDistrict[ownerId]) {
          newErrors[`courierDistrict-${ownerId}`] = "District is required";
          missing.push("District");
        }
        if (!courierThana[ownerId]) {
          newErrors[`courierThana-${ownerId}`] = "Thana is required";
          missing.push("Thana/Upazila");
        }
        if (!courierAddress[ownerId]) {
          newErrors[`courierAddress-${ownerId}`] = "Address is required";
          missing.push("Delivery Address");
        }
        if (!fullName.trim()) {
          newErrors.fullName = "Full name is required";
          missing.push("Full Name");
        }
        if (phone.trim().length < 11) {
          newErrors.phone = "11-digit phone required";
          missing.push("Phone Number");
        }
      }
    });

    setErrors(newErrors);
    if (missing.length > 0) {
      toast.custom(
        (t) => (
          <div className="bg-background border-border flex items-center gap-3 rounded-lg border p-4 shadow-lg">
            <button
              onClick={() => toast.dismiss(t)}
              className="shrink-0 rounded-full text-red-500 transition-colors outline-none hover:text-red-600 focus-visible:ring-2 focus-visible:ring-red-500"
              aria-label="Close"
            >
              <OctagonXIcon className="size-5" />
            </button>
            <span className="text-sm font-medium text-red-500">
              Please provide: {Array.from(new Set(missing)).join(", ")}
            </span>
          </div>
        ),
        { position: "top-center", duration: 5000 },
      );
    }
  };

  const handleSubmit = () => {
    if (items.length === 0) return;
    setIsSubmitting(true);

    setTimeout(() => {
      items.forEach((item) => {
        addOrder({
          bookId: item.id,
          bookTitle: item.title,
          bookImage: item.coverUrl || "/images/books/placeholder.jpg",
          borrowerId: "current-user",
          ownerId: item.ownerId,
          handoverMethod: ownerMethods[item.ownerId] || "meetup",
          depositLocked: item.depositRequired,
          borrowFee: item.borrowFee,
        });
      });

      if (!isDirect) {
        if (selectedIds && selectedIds.size > 0) {
          removeItems(Array.from(selectedIds));
        } else {
          clearCart();
        }
      }
      toast.success("Borrow Requests Sent Successfully!");
      router.push(`/dashboard/borrowed`);
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
        <BookOpen className="text-muted-foreground mx-auto mb-4 size-16" />
        <h1 className="mb-4 text-2xl font-bold">Your Borrow Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">
          Browse the library to find books to borrow.
        </p>
        <Button asChild>
          <Link href="/">Browse Books</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-md px-4 py-6 md:max-w-3xl">
      <div className="mb-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            checkoutStep > 1
              ? setCheckoutStep((prev) => (prev - 1) as 1 | 2)
              : router.back()
          }
        >
          <ArrowLeft className="size-5" />
        </Button>
        <h1 className="ml-2 text-lg font-semibold">
          {checkoutStep === 1 && "Eligibility Check"}
          {checkoutStep === 2 && "Request to Borrow"}
        </h1>
      </div>

      <div className="mb-4">
        {/* STEP 1: ELIGIBILITY */}
        {checkoutStep === 1 && (
          <div className="animate-in slide-in-from-bottom-4 space-y-4">
            <EligibilityCard
              depositRequired={totalDepositRequired}
              availableLimit={wallet.availableLimit}
              activeOrders={activeOrdersCount}
              maxActiveOrders={100}
            />
            <Button
              className="h-12 w-full text-lg"
              disabled={!isEligible}
              onClick={() => setCheckoutStep(2)}
            >
              Continue
            </Button>
          </div>
        )}

        {/* STEP 2: REQUEST DETAILS */}
        {checkoutStep === 2 && (
          <div className="animate-in slide-in-from-bottom-4 space-y-4">
            {Object.entries(itemsByOwner).map(([ownerId, group], index) => (
              <Card
                key={ownerId}
                className="overflow-hidden rounded-xl border shadow-sm"
              >
                <CardContent className="p-0">
                  <div className="space-y-3 px-4 pt-2 pb-2">
                    <div>
                      <Label className="mb-3 block text-sm font-semibold">
                        Choose Delivery Method
                      </Label>
                      <RadioGroup
                        value={ownerMethods[ownerId] || "meetup"}
                        onValueChange={(val) =>
                          handleMethodChange(
                            ownerId,
                            val as "meetup" | "courier",
                          )
                        }
                        className="grid gap-2 sm:grid-cols-2"
                      >
                        <Label
                          htmlFor={`meetup-${ownerId}`}
                          className="hover:bg-muted/50 flex cursor-pointer items-center justify-between rounded-lg border-2 p-3 [&:has([data-state=checked])]:border-blue-600 [&:has([data-state=checked])]:bg-blue-50 dark:[&:has([data-state=checked])]:bg-blue-950/20"
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem
                              value="meetup"
                              id={`meetup-${ownerId}`}
                              className="text-blue-600"
                            />
                            <div className="flex items-center gap-2">
                              <MapPin className="size-5 text-blue-600" />
                              <div>
                                <p className="text-sm font-semibold">Meetup</p>
                                <p className="text-muted-foreground text-xs">
                                  Meet in person
                                </p>
                              </div>
                            </div>
                          </div>
                        </Label>
                        <Label
                          htmlFor={`courier-${ownerId}`}
                          className="hover:bg-muted/50 flex cursor-pointer items-center justify-between rounded-lg border-2 p-3 [&:has([data-state=checked])]:border-blue-600 [&:has([data-state=checked])]:bg-blue-50 dark:[&:has([data-state=checked])]:bg-blue-950/20"
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem
                              value="courier"
                              id={`courier-${ownerId}`}
                              className="text-blue-600"
                            />
                            <div className="flex items-center gap-2">
                              <Truck className="size-5 text-blue-600" />
                              <div>
                                <p className="text-sm font-semibold">Courier</p>
                                <p className="text-muted-foreground text-xs">
                                  Deliver via courier
                                </p>
                              </div>
                            </div>
                          </div>
                        </Label>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      {ownerMethods[ownerId] === "meetup" ||
                      !ownerMethods[ownerId] ? (
                        <>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-muted-foreground text-xs font-semibold">
                                Select Meetup Location (Owner&apos;s Preference){" "}
                                <span className="text-red-500">*</span>
                              </Label>
                              {errors[`meetupLocation-${ownerId}`] && (
                                <span className="text-xs font-medium text-red-500">
                                  {errors[`meetupLocation-${ownerId}`]}
                                </span>
                              )}
                            </div>
                            <Select
                              value={meetupLocation[ownerId] || ""}
                              onValueChange={(val) => {
                                setMeetupLocation((prev) => ({
                                  ...prev,
                                  [ownerId]: val,
                                }));
                                setErrors((prev) => ({
                                  ...prev,
                                  [`meetupLocation-${ownerId}`]: "",
                                }));
                              }}
                            >
                              <SelectTrigger
                                className={`bg-background h-11 w-full text-sm ${errors[`meetupLocation-${ownerId}`] ? "border-red-500 focus:ring-red-500" : ""}`}
                              >
                                <SelectValue placeholder="Select a location..." />
                              </SelectTrigger>
                              <SelectContent>
                                {MOCK_OWNER_LOCATIONS.map((loc) => (
                                  <SelectItem key={loc} value={loc}>
                                    {loc}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-muted-foreground text-xs font-semibold">
                                Preferred Date & Time{" "}
                                <span className="text-red-500">*</span>
                              </Label>
                              {errors[`meetupDateTime-${ownerId}`] && (
                                <span className="text-xs font-medium text-red-500">
                                  {errors[`meetupDateTime-${ownerId}`]}
                                </span>
                              )}
                            </div>
                            <div className="relative">
                              <Calendar
                                className={`absolute top-1/2 left-3 size-4 -translate-y-1/2 ${errors[`meetupDateTime-${ownerId}`] ? "text-red-500" : "text-muted-foreground"}`}
                              />
                              <Input
                                type="datetime-local"
                                className={`pl-9 text-sm ${errors[`meetupDateTime-${ownerId}`] ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                value={meetupDateTime[ownerId] || ""}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setMeetupDateTime((prev) => ({
                                    ...prev,
                                    [ownerId]: val,
                                  }));
                                  if (!val.trim()) {
                                    setErrors((prev) => ({
                                      ...prev,
                                      [`meetupDateTime-${ownerId}`]:
                                        "Date & Time is required",
                                    }));
                                  } else {
                                    setErrors((prev) => ({
                                      ...prev,
                                      [`meetupDateTime-${ownerId}`]: "",
                                    }));
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-muted-foreground text-xs font-semibold">
                                Phone Number{" "}
                                <span className="text-red-500">*</span>
                              </Label>
                              {errors.phone && (
                                <span className="text-xs font-medium text-red-500">
                                  {errors.phone}
                                </span>
                              )}
                            </div>
                            <Input
                              placeholder="e.g. 017xxxxxxxx"
                              value={phone}
                              onChange={(e) => {
                                const val = e.target.value;
                                setPhone(val);
                                if (val.trim().length < 11) {
                                  setErrors((prev) => ({
                                    ...prev,
                                    phone: "11-digit phone required",
                                  }));
                                } else {
                                  setErrors((prev) => ({ ...prev, phone: "" }));
                                }
                              }}
                              className={`h-11 ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                              type="tel"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="text-muted-foreground text-xs font-semibold">
                                  Select District{" "}
                                  <span className="text-red-500">*</span>
                                </Label>
                                {errors[`courierDistrict-${ownerId}`] && (
                                  <span className="text-xs font-medium text-red-500">
                                    {errors[`courierDistrict-${ownerId}`]}
                                  </span>
                                )}
                              </div>
                              <Select
                                value={courierDistrict[ownerId] || ""}
                                onValueChange={(val) => {
                                  setCourierDistrict((prev) => ({
                                    ...prev,
                                    [ownerId]: val,
                                  }));
                                  setCourierThana((prev) => ({
                                    ...prev,
                                    [ownerId]: "",
                                  }));
                                  setErrors((prev) => ({
                                    ...prev,
                                    [`courierDistrict-${ownerId}`]: "",
                                  }));
                                }}
                              >
                                <SelectTrigger
                                  className={`bg-background h-11 w-full text-sm ${errors[`courierDistrict-${ownerId}`] ? "border-red-500 focus:ring-red-500" : ""}`}
                                >
                                  <SelectValue placeholder="Select District" />
                                </SelectTrigger>
                                <SelectContent>
                                  {BD_DISTRICTS.map((dist) => (
                                    <SelectItem key={dist.id} value={dist.id}>
                                      {dist.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="text-muted-foreground text-xs font-semibold">
                                  Select Thana / Upazila{" "}
                                  <span className="text-red-500">*</span>
                                </Label>
                                {errors[`courierThana-${ownerId}`] && (
                                  <span className="text-xs font-medium text-red-500">
                                    {errors[`courierThana-${ownerId}`]}
                                  </span>
                                )}
                              </div>
                              <Select
                                value={courierThana[ownerId] || ""}
                                onValueChange={(val) => {
                                  setCourierThana((prev) => ({
                                    ...prev,
                                    [ownerId]: val,
                                  }));
                                  setErrors((prev) => ({
                                    ...prev,
                                    [`courierThana-${ownerId}`]: "",
                                  }));
                                }}
                                disabled={!courierDistrict[ownerId]}
                              >
                                <SelectTrigger
                                  className={`bg-background h-11 w-full text-sm ${errors[`courierThana-${ownerId}`] ? "border-red-500 focus:ring-red-500" : ""}`}
                                >
                                  <SelectValue placeholder="Select Thana" />
                                </SelectTrigger>
                                <SelectContent>
                                  {BD_THANAS.filter(
                                    (t) =>
                                      t.district_id ===
                                      courierDistrict[ownerId],
                                  ).map((thana) => (
                                    <SelectItem key={thana.id} value={thana.id}>
                                      {thana.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-muted-foreground text-xs font-semibold">
                                Delivery Address{" "}
                                <span className="text-red-500">*</span>
                              </Label>
                              {errors[`courierAddress-${ownerId}`] && (
                                <span className="text-xs font-medium text-red-500">
                                  {errors[`courierAddress-${ownerId}`]}
                                </span>
                              )}
                            </div>
                            <div className="relative">
                              <MapPin
                                className={`absolute top-3 left-3 size-4 ${errors[`courierAddress-${ownerId}`] ? "text-red-500" : "text-muted-foreground"}`}
                              />
                              <Textarea
                                placeholder="Enter your full address..."
                                className={`min-h-[80px] pl-9 text-sm ${errors[`courierAddress-${ownerId}`] ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                value={courierAddress[ownerId] || ""}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setCourierAddress((prev) => ({
                                    ...prev,
                                    [ownerId]: val,
                                  }));
                                  if (!val.trim()) {
                                    setErrors((prev) => ({
                                      ...prev,
                                      [`courierAddress-${ownerId}`]:
                                        "Address is required",
                                    }));
                                  } else {
                                    setErrors((prev) => ({
                                      ...prev,
                                      [`courierAddress-${ownerId}`]: "",
                                    }));
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="text-muted-foreground text-xs font-semibold">
                                  Full Name{" "}
                                  <span className="text-red-500">*</span>
                                </Label>
                                {errors.fullName && (
                                  <span className="text-xs font-medium text-red-500">
                                    {errors.fullName}
                                  </span>
                                )}
                              </div>
                              <Input
                                placeholder="e.g. Roni Ahamed"
                                value={fullName}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setFullName(val);
                                  if (!val.trim()) {
                                    setErrors((prev) => ({
                                      ...prev,
                                      fullName: "Full name is required",
                                    }));
                                  } else {
                                    setErrors((prev) => ({
                                      ...prev,
                                      fullName: "",
                                    }));
                                  }
                                }}
                                className={`h-11 ${errors.fullName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="text-muted-foreground text-xs font-semibold">
                                  Phone Number{" "}
                                  <span className="text-red-500">*</span>
                                </Label>
                                {errors.phone && (
                                  <span className="text-xs font-medium text-red-500">
                                    {errors.phone}
                                  </span>
                                )}
                              </div>
                              <Input
                                placeholder="e.g. 017xxxxxxxx"
                                value={phone}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setPhone(val);
                                  if (val.trim().length < 11) {
                                    setErrors((prev) => ({
                                      ...prev,
                                      phone: "11-digit phone required",
                                    }));
                                  } else {
                                    setErrors((prev) => ({
                                      ...prev,
                                      phone: "",
                                    }));
                                  }
                                }}
                                className={`h-11 ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                type="tel"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-xs font-semibold">
                          Message to Owner (optional)
                        </Label>
                        <Textarea
                          placeholder="Write a message..."
                          className="h-20 resize-none text-sm"
                          value={ownerMessages[ownerId] || ""}
                          onChange={(e) =>
                            setOwnerMessages((prev) => ({
                              ...prev,
                              [ownerId]: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/10 border-t px-4 py-2">
                    {(() => {
                      const groupBorrowFee = group.items.reduce(
                        (s, i) => s + i.borrowFee,
                        0,
                      );
                      const groupCourierFee =
                        ownerMethods[ownerId] === "courier"
                          ? courierDistrict[ownerId] === "47"
                            ? 70
                            : 120
                          : 0;
                      const groupTotal = groupBorrowFee + groupCourierFee;

                      return (
                        <div className="bg-background rounded-lg border p-4 shadow-sm">
                          <div className="text-muted-foreground space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>
                                Borrow Fee ({group.items.length} books)
                              </span>
                              <span>৳{groupBorrowFee}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Est. Courier Fee</span>
                              <span>৳{groupCourierFee}</span>
                            </div>
                          </div>
                          <div className="border-border mt-3 flex justify-between border-t pt-3 text-base font-bold text-blue-600">
                            <span>Total Payable</span>
                            <span>৳{groupTotal}</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-12 w-full text-lg"
                onClick={() => setCheckoutStep(1)}
                disabled={isSubmitting}
              >
                Back
              </Button>
              <Button
                className="h-12 w-full text-lg"
                onClick={handleSubmitRequest}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BorrowCartPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto p-8 text-center">
          Loading checkout...
        </div>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}
