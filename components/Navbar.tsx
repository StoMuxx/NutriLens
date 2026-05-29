"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Menu } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageProvider";
import { navLinks } from "@/lib/constants";

export function Navbar() {
  const pathname = usePathname();
  const { language, copy } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-leaf-100/80 bg-white/88 backdrop-blur">
      <div className="page-shell flex h-16 items-center justify-between">
        <Link className="focus-ring flex items-center gap-2 rounded-lg" href="/">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-leaf-600 text-white shadow-soft">
            <Leaf aria-hidden className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold text-leaf-900">
              NutriLens
            </span>
            <span className="hidden text-xs text-slate-500 sm:block">
              {copy.brand.subtitle}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <nav className="flex items-center gap-1" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  className={`focus-ring rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-leaf-600 text-white"
                      : "text-slate-600 hover:bg-leaf-50 hover:text-leaf-800"
                  }`}
                  href={link.href}
                  key={link.href}
                >
                  {language === "zh" ? link.labelZh : link.labelEn}
                </Link>
              );
            })}
          </nav>
          <LanguageToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle compact />
          <Link
            className="focus-ring rounded-lg border border-leaf-200 p-2 text-leaf-800"
            href="/upload"
            aria-label={copy.nav.openAnalysis}
          >
            <Menu aria-hidden className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
