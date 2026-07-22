import type { Metadata } from "next";
import AboutPageView from "@/components/about/AboutPageView";
import { getAboutPage } from "@/lib/cms/pages";
import { buildSocialMetadata } from "@/lib/seo";

const aboutDescription =
  "Danyame Recreational Village — elevating lives and creating memories in Boadua-Topremang, Eastern Region.";

export const metadata: Metadata = {
  title: "About Us",
  description: aboutDescription,
  ...buildSocialMetadata({
    title: "About Us | Danyame Recreational Village",
    description: aboutDescription,
    image: "/assets/about/hero.jpg",
    imageAlt: "About Danyame Recreational Village",
    path: "/about",
  }),
};

export default async function AboutPage() {
  const page = await getAboutPage();

  return <AboutPageView page={page} />;
}
