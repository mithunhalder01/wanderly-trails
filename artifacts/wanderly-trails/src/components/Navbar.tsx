import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Compass, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-serif font-bold tracking-tight transition-colors ${solid ? "text-foreground" : "text-white"}`}>
              Wanderly<span className="text-accent">Trails</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location === link.href
                    ? solid ? "text-primary bg-primary/10" : "text-white bg-white/20"
                    : solid ? "text-foreground/70 hover:text-foreground hover:bg-muted" : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login" className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${solid ? "text-foreground/70 hover:text-foreground" : "text-white/80 hover:text-white"}`}>
              Login
            </Link>
            <Link
              href="/booking"
              data-testid="nav-book-now"
              className="bg-accent text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md hover:bg-accent/90 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Book Now
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            data-testid="nav-mobile-toggle"
            className={`lg:hidden p-2 rounded-lg transition-colors ${solid ? "text-foreground" : "text-white"}`}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white border-t border-border shadow-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    location === link.href ? "text-primary bg-primary/10" : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 flex flex-col gap-2 border-t border-border mt-2">
                <Link href="/login" onClick={() => setOpen(false)} className="block px-4 py-3 text-sm font-medium text-center rounded-lg border border-border hover:bg-muted transition-colors">
                  Login
                </Link>
                <Link href="/booking" onClick={() => setOpen(false)} className="block px-4 py-3 text-sm font-semibold text-center rounded-xl bg-accent text-white hover:bg-accent/90 transition-colors">
                  Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
