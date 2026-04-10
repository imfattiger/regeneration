"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

const LINES = [
  {
    char: "瀾",
    name: "LANN",
    element: { zhTW: "水", en: "Water" },
    poem: {
      zhTW: "水被擾動之後，才知道它原來有多靜。",
      en: "You only know how still the water was after it's been disturbed.",
    },
    tagline: {
      zhTW: "我們選，我們做。每頂不一樣，有就有，沒有就沒有。",
      en: "We choose, we make. Every piece different. If it's there, it's there. When it's gone, it's gone.",
    },
    href: "/shop",
    available: true,
    bgWeb: "/lines/lann-web.jpg",
    bgPhone: "/lines/lann-phone.jpg",
  },
  {
    char: "然",
    name: "EMBER",
    element: { zhTW: "火", en: "Fire" },
    poem: {
      zhTW: "不是火燒起來的那一刻。是燒之前，那件東西還在的樣子。",
      en: "Not the moment it catches. The moment before — when the thing is still itself.",
    },
    tagline: {
      zhTW: "你有一件捨不得的，拿來。我幫它變成帽子。",
      en: "You have something you can't let go of. Bring it. I'll make it a hat.",
    },
    href: "/shop",
    available: true,
    bgWeb: "/lines/ember-web.jpg",
    bgPhone: "/lines/ember-phone.jpg",
  },
  {
    char: "苒",
    name: "TERRA",
    element: { zhTW: "土", en: "Earth" },
    poem: {
      zhTW: "草木不說話。但它一直在長。",
      en: "Plants don't speak. But they keep growing.",
    },
    tagline: {
      zhTW: "固定的款，一直有，隨時買。",
      en: "Fixed designs. Always here. Buy when you're ready.",
    },
    href: "/shop",
    available: true,
    bgWeb: "/lines/terra-web.jpg",
    bgPhone: "/lines/terra-phone.jpg",
  },
  {
    char: "嵐",
    name: "AURA",
    element: { zhTW: "風", en: "Wind" },
    poem: {
      zhTW: "山裡的霧不解釋自己。",
      en: "The mountain fog doesn't explain itself.",
    },
    tagline: {
      zhTW: "高級玩物，收藏品。",
      en: "Fine objects. Things worth keeping.",
    },
    href: null,
    available: false,
    bgWeb: "/lines/aura-web.jpg",
    bgPhone: "/lines/aura-phone.jpg",
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
      className="relative flex flex-col justify-end p-6 md:p-8 aspect-[3/4] md:aspect-auto md:h-[calc(100vh-4rem)] border border-foreground/10 transition-all duration-500 overflow-hidden"
      style={{
        opacity: line.available ? 1 : 0.4,
      }}
    >
      {/* 手機背景圖 */}
      {line.bgPhone && (
        <Image
          src={line.bgPhone}
          alt=""
          fill
          className="object-cover object-center md:hidden"
          aria-hidden="true"
        />
      )}
      {/* 桌機背景圖 */}
      {line.bgWeb && (
        <Image
          src={line.bgWeb}
          alt=""
          fill
          className="object-cover object-center hidden md:block"
          aria-hidden="true"
        />
      )}

      {/* 底部漸層 */}
      {(line.bgPhone || line.bgWeb) && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)",
          }}
        />
      )}

      {/* 大漢字背景（無背景圖時才顯示） */}
      {!line.bgPhone && !line.bgWeb && (
        <span
          className="absolute inset-0 flex items-center justify-center text-[8rem] md:text-[10rem] font-bold leading-none select-none"
          style={{ opacity: 0.06 }}
          aria-hidden="true"
        >
          {line.char}
        </span>
      )}

      {/* 內容 */}
      <div className="relative z-10">
        <p className="text-2xl md:text-3xl font-bold tracking-widest mb-3">
          {line.name}
        </p>
        <p className="text-[11px] leading-relaxed text-white/60 mb-2 hidden md:block">
          {line.poem[lang]}
        </p>
        <p className="text-xs leading-relaxed text-white/80 mb-5">
          {line.tagline[lang]}
        </p>

        {line.available ? (
          <span className="text-xs tracking-widest uppercase border-b border-white/30 pb-0.5 text-white/70">
            {lang === "zhTW" ? "探索" : "Explore"} →
          </span>
        ) : (
          <span className="text-[10px] tracking-widest uppercase text-white/30 border border-white/20 px-2 py-1">
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
      className="group block [&>div]:group-hover:border-white/30"
    >
      {inner}
    </Link>
  );
}

export default function LinesGrid() {
  const locale = useLocale();
  const lang = locale === "en" ? "en" : "zhTW";

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
      {LINES.map((line) => (
        <div key={line.char} className="bg-background">
          <LineCard line={line} lang={lang} />
        </div>
      ))}
    </div>
  );
}
