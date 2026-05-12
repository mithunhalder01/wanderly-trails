import { Router } from "express";
import { db } from "@workspace/db";
import { bookingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateBookingBody } from "@workspace/api-zod";

const router = Router();

router.get("/bookings", async (req, res) => {
  try {
    const bookings = await db.select().from(bookingsTable).orderBy(bookingsTable.createdAt);
    res.json(bookings.map((b) => ({
      ...b,
      createdAt: b.createdAt.toISOString(),
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to list bookings");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/bookings", async (req, res) => {
  try {
    const data = CreateBookingBody.parse(req.body);
    const [booking] = await db.insert(bookingsTable).values({
      ...data,
      status: "pending",
    }).returning();
    res.status(201).json({
      ...booking,
      createdAt: booking.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create booking");
    res.status(400).json({ error: "Bad request" });
  }
});

router.get("/bookings/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [booking] = await db.select().from(bookingsTable).where(eq(bookingsTable.id, id));
    if (!booking) return res.status(404).json({ error: "Not found" });
    res.json({
      ...booking,
      createdAt: booking.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get booking");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
