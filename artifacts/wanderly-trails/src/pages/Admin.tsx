import { useState } from "react";
import { motion } from "framer-motion";
import { Package, MapPin, BookOpen, Calendar, Plus, Trash2, Edit, Eye } from "lucide-react";
import { packages, destinations, blogPosts } from "@/data/staticData";
import { Link } from "wouter";

const tabs = [
  { id: "packages", label: "Packages", icon: Package },
  { id: "bookings", label: "Bookings", icon: Calendar },
  { id: "destinations", label: "Destinations", icon: MapPin },
  { id: "blog", label: "Blog", icon: BookOpen },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("packages");

  return (
    <div className="pt-20 min-h-screen bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold">Admin Panel</h1>
              <p className="text-muted-foreground mt-1">Manage all aspects of Wanderly Trails</p>
            </div>
            <div className="flex items-center gap-2 text-xs bg-accent/10 text-accent font-bold px-3 py-1.5 rounded-full">
              Admin Access
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Package, label: "Packages", val: packages.length, color: "bg-primary/10 text-primary" },
              { icon: Calendar, label: "Bookings", val: 0, color: "bg-accent/10 text-accent" },
              { icon: MapPin, label: "Destinations", val: destinations.length, color: "bg-green-50 text-green-600" },
              { icon: BookOpen, label: "Blog Posts", val: blogPosts.length, color: "bg-purple-50 text-purple-600" },
            ].map(({ icon: Icon, label, val, color }) => (
              <div key={label} className="bg-card border border-border rounded-2xl p-5 flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center shrink-0`}><Icon className="w-5 h-5" /></div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-2xl font-serif font-bold">{val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="flex border-b border-border overflow-x-auto">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setActiveTab(id)} data-testid={`admin-tab-${id}`}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors ${activeTab === id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                  <Icon className="w-4 h-4" /> {label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === "packages" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif font-bold text-lg">All Packages</h3>
                    <Link href="/packages" className="flex items-center gap-1.5 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors">
                      <Plus className="w-4 h-4" /> Add Package
                    </Link>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="border-b border-border">
                        {["Package", "Destination", "Price", "Category", "Rating", "Actions"].map((h) => (
                          <th key={h} className="pb-3 text-left font-semibold text-muted-foreground text-xs pr-4">{h}</th>
                        ))}
                      </tr></thead>
                      <tbody className="divide-y divide-border">
                        {packages.map((pkg) => (
                          <tr key={pkg.id} data-testid={`admin-pkg-row-${pkg.id}`} className="hover:bg-muted/50">
                            <td className="py-3 pr-4"><p className="font-medium">{pkg.title}</p></td>
                            <td className="py-3 pr-4 text-muted-foreground">{pkg.destinationName}</td>
                            <td className="py-3 pr-4 font-semibold text-primary">₹{pkg.price.toLocaleString()}</td>
                            <td className="py-3 pr-4"><span className="bg-accent/10 text-accent text-xs font-semibold px-2 py-1 rounded-full">{pkg.category}</span></td>
                            <td className="py-3 pr-4">{pkg.rating}</td>
                            <td className="py-3 pr-4">
                              <div className="flex items-center gap-2">
                                <Link href={`/packages/${pkg.id}`} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors"><Eye className="w-4 h-4" /></Link>
                                <button className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors"><Edit className="w-4 h-4" /></button>
                                <button className="p-1.5 hover:bg-red-50 rounded-lg text-muted-foreground hover:text-red-500 transition-colors" data-testid={`btn-delete-pkg-${pkg.id}`}><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "bookings" && (
                <div>
                  <h3 className="font-serif font-bold text-lg mb-4">All Bookings</h3>
                  <div className="text-center py-12 text-muted-foreground">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No bookings yet.</p>
                    <p className="text-sm mt-1">Bookings from the Booking form will appear here.</p>
                  </div>
                </div>
              )}

              {activeTab === "destinations" && (
                <div>
                  <h3 className="font-serif font-bold text-lg mb-4">All Destinations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {destinations.map((d) => (
                      <div key={d.id} data-testid={`admin-dest-${d.id}`} className="flex items-center gap-3 bg-muted rounded-xl p-4">
                        <img src={d.imageUrl} alt={d.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{d.name}</p>
                          <p className="text-xs text-muted-foreground">{d.country} • {d.category}</p>
                        </div>
                        <Link href={`/destinations/${d.id}`} className="text-primary hover:text-primary/80"><Eye className="w-4 h-4" /></Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "blog" && (
                <div>
                  <h3 className="font-serif font-bold text-lg mb-4">Blog Posts</h3>
                  <div className="space-y-3">
                    {blogPosts.map((post) => (
                      <div key={post.id} data-testid={`admin-blog-${post.id}`} className="flex items-center gap-4 bg-muted rounded-xl p-4">
                        <img src={post.imageUrl} alt={post.title} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{post.title}</p>
                          <p className="text-xs text-muted-foreground">{post.category} • {post.author} • {post.readTime} min</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href={`/blog/${post.id}`} className="p-1.5 hover:bg-card rounded-lg text-muted-foreground transition-colors"><Eye className="w-4 h-4" /></Link>
                          <button className="p-1.5 hover:bg-card rounded-lg text-muted-foreground transition-colors"><Edit className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
