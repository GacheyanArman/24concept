"use client";

import { usePathname, useRouter } from "next/navigation";

const locales = ["en", "ru", "hy"];

export function LanguageSwitcher({ currentLang, invert = false }: { currentLang: string, invert?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLang = (newLocale: string) => {
    const newPath = pathname.replace(`/${currentLang}`, `/${newLocale}`);
    router.push(newPath, { scroll: false });
  };

  return (
    <div className="flex gap-2 text-xs font-semibold uppercase">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLang(locale)}
          className={`transition ${currentLang === locale ? (invert ? "text-white" : "text-black") : (invert ? "text-white/40 hover:text-white" : "text-black/30 hover:text-black/60")}`}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
