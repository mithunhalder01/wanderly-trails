import { Router } from "express";
import { db } from "@workspace/db";
import { packagesTable, bookingsTable } from "@workspace/db";
import { eq, and, gte, lte, sql } from "drizzle-orm";
import { CreatePackageBody, UpdatePackageBody } from "@workspace/api-zod";

const router = Router();

router.get("/packages", async (req, res) => {
  try {
    const { category, minPrice, maxPrice, duration } = req.query as {
      category?: string;
      minPrice?: string;
      maxPrice?: string;
      duration?: string;
    };

    let query = db.select().from(packagesTable);
    const conditions = [];

    if (category) conditions.push(eq(packagesTable.category, category));
    if (minPrice) conditions.push(gte(packagesTable.price, parseInt(minPrice)));
    if (maxPrice) conditions.push(lte(packagesTable.price, parseInt(maxPrice)));
    if (duration) conditions.push(eq(packagesTable.duration, parseInt(duration)));

    const packages = conditions.length > 0
      ? await db.select().from(packagesTable).where(and(...conditions))
      : await db.select().from(packagesTable);

    res.json(packages);
  } catch (err) {
    req.log.error({ err }, "Failed to list packages");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/packages", async (req, res) => {
  try {
    const data = CreatePackageBody.parse(req.body);
    const [pkg] = await db.insert(packagesTable).values({
      ...data,
      destinationName: data.destinationName ?? "",
      imageUrl: data.imageUrl ?? "",
      featured: data.featured ?? false,
    }).returning();
    res.status(201).json(pkg);
  } catch (err) {
    req.log.error({ err }, "Failed to create package");
    res.status(400).json({ error: "Bad request" });
  }
});

router.get("/packages/featured", async (req, res) => {
  try {
    const packages = await db.select().from(packagesTable).where(eq(packagesTable.featured, true));
    res.json(packages);
  } catch (err) {
    req.log.error({ err }, "Failed to list featured packages");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/packages/stats", async (req, res) => {
  try {
    const [packageCount] = await db.select({ count: sql<number>`count(*)` }).from(packagesTable);
    const [destinationCount] = await db.select({ count: sql<number>`count(*)` }).from(packagesTable);
    const [avgPriceResult] = await db.select({ avg: sql<number>`avg(price)` }).from(packagesTable);
    const [bookingCount] = await db.select({ count: sql<number>`count(*)` }).from(bookingsTable);

    const categoryCounts = await db
      .select({ category: packagesTable.category, count: sql<number>`count(*)` })
      .from(packagesTable)
      .groupBy(packagesTable.category);

    res.json({
      totalPackages: Number(packageCount.count),
      totalDestinations: Number(destinationCount.count),
      avgPrice: Math.round(Number(avgPriceResult.avg) || 0),
      totalBookings: Number(bookingCount.count),
      categoryCounts: categoryCounts.map((c) => ({ category: c.category, count: Number(c.count) })),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get package stats");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/packages/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [pkg] = await db.select().from(packagesTable).where(eq(packagesTable.id, id));
    if (!pkg) return res.status(404).json({ error: "Not found" });
    res.json(pkg);
  } catch (err) {
    req.log.error({ err }, "Failed to get package");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/packages/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = UpdatePackageBody.parse(req.body);
    const [pkg] = await db.update(packagesTable).set(data).where(eq(packagesTable.id, id)).returning();
    if (!pkg) return res.status(404).json({ error: "Not found" });
    res.json(pkg);
  } catch (err) {
    req.log.error({ err }, "Failed to update package");
    res.status(400).json({ error: "Bad request" });
  }
});

router.delete("/packages/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(packagesTable).where(eq(packagesTable.id, id));
    res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete package");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/packages/:id/related", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [pkg] = await db.select().from(packagesTable).where(eq(packagesTable.id, id));
    if (!pkg) return res.status(404).json({ error: "Not found" });

    const related = await db.select().from(packagesTable)
      .where(and(eq(packagesTable.category, pkg.category), sql`id != ${id}`))
      .limit(3);
    res.json(related);
  } catch (err) {
    req.log.error({ err }, "Failed to get related packages");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
