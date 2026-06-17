import Link from "next/link";

import { MegaMenu } from "@/components/layout/mega-menu";
import { Button } from "@/components/ui/button";
import { primaryNavItems } from "@/lib/navigation";

export function DesktopNavbar() {
  const directLinks = primaryNavItems.filter(
    (item) =>
      item.href === "/" || item.href === "/books" || item.href === "/community",
  );

  return (
    <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
      {directLinks.map((item) => (
        <Button key={item.href} variant="ghost" size="sm" asChild>
          <Link href={item.href}>{item.title}</Link>
        </Button>
      ))}
      <MegaMenu />
    </nav>
  );
}
