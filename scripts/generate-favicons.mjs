import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const svgPath = join(__dirname, "favicon.svg");
const appDir = join(root, "src", "app");

const svg = readFileSync(svgPath);

async function renderPng(size) {
  return sharp(svg, { density: Math.max(72, Math.round((size / 512) * 300)) })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();
}

mkdirSync(appDir, { recursive: true });

const icon32 = await renderPng(32);
const icon48 = await renderPng(48);
const icon180 = await renderPng(180);
const icon512 = await renderPng(512);

writeFileSync(join(appDir, "icon.png"), icon32);
writeFileSync(join(appDir, "apple-icon.png"), icon180);

const ico = await pngToIco([icon32, icon48]);
writeFileSync(join(appDir, "favicon.ico"), ico);

writeFileSync(join(appDir, "icon.svg"), svg);

writeFileSync(join(root, "public", "icon-512.png"), icon512);

console.log("Generated favicon assets in src/app/ and public/icon-512.png");
