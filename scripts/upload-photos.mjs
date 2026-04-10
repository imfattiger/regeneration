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

const PHOTO_DIR = "d:/賺錢企劃/regeneration/商品照/iCloud 照片";

// Map photo filename prefix → Sanity product _id
const PHOTO_TO_PRODUCT = {
  "Adidas Mesh Track Jacket":         "V1Ub66wGGXa11rNa86VGPe",
  "By Columbia PFG fishing shirt":    "V1Ub66wGGXa11rNa86VKtv",
  "Columbia fleece jacket":           "APMc4cB1U1AqZoLsCPHc6r",
  "Levi's denim vest":                "APMc4cB1U1AqZoLsCPHeN1",
  "NIKE 90's half-zip windbreaker":   "uHf52NZSMBwhtF9dKUycJt",
  "NIKE FOOTBALL CLUB JACKET":        "uHf52NZSMBwhtF9dKUyceH",
  "NIKE MARATHON SPORT":              "APMc4cB1U1AqZoLsCPHdnX",
  "Polo Ralph Lauren Oxford Shirt":   "V1Ub66wGGXa11rNa86VLHy",
  "The North Face DRYVENT jacket":    "APMc4cB1U1AqZoLsCPHcpD",
  "The North Face GORE-TEX Jacket":   "uHf52NZSMBwhtF9dKUybFd",
  "The North Face bag":               "V1Ub66wGGXa11rNa86VGkG",
  "Uptown Festival '84 Jacket":       "APMc4cB1U1AqZoLsCPHa37",
  "fmb×BOMBONERA×Mizuno windbreaker": "APMc4cB1U1AqZoLsCPHeiJ",
  // Handmade #001: photos 1–6 (with "By" prefix)
  "By Regeneration.stidio Hand made": "APMc4cB1U1AqZoLsCPHdOh",
  // Handmade #002: photos 7–12 (no "By" prefix)
  "Regeneration.stidio Hand made":    "APMc4cB1U1AqZoLsCPHeVt",
};

function getProductId(filename) {
  // Try longest match first to avoid partial matches
  const sorted = Object.keys(PHOTO_TO_PRODUCT).sort((a, b) => b.length - a.length);
  for (const prefix of sorted) {
    if (filename.startsWith(prefix)) return PHOTO_TO_PRODUCT[prefix];
  }
  return null;
}

async function main() {
  const files = fs.readdirSync(PHOTO_DIR).filter(f =>
    /\.(jpg|jpeg|png)$/i.test(f)
  );

  // Group by product
  const groups = {};
  for (const file of files) {
    const id = getProductId(file);
    if (!id) { console.warn("⚠️  No match for:", file); continue; }
    if (!groups[id]) groups[id] = [];
    groups[id].push(file);
  }

  // Sort each group by filename number
  for (const id of Object.keys(groups)) {
    groups[id].sort((a, b) => {
      const na = parseInt(a.match(/(\d+)\.[a-z]+$/i)?.[1] ?? "0");
      const nb = parseInt(b.match(/(\d+)\.[a-z]+$/i)?.[1] ?? "0");
      return na - nb;
    });
  }

  for (const [productId, photoFiles] of Object.entries(groups)) {
    console.log(`\nUploading ${photoFiles.length} photos for product ${productId}...`);
    const imageRefs = [];

    for (const file of photoFiles) {
      const filePath = path.join(PHOTO_DIR, file);
      const stream = fs.createReadStream(filePath);
      const ext = path.extname(file).slice(1).toLowerCase();
      const mimeType = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/png";

      try {
        const asset = await client.assets.upload("image", stream, {
          filename: file,
          contentType: mimeType,
        });
        imageRefs.push({
          _type: "image",
          _key: asset._id,
          asset: { _type: "reference", _ref: asset._id },
        });
        process.stdout.write(`  ✓ ${file}\n`);
      } catch (e) {
        console.error(`  ✗ ${file}:`, e.message);
      }
    }

    if (imageRefs.length > 0) {
      await client.patch(productId).set({ images: imageRefs }).commit();
      console.log(`  → Saved ${imageRefs.length} images to product`);
    }
  }

  console.log("\nDone!");
}

main().catch(console.error);
