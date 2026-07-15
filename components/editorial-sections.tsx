"use client";

import Image from "next/image";
import { ArrowUpRight, Instagram, MapPin, Phone, Clock3, ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";

export function Collections({ dict }: { dict: Record<string, string> }) {
  return (
    <section id="collections" className="bg-[#181817] px-5 py-24 text-white md:px-10 md:py-32">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div><p className="eyebrow !text-white/45">{dict.curated_worlds}</p><h2 className="section-title mt-3 max-w-4xl">{dict.store_title_1}<br /><span className="italic text-[#e3c6c6]">{dict.store_title_2}</span></h2></div>
          <p className="max-w-sm text-sm leading-6 text-white/50">{dict.store_desc}</p>
        </div>
        <div className="mt-14 grid auto-rows-[260px] gap-4 md:grid-cols-12 md:auto-rows-[340px]">
          <a href="#shop" className="group relative overflow-hidden rounded-[2rem] md:col-span-7 md:row-span-2"><Image src="/images/instagram/black-corset-evening.webp" alt="Black corset evening collection" fill className="object-cover transition duration-1000 group-hover:scale-105" sizes="60vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" /><div className="absolute bottom-7 left-7 right-7 flex items-end justify-between"><div><p className="text-[10px] uppercase tracking-[.24em] text-white/55">01</p><h3 className="mt-2 font-serif text-5xl">{dict.after_dark}</h3></div><span className="grid size-12 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur"><ArrowUpRight className="size-4" /></span></div></a>
          <a href="#shop" className="group relative overflow-hidden rounded-[2rem] md:col-span-5"><Image src="/images/instagram/yellow-floral-resort.webp" alt="Yellow floral summer collection" fill className="object-cover transition duration-1000 group-hover:scale-105" sizes="40vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /><h3 className="absolute bottom-6 left-6 font-serif text-4xl">{dict.summer_escape}</h3></a>
          <a href="#shop" className="group relative overflow-hidden rounded-[2rem] bg-[#e8d8d3] md:col-span-5"><Image src="/images/instagram/raffia-bags-flatlay.webp" alt="Raffia accessories collection" fill className="object-cover transition duration-1000 group-hover:scale-105" sizes="40vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" /><div className="absolute bottom-6 left-6"><p className="text-[10px] uppercase tracking-[.24em] text-white/65">{dict.small_details}</p><h3 className="mt-2 font-serif text-4xl">{dict.accessories}</h3></div></a>
        </div>
      </div>
    </section>
  );
}

const images = [
  "/images/instagram/yellow-floral-steps.webp",
  "/images/instagram/yellow-floral-cactus.webp",
  "/images/instagram/yellow-floral-corridor.webp",
  "/images/instagram/yellow-floral-resort.webp",
  "/images/instagram/cream-floral-cactus-01.webp",
  "/images/instagram/cream-floral-hat.webp",
  "/images/instagram/cream-floral-cactus-02.webp",
  "/images/instagram/summer-accessories-flatlay.webp",
  "/images/instagram/white-floral-close.webp",
  "/images/instagram/white-floral-full.webp",
  "/images/instagram/white-floral-flower.webp",
  "/images/instagram/polka-dot-back.webp",
  "/images/instagram/polka-dot-front.webp",
  "/images/instagram/linen-halter-front.webp",
  "/images/instagram/linen-halter-back.webp",
  "/images/instagram/raffia-hat.webp",
  "/images/instagram/yellow-floral-steps-02.webp",
  "/images/instagram/yellow-floral-resort-02.webp",
  "/images/instagram/raffia-visor-pool.webp",
  "/images/instagram/cream-floral-studio-01.webp",
  "/images/instagram/cream-floral-studio-02.webp",
  "/images/instagram/cream-floral-studio-03.webp",
  "/images/instagram/white-column-dress.webp",
  "/images/instagram/city-vest-shorts-01.webp",
  "/images/instagram/city-vest-shorts-02.webp",
  "/images/instagram/city-vest-shorts-03.webp",
  "/images/instagram/beach-hat-look.webp",
  "/images/instagram/black-night-seated.webp",
  "/images/instagram/black-mini-evening.webp",
  "/images/instagram/raffia-visor-product.webp",
  "/images/instagram/black-top-denim.webp",
  "/images/instagram/ivory-wrap-dress.webp",
  "/images/instagram/raffia-bags-flatlay.webp",
  "/images/instagram/brand-shopping-bag.webp",
  "/images/instagram/black-corset-evening.webp",
  "/images/instagram/white-tailored-trousers.webp",
];

export function Lookbook({ dict }: { dict: Record<string, string> }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -current.offsetWidth / 2 : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="lookbook" className="overflow-hidden bg-[#ead6d6] py-24 md:py-32">
      <div className="px-5 md:px-10"><div className="mx-auto max-w-[1500px]"><p className="eyebrow">The 24 Concept</p><div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end"><h2 className="section-title">{dict.seen}</h2><div className="flex items-center gap-6"><a href="https://www.instagram.com/the24concept_/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-black/25 underline-offset-8"><Instagram className="size-4" /> {dict.follow}</a><div className="hidden gap-2 md:flex"><button onClick={() => scroll("left")} className="grid size-10 place-items-center rounded-full border border-black/10 bg-white shadow-sm transition hover:scale-105 hover:bg-black hover:text-white"><ArrowLeft className="size-4" /></button><button onClick={() => scroll("right")} className="grid size-10 place-items-center rounded-full border border-black/10 bg-white shadow-sm transition hover:scale-105 hover:bg-black hover:text-white"><ArrowRight className="size-4" /></button></div></div></div></div></div>
      <div ref={scrollRef} className="mt-12 flex snap-x gap-4 overflow-x-auto px-5 pb-4 md:px-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {images.map((src, index) => <div key={src} className="relative aspect-[3/4] w-[76vw] max-w-[420px] shrink-0 snap-center overflow-hidden rounded-[2rem] bg-white/35 md:w-[31vw]"><Image src={src} alt={`The 24 Concept look ${index + 1}`} fill className="object-cover transition duration-700 hover:scale-105" sizes="(max-width: 768px) 76vw, 31vw" /><span className="absolute left-5 top-5 grid size-10 place-items-center rounded-full bg-white/82 font-serif text-lg backdrop-blur">{String(index + 1).padStart(2, "0")}</span></div>)}
      </div>
    </section>
  );
}

