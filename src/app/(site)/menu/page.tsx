import type { Metadata, Viewport } from "next";

import MenuLandingPage from "./MenuLandingPage";
import { getMenuPageData } from "@/lib/cms/menu";
import { buildSocialMetadata } from "@/lib/seo";

const menuDescription =
  "Discover food and drinks at Danyame Recreational Village — local dishes, pizza, desserts, grills, and more.";

export const metadata: Metadata = {
  title: "Menu",
  description: menuDescription,
  ...buildSocialMetadata({
    title: "Menu | Danyame Recreational Village",
    description: menuDescription,
    image: "/assets/menu/cards/pizza.jpg",
    imageAlt: "Danyame Menu",
    path: "/menu",
  }),
};

export const viewport: Viewport = {
  themeColor: "#e87d26",
};

export default async function MenuPage() {
  const { categories } = await getMenuPageData();

  return <MenuLandingPage categories={categories} />;
}
