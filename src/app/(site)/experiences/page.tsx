import type { Metadata } from "next";

import { getExperiencesPage } from "@/lib/cms/pages";
import ExperiencesPageView from "@/components/experiences/ExperiencesPageView";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Discover everything we offer — from events and nightlife to relaxation and recreation.",
};

export default async function ExperiencesPage() {
  const page = await getExperiencesPage();

  return <ExperiencesPageView page={page} />;
}