export function Story({ dict }: { dict: Record<string, string> }) {
  return (
    <section id="concept" className="bg-[#f7f2ef] px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="relative min-h-[600px] overflow-hidden rounded-[50%_50%_2rem_2rem]"><Image src="/images/instagram/brand-shopping-bag.webp" alt="The 24 Concept branded shopping experience" fill className="object-cover" sizes="50vw" /></div>
        <div className="lg:pl-12"><p className="eyebrow">{dict.concept_eyebrow}</p><h2 className="section-title mt-3">{dict.concept_title_1}<br /><span className="italic text-[#a96f70]">{dict.concept_title_2}</span></h2><p className="mt-8 max-w-xl text-lg leading-8 text-black/58">{dict.concept_desc}</p><div className="mt-10 grid grid-cols-3 gap-3 border-t border-black/10 pt-7"><div><p className="font-serif text-4xl">{dict.concept_24}</p><p className="mt-1 text-[10px] uppercase tracking-[.18em] text-black/45">{dict.concept_24_label}</p></div><div><p className="font-serif text-4xl">{dict.concept_11}</p><p className="mt-1 text-[10px] uppercase tracking-[.18em] text-black/45">{dict.concept_11_label}</p></div><div><p className="font-serif text-4xl">{dict.concept_77}</p><p className="mt-1 text-[10px] uppercase tracking-[.18em] text-black/45">{dict.concept_77_label}</p></div></div></div>
      </div>
    </section>
  );
}

export function StoreSection({ dict }: { dict: Record<string, string> }) {
  return (
    <section id="store" className="bg-[#fbf9f7] px-5 pb-24 md:px-10 md:pb-32">
      <div className="mx-auto max-w-[1500px] overflow-hidden rounded-[2.5rem] bg-black text-white">
        <div className="grid lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative min-h-[500px]"><Image src="/images/instagram/city-vest-shorts-02.webp" alt="The 24 Concept look on Northern Avenue in Yerevan" fill className="object-cover" sizes="60vw" /><div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/30" /><span className="absolute left-7 top-7 rounded-full border border-white/25 bg-black/15 px-4 py-2 text-[10px] uppercase tracking-[.22em] backdrop-blur">{dict.location_badge}</span></div>
          <div className="flex flex-col justify-center p-8 md:p-14 lg:p-16"><p className="eyebrow !text-white/45">{dict.visit_eyebrow}</p><h2 className="mt-4 font-serif text-6xl leading-[.88] md:text-7xl">{dict.visit_title_1}<br />{dict.visit_title_2}<br /><span className="italic text-[#e3c6c6]">{dict.visit_title_3}</span></h2><div className="mt-10 space-y-5 text-sm text-white/65"><p className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-white" /> {dict.address_title}<br />{dict.address_city}</p><p className="flex items-center gap-3"><Clock3 className="size-4 text-white" /> {dict.hours_label}</p><p className="flex items-center gap-3"><Phone className="size-4 text-white" /> {dict.phone}</p></div><div className="mt-10 flex flex-wrap gap-3"><a href="https://www.google.com/maps/search/?api=1&query=Northern+Avenue+5+Yerevan" target="_blank" rel="noreferrer" className="inline-flex h-12 items-center rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-[#e3c6c6]">{dict.maps_btn}</a><a href="tel:055310331" className="inline-flex h-12 items-center rounded-full border border-white/25 px-6 text-sm font-semibold transition hover:bg-white hover:text-black">{dict.call_btn}</a></div></div>
        </div>
      </div>
    </section>
  );
}
