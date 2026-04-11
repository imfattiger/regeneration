"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useCart } from "@/lib/cart";

export default function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { openCart, itemCount } = useCart();
  const [count, setCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setCount(itemCount());
  });

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/lookbook", label: t("lookbook") },
    { href: "/shop", label: t("shop") },
    { href: "/contact", label: t("contact") },
  ];

  function toggleLocale() {
    const nextLocale = locale === "zh-TW" ? "en" : "zh-TW";
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-sm border-b border-foreground/10">
        <Link href="/" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpg" alt="" width={36} height={36} className="rounded-full" />
          <span className="text-sm font-bold tracking-widest uppercase">Regeneration Studio</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLocale}
            className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity border border-foreground/20 px-3 py-1"
          >
            {locale === "zh-TW" ? "EN" : "中文"}
          </button>

          <button
            onClick={openCart}
            className="relative text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
            aria-label={locale === "zh-TW" ? "購物車" : "Cart"}
          >
            {locale === "zh-TW" ? "購物車" : "Cart"}
            {count > 0 && (
              <span className="absolute -top-1.5 -right-3 w-4 h-4 bg-foreground text-background text-[10px] rounded-full flex items-center justify-center font-bold">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center gap-1.5 w-6 h-6"
            aria-label="選單"
          >
            <span
              className={`block h-px bg-foreground transition-transform duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block h-px bg-foreground transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px bg-foreground transition-transform duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-10 md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xl tracking-widest uppercase hover:opacity-60 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
