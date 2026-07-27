import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  CheckCircle2,
  Users,
  MapPin,
  Star,
  Check,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LibrarySearchBar } from "@/components/shared/library-search-bar";

export function CentralHero() {
  return (
    <section className="boimix-container-wide relative mt-6 mb-2.5 flex min-h-[190px] rounded-lg border border-slate-200 bg-white shadow-sm max-sm:!mx-0 max-sm:mt-0 max-sm:!w-full max-sm:!rounded-none max-sm:!border-x-0 max-sm:!border-t-0 sm:min-h-[350px] lg:h-[400px] lg:max-h-[400px] dark:border-slate-800 dark:bg-slate-950">
      {/* Split Background with Gradient Transition */}
      <div className="absolute inset-0 flex w-full overflow-hidden rounded-lg max-sm:rounded-none">
        <div className="relative z-10 w-full bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/80 lg:w-[45%] lg:bg-white lg:bg-none dark:from-blue-950/40 dark:via-slate-950 dark:to-indigo-900/30 dark:lg:bg-slate-950">
          {/* Mobile Decorative Blobs */}
          <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-blue-400/20 blur-3xl lg:hidden dark:bg-blue-600/20"></div>
          <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-indigo-400/20 blur-3xl lg:hidden dark:bg-indigo-600/20"></div>
        </div>
        <div className="relative hidden lg:block lg:w-[55%]">
          <Image
            src="https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80"
            alt="Library Interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/30"></div>
          {/* Gradient fade transition */}
          <div className="absolute inset-y-0 left-0 z-10 w-48 bg-gradient-to-r from-white to-transparent dark:from-slate-950"></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 grid w-full items-center px-4 sm:px-6 md:px-12 lg:grid-cols-[1.2fr_1fr] lg:px-16">
        {/* Left Content (White Background area) */}
        <div className="py-4 sm:py-8 lg:py-10 lg:pr-12">
          <h3 className="mb-1 text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase sm:mb-3 sm:text-xs">
            BoiMix Central Library
          </h3>
          <h1 className="mb-2 text-xl font-extrabold tracking-tight text-slate-900 sm:mb-4 sm:text-4xl lg:text-5xl lg:leading-[1.15] dark:text-white">
            Verified Books.
            <br />
            Trusted by Everyone.
          </h1>
          <p className="mb-3 line-clamp-2 max-w-xl text-xs leading-relaxed text-slate-600 sm:mb-6 sm:line-clamp-none sm:text-sm dark:text-slate-400">
            Explore 25,000+ verified books. Borrow or buy from the most trusted
            digital library in Bangladesh.
          </p>

          {/* Search Bar */}
          <LibrarySearchBar
            variant="hero"
            className="relative mb-0 flex max-w-xl gap-1 rounded-lg border border-slate-200 bg-white p-1 shadow-sm sm:mb-6 sm:p-1.5"
          />

          {/* Stats */}
          <div className="hidden sm:flex sm:flex-wrap sm:items-center sm:gap-6 lg:flex-nowrap lg:gap-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20">
                <BookOpen className="size-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  25,000+
                </p>
                <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                  Verified Books
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20">
                <CheckCircle2 className="size-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  100%
                </p>
                <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                  Quality Checked
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20">
                <Users className="size-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  10,000+
                </p>
                <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                  Happy Members
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800">
                <MapPin className="size-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  64
                </p>
                <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                  Districts Covered
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content (Floating Card) */}
        <div className="relative hidden h-full items-center justify-end lg:flex">
          {/* Floating Card */}
          <div className="-mt-2.5 w-[340px] rounded-lg border border-white/10 bg-slate-800/90 p-5 shadow-2xl backdrop-blur-xl">
            <div className="mb-3 flex items-center gap-3">
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              <h3 className="text-lg font-bold text-white">Become a Member</h3>
            </div>
            <p className="mb-3 text-sm leading-snug text-slate-300">
              Enjoy unlimited borrowing, exclusive discounts and member
              benefits.
            </p>
            <div className="mb-4 space-y-2">
              <div className="flex items-start gap-2">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-yellow-400"
                  strokeWidth={3}
                />
                <span className="text-sm text-slate-200">
                  Borrow books for up to 21 days
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-yellow-400"
                  strokeWidth={3}
                />
                <span className="text-sm text-slate-200">
                  Priority access to new books
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-yellow-400"
                  strokeWidth={3}
                />
                <span className="text-sm text-slate-200">
                  Special member discounts
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-yellow-400"
                  strokeWidth={3}
                />
                <span className="text-sm text-slate-200">
                  No hidden charges
                </span>
              </div>
            </div>
            <Button
              asChild
              className="h-10 w-full rounded-lg bg-white font-bold text-slate-900 shadow-md hover:bg-slate-100"
            >
              <Link href="/explore/central-library/memberships">
                View Membership Plans <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
