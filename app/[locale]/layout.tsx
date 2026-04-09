import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CartProvider from "@/components/layout/CartProvider";
import "../globals.css";

export const metadata: Metadata = {
  title: "Regeneration Studio",
  description: "外套布料重生，成為一頂五分割帽 | Jacket fabric reborn as a five-panel cap",
  openGraph: {
    title: "Regeneration Studio",
    description: "外套布料重生，成為一頂五分割帽",
    siteName: "Regeneration Studio",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "zh-TW" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <Nav />
          <CartProvider locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
