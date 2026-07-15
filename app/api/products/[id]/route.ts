import { NextResponse } from "next/server";
import { updateProduct, deleteProduct, validateProductInput } from "@/lib/products";
import { isAdminAuthenticated } from "@/lib/auth";

export const runtime = "nodejs";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const validation = validateProductInput(await request.json().catch(() => null));
  if (!validation.ok) return NextResponse.json({ error: validation.error }, { status: 400 });
  
  try {
    const product = await updateProduct(id, validation.value);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Product not found or Database error" }, { status: 404 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  
  try {
    await deleteProduct(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Product not found or Database error" }, { status: 404 });
  }
}
