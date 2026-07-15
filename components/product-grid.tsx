"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowLeft, ArrowRight, ArrowUpRight, Heart, Instagram, X } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

function productImages(product: Product) {
  return Array.from(new Set([product.image, ...(product.gallery || [])].filter(Boolean) as string[]));
}

function ProductQuickView({ product, dict }: { product: Product; dict: Record<string, string> }) {
  const images = productImages(product);
  const [active, setActive] = useState(0);

  function move(direction: number) {
    setActive((current) => (current + direction + images.length) % images.length);
  }

  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm transition data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
      <Dialog.Viewport className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto p-3 md:p-8">
        <Dialog.Popup className="relative grid w-full max-w-6xl overflow-hidden rounded-[2rem] bg-[#f7f2ef] shadow-2xl transition duration-300 data-[ending-style]:translate-y-8 data-[ending-style]:opacity-0 data-[starting-style]:translate-y-8 data-[starting-style]:opacity-0 md:grid-cols-[1.1fr_.9fr]">
          <div className="relative min-h-[500px] bg-[#e8e1dc] md:min-h-[720px]">
            <Image src={images[active]} alt={`${product.name} — view ${active + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 58vw" />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
              {images.length > 1 ? (
                <>
                  <button type="button" onClick={() => move(-1)} className="grid size-11 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-105" aria-label="Previous image"><ArrowLeft className="size-4" /></button>
                  <span className="rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-semibold tracking-[.18em] text-white backdrop-blur">{String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
                  <button type="button" onClick={() => move(1)} className="grid size-11 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-105" aria-label="Next image"><ArrowRight className="size-4" /></button>
                </>
              ) : <span />}
            </div>
          </div>

          <div className="flex min-h-[620px] flex-col p-7 md:p-12">
            <Dialog.Close className="absolute right-5 top-5 z-10 grid size-11 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur" aria-label="Close"><X className="size-5" /></Dialog.Close>
            <p className="eyebrow">{product.category}</p>
            <Dialog.Title className="mt-4 max-w-xl font-serif text-5xl leading-[.9] md:text-7xl">{product.name}</Dialog.Title>
            <Dialog.Description className="mt-6 max-w-md text-base leading-7 text-black/58">{product.description}</Dialog.Description>
            <p className="mt-8 text-xl font-semibold">{formatPrice(product.price, product.currency)}</p>

            {images.length > 1 && (
              <div className="mt-8">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[.2em] text-black/45">{dict.gallery}</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((src, index) => (
                    <button key={src} type="button" onClick={() => setActive(index)} className={cn("relative aspect-[3/4] w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-[#eee8e4] transition", active === index ? "border-black" : "border-transparent opacity-65 hover:opacity-100")}>
                      <Image src={src} alt="" fill className="object-cover" sizes="64px" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-7">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[.2em] text-black/45">{dict.sizes}</p>
              <div className="flex flex-wrap gap-2">{product.sizes.map((size) => <span key={size} className="grid min-w-12 place-items-center rounded-full border border-black/15 bg-white px-4 py-2 text-sm">{size}</span>)}</div>
            </div>

            <div className="mt-auto pt-10">
              <a href={product.instagramUrl || "https://www.instagram.com/the24concept_/"} target="_blank" rel="noreferrer" className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-black text-sm font-semibold text-white transition hover:bg-[#a96f70]"><Instagram className="size-4" /> {dict.reserve}</a>
              <p className="mt-4 text-center text-xs text-black/40">{dict.availability}</p>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Viewport>
    </Dialog.Portal>
  );
}

export function ProductGrid({ products, dict }: { products: Product[]; dict: Record<string, string> }) {
  const published = products.filter((product) => product.published);
  const categories = [dict.all, ...Array.from(new Set(published.map((product) => product.category)))];
  const [category, setCategory] = useState(dict.all);
  const [favorites, setFavorites] = useState<string[]>([]);
  const visible = useMemo(() => category === dict.all ? published : published.filter((product) => product.category === category), [category, published, dict.all]);

  return (
    <section id="shop" className="bg-[#fbf9f7] px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow">{dict.arrivals}</p>
            <h2 className="section-title mt-3 max-w-4xl">{dict.title_1}<br />{dict.title_2}</h2>
          </div>
          <div className="flex max-w-full gap-2 overflow-x-auto pb-2 lg:justify-end">
            {categories.map((item) => (
              <button key={item} onClick={() => setCategory(item)} className={cn("shrink-0 rounded-full border px-5 py-2.5 text-xs font-semibold transition", category === item ? "border-black bg-black text-white" : "border-black/12 bg-white hover:border-black/40")}>{item}</button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((product, index) => (
            <Dialog.Root key={product.id}>
              <article className={cn("group", index % 5 === 1 && "lg:translate-y-10") }>
                <div className="relative aspect-[3/4.2] overflow-hidden rounded-[1.7rem] bg-[#eee8e4]">
                  <Dialog.Trigger className="absolute inset-0 z-10 cursor-zoom-in" aria-label={`View ${product.name}`} />
                  <Image src={product.image} alt={product.name} fill className="object-cover transition duration-700 group-hover:scale-[1.035]" sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" />
                  {product.hoverImage && <Image src={product.hoverImage} alt="" fill className="object-cover opacity-0 transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100" sizes="25vw" />}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                  {product.label && <span className="absolute left-4 top-4 z-20 rounded-full bg-white/88 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] backdrop-blur">{product.label}</span>}
                  <button type="button" onClick={(event) => { event.stopPropagation(); setFavorites((items) => items.includes(product.id) ? items.filter((id) => id !== product.id) : [...items, product.id]); }} className="absolute right-4 top-4 z-20 grid size-10 place-items-center rounded-full bg-white/88 backdrop-blur transition hover:scale-105" aria-label="Add to favorites"><Heart className={cn("size-4", favorites.includes(product.id) && "fill-black")} /></button>
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex translate-y-4 items-center justify-between rounded-full bg-white/92 px-5 py-3 text-sm font-semibold opacity-0 backdrop-blur transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">{dict.quick_view} <ArrowUpRight className="size-4" /></div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div><p className="font-serif text-2xl leading-none">{product.name}</p><p className="mt-2 text-xs uppercase tracking-[.14em] text-black/45">{product.category}</p></div>
                  <p className="text-sm font-semibold">{formatPrice(product.price, product.currency)}</p>
                </div>
              </article>
              <ProductQuickView product={product} dict={dict} />
            </Dialog.Root>
          ))}
        </div>
      </div>
    </section>
  );
}
