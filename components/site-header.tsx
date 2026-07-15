"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Instagram, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

import { LanguageSwitcher } from "./language-switcher";

export function SiteHeader({ dict, currentLang }: { dict: Record<string, string>; currentLang: string }) {
  const navLinks = [
    [dict.shop, "#shop"],
    [dict.collections, "#collections"],
    [dict.diary, "#lookbook"],
    [dict.store, "#store"],
  ] as const;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "border-b border-black/5 bg-[#f7f2ef]/88 shadow-[0_8px_35px_rgba(0,0,0,.04)] backdrop-blur-xl" : "bg-transparent")}>
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 md:px-10">
        <Link href="#top" aria-label="The 24 Concept home"><Logo /></Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map(([label, href]) => (
            <Link key={href} href={href} className="text-xs font-semibold uppercase tracking-[0.18em] text-black/70 transition hover:text-black">{label}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher currentLang={currentLang} />
          <a className="grid size-10 place-items-center rounded-full transition hover:bg-black/5" href="https://www.instagram.com/the24concept_/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram className="size-4" /></a>
          <a className="inline-flex h-10 items-center gap-2 rounded-full border border-black/15 px-4 text-xs font-semibold uppercase tracking-[0.13em] transition hover:bg-black hover:text-white" href="tel:055310331"><Phone className="size-3.5" /> Call</a>
        </div>
        <button onClick={() => setMenuOpen((v) => !v)} className="grid size-11 place-items-center rounded-full border border-black/10 bg-white/50 lg:hidden" aria-label="Toggle menu">
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      <div className={cn("overflow-hidden border-t border-black/5 bg-[#f7f2ef] transition-all duration-500 lg:hidden", menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
        <nav className="grid gap-1 px-5 py-5">
          {navLinks.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-2xl px-4 py-3 font-serif text-2xl hover:bg-black/5">{label}</Link>
          ))}
          <a href="https://www.instagram.com/the24concept_/" target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-2 rounded-2xl bg-black px-4 py-3 text-sm text-white"><Instagram className="size-4" /> Instagram</a>
          <div className="mt-4 px-4"><LanguageSwitcher currentLang={currentLang} /></div>
        </nav>
      </div>
    </header>
  );
}
