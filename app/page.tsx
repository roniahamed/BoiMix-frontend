export default function Home() {
  return (
    <main className="bg-background flex min-h-svh items-center justify-center px-6 text-center">
      <div className="max-w-xl space-y-3">
        <p className="text-primary text-sm font-medium">BoiMix Frontend</p>
        <h1 className="text-foreground text-3xl font-semibold tracking-normal">
          Phase 0 setup is ready.
        </h1>
        <p className="text-muted-foreground text-sm leading-6">
          The App Router foundation, Tailwind, Shadcn configuration, core
          providers, and brand assets are in place.
        </p>
      </div>
    </main>
  );
}
