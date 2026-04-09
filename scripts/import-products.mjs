import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "0qnheos2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const products = [
  {
    name: { zhTW: "5 Panel Cap — Uptown Festival '84 Jacket", en: "5 Panel Cap — Uptown Festival '84 Jacket" },
    slug: "5-panel-cap-uptown-festival-84-jacket",
    price: 2500,
    inventory: 1,
    status: "available",
  },
  {
    name: { zhTW: "5 Panel Cap — Adidas Mesh Track Jacket", en: "5 Panel Cap — Adidas Mesh Track Jacket" },
    slug: "5-panel-cap-adidas-mesh-track-jacket",
    price: 2000,
    inventory: 1,
    status: "available",
  },
  {
    name: { zhTW: "5 Panel Cap — The North Face bag", en: "5 Panel Cap — The North Face Bag" },
    slug: "5-panel-cap-the-north-face-bag",
    price: 2500,
    inventory: 1,
    status: "available",
  },
  {
    name: { zhTW: "5 Panel Cap — Columbia Fleece Jacket", en: "5 Panel Cap — Columbia Fleece Jacket" },
    slug: "5-panel-cap-columbia-fleece-jacket",
    price: 2000,
    inventory: 1,
    status: "available",
  },
  {
    name: { zhTW: "5 Panel Cap — The North Face GORE-TEX Jacket", en: "5 Panel Cap — The North Face GORE-TEX Jacket" },
    slug: "5-panel-cap-tnf-gore-tex",
    price: 2700,
    inventory: 1,
    status: "available",
  },
  {
    name: { zhTW: "5 Panel Cap — The North Face DRYVENT Jacket", en: "5 Panel Cap — The North Face DRYVENT Jacket" },
    slug: "5-panel-cap-tnf-dryvent",
    price: 2700,
    inventory: 1,
    status: "available",
  },
  {
    name: { zhTW: "5 Panel Cap — NIKE 90s Half-zip Windbreaker", en: "5 Panel Cap — NIKE 90s Half-zip Windbreaker" },
    slug: "5-panel-cap-nike-90s-windbreaker",
    price: 2000,
    inventory: 1,
    status: "available",
  },
  {
    name: { zhTW: "5 Panel Cap — Regeneration Handmade #001", en: "5 Panel Cap — Regeneration Handmade #001" },
    slug: "5-panel-cap-regeneration-handmade-001",
    price: 1800,
    inventory: 1,
    status: "available",
  },
  {
    name: { zhTW: "5 Panel Cap — NIKE Football Club Jacket", en: "5 Panel Cap — NIKE Football Club Jacket" },
    slug: "5-panel-cap-nike-football-club",
    price: 2800,
    inventory: 1,
    status: "available",
  },
  {
    name: { zhTW: "5 Panel Cap — NIKE Marathon Sport", en: "5 Panel Cap — NIKE Marathon Sport" },
    slug: "5-panel-cap-nike-marathon-sport",
    price: 2800,
    inventory: 1,
    status: "available",
  },
  {
    name: { zhTW: "5 Panel Cap — Columbia PFG Fishing Shirt", en: "5 Panel Cap — Columbia PFG Fishing Shirt" },
    slug: "5-panel-cap-columbia-pfg",
    price: 2800,
    inventory: 0,
    status: "sold_out",
  },
  {
    name: { zhTW: "5 Panel Cap — Polo Ralph Lauren Oxford Shirt", en: "5 Panel Cap — Polo Ralph Lauren Oxford Shirt" },
    slug: "5-panel-cap-polo-ralph-lauren",
    price: 2800,
    inventory: 0,
    status: "sold_out",
  },
  {
    name: { zhTW: "5 Panel Cap — Levi's Denim Vest", en: "5 Panel Cap — Levi's Denim Vest" },
    slug: "5-panel-cap-levis-denim-vest",
    price: 3350,
    inventory: 0,
    status: "sold_out",
  },
  {
    name: { zhTW: "5 Panel Cap — Regeneration Handmade #002", en: "5 Panel Cap — Regeneration Handmade #002" },
    slug: "5-panel-cap-regeneration-handmade-002",
    price: 1800,
    inventory: 0,
    status: "sold_out",
  },
  {
    name: { zhTW: "5 Panel Cap — Mizuno BOMBONERA Windbreaker", en: "5 Panel Cap — Mizuno BOMBONERA Windbreaker" },
    slug: "5-panel-cap-mizuno-bombonera",
    price: 3350,
    inventory: 0,
    status: "sold_out",
  },
  {
    name: { zhTW: "Regeneration 托特包", en: "Regeneration Tote Bag" },
    slug: "regeneration-tote-bag",
    price: 680,
    inventory: 100,
    status: "available",
  },
];

async function importProducts() {
  console.log(`匯入 ${products.length} 件商品...`);

  for (const p of products) {
    const doc = {
      _type: "product",
      name: p.name,
      slug: { _type: "slug", current: p.slug },
      price: p.price,
      inventory: p.inventory,
      status: p.status,
      featured: false,
    };

    const result = await client.create(doc);
    console.log(`✓ ${p.name.zhTW} (${result._id})`);
  }

  console.log("\n完成！");
}

importProducts().catch(console.error);
