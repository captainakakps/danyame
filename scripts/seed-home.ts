import { staticHomePage } from "@/lib/pages/home";
import type { Payload } from "payload";

import { getOrCreateMedia } from "./lib/seed-helpers";

async function seedHomePage(payload: Payload): Promise<void> {
  const heroImageId = await getOrCreateMedia(
    payload,
    staticHomePage.hero.image,
    "Home hero background",
  );
  const aboutImageId = await getOrCreateMedia(
    payload,
    staticHomePage.aboutTeaser.image,
    staticHomePage.aboutTeaser.imageAlt,
  );
  const planningEventImageId = await getOrCreateMedia(
    payload,
    staticHomePage.planningEvent.image,
    staticHomePage.planningEvent.imageAlt,
  );

  const categories = await Promise.all(
    staticHomePage.categories.map(async (category) => ({
      title: category.title,
      href: category.href,
      image: await getOrCreateMedia(payload, category.image, category.title),
    })),
  );

  const galleryImages = await Promise.all(
    staticHomePage.gallery.images.map(async (image) => ({
      alt: image.alt,
      image: await getOrCreateMedia(payload, image.src, image.alt),
    })),
  );

  const testimonialsItems = await Promise.all(
    staticHomePage.testimonials.items.map(async (item) => ({
      name: item.name,
      role: item.role,
      quote: item.quote,
      imageAlt: item.imageAlt,
      cardStyle: item.cardStyle,
      image: await getOrCreateMedia(payload, item.image, item.imageAlt),
    })),
  );

  await payload.updateGlobal({
    slug: "home-page",
    overrideAccess: true,
    data: {
      heroImage: heroImageId,
      heroHeadline1: staticHomePage.hero.headline1,
      heroHeadline2: staticHomePage.hero.headline2,
      heroHeadline3: staticHomePage.hero.headline3,
      heroTagline: staticHomePage.hero.tagline,
      heroSubtext: staticHomePage.hero.subtext,
      everythingTitle: staticHomePage.everythingYouNeed.title,
      everythingBody: staticHomePage.everythingYouNeed.body,
      everythingCtaLabel: staticHomePage.everythingYouNeed.ctaLabel,
      everythingCtaHref: staticHomePage.everythingYouNeed.ctaHref,
      categories,
      aboutTitle: staticHomePage.aboutTeaser.title,
      aboutBody: staticHomePage.aboutTeaser.body,
      aboutImage: aboutImageId,
      aboutImageAlt: staticHomePage.aboutTeaser.imageAlt,
      aboutCtaLabel: staticHomePage.aboutTeaser.ctaLabel,
      aboutCtaHref: staticHomePage.aboutTeaser.ctaHref,
      eventsSectionTitle: staticHomePage.events.sectionTitle,
      eventsHeading: staticHomePage.events.heading,
      eventsBody: staticHomePage.events.body,
      eventsMetaEveryWeek: staticHomePage.events.metaEveryWeek,
      eventsMetaLocation: staticHomePage.events.metaLocation,
      eventsMetaVibes: staticHomePage.events.metaVibes,
      eventsRegisterLabel: staticHomePage.events.registerLabel,
      eventsRegisterHref: staticHomePage.events.registerHref,
      eventsCountdownLabel: staticHomePage.events.countdownLabel,
      eventsViewAllLabel: staticHomePage.events.viewAllLabel,
      eventsViewAllHref: staticHomePage.events.viewAllHref,
      eventsUseCmsCountdown: staticHomePage.events.useCmsCountdown,
      planningEventImage: planningEventImageId,
      planningEventImageAlt: staticHomePage.planningEvent.imageAlt,
      planningEventTitle: staticHomePage.planningEvent.title,
      planningEventBody: staticHomePage.planningEvent.body,
      planningEventCtaLabel: staticHomePage.planningEvent.ctaLabel,
      planningEventCtaHref: staticHomePage.planningEvent.ctaHref,
      galleryTitle: staticHomePage.gallery.title,
      galleryIntro: staticHomePage.gallery.intro,
      galleryUseCmsGallery: staticHomePage.gallery.useCmsGallery,
      galleryImages,
      galleryCtaLabel: staticHomePage.gallery.ctaLabel,
      galleryCtaHref: staticHomePage.gallery.ctaHref,
      testimonialsTitle: staticHomePage.testimonials.title,
      testimonialsBackgroundImage: await getOrCreateMedia(
        payload,
        staticHomePage.testimonials.backgroundImage,
        "Testimonials section background",
      ),
      testimonialsItems,
      finalCtaLine1: staticHomePage.finalCta.line1,
      finalCtaLine2: staticHomePage.finalCta.line2,
      finalCtaLine3: staticHomePage.finalCta.line3,
      finalCtaLine4: staticHomePage.finalCta.line4,
      finalCtaBody: staticHomePage.finalCta.body,
      finalCtaSecondaryLabel: staticHomePage.finalCta.secondaryLabel,
      finalCtaSecondaryHref: staticHomePage.finalCta.secondaryHref,
      finalCtaPrimaryLabel: staticHomePage.finalCta.primaryLabel,
      finalCtaPrimaryHref: staticHomePage.finalCta.primaryHref,
    },
  });

  console.log("  ✓ home page global updated");
}

export async function seedHomeData(payload: Payload): Promise<void> {
  console.log("Seeding home page global...\n");
  await seedHomePage(payload);
  console.log("\nHome page seed complete.");
}

async function runStandalone(): Promise<void> {
  const config = (await import("@/payload.config")).default;
  const { getPayload } = await import("payload");
  const payload = await getPayload({ config });
  await seedHomeData(payload);
}

if (process.argv[1]?.includes("seed-home.ts")) {
  runStandalone()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Home seed failed:", error);
      process.exit(1);
    });
}
