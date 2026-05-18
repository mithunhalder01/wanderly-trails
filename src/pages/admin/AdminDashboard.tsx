import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Download,
  FileText,
  Home,
  LogOut,
  MapPin,
  Package as PackageIcon,
  Pencil,
  Plus,
  Search,
  Settings,
  MessageSquare,
  Trash2,
  Upload,
} from "lucide-react";
import { getAdminByEmail, type AdminUser } from "@/data/admins";
import {
  type BlogPost,
  type Destination,
  type Package,
  type Testimonial,
} from "@/data/staticData";
import { useContent, type SiteSettings } from "@/context/content";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SESSION_KEY = "wanderly_admin";
const SESSION_EMAIL_KEY = "wanderly_admin_email";

type DestinationDraft = Omit<Destination, "id">;
type PackageDraft = Omit<Package, "id" | "destinationName"> & { destinationName?: string };
type BlogDraft = Omit<BlogPost, "id" | "publishedAt"> & { publishedAt: string };
type TestimonialDraft = Omit<Testimonial, "id">;

const destinationTemplate: DestinationDraft = {
  name: "",
  country: "India",
  category: "Beaches",
  description: "",
  imageUrl: "",
  rating: 4.5,
  startingPrice: 9999,
  bestSeason: "",
  weather: "",
  featured: false,
};

const packageTemplate = (destinationId: number): PackageDraft => ({
  destinationId,
  title: "",
  description: "",
  imageUrl: "",
  price: 14999,
  duration: 5,
  nights: 4,
  category: "Adventure",
  rating: 4.5,
  hotelStars: 4,
  mealsIncluded: true,
  transportIncluded: true,
  includedItems: "",
  excludedItems: "",
  itinerary: "",
  featured: false,
  destinationName: "",
});

const blogTemplate: BlogDraft = {
  title: "",
  excerpt: "",
  content: "",
  imageUrl: "",
  category: "Travel Tips",
  author: "",
  readTime: 5,
  publishedAt: new Date().toISOString().slice(0, 10),
};

const testimonialTemplate: TestimonialDraft = {
  name: "",
  location: "",
  rating: 5,
  review: "",
  avatarUrl: "",
  destination: "",
};

const navItems = [
  { value: "overview", label: "Overview", icon: Home },
  { value: "destinations", label: "Destinations", icon: MapPin },
  { value: "packages", label: "Packages", icon: PackageIcon },
  { value: "blogs", label: "Blogs", icon: FileText },
  { value: "testimonials", label: "Testimonials", icon: MessageSquare },
  { value: "settings", label: "Settings", icon: Settings },
];

function logout() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem("wanderly_admin_email");
  } catch {
    // Ignore browser storage errors.
  }
  window.location.href = "/admin/login";
}

