import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Instagram, Facebook, Youtube, Sparkles, Compass, Star } from "lucide-react";
import { homeHero, homeStats } from "@/data/homeContent";
import { CONTACT_WHATSAPP_NUMBER, SOCIAL_LINKS } from "@/lib/contact";
import AnimatedCounter from "./AnimatedCounter";
import { IMAGES, VIDEOS } from "@/data/assets";

const WHATSAPP_MSG = encodeURIComponent(
  "Hi! I want to explore India with Wanderly Trails. Please help me plan my trip."
);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function HomeHero() {
  const container = useRef<HTMLElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    setShowVideo(true);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cancelled = false;
    import("gsap").then(({ default: gsap }) => {
      if (cancelled || !container.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-left > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, delay: 0.2 }
      )
        .fromTo(
          ".hero-right",
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 1 },
          "-=0.8"
        )
        .fromTo(
          ".hero-bg-vid",
          { scale: 1.1 },
          { scale: 1.05, duration: 2.5, ease: "power2.out" },
          0
        );
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section ref={container} className="relative min-h-[90vh] md:min-h-screen overflow-hidden bg-black text-white flex items-center pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={IMAGES.hero.home}
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className={`hero-bg-vid h-full w-full object-cover scale-105 ${showVideo ? "opacity-0" : "opacity-100"} transition-opacity duration-700`}
        />
        {showVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={IMAGES.hero.home}
            className="hero-bg-vid absolute inset-0 h-full w-full object-cover scale-105 will-change-transform"
          >
            <source src={VIDEOS.homeHero} type="video/mp4" />
          </video>
        )}

        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-background/5 to-transparent" />
      </div>

      <div className="relative z-10 w-full mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="hero-left lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 backdrop-blur-md mb-6 md:mb-8 shadow-xl">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase">{homeHero.brandLine}</span>
            </div>

            <h1 className="text-5xl font-bold leading-[1.1] md:text-6xl lg:text-7xl text-white drop-shadow-lg">
              {homeHero.title}
              <br />
              <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#BF953F,#FCF6BA,#B38728,#FBF5B7,#AA771C)] italic font-light drop-shadow-sm">
                {homeHero.titleHighlight}
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 md:mt-8 max-w-xl text-sm sm:text-base md:text-xl leading-snug sm:leading-relaxed text-white/90 font-medium drop-shadow-md">
              {homeHero.description}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/packages"
                data-testid="hero-explore-btn"
                className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300 text-base"
              >
                {homeHero.ctaPrimary} <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 text-base shadow-lg"
              >
                {homeHero.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="hero-right hidden lg:flex lg:col-span-5 flex-col items-start gap-6 lg:items-end mt-8 lg:mt-0 w-full">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 lg:max-w-md text-left">
              <div className="sm:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-4 sm:p-6 relative overflow-hidden group hover:border-white/20 hover:bg-white/10 transition-all duration-500 shadow-2xl flex flex-col justify-between min-h-[160px]">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400 drop-shadow-sm">
                      People join us
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 uppercase tracking-widest animate-pulse">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Live Community
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg leading-none">
                      <AnimatedCounter target={homeStats.customers.value} suffix={homeStats.customers.suffix} />
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white/80">{homeStats.customers.label}</span>
                  </div>
                </div>

                <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4">
                  <div className="flex -space-x-2.5 overflow-hidden max-w-full">
                    {IMAGES.ui.statsUsers.map((src, i) => (
                      <img
                        key={i}
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-black object-cover"
                        src={src}
                        alt="Explorer profile"
                        width={32}
                        height={32}
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold ring-2 ring-black backdrop-blur-sm">
                      +
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-white/50 font-medium tracking-wider uppercase whitespace-nowrap">Join the adventure</span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-5 relative overflow-hidden group hover:border-white/20 hover:bg-white/10 transition-all duration-500 shadow-2xl flex flex-col justify-between min-h-[140px]">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Expeditions</span>
                  <div className="p-2 rounded-xl bg-white/5 text-amber-400 group-hover:rotate-12 transition-transform duration-500">
                    <Compass className="h-4.5 w-4.5" />
                  </div>
                </div>
                <div className="relative z-10 mt-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg leading-none">
                    <AnimatedCounter target={homeStats.tours.value} suffix={homeStats.tours.suffix} />
                  </span>
                  <p className="mt-1 text-xs text-white/70 leading-snug font-medium">{homeStats.tours.label}</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-5 relative overflow-hidden group hover:border-white/20 hover:bg-white/10 transition-all duration-500 shadow-2xl flex flex-col justify-between min-h-[140px]">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Reviews</span>
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="relative z-10 mt-3">
                  <span className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg flex items-baseline gap-1">
                    {homeStats.rating.value}
                    <span className="text-xs font-semibold text-white/40">/ 5.0</span>
                  </span>
                  <p className="mt-1 text-xs text-white/70 leading-snug font-medium">{homeStats.rating.label}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 bg-black/40 backdrop-blur-md px-4 sm:px-6 py-3 rounded-full border border-white/10 shadow-lg w-full sm:w-auto justify-center sm:justify-start">
              <span className="text-xs font-bold text-white/60 mr-2 uppercase tracking-widest">Follow us</span>
              {[
                { href: SOCIAL_LINKS.instagram, Icon: Instagram, label: "Instagram" },
                { href: SOCIAL_LINKS.facebook, Icon: Facebook, label: "Facebook" },
                { href: SOCIAL_LINKS.youtube, Icon: Youtube, label: "Youtube" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/80 transition-all duration-300 hover:bg-amber-500 hover:text-black hover:scale-110 hover:shadow-lg hover:shadow-amber-500/30"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
