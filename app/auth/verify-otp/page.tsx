"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const otpSchema = z.object({
  otp: z.string().length(6, "সঠিক ৬ ডিজিটের ওটিপি দিন"),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export default function VerifyOtpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
  });

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const onSubmit = async (data: OtpFormValues) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    setIsLoading(false);
    // Navigate to complete profile
    router.push("/auth/complete-profile");
  };

  const handleResend = () => {
    setTimeLeft(60);
    // Add resend logic here
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="type-heading text-3xl">ভেরিফিকেশন কোড</h1>
        <p className="text-muted-foreground text-sm">
          আপনার ইমেইলে পাঠানো ৬ ডিজিটের কোডটি দিন
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2 text-center">
          <Input
            id="otp"
            type="text"
            placeholder="• • • • • •"
            maxLength={6}
            {...register("otp")}
            className={`mx-auto max-w-[250px] text-center text-2xl font-bold tracking-[1em] ${
              errors.otp
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }`}
          />
          {errors.otp && (
            <p className="text-destructive text-sm">{errors.otp.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              অপেক্ষা করুন...
            </>
          ) : (
            "ভেরিফাই করুন"
          )}
        </Button>
      </form>

      <div className="text-muted-foreground text-center text-sm">
        {timeLeft > 0 ? (
          <p>পুনরায় কোড পাঠানো যাবে {timeLeft} সেকেন্ড পর</p>
        ) : (
          <p>
            কোড পাননি?{" "}
            <button
              onClick={handleResend}
              className="text-primary hover:text-primary/80 font-semibold underline-offset-4 hover:underline"
            >
              আবার পাঠান
            </button>
          </p>
        )}
      </div>

      <div className="text-center text-sm">
        <Link
          href="/auth/register"
          className="text-muted-foreground hover:text-primary font-medium underline-offset-4 hover:underline"
        >
          &larr; পিছনে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
