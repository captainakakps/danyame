import type { Metadata, Viewport } from "next";

import MenuLandingPage from "./MenuLandingPage";
import { getMenuPageData } from "@/lib/cms/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Discover food and drinks at Danyame Recreational Village — local dishes, pizza, desserts, grills, and more.",
};

export const viewport: Viewport = {
  themeColor: "#e87d26",
};

export default async function MenuPage() {
  const { categories } = await getMenuPageData();

  return <MenuLandingPage categories={categories} />;
}
