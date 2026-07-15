import path from "path";
import { fileURLToPath } from "url";

import type { Payload } from "payload";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
export const projectRoot = path.resolve(dirname, "../..");

export function publicAssetToFilePath(publicPath: string): string {
  const relativePath = publicPath.replace(/^\//, "");
  return path.join(projectRoot, "public", relativePath);
}

export async function getOrCreateMedia(
  payload: Payload,
  publicPath: string,
  alt: string,
  options?: { matchBy?: "caption" | "filename" },
): Promise<number> {
  const filePath = publicAssetToFilePath(publicPath);
  const fileName = path.basename(filePath);
  const matchBy = options?.matchBy ?? "caption";

  const existing = await payload.find({
    collection: "media",
    limit: 1,
    overrideAccess: true,
    where:
      matchBy === "filename"
        ? { filename: { equals: fileName } }
        : { caption: { equals: publicPath } },
  });

  if (existing.docs[0]) {
    console.log(`  ↳ reusing media: ${publicPath}`);
    return existing.docs[0].id;
  }

  const media = await payload.create({
    collection: "media",
    data: {
      alt,
      caption: publicPath,
    },
    filePath,
    overrideAccess: true,
  });

  console.log(`  ↳ created media: ${publicPath}`);
  return media.id;
}

export function normalizeMenuPrice(price: number | string): number {
  if (typeof price === "number") {
    return price;
  }

  const match = price.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}
