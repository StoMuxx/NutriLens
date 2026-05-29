import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description
}: FeatureCardProps) {
  return (
    <article className="rounded-lg border border-leaf-100 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-leaf-200">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-leaf-50 text-leaf-700">
        <Icon aria-hidden className="h-5 w-5" />
      </div>
      <h3 className="text-balance mt-4 text-lg font-bold leading-snug text-slate-950">
        {title}
      </h3>
      <p className="text-pretty mt-3 text-sm leading-7 text-slate-600">
        {description}
      </p>
    </article>
  );
}
