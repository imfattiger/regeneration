import { getTranslations } from "next-intl/server";

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <div className="pt-24">
      <section className="max-w-lg mx-auto px-6 py-20">
        <h1 className="text-xs tracking-widest uppercase text-muted mb-12">
          {t("title")}
        </h1>

        <form
          action="https://formspree.io/f/placeholder"
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
              rows={6}
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
      </section>
    </div>
  );
}
