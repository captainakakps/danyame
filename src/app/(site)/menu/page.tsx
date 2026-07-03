import type { Metadata, Viewport } from "next";

import MenuPageClient from "./MenuPageClient";
import { getMenuPageData } from "@/lib/cms/menu";
import { getSiteSettings } from "@/lib/cms/site-settings";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse food and drinks at Danyame Recreational Village — local dishes, grills, cocktails, and more.",
};

export const viewport: Viewport = {
  themeColor: "#125E65",
};

export default async function MenuPage() {
  const [{ settings, categories, featuredItems }, site] = await Promise.all([
    getMenuPageData(),
    getSiteSettings(),
  ]);

  return (
    <MenuPageClient
      settings={settings}
      categories={categories}
      featuredItems={featuredItems}
      site={site}
    />
  );
}
