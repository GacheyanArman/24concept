import Link from "next/link";
import { Instagram } from "lucide-react";
import { Logo } from "@/components/logo";

export function Footer({ dict }: { dict: Record<string, string> }) {
  return (
    <footer className="bg-[#181817] px-5 py-12 text-white md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-10 md:flex-row md:items-center"><Logo inverted /><p className="max-w-lg font-serif text-3xl leading-tight text-white/85 md:text-4xl">{dict.tagline}</p></div>
        <div className="flex flex-col justify-between gap-5 pt-7 text-xs text-white/42 md:flex-row md:items-center"><p>© {new Date().getFullYear()} {dict.copyright}</p><div className="flex items-center gap-6"><Link href="#shop">{dict.shop_edit}</Link><a href="https://www.instagram.com/the24concept_/" target="_blank" rel="noreferrer" className="flex items-center gap-2"><Instagram className="size-3.5" /> {dict.instagram}</a></div></div>
      </div>
    </footer>
  );
}
