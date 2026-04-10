import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

const client = createClient({
  projectId: "0qnheos2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const DIR = "d:/賺錢企劃/regeneration/商品照/iCloud 照片";

const MAP = {
  "APMc4cB1U1AqZoLsCPHeN1": "Levi\u2019s denim vest",
  "uHf52NZSMBwhtF9dKUycJt": "NIKE 90\u2019s half-zip windbreaker",
  "APMc4cB1U1AqZoLsCPHa37": "Uptown Festival \u201984 Jacket",
};

const files = fs.readdirSync(DIR).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

for (const [productId, prefix] of Object.entries(MAP)) {
  const photos = files.filter(f => f.startsWith(prefix)).sort((a, b) => {
    const na = parseInt(a.match(/(\d+)\.[a-z]+$/i)?.[1] ?? "0");
    const nb = parseInt(b.match(/(\d+)\.[a-z]+$/i)?.[1] ?? "0");
    return na - nb;
  });
  console.log(`\nProduct ${productId}: ${photos.length} photos`);
  const refs = [];
  for (const file of photos) {
    const stream = fs.createReadStream(path.join(DIR, file));
    const asset = await client.assets.upload("image", stream, { filename: file, contentType: "image/jpeg" });
    refs.push({ _type: "image", _key: asset._id, asset: { _type: "reference", _ref: asset._id } });
    console.log("  ✓", file);
  }
  await client.patch(productId).set({ images: refs }).commit();
  console.log("  → Saved");
}
console.log("\nDone!");
