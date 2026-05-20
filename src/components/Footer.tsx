import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_MAPS_URL,
  CONTACT_OFFICE_ADDRESS,
  CONTACT_PHONE_DIGITS,
  CONTACT_PHONE_DISPLAY,
  SOCIAL_LINKS,
} from "@/lib/contact";
import { footerDestinations } from "@/data/homeContent";
import { useToast } from "@/hooks/use-toast";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Destinations", href: "/destinations" },
  { label: "Contact Us", href: "/contact" },
  { label: "Our Blog", href: "/blog" },
];

const emailSchema = z.object({ email: z.string().email("Enter a valid email") });

export default function Footer() {
  const { toast } = useToast();
  const form = useForm({ resolver: zodResolver(emailSchema), defaultValues: { email: "" } });

  const onNewsletter = (data: z.infer<typeof emailSchema>) => {
    toast({ title: "Subscribed!", description: "Travel deals headed to your inbox." });
    form.reset();
    void data;
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-5 inline-flex items-center gap-2.5" aria-label="Wanderly Trails — Home">
              <img src="/logo.png" alt="" className="h-12 w-auto object-contain" />
              <span className="text-xl font-semibold text-secondary-foreground">Wanderly Trails</span>
            </Link>
            <ul className="mt-6 space-y-3 text-sm text-secondary-foreground/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-secondary-foreground/50" />
                <a href={`tel:+91${CONTACT_PHONE_DIGITS}`} className="hover:text-white">{CONTACT_PHONE_DISPLAY}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-secondary-foreground/50" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">{CONTACT_EMAIL}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary-foreground/50" />
                <a href={CONTACT_MAPS_URL} target="_blank" rel="noreferrer" className="hover:text-white">
                  {CONTACT_OFFICE_ADDRESS}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              {[
                { Icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram" },
                { Icon: Facebook, href: SOCIAL_LINKS.facebook, label: "Facebook" },
                { Icon: Twitter, href: SOCIAL_LINKS.x, label: "Twitter" },
                { Icon: Youtube, href: SOCIAL_LINKS.youtube, label: "Youtube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:bg-white/15"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-serif text-xl font-bold text-transparent bg-clip-text bg-[linear-gradient(to_right,#BF953F,#FCF6BA,#B38728,#FBF5B7,#AA771C)] drop-shadow-sm">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-secondary-foreground/70 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-serif text-xl font-bold text-transparent bg-clip-text bg-[linear-gradient(to_right,#BF953F,#FCF6BA,#B38728,#FBF5B7,#AA771C)] drop-shadow-sm">Destinations</h4>
            <ul className="space-y-2.5">
              {footerDestinations.map((dest) => (
                <li key={dest}>
                  <Link href="/destinations" className="text-sm text-secondary-foreground/70 hover:text-white">
                    {dest}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-serif text-xl font-bold text-transparent bg-clip-text bg-[linear-gradient(to_right,#BF953F,#FCF6BA,#B38728,#FBF5B7,#AA771C)] drop-shadow-sm">Our Newsletter</h4>
            <p className="mb-4 text-sm text-secondary-foreground/70">
              Get exclusive travel deals, itinerary updates, and insider tips straight to your inbox!
            </p>
            <form onSubmit={form.handleSubmit(onNewsletter)} className="flex flex-col gap-2">
              <input
                {...form.register("email")}
                type="email"
                placeholder="Your Email"
                className="glass-input w-full border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-white/30"
              />
              <button
                type="submit"
                className="luxury-btn-glass w-full border-white/30 bg-white/90 py-2.5 text-foreground"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-secondary-foreground/50">
            © {new Date().getFullYear()} Wanderly Trails. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/faq" className="text-sm text-secondary-foreground/50 hover:text-white">Privacy Policy</Link>
            <Link href="/faq" className="text-sm text-secondary-foreground/50 hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
