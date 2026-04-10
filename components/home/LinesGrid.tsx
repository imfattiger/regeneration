"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

const LINES = [
  {
    char: "瀾",
    name: "LANN",
    element: { zhTW: "水", en: "Water" },
    desc: { zhTW: "選材製作", en: "Curated Materials" },
    href: "/shop",
    available: true,
  },
  {
    char: "嵐",
    name: "AURA",
    element: { zhTW: "風", en: "Wind" },
    desc: { zhTW: "精品支線", en: "Premium Line" },
    href: null,
    available: false,
  },
  {
    char: "然",
    name: "EMBER",
    element: { zhTW: "火", en: "Fire" },
    desc: { zhTW: "客訂製作", en: "Custom Orders" },
    href: "/contact",
    available: true,
  },
  {
    char: "苒",
    name: "TERRA",
    element: { zhTW: "土", en: "Earth" },
    desc: { zhTW: "品牌量產", en: "Production Line" },
    href: "/shop",
    available: true,
  },
];

function LineCard({
  line,
  lang,
}: {
  line: (typeof LINES)[0];
  lang: "zhTW" | "en";
}) {
  const inner = (
    <div
      className="relative flex flex-col justify-end p-6 md:p-8 aspect-[3/4] border border-foreground/10 transition-all duration-500"
      style={{
        opacity: line.available ? 1 : 0.4,
      }}
    >
      {/* 大漢字背景 */}
      <span
        className="absolute inset-0 flex items-center justify-center text-[8rem] md:text-[10rem] font-bold leading-none select-none transition-opacity duration-500"
        style={{ opacity: 0.06 }}
        aria-hidden="true"
      >
        {line.char}
      </span>

      {/* 內容 */}
      <div className="relative z-10">
        <p className="text-[10px] tracking-widest uppercase text-muted mb-1">
          {line.element[lang]}
        </p>
        <p className="text-lg font-bold tracking-widest mb-1">{line.name}</p>
        <p className="text-xs tracking-wide text-foreground/60 mb-4">
          {line.desc[lang]}
        </p>

        {line.available ? (
          <span className="text-xs tracking-widest uppercase border-b border-foreground/30 pb-0.5">
            {lang === "zhTW" ? "探索" : "Explore"} →
          </span>
        ) : (
          <span className="text-[10px] tracking-widest uppercase text-muted border border-foreground/20 px-2 py-1">
            {lang === "zhTW" ? "即將上線" : "Coming Soon"}
          </span>
        )}
      </div>
    </div>
  );

  if (!line.available || !line.href) return <div>{inner}</div>;

  return (
    <Link
      href={line.href}
      className="group block [&>div]:group-hover:border-foreground/40 [&_.char-bg]:group-hover:opacity-[0.1]"
    >
      {inner}
    </Link>
  );
}

export default function LinesGrid() {
  const locale = useLocale();
  const lang = locale === "en" ? "en" : "zhTW";

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10">
      {LINES.map((line) => (
        <div key={line.char} className="bg-background">
          <LineCard line={line} lang={lang} />
        </div>
      ))}
    </div>
  );
}
