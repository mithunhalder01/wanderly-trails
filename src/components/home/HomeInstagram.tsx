import { Instagram, Sparkles, Play, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/lib/contact";

const profileData = {
  username: "iskcon_noida",
  fullName: "Sri Sri Radha Govind Dev Ji Temple",
  followers: "101K",
  posts: "2,713",
  profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
};

const mockPosts = [
  { id: 1, type: "video", url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=400&fit=crop" },
  { id: 2, type: "image", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop" },
  { id: 3, type: "gallery", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop" },
  { id: 4, type: "image", url: "https://images.unsplash.com/photo-1595815775739-91d9c1d44e39?w=400&h=400&fit=crop" },
  { id: 5, type: "video", url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=400&fit=crop" },
  { id: 6, type: "image", url: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=400&h=400&fit=crop" },
];

export default function HomeInstagram() {
  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold mb-5 shadow-sm"
          >
            <Sparkles className="h-4 w-4" />
            <span className="tracking-[0.2em] uppercase">Connect With Us</span>
          </motion.div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Explore Our World</h2>
        </div>

        {/* Main Instagram Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-[400px] bg-white rounded-[16px] p-5 shadow-[0_10px_40px_-10px_rgba(217,70,239,0.25)] border border-zinc-100 relative group"
        >
          {/* Header Section */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Profile Picture with Gradient Ring */}
              <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
                <div className="bg-white p-[2px] rounded-full">
                  <img 
                    src={profileData.profilePic} 
                    alt={profileData.username}
                    className="w-16 h-16 rounded-full object-cover border border-zinc-100"
                  />
                </div>
              </div>
              
              <div className="flex flex-col">
                <h3 className="font-bold text-zinc-900 leading-tight flex items-center gap-1">
                  {profileData.username}
                  <span className="bg-blue-500 rounded-full p-0.5" title="Verified">
                    <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                  </span>
                </h3>
                <p className="text-xs text-zinc-600 font-medium">{profileData.fullName}</p>
                <div className="flex items-center gap-1.5 mt-1 text-[13px]">
                  <span className="font-bold text-zinc-900">{profileData.followers}</span>
                  <span className="text-zinc-500">followers</span>
                  <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                  <span className="font-bold text-zinc-900">{profileData.posts}</span>
                  <span className="text-zinc-500">posts</span>
                </div>
              </div>
            </div>
            
            <Instagram className="w-6 h-6 text-zinc-300 group-hover:text-[#E1306C] transition-colors" />
          </div>

          {/* Image Grid 3x2 */}
          <div className="grid grid-cols-3 gap-[2px] overflow-hidden rounded-lg">
            {mockPosts.map((post, i) => (
              <motion.a
                key={post.id}
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noreferrer"
                whileHover={{ opacity: 0.9 }}
                className="aspect-square relative bg-zinc-100 overflow-hidden"
              >
                <img 
                  src={post.url} 
                  alt="Instagram post" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Type Icons */}
                <div className="absolute top-1 right-1 text-white drop-shadow-sm">
                  {post.type === "video" && <Play className="w-3.5 h-3.5 fill-current" />}
                  {post.type === "gallery" && <Layers className="w-3.5 h-3.5" />}
                </div>
              </motion.a>
            ))}
          </div>

          {/* Follow Button Action */}
          <a 
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-5 w-full py-2 bg-[#0095f6] hover:bg-[#1877f2] text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}