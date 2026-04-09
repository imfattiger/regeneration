import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function PoliciesPage() {
  const locale = await getLocale();

  return (
    <div className="pt-24">
      <section className="max-w-lg mx-auto px-6 py-20">
        <h1 className="text-xs tracking-widest uppercase text-muted mb-12">
          {locale === "en" ? "Policies" : "政策"}
        </h1>
        <nav className="flex flex-col gap-4">
          <Link href="/policies/shipping" className="text-sm hover:opacity-60 transition-opacity">
            {locale === "en" ? "Shipping Policy →" : "運送政策 →"}
          </Link>
          <Link href="/policies/returns" className="text-sm hover:opacity-60 transition-opacity">
            {locale === "en" ? "Returns Policy →" : "退換政策 →"}
          </Link>
          <Link href="/policies/privacy" className="text-sm hover:opacity-60 transition-opacity">
            {locale === "en" ? "Privacy Policy →" : "隱私政策 →"}
          </Link>
        </nav>
      </section>
    </div>
  );
}
