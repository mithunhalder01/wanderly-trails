import { Router } from "express";
import { db } from "@workspace/db";
import { testimonialsTable } from "@workspace/db";
import { CreateTestimonialBody } from "@workspace/api-zod";

const router = Router();

router.get("/testimonials", async (req, res) => {
  try {
    const testimonials = await db.select().from(testimonialsTable);
    res.json(testimonials);
  } catch (err) {
    req.log.error({ err }, "Failed to list testimonials");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/testimonials", async (req, res) => {
  try {
    const data = CreateTestimonialBody.parse(req.body);
    const [testimonial] = await db.insert(testimonialsTable).values(data).returning();
    res.status(201).json(testimonial);
  } catch (err) {
    req.log.error({ err }, "Failed to create testimonial");
    res.status(400).json({ error: "Bad request" });
  }
});

export default router;
