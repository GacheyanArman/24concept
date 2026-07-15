"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { useRef } from "react";

export function Hero({ dict }: { dict: Record<string, string> }) {
  const ref = useRef<HTMLElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds || !ref.current) return;
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    ref.current.style.setProperty("--spot-x", `${x}%`);
    ref.current.style.setProperty("--spot-y", `${y}%`);
  }

  return (
    <section ref={ref} onPointerMove={handlePointerMove} id="top" className="hero-spotlight relative min-h-[930px] overflow-hidden bg-[#f7f2ef] pt-20 lg:min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--spot-x,50%)_var(--spot-y,30%),rgba(255,255,255,.9),transparent_33%)] opacity-70 transition-opacity" />
      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1600px] grid-cols-1 gap-8 px-5 pb-10 pt-8 md:px-10 lg:grid-cols-[.95fr_1.15fr_.7fr] lg:items-center lg:gap-6 lg:pt-4">
        <div className="order-2 z-10 lg:order-1 lg:pr-4">

          <h1 className="max-w-[850px] font-serif text-[clamp(4rem,9.2vw,9.8rem)] leading-[.79] tracking-[-.065em] text-neutral-950">
            {dict.title_1}<br /><span className="italic text-[#a96f70]">{dict.title_2}</span>
          </h1>
          <p className="mt-7 max-w-md text-base leading-7 text-black/58 md:text-lg">
            {dict.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#shop" className="group inline-flex h-13 items-center gap-3 rounded-full bg-black px-7 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-[#a96f70]">
              {dict.shop_btn} <ArrowDownRight className="size-4 transition group-hover:translate-x-1 group-hover:translate-y-1" />
            </Link>
            <a href="https://www.instagram.com/the24concept_/" target="_blank" rel="noreferrer" className="inline-flex h-13 items-center rounded-full border border-black/15 bg-white/50 px-7 text-sm font-semibold backdrop-blur transition hover:bg-white">{dict.ig_btn}</a>
          </div>
        </div>

        <div className="order-1 relative mx-auto h-[58vh] min-h-[460px] w-full max-w-[650px] overflow-hidden rounded-[2.4rem] lg:order-2 lg:h-[76vh] lg:min-h-[650px]">
          <Image src="/images/instagram/white-floral-close.webp" alt="The 24 Concept white floral dress" fill priority className="object-cover object-top transition duration-[1600ms] hover:scale-105" sizes="(max-width: 1024px) 90vw, 42vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/5" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
            <div><p className="text-[10px] uppercase tracking-[.24em] text-white/65">{dict.summer_edit}</p><p className="mt-1 font-serif text-3xl">{dict.summer_title}</p></div>
            <a href="#shop" className="grid size-11 place-items-center rounded-full border border-white/35 bg-white/10 backdrop-blur transition hover:bg-white hover:text-black"><ArrowDownRight className="size-4" /></a>
          </div>
        </div>

        <div className="relative hidden h-[60vh] min-h-[520px] overflow-hidden rounded-[999px_999px_2rem_2rem] lg:block">
          <Image src="/images/instagram/yellow-floral-steps.webp" alt="The 24 Concept yellow floral summer dress" fill priority className="object-cover object-top" sizes="22vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
          <div className="absolute bottom-7 left-0 right-0 text-center text-white">
            <p className="text-[9px] uppercase tracking-[.28em] text-white/60">{dict.open_daily}</p>
            <p className="mt-1 font-serif text-2xl">{dict.hours}</p>
          </div>
        </div>
      </div>
      <div className="relative border-y border-black/10 bg-[#ead6d6] py-3 text-xs font-semibold uppercase tracking-[.26em] text-black/75">
        <div className="marquee-track flex min-w-max gap-10 whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => <span key={i}>{dict.marquee}</span>)}
        </div>
      </div>
    </section>
  );
}
