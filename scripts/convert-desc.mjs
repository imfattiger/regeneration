import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcPath = join(__dirname, "../作品簡介.txt");
const outPath = join(__dirname, "../scripts/desc_utf8.txt");

// Read as buffer then decode as Big5 (CP950)
const buf = readFileSync(srcPath);
const text = new TextDecoder("big5").decode(buf);
writeFileSync(outPath, text, "utf8");
console.log("Converted to UTF-8");
