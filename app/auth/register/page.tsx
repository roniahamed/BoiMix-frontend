"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);

const AppleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.62-1.496 3.603-2.947 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.533 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702z" />
  </svg>
);

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
    getValues,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      // 1. Create Firebase user
      const { createUserWithEmailAndPassword, updateProfile } =
        await import("firebase/auth");
      const { auth } = await import("@/lib/firebase");
      const { apiClient, setApiAccessToken } = await import("@/lib/api/client");
      const { useAuthStore } = await import("@/stores/auth-store");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await updateProfile(userCredential.user, { displayName: data.fullName });
      const idToken = await userCredential.user.getIdToken();

      // 2. Register with backend via firebase-login
      const response = await apiClient.post<{
        access_token: string;
        refresh_token?: string;
        user: Record<string, unknown>;
      }>("/auth/firebase-login", {
        id_token: idToken,
        full_name: data.fullName,
        terms_accepted: data.termsAccepted,
      });

      setApiAccessToken(response.data.access_token);
      useAuthStore.getState().setSession(
        {
          id: response.data.user.id as string,
          name: data.fullName,
          email: data.email,
          roles: [(response.data.user.role as string) || "user"],
          isOnboarded: (response.data.user.is_onboarded as boolean) ?? false,
        },
        response.data.access_token,
        response.data.refresh_token as string,
      );

      let redirectQuery = "";
      if (typeof window !== "undefined") {
        const searchParams = new URLSearchParams(window.location.search);
        const r = searchParams.get("redirect");
        if (r) redirectQuery = `?redirect=${encodeURIComponent(r)}`;
      }
      router.push(`/auth/complete-profile${redirectQuery}`);
       
    } catch (error: unknown) {
      console.error("Register Error:", error);
      const msg =
        (error as any)?.response?.data?.error?.message ||
        (error as any)?.message ||
        "Registration failed.";
      alert(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const termsAccepted = getValues("termsAccepted");
    if (!termsAccepted) {
      const { toast } = await import("sonner");
      toast.error("অনুগ্রহ করে শর্তাবলী এবং গোপনীয়তা নীতি মেনে নিন।");
      return;
    }

    setIsLoading(true);
    try {
      const { signInWithPopup, GoogleAuthProvider } =
        await import("firebase/auth");
      const { auth } = await import("@/lib/firebase");
      const { apiClient, setApiAccessToken } = await import("@/lib/api/client");
      const { useAuthStore } = await import("@/stores/auth-store");

      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();

       
      const response = await apiClient.post<{
        access_token: string;
        refresh_token?: string;
        user: any;
      }>("/auth/firebase-login", {
        id_token: idToken,
        full_name: userCredential.user.displayName,
        terms_accepted: true,
      });

      setApiAccessToken(response.data.access_token);
      useAuthStore.getState().setSession(
        {
          id: response.data.user.id,
          name:
            response.data.user.full_name || response.data.user.name || "User",
          username: response.data.user.username,
          email: response.data.user.email,
          avatarUrl:
            response.data.user.avatarUrl || response.data.user.avatar_url,
          roles: [response.data.user.role || "user"],
          isOnboarded: response.data.user.is_onboarded ?? false,
        },
        response.data.access_token,
        response.data.refresh_token,
      );

      let redirectUrl = "/dashboard/overview";
      if (!response.data.user.is_onboarded) {
        let redirectQuery = "";
        if (typeof window !== "undefined") {
          const searchParams = new URLSearchParams(window.location.search);
          const r = searchParams.get("redirect");
          if (r) redirectQuery = `?redirect=${encodeURIComponent(r)}`;
        }
        redirectUrl = `/auth/complete-profile${redirectQuery}`;
      } else {
        if (typeof window !== "undefined") {
          const searchParams = new URLSearchParams(window.location.search);
          redirectUrl = searchParams.get("redirect") || "/dashboard/overview";
        }
      }
      router.push(redirectUrl);
       
    } catch (error: unknown) {
      console.error("Google Login Error:", error);
      const msg =
        (error as any)?.response?.data?.error?.message ||
        (error as any)?.message ||
        "Google registration failed.";
      alert(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    const termsAccepted = getValues("termsAccepted");
    if (!termsAccepted) {
      const { toast } = await import("sonner");
      toast.error("অনুগ্রহ করে শর্তাবলী এবং গোপনীয়তা নীতি মেনে নিন।");
      return;
    }

    setIsLoading(true);
    try {
      const { signInWithPopup, OAuthProvider } = await import("firebase/auth");
      const { auth } = await import("@/lib/firebase");
      const { apiClient, setApiAccessToken } = await import("@/lib/api/client");
      const { useAuthStore } = await import("@/stores/auth-store");

      const provider = new OAuthProvider("apple.com");
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();

       
      const response = await apiClient.post<{
        access_token: string;
        refresh_token?: string;
        user: any;
      }>("/auth/firebase-login", {
        id_token: idToken,
        full_name: userCredential.user.displayName,
        terms_accepted: true,
      });

      setApiAccessToken(response.data.access_token);
      useAuthStore.getState().setSession(
        {
          id: response.data.user.id,
          name:
            response.data.user.full_name || response.data.user.name || "User",
          username: response.data.user.username,
          email: response.data.user.email,
          avatarUrl:
            response.data.user.avatarUrl || response.data.user.avatar_url,
          roles: [response.data.user.role || "user"],
          isOnboarded: response.data.user.is_onboarded ?? false,
        },
        response.data.access_token,
        response.data.refresh_token,
      );

      let redirectUrl = "/dashboard/overview";
      if (!response.data.user.is_onboarded) {
        let redirectQuery = "";
        if (typeof window !== "undefined") {
          const searchParams = new URLSearchParams(window.location.search);
          const r = searchParams.get("redirect");
          if (r) redirectQuery = `?redirect=${encodeURIComponent(r)}`;
        }
        redirectUrl = `/auth/complete-profile${redirectQuery}`;
      } else {
        if (typeof window !== "undefined") {
          const searchParams = new URLSearchParams(window.location.search);
          redirectUrl = searchParams.get("redirect") || "/dashboard/overview";
        }
      }
      router.push(redirectUrl);
       
    } catch (error: unknown) {
      console.error("Apple Login Error:", error);
      const msg =
        (error as any)?.response?.data?.error?.message ||
        (error as any)?.message ||
        "Apple registration failed.";
      alert(msg);
    } finally {
      setIsLoading(false);
    }
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

        <div className="space-y-2">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="termsAccepted"
              className="mt-1"
              onCheckedChange={(checked) =>
                setValue("termsAccepted", checked as boolean)
              }
            />
            <Label
              htmlFor="termsAccepted"
              className="text-muted-foreground block text-sm leading-snug font-normal"
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
          </div>
          {errors.termsAccepted && (
            <p className="text-destructive text-sm">
              {errors.termsAccepted.message}
            </p>
          )}
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
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={handleGoogleLogin}
        >
          <GoogleIcon className="mr-2 size-5" />
          Google দিয়ে অ্যাকাউন্ট খুলুন
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={handleAppleLogin}
        >
          <AppleIcon className="mr-2 size-5" />
          Apple দিয়ে অ্যাকাউন্ট খুলুন
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
