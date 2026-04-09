"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart";

export default function CartDrawer({ locale }: { locale: string }) {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, itemCount } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeCart]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, locale }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? (isZh ? "結帳發生錯誤" : "Checkout error"));
      }
    } catch (e) {
      setError(isZh ? "網路錯誤，請稍後再試" : "Network error, please try again");
    } finally {
      setLoading(false);
    }
  }

  const isZh = locale !== "en";

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-background border-l border-foreground/10 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-foreground/10">
          <p className="text-xs tracking-widest uppercase">
            {isZh ? "購物車" : "Cart"}
            {itemCount() > 0 && (
              <span className="ml-2 text-foreground/40">({itemCount()})</span>
            )}
          </p>
          <button
            onClick={closeCart}
            className="text-foreground/40 hover:text-foreground transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <p className="text-sm text-foreground/40 text-center mt-12">
              {isZh ? "購物車是空的" : "Your cart is empty"}
            </p>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  {item.image ? (
                    <div className="w-16 h-16 relative overflow-hidden bg-foreground/5 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-foreground/5 flex-shrink-0" />
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{item.name}</p>
                    <p className="text-xs text-foreground/50 mt-0.5">
                      NT$ {item.price.toLocaleString()}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center border border-foreground/20 text-xs hover:border-foreground transition-colors"
                      >
                        −
                      </button>
                      <span className="text-xs w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-foreground/20 text-xs hover:border-foreground transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-foreground/30 hover:text-foreground transition-colors text-xs self-start mt-0.5"
                  >
                    {isZh ? "移除" : "Remove"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-foreground/10 px-6 py-6 flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/50 text-xs tracking-widest uppercase">
                {isZh ? "小計" : "Subtotal"}
              </span>
              <span className="font-bold">NT$ {total().toLocaleString()}</span>
            </div>
            <p className="text-xs text-foreground/30">
              {isZh ? "運費於結帳時計算" : "Shipping calculated at checkout"}
            </p>
            {error && (
              <p className="text-xs text-red-500">{error}</p>
            )}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-foreground text-background py-4 text-xs tracking-widest uppercase hover:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading
                ? (isZh ? "處理中..." : "Processing...")
                : (isZh ? "前往結帳" : "Checkout")}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
