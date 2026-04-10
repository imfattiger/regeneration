import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { lookbookListQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import LinesGrid from "@/components/home/LinesGrid";

type LookbookEntry = {
  _id: string;
  title: { zhTW: string; en: string };
  slug: { current: string };
  materialStory?: { zhTW: string; en: string };
  coverImage?: { asset: { _ref: string } };
  publishedAt?: string;
};

export default async function LookbookPage() {
  const t = await getTranslations("lookbook");
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "zhTW";

  const entries: LookbookEntry[] = await client
    .fetch(lookbookListQuery)
    .catch(() => []);

  return (
    <div className="pt-24">
      {/* 四線滿版格子 */}
      <LinesGrid />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-16">
          <h1 className="text-xs tracking-widest uppercase text-muted mb-3">
            {t("title")}
          </h1>
          <p className="text-foreground/50 text-sm">{t("subtitle")}</p>
        </div>

        {entries.length === 0 ? (
          <EmptyState lang={lang} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
            {entries.map((entry) => (
              <LookbookCard key={entry._id} entry={entry} lang={lang} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function LookbookCard({
  entry,
  lang,
}: {
  entry: LookbookEntry;
  lang: "zhTW" | "en";
}) {
  return (
    <Link href={`/lookbook/${entry.slug.current}`} className="group block">
      <div className="aspect-[4/5] relative overflow-hidden bg-foreground/5 mb-4">
        {entry.coverImage ? (
          <Image
            src={urlFor(entry.coverImage).width(800).height(1000).url()}
            alt={entry.title[lang]}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs tracking-widest uppercase text-foreground/20">
              No Image
            </span>
          </div>
        )}
      </div>
      <h2 className="text-sm font-bold tracking-wide group-hover:opacity-60 transition-opacity">
        {entry.title[lang]}
      </h2>
      {entry.materialStory && (
        <p className="text-xs text-foreground/50 mt-1 line-clamp-2">
          {entry.materialStory[lang]}
        </p>
      )}
    </Link>
  );
}

function EmptyState({ lang }: { lang: "zhTW" | "en" }) {
  // Placeholder cards while Sanity isn't connected
  const placeholders = Array.from({ length: 3 });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
      {placeholders.map((_, i) => (
        <div key={i} className="block">
          <div className="aspect-[4/5] bg-foreground/5 mb-4 flex items-center justify-center">
            <span className="text-xs tracking-widest uppercase text-foreground/20">
              {lang === "en" ? "Coming Soon" : "即將上架"}
            </span>
          </div>
          <div className="h-4 bg-foreground/5 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}
