import { Suspense, lazy } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AdminLayout from "./layout/AdminLayout";
import { Spinner } from "./components/ui";
import { AuthProvider, useMe } from "./lib/AuthContext";
import LoginPage from "./pages/Login";
import "./admin.css";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Destinations = lazy(() => import("./pages/Destinations"));
const Packages = lazy(() => import("./pages/Packages"));
const Itineraries = lazy(() => import("./pages/Itineraries"));
const Blog = lazy(() => import("./pages/Blog"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Enquiries = lazy(() => import("./pages/Enquiries"));
const Media = lazy(() => import("./pages/Media"));
const HomePage = lazy(() => import("./pages/HomePage"));
const Settings = lazy(() => import("./pages/Settings"));
const Users = lazy(() => import("./pages/Users"));
const Account = lazy(() => import("./pages/Account"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

/**
 * Admin panel apna alag React tree hai — public site se koi style/state
 * share nahi hoti, base "/admin" pe mount hota hai (src/admin-main.tsx dekho).
 */
function Gate() {
  const { data: me, isLoading, isError } = useMe();

  if (isLoading) {
    return (
      <div className="wt-admin min-h-dvh" style={{ background: "var(--a-bg)" }}>
        <Spinner />
      </div>
    );
  }

  if (isError || !me) return <LoginPage />;

  return (
    <AuthProvider me={me}>
      <WouterRouter base="/admin">
        <AdminLayout>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route path="/" component={Dashboard} />
              <Route path="/destinations" component={Destinations} />
              <Route path="/packages" component={Packages} />
              <Route path="/itineraries" component={Itineraries} />
              <Route path="/blog" component={Blog} />
              <Route path="/testimonials" component={Testimonials} />
              <Route path="/enquiries" component={Enquiries} />
              <Route path="/media" component={Media} />
              <Route path="/home-page" component={HomePage} />
              <Route path="/settings" component={Settings} />
              <Route path="/users" component={Users} />
              <Route path="/account" component={Account} />
              <Route>
                <div className="text-center py-20" style={{ color: "var(--a-muted)" }}>Page not found</div>
              </Route>
            </Switch>
          </Suspense>
        </AdminLayout>
      </WouterRouter>
    </AuthProvider>
  );
}

export default function AdminApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Gate />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
