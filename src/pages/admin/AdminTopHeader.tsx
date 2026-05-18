import { Badge } from "@/components/ui/badge";

type AdminTopHeaderProps = {
  title: string;
  subtitle?: string;
  greetingName?: string | null;
  showSyncBadge?: boolean;
};

export default function AdminTopHeader({
  title,
  subtitle,
  greetingName,
  showSyncBadge = true,
}: AdminTopHeaderProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground/70">
            {greetingName ? `Hello, ${greetingName}` : "Hello"} 👋
          </p>

          <h1 className="mt-3 text-2xl md:text-3xl font-serif font-bold leading-tight">
            {title}
          </h1>

          {subtitle ? (
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{subtitle}</p>
          ) : null}

          {showSyncBadge ? (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Badge variant="outline">Backend CMS</Badge>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Backend sync ready</span>
              </div>
            </div>
          ) : null}
        </div>

        {/* Simple notifications */}
        <div className="hidden sm:block">
          <div className="rounded-xl border border-border bg-background px-4 py-3">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground/70">
              Notifications
            </p>
            <div className="mt-2 space-y-1">
              <p className="text-sm font-medium">✅ All changes are live</p>
              <p className="text-xs text-muted-foreground">
                Your admin edits update the site instantly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile notification */}
      <div className="sm:hidden mt-4">
        <div className="rounded-xl border border-border bg-background px-4 py-3">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground/70">
            Notifications
          </p>
          <div className="mt-2 space-y-1">
            <p className="text-sm font-medium">✅ All changes are live</p>
            <p className="text-xs text-muted-foreground">
              Your admin edits update the site instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

