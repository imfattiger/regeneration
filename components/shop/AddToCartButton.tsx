"use client";

import { useCart } from "@/lib/cart";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

export default function AddToCartButton({
  product,
  available,
  locale,
}: {
  product: CartItem;
  available: boolean;
  locale: string;
}) {
  const { addItem } = useCart();
  const isZh = locale !== "en";

  if (!available) {
    return (
      <button
        disabled
        className="w-full border border-foreground/20 px-6 py-4 text-xs tracking-widest uppercase text-foreground/30 cursor-not-allowed"
      >
        {isZh ? "已售完" : "Sold Out"}
      </button>
    );
  }

  return (
    <button
      onClick={() => addItem(product)}
      className="w-full border border-foreground px-6 py-4 text-xs tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
    >
      {isZh ? "加入購物車" : "Add to Cart"}
    </button>
  );
}
