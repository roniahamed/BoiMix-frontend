"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.62-1.496 3.603-2.947 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.533 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702z"/>
  </svg>
);

const loginSchema = z.object({
  email: z.string().email("সঠিক ইমেইল দিন"),
  password: z.string().min(6, "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/stores/auth-store";
import { apiClient, setApiAccessToken } from "@/lib/api/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleAuthSuccess = (response: any) => {
    setApiAccessToken(response.data.access_token);
    setSession(
      {
        id: response.data.user.id,
        name: response.data.user.full_name || response.data.user.name || "User",
        username: response.data.user.username,
        email: response.data.user.email,
        avatarUrl: response.data.user.avatarUrl || response.data.user.avatar_url,
        roles: [response.data.user.role || "user"],
      },
      response.data.access_token
    );
    toast.success("Successfully logged in!");
    
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
  };

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const idToken = await userCredential.user.getIdToken();

      const response = await apiClient.post<{ access_token: string; user: any }>("/auth/firebase-login", {
        id_token: idToken,
      });

      handleAuthSuccess(response);
    } catch (error: any) {
      console.error("Login Error:", error);
      if (error?.details?.terms_accepted) {
        toast.error("আপনাকে আগে নিবন্ধন (Register) করতে হবে।");
        router.push("/auth/register");
      } else {
        toast.error(error?.message || "Failed to login. Check your credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();
      
      const response = await apiClient.post<{ access_token: string; user: any }>("/auth/firebase-login", {
        id_token: idToken,
        full_name: userCredential.user.displayName,
      });

      handleAuthSuccess(response);
    } catch (error: any) {
      console.error("Google Login Error:", error);
      if (error?.details?.terms_accepted) {
        toast.error("আপনাকে আগে নিবন্ধন (Register) করতে হবে।");
        router.push("/auth/register");
      } else {
        toast.error(error?.message || "Failed to login with Google.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setIsLoading(true);
    try {
      const provider = new OAuthProvider("apple.com");
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();
      
      const response = await apiClient.post<{ access_token: string; user: any }>("/auth/firebase-login", {
        id_token: idToken,
        full_name: userCredential.user.displayName,
      });

      handleAuthSuccess(response);
    } catch (error: any) {
      console.error("Apple Login Error:", error);
      if (error?.details?.terms_accepted) {
        toast.error("আপনাকে আগে নিবন্ধন (Register) করতে হবে।");
        router.push("/auth/register");
      } else {
        toast.error(error?.message || "Failed to login with Apple.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="type-heading text-3xl">স্বাগতম!</h1>
        <p className="text-muted-foreground text-sm">
          আপনার অ্যাকাউন্টে লগইন করুন
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">পাসওয়ার্ড</Label>
            <Link
              href="/auth/forgot-password"
              className="text-primary hover:text-primary/80 text-sm font-medium underline-offset-4 hover:underline"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </Link>
          </div>
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

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              অপেক্ষা করুন...
            </>
          ) : (
            "লগইন করুন"
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
        <Button variant="outline" type="button" disabled={isLoading} onClick={handleGoogleLogin}>
          <GoogleIcon className="mr-2 size-5" />
          Google দিয়ে লগইন করুন
        </Button>
        <Button variant="outline" type="button" disabled={isLoading} onClick={handleAppleLogin}>
          <AppleIcon className="mr-2 size-5" />
          Apple দিয়ে লগইন করুন
        </Button>
      </div>

      <p className="text-muted-foreground px-8 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href="/auth/register"
          className="text-primary hover:text-primary/80 font-semibold underline-offset-4 hover:underline"
        >
          রেজিস্ট্রেশন করুন
        </Link>
      </p>
    </div>
  );
}
