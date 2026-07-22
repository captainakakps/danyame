import type { Metadata } from "next";

import { getExperiencesPage } from "@/lib/cms/pages";
import ExperiencesPageView from "@/components/experiences/ExperiencesPageView";
import { buildSocialMetadata } from "@/lib/seo";

const experiencesDescription =
  "Discover everything we offer — from events and nightlife to relaxation and recreation.";

export const metadata: Metadata = {
  title: "Experiences",
  description: experiencesDescription,
  ...buildSocialMetadata({
    title: "Experiences | Danyame Recreational Village",
    description: experiencesDescription,
    image: "/assets/experiences/hero.jpg",
    imageAlt: "Experiences at Danyame",
    path: "/experiences",
  }),
};

export default async function ExperiencesPage() {
  const page = await getExperiencesPage();

  return <ExperiencesPageView page={page} />;
}
