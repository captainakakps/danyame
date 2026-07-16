import type { Metadata } from "next";
import AboutPageView from "@/components/about/AboutPageView";
import { getAboutPage } from "@/lib/cms/pages";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Danyame Recreational Village — elevating lives and creating memories in Boadua-Topremang, Eastern Region.",
};

export default async function AboutPage() {
  const page = await getAboutPage();

  return <AboutPageView page={page} />;
}