const parseNumber = (value: string, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

function toBackendPayload(snapshot: {
  destinations: Destination[];
  packages: Package[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  settings: SiteSettings;
}) {
  // must match api/admin/update-content.ts expected content.json shape
  return {
    settings: snapshot.settings,
    destinations: snapshot.destinations,
    packages: snapshot.packages,
    blogPosts: snapshot.blogPosts,
    testimonials: snapshot.testimonials,
  };
}

function useBackendSync() {
  const { toast } = useToast();

  const syncToBackend = async (snapshot: {
    destinations: Destination[];
    packages: Package[];
    blogPosts: BlogPost[];
    testimonials: Testimonial[];
    settings: SiteSettings;
  }) => {
    try {
      const res = await fetch("/api/admin/update-content", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(toBackendPayload(snapshot)),
      });

      if (!res.ok) {
        toast({
          title: "Saved locally (offline)",
          description: "Backend update fail hua, content DB me nahi gaya.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Supabase/DB (backend) updated successfully",
        description: "Content DB me change update ho gaya.",
      });

    } catch {
      toast({
        title: "Saved locally (offline)",
        description: "Network/server error. Content DB me nahi gaya.",
        variant: "destructive",
      });
    }

  };

  return { syncToBackend };
}

export default function AdminDashboard() {
  const {
    settings,
    destinations,
    packages,
    blogPosts,
    testimonials,
    upsertDestination,
    upsertPackage,
    upsertBlogPost,
    upsertTestimonial,
    deleteDestination,
    deletePackage,
    deleteBlogPost,
    deleteTestimonial,
    updateSettings,
    exportData,
    importData,
    resetToDefaults,
  } = useContent();

  const { toast } = useToast();
  const { syncToBackend } = useBackendSync();

  const [activeTab, setActiveTab] = useState("overview");
  const [query, setQuery] = useState("");

  const [editingDestinationId, setEditingDestinationId] = useState<number | null>(null);
  const [destinationForm, setDestinationForm] = useState<DestinationDraft>(destinationTemplate);

  const [editingPackageId, setEditingPackageId] = useState<number | null>(null);
  const [packageForm, setPackageForm] = useState<PackageDraft>(() =>
    packageTemplate(destinations[0]?.id ?? 1)
  );

  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [blogForm, setBlogForm] = useState<BlogDraft>(blogTemplate);

  const [editingTestimonialId, setEditingTestimonialId] = useState<number | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<TestimonialDraft>(testimonialTemplate);

  const [settingsForm, setSettingsForm] = useState<SiteSettings>(settings);
  const [jsonBuffer, setJsonBuffer] = useState("");
  const [adminProfile, setAdminProfile] = useState<AdminUser | null>(null);

  useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  useEffect(() => {
    try {
      const email = sessionStorage.getItem(SESSION_EMAIL_KEY) ?? "";
      setAdminProfile(getAdminByEmail(email));
    } catch {
      setAdminProfile(null);
    }
  }, []);

  useEffect(() => {
    if (destinations.length === 0) {
      return;
    }

    setPackageForm((prev) => {
      if (destinations.some((item) => item.id === prev.destinationId)) {
        return prev;
      }
      return {
        ...prev,
        destinationId: destinations[0].id,
      };
    });
  }, [destinations]);

  const filteredDestinations = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return destinations;
    }
    return destinations.filter((item) =>
      `${item.name} ${item.country} ${item.category}`.toLowerCase().includes(normalized)
    );
  }, [destinations, query]);

  const filteredPackages = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return packages;
    }
    return packages.filter((item) =>
      `${item.title} ${item.destinationName} ${item.category}`
        .toLowerCase()
        .includes(normalized)
    );
  }, [packages, query]);

  const filteredBlogs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return blogPosts;
    }
    return blogPosts.filter((item) =>
      `${item.title} ${item.author} ${item.category}`.toLowerCase().includes(normalized)
    );
  }, [blogPosts, query]);

  const filteredTestimonials = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return testimonials;
    }
    return testimonials.filter((item) =>
      `${item.name} ${item.location} ${item.destination}`.toLowerCase().includes(normalized)
    );
  }, [testimonials, query]);

  const resetDestinationForm = () => {
    setEditingDestinationId(null);
    setDestinationForm(destinationTemplate);
  };

  const resetPackageForm = () => {
    setEditingPackageId(null);
    setPackageForm(packageTemplate(destinations[0]?.id ?? 1));
  };

  const resetBlogForm = () => {
    setEditingBlogId(null);
    setBlogForm({ ...blogTemplate, publishedAt: new Date().toISOString().slice(0, 10) });
  };

  const resetTestimonialForm = () => {
    setEditingTestimonialId(null);
    setTestimonialForm(testimonialTemplate);
  };

  const saveDestination = () => {
    if (!destinationForm.name.trim() || !destinationForm.country.trim() || !destinationForm.imageUrl.trim()) {
      toast({
        title: "Missing fields",
        description: "Destination ke liye Name, Country aur Image URL required hain.",
        variant: "destructive",
      });
      return;
    }

    const payload: DestinationDraft = {
      ...destinationForm,
      name: destinationForm.name.trim(),
      country: destinationForm.country.trim(),
      category: destinationForm.category.trim(),
      description: destinationForm.description.trim(),
      imageUrl: destinationForm.imageUrl.trim(),
      bestSeason: destinationForm.bestSeason.trim(),
      weather: destinationForm.weather.trim(),
    };

    upsertDestination({ ...payload, id: editingDestinationId ?? undefined });

    toast({
      title: editingDestinationId ? "Destination updated" : "Destination added",
      description: `${payload.name} successfully saved.`,
    });

    resetDestinationForm();

    // write-through to backend (so Vercel/live site updates)
    setTimeout(() => {
      void syncToBackend({
        destinations: destinations,
        packages: packages,
        blogPosts: blogPosts,
        testimonials: testimonials,
        settings: settings,
      });
    }, 0);
  };

  const savePackage = () => {
    if (!packageForm.title.trim() || !packageForm.imageUrl.trim() || !packageForm.description.trim()) {
      toast({
        title: "Missing fields",
        description: "Package ke liye title, image aur description required hain.",
        variant: "destructive",
      });
      return;
    }

    const linkedDestination = destinations.find((item) => item.id === packageForm.destinationId);
    const destinationName =
      packageForm.destinationName?.trim() ||
      (linkedDestination ? `${linkedDestination.name}, ${linkedDestination.country}` : "Custom Destination");

    const payload: Omit<Package, "id"> = {
      ...packageForm,
      destinationName,
      title: packageForm.title.trim(),
      description: packageForm.description.trim(),
      imageUrl: packageForm.imageUrl.trim(),
      category: packageForm.category.trim(),
      includedItems: packageForm.includedItems.trim(),
      excludedItems: packageForm.excludedItems.trim(),
      itinerary: packageForm.itinerary.trim(),
    };

    upsertPackage({ ...payload, id: editingPackageId ?? undefined });

    toast({
      title: editingPackageId ? "Package updated" : "Package added",
      description: `${payload.title} successfully saved.`,
    });

    resetPackageForm();

    setTimeout(() => {
      void syncToBackend({
        destinations: destinations,
        packages: packages,
        blogPosts: blogPosts,
        testimonials: testimonials,
        settings: settings,
      });
    }, 0);
  };

  const saveBlog = () => {
    if (!blogForm.title.trim() || !blogForm.excerpt.trim() || !blogForm.content.trim()) {
      toast({
        title: "Missing fields",
        description: "Blog title, excerpt aur content required hain.",
        variant: "destructive",
      });
      return;
    }

    const publishedIso = new Date(blogForm.publishedAt || new Date().toISOString()).toISOString();

    const payload: Omit<BlogPost, "id"> = {
      title: blogForm.title.trim(),
      excerpt: blogForm.excerpt.trim(),
      content: blogForm.content.trim(),
      imageUrl: blogForm.imageUrl.trim(),
      category: blogForm.category.trim(),
      author: blogForm.author.trim(),
      readTime: blogForm.readTime,
      publishedAt: publishedIso,
    };

    upsertBlogPost({ ...payload, id: editingBlogId ?? undefined });

    toast({
      title: editingBlogId ? "Blog updated" : "Blog published",
      description: `${payload.title} successfully saved.`,
    });

    resetBlogForm();

    setTimeout(() => {
      void syncToBackend({
        destinations: destinations,
        packages: packages,
        blogPosts: blogPosts,
        testimonials: testimonials,
        settings: settings,
      });
    }, 0);
  };

  const saveTestimonial = () => {
    if (!testimonialForm.name.trim() || !testimonialForm.review.trim()) {
      toast({
        title: "Missing fields",
        description: "Testimonial me name aur review required hain.",
        variant: "destructive",
      });
      return;
    }

    const payload: TestimonialDraft = {
      ...testimonialForm,
      name: testimonialForm.name.trim(),
      location: testimonialForm.location.trim(),
      review: testimonialForm.review.trim(),
      avatarUrl: testimonialForm.avatarUrl.trim(),
      destination: testimonialForm.destination.trim(),
    };

    upsertTestimonial({ ...payload, id: editingTestimonialId ?? undefined });

    toast({
      title: editingTestimonialId ? "Testimonial updated" : "Testimonial added",
      description: `${payload.name} testimonial saved successfully.`,
    });

    resetTestimonialForm();

    setTimeout(() => {
      void syncToBackend({
        destinations: destinations,
        packages: packages,
        blogPosts: blogPosts,
        testimonials: testimonials,
        settings: settings,
      });
    }, 0);
  };

  const saveSettings = () => {
    updateSettings(settingsForm);
    toast({
      title: "Settings updated",
      description: "Homepage customization values apply ho gaye.",
    });

    setTimeout(() => {
      void syncToBackend({
        destinations,
        packages,
        blogPosts,
        testimonials,
        settings: settingsForm,
      });
    }, 0);
  };

  const handleResetAll = () => {
    const approved = window.confirm(
      "Is action se saara customized content reset ho jayega aur default data restore hoga. Continue?"
    );

    if (!approved) {
      return;
    }

    resetToDefaults();
    resetDestinationForm();
    resetPackageForm();
    resetBlogForm();
    resetTestimonialForm();

    toast({
      title: "Content reset",
      description: "Default data restore kar diya gaya hai.",
    });

    // let localStorage/state update first
    setTimeout(() => {
      void syncToBackend({
        destinations: destinations,
        packages: packages,
        blogPosts: blogPosts,
        testimonials: testimonials,
        settings: settings,
      });
    }, 0);
  };

  const handleExport = () => {
    const payload = exportData();
    setJsonBuffer(payload);

    if (navigator.clipboard?.writeText) {
      void navigator.clipboard
        .writeText(payload)
        .then(() => {
          toast({
            title: "Export ready",
            description: "JSON export buffer me aa gaya aur clipboard me copy bhi ho gaya.",
          });
        })
        .catch(() => {
          toast({
            title: "Export ready",
            description: "JSON export niche textbox me available hai.",
          });
        });
      return;
    }

    toast({
      title: "Export ready",
      description: "JSON export niche textbox me available hai.",
    });
  };

  const handleImport = () => {
    if (!jsonBuffer.trim()) {
      toast({
        title: "Import failed",
        description: "Paste kiya hua JSON empty hai.",
        variant: "destructive",
      });
      return;
    }

    const result = importData(jsonBuffer);
    if (!result.ok) {
      toast({
        title: "Invalid JSON",
        description: result.error,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Import successful",
      description: "Admin content updated from JSON payload.",
    });

    setTimeout(() => {
      void syncToBackend({
        destinations: destinations,
        packages: packages,
        blogPosts: blogPosts,
        testimonials: testimonials,
        settings: settings,
      });
    }, 0);
  };

  const stats = [
    { label: "Destinations", value: destinations.length },
    { label: "Packages", value: packages.length },
    { label: "Blogs", value: blogPosts.length },
    { label: "Testimonials", value: testimonials.length },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-80 shrink-0 flex-col border-r border-border bg-card p-6 md:flex md:sticky md:top-0 md:h-screen md:overflow-hidden">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground/70">Admin Panel</p>
            <h2 className="mt-4 text-2xl font-serif font-bold">Wanderly</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Manage destinations, packages, content and settings from one place.
            </p>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setActiveTab(value)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  activeTab === value
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-8 rounded-3xl border border-border bg-background p-4 text-sm">
            <p className="font-semibold text-foreground">Quick actions</p>
            <p className="mt-2 text-muted-foreground text-sm">Use this sidebar to switch sections fast and stay in control of your content.</p>
          </div>

          <div className="mt-6 border-t border-border pt-6 space-y-3">
            <Link
              href="/"
              className="block rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary"
            >
              Back to Website
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-destructive px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-destructive/90"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 px-4 pb-16 pt-24 md:px-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="min-w-[320px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-2xl border border-border bg-card p-2">
                    <span className="inline-block h-10 w-10 rounded-xl bg-primary/10" aria-hidden />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground/70">
                      Hello, {adminProfile ? adminProfile.name : "Admin"} 👋
                    </p>
                    <h1 className="mt-2 text-2xl md:text-3xl font-serif font-bold">Wanderly Admin Panel</h1>
                    <p className="text-sm text-muted-foreground mt-1">Add, edit, delete, customize aur publish content from one place.</p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Badge variant="outline">Backend CMS</Badge>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">

                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>Backend sync ready</span>

                  </div>

                  {/* Notifications icon + count */}
                  <div className="ml-auto flex items-center gap-2">
                    <div className="relative">
                      <button
                        type="button"
                        className="h-10 w-10 rounded-xl border border-border bg-background hover:bg-muted transition-colors"
                        aria-label="Notifications"
                      >
                        <span className="block h-5 w-5 mx-auto rounded" aria-hidden />
                      </button>
                      <span className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                        1
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {adminProfile ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
                    <img
                      src={adminProfile.avatarUrl}
                      alt={adminProfile.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{adminProfile.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{adminProfile.email}</p>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-center gap-2 flex-wrap">
                  <Link href="/" className="text-sm font-semibold text-primary hover:underline">
                    Back to Website
                  </Link>
                  <Button variant="outline" onClick={logout} className="gap-2">
                    <LogOut className="w-4 h-4" /> Logout
                  </Button>
                </div>
              </div>
            </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((item) => (
            <Card key={item.label}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase tracking-wide text-muted-foreground">
                  {item.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-serif font-bold">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by destination/package/blog/testimonial"
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 md:hidden h-auto gap-1 bg-transparent p-0">
            {[
              ["overview", "Overview"],
              ["destinations", "Destinations"],
              ["packages", "Packages"],
              ["blogs", "Blogs"],
              ["testimonials", "Testimonials"],
              ["settings", "Settings"],
            ].map(([value, label]) => (
              <TabsTrigger
                key={value}
                value={value}
                className="border border-border bg-background py-2 text-xs sm:text-sm"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-5"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={() => setActiveTab("destinations")} className="gap-2">
                      <Plus className="w-4 h-4" /> Add Destination
                    </Button>
                    <Button variant="outline" onClick={() => setActiveTab("packages")} className="gap-2">
                      <Plus className="w-4 h-4" /> Add Package
                    </Button>
                    <Button variant="outline" onClick={() => setActiveTab("blogs")} className="gap-2">
                      <Plus className="w-4 h-4" /> Publish Blog
                    </Button>
                    <Button variant="outline" onClick={() => setActiveTab("settings")} className="gap-2">
                      <Settings className="w-4 h-4" /> Customize Homepage
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Backup / Restore</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" onClick={handleExport} className="gap-2">
                      <Download className="w-4 h-4" /> Export JSON
                    </Button>
                    <Button variant="outline" onClick={handleImport} className="gap-2">
                      <Upload className="w-4 h-4" /> Import JSON
                    </Button>
                    <Button variant="destructive" onClick={handleResetAll}>
                      Reset All Data
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tip: Export JSON ko safe rakh lo. Future me isi se full content restore ho jayega.
                  </p>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">JSON Workspace</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={jsonBuffer}
                    onChange={(e) => setJsonBuffer(e.target.value)}
                    className="min-h-[220px] font-mono text-xs"
                    placeholder="Exported JSON yahan aayega. Import ke liye yahi payload paste karein."
                  />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="destinations" className="mt-4">
            <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-5">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {editingDestinationId ? "Edit Destination" : "Add Destination"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={destinationForm.name}
                        onChange={(e) =>
                          setDestinationForm((prev) => ({ ...prev, name: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Country</Label>
                      <Input
                        value={destinationForm.country}
                        onChange={(e) =>
                          setDestinationForm((prev) => ({ ...prev, country: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Category</Label>
                    <Input
                      value={destinationForm.category}
                      onChange={(e) =>
                        setDestinationForm((prev) => ({ ...prev, category: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={destinationForm.description}
                      onChange={(e) =>
                        setDestinationForm((prev) => ({ ...prev, description: e.target.value }))
                      }
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={destinationForm.imageUrl}
                      onChange={(e) =>
                        setDestinationForm((prev) => ({ ...prev, imageUrl: e.target.value }))
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Rating</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={destinationForm.rating}
                        onChange={(e) =>
                          setDestinationForm((prev) => ({
                            ...prev,
                            rating: parseNumber(e.target.value, prev.rating),
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Starting Price</Label>
                      <Input
                        type="number"
                        value={destinationForm.startingPrice}
                        onChange={(e) =>
                          setDestinationForm((prev) => ({
                            ...prev,
                            startingPrice: parseNumber(e.target.value, prev.startingPrice),
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Best Season</Label>
                      <Input
                        value={destinationForm.bestSeason}
                        onChange={(e) =>
                          setDestinationForm((prev) => ({ ...prev, bestSeason: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Weather</Label>
                      <Input
                        value={destinationForm.weather}
                        onChange={(e) =>
                          setDestinationForm((prev) => ({ ...prev, weather: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-border p-3">
                    <Label htmlFor="destination-featured">Show in Featured section</Label>
                    <Switch
                      id="destination-featured"
                      checked={destinationForm.featured}
                      onCheckedChange={(value) =>
                        setDestinationForm((prev) => ({ ...prev, featured: value }))
                      }
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button onClick={saveDestination} className="flex-1">
                      {editingDestinationId ? "Update" : "Add Destination"}
                    </Button>
                    <Button variant="outline" onClick={resetDestinationForm}>
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">All Destinations ({filteredDestinations.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[75vh] overflow-y-auto pr-1">
                  {filteredDestinations.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-border p-4 flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{item.name}</h4>
                          {item.featured && <Badge variant="secondary">Featured</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.country} • {item.category}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => {
                            setEditingDestinationId(item.id);
                            setDestinationForm({ ...item });
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => {
                            const approved = window.confirm(
                              "Destination delete karne se linked packages bhi delete ho jayenge. Continue?"
                            );
                            if (!approved) return;
                            deleteDestination(item.id);
                            toast({ title: "Destination deleted" });
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {filteredDestinations.length === 0 && (
                    <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                      No destinations found.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="packages" className="mt-4">
            <div className="grid grid-cols-1 xl:grid-cols-[440px_1fr] gap-5">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{editingPackageId ? "Edit Package" : "Add Package"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[80vh] overflow-y-auto pr-1">
                  <div>
                    <Label>Destination</Label>
                    <select
                      value={packageForm.destinationId}
                      onChange={(e) =>
                        setPackageForm((prev) => ({
                          ...prev,
                          destinationId: parseNumber(e.target.value, prev.destinationId),
                        }))
                      }
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {destinations.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name} ({item.country})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label>Package Title</Label>
                    <Input
                      value={packageForm.title}
                      onChange={(e) =>
                        setPackageForm((prev) => ({ ...prev, title: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={packageForm.description}
                      onChange={(e) =>
                        setPackageForm((prev) => ({ ...prev, description: e.target.value }))
                      }
                      className="min-h-[90px]"
                    />
                  </div>

                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={packageForm.imageUrl}
                      onChange={(e) =>
                        setPackageForm((prev) => ({ ...prev, imageUrl: e.target.value }))
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Price</Label>
                      <Input
                        type="number"
                        value={packageForm.price}
                        onChange={(e) =>
                          setPackageForm((prev) => ({
                            ...prev,
                            price: parseNumber(e.target.value, prev.price),
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Input
                        value={packageForm.category}
                        onChange={(e) =>
                          setPackageForm((prev) => ({ ...prev, category: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label>Duration</Label>
                      <Input
                        type="number"
                        value={packageForm.duration}
                        onChange={(e) =>
                          setPackageForm((prev) => ({
                            ...prev,
                            duration: parseNumber(e.target.value, prev.duration),
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Nights</Label>
                      <Input
                        type="number"
                        value={packageForm.nights}
                        onChange={(e) =>
                          setPackageForm((prev) => ({
                            ...prev,
                            nights: parseNumber(e.target.value, prev.nights),
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Hotel Stars</Label>
                      <Input
                        type="number"
                        value={packageForm.hotelStars}
                        onChange={(e) =>
                          setPackageForm((prev) => ({
                            ...prev,
                            hotelStars: parseNumber(e.target.value, prev.hotelStars),
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Rating</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={packageForm.rating}
                        onChange={(e) =>
                          setPackageForm((prev) => ({
                            ...prev,
                            rating: parseNumber(e.target.value, prev.rating),
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Custom Destination Label (optional)</Label>
                      <Input
                        value={packageForm.destinationName ?? ""}
                        onChange={(e) =>
                          setPackageForm((prev) => ({ ...prev, destinationName: e.target.value }))
                        }
                        placeholder="Goa, India"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Included Items (comma separated)</Label>
                    <Textarea
                      value={packageForm.includedItems}
                      onChange={(e) =>
                        setPackageForm((prev) => ({ ...prev, includedItems: e.target.value }))
                      }
                      className="min-h-[70px]"
                    />
                  </div>

                  <div>
                    <Label>Excluded Items (comma separated)</Label>
                    <Textarea
                      value={packageForm.excludedItems}
                      onChange={(e) =>
                        setPackageForm((prev) => ({ ...prev, excludedItems: e.target.value }))
                      }
                      className="min-h-[70px]"
                    />
                  </div>

                  <div>
                    <Label>Itinerary (newline separated)</Label>
                    <Textarea
                      value={packageForm.itinerary}
                      onChange={(e) =>
                        setPackageForm((prev) => ({ ...prev, itinerary: e.target.value }))
                      }
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center justify-between rounded-xl border border-border p-3">
                      <Label htmlFor="pkg-meals">Meals Included</Label>
                      <Switch
                        id="pkg-meals"
                        checked={packageForm.mealsIncluded}
                        onCheckedChange={(value) =>
                          setPackageForm((prev) => ({ ...prev, mealsIncluded: value }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-border p-3">
                      <Label htmlFor="pkg-transport">Transport Included</Label>
                      <Switch
                        id="pkg-transport"
                        checked={packageForm.transportIncluded}
                        onCheckedChange={(value) =>
                          setPackageForm((prev) => ({ ...prev, transportIncluded: value }))
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-border p-3">
                    <Label htmlFor="pkg-featured">Show in Featured section</Label>
                    <Switch
                      id="pkg-featured"
                      checked={packageForm.featured}
                      onCheckedChange={(value) =>
                        setPackageForm((prev) => ({ ...prev, featured: value }))
                      }
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button onClick={savePackage} className="flex-1">
                      {editingPackageId ? "Update" : "Add Package"}
                    </Button>
                    <Button variant="outline" onClick={resetPackageForm}>
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">All Packages ({filteredPackages.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[80vh] overflow-y-auto pr-1">
                  {filteredPackages.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-border p-4 flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{item.title}</h4>
                          {item.featured && <Badge variant="secondary">Featured</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.destinationName} • ₹{item.price.toLocaleString()} • {item.duration}D/{item.nights}N
                        </p>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => {
                            setEditingPackageId(item.id);
                            setPackageForm({
                              destinationId: item.destinationId,
                              title: item.title,
                              description: item.description,
                              imageUrl: item.imageUrl,
                              price: item.price,
                              duration: item.duration,
                              nights: item.nights,
                              category: item.category,
                              rating: item.rating,
                              hotelStars: item.hotelStars,
                              mealsIncluded: item.mealsIncluded,
                              transportIncluded: item.transportIncluded,
                              includedItems: item.includedItems,
                              excludedItems: item.excludedItems,
                              itinerary: item.itinerary,
                              featured: item.featured,
                              destinationName: item.destinationName,
                            });
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => {
                            const approved = window.confirm("Delete this package?");
                            if (!approved) return;
                            deletePackage(item.id);
                            toast({ title: "Package deleted" });
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {filteredPackages.length === 0 && (
                    <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                      No packages found.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="blogs" className="mt-4">
            <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-5">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{editingBlogId ? "Edit Blog" : "Publish Blog"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={blogForm.title}
                      onChange={(e) => setBlogForm((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label>Excerpt</Label>
                    <Textarea
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                      className="min-h-[80px]"
                    />
                  </div>

                  <div>
                    <Label>Content</Label>
                    <Textarea
                      value={blogForm.content}
                      onChange={(e) => setBlogForm((prev) => ({ ...prev, content: e.target.value }))}
                      className="min-h-[140px]"
                    />
                  </div>

                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={blogForm.imageUrl}
                      onChange={(e) => setBlogForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Category</Label>
                      <Input
                        value={blogForm.category}
                        onChange={(e) =>
                          setBlogForm((prev) => ({ ...prev, category: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Author</Label>
                      <Input
                        value={blogForm.author}
                        onChange={(e) => setBlogForm((prev) => ({ ...prev, author: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Read Time (min)</Label>
                      <Input
                        type="number"
                        value={blogForm.readTime}
                        onChange={(e) =>
                          setBlogForm((prev) => ({
                            ...prev,
                            readTime: parseNumber(e.target.value, prev.readTime),
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Publish Date</Label>
                      <Input
                        type="date"
                        value={blogForm.publishedAt}
                        onChange={(e) =>
                          setBlogForm((prev) => ({ ...prev, publishedAt: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button onClick={saveBlog} className="flex-1">
                      {editingBlogId ? "Update" : "Publish Blog"}
                    </Button>
                    <Button variant="outline" onClick={resetBlogForm}>
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">All Blogs ({filteredBlogs.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[80vh] overflow-y-auto pr-1">
                  {filteredBlogs.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-border p-4 flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold line-clamp-1">{item.title}</h4>
                          <Badge variant="secondary">{item.category}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          By {item.author} • {item.readTime} min • {new Date(item.publishedAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{item.excerpt}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => {
                            setEditingBlogId(item.id);
                            setBlogForm({
                              title: item.title,
                              excerpt: item.excerpt,
                              content: item.content,
                              imageUrl: item.imageUrl,
                              category: item.category,
                              author: item.author,
                              readTime: item.readTime,
                              publishedAt: item.publishedAt.slice(0, 10),
                            });
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => {
                            const approved = window.confirm("Delete this blog post?");
                            if (!approved) return;
                            deleteBlogPost(item.id);
                            toast({ title: "Blog deleted" });
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {filteredBlogs.length === 0 && (
                    <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                      No blog posts found.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="testimonials" className="mt-4">
            <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-5">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {editingTestimonialId ? "Edit Testimonial" : "Add Testimonial"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={testimonialForm.name}
                        onChange={(e) =>
                          setTestimonialForm((prev) => ({ ...prev, name: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={testimonialForm.location}
                        onChange={(e) =>
                          setTestimonialForm((prev) => ({ ...prev, location: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Destination / Package Name</Label>
                    <Input
                      value={testimonialForm.destination}
                      onChange={(e) =>
                        setTestimonialForm((prev) => ({ ...prev, destination: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <Label>Avatar URL</Label>
                    <Input
                      value={testimonialForm.avatarUrl}
                      onChange={(e) =>
                        setTestimonialForm((prev) => ({ ...prev, avatarUrl: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <Label>Rating (1-5)</Label>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      value={testimonialForm.rating}
                      onChange={(e) =>
                        setTestimonialForm((prev) => ({
                          ...prev,
                          rating: Math.max(1, Math.min(5, parseNumber(e.target.value, prev.rating))),
                        }))
                      }
                    />
                  </div>

                  <div>
                    <Label>Review</Label>
                    <Textarea
                      value={testimonialForm.review}
                      onChange={(e) =>
                        setTestimonialForm((prev) => ({ ...prev, review: e.target.value }))
                      }
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button onClick={saveTestimonial} className="flex-1">
                      {editingTestimonialId ? "Update" : "Add Testimonial"}
                    </Button>
                    <Button variant="outline" onClick={resetTestimonialForm}>
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    All Testimonials ({filteredTestimonials.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[80vh] overflow-y-auto pr-1">
                  {filteredTestimonials.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-border p-4 flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{item.name}</h4>
                          <Badge variant="secondary">{item.rating}/5</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.location} • {item.destination}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-3">{item.review}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => {
                            setEditingTestimonialId(item.id);
                            setTestimonialForm({
                              name: item.name,
                              location: item.location,
                              rating: item.rating,
                              review: item.review,
                              avatarUrl: item.avatarUrl,
                              destination: item.destination,
                            });
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => {
                            const approved = window.confirm("Delete this testimonial?");
                            if (!approved) return;
                            deleteTestimonial(item.id);
                            toast({ title: "Testimonial deleted" });
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {filteredTestimonials.length === 0 && (
                    <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                      No testimonials found.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Homepage Customization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Hero Tag</Label>
                      <Input
                        value={settingsForm.heroTag}
                        onChange={(e) =>
                          setSettingsForm((prev) => ({ ...prev, heroTag: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Hero Title</Label>
                      <Input
                        value={settingsForm.heroTitle}
                        onChange={(e) =>
                          setSettingsForm((prev) => ({ ...prev, heroTitle: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Hero Highlight</Label>
                    <Input
                      value={settingsForm.heroHighlight}
                      onChange={(e) =>
                        setSettingsForm((prev) => ({ ...prev, heroHighlight: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <Label>Hero Subtitle</Label>
                    <Textarea
                      value={settingsForm.heroSubtitle}
                      onChange={(e) =>
                        setSettingsForm((prev) => ({ ...prev, heroSubtitle: e.target.value }))
                      }
                      className="min-h-[90px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Primary CTA Label</Label>
                      <Input
                        value={settingsForm.heroPrimaryCta}
                        onChange={(e) =>
                          setSettingsForm((prev) => ({ ...prev, heroPrimaryCta: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Secondary CTA Label</Label>
                      <Input
                        value={settingsForm.heroSecondaryCta}
                        onChange={(e) =>
                          setSettingsForm((prev) => ({ ...prev, heroSecondaryCta: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label>Featured Destinations</Label>
                      <Input
                        type="number"
                        value={settingsForm.featuredDestinationCount}
                        onChange={(e) =>
                          setSettingsForm((prev) => ({
                            ...prev,
                            featuredDestinationCount: parseNumber(
                              e.target.value,
                              prev.featuredDestinationCount
                            ),
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Featured Packages</Label>
                      <Input
                        type="number"
                        value={settingsForm.featuredPackageCount}
                        onChange={(e) =>
                          setSettingsForm((prev) => ({
                            ...prev,
                            featuredPackageCount: parseNumber(e.target.value, prev.featuredPackageCount),
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Featured Blogs</Label>
                      <Input
                        type="number"
                        value={settingsForm.featuredBlogCount}
                        onChange={(e) =>
                          setSettingsForm((prev) => ({
                            ...prev,
                            featuredBlogCount: parseNumber(e.target.value, prev.featuredBlogCount),
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-border p-3">
                    <Label htmlFor="show-trust-bar">Show Trust Stats Bar</Label>
                    <Switch
                      id="show-trust-bar"
                      checked={settingsForm.showTrustBar}
                      onCheckedChange={(value) =>
                        setSettingsForm((prev) => ({ ...prev, showTrustBar: value }))
                      }
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button onClick={saveSettings} className="gap-2">
                      <Settings className="w-4 h-4" /> Save Settings
                    </Button>
                    <Button variant="outline" onClick={() => setSettingsForm(settings)}>
                      Undo Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Admin Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    1) Destinations delete karne par linked packages auto-delete hote hain taaki broken links na bane.
                  </p>
                  <p>2) Blogs publish date SEO metadata me use hoti hai.</p>
                  <p>
                    3) Export JSON ko monthly backup rakhna best practice hai, especially jab content frequently
                    update ho raha ho.
                  </p>
                  <p>
                    4) <span className="font-medium text-foreground">Login password currently demo mode:</span>{" "}
                    <code>admin</code>.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  </div>
</div>
  );
}
