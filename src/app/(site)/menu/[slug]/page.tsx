import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import MenuPageLayout from "@/components/menu/MenuPageLayout";
import { getMenuPageData } from "@/lib/cms/menu";
import {
  getLandingCardImage,
  getLandingDisplayName,
} from "@/lib/menu-landing";
import { buildSocialMetadata } from "@/lib/seo";

type MenuCategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export const viewport: Viewport = {
  themeColor: "#e87d26",
};

export async function generateStaticParams() {
  const { categories } = await getMenuPageData();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: MenuCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { categories } = await getMenuPageData();
  const category = categories.find((entry) => entry.slug === slug);

  if (!category) {
    return { title: "Menu Category Not Found" };
  }

  const name = getLandingDisplayName(category.slug, category.name);
  const description = `Browse ${name.toLowerCase()} at Danyame Recreational Village.`;

  // Prefer public static card assets for share previews — more reliable for
  // WhatsApp/Facebook crawlers than Payload /api/media/file URLs.
  const image =
    getLandingCardImage(category.slug) ??
    category.image ??
    category.items.find((item) => item.image)?.image;

  return {
    title: name,
    description,
    ...buildSocialMetadata({
      title: `${name} | Danyame Recreational Village`,
      description,
      image,
      imageAlt: name,
      path: `/menu/${category.slug}`,
    }),
  };
}

export default async function MenuCategoryPage({
  params,
}: Readonly<MenuCategoryPageProps>) {
  const { slug } = await params;
  const { categories, settings } = await getMenuPageData();
  const activeCategory = categories.find((entry) => entry.slug === slug);

  if (!activeCategory) {
    notFound();
  }

  return (
    <MenuPageLayout
      categories={categories}
      initialSlug={activeCategory.slug}
      settings={settings}
    />
  );
}
