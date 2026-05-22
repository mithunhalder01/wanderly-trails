import { Switch, Route, Redirect, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar, { MobileBottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import SeoManager from "@/components/SeoManager";
import { ContentProvider } from "@/context/content";
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
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));

const SESSION_KEY = "wanderly_admin";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30000 } },
});

function isAdminAuthenticated() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pb-20 lg:pb-0">{children}</main>
      <Footer />
      <FloatingWidgets />
      <MobileBottomNav />
    </>
  );
}

function AdminRoute() {
  return isAdminAuthenticated() ? <AdminDashboard /> : <Redirect to="/admin/login" />;
}

function AdminLoginRoute() {
  if (isAdminAuthenticated()) {
    return <Redirect to="/admin" />;
  }

  return <AdminLogin />;
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
        <Route path="/" component={() => <PublicLayout><Home /></PublicLayout>} />
      <Route path="/about" component={() => <PublicLayout><About /></PublicLayout>} />
      <Route path="/destinations/:id" component={() => <PublicLayout><DestinationDetail /></PublicLayout>} />
      <Route path="/destinations" component={() => <PublicLayout><Destinations /></PublicLayout>} />
      <Route path="/packages/:id" component={() => <PublicLayout><PackageDetail /></PublicLayout>} />
      <Route path="/packages" component={() => <PublicLayout><Packages /></PublicLayout>} />
      <Route path="/gallery" component={() => <PublicLayout><Gallery /></PublicLayout>} />
      <Route path="/blog/:id" component={() => <PublicLayout><BlogDetail /></PublicLayout>} />
      <Route path="/blog" component={() => <PublicLayout><Blog /></PublicLayout>} />
      <Route path="/testimonials" component={() => <PublicLayout><Testimonials /></PublicLayout>} />
      <Route path="/booking" component={() => <PublicLayout><Booking /></PublicLayout>} />
      <Route path="/faq" component={() => <PublicLayout><FAQ /></PublicLayout>} />
      <Route path="/contact" component={() => <PublicLayout><Contact /></PublicLayout>} />
      <Route path="/search" component={() => <PublicLayout><SearchPage /></PublicLayout>} />
      <Route path="/admin/login" component={AdminLoginRoute} />
      <Route path="/admin" component={AdminRoute} />
        <Route component={() => <PublicLayout><NotFound /></PublicLayout>} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
