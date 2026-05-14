import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_MAPS_URL,
  CONTACT_OFFICE_ADDRESS,
  CONTACT_PHONE_DIGITS,
  CONTACT_PHONE_DISPLAY,
  SOCIAL_LINKS,
} from "@/lib/contact";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link
              href="/"
              className="mb-5 inline-flex min-h-0 items-center gap-2.5 md:gap-3"
              aria-label="Wanderly Trails — Home"
            >
              <img
                src="/logo.png"
                alt=""
                width={512}
                height={512}
                decoding="async"
                className="h-10 max-h-10 w-auto shrink-0 object-contain md:h-11 md:max-h-11"
              />
              <span className="text-xl font-serif font-bold">
                Wanderly<span className="text-accent">Trails</span>
              </span>
            </Link>
            <p className="text-sm text-secondary-foreground/70 leading-relaxed mb-6">
              Making travel easy and memorable since 2015. We craft experiences that last a lifetime, from serene beaches to majestic mountains.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, href: SOCIAL_LINKS.facebook, label: "Facebook" },
                { Icon: Twitter, href: SOCIAL_LINKS.x, label: "X" },
                { Icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram" },
                { Icon: Youtube, href: SOCIAL_LINKS.youtube, label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary transition-colors flex items-center justify-center"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Destinations", href: "/destinations" },
                { label: "Packages", href: "/packages" },
                { label: "Gallery", href: "/gallery" },
                { label: "Blog", href: "/blog" },
                { label: "FAQ", href: "/faq" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-secondary-foreground/70 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-5">Popular Destinations</h4>
            <ul className="space-y-3">
              {["Goa, India", "Bali, Indonesia", "Dubai, UAE", "Kashmir, India", "Switzerland", "Maldives"].map((dest) => (
                <li key={dest}>
                  <Link href="/destinations" className="text-sm text-secondary-foreground/70 hover:text-accent transition-colors">
                    {dest}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <a
                  href={CONTACT_MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-secondary-foreground/70 hover:text-accent transition-colors"
                >
                  {CONTACT_OFFICE_ADDRESS}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href={`tel:+91${CONTACT_PHONE_DIGITS}`} className="text-sm text-secondary-foreground/70 hover:text-accent transition-colors">{CONTACT_PHONE_DISPLAY}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-secondary-foreground/70 hover:text-accent transition-colors">{CONTACT_EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary-foreground/50">
            &copy; {new Date().getFullYear()} Wanderly Trails. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="text-sm text-secondary-foreground/50 hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/faq" className="text-sm text-secondary-foreground/50 hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
