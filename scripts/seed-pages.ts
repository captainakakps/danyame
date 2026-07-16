import { staticAboutPage } from "@/lib/pages/about";
import { staticContactPageHero } from "@/lib/pages/contact-page";
import { staticEventsHubPage } from "@/lib/pages/events-hub";
import { staticExperiencesPage } from "@/lib/pages/experiences";
import { staticGalleryPageHero } from "@/lib/pages/gallery-page";
import { staticHostEventPage } from "@/lib/pages/host-event";
import type { Payload } from "payload";

import { getOrCreateMedia } from "./lib/seed-helpers";

async function seedExperiencesPage(payload: Payload): Promise<void> {
  const categories = await Promise.all(
    staticExperiencesPage.categories.map(async (category) => ({
      slug: category.slug,
      label: category.label,
      title: category.title,
      description: category.description,
      image: await getOrCreateMedia(payload, category.image, category.label),
    })),
  );

  await payload.updateGlobal({
    slug: "experiences-page",
    overrideAccess: true,
    data: {
      heroImage: await getOrCreateMedia(
        payload,
        staticExperiencesPage.hero.image,
        "Experiences hero",
      ),
      heroTitle: staticExperiencesPage.hero.title,
      taglinePrimary: staticExperiencesPage.tagline.primary,
      taglineSecondary: staticExperiencesPage.tagline.secondary,
      categories,
      exploreMoreTitle: staticExperiencesPage.exploreMore.title,
      exploreMoreIntro: staticExperiencesPage.exploreMore.intro,
      exploreMoreItems: await Promise.all(
        staticExperiencesPage.exploreMore.items.map(async (item) => ({
          name: item.name,
          tagline: item.tagline,
          image: await getOrCreateMedia(payload, item.image, item.imageAlt),
          imageAlt: item.imageAlt,
          href: item.href,
          description: item.description,
          detailRows: item.detailRows,
          includes: item.includes.map((text) => ({ text })),
          primaryCtaLabel: item.primaryCtaLabel,
          primaryCtaHref: item.primaryCtaHref,
          secondaryCtaLabel: item.secondaryCtaLabel,
          secondaryCtaHref: item.secondaryCtaHref,
        })),
      ),
      finalCtaLine1: staticExperiencesPage.finalCta.line1,
      finalCtaLine2: staticExperiencesPage.finalCta.line2,
      finalCtaLine3: staticExperiencesPage.finalCta.line3,
      finalCtaLine4: staticExperiencesPage.finalCta.line4,
      finalCtaBody: staticExperiencesPage.finalCta.body,
      finalCtaSecondaryLabel: staticExperiencesPage.finalCta.secondaryLabel,
      finalCtaSecondaryHref: staticExperiencesPage.finalCta.secondaryHref,
      finalCtaPrimaryLabel: staticExperiencesPage.finalCta.primaryLabel,
      finalCtaPrimaryHref: staticExperiencesPage.finalCta.primaryHref,
    },
  });

  console.log("  ✓ experiences page updated");
}

async function seedAboutPage(payload: Payload): Promise<void> {
  const stripImages = await Promise.all(
    staticAboutPage.stripImages.map(async (image) => ({
      alt: image.alt,
      image: await getOrCreateMedia(payload, image.src, image.alt),
    })),
  );

  await payload.updateGlobal({
    slug: "about-page",
    overrideAccess: true,
    data: {
      heroImage: await getOrCreateMedia(
        payload,
        staticAboutPage.hero.image,
        "About hero",
      ),
      heroTitle: staticAboutPage.hero.title,
      heroDescription: staticAboutPage.hero.description,
      introLabel: staticAboutPage.intro.label,
      introWelcomeHeading: staticAboutPage.intro.welcomeHeading,
      introPrimaryImage: await getOrCreateMedia(
        payload,
        staticAboutPage.intro.primaryImage,
        staticAboutPage.intro.primaryImageAlt,
      ),
      introPrimaryImageAlt: staticAboutPage.intro.primaryImageAlt,
      introSinceCardImage: await getOrCreateMedia(
        payload,
        staticAboutPage.intro.sinceCard.image,
        "Since 2024 card",
      ),
      introSinceCardLabel: staticAboutPage.intro.sinceCard.label,
      introSinceCardText: staticAboutPage.intro.sinceCard.text,
      introParagraph: staticAboutPage.intro.paragraph,
      leadershipIntro: staticAboutPage.leadership.intro,
      leadershipImage: await getOrCreateMedia(
        payload,
        staticAboutPage.leadership.image,
        staticAboutPage.leadership.imageAlt,
      ),
      leadershipImageAlt: staticAboutPage.leadership.imageAlt,
      leadershipParagraphs: staticAboutPage.leadership.paragraphs.map((text) => ({
        text,
      })),
      stripImages,
      missionIcon: await getOrCreateMedia(
        payload,
        staticAboutPage.missionVision.mission.icon,
        "Mission icon",
      ),
      missionTitle: staticAboutPage.missionVision.mission.title,
      missionText: staticAboutPage.missionVision.mission.text,
      visionIcon: await getOrCreateMedia(
        payload,
        staticAboutPage.missionVision.vision.icon,
        "Vision icon",
      ),
      visionTitle: staticAboutPage.missionVision.vision.title,
      visionText: staticAboutPage.missionVision.vision.text,
      locationBackgroundImage: await getOrCreateMedia(
        payload,
        staticAboutPage.location.backgroundImage,
        "About location background",
      ),
      locationPinIcon: await getOrCreateMedia(
        payload,
        staticAboutPage.location.pinIcon,
        "Location pin icon",
      ),
      locationText: staticAboutPage.location.text,
      mapTitle: staticAboutPage.map.title,
      mapLink: staticAboutPage.map.link,
    },
  });

  console.log("  ✓ about page updated");
}

