"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Camera, Home, UserRound } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const mobileLinks = [
  { href: "/", labelEn: "Home", labelZh: "首页", icon: Home },
  { href: "/upload", labelEn: "Analyze", labelZh: "分析", icon: Camera },
  { href: "/history", labelEn: "History", labelZh: "历史", icon: BarChart3 },
  { href: "/profile", labelEn: "Profile", labelZh: "画像", icon: UserRound }
];

export function BottomNav() {
  const pathname = usePathname();
  const { language } = useLanguage();

  return (
    <nav
      aria-label="Mobile navigation"
      className="safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-leaf-100 bg-white/94 px-3 pt-2 shadow-[0_-10px_30px_rgba(15,118,110,0.08)] backdrop-blur md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        {mobileLinks.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(link.href));

          return (
            <Link
              className={`focus-ring flex h-12 flex-col items-center justify-center rounded-lg text-xs font-semibold ${
                isActive
                  ? "bg-leaf-600 text-white"
                  : "text-slate-500 hover:bg-leaf-50 hover:text-leaf-800"
              }`}
              href={link.href}
              key={link.href}
            >
              <Icon aria-hidden className="h-5 w-5" />
              <span>{language === "zh" ? link.labelZh : link.labelEn}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
