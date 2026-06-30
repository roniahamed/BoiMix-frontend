import Link from "next/link";
import { ArrowLeftIcon, PickaxeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/main-layout";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
        <div className="bg-primary/10 mb-6 rounded-full p-6">
          <PickaxeIcon className="text-primary size-12" />
        </div>
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          Coming Soon
        </h1>
        <p className="text-muted-foreground mb-8 max-w-[500px] text-lg">
          This section is currently under development. We&apos;re working hard
          to bring this feature to you. Check back soon for updates!
        </p>
        <Button asChild variant="default" className="h-11 rounded-full px-8">
          <Link href="/">
            <ArrowLeftIcon className="mr-2 size-4" />
            Return to Homepage
          </Link>
        </Button>
      </div>
    </MainLayout>
  );
}
