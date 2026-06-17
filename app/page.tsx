import { MainLayout } from "@/components/layout/main-layout";

export default function Home() {
  return (
    <MainLayout>
      <section className="boimix-section flex min-h-[60svh] items-center text-center">
        <div className="boimix-container max-w-xl space-y-3">
          <p className="type-caption text-primary">BoiMix Frontend</p>
          <h1 className="type-subheading text-foreground">
            Phase 3 layout system is ready.
          </h1>
          <p className="type-paragraph text-muted-foreground">
            Main, marketing, dashboard, admin, moderator, header, footer,
            sidebar, and mobile navigation shells are in place.
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
