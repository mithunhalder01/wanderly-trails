import { Switch, Route, Redirect, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, lazy, Suspense, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SeoManager from "@/components/SeoManager";
import { ContentProvider } from "@/context/content";
import Navbar from "@/components/Navbar";
const Home = lazy(() => import("@/pages/Home"));
const Footer = lazy(() => import("@/components/Footer"));
const NotFound = lazy(() => import("@/pages/not-found"));
const About = lazy(() => import("@/pages/About"));
const Destinations = lazy(() => import("@/pages/Destinations"));
const DestinationDetail = lazy(() => import("@/pages/DestinationDetail"));
const Packages = lazy(() => import("@/pages/Packages"));
const PackageDetail = lazy(() => import("@/pages/PackageDetail"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogDetail = lazy(() => import("@/pages/BlogDetail"));
const Testimonials = lazy(() => import("@/pages/Testimonials"));
const Booking = lazy(() => import("@/pages/Booking"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Contact = lazy(() => import("@/pages/Contact"));
const SearchPage = lazy(() => import("@/pages/Search"));
const HimachalBackpackingItinerary = lazy(() => import("@/data/HimachalBackpackingItinerary"));
const KashmirItinerary = lazy(() => import("@/pages/KashmirItinerary"));
const LadakhItinerary = lazy(() => import("@/pages/LadakhItinerary"));

// Separate widgets to reduce main bundle size
const FloatingWidgets = lazy(() => import("@/components/FloatingWidgets"));
// We wrap the named export in a default-like structure for lazy loading
const MobileBottomNav = lazy(() => import("@/components/Navbar").then(module => ({ default: module.MobileBottomNav })));

gsap.registerPlugin(ScrollTrigger);

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30000 } },
});

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pb-20 lg:pb-0">{children}</main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <FloatingWidgets />
      </Suspense>
      <Suspense fallback={null}>
        <MobileBottomNav />
      </Suspense>
    </>
  );
}

function ScrollToTopOnRouteChange() {
  const [location] = useLocation();

  useEffect(() => {
    // SPA routing me scroll retain ho jata hai; route change par top pe le aate hain
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
      gsap.to(followerRef.current, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power3.out" });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a') || target.closest('button') || target.closest('.cursor-pointer');
      
      if (isInteractive) {
        gsap.to(cursorRef.current, { scale: 3.5, opacity: 0.4, duration: 0.3 });
        gsap.to(followerRef.current, { 
          scale: 1.6, 
          backgroundColor: "rgba(191, 149, 63, 0.12)", 
          borderColor: "rgba(191, 149, 63, 0.6)", 
          duration: 0.3 
        });
      } else {
        gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(followerRef.current, { 
          scale: 1, 
          backgroundColor: "rgba(191, 149, 63, 0.05)", 
          borderColor: "rgba(191, 149, 63, 0.4)", 
          duration: 0.3 
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary hidden md:block" />
      <div ref={followerRef} className="pointer-events-none fixed top-0 left-0 z-[9998] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 bg-primary/5 hidden md:block" />
    </>
  );
}

function Router() { 
  const [location] = useLocation();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <PublicLayout>
      <AnimatePresence mode="wait">
        <motion.div
          key={location}
          initial={isMobile ? { opacity: 0 } : { x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={isMobile ? { opacity: 0 } : { x: -30, opacity: 0 }}
          transition={{ duration: isMobile ? 0.3 : 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
             <Route path="/" component={Home} />
             <Route path="/about" component={About} />
             <Route path="/destinations/:id" component={DestinationDetail} />
             <Route path="/destinations" component={Destinations} />
             <Route path="/packages/:id" component={PackageDetail} />
             <Route path="/packages" component={Packages} />
             <Route path="/gallery" component={Gallery} />
             <Route path="/blog/:id" component={BlogDetail} />
             <Route path="/blog" component={Blog} />
             <Route path="/testimonials" component={Testimonials} />
             <Route path="/booking" component={Booking} />
             <Route path="/faq" component={FAQ} />
             <Route path="/contact" component={Contact} />
             <Route path="/search" component={SearchPage} />
             <Route path="/itinerary/himachal-backpacking" component={HimachalBackpackingItinerary} />
             <Route path="/itinerary/kashmir-tour" component={KashmirItinerary} />
             <Route path="/itinerary/ladakh-tour" component={LadakhItinerary} />
             <Route component={NotFound} />
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </PublicLayout>
  );
}

function App() {
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: { destroy: () => void; raf: (time: number) => void } | null = null;
    let rafId = 0;
    let cancelled = false;

    const boot = () => {
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;

        const lenisInstance = new Lenis({
          duration: 1.5,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 2,
          lerp: 0.08,
        });

        lenis = lenisInstance;

        // Sync ScrollTrigger with Lenis for premium animations and feel
        lenisInstance.on('scroll', ScrollTrigger.update);

        const tickerFn = (time: number) => {
          lenisInstance.raf(time * 1000);
        };
        gsap.ticker.add(tickerFn);
        gsap.ticker.lagSmoothing(0);

        // Save ticker reference for cleanup
        (lenis as any)._tickerFn = tickerFn;
      });
    };

    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(boot, { timeout: 3000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
        if (lenis) {
          if ((lenis as any)._tickerFn) gsap.ticker.remove((lenis as any)._tickerFn);
          lenis.destroy();
        }
      };
    }

    const timer = window.setTimeout(boot, 1500);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      lenis?.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <style dangerouslySetInnerHTML={{ __html: `
        * {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .will-change-gpu {
          will-change: transform, opacity;
        }
        html.lenis, html.lenis body {
          height: auto;
        }
        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }
        .lenis.lenis-smooth 
        [data-lenis-prevent] {
          overscroll-behavior: contain;
        }
        .lenis.lenis-stopped { overflow: hidden; }
        .lenis.lenis-scrolling iframe { pointer-events: none; }

        html {
          font-display: swap;
        }
        img {
          content-visibility: auto;
        }
      ` }} />
      <TooltipProvider>
        <ContentProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <SeoManager />
            <ScrollToTopOnRouteChange />
            <Router />
          </WouterRouter>
        </ContentProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
