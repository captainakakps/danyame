import config from "@/payload.config";
import {
  staticMenuCategories,
  type MenuCategory,
  type MenuItem,
} from "@/lib/menu";
import { getPayload } from "payload";

async function getOrCreateCategory(
  payload: Awaited<ReturnType<typeof getPayload>>,
  category: MenuCategory,
): Promise<number> {
  const existing = await payload.find({
    collection: "menu-categories",
    limit: 1,
    overrideAccess: true,
    where: {
      slug: { equals: category.slug },
    },
  });

  if (existing.docs[0]) {
    console.log(`• skipped category (exists): ${category.name}`);
    return existing.docs[0].id;
  }

  const created = await payload.create({
    collection: "menu-categories",
    overrideAccess: true,
    data: {
      name: category.name,
      slug: category.slug,
      description: category.description,
      sortOrder: category.sortOrder,
      isActive: true,
    },
  });

  console.log(`  ✓ category: ${category.name}`);
  return created.id;
}

async function seedMenuItem(
  payload: Awaited<ReturnType<typeof getPayload>>,
  item: MenuItem,
  categoryId: number,
): Promise<void> {
  const existing = await payload.find({
    collection: "menu-items",
    limit: 1,
    overrideAccess: true,
    where: {
      slug: { equals: item.slug },
    },
  });

  if (existing.docs[0]) {
    console.log(`• skipped item (exists): ${item.name}`);
    return;
  }

  await payload.create({
    collection: "menu-items",
    overrideAccess: true,
    data: {
      name: item.name,
      slug: item.slug,
      category: categoryId,
      description: item.description,
      price: item.price,
      isAvailable: item.isAvailable,
      isFeatured: item.isFeatured,
      tags: item.tags,
      sortOrder: item.sortOrder,
      _status: "published",
    },
  });

  console.log(`  ✓ item: ${item.name}`);
}

async function seedMenuSettings(
  payload: Awaited<ReturnType<typeof getPayload>>,
): Promise<void> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_SERVER_URL ||
    "http://localhost:3000";

  await payload.updateGlobal({
    slug: "menu-settings",
    overrideAccess: true,
    data: {
      pageTitle: "Danyame Menu",
      introText: "Food, drinks, and poolside favourites — updated daily.",
      currency: "GH₵",
      showUnavailableItems: false,
      qrTargetUrl: `${siteUrl.replace(/\/$/, "")}/menu`,
    },
  });

  console.log("  ✓ menu settings updated");
}

async function seedMenuData(): Promise<void> {
  const payload = await getPayload({ config });

  console.log(`Seeding ${staticMenuCategories.length} menu categories...\n`);

  for (const category of staticMenuCategories) {
    const categoryId = await getOrCreateCategory(payload, category);

    for (const item of category.items) {
      await seedMenuItem(payload, item, categoryId);
    }
  }

  console.log("");
  await seedMenuSettings(payload);
  console.log("\nMenu seed complete.");
}

try {
  await seedMenuData();
  process.exit(0);
} catch (error) {
  console.error("Menu seed failed:", error);
  process.exit(1);
}
