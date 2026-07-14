import type { Metadata } from "next";
import AboutPageView from "@/components/about/AboutPageView";
import { staticAboutPage } from "@/lib/pages/about";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Danyame Recreational Village — elevating lives and creating memories in Boadua-Topremang, Eastern Region.",
};

export default function AboutPage() {
  return <AboutPageView page={staticAboutPage} />;
}
