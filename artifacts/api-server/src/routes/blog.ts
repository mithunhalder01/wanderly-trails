import { Router } from "express";
import { db } from "@workspace/db";
import { blogPostsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateBlogPostBody } from "@workspace/api-zod";

const router = Router();

router.get("/blog", async (req, res) => {
  try {
    const { category } = req.query as { category?: string };
    let posts;
    if (category) {
      posts = await db.select().from(blogPostsTable).where(eq(blogPostsTable.category, category));
    } else {
      posts = await db.select().from(blogPostsTable).orderBy(blogPostsTable.publishedAt);
    }
    res.json(posts.map((p) => ({ ...p, publishedAt: p.publishedAt.toISOString() })));
  } catch (err) {
    req.log.error({ err }, "Failed to list blog posts");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/blog", async (req, res) => {
  try {
    const data = CreateBlogPostBody.parse(req.body);
    const [post] = await db.insert(blogPostsTable).values(data).returning();
    res.status(201).json({ ...post, publishedAt: post.publishedAt.toISOString() });
  } catch (err) {
    req.log.error({ err }, "Failed to create blog post");
    res.status(400).json({ error: "Bad request" });
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [post] = await db.select().from(blogPostsTable).where(eq(blogPostsTable.id, id));
    if (!post) return res.status(404).json({ error: "Not found" });
    res.json({ ...post, publishedAt: post.publishedAt.toISOString() });
  } catch (err) {
    req.log.error({ err }, "Failed to get blog post");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
