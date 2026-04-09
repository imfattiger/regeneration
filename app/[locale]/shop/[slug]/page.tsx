import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { productDetailQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import AddToCartButton from "@/components/shop/AddToCartButton";
import DescriptionTabs from "@/components/shop/DescriptionTabs";
import { MOCK_PRODUCTS } from "../page";

type ProductDetail = {
  _id: string;
  name: { zhTW: string; en: string };
  slug: { current: string };
  description?: { zhTW: string; en: string };
  material?: { zhTW: string; en: string };
  price: number;
  salePrice?: number;
  images?: Array<{ asset: { _ref: string } }>;
  inventory: number;
  status: string;
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "zhTW";
  const fallbackLang = lang === "en" ? "zhTW" : "en";

  let product: ProductDetail | null = await client
    .fetch(productDetailQuery, { slug })
    .catch(() => null);

  // Fall back to mock products if Sanity isn't connected yet
  if (!product) {
    const mock = MOCK_PRODUCTS.find((p) => p.slug.current === slug);
    if (mock) {
      product = { ...mock, inventory: 10, images: [] };
    }
  }

  if (!product) notFound();

  const images = product.images ?? [];
  const available = product.status === "available" && (product.inventory ?? 1) > 0;

  return (
    <div className="pt-24">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <Link
          href="/shop"
          className="text-xs tracking-widest uppercase text-muted hover:text-foreground transition-colors mb-12 block"
        >
          ← {locale === "en" ? "Shop" : "商店"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images */}
          <div className="flex flex-col gap-4">
            {images.length > 0 ? (
              images.map((img, i) => (
                <div key={i} className="aspect-square relative overflow-hidden bg-foreground/5">
                  <Image
                    src={urlFor(img).width(1200).height(1200).url()}
                    alt={`${product.name[lang]} ${i + 1}`}
                    fill
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))
            ) : (
              <div className="aspect-square bg-foreground/5" />
            )}
          </div>

          {/* Info */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {product.name[lang]}
            </h1>

            <div className="mb-8">
              {product.status === "sold_out" ? (
                <p className="text-lg text-foreground/40">{locale === "en" ? "Sold Out" : "已售完"}</p>
              ) : product.status === "coming_soon" ? (
                <p className="text-lg text-foreground/40">{locale === "en" ? "Coming Soon" : "即將上市"}</p>
              ) : product.salePrice ? (
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-2xl font-bold">NT$ {product.salePrice.toLocaleString()}</span>
                  <span className="text-lg text-foreground/30 line-through">NT$ {product.price?.toLocaleString()}</span>
                  <span className="text-xs bg-foreground text-background px-2 py-1 tracking-widest">
                    {Math.round((1 - product.salePrice / product.price) * 10) * 10}% OFF
                  </span>
                </div>
              ) : (
                <p className="text-lg">NT$ {product.price?.toLocaleString()}</p>
              )}
            </div>

            {product.material && (product.material[lang] || product.material[fallbackLang]) && (
              <div className="mb-6">
                <p className="text-xs tracking-widest uppercase text-muted mb-1">
                  {locale === "en" ? "Material" : "材質"}
                </p>
                <p className="text-sm">{product.material[lang] || product.material[fallbackLang]}</p>
              </div>
            )}

            {product.description && (
              <DescriptionTabs
                zhTW={product.description.zhTW}
                en={product.description.en}
                defaultLang={lang}
              />
            )}

            <AddToCartButton
              product={{
                id: product._id,
                name: product.name[lang],
                price: product.salePrice ?? product.price,
                image: images[0] ? urlFor(images[0]).width(200).height(200).url() : undefined,
              }}
              available={available}
              locale={locale}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
