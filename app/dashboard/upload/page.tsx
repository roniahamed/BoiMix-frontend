"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { UploadBookForm } from "@/components/shared/upload-book-form";
import { Button } from "@/components/ui/button";

export default function UploadBookPage() {
  const router = useRouter();

  return (
    <div className="ml-[5px] w-full max-w-[1100px]">
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mr-4 hover:bg-transparent"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <UploadBookForm
        showActions={true}
        onSuccess={() => router.push("/dashboard/library")}
      />
    </div>
  );
}
