import "server-only";

import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import type { Product, ProductInput } from "@/lib/types";

export async function readProducts(): Promise<Product[]> {
  const result = await db.select().from(products).orderBy(desc(products.createdAt));
  
  return result.map(row => ({
    ...row,
    gallery: (row.gallery as string[]) || [],
    sizes: (row.sizes as string[]) || [],
    createdAt: row.createdAt.toISOString(),
    hoverImage: row.hoverImage ?? undefined,
    label: row.label ?? undefined,
    instagramUrl: row.instagramUrl ?? undefined,
  }));
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const [row] = await db.insert(products).values({
    name: input.name,
    category: input.category,
    price: input.price,
    currency: input.currency,
    image: input.image,
    hoverImage: input.hoverImage || null,
    gallery: input.gallery || null,
    label: input.label || null,
    description: input.description,
    sizes: input.sizes,
    featured: input.featured,
    published: input.published,
    instagramUrl: input.instagramUrl || null,
  }).returning();

  return {
    ...row,
    gallery: (row.gallery as string[]) || [],
    sizes: (row.sizes as string[]) || [],
    createdAt: row.createdAt.toISOString(),
    hoverImage: row.hoverImage ?? undefined,
    label: row.label ?? undefined,
    instagramUrl: row.instagramUrl ?? undefined,
  };
}

export async function updateProduct(id: string, input: ProductInput): Promise<Product> {
  const [row] = await db.update(products).set({
    name: input.name,
    category: input.category,
    price: input.price,
    currency: input.currency,
    image: input.image,
    hoverImage: input.hoverImage || null,
    gallery: input.gallery || null,
    label: input.label || null,
    description: input.description,
    sizes: input.sizes,
    featured: input.featured,
    published: input.published,
    instagramUrl: input.instagramUrl || null,
  }).where(eq(products.id, id)).returning();

  return {
    ...row,
    gallery: (row.gallery as string[]) || [],
    sizes: (row.sizes as string[]) || [],
    createdAt: row.createdAt.toISOString(),
    hoverImage: row.hoverImage ?? undefined,
    label: row.label ?? undefined,
    instagramUrl: row.instagramUrl ?? undefined,
  };
}

export async function deleteProduct(id: string): Promise<void> {
  await db.delete(products).where(eq(products.id, id));
}

function asText(value: unknown, max = 180) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function asBoolean(value: unknown) {
  return value === true || value === "true";
}

export function validateProductInput(body: unknown):
  | { ok: true; value: ProductInput }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, error: "Invalid product payload." };
  }

  const source = body as Record<string, unknown>;
  const name = asText(source.name, 90);
  const category = asText(source.category, 50);
  const image = asText(source.image, 500);
  const hoverImage = asText(source.hoverImage, 500);
  const label = asText(source.label, 30);
  const instagramUrl = asText(source.instagramUrl, 200);
  const gallery = Array.isArray(source.gallery)
    ? source.gallery.map((item) => asText(item, 500)).filter((item) => item.startsWith("/") || item.startsWith("http")).slice(0, 16)
    : [];
  const description = asText(source.description, 600);
  const currency = asText(source.currency, 6).toUpperCase() || "AMD";
  const price = Number(source.price);
  const sizes = Array.isArray(source.sizes)
    ? source.sizes.map((item) => asText(item, 20)).filter(Boolean).slice(0, 12)
    : [];

  if (name.length < 2) return { ok: false, error: "Name is required." };
  if (category.length < 2) return { ok: false, error: "Category is required." };
  if (!Number.isFinite(price) || price < 0) return { ok: false, error: "Price must be valid." };
  if (!image.startsWith("/") && !image.startsWith("http")) return { ok: false, error: "Image must be a valid URL or local path." };
  if (description.length < 5) return { ok: false, error: "Description is required." };

  return {
    ok: true,
    value: {
      name,
      category,
      price,
      currency,
      image,
      hoverImage: hoverImage || undefined,
      gallery: gallery.length ? gallery : undefined,
      label: label || undefined,
      description,
      sizes: sizes.length ? sizes : ["One size"],
      featured: asBoolean(source.featured),
      published: source.published === undefined ? true : asBoolean(source.published),
      instagramUrl: instagramUrl || undefined,
    },
  };
}
