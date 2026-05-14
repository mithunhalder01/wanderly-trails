import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30000 } },
});

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Layout><Home /></Layout>} />
      <Route path="/about" component={() => <Layout><About /></Layout>} />
      <Route path="/destinations/:id" component={() => <Layout><DestinationDetail /></Layout>} />
      <Route path="/destinations" component={() => <Layout><Destinations /></Layout>} />
      <Route path="/packages/:id" component={() => <Layout><PackageDetail /></Layout>} />
      <Route path="/packages" component={() => <Layout><Packages /></Layout>} />
      <Route path="/gallery" component={() => <Layout><Gallery /></Layout>} />
      <Route path="/blog/:id" component={() => <Layout><BlogDetail /></Layout>} />
      <Route path="/blog" component={() => <Layout><Blog /></Layout>} />
      <Route path="/testimonials" component={() => <Layout><Testimonials /></Layout>} />
      <Route path="/booking" component={() => <Layout><Booking /></Layout>} />
      <Route path="/faq" component={() => <Layout><FAQ /></Layout>} />
      <Route path="/contact" component={() => <Layout><Contact /></Layout>} />
      <Route component={() => <Layout><NotFound /></Layout>} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
          <FloatingWidgets />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
