import Link from "next/link";
import { DashboardLibraryCard } from "@/components/shared/dashboard-library-card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default async function LibraryPage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const { mockProfiles, profileLibraryBooks } = await fetch(`${baseUrl}/api/profile`).then(r => r.json());
  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Library</h1>
          <p className="text-muted-foreground mt-2">
            Manage all the books you&apos;ve uploaded for sell, swap, or borrow.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/books/upload">
            <PlusIcon className="size-4" /> Add New Book
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {profileLibraryBooks.map((book: any) => (
          <DashboardLibraryCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
