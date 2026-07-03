import path from "path";
import { fileURLToPath } from "url";

import config from "@/payload.config";
import {
  flattenGallerySet,
  staticGalleryCategories,
} from "@/lib/gallery";
import { site as staticSite } from "@/lib/site";
import { getPayload } from "payload";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const projectRoot = path.resolve(dirname, "..");

function publicAssetToFilePath(publicPath: string): string {
  const relativePath = publicPath.replace(/^\//, "");
  return path.join(projectRoot, "public", relativePath);
}

async function getOrCreateMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  publicPath: string,
  alt: string,
): Promise<number> {
  const filePath = publicAssetToFilePath(publicPath);
  const fileName = path.basename(filePath);

  const existing = await payload.find({
    collection: "media",
    limit: 1,
    overrideAccess: true,
    where: {
      caption: {
        equals: publicPath,
      },
    },
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

async function resetGalleryImages(
  payload: Awaited<ReturnType<typeof getPayload>>,
): Promise<void> {
  const existing = await payload.find({
    collection: "gallery-images",
    limit: 500,
    overrideAccess: true,
  });

  for (const doc of existing.docs) {
    await payload.delete({
      collection: "gallery-images",
      id: doc.id,
      overrideAccess: true,
    });
  }
}

async function getOrCreateCategory(
  payload: Awaited<ReturnType<typeof getPayload>>,
  name: string,
  slug: string,
  sortOrder: number,
): Promise<number> {
  const existing = await payload.find({
    collection: "gallery-categories",
    limit: 1,
    overrideAccess: true,
    where: {
      slug: { equals: slug },
    },
  });

  if (existing.docs[0]) {
    console.log(`• skipped category (exists): ${name}`);
    return existing.docs[0].id;
  }

  const created = await payload.create({
    collection: "gallery-categories",
    overrideAccess: true,
    data: {
      name,
      slug,
      sortOrder,
      isActive: true,
    },
  });

  console.log(`  ✓ category: ${name}`);
  return created.id;
}

async function seedGalleryImage(
  payload: Awaited<ReturnType<typeof getPayload>>,
  categoryId: number,
  title: string,
  publicPath: string,
  alt: string,
  sortOrder: number,
): Promise<void> {
  const existing = await payload.find({
    collection: "gallery-images",
    limit: 1,
    overrideAccess: true,
    where: {
      and: [
        { category: { equals: categoryId } },
        { title: { equals: title } },
      ],
    },
  });

  if (existing.docs[0]) {
    console.log(`• skipped image (exists): ${title}`);
    return;
  }

  const imageId = await getOrCreateMedia(payload, publicPath, alt);

  await payload.create({
    collection: "gallery-images",
    overrideAccess: true,
    data: {
      title,
      category: categoryId,
      image: imageId,
      alt,
      sortOrder,
      isPublished: true,
    },
  });

  console.log(`  ✓ image: ${title}`);
}

async function seedSiteSettings(
  payload: Awaited<ReturnType<typeof getPayload>>,
): Promise<void> {
  await payload.updateGlobal({
    slug: "site-settings",
    overrideAccess: true,
    data: {
      siteName: staticSite.name,
      shortName: staticSite.shortName,
      location: staticSite.location,
      phone: staticSite.contact.phone,
      phoneHref: staticSite.contact.phoneHref,
      email: staticSite.contact.email,
      socialLinks: staticSite.social.map((link) => ({
        label: link.label,
        href: link.href,
      })),
      footerLinks: staticSite.exploreLinks.map((link) => ({
        label: link.label,
        href: link.href,
      })),
      copyrightYear: staticSite.copyrightYear,
    },
  });

  console.log("  ✓ site settings updated");
}

async function seedGalleryData(): Promise<void> {
  const payload = await getPayload({ config });

  await resetGalleryImages(payload);

  console.log(`Seeding ${staticGalleryCategories.length} gallery categories...\n`);

  for (const category of staticGalleryCategories) {
    const categoryId = await getOrCreateCategory(
      payload,
      category.name,
      category.slug,
      category.sortOrder,
    );

    if (!category.set) {
      continue;
    }

    const images = flattenGallerySet(category.set);

    for (const [index, image] of images.entries()) {
      await seedGalleryImage(
        payload,
        categoryId,
        `${category.name} ${index + 1}`,
        image.src,
        image.alt,
        index,
      );
    }
  }

  console.log("");
  await seedSiteSettings(payload);
  console.log("\nGallery seed complete.");
}

try {
  await seedGalleryData();
  process.exit(0);
} catch (error) {
  console.error("Gallery seed failed:", error);
  process.exit(1);
}