async function seedGalleryPage(payload: Payload): Promise<void> {
  await payload.updateGlobal({
    slug: "gallery-page",
    overrideAccess: true,
    data: {
      heroTitle: staticGalleryPageHero.title,
      heroIntro: staticGalleryPageHero.intro,
    },
  });

  console.log("  ✓ gallery page updated");
}

async function seedEventsHubPage(payload: Payload): Promise<void> {
  const hostImageId = await getOrCreateMedia(
    payload,
    staticEventsHubPage.hostCard.image,
    staticEventsHubPage.hostCard.imageAlt,
  );
  const attendImageId = await getOrCreateMedia(
    payload,
    staticEventsHubPage.attendCard.image,
    staticEventsHubPage.attendCard.imageAlt,
  );

  await payload.updateGlobal({
    slug: "events-hub-page",
    overrideAccess: true,
    data: {
      heroImage: await getOrCreateMedia(
        payload,
        staticEventsHubPage.hero.image,
        staticEventsHubPage.hero.imageAlt,
      ),
      heroImageAlt: staticEventsHubPage.hero.imageAlt,
      heroTitle: staticEventsHubPage.hero.title,
      heroBody: staticEventsHubPage.hero.body,
      heroHostCtaLabel: staticEventsHubPage.hero.hostCtaLabel,
      heroHostCtaHref: staticEventsHubPage.hero.hostCtaHref,
      heroAttendCtaLabel: staticEventsHubPage.hero.attendCtaLabel,
      heroAttendCtaHref: staticEventsHubPage.hero.attendCtaHref,
      sectionTitle: staticEventsHubPage.section.title,
      sectionIntro: staticEventsHubPage.section.intro,
      hostCard: {
        image: hostImageId,
        imageAlt: staticEventsHubPage.hostCard.imageAlt,
        title: staticEventsHubPage.hostCard.title,
        body: staticEventsHubPage.hostCard.body,
        ctaLabel: staticEventsHubPage.hostCard.ctaLabel,
        ctaHref: staticEventsHubPage.hostCard.ctaHref,
      },
      attendCard: {
        image: attendImageId,
        imageAlt: staticEventsHubPage.attendCard.imageAlt,
        title: staticEventsHubPage.attendCard.title,
        body: staticEventsHubPage.attendCard.body,
        ctaLabel: staticEventsHubPage.attendCard.ctaLabel,
        ctaHref: staticEventsHubPage.attendCard.ctaHref,
      },
    },
  });

  console.log("  ✓ events hub page updated");
}

async function seedHostEventPage(payload: Payload): Promise<void> {
  await payload.updateGlobal({
    slug: "host-event-page",
    overrideAccess: true,
    data: {
      title: staticHostEventPage.title,
      body: staticHostEventPage.body,
      heroImage: await getOrCreateMedia(
        payload,
        staticHostEventPage.image,
        staticHostEventPage.imageAlt,
      ),
      heroImageAlt: staticHostEventPage.imageAlt,
      primaryCtaLabel: staticHostEventPage.primaryCtaLabel,
      primaryCtaHref: staticHostEventPage.primaryCtaHref,
      secondaryCtaLabel: staticHostEventPage.secondaryCtaLabel,
      secondaryCtaHref: staticHostEventPage.secondaryCtaHref,
    },
  });

  console.log("  ✓ host event page updated");
}

async function seedContactPage(payload: Payload): Promise<void> {
  await payload.updateGlobal({
    slug: "contact-page",
    overrideAccess: true,
    data: {
      headlineLine1: staticContactPageHero.headlineLine1,
      headlineLine2: staticContactPageHero.headlineLine2,
      intro: staticContactPageHero.intro,
    },
  });

  console.log("  ✓ contact page updated");
}

export async function seedPagesData(payload: Payload): Promise<void> {
  console.log("Seeding page globals...\n");

  await seedExperiencesPage(payload);
  await seedAboutPage(payload);
  await seedGalleryPage(payload);
  await seedEventsHubPage(payload);
  await seedHostEventPage(payload);
  await seedContactPage(payload);

  console.log("\nPage globals seed complete.");
}

async function runStandalone(): Promise<void> {
  const config = (await import("@/payload.config")).default;
  const { getPayload } = await import("payload");
  const payload = await getPayload({ config });
  await seedPagesData(payload);
}

try {
  await runStandalone();
  process.exit(0);
} catch (error) {
  console.error("Page seed failed:", error);
  process.exit(1);
}
