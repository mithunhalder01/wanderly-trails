import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Search, ChevronRight, ChevronLeft, ChevronDown, Star, Users, Award, Shield,
  Headphones, MapPin, Plane, Mountain, Heart, Crown,
  ArrowRight, CheckCircle, Phone, Globe, TrendingUp, Sparkles
} from "lucide-react";
import { featuredDestinations, featuredPackages, testimonials, blogPosts } from "@/data/staticData";
import DestinationCard from "@/components/DestinationCard";
import PackageCard from "@/components/PackageCard";
import TestimonialCard from "@/components/TestimonialCard";
import SectionHeading from "@/components/SectionHeading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_WHATSAPP_NUMBER } from "@/lib/contact";

const heroSlides = [
  {
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",
    tag: "🏖️ Beach Getaways",
    title: "Discover Your",
    highlight: "Dream Destination",
    sub: "Curated packages for every traveler — from Goa beaches to Bali villas.",
  },
  {
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80",
    tag: "🏔️ Mountain Escapes",
    title: "Escape Into",
    highlight: "Pure Adventure",
    sub: "Trek through Kashmir, Ladakh & the Himalayas with expert local guides.",
  },
  {
    img: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1920&q=80",
    tag: "💑 Honeymoon Specials",
    title: "Create",
    highlight: "Lifelong Memories",
    sub: "Romantic escapes in Bali, Maldives & Europe — tailored just for two.",
  },
];

const stats = [
  { num: 5000, suffix: "+", label: "Happy Travelers", icon: Users },
  { num: 120, suffix: "+", label: "Destinations", icon: Globe },
  { num: 4.9, suffix: "★", label: "Average Rating", icon: Star },
  { num: 10, suffix: "+", label: "Years Experience", icon: Award },
];

const categories = [
  { label: "Adventure", icon: Mountain, color: "from-orange-400 to-orange-600", bg: "bg-orange-50 hover:bg-orange-100 text-orange-700" },
  { label: "Honeymoon", icon: Heart, color: "from-pink-400 to-rose-600", bg: "bg-pink-50 hover:bg-pink-100 text-pink-700" },
  { label: "Family", icon: Users, color: "from-blue-400 to-blue-600", bg: "bg-blue-50 hover:bg-blue-100 text-blue-700" },
  { label: "Solo", icon: Plane, color: "from-green-400 to-emerald-600", bg: "bg-green-50 hover:bg-green-100 text-green-700" },
  { label: "Luxury", icon: Crown, color: "from-purple-400 to-purple-700", bg: "bg-purple-50 hover:bg-purple-100 text-purple-700" },
];

const whyUs = [
  { icon: Award, title: "Best Price Guarantee", desc: "No hidden charges — what you see is what you pay." },
  { icon: Users, title: "Expert Local Guides", desc: "10+ years experienced guides at every destination." },
  { icon: Headphones, title: "24/7 WhatsApp Support", desc: "Instant help anytime, anywhere on WhatsApp." },
  { icon: Shield, title: "Fully Insured Trips", desc: "Your safety is our top priority on every journey." },
  { icon: TrendingUp, title: "5000+ Happy Trips", desc: "A track record you can trust for your next adventure." },
];

