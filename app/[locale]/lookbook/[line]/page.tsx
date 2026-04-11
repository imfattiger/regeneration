import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { lookbookLineQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

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

export default async function LookbookLinePage({
  params,
}: {
  params: Promise<{ line: string; locale: string }>;
}) {
  const { line } = await params;
  const meta = LINE_META[line];
  if (!meta) notFound();

  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "zhTW";

  const products: Product[] = await client
    .fetch(lookbookLineQuery, { line })
    .catch(() => []);

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 border-b border-foreground/10 pb-10">
          <Link
            href="/lookbook"
            className="text-[10px] tracking-widest uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-6 inline-block"
          >
            ← 作品集
          </Link>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
            {meta.char}
          </h1>
          <p className="text-sm text-foreground/50 max-w-md leading-relaxed">
            {meta.tagline[lang]}
          </p>
        </div>

        {/* Products */}
        {products.length === 0 ? (
          <p className="text-sm text-foreground/30 tracking-widest uppercase">
            {lang === "zhTW" ? "尚無商品" : "No items yet"}
          </p>
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
                        ? `NT$ ${product.salePrice.toLocaleString()}`
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
