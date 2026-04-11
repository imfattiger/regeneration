import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { lookbookEntryQuery, lookbookLineQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

// 四條支線的 slug → 顯示資料
const LINE_META: Record<string, { char: string; tagline: { zhTW: string; en: string } }> = {
  lann:  { char: "瀾", tagline: { zhTW: "我們選，我們做。每頂不一樣，有就有，沒有就沒有。", en: "We choose, we make. Every piece different." } },
  ember: { char: "然", tagline: { zhTW: "你有一件捨不得的，拿來。我幫它變成帽子。", en: "You have something you can't let go of. Bring it." } },
  terra: { char: "苒", tagline: { zhTW: "固定的款，一直有，隨時買。", en: "Fixed designs. Always here. Buy when you're ready." } },
  aura:  { char: "嵐", tagline: { zhTW: "高級玩物，收藏品。", en: "Fine objects. Things worth keeping." } },
};

type Product = {
  _id: string;
  name: { zhTW: string; en: string };
  slug: { current: string };
  price: number;
  salePrice?: number;
  status: string;
  coverImage?: { asset: { _ref: string } };
};

type LookbookEntry = {
  _id: string;
  title: { zhTW: string; en: string };
  slug: { current: string };
  materialStory?: { zhTW: string; en: string };
  images?: Array<{ asset: { _ref: string } }>;
  relatedProduct?: {
    _id: string;
    name: { zhTW: string; en: string };
    slug: { current: string };
    price: number;
    status: string;
    coverImage?: { asset: { _ref: string } };
  };
};

export default async function LookbookSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "zhTW";

  // 如果是四條支線的 slug，顯示線條商品頁
  const lineMeta = LINE_META[slug];
  if (lineMeta) {
    const products: Product[] = await client
      .fetch(lookbookLineQuery, { line: slug })
      .catch(() => []);

    return (
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 border-b border-foreground/10 pb-10">
            <Link
              href="/lookbook"
              className="text-[10px] tracking-widest uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-6 inline-block"
            >
              ← 作品集
            </Link>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
              {lineMeta.char}
            </h1>
            <p className="text-sm text-foreground/50 max-w-md leading-relaxed">
              {lineMeta.tagline[lang]}
            </p>
          </div>

          {products.length === 0 ? (
            <p className="text-sm text-foreground/30 tracking-widest uppercase">
              {lang === "zhTW" ? "尚無商品" : "No items yet"}
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link key={product._id} href={`/shop/${product.slug.current}`} className="group">
                  <div className="aspect-square relative overflow-hidden bg-foreground/5 mb-3">
                    {product.coverImage ? (
                      <Image
                        src={urlFor(product.coverImage).width(600).height(600).url()}
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
                          ? <span className="flex items-center gap-1.5">
                              <span className="line-through opacity-50">NT$ {product.price?.toLocaleString()}</span>
                              <span>NT$ {product.salePrice.toLocaleString()}</span>
                            </span>
                          : `NT$ ${product.price?.toLocaleString()}`}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 否則顯示 lookbook 單篇
  const entry: LookbookEntry | null = await client
    .fetch(lookbookEntryQuery, { slug })
    .catch(() => null);

  if (!entry) notFound();

  const images = entry.images ?? [];

  return (
    <div className="pt-24">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <Link
          href="/lookbook"
          className="text-xs tracking-widest uppercase text-muted hover:text-foreground transition-colors mb-12 block"
        >
          ← {locale === "en" ? "Lookbook" : "作品集"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col gap-4">
            {images.length > 0 ? (
              images.map((img, i) => (
                <div key={i} className="aspect-square relative overflow-hidden bg-foreground/5">
                  <Image
                    src={urlFor(img).width(1200).height(1200).url()}
                    alt={`${entry.title[lang]} ${i + 1}`}
                    fill
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))
            ) : (
              <div className="aspect-square bg-foreground/5 flex items-center justify-center">
                <span className="text-xs tracking-widest uppercase text-foreground/20">No Image</span>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <h1 className="text-2xl md:text-3xl font-bold mb-8">{entry.title[lang]}</h1>
            {entry.materialStory && (
              <div className="mb-12">
                <p className="text-xs tracking-widest uppercase text-muted mb-4">
                  {locale === "en" ? "Material Story" : "布料故事"}
                </p>
                <p className="text-sm leading-relaxed text-foreground/70 whitespace-pre-line">
                  {entry.materialStory[lang]}
                </p>
              </div>
            )}
            {entry.relatedProduct && (
              <div className="border-t border-foreground/10 pt-8">
                <p className="text-xs tracking-widest uppercase text-muted mb-4">
                  {locale === "en" ? "Available In Shop" : "前往購買"}
                </p>
                <Link
                  href={`/shop/${entry.relatedProduct.slug.current}`}
                  className="group flex items-center gap-4 hover:opacity-70 transition-opacity"
                >
                  {entry.relatedProduct.coverImage && (
                    <div className="w-16 h-16 relative overflow-hidden bg-foreground/5 flex-shrink-0">
                      <Image
                        src={urlFor(entry.relatedProduct.coverImage).width(128).height(128).url()}
                        alt={entry.relatedProduct.name[lang]}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold">{entry.relatedProduct.name[lang]}</p>
                    <p className="text-sm text-foreground/50">
                      {entry.relatedProduct.status === "sold_out"
                        ? locale === "en" ? "Sold Out" : "已售完"
                        : `NT$ ${entry.relatedProduct.price?.toLocaleString()}`}
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
