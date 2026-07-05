"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, Suspense } from "react";
import { CreditCard, Banknote, ShieldCheck } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreatableCombobox } from "@/components/ui/creatable-combobox";
import { useCartStore } from "@/lib/store/use-cart-store";
import { useOrderStore } from "@/lib/store/use-order-store";
import { cn } from "@/lib/utils";

import { BD_DISTRICTS, BD_THANAS } from "@/lib/data/bd-locations";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(
      /^01\d{9}$/,
      "Phone number must be exactly 11 digits starting with 01",
    ),
  district: z.string().min(2, "Please select or type a district"),
  thana: z.string().min(2, "Thana/Upazila is required"),
  address: z.string().min(5, "Please provide detailed address"),
  paymentMethod: z.enum(["bkash", "nagad", "cod"]),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const DISTRICT_OPTIONS = BD_DISTRICTS.map(
  (d) => `${d.name} - ${d.bn_name}`,
).sort((a, b) => a.localeCompare(b));

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { items: allItems, removeItems } = useCartStore();
  const { addOrder } = useOrderStore();

  // Filter to only the selected items passed via URL
  const selectedIds = useMemo(() => {
    const param = searchParams.get("items");
    return param ? new Set(param.split(",")) : null;
  }, [searchParams]);

  const items = useMemo(() => {
    if (!selectedIds || selectedIds.size === 0) return allItems;
    return allItems.filter((item) => selectedIds.has(item.id));
  }, [allItems, selectedIds]);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      phone: "",
      district: "",
      thana: "",
      address: "",
      paymentMethod: "bkash",
    },
  });

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = form;
  const district = useWatch({ control, name: "district" }) || "";
  const thana = useWatch({ control, name: "thana" }) || "";
  const paymentMethod = useWatch({ control, name: "paymentMethod" }) || "bkash";

  // Calculate dynamic Thanas based on selected District
  const selectedDistrictObj = useMemo(() => {
    return BD_DISTRICTS.find((d) => `${d.name} - ${d.bn_name}` === district);
  }, [district]);

  const thanaOptions = useMemo(() => {
    if (!selectedDistrictObj) return [];
    return BD_THANAS.filter((t) => t.district_id === selectedDistrictObj.id)
      .map((t) => `${t.name} - ${t.bn_name}`)
      .sort((a, b) => a.localeCompare(b));
  }, [selectedDistrictObj]);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  if (!mounted) {
    return null;
  }

  // Redirect back if cart is empty
  if (items.length === 0) {
    router.replace("/cart");
    return null;
  }

  // Calculate unique sellers
  const uniqueSellersCount = new Set(items.map((item) => item.sellerId)).size;
  const isDhaka = district.toLowerCase().includes("dhaka");
  const deliveryChargePerSeller = isDhaka ? 60 : 120;

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const deliveryFee = uniqueSellersCount * deliveryChargePerSeller;
  const total = subtotal + deliveryFee;

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsProcessing(true);

    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newOrder = {
      id: "ORD-" + generateOrderId(),
      date: new Date().toISOString(),
      items: [...items],
      total,
      deliveryFee,
      subtotal,
      status: "processing" as const,
      paymentMethod: data.paymentMethod,
    };

    addOrder(newOrder);

    if (data.paymentMethod === "cod") {
      removeItems(items.map((i) => i.id));
      router.push("/orders/success");
    } else {
      router.push(
        `/orders/payment?method=${data.paymentMethod}&amount=${total}`,
      );
    }
  };

  return (
    <div className="boimix-container-wide py-4 sm:py-8 md:py-12">
      <div className="mb-4 sm:mb-8">
        <h1 className="type-heading text-2xl sm:text-3xl">চেকআউট (Checkout)</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-6 sm:gap-8 lg:grid-cols-12"
      >
        {/* Left Column: Forms */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:col-span-8">
          {/* Shipping Details */}
          <div className="bg-card rounded-xl border p-4 shadow-sm sm:p-6 md:p-8">
            <h2 className="type-heading mb-4 text-lg sm:mb-6 sm:text-xl">
              ডেলিভারি ঠিকানা
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">আপনার নাম</Label>
                <Input
                  id="name"
                  placeholder="উদাঃ রহিম শেখ"
                  {...form.register("name")}
                />
                {errors.name && (
                  <p className="text-destructive text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">মোবাইল নাম্বার</Label>
                <Input
                  id="phone"
                  placeholder="01XXX-XXXXXX"
                  type="tel"
                  {...form.register("phone")}
                />
                {errors.phone && (
                  <p className="text-destructive text-sm">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>জেলা</Label>
                <CreatableCombobox
                  options={DISTRICT_OPTIONS}
                  value={district}
                  onChange={(val) => {
                    setValue("district", val, { shouldValidate: true });
                    setValue("thana", ""); // Reset thana when district changes
                  }}
                  placeholder="জেলা নির্বাচন করুন বা লিখুন (e.g. Dhaka / ঢাকা)"
                  emptyText="No district found."
                />
                {errors.district && (
                  <p className="text-destructive text-sm">
                    {errors.district.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>থানা/উপজেলা</Label>
                <CreatableCombobox
                  options={thanaOptions}
                  value={thana}
                  onChange={(val) =>
                    setValue("thana", val, { shouldValidate: true })
                  }
                  placeholder={
                    selectedDistrictObj
                      ? "থানা নির্বাচন করুন বা লিখুন"
                      : "প্রথমে জেলা নির্বাচন করুন"
                  }
                  emptyText={
                    selectedDistrictObj
                      ? "Type to add your thana"
                      : "Please select a district first"
                  }
                />
                {errors.thana && (
                  <p className="text-destructive text-sm">
                    {errors.thana.message}
                  </p>
                )}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">সম্পূর্ণ ঠিকানা</Label>
                <Textarea
                  id="address"
                  placeholder="বাড়ি নং, রাস্তা নং, পাড়া/মহল্লা"
                  className="min-h-[80px] resize-y sm:min-h-[100px]"
                  {...form.register("address")}
                />
                {errors.address && (
                  <p className="text-destructive text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-card rounded-xl border p-4 shadow-sm sm:p-6 md:p-8">
            <h2 className="type-heading mb-4 text-lg sm:mb-6 sm:text-xl">
              পেমেন্ট মেথড নির্বাচন করুন
            </h2>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {/* bKash */}
              <button
                type="button"
                onClick={() => setValue("paymentMethod", "bkash")}
                className={cn(
                  "flex flex-col items-center gap-3 rounded-xl border-2 p-4 text-center transition-all",
                  paymentMethod === "bkash"
                    ? "border-[#E2136E] bg-[#E2136E]/5"
                    : "border-border hover:border-[#E2136E]/50",
                )}
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-[#E2136E] text-white">
                  <span className="font-bold">b</span>
                </div>
                <span className="text-foreground font-semibold">bKash</span>
              </button>

              {/* Nagad */}
              <button
                type="button"
                onClick={() => setValue("paymentMethod", "nagad")}
                className={cn(
                  "flex flex-col items-center gap-3 rounded-xl border-2 p-4 text-center transition-all",
                  paymentMethod === "nagad"
                    ? "border-[#F7941D] bg-[#F7941D]/5"
                    : "border-border hover:border-[#F7941D]/50",
                )}
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-[#F7941D] text-white">
                  <span className="font-bold">N</span>
                </div>
                <span className="text-foreground font-semibold">Nagad</span>
              </button>

              {/* Cash on Delivery */}
              <button
                type="button"
                onClick={() => setValue("paymentMethod", "cod")}
                className={cn(
                  "flex flex-col items-center gap-3 rounded-xl border-2 p-4 text-center transition-all",
                  paymentMethod === "cod"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50",
                )}
              >
                <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
                  <Banknote className="size-6" />
                </div>
                <span className="text-foreground font-semibold">
                  Cash on Delivery
                </span>
              </button>
            </div>

            {paymentMethod !== "cod" && (
              <div className="bg-info/10 text-info mt-4 rounded-lg p-4 text-sm">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                  <p>
                    <strong>নিরাপদ পেমেন্ট:</strong> আপনার পেমেন্টটি বক্সে
                    সংরক্ষিত থাকবে। আপনি বই হাতে পাওয়ার পর এবং কনফার্ম করার পরেই
                    সেলার টাকাটি পাবে।
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-card sticky top-24 overflow-hidden rounded-xl border shadow-sm">
            <div className="bg-muted/30 border-b px-6 py-4">
              <h2 className="type-heading text-lg">অর্ডার সামারি</h2>
            </div>

            <div className="p-6">
              <div className="mb-6 flex flex-col gap-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground line-clamp-1 flex-1 pr-4">
                      {item.quantity}x {item.title}
                    </span>
                    <span className="shrink-0 font-medium">
                      ৳{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">সাবটোটাল</span>
                  <span className="font-medium">৳{subtotal}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">
                      ডেলিভারি চার্জ
                    </span>
                    <span className="text-muted-foreground/70 text-[10px]">
                      ({uniqueSellersCount} sellers × ৳{deliveryChargePerSeller}
                      )
                    </span>
                  </div>
                  <span className="font-medium">৳{deliveryFee}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold">সর্বমোট</span>
                    <span className="text-accent text-2xl font-bold">
                      ৳{total}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                className="mt-6 h-12 w-full text-base transition-all"
                size="lg"
              >
                <CreditCard className="mr-2 size-5" />
                {isProcessing
                  ? "Processing..."
                  : paymentMethod === "cod"
                    ? "Confirm Order"
                    : "Proceed to Pay"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const generateOrderId = () => Math.floor(Math.random() * 1000000);

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="boimix-container-wide text-muted-foreground py-12 text-center">
          Loading checkout...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
