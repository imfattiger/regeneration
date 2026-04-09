import { getTranslations, getLocale } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

type ProcessStep = {
  title: { zhTW: string; en: string };
  description: { zhTW: string; en: string };
  image?: { asset: { _ref: string } };
};

type AboutPageData = {
  brandStory?: { zhTW: string; en: string };
  processSteps?: ProcessStep[];
};

export default async function AboutPage() {
  const t = await getTranslations("about");
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "zhTW";

  const data: AboutPageData | null = await client
    .fetch(aboutPageQuery)
    .catch(() => null);

  const processSteps = data?.processSteps ?? FALLBACK_STEPS;
  const brandStory = data?.brandStory?.[lang] ?? FALLBACK_STORY[lang];

  return (
    <div className="pt-24">
      {/* Brand Story */}
      <section className="max-w-2xl mx-auto px-6 py-20">
        <h1 className="text-xs tracking-widest uppercase text-muted mb-8">
          {t("title")}
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
          {t("story_title")}
        </h2>
        <p className="text-base leading-relaxed text-foreground/70 whitespace-pre-line">
          {brandStory}
        </p>
      </section>

      {/* Process Steps */}
      <section className="border-t border-foreground/10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xs tracking-widest uppercase text-muted mb-16 text-center">
            {t("process_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {processSteps.map((step, i) => (
              <div key={i} className="flex flex-col gap-4">
                {step.image ? (
                  <div className="aspect-square relative overflow-hidden bg-foreground/5">
                    <Image
                      src={urlFor(step.image).width(600).height(600).url()}
                      alt={step.title[lang]}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-foreground/5 flex items-center justify-center">
                    <span className="text-4xl font-bold text-foreground/10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted mb-1">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-bold mb-2">{step.title[lang]}</h3>
                  <p className="text-sm leading-relaxed text-foreground/60">
                    {step.description[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Fallback content before Sanity is connected
const FALLBACK_STORY = {
  zhTW: `Regeneration Studio 從一件舊外套開始。

我們相信每一塊布料都有它的生命歷程——軍裝的厚實、機能外套的防潑水處理、古著夾克的磨損痕跡。這些不是缺陷，而是材質的個性。

我們的工作是把這些個性轉化成一頂帽子。從找素材、打版、手工裁剪，到縫製成型，每一頂都是獨件。`,
  en: `Regeneration Studio begins with a single jacket.

We believe every piece of fabric has its own life history — the density of military wear, the DWR coating of technical outerwear, the worn edges of vintage denim. These aren't flaws. They're the character of the material.

Our work is to translate that character into a cap. From sourcing fabric and drafting patterns to hand-cutting and sewing — each piece is one of one.`,
};

const FALLBACK_STEPS: ProcessStep[] = [
  {
    title: { zhTW: "找素材", en: "Source" },
    description: {
      zhTW: "尋找值得再生的外套、軍裝、機能布料。每件材料都經過仔細篩選。",
      en: "Hunting for jackets, military wear, and technical fabrics worth regenerating. Every material is carefully selected.",
    },
  },
  {
    title: { zhTW: "設計打版", en: "Design & Pattern" },
    description: {
      zhTW: "根據布料特性設計版型，決定如何裁切才能保留最好的部分。",
      en: "Designing the pattern around the fabric's character — deciding where to cut to preserve what matters.",
    },
  },
  {
    title: { zhTW: "手工裁剪", en: "Hand Cut" },
    description: {
      zhTW: "每一片裁片都是手工剪裁，確保布料的花紋和磨損痕跡落在正確的位置。",
      en: "Each panel is hand-cut to ensure the fabric's texture and wear marks land exactly where intended.",
    },
  },
  {
    title: { zhTW: "縫製", en: "Sew" },
    description: {
      zhTW: "縫製組合裁片，工廠完成精密收邊與帽沿加工。",
      en: "Assembling the panels, with factory finishing for precise seams and brim construction.",
    },
  },
  {
    title: { zhTW: "拍攝紀錄", en: "Document" },
    description: {
      zhTW: "每件作品拍攝影片記錄製作過程與最終成品，上傳社群。",
      en: "Filming the process and final piece for every cap. Every step documented.",
    },
  },
];
