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
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Admin from "@/pages/Admin";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30000 } },
});

const noLayoutRoutes = ["/login"];

function Layout({ children, path }: { children: React.ReactNode; path: string }) {
  const isNoLayout = noLayoutRoutes.some((r) => path.startsWith(r));
  if (isNoLayout) return <>{children}</>;
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
      <Route path="/" component={() => <Layout path="/"><Home /></Layout>} />
      <Route path="/about" component={() => <Layout path="/about"><About /></Layout>} />
      <Route path="/destinations/:id" component={() => <Layout path="/destinations"><DestinationDetail /></Layout>} />
      <Route path="/destinations" component={() => <Layout path="/destinations"><Destinations /></Layout>} />
      <Route path="/packages/:id" component={() => <Layout path="/packages"><PackageDetail /></Layout>} />
      <Route path="/packages" component={() => <Layout path="/packages"><Packages /></Layout>} />
      <Route path="/gallery" component={() => <Layout path="/gallery"><Gallery /></Layout>} />
      <Route path="/blog/:id" component={() => <Layout path="/blog"><BlogDetail /></Layout>} />
      <Route path="/blog" component={() => <Layout path="/blog"><Blog /></Layout>} />
      <Route path="/testimonials" component={() => <Layout path="/testimonials"><Testimonials /></Layout>} />
      <Route path="/booking" component={() => <Layout path="/booking"><Booking /></Layout>} />
      <Route path="/faq" component={() => <Layout path="/faq"><FAQ /></Layout>} />
      <Route path="/contact" component={() => <Layout path="/contact"><Contact /></Layout>} />
      <Route path="/login" component={() => <Layout path="/login"><Login /></Layout>} />
      <Route path="/dashboard" component={() => <Layout path="/dashboard"><Dashboard /></Layout>} />
      <Route path="/admin" component={() => <Layout path="/admin"><Admin /></Layout>} />
      <Route component={() => <Layout path="/404"><NotFound /></Layout>} />
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
