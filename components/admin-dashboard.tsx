"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { Check, Edit3, Eye, EyeOff, ImagePlus, Images, LoaderCircle, LogOut, Plus, Save, Trash2, X } from "lucide-react";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/language-switcher";

const blank = {
  name: "", category: "Dresses", price: "", currency: "AMD", image: "", hoverImage: "", gallery: "", label: "", description: "", sizes: "XS, S, M", featured: false, published: true, instagramUrl: "",
};

type FormState = typeof blank;
type ImageField = "image" | "hoverImage";

export function AdminDashboard({ initialProducts, dict, currentLang }: { initialProducts: Product[]; dict: Record<string, string>; currentLang: string }) {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState<FormState>(blank);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState("");
  const [message, setMessage] = useState("");

  function change<K extends keyof FormState>(key: K, value: FormState[K]) { setForm((state) => ({ ...state, [key]: value })); }
  function reset() { setForm(blank); setEditingId(null); setMessage(""); }
  function edit(product: Product) {
    setEditingId(product.id);
    setForm({ name: product.name, category: product.category, price: String(product.price), currency: product.currency, image: product.image, hoverImage: product.hoverImage || "", gallery: (product.gallery || []).join("\n"), label: product.label || "", description: product.description, sizes: product.sizes.join(", "), featured: product.featured, published: product.published, instagramUrl: product.instagramUrl || "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function uploadFile(file: File) {
    const body = new FormData(); body.append("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || dict.upload_failed);
    return result.url as string;
  }

  async function uploadSingle(file: File | undefined, field: ImageField) {
    if (!file) return;
    setUploading(field); setMessage("");
    try { change(field, await uploadFile(file)); }
    catch (error) { setMessage(error instanceof Error ? error.message : dict.upload_failed); }
    finally { setUploading(""); }
  }

  async function uploadGallery(files: FileList | null) {
    if (!files?.length) return;
    setUploading("gallery"); setMessage("");
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) urls.push(await uploadFile(file));
      const existing = form.gallery.split(/[\n,]+/).map((item) => item.trim()).filter(Boolean);
      change("gallery", [...existing, ...urls].join("\n"));
    } catch (error) { setMessage(error instanceof Error ? error.message : dict.upload_failed); }
    finally { setUploading(""); }
  }

  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    const payload = {
      ...form,
      price: Number(form.price),
      sizes: form.sizes.split(",").map((item) => item.trim()).filter(Boolean),
      gallery: form.gallery.split(/[\n,]+/).map((item) => item.trim()).filter(Boolean),
    };
    const response = await fetch(editingId ? `/api/products/${editingId}` : "/api/products", { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!response.ok) { setMessage(result.error || dict.save_failed); setBusy(false); return; }
    setProducts((items) => editingId ? items.map((item) => item.id === editingId ? result : item) : [result, ...items]);
    setMessage(editingId ? dict.product_updated : dict.product_added);
    setForm(blank); setEditingId(null); setBusy(false);
  }

  async function remove(id: string) {
    if (!window.confirm(dict.delete_confirm)) return;
    const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (response.ok) setProducts((items) => items.filter((item) => item.id !== id));
  }

  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); window.location.href = `/${currentLang}/admin/login`; }
  const galleryPreview = form.gallery.split(/[\n,]+/).map((item) => item.trim()).filter(Boolean);

  return (
    <main className="min-h-screen bg-[#f3efec] p-4 md:p-8">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-6 flex flex-col justify-between gap-4 rounded-[2rem] bg-black px-6 py-5 text-white md:flex-row md:items-center"><div><p className="text-[10px] uppercase tracking-[.22em] text-white/45">The 24 Concept</p><h1 className="mt-1 font-serif text-4xl">{dict.title}</h1></div><div className="flex items-center gap-3"><LanguageSwitcher currentLang={currentLang} invert={true} /><a href={`/${currentLang}`} target="_blank" className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 px-4 text-xs"><Eye className="size-4" /> {dict.view_site}</a><button onClick={logout} className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-xs text-black"><LogOut className="size-4" /> {dict.logout}</button></div></header>
        <div className="grid gap-6 xl:grid-cols-[460px_1fr]">
          <form onSubmit={submit} className="h-fit max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[2rem] bg-white p-5 shadow-sm md:p-7 xl:sticky xl:top-4 scrollbar-hide">
            <div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-black/35">{dict.product_card}</p><h2 className="mt-1 font-serif text-4xl">{editingId ? dict.edit_product : dict.add_product}</h2></div>{editingId && <button type="button" onClick={reset} className="grid size-10 place-items-center rounded-full bg-black/5"><X className="size-4" /></button>}</div>
            <div className="mt-6 grid gap-4">
              <Field label={dict.name}><Input value={form.name} onChange={(e) => change("name", e.target.value)} required /></Field>
              <div className="grid grid-cols-2 gap-3"><Field label={dict.category}><select value={form.category} onChange={(e) => change("category", e.target.value)} className="h-11 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none">{["Dresses", "Corsets", "Suits", "Tops", "Accessories", "Shoes", "Bags"].map((item) => <option key={item}>{item}</option>)}</select></Field><Field label={dict.label}><Input value={form.label} onChange={(e) => change("label", e.target.value)} placeholder="New" /></Field></div>
              <div className="grid grid-cols-[1fr_100px] gap-3"><Field label={dict.price}><Input type="number" min="0" value={form.price} onChange={(e) => change("price", e.target.value)} required /></Field><Field label={dict.currency}><Input value={form.currency} onChange={(e) => change("currency", e.target.value.toUpperCase())} /></Field></div>
              <Field label={dict.description}><Textarea value={form.description} onChange={(e) => change("description", e.target.value)} required /></Field>
              <Field label={dict.sizes}><Input value={form.sizes} onChange={(e) => change("sizes", e.target.value)} placeholder="XS, S, M" /></Field>
              <Field label={dict.ig_url}><Input value={form.instagramUrl || ""} onChange={(e) => change("instagramUrl", e.target.value)} placeholder="https://www.instagram.com/p/..." /></Field>

              <Field label={dict.main_image}><Input value={form.image} onChange={(e) => change("image", e.target.value)} placeholder="/uploads/photo.webp" required /></Field>
              <UploadBox loading={uploading === "image"} text={dict.upload_main} uploadingText={dict.uploading}><input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="absolute inset-0 cursor-pointer opacity-0" onChange={(e) => uploadSingle(e.target.files?.[0], "image")} /></UploadBox>
              {form.image && <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100"><Image src={form.image} alt="Main preview" fill className="object-contain" sizes="420px" /></div>}

              <Field label={dict.hover_image}><Input value={form.hoverImage} onChange={(e) => change("hoverImage", e.target.value)} placeholder="/images/another.webp" /></Field>
              <UploadBox loading={uploading === "hoverImage"} text={dict.upload_hover} uploadingText={dict.uploading}><input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="absolute inset-0 cursor-pointer opacity-0" onChange={(e) => uploadSingle(e.target.files?.[0], "hoverImage")} /></UploadBox>

              <Field label={dict.gallery_paths}><Textarea value={form.gallery} onChange={(e) => change("gallery", e.target.value)} placeholder={'/uploads/detail-1.webp\n/uploads/detail-2.webp'} className="min-h-28" /></Field>
              <UploadBox loading={uploading === "gallery"} text={dict.upload_gallery} uploadingText={dict.uploading} icon={<Images className="size-5" />}><input multiple type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="absolute inset-0 cursor-pointer opacity-0" onChange={(e) => uploadGallery(e.target.files)} /></UploadBox>
              {galleryPreview.length > 0 && <div className="grid grid-cols-4 gap-2">{galleryPreview.slice(0, 12).map((src) => <div key={src} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100"><Image src={src} alt="Gallery preview" fill className="object-cover" sizes="100px" /></div>)}</div>}

              <div className="grid grid-cols-2 gap-3"><Toggle checked={form.featured} onChange={(value) => change("featured", value)} label={dict.featured} icon={<Check className="size-4" />} /><Toggle checked={form.published} onChange={(value) => change("published", value)} label={dict.published} icon={form.published ? <Eye className="size-4" /> : <EyeOff className="size-4" />} /></div>
            </div>
            {message && <p className="mt-4 rounded-xl bg-black/5 px-4 py-3 text-sm">{message}</p>}
            <Button className="mt-5 w-full" size="lg" disabled={busy}>{busy ? <LoaderCircle className="size-4 animate-spin" /> : editingId ? <Save className="size-4" /> : <Plus className="size-4" />}{editingId ? dict.save_changes : dict.add_product}</Button>
          </form>

          <section className="rounded-[2rem] bg-white p-5 shadow-sm md:p-7"><div className="flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-black/35">{dict.catalogue}</p><h2 className="mt-1 font-serif text-4xl">{products.length} {dict.products}</h2></div><span className="rounded-full bg-[#ead6d6] px-4 py-2 text-xs">Neon PostgreSQL</span></div>
            <div className="mt-6 grid gap-3">
              {products.map((product) => <article key={product.id} className="grid grid-cols-[82px_1fr] gap-4 rounded-2xl border border-black/7 p-3 md:grid-cols-[95px_1fr_auto] md:items-center"><div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100"><Image src={product.image} alt={product.name} fill className="object-cover" sizes="95px" /></div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate font-serif text-2xl">{product.name}</h3>{!product.published && <span className="rounded-full bg-black/7 px-2.5 py-1 text-[9px] uppercase tracking-[.13em]">{dict.hidden}</span>}</div><p className="mt-1 text-xs text-black/45">{product.category} · {formatPrice(product.price, product.currency)} · {(product.gallery || []).length + (product.hoverImage ? 2 : 1)} {dict.photos}</p><p className="mt-2 line-clamp-2 text-sm leading-5 text-black/55">{product.description}</p></div><div className="col-span-2 flex gap-2 md:col-span-1"><button onClick={() => edit(product)} className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-black/10 px-4 text-xs transition hover:bg-black hover:text-white md:flex-none"><Edit3 className="size-3.5" /> {dict.edit}</button><button onClick={() => remove(product.id)} className="grid size-10 place-items-center rounded-full border border-red-200 text-red-600 transition hover:bg-red-600 hover:text-white" aria-label="Delete"><Trash2 className="size-4" /></button></div></article>)}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.15em] text-black/45">{label}</span>{children}</label>; }
function Toggle({ checked, onChange, label, icon }: { checked: boolean; onChange: (value: boolean) => void; label: string; icon: React.ReactNode }) { return <button type="button" onClick={() => onChange(!checked)} className={`flex h-12 items-center justify-center gap-2 rounded-2xl border text-sm transition ${checked ? "border-black bg-black text-white" : "border-black/10 bg-white"}`}>{icon}{label}</button>; }
function UploadBox({ loading, text, uploadingText, icon, children }: { loading: boolean; text: string; uploadingText: string; icon?: React.ReactNode; children: React.ReactNode }) { return <label className="relative flex min-h-20 cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-black/20 bg-black/[.025] text-sm transition hover:bg-black/[.05]">{children}{loading ? <LoaderCircle className="size-5 animate-spin" /> : icon || <ImagePlus className="size-5" />}{loading ? uploadingText : text}</label>; }
