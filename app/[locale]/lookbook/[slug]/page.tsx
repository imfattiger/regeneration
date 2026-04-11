import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { lookbookEntryQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

type LookbookEntryDetail = {
  _id: string;
  title: { zhTW: string; en: string };
  slug: { current: string };
  materialStory?: { zhTW: string; en: string };
  images?: Array<{ asset: { _ref: string } }>;
  publishedAt?: string;
  relatedProduct?: {
    _id: string;
    name: { zhTW: string; en: string };
    slug: { current: string };
    price: number;
    status: string;
    coverImage?: { asset: { _ref: string } };
  };
};

export default async function LookbookEntryPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "zhTW";

  const entry: LookbookEntryDetail | null = await client
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
                        : entry.relatedProduct.status === "coming_soon"
                          ? locale === "en" ? "Coming Soon" : "即將上市"
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
