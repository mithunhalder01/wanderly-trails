import { pgTable, serial, text, integer, real, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const packagesTable = pgTable("packages", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  destinationId: integer("destination_id").notNull(),
  destinationName: text("destination_name").notNull(),
  imageUrl: text("image_url").notNull(),
  price: integer("price").notNull(),
  duration: integer("duration").notNull(),
  nights: integer("nights").notNull(),
  category: text("category").notNull(),
  rating: real("rating").notNull().default(4.5),
  hotelStars: integer("hotel_stars").notNull().default(4),
  mealsIncluded: boolean("meals_included").notNull().default(true),
  transportIncluded: boolean("transport_included").notNull().default(true),
  description: text("description").notNull(),
  itinerary: text("itinerary"),
  includedItems: text("included_items"),
  excludedItems: text("excluded_items"),
  featured: boolean("featured").notNull().default(false),
});

export const insertPackageSchema = createInsertSchema(packagesTable).omit({ id: true });
export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type Package = typeof packagesTable.$inferSelect;
