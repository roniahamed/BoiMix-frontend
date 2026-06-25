import { MainLayout } from "@/components/layout/main-layout";
import type { ReactNode } from "react";

export default function WishlistLayout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
