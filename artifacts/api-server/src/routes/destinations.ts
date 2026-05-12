import { Router } from "express";
import { db } from "@workspace/db";
import { destinationsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/destinations", async (req, res) => {
  try {
    const { category } = req.query as { category?: string };
    let destinations;
    if (category) {
      destinations = await db.select().from(destinationsTable).where(eq(destinationsTable.category, category));
    } else {
      destinations = await db.select().from(destinationsTable);
    }
    res.json(destinations);
  } catch (err) {
    req.log.error({ err }, "Failed to list destinations");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/destinations/featured", async (req, res) => {
  try {
    const destinations = await db.select().from(destinationsTable).where(eq(destinationsTable.featured, true));
    res.json(destinations);
  } catch (err) {
    req.log.error({ err }, "Failed to list featured destinations");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/destinations/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [destination] = await db.select().from(destinationsTable).where(eq(destinationsTable.id, id));
    if (!destination) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json(destination);
  } catch (err) {
    req.log.error({ err }, "Failed to get destination");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
