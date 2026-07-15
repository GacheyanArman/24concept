import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "The 24 Concept Admin",
};

export default async function AdminLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  return <html lang={lang}><body>{children}</body></html>;
}
