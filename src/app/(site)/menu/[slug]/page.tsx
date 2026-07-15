import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import MenuCategoryPageClient from "./MenuCategoryPageClient";
import { getMenuCategoryBySlug } from "@/lib/cms/menu";
import { getLandingDisplayName } from "@/lib/menu-landing";
import { staticMenuCategories } from "@/lib/menu";
import { getSiteSettings } from "@/lib/cms/site-settings";

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

  return {
    title: name,
    description: `Browse ${name.toLowerCase()} at Danyame Recreational Village.`,
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
