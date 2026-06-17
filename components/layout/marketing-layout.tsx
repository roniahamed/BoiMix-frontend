import type { ReactNode } from "react";

import { MainLayout } from "@/components/layout/main-layout";

type MarketingLayoutProps = {
  children: ReactNode;
};

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return <MainLayout>{children}</MainLayout>;
}