const homeFaqs = [
  {
    q: "How do I book a trip with Wanderly Trails?",
    a: "You can book directly from the Booking page or WhatsApp us with your destination, travel dates, and number of travelers.",
  },
  {
    q: "Can I customize my tour package?",
    a: "Yes. We create custom itineraries based on your budget, travel style, and preferred destinations.",
  },
  {
    q: "What is included in the package price?",
    a: "Most packages include hotel stay, transfers, and sightseeing. Exact inclusions are listed on each package detail page.",
  },
  {
    q: "Do you support international trips from India?",
    a: "Absolutely. We offer both domestic and international tours including Bali, Dubai, Maldives, and more.",
  },
  {
    q: "How can I contact your support team quickly?",
    a: `You can call us or send a WhatsApp message on +${CONTACT_WHATSAPP_NUMBER} for faster assistance.`,
  },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const isDecimal = target % 1 !== 0;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const newsletterSchema = z.object({ email: z.string().email("Enter a valid email") });
type NewsletterForm = z.infer<typeof newsletterSchema>;

const heroEase = [0.4, 0, 0.2, 1] as const;
const heroBgCrossfade = { duration: 1.05, ease: heroEase };
const heroTextFade = { duration: 0.45, ease: heroEase };

export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [, setLocation] = useLocation();
  const [searchDest, setSearchDest] = useState("");
  const { toast } = useToast();
  const form = useForm<NewsletterForm>({ resolver: zodResolver(newsletterSchema), defaultValues: { email: "" } });

  useEffect(() => {
    heroSlides.forEach((s) => {
      const img = new Image();
      img.src = s.img;
    });
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % heroSlides.length), 5500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const t = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const nextTestimonial = () => {
    setTestimonialIdx((i) => (i + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(`/packages${searchDest ? `?destination=${encodeURIComponent(searchDest)}` : ""}`);
  };

  const onSubscribe = (data: NewsletterForm) => {
    toast({ title: "Subscribed!", description: "You'll receive our latest travel deals." });
    form.reset();
    void data;
  };

  const slide = heroSlides[heroIdx];

  return (
    <div className="overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="relative flex min-h-[650px] h-screen items-center bg-neutral-950 text-white">
        <div className="absolute inset-0 isolate overflow-hidden bg-neutral-950" aria-hidden>
          {heroSlides.map((s, i) => (
            <motion.div
              key={s.img}
              className="pointer-events-none absolute inset-0 [will-change:opacity]"
              style={{ zIndex: i === heroIdx ? 2 : 1 }}
              initial={false}
              animate={{ opacity: i === heroIdx ? 1 : 0 }}
              transition={heroBgCrossfade}
            >
              <img
                src={s.img}
                alt=""
                className="h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={i === 0 ? "high" : "low"}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/70" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 text-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={heroIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={heroTextFade}
            >
              <span className="inline-block bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-7">
                {slide.tag}
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-5 leading-[1.05]">
                {slide.title}<br />
                <span className="text-accent italic">{slide.highlight}</span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                {slide.sub}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mb-12 flex w-full max-w-xl flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4"
          >
            <Link
              href="/packages"
              data-testid="hero-explore-btn"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-accent px-9 py-4 text-center text-lg font-bold text-white shadow-2xl transition-all hover:-translate-y-1 hover:bg-accent/90 sm:w-auto"
            >
              Explore Packages
            </Link>
            <a
              href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I want to plan a custom trip with Wanderly Trails.")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-9 py-4 text-center text-lg font-bold text-white shadow-2xl transition-all hover:-translate-y-1 hover:bg-[#20bd5c] sm:w-auto"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Plan on WhatsApp
            </a>
          </motion.div>

          {/* Search bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            onSubmit={handleSearch}
            className="mx-auto flex w-full max-w-2xl flex-col gap-2 rounded-2xl bg-white/95 p-3 shadow-2xl backdrop-blur-md sm:flex-row sm:items-stretch"
          >
            <div className="flex min-h-12 min-w-0 flex-1 items-center gap-3 px-3 py-2 sm:px-4 sm:py-2.5">
              <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                value={searchDest}
                onChange={(e) => setSearchDest(e.target.value)}
                placeholder="Where do you want to go? e.g. Goa, Bali…"
                data-testid="input-search-destination"
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="submit"
              data-testid="btn-search-trips"
              className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-bold text-white transition-colors hover:bg-primary/90 sm:w-auto sm:px-7"
            >
              <Search className="w-4 h-4" /> Search
            </button>
          </motion.form>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              aria-current={i === heroIdx}
              onClick={() => setHeroIdx(i)}
              className={`h-1.5 rounded-full transition-[width,background-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                i === heroIdx ? "bg-white w-10" : "bg-white/40 w-4 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-1 text-white/50 text-xs"
        >
          <span>Scroll</span>
          <div className="w-px h-8 bg-white/30" />
        </motion.div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="border-y border-border bg-white py-12 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground md:text-xs">
            Trusted by travelers · Real trips · Real reviews
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex flex-col items-center text-center lg:border-l lg:border-border first:lg:border-l-0"
              >
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground/70">
                  <s.icon className="h-4 w-4" strokeWidth={1.9} />
                </div>
                <p className="font-sans text-2xl font-bold tabular-nums tracking-tight text-foreground md:text-3xl">
                  <AnimatedNumber target={s.num} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-[11px] font-medium leading-snug text-muted-foreground md:text-xs">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED DESTINATIONS ─── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <SectionHeading badge="Top Picks" title="Featured Destinations" subtitle="Handpicked places that offer truly extraordinary experiences" center={false} />
          <Link href="/destinations" className="hidden md:flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredDestinations.map((d, i) => <DestinationCard key={d.id} destination={d} index={i} />)}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/destinations" className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
            View All Destinations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─── POPULAR PACKAGES ─── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <SectionHeading badge="Best Sellers" title="Popular Packages" subtitle="Our most loved packages with everything included" center={false} />
            <Link href="/packages" className="hidden md:flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPackages.map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/packages" className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
              View All Packages <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHATSAPP CTA BANNER ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#075E54] to-[#128C7E] py-16">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white" style={{ width: `${40 + i * 15}px`, height: `${40 + i * 15}px`, top: `${(i * 37) % 100}%`, left: `${(i * 23) % 100}%`, opacity: 0.3 }} />
          ))}
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-9 h-9 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Book Your Dream Trip Instantly</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              No forms. No waiting. Just WhatsApp us your destination and travel dates — we'll handle the rest!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I want to book a trip. Please help me plan.")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white text-[#075E54] font-bold px-9 py-4 rounded-2xl hover:bg-green-50 transition-all shadow-lg hover:-translate-y-0.5 text-lg"
              >
                <Phone className="w-5 h-5" />
                Chat on WhatsApp
              </a>
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white font-bold px-9 py-4 rounded-2xl hover:bg-white/10 transition-all text-lg"
              >
                <Sparkles className="w-5 h-5" />
                Custom Package
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8 text-white/70 text-sm">
              {["Instant Reply", "Free Consultation", "Best Price Assured"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-300" /> {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TRAVEL CATEGORIES ─── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading badge="Explore By Type" title="What Kind of Trip?" subtitle="Pick your travel style and we'll find the perfect package for you" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-12">
          {categories.map(({ label, icon: Icon, bg }) => (
            <motion.div key={label} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link
                href={`/packages?category=${label}`}
                data-testid={`btn-category-${label.toLowerCase()}`}
                className={`${bg} flex flex-col items-center gap-4 py-9 px-4 rounded-2xl transition-all shadow-sm hover:shadow-md`}
              >
                <Icon className="w-9 h-9" />
                <span className="font-bold text-sm">{label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Our Promise" title="Why Travelers Trust Us" subtitle="5000+ happy customers can't be wrong" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-14">
            {whyUs.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-serif font-bold text-sm mb-2 leading-snug">{title}</h3>
                <p className="text-secondary-foreground/65 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading badge="Real Reviews" title="What Our Travelers Say" subtitle="Authentic experiences from people who've traveled with us" />
        <div className="relative mt-14">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${testimonialIdx * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className="w-full shrink-0 px-1 sm:px-2">
                  <div className="mx-auto max-w-3xl">
                    <TestimonialCard testimonial={t} />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-white p-2 text-foreground shadow-sm transition-colors hover:bg-muted md:inline-flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-white p-2 text-foreground shadow-sm transition-colors hover:bg-muted md:inline-flex"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setTestimonialIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === testimonialIdx ? "bg-primary w-10" : "bg-muted-foreground/30 w-4"}`}
            />
          ))}
        </div>
      </section>

      {/* ─── BLOG PREVIEW ─── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <SectionHeading badge="Travel Stories" title="From Our Blog" subtitle="Tips, guides, and inspiration for your next trip" center={false} />
            <Link href="/blog" className="hidden md:flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-testid={`card-blog-${post.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">{post.category}</span>
                </div>
                <div className="p-6">
                  <p className="text-xs text-muted-foreground mb-2">{post.readTime} min read · {post.author}</p>
                  <h3 className="font-serif font-bold text-base mb-3 line-clamp-2 leading-snug">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{post.excerpt}</p>
                  <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:gap-2 transition-all">
                    Read More <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ PREVIEW ─── */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Quick answers before you book your next trip."
        />
        <div className="mt-10 space-y-4">
          {homeFaqs.map((faq, i) => (
            <div key={faq.q} className="rounded-2xl border border-border bg-card overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaqIdx(openFaqIdx === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-muted/40 transition-colors"
                data-testid={`home-faq-toggle-${i}`}
              >
                <span className="pr-4 text-sm md:text-base font-semibold text-foreground">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-primary transition-transform ${
                    openFaqIdx === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openFaqIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <span className="text-xs font-bold tracking-widest uppercase text-white/50 mb-3 block">Stay Updated</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Get Exclusive Travel Deals</h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Subscribe to receive handpicked destinations, exclusive offers, and travel tips straight to your inbox.
          </p>
          <form onSubmit={form.handleSubmit(onSubscribe)} className="flex flex-col sm:flex-row gap-3">
            <input
              {...form.register("email")}
              type="email"
              placeholder="Enter your email address"
              data-testid="input-newsletter-email"
              className="flex-1 bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl px-5 py-3.5 text-white placeholder:text-white/45 outline-none focus:border-white transition-colors"
            />
            <button
              type="submit"
              data-testid="btn-subscribe-newsletter"
              className="bg-accent hover:bg-accent/90 text-white font-bold px-7 py-3.5 rounded-xl transition-colors whitespace-nowrap shadow-lg"
            >
              Subscribe
            </button>
          </form>
          {form.formState.errors.email && (
            <p className="text-red-300 text-sm mt-2">{form.formState.errors.email.message}</p>
          )}
          <p className="text-white/40 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}
