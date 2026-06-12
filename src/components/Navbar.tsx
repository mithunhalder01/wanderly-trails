import { useState, useEffect, useMemo } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { Menu, X, ChevronDown, House, MapPinned, BriefcaseBusiness, Ticket, Search, Mic, ArrowLeft, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT_WHATSAPP_NUMBER } from "@/lib/contact";
import { useContent } from "@/context/content";

const WHATSAPP_MSG = encodeURIComponent(
  "Hi! I want to book a travel package with Wanderly Trails. Please help me."
);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Destinations", href: "/destinations" },
  { label: "Packages", href: "/packages" },
  { label: "Our Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const bottomNavLinks = [
  { label: "Home", href: "/", Icon: House },
  { label: "Destinations", href: "/destinations", Icon: MapPinned },
  { label: "Book Now", href: "/booking", Icon: Ticket },
  { label: "Packages", href: "/packages", Icon: BriefcaseBusiness },
  { label: "Chat", href: "/contact", Icon: Bot },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [location, setLocation] = useLocation();
  const searchString = useSearch();
  const { destinations, packages, blogPosts } = useContent();
  const isHome = location === "/";

  // Force close search and mobile menu on any navigation (path or query change)
  useEffect(() => {
    setSearchOpen(false);
    setOpen(false);
  }, [location, searchString]); // Ultimate fix: URL badalte hi sab gayab

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !isHome;

  // Precompute suggestion pool only when data changes to avoid expensive re-mapping on every keystroke
  const suggestionPool = useMemo(() => {
    // If search is not open, don't waste CPU cycles computing the pool
    if (!searchOpen) return [];

    const safeDestinations = Array.isArray(destinations) ? destinations : [];
    const safePackages = Array.isArray(packages) ? packages : [];
    const safeBlogs = Array.isArray(blogPosts) ? blogPosts : [];
    const pool = [
      ...safeDestinations.map((d) => ({ title: d.name, subtitle: `${d.country} • ${d.category}` })),
      ...safePackages.slice(0, 20).map((p) => ({ title: p.title, subtitle: `${p.duration} days • ₹${p.price.toLocaleString("en-IN")}` })),
      ...safeBlogs.map((b) => ({ title: b.title, subtitle: `${b.category} • ${b.readTime} min read` })),
    ];
    return Array.from(new Map(pool.map((item) => [item.title.toLowerCase(), item])).values());
  }, [destinations, packages, blogPosts, searchOpen]);

  // Filter suggestions based on input from the precomputed pool
  const suggestions = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (q.length < 2) return suggestionPool.slice(0, 5);
    return suggestionPool
      .filter((item) => item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q))
      .slice(0, 5);
  }, [suggestionPool, searchText]);

  useEffect(() => {
    setActiveSuggestion(0);
  }, [searchText, searchOpen]);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchText.trim();
    const fallback = suggestions[activeSuggestion]?.title ?? "";
    const finalQuery = (q || fallback).trim();

    // Synchronous closure to fix UX "stuck" overlay
    setSearchOpen(false);
    setSearchText("");
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // Navigate after state has updated to allow the overlay to start hiding
    setTimeout(() => {
      setLocation(finalQuery ? `/search?q=${encodeURIComponent(finalQuery)}` : "/search");
    }, 50);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solid ? "glass-nav" : "bg-transparent"
        }`}
      >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Wanderly Trails — Home" className="flex shrink-0 items-center gap-2.5">
          <img
            src="/logo.png"
            alt=""
            className={`h-14 w-auto object-contain sm:h-20 ${solid ? "" : "drop-shadow-lg"}`}
          />
          <span
            className={`text-2xl font-black sm:text-3xl tracking-tight leading-none ${
              solid ? "text-foreground" : "text-white"
            } transition-colors duration-300 drop-shadow-sm`}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Wanderly <span className="bg-clip-text text-transparent bg-[linear-gradient(to_right,rgba(170,119,28,1)_0%,rgba(242,193,46,1)_25%,rgba(212,148,16,1)_50%,rgba(251,211,80,1)_75%,rgba(136,88,3,1)_100%)] font-bold">
  Trails
</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                location === link.href
                  ? solid
                    ? "bg-foreground/5 text-foreground"
                    : "glass-dark text-white"
                  : solid
                    ? "text-foreground/65 hover:bg-foreground/5 hover:text-foreground"
                    : "text-white/85 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className={`rounded-lg p-2 ${solid ? "text-foreground" : "text-white"}`}
            aria-label="Open search"
          >
            <Search className="h-5 w-5" />
          </button>
          <a
            href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noreferrer"
            data-testid="nav-book-now"
            className="wa-btn"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Book Now
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className={`rounded-lg p-2 ${solid ? "text-foreground" : "text-white"}`}
            aria-label="Open search"
          >
            <Search className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            data-testid="nav-mobile-toggle"
            className={`rounded-lg p-2 ${solid ? "text-foreground" : "text-white"}`}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border/50 glass lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent immediate navigation
                    setOpen(false); // Close the menu immediately
                    setTimeout(() => setLocation(link.href), 300); // Navigate after a short delay
                  }}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium ${
                    location === link.href ? "bg-foreground/5 text-foreground" : "text-foreground/75 hover:bg-foreground/5"
                  }`}
                >
                  {link.label}
                  <ChevronDown className="-rotate-90 h-4 w-4 opacity-40" />
                </Link>
              ))}
              <a
                href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  e.preventDefault(); // Prevent immediate navigation
                  setOpen(false); // Close the menu immediately
                  setTimeout(() => window.open(`https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`, "_blank"), 300); // Open WhatsApp after a short delay
                }}
                className="wa-btn mt-2 w-full justify-center py-3.5"
              >
                Book on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      </header>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[80] bg-black/60"
            onClick={() => setSearchOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setSearchOpen(false); 
                setSearchText("");
              }
            }}
          >
            <div className="mx-auto w-full max-w-3xl px-4 pt-4 sm:px-6 sm:pt-10" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={onSearchSubmit} className="rounded-full border border-black/10 bg-[#E9E6EE] px-5 py-3 shadow-2xl">
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search">
                    <ArrowLeft className="h-6 w-6 text-zinc-700" />
                  </button>
                  <input
                    autoFocus
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        if (!suggestions.length) return;
                        setActiveSuggestion((prev) => (prev + 1) % suggestions.length);
                      }
                      if (e.key === "ArrowUp") {
                        e.preventDefault();
                        if (!suggestions.length) return;
                        setActiveSuggestion((prev) => (prev - 1 + suggestions.length) % suggestions.length);
                      }
                    }}
                    placeholder="Search destinations, packages, blogs..."
                    className="w-full bg-transparent text-xl text-zinc-900 outline-none placeholder:text-zinc-600 sm:text-2xl"
                  />
                  <button type="button" onClick={() => setSearchText("")} aria-label="Clear text">
                    <X className="h-6 w-6 text-zinc-600" />
                  </button>

                </div>
              </form>
              <div className="mt-2 rounded-[2rem] border border-black/10 bg-[#E9E6EE] p-4 sm:p-6 shadow-2xl max-h-[70vh] overflow-y-auto scrollbar-hide">
                <div className="space-y-5">
                  {suggestions.length ? (
                    suggestions.map((item, idx) => (
                      <button
                        key={`${item.title}-${idx}`}
                        type="button"
                        onMouseEnter={() => setActiveSuggestion(idx)}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchText(""); 
                          setTimeout(() => {
                            setLocation(`/search?q=${encodeURIComponent(item.title)}`);
                          }, 50);
                        }}
                        className={`flex w-full items-start gap-3 rounded-xl px-2 py-1 text-left ${
                          idx === activeSuggestion ? "bg-black/5" : ""
                        }`}
                      >
                        <Search className="mt-1 h-4 w-4 shrink-0 text-zinc-400" />
                        <span>
                          <span className="block text-xl sm:text-2xl leading-7 text-zinc-900">{item.title}</span>
                          <span className="block text-sm sm:text-lg text-zinc-600">{item.subtitle}</span>
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className="px-2 py-3 text-lg text-zinc-600">No matches found</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function MobileBottomNav() {
  const [location] = useLocation();
  const activeIndex = Math.max(
    0,
    bottomNavLinks.findIndex((item) => location === item.href)
  );

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[min(26rem,calc(100vw-1.5rem))] -translate-x-1/2 rounded-[2.5rem] border border-zinc-800 bg-zinc-950 px-2 py-3 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] lg:hidden">
      <div className="relative mx-auto grid max-w-md grid-cols-5 items-center">
        <span
          className="pointer-events-none absolute bottom-0 top-0 w-1/5 rounded-full bg-zinc-800/50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            transform: `translateX(${activeIndex * 100}%)`,
            opacity: activeIndex === 2 ? 0 : 1
          }}
        >
          <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" />
        </span>
        {bottomNavLinks.map(({ label, href, Icon }, idx) => {
          const active = location === href;
          const isCenter = idx === 2;

          return (
            <Link
              key={href}
              href={href}
              onClick={(e) => {
                if (label === "Chat") {
                  e.preventDefault(); // Navigation stop karein
                  window.dispatchEvent(new CustomEvent("toggle-chatbot")); // Chatbot open karein
                }
              }}
              className={`relative z-10 flex flex-col items-center justify-center transition-all duration-300 ${
                active ? "text-white" : "text-white/40 hover:text-white/70"
              }`}
            >
              {isCenter ? (
                <div className="flex flex-col items-center">
                  <div className={`group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary ring-[10px] ring-zinc-950 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-90 ${active ? '-translate-y-11 scale-110 shadow-[0_20px_40px_rgba(191,149,63,0.4)]' : '-translate-y-3 hover:scale-105 shadow-xl shadow-black/40'}`}>
                    <Icon className={`h-7 w-7 text-white transition-all duration-500 ${active ? 'rotate-[360deg] scale-110' : ''}`} />
                  </div>
                  <span className={`absolute bottom-0 left-1/2 w-full -translate-x-1/2 whitespace-nowrap text-center text-[9px] font-black uppercase tracking-[0.15em] transition-colors duration-300 ${active ? 'text-primary' : 'text-white/30'}`}>
                    {label}
                  </span>
                </div>
              ) : (
                <>
                  <Icon className={`mb-1 transition-all duration-500 ${active ? "h-5 w-5 scale-110 text-primary drop-shadow-[0_0_8px_rgba(191,149,63,0.3)]" : "h-5 w-5"}`} />
                  <span className={`text-[9px] font-bold tracking-wide transition-all duration-300 ${active ? "opacity-100 translate-y-0" : "opacity-40 translate-y-0.5"}`}>
                    {label}
                  </span>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
