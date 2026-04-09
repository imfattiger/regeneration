import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-foreground/10 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs tracking-widest uppercase text-foreground/40">
          © {new Date().getFullYear()} Regeneration Studio. {t("rights")}.
        </p>
        <nav className="flex items-center gap-6">
          <Link
            href="/policies/shipping"
            className="text-xs tracking-widest uppercase text-foreground/40 hover:text-foreground transition-colors"
          >
            {t("shipping")}
          </Link>
          <Link
            href="/policies/returns"
            className="text-xs tracking-widest uppercase text-foreground/40 hover:text-foreground transition-colors"
          >
            {t("returns")}
          </Link>
          <Link
            href="/policies/privacy"
            className="text-xs tracking-widest uppercase text-foreground/40 hover:text-foreground transition-colors"
          >
            {t("privacy")}
          </Link>
          <a
            href="https://www.instagram.com/regeneration.studio_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase text-foreground/40 hover:text-foreground transition-colors"
          >
            Instagram
          </a>
        </nav>
      </div>
    </footer>
  );
}
