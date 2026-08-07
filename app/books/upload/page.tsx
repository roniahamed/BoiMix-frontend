"use client";

import { UploadBookForm } from "@/components/shared/upload-book-form";

export default function UploadBookPage() {
  return (
    <div className="bg-muted/10 min-h-screen">
      <div className="boimix-container py-4">
        <UploadBookForm />
      </div>
    </div>
  );
}
