import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { MapPin, Package, Route, Newspaper, MessageSquareQuote, Inbox, Image, ArrowUpRight } from "lucide-react";
import type { DashboardStats } from "@shared/types";
import { Card, Badge, Spinner, PageTitle } from "../components/ui";
import { api } from "../lib/api";

const TILES = [
  { key: "destinations" as const, label: "Destinations", icon: MapPin, href: "/destinations", color: "#0f766e" },
  { key: "packages" as const, label: "Packages", icon: Package, href: "/packages", color: "#b45309" },
  { key: "itineraries" as const, label: "Itineraries", icon: Route, href: "/itineraries", color: "#1d4ed8" },
  { key: "blogPosts" as const, label: "Blog Posts", icon: Newspaper, href: "/blog", color: "#7c3aed" },
  { key: "testimonials" as const, label: "Reviews", icon: MessageSquareQuote, href: "/testimonials", color: "#be185d" },
  { key: "media" as const, label: "Media Files", icon: Image, href: "/media", color: "#57534e" },
];

interface ActivityRow {
  action: string;
  collection: string;
  summary: string;
  actor: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: () => api.get<DashboardStats & { activity: ActivityRow[] }>("/api/admin/dashboard"),
    refetchInterval: 60_000,
  });

  if (isLoading || !data) return <Spinner />;

  return (
    <div>
      <PageTitle title="Dashboard" description="A quick look at your website's content and enquiries." />

      {data.leads.new > 0 && (
        <Link href="/enquiries" className="block mb-5">
          <div className="a-card p-4 flex items-center justify-between gap-3" style={{ background: "var(--a-accent-soft)", borderColor: "var(--a-accent)" }}>
            <div className="flex items-center gap-3">
              <Inbox className="w-5 h-5" style={{ color: "var(--a-accent)" }} />
              <div>
                <div className="font-semibold text-[14px]">{data.leads.new} new enquir{data.leads.new === 1 ? "y" : "ies"} waiting</div>
                <div className="text-xs" style={{ color: "var(--a-muted)" }}>From booking and contact forms</div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4" style={{ color: "var(--a-accent)" }} />
          </div>
        </Link>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {TILES.map((t) => {
          const Icon = t.icon;
          return (
            <Link key={t.key} href={t.href}>
              <div className="a-card p-4 h-full hover:shadow-sm transition-shadow">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: `${t.color}18` }}>
                  <Icon className="w-[18px] h-[18px]" style={{ color: t.color }} />
                </div>
                <div className="text-2xl font-bold">{data[t.key]}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--a-muted)" }}>
                  {t.label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Enquiries" description="Booking & contact form summary">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-2xl font-bold">{data.leads.total}</div>
              <div className="text-xs" style={{ color: "var(--a-muted)" }}>Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: "var(--a-accent)" }}>{data.leads.new}</div>
              <div className="text-xs" style={{ color: "var(--a-muted)" }}>New</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{data.leads.thisWeek}</div>
              <div className="text-xs" style={{ color: "var(--a-muted)" }}>This week</div>
            </div>
          </div>
          {data.recentLeads.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              {data.recentLeads.slice(0, 5).map((l) => (
                <Link key={l.id} href="/enquiries" className="flex items-center justify-between text-[13px] py-1.5 border-t" style={{ borderColor: "var(--a-border)" }}>
                  <span className="truncate">{l.name || l.email || "Anonymous"}</span>
                  <Badge tone={l.status === "new" ? "info" : "neutral"}>{l.status}</Badge>
                </Link>
              ))}
            </div>
          )}
        </Card>

        <Card title="Recent Activity" description="Latest changes made in this panel">
          {data.activity.length === 0 ? (
            <p className="text-[13px]" style={{ color: "var(--a-muted)" }}>No activity yet.</p>
          ) : (
            <div className="flex flex-col gap-2.5">
              {data.activity.slice(0, 6).map((a, i) => (
                <div key={i} className="flex items-start justify-between gap-3 text-[13px]">
                  <span>
                    <strong className="capitalize">{a.action}</strong> {a.collection} <span style={{ color: "var(--a-muted)" }}>{a.summary}</span>
                  </span>
                  <span className="text-[11.5px] shrink-0" style={{ color: "var(--a-muted)" }}>
                    {new Date(a.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
