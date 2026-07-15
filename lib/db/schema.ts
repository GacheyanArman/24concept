import { boolean, integer, jsonb, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  price: integer("price").notNull(),
  currency: varchar("currency", { length: 6 }).notNull().default("AMD"),
  image: text("image").notNull(),
  hoverImage: text("hover_image"),
  gallery: jsonb("gallery").$type<string[]>(),
  label: varchar("label", { length: 30 }),
  description: text("description").notNull(),
  sizes: jsonb("sizes").$type<string[]>().notNull(),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  instagramUrl: text("instagram_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
