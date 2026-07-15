import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin-dashboard";
import { isAdminAuthenticated } from "@/lib/auth";
import { readProducts } from "@/lib/products";
import { getDictionary } from "@/lib/dictionary";

export const dynamic = "force-dynamic";

export default async function AdminPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const validLocale = (["en", "ru", "hy"].includes(lang) ? lang : "en") as "en" | "ru" | "hy";
  if (!(await isAdminAuthenticated())) redirect(`/${validLocale}/admin/login`);
  const products = await readProducts();
  const dict = await getDictionary(validLocale);
  return <AdminDashboard initialProducts={products} dict={dict.admin as any} currentLang={validLocale} />;
}
