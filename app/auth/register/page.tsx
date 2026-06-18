"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const registerSchema = z
  .object({
    fullName: z.string().min(3, "নাম অন্তত ৩ অক্ষরের হতে হবে"),
    email: z.string().email("সঠিক ইমেইল দিন"),
    password: z.string().min(6, "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে"),
    confirmPassword: z.string(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "আপনাকে শর্তাবলীতে সম্মত হতে হবে",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "পাসওয়ার্ড মিলেনি",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      termsAccepted: false,
    },
  });

  const termsAccepted = useWatch({
    control,
    name: "termsAccepted",
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    setIsLoading(false);
    // Move to next step (OTP verification or complete profile)
    router.push("/auth/verify-otp");
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="type-heading text-3xl">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-muted-foreground text-sm">
          BoiMix-এ যোগ দিতে আপনার তথ্য দিন
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">আপনার পুরো নাম</Label>
          <Input
            id="fullName"
            placeholder="যেমন: হুমায়ূন আহমেদ"
            {...register("fullName")}
            className={
              errors.fullName
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.fullName && (
            <p className="text-destructive text-sm">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">ইমেইল</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            {...register("email")}
            className={
              errors.email
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.email && (
            <p className="text-destructive text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">পাসওয়ার্ড</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              className={
                errors.password
                  ? "border-destructive focus-visible:ring-destructive pr-10"
                  : "pr-10"
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-destructive text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">পাসওয়ার্ড নিশ্চিত করুন</Label>
          <Input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("confirmPassword")}
            className={
              errors.confirmPassword
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.confirmPassword && (
            <p className="text-destructive text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex flex-row items-start space-y-0 space-x-3 py-2">
          <Checkbox
            id="termsAccepted"
            checked={termsAccepted}
            onCheckedChange={(checked) =>
              setValue("termsAccepted", checked as boolean, {
                shouldValidate: true,
              })
            }
            className={errors.termsAccepted ? "border-destructive" : ""}
          />
          <div className="space-y-1 leading-none">
            <Label
              htmlFor="termsAccepted"
              className="text-muted-foreground text-sm font-normal"
            >
              আমি BoiMix-এর{" "}
              <Link href="/terms" className="text-primary hover:underline">
                শর্তাবলী
              </Link>{" "}
              এবং{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                গোপনীয়তা নীতি
              </Link>{" "}
              মেনে নিচ্ছি।
            </Label>
            {errors.termsAccepted && (
              <p className="text-destructive text-xs">
                {errors.termsAccepted.message}
              </p>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              অপেক্ষা করুন...
            </>
          ) : (
            "অ্যাকাউন্ট তৈরি করুন"
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">অথবা</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Button variant="outline" type="button" disabled={isLoading}>
          Google
        </Button>
      </div>

      <p className="text-muted-foreground px-8 text-center text-sm">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/auth/login"
          className="text-primary hover:text-primary/80 font-semibold underline-offset-4 hover:underline"
        >
          লগইন করুন
        </Link>
      </p>
    </div>
  );
}
