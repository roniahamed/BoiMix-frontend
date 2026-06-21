import { MainLayout } from "@/components/layout/main-layout";

export default function PublicProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
