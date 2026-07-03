import path from "path";
import { fileURLToPath } from "url";

import config from "@/payload.config";
import { staticHomePage } from "@/lib/pages/home";
import { getPayload } from "payload";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const projectRoot = path.resolve(dirname, "..");

function publicAssetToFilePath(publicPath: string): string {
  const relativePath = publicPath.replace(/^\//, "");
  return path.join(projectRoot, "public", relativePath);
}

async function getOrCreateMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  publicPath: string,
  alt: string,
): Promise<number> {
  const filePath = publicAssetToFilePath(publicPath);

  const existing = await payload.find({
    collection: "media",
    limit: 1,
    overrideAccess: true,
    where: {
      caption: {
        equals: publicPath,
      },
    },
  });

  if (existing.docs[0]) {
    console.log(`  ↳ reusing media: ${publicPath}`);
    return existing.docs[0].id;
  }

  const media = await payload.create({
    collection: "media",
    data: {
      alt,
      caption: publicPath,
    },
    filePath,
    overrideAccess: true,
  });

  console.log(`  ↳ created media: ${publicPath}`);
  return media.id;
}

async function seedHomePage(
  payload: Awaited<ReturnType<typeof getPayload>>,
): Promise<void> {
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

async function seedHomeData(): Promise<void> {
  const payload = await getPayload({ config });

  console.log("Seeding home page global...\n");
  await seedHomePage(payload);
  console.log("\nHome page seed complete.");
}

await seedHomeData();
