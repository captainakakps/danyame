import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import EventsHeroAnimation from "@/components/events/EventsHeroAnimation";
import FadeUp from "@/components/FadeUp";
import { getEventsHubPage } from "@/lib/cms/pages";
import { buildSocialMetadata } from "@/lib/seo";

const eventsDescription =
  "Upcoming events at Danyame Recreational Village — Akwatia, Eastern Region.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getEventsHubPage();

  return {
    title: "Events",
    description: eventsDescription,
    ...buildSocialMetadata({
      title: "Events | Danyame Recreational Village",
      description: eventsDescription,
      image: page.attendCard.image || page.hero.image,
      imageAlt: page.attendCard.imageAlt || page.hero.imageAlt,
      path: "/events",
    }),
  };
}

export default async function EventsPage() {
  const page = await getEventsHubPage();

  return (
    <div className="bg-white overflow-x-hidden">
      <EventsHeroAnimation>
      <section className="relative min-h-[600px] w-full text-white md:min-h-[700px] lg:h-[1014px]">
        <Image
          src={page.hero.image}
          alt={page.hero.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          data-events-hero-img
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10">
          <Navbar />
        </div>

        <div className="relative flex h-full flex-col justify-end px-6 pb-12 sm:px-10 sm:pb-16 md:px-14 md:pb-20 lg:absolute lg:bottom-[100px] lg:left-14 lg:w-[917px] lg:pb-0">
          <div className="flex flex-col gap-4 lg:gap-4">
            <h1
              className="text-[36px] font-semibold uppercase leading-[1] sm:text-[48px] md:text-[60px] lg:text-[80px]"
              style={{ fontFamily: "var(--font-heading)" }}
              data-events-hero-title
            >
              {page.hero.title}
            </h1>

            <div className="flex flex-col gap-6 lg:gap-6" data-events-hero-copy>
              <p
                className="max-w-[600px] text-sm leading-[1.7] sm:text-base md:max-w-[800px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {page.hero.body}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href={page.hero.hostCtaHref}
                  className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-rust text-base font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-rust/90 active:translate-y-0 sm:w-[182px]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {page.hero.hostCtaLabel}
                </Link>
                <Link
                  href={page.hero.attendCtaHref}
                  className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-white text-base font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 active:translate-y-0 sm:w-[182px]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {page.hero.attendCtaLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      </EventsHeroAnimation>

      <section className="bg-white px-6 py-16 sm:px-10 sm:py-20 md:px-14 lg:px-14 lg:py-[130px]">
        <FadeUp
          selector="[data-events-reveal]"
          className="mx-auto max-w-[1328px]"
        >
          <div className="mb-10 flex flex-col gap-4 lg:mb-14" data-events-reveal>
            <h2
              className="text-[32px] font-medium leading-none text-ink sm:text-[40px] md:text-[48px] lg:text-[56px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {page.section.title}
            </h2>
            <p
              className="max-w-[715px] text-sm leading-[1.5] text-subtext sm:text-base"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {page.section.intro}
            </p>
          </div>

          <div
            className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-6 lg:gap-8"
            data-events-reveal
          >
            <div className="flex flex-1 flex-col gap-6 md:max-w-[600px] lg:gap-8">
              <div className="flex flex-col gap-5 lg:gap-6">
                <div className="group relative h-[200px] w-full overflow-hidden rounded-[20px] sm:h-[250px] md:h-[300px]">
                  <Image
                    src={page.hostCard.image}
                    alt={page.hostCard.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />
                </div>
                <div className="flex flex-col gap-3 lg:gap-4">
                  <h3
                    className="text-[28px] leading-none text-ink sm:text-[32px] md:text-[36px] lg:text-[40px]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {page.hostCard.title}
                  </h3>
                  <p
                    className="text-sm leading-[1.7] text-subtext sm:text-base"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {page.hostCard.body}
                  </p>
                </div>
              </div>
              <Link
                href={page.hostCard.ctaHref}
                className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-rust text-base font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-rust/90 active:translate-y-0 sm:w-[182px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {page.hostCard.ctaLabel}
              </Link>
            </div>

            <div
              id="attend"
              className="flex flex-1 flex-col gap-6 md:max-w-[600px] lg:gap-8"
            >
              <div className="flex flex-col gap-5 lg:gap-6">
                <div className="group relative h-[200px] w-full overflow-hidden rounded-[20px] sm:h-[250px] md:h-[300px]">
                  <Image
                    src={page.attendCard.image}
                    alt={page.attendCard.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />
                </div>
                <div className="flex flex-col gap-3 lg:gap-4">
                  <h3
                    className="text-[28px] leading-none text-ink sm:text-[32px] md:text-[36px] lg:text-[40px]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {page.attendCard.title}
                  </h3>
                  <p
                    className="text-sm leading-[1.7] text-subtext sm:text-base"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {page.attendCard.body}
                  </p>
                </div>
              </div>
              <Link
                href={page.attendCard.ctaHref}
                className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-rust text-base font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-rust/90 active:translate-y-0 sm:w-[182px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {page.attendCard.ctaLabel}
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>

      <Footer />
    </div>
  );
}
