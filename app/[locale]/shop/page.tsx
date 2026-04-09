import { Suspense } from "react";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { productListQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import CheckoutSuccess from "@/components/shop/CheckoutSuccess";

type Product = {
  _id: string;
  name: { zhTW: string; en: string };
  slug: { current: string };
  price: number;
  salePrice?: number;
  status: string;
  coverImage?: { asset: { _ref: string } };
};

export default async function ShopPage() {
  const t = await getTranslations("shop");
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "zhTW";

  let products: Product[] = [];
  try {
    products = await client.fetch(productListQuery);
    console.log("Sanity products fetched:", products.length);
  } catch (err) {
    console.error("Sanity fetch error:", err);
  }

  return (
    <div className="pt-24">
      <Suspense>
        <CheckoutSuccess locale={locale} />
      </Suspense>
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-xs tracking-widest uppercase text-muted mb-16">
          {t("title")}
        </h1>

        {products.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.map((product) => (
              <Link key={product._id} href={`/shop/${product.slug.current}`} className="group">
                <div className="aspect-square bg-foreground/5 mb-3 flex items-center justify-center">
                  <span className="text-xs tracking-widest uppercase text-foreground/20">
                    {product.name[lang]}
                  </span>
                </div>
                <p className="text-xs font-bold tracking-wide group-hover:opacity-60 transition-opacity">
                  {product.name[lang]}
                </p>
                <p className="text-xs text-foreground/40 mt-0.5">
                  NT$ {product.price.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/shop/${product.slug.current}`}
                className="group"
              >
                <div className="aspect-square relative overflow-hidden bg-foreground/5 mb-3">
                  {product.coverImage ? (
                    <Image
                      src={urlFor(product.coverImage).width(600).height(600).url()}
                      alt={product.name[lang]}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : null}
                  {product.status === "sold_out" && (
                    <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                      <span className="text-xs tracking-widest uppercase">{t("sold_out")}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs font-bold tracking-wide truncate group-hover:opacity-60 transition-opacity">
                  {product.name[lang]}
                </p>
                <div className="mt-0.5">
                  {product.status === "sold_out" ? (
                    <span className="text-xs text-foreground/40">{t("sold_out")}</span>
                  ) : product.status === "coming_soon" ? (
                    <span className="text-xs text-foreground/40">{t("coming_soon")}</span>
                  ) : product.salePrice ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">NT$ {product.salePrice.toLocaleString()}</span>
                      <span className="text-xs text-foreground/30 line-through">NT$ {product.price?.toLocaleString()}</span>
                      <span className="text-[10px] bg-foreground text-background px-1 py-0.5">
                        {Math.round((1 - product.salePrice / product.price) * 10) * 10}% OFF
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-foreground/40">NT$ {product.price?.toLocaleString()}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// Mock products for testing before Sanity is connected
export const MOCK_PRODUCTS: Product[] = [
  {
    _id: "mock-001",
    name: { zhTW: "軍裝橄欖 #001", en: "Olive Military #001" },
    slug: { current: "olive-military-001" },
    price: 2800,
    status: "available",
  },
  {
    _id: "mock-002",
    name: { zhTW: "黑色防潑水 #002", en: "Black DWR #002" },
    slug: { current: "black-dwr-002" },
    price: 3200,
    status: "available",
  },
  {
    _id: "mock-003",
    name: { zhTW: "古著格紋 #003", en: "Vintage Plaid #003" },
    slug: { current: "vintage-plaid-003" },
    price: 3500,
    status: "sold_out",
  },
];
