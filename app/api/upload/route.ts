import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";

export const runtime = "nodejs";

const allowedTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Choose an image." }, { status: 400 });
  const extension = allowedTypes[file.type];
  if (!extension) return NextResponse.json({ error: "Use JPG, PNG, WEBP or AVIF." }, { status: 400 });
  if (file.size > 6 * 1024 * 1024) return NextResponse.json({ error: "Image must be under 6 MB." }, { status: 400 });
  const directory = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(directory, { recursive: true });
  const filename = `${Date.now()}-${randomUUID()}.${extension}`;
  await fs.writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: `/uploads/${filename}` });
}
