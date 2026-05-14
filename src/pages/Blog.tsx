import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, User, ChevronRight } from "lucide-react";
import { blogPosts } from "@/data/staticData";
import PageHero from "@/components/PageHero";

const categories = ["All", "Travel Tips", "Destinations", "Budget Travel", "Visa Guide", "Beaches"];

export default function Blog() {
  const [active, setActive] = useState("All");

  const posts = useMemo(() => {
    if (active === "All") return blogPosts;
    return blogPosts.filter((p) => p.category === active);
  }, [active]);

  return (
    <div className="pt-20">
      <PageHero
        image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80"
        alt="Blog"
        badge="Travel Stories"
        title="Our Blog"
        subtitle="Expert travel guides, planning tips, and destination insights."
      />

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4">
          <p className="text-sm text-muted-foreground">{posts.length} articles available</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground/70">{active}</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)} data-testid={`filter-blog-${cat.toLowerCase().replace(/ /g, "-")}`}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${active === cat ? "bg-primary text-white shadow-md" : "bg-muted text-muted-foreground hover:bg-muted-foreground/10"}`}>
              {cat}
            </button>
          ))}
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-testid={`card-blog-${post.id}`}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">{post.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{post.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime} min read</span>
                  </div>
                  <h2 className="font-serif font-bold text-xl mb-3 line-clamp-2">{post.title}</h2>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.id}`} data-testid={`link-read-blog-${post.id}`} className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                    Read More <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No articles found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
