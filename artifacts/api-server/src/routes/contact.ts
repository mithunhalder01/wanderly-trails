import { Router } from "express";
import { db } from "@workspace/db";
import { contactMessagesTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";

const router = Router();

router.post("/contact", async (req, res) => {
  try {
    const data = SubmitContactBody.parse(req.body);
    const [msg] = await db.insert(contactMessagesTable).values(data).returning();
    res.status(201).json({ ...msg, createdAt: msg.createdAt.toISOString() });
  } catch (err) {
    req.log.error({ err }, "Failed to submit contact message");
    res.status(400).json({ error: "Bad request" });
  }
});

export default router;
