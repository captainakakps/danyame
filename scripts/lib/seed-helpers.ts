import fs from "fs/promises";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

import { head } from "@vercel/blob";
import type { Payload } from "payload";
import sharp from "sharp";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
export const projectRoot = path.resolve(dirname, "../..");

const MIME_BY_EXT: Record<string, string> = {
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function guessMimeType(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();
  return MIME_BY_EXT[ext] ?? "application/octet-stream";
}

function isBlobExistsError(error: unknown): boolean {
  return (
    error instanceof Error && error.message.toLowerCase().includes("already exists")
  );
}

function isBlobNotFoundError(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const { message, name } = error as { message?: string; name?: string };
  const normalizedMessage = message?.toLowerCase() ?? "";

  return (
    name === "BlobNotFoundError" ||
    normalizedMessage.includes("not found") ||
    normalizedMessage.includes("does not exist")
  );
}

async function getLocalImageMeta(filePath: string): Promise<{
  filesize: number;
  height?: number;
  mimeType: string;
  width?: number;
}> {
  const stats = await fs.stat(filePath);
  const mimeType = guessMimeType(path.basename(filePath));

  try {
    const metadata = await sharp(filePath).metadata();
    return {
      filesize: stats.size,
      height: metadata.height,
      mimeType: metadata.format
        ? `image/${metadata.format === "jpg" ? "jpeg" : metadata.format}`
        : mimeType,
      width: metadata.width,
    };
  } catch {
    return {
      filesize: stats.size,
      mimeType,
    };
  }
}

async function createMediaFromExistingBlob(
  payload: Payload,
  {
    alt,
    fileName,
    filePath,
    publicPath,
    token,
  }: {
    alt: string;
    fileName: string;
    filePath: string;
    publicPath: string;
    token: string;
  },
): Promise<number> {
  const blobMeta = await head(fileName, { token });
  const localMeta = await getLocalImageMeta(filePath);

  const doc = await payload.db.create({
    collection: "media",
    data: {
      alt,
      caption: publicPath,
      filename: fileName,
      filesize: blobMeta.size ?? localMeta.filesize,
      height: localMeta.height,
      mimeType: blobMeta.contentType || localMeta.mimeType,
      url: blobMeta.url,
      width: localMeta.width,
    },
  });

  console.log(`  ↳ linked existing blob: ${publicPath}`);
  return doc.id as number;
}

export function publicAssetToFilePath(publicPath: string): string {
  const relativePath = publicPath.replace(/^\//, "");
  return path.join(projectRoot, "public", relativePath);
}

export function publicPathToStorageFilename(publicPath: string): string {
  const parts = publicPath.replace(/^\//, "").split("/");

  if (parts[0] === "assets") {
    parts.shift();
  }

  return parts.join("-");
}

async function copyToTempUpload(filePath: string, storageFileName: string): Promise<string> {
  const tempPath = path.join(os.tmpdir(), storageFileName);
  await fs.copyFile(filePath, tempPath);
  return tempPath;
}

export async function getOrCreateMedia(
  payload: Payload,
  publicPath: string,
  alt: string,
  options?: { matchBy?: "caption" | "filename" },
): Promise<number> {
  const filePath = publicAssetToFilePath(publicPath);
  const storageFileName = publicPathToStorageFilename(publicPath);
  const matchBy = options?.matchBy ?? "caption";
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();

  const existing = await payload.find({
    collection: "media",
    limit: 1,
    overrideAccess: true,
    where:
      matchBy === "filename"
        ? { filename: { equals: storageFileName } }
        : {
            or: [
              { caption: { equals: publicPath } },
              { filename: { equals: storageFileName } },
            ],
          },
  });

  if (existing.docs[0]) {
    if (existing.docs[0].filename === storageFileName) {
      console.log(`  ↳ reusing media: ${publicPath}`);
      return existing.docs[0].id;
    }

    await payload.delete({
      collection: "media",
      id: existing.docs[0].id,
      overrideAccess: true,
    });
  }

  if (token) {
    try {
      return await createMediaFromExistingBlob(payload, {
        alt,
        fileName: storageFileName,
        filePath,
        publicPath,
        token,
      });
    } catch (error) {
      if (!isBlobNotFoundError(error)) {
        throw error;
      }
    }
  }

  const uploadPath = await copyToTempUpload(filePath, storageFileName);

  try {
    const media = await payload.create({
      collection: "media",
      data: {
        alt,
        caption: publicPath,
      },
      filePath: uploadPath,
      overrideAccess: true,
    });

    console.log(`  ↳ created media: ${publicPath}`);
    return media.id;
  } catch (error) {
    if (token && isBlobExistsError(error)) {
      return createMediaFromExistingBlob(payload, {
        alt,
        fileName: storageFileName,
        filePath,
        publicPath,
        token,
      });
    }

    throw error;
  } finally {
    await fs.unlink(uploadPath).catch(() => undefined);
  }
}

export function normalizeMenuPrice(price: number | string): number {
  if (typeof price === "number") {
    return price;
  }

  const match = price.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}
