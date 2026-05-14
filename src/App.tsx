import { Switch, Route, Redirect, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Destinations from "@/pages/Destinations";
import DestinationDetail from "@/pages/DestinationDetail";
import Packages from "@/pages/Packages";
import PackageDetail from "@/pages/PackageDetail";
import Gallery from "@/pages/Gallery";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import Testimonials from "@/pages/Testimonials";
import Booking from "@/pages/Booking";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import SeoManager from "@/components/SeoManager";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import { ContentProvider } from "@/context/content";

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
      <main>{children}</main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}

function AdminRoute() {
  return isAdminAuthenticated() ? <AdminDashboard /> : <AdminLogin />;
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
      <Route path="/admin/login" component={AdminLoginRoute} />
      <Route path="/admin" component={AdminRoute} />
      <Route component={() => <PublicLayout><NotFound /></PublicLayout>} />
    </Switch>
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
