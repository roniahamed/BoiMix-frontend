import Link from "next/link";

import { BrandLink } from "@/components/layout/brand-link";
import { footerSections } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="bg-card border-t pb-20 md:pb-0">
      <div className="boimix-container-wide grid gap-8 py-10 md:grid-cols-[1.2fr_2fr]">
        <div className="max-w-sm space-y-3">
          <BrandLink />
          <p className="type-caption text-muted-foreground">
            Read, share, swap, and grow through a Bangladesh-focused book
            community.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {footerSections.map((section) => (
            <nav key={section.title} aria-label={section.title}>
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
    </footer>
  );
}
