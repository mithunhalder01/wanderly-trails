import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface PageHeaderProps {
  /** Where the back arrow should go */
  backHref: string;
  /** Breadcrumb items to show as path */
  breadcrumbs: BreadcrumbItem[];
  /** Title shown as last breadcrumb segment */
  currentTitle?: string;
  /** Optional: height/spacing tuning */
  className?: string;
}

export default function PageHeader({
  backHref,
  breadcrumbs,
  currentTitle,
  className = "",
}: PageHeaderProps) {
  const title =
    currentTitle && currentTitle.length > 30
      ? currentTitle.slice(0, 30) + "…"
      : currentTitle;

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ${className}`.trim()}>
      <div className="flex items-center justify-between gap-4">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/70">
          {breadcrumbs.map((b, idx) => (
            <div key={`${b.label}-${idx}`} className="flex items-center gap-2">
              {idx !== 0 && <ChevronRight className="w-3 h-3 opacity-60" />}
              {b.href ? (
                <Link href={b.href} className="opacity-80 hover:opacity-100 transition-opacity">
                  {b.label}
                </Link>
              ) : (
                <span className="opacity-80">{b.label}</span>
              )}
            </div>
          ))}
          {title && <>
            <ChevronRight className="w-3 h-3 opacity-60" />
            <span className="text-white/90">{title}</span>
          </>}
        </div>
      </div>
    </div>
  );
}
