 "use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  backHref?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  backHref
}: PageHeaderProps) {
  const { copy } = useLanguage();

  return (
    <div className="page-shell pt-8 md:pt-12">
      {backHref ? (
        <Link
          className="focus-ring mb-6 inline-flex min-h-10 items-center gap-2 rounded-lg border border-leaf-100 bg-white/80 px-3 py-2 text-sm font-bold text-leaf-700 shadow-sm hover:bg-leaf-50"
          href={backHref}
        >
          <ArrowLeft aria-hidden className="h-4 w-4" />
          {copy.common.back}
        </Link>
      ) : null}
      <p className="kicker bg-leaf-50 px-3 py-1">{eyebrow}</p>
      <h1 className="text-balance mt-3 max-w-3xl text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
        {title}
      </h1>
      <p className="text-pretty mt-4 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
        {description}
      </p>
    </div>
  );
}
