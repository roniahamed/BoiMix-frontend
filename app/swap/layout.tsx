import { MainLayout } from "@/components/layout/main-layout";

export default function SwapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
