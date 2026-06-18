import Link from "next/link";

import { BrandLink } from "@/components/layout/brand-link";
import { footerSections } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="bg-card mt-auto border-t pb-20 md:pb-0">
      <div className="boimix-container-wide grid gap-10 py-10 md:grid-cols-[1.2fr_2fr] md:py-16">
        <div className="mx-auto flex max-w-sm flex-col items-center space-y-4 text-center md:mx-0 md:items-start md:text-left">
          <BrandLink />
          <p className="type-caption text-muted-foreground">
            Read, share, swap, and grow through a Bangladesh-focused book
            community.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerSections.map((section) => (
            <nav
              key={section.title}
              aria-label={section.title}
              className="flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <h2 className="type-badge text-foreground mb-3">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary focus-visible:ring-ring/50 text-sm transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t">
        <div className="boimix-container-wide flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-muted-foreground text-center text-xs md:text-left">
            &copy; {new Date().getFullYear()} BoiMix. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex gap-4">
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-primary text-xs transition-colors"
            >
              শর্তাবলী
            </Link>
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-primary text-xs transition-colors"
            >
              গোপনীয়তা নীতি
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
