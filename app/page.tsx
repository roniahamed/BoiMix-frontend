export default function Home() {
  return (
    <main className="bg-background flex min-h-svh items-center justify-center text-center">
      <div className="boimix-container max-w-xl space-y-3">
        <p className="type-caption text-primary">BoiMix Frontend</p>
        <h1 className="type-subheading text-foreground">
          Phase 1 design system is ready.
        </h1>
        <p className="type-paragraph text-muted-foreground">
          Brand colors, typography, spacing, containers, radius, shadows, and
          responsive tokens are in place.
        </p>
      </div>
    </main>
  );
}
