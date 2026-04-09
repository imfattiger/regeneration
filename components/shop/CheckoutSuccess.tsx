"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";

export default function CheckoutSuccess({ locale }: { locale: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (searchParams.get("checkout") === "success") {
      clearCart();
      setVisible(true);
      // Clean up URL immediately but keep modal open
      router.replace(locale === "en" ? "/en/shop" : "/shop");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function dismiss() {
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm"
      onClick={dismiss}
    >
      <div
        className="bg-background border border-foreground/10 p-10 max-w-sm w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xs tracking-widest uppercase text-muted mb-4">
          {locale === "en" ? "Order Confirmed" : "訂單已確認"}
        </p>
        <h2 className="text-2xl font-bold mb-3">
          {locale === "en" ? "Thank you!" : "感謝你的購買！"}
        </h2>
        <p className="text-sm text-foreground/60 mb-8">
          {locale === "en"
            ? "You'll receive a confirmation email shortly."
            : "確認信即將寄出。"}
        </p>
        <button
          onClick={dismiss}
          className="text-xs tracking-widest uppercase border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
        >
          {locale === "en" ? "Continue Shopping" : "繼續逛逛"}
        </button>
      </div>
    </div>
  );
}
