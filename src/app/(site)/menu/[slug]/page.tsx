import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import MenuCategoryPageClient from "./MenuCategoryPageClient";
import { getMenuCategoryBySlug } from "@/lib/cms/menu";
import {
  getLandingCardImage,
  getLandingDisplayName,
} from "@/lib/menu-landing";
import { staticMenuCategories } from "@/lib/menu";
import { getSiteSettings } from "@/lib/cms/site-settings";
import { buildSocialMetadata } from "@/lib/seo";

type MenuCategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export const viewport: Viewport = {
  themeColor: "#e97d25",
};

export async function generateStaticParams() {
  return staticMenuCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: MenuCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryData = await getMenuCategoryBySlug(slug);

  if (!categoryData) {
    return { title: "Menu Category Not Found" };
  }

  const name = getLandingDisplayName(
    categoryData.category.slug,
    categoryData.category.name,
  );
  const description = `Browse ${name.toLowerCase()} at Danyame Recreational Village.`;

  // Prefer public static card assets for share previews — more reliable for
  // WhatsApp/Facebook crawlers than Payload /api/media/file URLs.
  const image =
    getLandingCardImage(categoryData.category.slug) ??
    categoryData.category.image ??
    categoryData.category.items.find((item) => item.image)?.image;

  return {
    title: name,
    description,
    ...buildSocialMetadata({
      title: `${name} | Danyame Recreational Village`,
      description,
      image,
      imageAlt: name,
      path: `/menu/${categoryData.category.slug}`,
    }),
  };
}

export default async function MenuCategoryPage({
  params,
}: Readonly<MenuCategoryPageProps>) {
  const { slug } = await params;
  const [categoryData, site] = await Promise.all([
    getMenuCategoryBySlug(slug),
    getSiteSettings(),
  ]);

  if (!categoryData) {
    notFound();
  }

  const { category, settings } = categoryData;

  return (
    <MenuCategoryPageClient
      category={category}
      settings={settings}
      site={site}
    />
  );
}
