import { Switch, Route, Redirect, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SeoManager from "@/components/SeoManager";
import { ContentProvider } from "@/context/content";
const Navbar = lazy(() => import("@/components/Navbar"));
const MobileBottomNav = lazy(() =>
  import("@/components/Navbar").then((module) => ({ default: module.MobileBottomNav })),
);
const Footer = lazy(() => import("@/components/Footer"));
const FloatingWidgets = lazy(() => import("@/components/FloatingWidgets"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/Home"));
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

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30000 } },
});

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<div className="h-20 w-full" aria-hidden="true" />}>
        <Navbar />
      </Suspense>
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

function Router() { 
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Switch>
        {/* Public Routes with Shared Layout (no admin needed) */}
        <PublicLayout>
          <Switch>
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
          </Switch>
        </PublicLayout>

      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <style dangerouslySetInnerHTML={{ __html: `
        * {
          -webkit-tap-highlight-color: transparent;
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
