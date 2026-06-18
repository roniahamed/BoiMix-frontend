"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ChooseLanguagePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<"bn" | "en">("bn");

  const handleContinue = async () => {
    setIsLoading(true);
    // Save language preference here
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Proceed to student verification or dashboard
    router.push("/auth/verify-student-id");
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="type-heading text-3xl">আপনার ভাষা নির্বাচন করুন</h1>
        <p className="text-muted-foreground text-sm">
          BoiMix-এর ইন্টারফেস আপনি কোন ভাষায় দেখতে চান?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setSelectedLanguage("bn")}
          className={`flex flex-col items-center justify-center space-y-2 rounded-xl border-2 p-6 transition-all ${
            selectedLanguage === "bn"
              ? "border-primary bg-primary/5 shadow-sm"
              : "border-border hover:border-primary/50 bg-card hover:bg-muted/50"
          }`}
        >
          <span className="text-3xl font-bold">অ</span>
          <span className="font-semibold">বাংলা</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedLanguage("en")}
          className={`flex flex-col items-center justify-center space-y-2 rounded-xl border-2 p-6 transition-all ${
            selectedLanguage === "en"
              ? "border-primary bg-primary/5 shadow-sm"
              : "border-border hover:border-primary/50 bg-card hover:bg-muted/50"
          }`}
        >
          <span className="text-3xl font-bold">A</span>
          <span className="font-semibold">English</span>
        </button>
      </div>

      <Button onClick={handleContinue} className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            অপেক্ষা করুন...
          </>
        ) : (
          "চালিয়ে যান"
        )}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="text-muted-foreground hover:text-primary text-sm font-medium underline-offset-4 hover:underline"
        >
          পরে নির্ধারণ করবো
        </button>
      </div>
    </div>
  );
}
