import { useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";
import { aboutHome } from "@/data/homeContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HomeAbout() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Parallax for ambient background
    gsap.to(".bg-ambient-1", {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(".bg-ambient-2", {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Reveal animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });

    tl.fromTo(".about-left", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
      .fromTo(".about-center > *", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.6")
      .fromTo(".about-right", { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .fromTo(".about-stats > *", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" }, "-=0.4");
  }, { scope: container });

  return (
    <section ref={container} className="relative py-16 md:py-24 overflow-hidden bg-background">
      {/* Background Ambience */}
      <div className="bg-ambient-1 absolute top-1/3 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="bg-ambient-2 absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left image */}
          <div className="about-left lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl blur-2xl transform -rotate-6" />
            <div className="overflow-hidden rounded-2xl shadow-xl relative z-10 border border-border/50">
              <img
                src={aboutHome.imageMain}
                alt="Travelers on an adventure"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Center content */}
          <div className="about-center lg:col-span-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="tracking-[0.2em] uppercase">{aboutHome.badge}</span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
              {aboutHome.title}
              <br />
              <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#BF953F,#FCF6BA,#B38728,#FBF5B7,#AA771C)] italic font-light">
                {aboutHome.titleHighlight}
              </span>
            </h2>

            <p className="mt-6 text-base text-muted-foreground leading-relaxed">{aboutHome.paragraph1}</p>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">{aboutHome.paragraph2}</p>

            <Link
              href="/about"
              className="group inline-flex items-center gap-3 px-6 py-3 mt-8 rounded-full bg-foreground text-background font-semibold hover:bg-primary transition-all duration-300"
            >
              {aboutHome.cta}
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background/20 group-hover:bg-background/40 transition-colors">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>

          {/* Right image */}
          <div className="about-right hidden lg:col-span-3 lg:block">
            <div className="overflow-hidden rounded-2xl shadow-lg border border-border/50 relative mt-16">
              <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500 z-10" />
              <img
                src={aboutHome.imageSide}
                alt="Group travel experience"
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="about-stats mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {aboutHome.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-card border border-border/50 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="font-serif text-4xl md:text-5xl font-bold text-foreground relative z-10">{stat.value}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground relative z-10">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
