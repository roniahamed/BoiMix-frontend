"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, UploadCloud, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const studentIdSchema = z.object({
  institutionName: z.string().min(3, "আপনার প্রতিষ্ঠানের নাম দিন"),
  studentId: z.string().min(3, "আপনার স্টুডেন্ট আইডি দিন"),
});

type StudentIdFormValues = z.infer<typeof studentIdSchema>;

export default function VerifyStudentIdPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentIdFormValues>({
    resolver: zodResolver(studentIdSchema),
  });

  const onSubmit = async (data: StudentIdFormValues) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    setIsLoading(false);
    // Finally move to dashboard or home
    router.push("/");
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <div className="bg-primary/10 text-primary mx-auto mb-2 flex size-12 items-center justify-center rounded-full">
          <GraduationCap className="size-6" />
        </div>
        <h1 className="type-heading text-3xl">শিক্ষার্থী যাচাই</h1>
        <p className="text-muted-foreground text-sm">
          BoiMix সেন্ট্রাল লাইব্রেরির স্পেশাল ডিসকাউন্ট পেতে আপনার স্টুডেন্ট
          আইডি ভেরিফাই করুন
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="institutionName">প্রতিষ্ঠানের নাম</Label>
          <Input
            id="institutionName"
            placeholder="যেমন: ঢাকা বিশ্ববিদ্যালয়"
            {...register("institutionName")}
            className={
              errors.institutionName
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.institutionName && (
            <p className="text-destructive text-sm">
              {errors.institutionName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="studentId">স্টুডেন্ট আইডি (ID Number)</Label>
          <Input
            id="studentId"
            placeholder="যেমন: 202412345"
            {...register("studentId")}
            className={
              errors.studentId
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.studentId && (
            <p className="text-destructive text-sm">
              {errors.studentId.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <Label>আইডি কার্ডের ছবি (সামনের ও পিছনের অংশ)</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted hover:border-primary flex h-32 cursor-pointer flex-col items-center justify-center space-y-2 rounded-lg border-2 border-dashed border-gray-300 transition-colors">
              <UploadCloud className="text-muted-foreground size-6" />
              <span className="text-muted-foreground text-xs font-medium">
                সামনের ছবি
              </span>
            </div>
            <div className="bg-muted hover:border-primary flex h-32 cursor-pointer flex-col items-center justify-center space-y-2 rounded-lg border-2 border-dashed border-gray-300 transition-colors">
              <UploadCloud className="text-muted-foreground size-6" />
              <span className="text-muted-foreground text-xs font-medium">
                পিছনের ছবি
              </span>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              আপলোড হচ্ছে...
            </>
          ) : (
            "ভেরিফাইয়ের জন্য পাঠান"
          )}
        </Button>
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-muted-foreground hover:text-primary text-sm font-medium underline-offset-4 hover:underline"
        >
          এখন স্কিপ করুন, পরে করবো
        </button>
      </div>
    </div>
  );
}
