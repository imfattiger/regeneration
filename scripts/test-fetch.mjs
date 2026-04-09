import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "0qnheos2",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const products = await client.fetch('*[_type == "product"]{ _id, name, status, slug }');
console.log(`Found ${products.length} products:`);
products.forEach((p) => console.log(`  - ${p.name?.en} [${p.status}] (${p.slug?.current})`));
