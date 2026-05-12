import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const blogPostsTable = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  author: text("author").notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  readTime: integer("read_time").notNull().default(5),
});

export const insertBlogPostSchema = createInsertSchema(blogPostsTable).omit({ id: true, publishedAt: true });
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPostsTable.$inferSelect;
