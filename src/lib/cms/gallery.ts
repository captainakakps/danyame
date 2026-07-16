import { getMediaUrl } from "@/lib/cms/media";
import {
  buildGallerySet,
  staticGalleryCategories,
  type GalleryCategoryData,
  type GalleryImage,
} from "@/lib/gallery";
import { getPayloadClient } from "@/lib/payload";
import type {
  GalleryCategory as PayloadGalleryCategory,
  GalleryImage as PayloadGalleryImage,
} from "@/payload-types";

export type { GalleryCategoryData, GalleryImage } from "@/lib/gallery";
export type { GallerySet } from "@/lib/gallery";


function getCategorySlug(
  category: number | PayloadGalleryCategory | null | undefined,
): string {
  if (!category || typeof category === "number") {
    return "";
  }

  return category.slug;
}

function mapPayloadGalleryImage(doc: PayloadGalleryImage): GalleryImage | null {
  const src = getMediaUrl(doc.image);

  if (!src) {
    return null;
  }

  return {
    src,
    alt: doc.alt,
  };
}

function mapCategoryWithImages(
  category: PayloadGalleryCategory,
  images: GalleryImage[],
): GalleryCategoryData {
  return {
    name: category.name,
    slug: category.slug,
    sortOrder: category.sortOrder ?? 0,
    set: buildGallerySet(images),
  };
}

async function getPayloadGalleryData(): Promise<GalleryCategoryData[] | null> {
  try {
    const payload = await getPayloadClient();

    const [categoriesResult, imagesResult] = await Promise.all([
      payload.find({
        collection: "gallery-categories",
        depth: 0,
        limit: 100,
        sort: "sortOrder",
        where: {
          isActive: { equals: true },
        },
      }),
      payload.find({
        collection: "gallery-images",
        depth: 2,
        limit: 500,
        sort: "sortOrder",
        where: {
          isPublished: { equals: true },
        },
      }),
    ]);

    if (categoriesResult.totalDocs === 0) {
      return null;
    }

    const imagesByCategory = new Map<string, GalleryImage[]>();

    for (const doc of imagesResult.docs) {
      const categorySlug = getCategorySlug(doc.category);
      const image = mapPayloadGalleryImage(doc);

      if (!categorySlug || !image) {
        continue;
      }

      const existing = imagesByCategory.get(categorySlug) ?? [];
      existing.push(image);
      imagesByCategory.set(categorySlug, existing);
    }

    const categories = categoriesResult.docs
      .map((category) =>
        mapCategoryWithImages(category, imagesByCategory.get(category.slug) ?? []),
      )
      .filter((category) => category.set);

    if (categories.length === 0) {
      return null;
    }

    return categories;
  } catch {
    return null;
  }
}

export async function getGalleryCategories(): Promise<GalleryCategoryData[]> {
  const cmsCategories = await getPayloadGalleryData();

  if (!cmsCategories) {
    return staticGalleryCategories;
  }

  // Supplement CMS categories with any static categories not yet in the CMS,
  // so new tabs appear immediately without requiring a seed/admin step.
  const cmsSlugs = new Set(cmsCategories.map((c) => c.slug));
  const missingStatic = staticGalleryCategories.filter(
    (c) => !cmsSlugs.has(c.slug),
  );

  return [...cmsCategories, ...missingStatic].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );
}
