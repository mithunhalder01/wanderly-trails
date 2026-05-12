import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const testimonialsTable = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  rating: integer("rating").notNull().default(5),
  review: text("review").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  packageName: text("package_name").notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonialsTable).omit({ id: true });
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonialsTable.$inferSelect;
