import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { packages, destinations, blogPosts } from "@/data/staticData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LogOut, Search } from "lucide-react";

const SESSION_KEY = "wanderly_admin";

function logout() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
  window.location.href = "/admin";
}

export default function AdminDashboard() {
  const [query, setQuery] = useState("");

  const filteredDestinations = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return destinations;
    return destinations.filter((d) =>
      `${d.name} ${d.country} ${d.category}`.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredPackages = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return packages;
    return packages.filter((p) =>
      `${p.title} ${p.destinationName} ${p.category}`.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredBlog = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return blogPosts;
    return blogPosts.filter((b) => `${b.title} ${b.category} ${b.author}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-screen pt-24 px-4 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1 text-sm">Read-only (static data) — minimal demo UI</p>
          </div>
          <Button variant="outline" onClick={logout} className="gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Destinations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-bold">{destinations.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Total entries</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Packages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-bold">{packages.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Total entries</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Blog Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-bold">{blogPosts.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Total entries</p>
            </CardContent>
          </Card>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <Card className="mb-6">
            <CardContent className="p-5">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search destinations/packages/blog"
                    className="pl-9"
                  />
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {query.trim() ? "Filtered" : "All"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Tip: Use this to quickly scan static items.</p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Destinations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredDestinations.slice(0, 8).map((d) => (
                <div key={d.id} className="flex items-center justify-between gap-3 border border-border rounded-xl px-4 py-3">
                  <div>
                    <div className="font-semibold">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{d.country} • {d.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">₹{d.startingPrice.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">⭐ {d.rating.toFixed(1)}</div>
                  </div>
                </div>
              ))}
              {filteredDestinations.length > 8 && (
                <p className="text-xs text-muted-foreground">Showing first 8 of {filteredDestinations.length}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Packages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredPackages.slice(0, 8).map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-3 border border-border rounded-xl px-4 py-3">
                  <div>
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-xs text-muted-foreground">{p.destinationName} • {p.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">₹{p.price.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{p.duration}D/{p.nights}N</div>
                  </div>
                </div>
              ))}
              {filteredPackages.length > 8 && (
                <p className="text-xs text-muted-foreground">Showing first 8 of {filteredPackages.length}</p>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Blog Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredBlog.slice(0, 9).map((b) => (
                  <div key={b.id} className="border border-border rounded-2xl p-4">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <Badge variant="secondary">{b.category}</Badge>
                      <span className="text-xs text-muted-foreground">{b.readTime} min</span>
                    </div>
                    <div className="font-semibold line-clamp-2">{b.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">By {b.author}</div>
                    <div className="mt-3">
                      <Link href={`/blog/${b.id}`} className="text-primary text-sm font-semibold hover:underline">
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              {filteredBlog.length > 9 && (
                <p className="text-xs text-muted-foreground mt-4">Showing first 9 of {filteredBlog.length}</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-xs text-muted-foreground">
          Note: This is a minimal admin dashboard demo. Data comes from <code>src/data/staticData.ts</code> (no backend).
        </div>
      </div>
    </div>
  );
}

