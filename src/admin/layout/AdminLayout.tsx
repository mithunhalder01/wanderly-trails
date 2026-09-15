import { type ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  MapPin,
  Package,
  Route,
  Newspaper,
  MessageSquareQuote,
  Home,
  Settings,
  Inbox,
  Image,
  Menu,
  X,
  ExternalLink,
  MoreHorizontal,
  Users as UsersIcon,
  LogOut,
  User,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useAuth } from "../lib/AuthContext";

interface NavItem {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  badgeKey?: "leadsNew";
}

const NAV: { group: string; items: NavItem[] }[] = [
  {
    group: "Overview",
    items: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
      { href: "/enquiries", label: "Enquiries", icon: Inbox, badgeKey: "leadsNew" },
    ],
  },
  {
    group: "Content",
    items: [
      { href: "/destinations", label: "Destinations", icon: MapPin },
      { href: "/packages", label: "Packages", icon: Package },
      { href: "/itineraries", label: "Itineraries", icon: Route },
      { href: "/blog", label: "Blog", icon: Newspaper },
      { href: "/testimonials", label: "Reviews", icon: MessageSquareQuote },
    ],
  },
  {
    group: "Website",
    items: [
      { href: "/home-page", label: "Home Page", icon: Home },
      { href: "/media", label: "Media Library", icon: Image },
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

const OWNER_NAV: { group: string; items: NavItem[] } = {
  group: "Admin",
  items: [{ href: "/users", label: "Team Members", icon: UsersIcon }],
};

/* Mobile bottom bar me sirf 4 + "More" */
const MOBILE_PRIMARY = ["/", "/enquiries", "/packages", "/destinations"];

function isActive(current: string, href: string) {
  if (href === "/") return current === "/" || current === "";
  return current === href || current.startsWith(href + "/");
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [drawer, setDrawer] = useState(false);
  const { user, isOwner, authDisabled, logout } = useAuth();

  const { data: dash } = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: () => api.get<{ leads: { new: number } }>("/api/admin/dashboard"),
    staleTime: 30_000,
  });
  const badges = { leadsNew: dash?.leads.new ?? 0 };

  useEffect(() => setDrawer(false), [location]);

  const navGroups = isOwner ? [...NAV, OWNER_NAV] : NAV;
  const current = navGroups.flatMap((g) => g.items).find((i) => isActive(location, i.href));

  const nav = (
    <nav className="flex flex-col gap-5">
      {navGroups.map((g) => (
        <div key={g.group}>
          <div className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#78716c" }}>
            {g.group}
          </div>
          <div className="flex flex-col gap-0.5">
            {g.items.map((item) => {
              const Icon = item.icon;
              const count = item.badgeKey ? badges[item.badgeKey] : 0;
              return (
                <Link key={item.href} href={item.href} className="a-nav-item" data-active={isActive(location, item.href)}>
                  <Icon className="w-[18px] h-[18px] shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {count > 0 && (
                    <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "#0f766e", color: "#fff" }}>
                      {count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="wt-admin">
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex fixed inset-y-0 left-0 w-[248px] flex-col px-4 py-5 overflow-y-auto"
        style={{ background: "var(--a-sidebar)" }}
      >
        <Link href="/" className="flex items-center gap-3 px-2 mb-7">
          <img src="/logo-sm.webp" alt="" className="w-9 h-9 rounded-lg object-cover bg-white/10" />
          <div>
            <div className="text-white font-bold text-[15px] leading-tight">Wanderly Trails</div>
            <div className="text-[11.5px]" style={{ color: "#a8a29e" }}>
              Admin Panel
            </div>
          </div>
        </Link>
        {nav}
        <div className="mt-auto pt-6">
          <a href="/" target="_blank" rel="noreferrer" className="a-nav-item">
            <ExternalLink className="w-[18px] h-[18px]" />
            View website
          </a>
        </div>
      </aside>

      {/* Mobile drawer */}
      {drawer && (
        <div className="lg:hidden fixed inset-0 z-[90]">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawer(false)} />
          <aside className="absolute inset-y-0 left-0 w-[280px] max-w-[85vw] px-4 py-5 overflow-y-auto a-fade-in" style={{ background: "var(--a-sidebar)" }}>
            <div className="flex items-center justify-between px-2 mb-6">
              <div className="text-white font-bold">Wanderly Admin</div>
              <button type="button" onClick={() => setDrawer(false)} className="text-white/70 p-1" aria-label="Close menu">
                <X className="w-5 h-5" />
              </button>
            </div>
            {nav}
            <a href="/" target="_blank" rel="noreferrer" className="a-nav-item mt-6">
              <ExternalLink className="w-[18px] h-[18px]" />
              View website
            </a>
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="lg:pl-[248px] min-h-dvh flex flex-col">
        <header
          className="sticky top-0 z-40 flex items-center gap-3 px-4 md:px-6 h-14 border-b backdrop-blur"
          style={{ background: "rgba(246,245,242,0.85)", borderColor: "var(--a-border)" }}
        >
          <button type="button" className="lg:hidden a-btn a-btn-ghost a-btn-icon -ml-2" onClick={() => setDrawer(true)} aria-label="Open menu">
            <Menu className="w-5 h-5" />
          </button>
          <div className="font-semibold text-[15px] truncate">{current?.label ?? "Admin"}</div>
          <div className="ml-auto flex items-center gap-2">
            <a href="/" target="_blank" rel="noreferrer" className="a-btn a-btn-secondary a-btn-sm hidden sm:inline-flex">
              <ExternalLink className="w-3.5 h-3.5" /> View site
            </a>
            <Link href="/account" className="a-btn a-btn-ghost a-btn-sm hidden sm:inline-flex" title={user.email}>
              <User className="w-3.5 h-3.5" /> {user.name || user.email.split("@")[0]}
            </Link>
            {!authDisabled && (
              <button type="button" onClick={logout} className="a-btn a-btn-ghost a-btn-icon" aria-label="Log out" title="Log out">
                <LogOut className="w-4 h-4" />
              </button>
            )}
            <Link
              href="/account"
              className="sm:hidden w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "var(--a-accent)" }}
            >
              {(user.name || user.email).slice(0, 1).toUpperCase()}
            </Link>
          </div>
        </header>

        <main className="flex-1 px-4 md:px-6 py-5 md:py-7 pb-24 lg:pb-8 max-w-[1200px] w-full mx-auto a-fade-in" key={location}>
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t flex"
        style={{ background: "var(--a-surface)", borderColor: "var(--a-border)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {NAV.flatMap((g) => g.items)
          .filter((i) => MOBILE_PRIMARY.includes(i.href))
          .map((item) => {
            const Icon = item.icon;
            const active = isActive(location, item.href);
            const count = item.badgeKey ? badges[item.badgeKey] : 0;
            return (
              <Link key={item.href} href={item.href} className="flex-1 flex flex-col items-center gap-1 py-2.5 text-[10.5px] font-semibold relative" style={{ color: active ? "var(--a-accent)" : "var(--a-muted)" }}>
                <Icon className="w-5 h-5" />
                {item.label}
                {count > 0 && (
                  <span className="absolute top-1.5 right-[calc(50%-18px)] min-w-[16px] h-4 px-1 rounded-full text-[10px] text-white flex items-center justify-center" style={{ background: "var(--a-accent)" }}>
                    {count}
                  </span>
                )}
              </Link>
            );
          })}
        <button type="button" onClick={() => setDrawer(true)} className="flex-1 flex flex-col items-center gap-1 py-2.5 text-[10.5px] font-semibold" style={{ color: "var(--a-muted)" }}>
          <MoreHorizontal className="w-5 h-5" />
          More
        </button>
      </nav>
    </div>
  );
}
