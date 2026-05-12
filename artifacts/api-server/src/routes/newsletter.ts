import { Router } from "express";
import { db } from "@workspace/db";
import { newsletterTable } from "@workspace/db";
import { SubscribeNewsletterBody } from "@workspace/api-zod";

const router = Router();

router.post("/newsletter", async (req, res) => {
  try {
    const data = SubscribeNewsletterBody.parse(req.body);
    const [sub] = await db.insert(newsletterTable).values(data).returning();
    res.status(201).json({ ...sub, subscribedAt: sub.subscribedAt.toISOString() });
  } catch (err: any) {
    if (err?.code === "23505") {
      return res.status(409).json({ error: "Already subscribed" });
    }
    req.log.error({ err }, "Failed to subscribe newsletter");
    res.status(400).json({ error: "Bad request" });
  }
});

export default router;
