import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import { getBlogPostById } from "@/data/staticData";

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:id");
  const id = params?.id ? parseInt(params.id) : 0;
  const post = getBlogPostById(id);

  if (!post) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-xl">Post not found.</p>
        <Link href="/blog" className="text-primary font-semibold">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="relative h-96 overflow-hidden">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="max-w-4xl mx-auto w-full">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Articles
            </Link>
            <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-4">{post.category}</span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">{post.title}</h1>
            <div className="flex items-center gap-6 text-white/70 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{post.author}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime} min read</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed border-l-4 border-primary pl-6">{post.excerpt}</p>
          <div className="prose prose-lg max-w-none text-foreground prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-5">{para}</p>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-border">
            <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Back to All Articles
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
