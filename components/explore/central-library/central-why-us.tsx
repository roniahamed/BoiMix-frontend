import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Users,
  MapPin,
  Star,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function CentralWhyUs() {
  return (
    <section className="boimix-container-wide mb-6 md:mb-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        {/* Left Box */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-lg border border-slate-100 bg-white p-8 shadow-sm md:p-10 dark:border-slate-800 dark:bg-slate-900">
          <div className="relative z-10">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 lg:text-3xl lg:leading-tight dark:text-white">
              Why Choose BoiMix
              <br className="hidden lg:block" />
              Central Library?
            </h2>
            <div className="mb-8 space-y-3.5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-5 shrink-0 text-slate-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  100% verified and quality checked books
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-5 shrink-0 text-slate-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Easy borrowing with simple process
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-5 shrink-0 text-slate-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Affordable membership plans
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-5 shrink-0 text-slate-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Nationwide delivery & return support
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-5 shrink-0 text-slate-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Trusted by thousands of readers
                </span>
              </div>
            </div>
            <Button
              asChild
              className="h-10 rounded-lg bg-[#0f449e] px-6 font-bold text-white shadow-none hover:bg-[#0a3175]"
            >
              <Link href="/explore/central-library/memberships">
                Learn More <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          {/* Illustration */}
          <div className="absolute -right-6 -bottom-6 hidden h-[280px] w-[240px] opacity-100 md:block">
            <Image
              src="https://illustrations.popsy.co/amber/reading.svg"
              alt="Reading Book"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>

        {/* Right Grid (Stats) */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500 dark:bg-blue-900/20">
              <BookOpen className="size-5" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                25,000+
              </h4>
              <p className="mt-0.5 text-[10px] font-semibold text-slate-500 uppercase dark:text-slate-400">
                Verified Books
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-500 dark:bg-purple-900/20">
              <Users className="size-5" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                10,000+
              </h4>
              <p className="mt-0.5 text-[10px] font-semibold text-slate-500 uppercase dark:text-slate-400">
                Active Members
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-600 dark:bg-slate-800">
              <MapPin className="size-5" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                64
              </h4>
              <p className="mt-0.5 text-[10px] font-semibold text-slate-500 uppercase dark:text-slate-400">
                Districts Covered
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-500 dark:bg-amber-900/20">
              <Star className="size-5" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                4.8/5
              </h4>
              <p className="mt-0.5 text-[10px] font-semibold text-slate-500 uppercase dark:text-slate-400">
                Average Rating
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500 dark:bg-emerald-900/20">
              <CheckCircle2 className="size-5" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                98%
              </h4>
              <p className="mt-0.5 text-[10px] font-semibold text-slate-500 uppercase dark:text-slate-400">
                Member Satisfaction
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-500 dark:bg-rose-900/20">
              <Heart className="size-5" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                500+
              </h4>
              <p className="mt-0.5 text-[10px] font-semibold text-slate-500 uppercase dark:text-slate-400">
                Books Added Monthly
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
