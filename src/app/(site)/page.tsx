import { getHomePageContent } from "@/lib/cms/home-page";
import HomePageView from "@/components/home/HomePageView";

export default async function HomePage() {
  const { page, countdown, countdownTarget, featuredEvent } =
    await getHomePageContent();

  return (
    <HomePageView
      page={page}
      countdown={countdown}
      countdownTarget={countdownTarget}
      featuredEvent={featuredEvent}
    />
  );
}
