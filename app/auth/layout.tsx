import { MainLayout } from "@/components/layout/main-layout";
import { BookOpenIcon, CheckCircle2Icon } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <div className="bg-muted/10 flex min-h-[calc(100vh-200px)] items-center justify-center p-4 py-8 md:py-16">
        <div className="bg-card flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border shadow-lg md:flex-row">
          {/* Left / Top Side: Info & Features */}
          <div className="bg-primary relative hidden w-full flex-col justify-center overflow-hidden p-8 text-white md:flex md:w-5/12 lg:p-12">
            {/* Background elements */}
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            <div className="relative z-10">
              <div className="text-primary mb-6 flex size-14 items-center justify-center rounded-2xl bg-white shadow-lg">
                <BookOpenIcon className="size-8" />
              </div>
              <h2 className="type-heading mb-3 text-3xl leading-tight font-bold">
                স্বাগতম BoiMix-এ!
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-white/90">
                বাংলাদেশের সবচেয়ে বড় বইয়ের প্ল্যাটফর্মে যুক্ত হোন। বই ধার করুন,
                কিনুন বা সোয়াপ করুন।
              </p>

              <div className="space-y-4">
                {[
                  "হাজারো বইয়ের কালেকশন",
                  "সেন্ট্রাল লাইব্রেরি থেকে বই ধার",
                  "সহজ বই সোয়াপিং সুবিধা",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2Icon className="size-5 text-white/90" />
                    <span className="font-medium text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right / Bottom Side: Form Content */}
          <div className="flex w-full items-center justify-center p-6 md:w-7/12 md:p-10 lg:p-16">
            <div className="w-full max-w-md">{children}</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
