import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "The 24 Concept",
  description: "Curated dresses, corsets, suits and accessories at The 24 Concept on Northern Avenue, Yerevan.",
  openGraph: { title: "The 24 Concept", description: "Curated fashion. Distinct silhouettes. Yerevan.", type: "website" },
};

export default async function RootLayout({ 
  children,
  params
}: Readonly<{ 
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return <html lang={lang}><body>{children}</body></html>;
}
