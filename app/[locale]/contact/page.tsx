import { getTranslations, getLocale } from "next-intl/server";

const SOCIAL = [
  {
    label: "Instagram",
    handle: "@regeneration.studio_",
    href: "https://www.instagram.com/regeneration.studio_",
  },
  {
    label: "Threads",
    handle: "@regeneration.studio_",
    href: "https://www.threads.com/@regeneration.studio_",
  },
  {
    label: "TikTok",
    handle: "@regeneration.studio_",
    href: "https://www.tiktok.com/@regeneration.studio_",
  },
  {
    label: "Shopee",
    handle: "regeneration.studio",
    href: "https://shopee.tw/regeneration.studio",
  },
  {
    label: "Email",
    handle: "regeneration.studio2023@gmail.com",
    href: "mailto:regeneration.studio2023@gmail.com",
  },
];

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const locale = await getLocale();

  return (
    <div className="pt-24">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-xs tracking-widest uppercase text-muted mb-16">
          {t("title")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Social links */}
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-8">
              {locale === "en" ? "Find Us" : "找到我們"}
            </p>
            <div className="flex flex-col gap-6">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.label === "Email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between border-b border-foreground/10 pb-4 hover:border-foreground/40 transition-colors"
                >
                  <span className="text-xs tracking-widest uppercase text-muted group-hover:text-foreground transition-colors">
                    {s.label}
                  </span>
                  <span className="text-sm group-hover:opacity-60 transition-opacity">
                    {s.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-8">
              {locale === "en" ? "Send a Message" : "傳送訊息"}
            </p>
            <form
              action="https://formspree.io/f/regeneration"
              method="POST"
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase text-muted">
                  {t("name")}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="border border-foreground/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-foreground transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase text-muted">
                  {t("email")}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="border border-foreground/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-foreground transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase text-muted">
                  {t("message")}
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="border border-foreground/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-foreground transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="border border-foreground px-6 py-3 text-xs tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
              >
                {t("send")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
