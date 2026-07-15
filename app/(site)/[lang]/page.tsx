import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { ProductGrid } from "@/components/product-grid";
import { Collections, Lookbook, Story, StoreSection } from "@/components/editorial-sections";
import { Footer } from "@/components/footer";
import { readProducts } from "@/lib/products";
import { ScrollTitle } from "@/components/scroll-title";

import { getDictionary } from "@/lib/dictionary";

export const dynamic = "force-dynamic";

export default async function HomePage({ params }: { params: Promise<{ lang: 'en' | 'ru' | 'hy' }> }) {
  const { lang } = await params;
  const products = await readProducts();
  const dict = await getDictionary(lang);
  
  return (
    <>
      <ScrollTitle dict={dict.scroll_title} />
      <SiteHeader dict={dict.header} currentLang={lang} />
      <main>
        <Hero dict={dict.hero} />
        <ProductGrid products={products} dict={dict.grid} />
        <Collections dict={dict.editorial} />
        <Lookbook dict={dict.editorial} />
        <Story dict={dict.editorial} />
        <StoreSection dict={dict.editorial} />
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
