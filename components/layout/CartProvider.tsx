"use client";

import { useEffect, useState } from "react";
import CartDrawer from "./CartDrawer";

export default function CartProvider({ locale }: { locale: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <CartDrawer locale={locale} />;
}
