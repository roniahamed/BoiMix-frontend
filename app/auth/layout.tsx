import { BrandLink } from "@/components/layout/brand-link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left Banner Area (Hidden on small screens) */}
      <div className="bg-primary relative hidden w-1/2 flex-col overflow-hidden p-10 text-white lg:flex">
        <div className="relative z-10">
          <BrandLink />
        </div>

        <div className="relative z-10 flex flex-1 items-center justify-center">
          <div className="mx-auto max-w-md text-center">
            <h1 className="type-heading mb-4 text-4xl leading-tight">
              বাংলাদেশের সবচেয়ে বড় ডিজিটাল বইয়ের প্ল্যাটফর্ম
            </h1>
            <p className="text-lg opacity-90">
              বই ধার করুন, কিনুন বা সোয়াপ করুন আপনার আশেপাশের মানুষের সাথে।
            </p>
          </div>
        </div>

        {/* Abstract Background Design */}
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
      </div>

      {/* Right Content Area */}
      <div className="flex w-full flex-col lg:w-1/2">
        {/* Mobile Header */}
        <div className="border-border/50 flex items-center p-4 lg:hidden">
          <BrandLink compact />
        </div>

        {/* Auth Forms Container */}
        <div className="flex flex-1 items-center justify-center p-4 md:p-8 lg:p-24">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
