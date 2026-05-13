import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, Star, Users, Award, Shield, Headphones, MapPin, Plane, Mountain, Heart, Crown, ArrowRight } from "lucide-react";
import {
  featuredDestinations,
  featuredPackages,
  testimonials,
  blogPosts,
} from "@/data/staticData";
import DestinationCard from "@/components/DestinationCard";
import PackageCard from "@/components/PackageCard";
import TestimonialCard from "@/components/TestimonialCard";
import SectionHeading from "@/components/SectionHeading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const heroImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80",
  "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1920&q=80",
];

const categories = [
  { label: "Adventure", icon: Mountain, color: "bg-orange-50 text-orange-600 hover:bg-orange-100" },
  { label: "Honeymoon", icon: Heart, color: "bg-pink-50 text-pink-600 hover:bg-pink-100" },
  { label: "Family", icon: Users, color: "bg-blue-50 text-blue-600 hover:bg-blue-100" },
  { label: "Solo", icon: Plane, color: "bg-green-50 text-green-600 hover:bg-green-100" },
  { label: "Luxury", icon: Crown, color: "bg-purple-50 text-purple-600 hover:bg-purple-100" },
];

const whyUs = [
  { icon: Award, title: "Affordable Packages", desc: "Best prices guaranteed with no hidden charges" },
  { icon: Users, title: "Trusted Guides", desc: "Expert local guides with 10+ years of experience" },
  { icon: Headphones, title: "24/7 Support", desc: "Round-the-clock customer support for all travelers" },
  { icon: Shield, title: "Safe Journey", desc: "Fully insured trips with safety protocols in place" },
  { icon: Star, title: "Best Hotels", desc: "Curated 4-5 star hotels at every destination" },
];

const newsletterSchema = z.object({ email: z.string().email("Enter a valid email") });
type NewsletterForm = z.infer<typeof newsletterSchema>;

export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<NewsletterForm>({ resolver: zodResolver(newsletterSchema), defaultValues: { email: "" } });

  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx((i) => (i + 1) % Math.ceil(testimonials.length / 3)), 4000);
    return () => clearInterval(t);
  }, []);

  const onSubscribe = (data: NewsletterForm) => {
    toast({ title: "Subscribed!", description: "You'll receive our latest travel deals." });
    form.reset();
    void data;
  };

  const [searchDest, setSearchDest] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(`/packages${searchDest ? `?destination=${encodeURIComponent(searchDest)}` : ""}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img src={heroImages[heroIdx]} alt="hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
            <span className="inline-block bg-accent/90 text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
              Adventure Starts Here
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Discover Your<br />
              <span className="text-accent">Next Adventure</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Explore breathtaking destinations worldwide with curated packages designed for unforgettable experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/packages" data-testid="hero-explore-btn" className="bg-accent text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:bg-accent/90 transition-all hover:shadow-2xl hover:-translate-y-0.5 text-lg">
                Explore Packages
              </Link>
              <Link href="/destinations" className="bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-2xl border border-white/30 hover:bg-white/30 transition-all text-lg">
                View Destinations
              </Link>
            </div>
          </motion.div>

          {/* Search */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            onSubmit={handleSearch}
            className="bg-white/95 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1 flex items-center gap-3 border border-border rounded-xl px-4 py-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <input
                value={searchDest}
                onChange={(e) => setSearchDest(e.target.value)}
                placeholder="Where do you want to go?"
                data-testid="input-search-destination"
                className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="submit"
              data-testid="btn-search-trips"
              className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2 justify-center"
            >
              <Search className="w-5 h-5" /> Search Trips
            </button>
          </motion.form>
        </div>

        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
          {heroImages.map((_, i) => (
            <button key={i} onClick={() => setHeroIdx(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === heroIdx ? "bg-white w-7" : "bg-white/40"}`} />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { num: "5000+", label: "Happy Travelers" },
              { num: "120+", label: "Destinations" },
              { num: "4.9", label: "Average Rating" },
              { num: "10+", label: "Years Experience" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-serif font-bold">{s.num}</p>
                <p className="text-white/70 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <SectionHeading
            badge="Top Picks"
            title="Featured Destinations"
            subtitle="Handpicked destinations that offer extraordinary experiences"
            center={false}
          />
          <Link href="/destinations" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredDestinations.map((d, i) => <DestinationCard key={d.id} destination={d} index={i} />)}
        </div>
      </section>

      {/* Popular Packages */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <SectionHeading
              badge="Best Sellers"
              title="Popular Packages"
              subtitle="Our most loved travel packages with everything included"
              center={false}
            />
            <Link href="/packages" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPackages.map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* Travel Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading badge="Explore By" title="Travel Categories" subtitle="Find the perfect trip style for your next adventure" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-12">
          {categories.map(({ label, icon: Icon, color }) => (
            <Link
              key={label}
              href={`/packages?category=${label}`}
              data-testid={`btn-category-${label.toLowerCase()}`}
              className={`${color} flex flex-col items-center gap-3 py-8 px-4 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-md`}
            >
              <Icon className="w-8 h-8" />
              <span className="font-semibold text-sm">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Why Us" title="Why Choose Wanderly Trails" subtitle="We make every trip extraordinary" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-serif font-bold text-base mb-2">{title}</h3>
                <p className="text-secondary-foreground/70 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading badge="Reviews" title="What Our Travelers Say" subtitle="Real experiences from real adventurers" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.slice(testimonialIdx * 3, testimonialIdx * 3 + 3).map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, i) => (
            <button key={i} onClick={() => setTestimonialIdx(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === testimonialIdx ? "bg-primary w-7" : "bg-muted"}`} />
          ))}
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <SectionHeading badge="Travel Tips" title="From Our Blog" subtitle="Stories, guides, and travel inspiration" center={false} />
            <Link href="/blog" className="hidden md:flex items-center gap-2 text-primary font-semibold">View All <ArrowRight className="w-4 h-4" /></Link>
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
                className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">{post.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground mb-2">{post.readTime} min read • {post.author}</p>
                  <h3 className="font-serif font-bold text-base mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.id}`} className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1">
                    Read More <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <span className="text-xs font-bold tracking-widest uppercase text-white/60 mb-3 block">Newsletter</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Get Exclusive Travel Deals</h2>
          <p className="text-white/70 mb-8">Subscribe to receive handpicked destinations, exclusive offers, and travel tips straight to your inbox.</p>
          <form onSubmit={form.handleSubmit(onSubscribe)} className="flex flex-col sm:flex-row gap-3">
            <input
              {...form.register("email")}
              type="email"
              placeholder="Enter your email address"
              data-testid="input-newsletter-email"
              className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-5 py-3.5 text-white placeholder:text-white/50 outline-none focus:border-white transition-colors"
            />
            <button
              type="submit"
              data-testid="btn-subscribe-newsletter"
              className="bg-accent hover:bg-accent/90 text-white font-bold px-6 py-3.5 rounded-xl transition-colors whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>
          {form.formState.errors.email && (
            <p className="text-red-300 text-sm mt-2">{form.formState.errors.email.message}</p>
          )}
        </div>
      </section>
    </div>
  );
}
