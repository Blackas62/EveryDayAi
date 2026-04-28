"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { SHOW_YOUTUBE } from "@/lib/feature-flags";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/services/always-on-front-desk", label: "Always On Front Desk" },
  ...(SHOW_YOUTUBE ? [{ href: "/youtube", label: "YouTube" }] : []),
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-dark-border/60 bg-dark/95 backdrop-blur supports-[backdrop-filter]:bg-dark/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-dark-foreground">EveryDay<span className="text-accent">Ai</span><span className="font-normal text-dark-muted">WithGraham</span></span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-dark-foreground ${
                pathname === link.href
                  ? "text-accent"
                  : "text-dark-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 inline-flex h-8 items-center justify-center rounded-xl bg-accent px-4 text-[0.8rem] font-medium text-foreground shadow-sm transition-all hover:bg-accent/85 hover:shadow-md"
          >
            Get in Touch
          </Link>
        </nav>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-dark-muted transition-colors hover:text-dark-foreground md:hidden">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <nav className="mt-8 flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-accent px-4 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-accent/85"
              >
                Get in Touch
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
