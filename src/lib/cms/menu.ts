import {
  applyMenuVisibility,
  defaultMenuSettings,
  getStaticFeaturedMenuItems,
  staticMenuCategories,
  type MenuCategory,
  type MenuItem,
  type MenuSettingsData,
  type MenuTag,
} from "@/lib/menu";
import { getPayloadClient } from "@/lib/payload";
import type {
  Media,
  MenuCategory as PayloadMenuCategory,
  MenuItem as PayloadMenuItem,
  MenuSetting,
} from "@/payload-types";

export type { MenuCategory, MenuItem, MenuSettingsData, MenuTag };

export type MenuPageData = {
  settings: MenuSettingsData;
  categories: MenuCategory[];
  featuredItems: MenuItem[];
};

function getMediaUrl(image: number | Media | null | undefined): string | undefined {
  if (!image || typeof image === "number") {
    return undefined;
  }

  return image.url || undefined;
}

function getCategorySlug(
  category: number | PayloadMenuCategory | null | undefined,
): string {
  if (!category || typeof category === "number") {
    return "";
  }

  return category.slug;
}

function mapPayloadMenuItem(doc: PayloadMenuItem): MenuItem {
  return {
    slug: doc.slug,
    name: doc.name,
    description: doc.description || undefined,
    price: doc.price,
    image: getMediaUrl(doc.image),
    isAvailable: Boolean(doc.isAvailable),
    isFeatured: Boolean(doc.isFeatured),
    tags: (doc.tags ?? []) as MenuTag[],
    sortOrder: doc.sortOrder ?? 0,
    categorySlug: getCategorySlug(doc.category),
  };
}

function mapPayloadMenuCategory(
  doc: PayloadMenuCategory,
  items: MenuItem[],
): MenuCategory {
  return {
    slug: doc.slug,
    name: doc.name,
    description: doc.description || undefined,
    sortOrder: doc.sortOrder ?? 0,
    items: items
      .filter((item) => item.categorySlug === doc.slug)
      .sort((a, b) => a.sortOrder - b.sortOrder),
  };
}

function mapMenuSettings(doc: MenuSetting | null): MenuSettingsData {
  if (!doc) {
    return defaultMenuSettings;
  }

  return {
    pageTitle: doc.pageTitle,
    introText: doc.introText || undefined,
    currency: doc.currency,
    showUnavailableItems: Boolean(doc.showUnavailableItems),
    qrTargetUrl: doc.qrTargetUrl || undefined,
  };
}

async function getPayloadMenuData(): Promise<MenuPageData | null> {
  try {
    const payload = await getPayloadClient();

    const [settingsDoc, categoriesResult, itemsResult] = await Promise.all([
      payload.findGlobal({
        slug: "menu-settings",
        depth: 0,
      }),
      payload.find({
        collection: "menu-categories",
        depth: 0,
        limit: 100,
        sort: "sortOrder",
        where: {
          isActive: { equals: true },
        },
      }),
      payload.find({
        collection: "menu-items",
        depth: 2,
        limit: 500,
        sort: "sortOrder",
        where: {
          _status: { equals: "published" },
        },
      }),
    ]);

    if (categoriesResult.totalDocs === 0 || itemsResult.totalDocs === 0) {
      return null;
    }

    const settings = mapMenuSettings(settingsDoc);
    const items = itemsResult.docs.map(mapPayloadMenuItem);
    const categories = categoriesResult.docs
      .map((category) => mapPayloadMenuCategory(category, items))
      .filter((category) => category.items.length > 0);

    if (categories.length === 0) {
      return null;
    }

    const visibleCategories = applyMenuVisibility(
      categories,
      settings.showUnavailableItems,
    );
    const featuredItems = filterMenuItems(
      items.filter((item) => item.isFeatured),
      settings.showUnavailableItems,
    ).sort((a, b) => a.sortOrder - b.sortOrder);

    return {
      settings,
      categories: visibleCategories,
      featuredItems,
    };
  } catch {
    return null;
  }
}

function filterMenuItems(
  items: MenuItem[],
  showUnavailableItems: boolean,
): MenuItem[] {
  if (showUnavailableItems) {
    return items;
  }

  return items.filter((item) => item.isAvailable);
}

export async function getMenuPageData(): Promise<MenuPageData> {
  const cmsData = await getPayloadMenuData();

  if (cmsData) {
    return cmsData;
  }

  const settings = defaultMenuSettings;
  const categories = applyMenuVisibility(staticMenuCategories, settings.showUnavailableItems);
  const featuredItems = getStaticFeaturedMenuItems(staticMenuCategories);

  return {
    settings,
    categories,
    featuredItems: filterMenuItems(featuredItems, settings.showUnavailableItems),
  };
}

export type MenuCategoryPageData = {
  category: MenuCategory;
  settings: MenuSettingsData;
};

export async function getMenuCategoryBySlug(
  slug: string,
): Promise<MenuCategoryPageData | null> {
  const { settings, categories } = await getMenuPageData();
  const category = categories.find((entry) => entry.slug === slug);

  if (!category) {
    return null;
  }

  const visibleCategory = applyMenuVisibility([category], settings.showUnavailableItems)[0];

  if (!visibleCategory || visibleCategory.items.length === 0) {
    return null;
  }

  return {
    category: visibleCategory,
    settings,
  };
}

export async function getMenuSettings(): Promise<MenuSettingsData> {
  try {
    const payload = await getPayloadClient();
    const settingsDoc = await payload.findGlobal({
      slug: "menu-settings",
      depth: 0,
    });

    return mapMenuSettings(settingsDoc);
  } catch {
    return defaultMenuSettings;
  }
}

export function getMenuQrTargetUrl(settings: MenuSettingsData): string {
  if (settings.qrTargetUrl?.trim()) {
    return settings.qrTargetUrl.trim();
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_SERVER_URL ||
    "http://localhost:3000";

  return `${siteUrl.replace(/\/$/, "")}/menu`;
}

export { formatMenuPrice } from "@/lib/menu";
