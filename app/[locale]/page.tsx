import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { featuredProductsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ElementsBackground from "@/components/home/ElementsBackground";
import LinesGrid from "@/components/home/LinesGrid";

type Product = {
  _id: string;
  name: { zhTW: string; en: string };
  slug: { current: string };
  price: number;
  salePrice?: number;
  status: string;
  coverImage?: { asset: { _ref: string } };
};

export default async function HomePage() {
  const t = await getTranslations("home");
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "zhTW";

  const featured: Product[] = await client
    .fetch(featuredProductsQuery)
    .catch(() => []);

  return (
    <div className="relative">
      <ElementsBackground />

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="text-xs tracking-widest uppercase text-muted mb-6">
          Regeneration Studio
        </p>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-none">
          {locale === "en" ? (
            <>
              Jacket fabric
              <br />
              reborn as
              <br />a five-panel cap.
            </>
          ) : (
            <>
              外套布料
              <br />
              重生成
              <br />
              一頂帽子。
            </>
          )}
        </h1>
        <div className="flex items-center gap-6 mt-4">
          <Link
            href="/shop"
            className="text-xs tracking-widest uppercase border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
          >
            {locale === "en" ? "Shop Now" : "立即選購"}
          </Link>
          <Link
            href="/about"
            className="text-xs tracking-widest uppercase text-foreground/50 hover:text-foreground transition-colors"
          >
            {locale === "en" ? "About" : "關於"} →
          </Link>
        </div>
      </section>

      {/* 四線格子 */}
      <section className="relative z-10 border-t border-foreground/10">
        <LinesGrid />
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="relative z-10 border-t border-foreground/10 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs tracking-widest uppercase text-muted mb-12">
              {t("featured_title")}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featured.map((product) => (
                <Link
                  key={product._id}
                  href={`/shop/${product.slug.current}`}
                  className="group"
                >
                  <div className="aspect-square relative overflow-hidden bg-foreground/5 mb-3">
                    {product.coverImage ? (
                      <Image
                        src={urlFor(product.coverImage)
                          .width(600)
                          .height(600)
                          .url()}
                        alt={product.name[lang]}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs text-foreground/20 tracking-widest uppercase">
                          {product.name[lang]}
                        </span>
                      </div>
                    )}
                    {product.status === "sold_out" && (
                      <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                        <span className="text-xs tracking-widest uppercase">
                          {lang === "en" ? "Sold Out" : "已售完"}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-bold tracking-wide truncate group-hover:opacity-60 transition-opacity">
                    {product.name[lang]}
                  </p>
                  <p className="text-xs text-foreground/40 mt-0.5">
                    {product.status === "sold_out"
                      ? lang === "en" ? "Sold Out" : "已售完"
                      : product.status === "coming_soon"
                        ? lang === "en" ? "Coming Soon" : "即將上市"
                        : product.salePrice
                          ? `NT$ ${product.salePrice.toLocaleString()}`
                          : `NT$ ${product.price?.toLocaleString()}`}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/shop"
                className="text-xs tracking-widest uppercase text-foreground/40 hover:text-foreground transition-colors"
              >
                {locale === "en" ? "View All" : "查看全部"} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Instagram CTA */}
      <section className="relative z-10 border-t border-foreground/10 py-20 px-6 text-center">
        <p className="text-xs tracking-widest uppercase text-muted mb-4">
          {t("instagram_title")}
        </p>
        <a
          href="https://www.instagram.com/regeneration.studio_/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl md:text-4xl font-bold tracking-tight hover:opacity-60 transition-opacity"
        >
          @regeneration.studio_
        </a>
      </section>
    </div>
  );
}
