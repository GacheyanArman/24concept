import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { put } from "@vercel/blob";

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
  
  const filename = `${Date.now()}-${randomUUID()}.${extension}`;
  
  try {
    const blob = await put(filename, file, { access: 'public' });
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    return NextResponse.json({ error: "Cloud upload failed. Have you configured Vercel Blob?" }, { status: 500 });
  }
}
