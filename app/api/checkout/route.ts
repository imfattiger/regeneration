import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

export async function POST(req: NextRequest) {
  try {
    const { items, locale } = await req.json() as { items: CartItem[]; locale?: string };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
    const localePath = locale === "en" ? "/en" : "";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      currency: "twd",
      line_items: items.map((item) => ({
        price_data: {
          currency: "twd",
          product_data: {
            name: item.name,
            ...(item.image ? { images: [item.image] } : {}),
          },
          unit_amount: item.price * 100, // Stripe treats TWD as 2-decimal (cents)
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${origin}${localePath}/shop?checkout=success`,
      cancel_url: `${origin}${localePath}/shop?checkout=cancelled`,
      shipping_address_collection: {
        allowed_countries: ["TW"],
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
