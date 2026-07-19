import {
  staticMenuCategories,
  type MenuCategory,
  type MenuItem,
} from "@/lib/menu";
import { getLandingCardImage } from "@/lib/menu-landing";
import type { Payload } from "payload";

import { getOrCreateMedia } from "./seed-helpers";

type SyncMenuImagesOptions = {
  force?: boolean;
};

function hasMediaRelation(
  value: number | { id: number } | null | undefined,
): boolean {
  return typeof value === "number" || Boolean(value?.id);
}

async function syncCategoryImage(
  payload: Payload,
  category: MenuCategory,
  categoryId: number,
  existingImage: number | { id: number } | null | undefined,
  options: SyncMenuImagesOptions,
): Promise<"attached" | "skipped" | "missing-source"> {
  const sourceImage = getLandingCardImage(category.slug);

  if (!sourceImage) {
    return "missing-source";
  }

  if (hasMediaRelation(existingImage) && !options.force) {
    return "skipped";
  }

  const imageId = await getOrCreateMedia(payload, sourceImage, category.name);

  await payload.update({
    collection: "menu-categories",
    id: categoryId,
    overrideAccess: true,
    data: {
      image: imageId,
    },
  });

  return "attached";
}

async function syncMenuItemImage(
  payload: Payload,
  item: MenuItem,
  itemId: number,
  existingImage: number | { id: number } | null | undefined,
  options: SyncMenuImagesOptions,
  categoryMediaId?: number,
): Promise<"attached" | "skipped" | "missing-source"> {
  if (hasMediaRelation(existingImage) && !options.force) {
    return "skipped";
  }

  let imageId: number | undefined;

  if (item.image) {
    imageId = await getOrCreateMedia(payload, item.image, item.name);
  } else if (categoryMediaId) {
    imageId = categoryMediaId;
  } else {
    const fallbackImage = getLandingCardImage(item.categorySlug);

    if (!fallbackImage) {
      return "missing-source";
    }

    imageId = await getOrCreateMedia(payload, fallbackImage, item.name);
  }

  await payload.update({
    collection: "menu-items",
    id: itemId,
    overrideAccess: true,
    data: {
      image: imageId,
      _status: "published",
    },
  });

  return "attached";
}

export async function syncMenuImages(
  payload: Payload,
  options: SyncMenuImagesOptions = {},
): Promise<void> {
  const stats = {
    categoriesAttached: 0,
    categoriesSkipped: 0,
    categoriesMissingSource: 0,
    itemsAttached: 0,
    itemsSkipped: 0,
    itemsMissingSource: 0,
  };
  const categoryMediaBySlug = new Map<string, number>();

  console.log("Syncing menu category images...\n");

  for (const category of staticMenuCategories) {
    const existing = await payload.find({
      collection: "menu-categories",
      limit: 1,
      overrideAccess: true,
      where: {
        slug: { equals: category.slug },
      },
    });

    const doc = existing.docs[0];
    if (!doc) {
      console.log(`• category missing in CMS: ${category.name}`);
      continue;
    }

    const result = await syncCategoryImage(
      payload,
      category,
      doc.id,
      doc.image,
      options,
    );

    if (result === "attached") {
      stats.categoriesAttached += 1;
      console.log(`  ✓ category image: ${category.name}`);
    } else if (result === "skipped") {
      stats.categoriesSkipped += 1;
      console.log(`  · category image exists: ${category.name}`);
    } else {
      stats.categoriesMissingSource += 1;
      console.log(`  · no source image for category: ${category.name}`);
    }

    const refreshed = await payload.findByID({
      collection: "menu-categories",
      id: doc.id,
      depth: 0,
      overrideAccess: true,
    });
    const categoryMediaId =
      typeof refreshed.image === "number" ? refreshed.image : refreshed.image?.id;

    if (categoryMediaId) {
      categoryMediaBySlug.set(category.slug, categoryMediaId);
    }
  }

  console.log("\nSyncing menu item images...\n");

  for (const category of staticMenuCategories) {
    for (const item of category.items) {
      const existing = await payload.find({
        collection: "menu-items",
        limit: 1,
        overrideAccess: true,
        where: {
          slug: { equals: item.slug },
        },
      });

      const doc = existing.docs[0];
      if (!doc) {
        console.log(`• item missing in CMS: ${item.name}`);
        continue;
      }

      const result = await syncMenuItemImage(
        payload,
        item,
        doc.id,
        doc.image,
        options,
        categoryMediaBySlug.get(item.categorySlug),
      );

      if (result === "attached") {
        stats.itemsAttached += 1;
        console.log(`  ✓ item image: ${item.name}`);
      } else if (result === "skipped") {
        stats.itemsSkipped += 1;
        console.log(`  · item image exists: ${item.name}`);
      } else {
        stats.itemsMissingSource += 1;
        console.log(`  · no source image for item: ${item.name}`);
      }
    }
  }

  console.log("\nMenu image sync complete.");
  console.log(
    `Categories: ${stats.categoriesAttached} attached, ${stats.categoriesSkipped} skipped, ${stats.categoriesMissingSource} without source image.`,
  );
  console.log(
    `Items: ${stats.itemsAttached} attached, ${stats.itemsSkipped} skipped, ${stats.itemsMissingSource} without source image.`,
  );
}
