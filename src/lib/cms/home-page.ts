import { getMediaUrl } from "@/lib/cms/media";
import { getFeaturedEvent } from "@/lib/cms/events";
import { getPayloadClient } from "@/lib/payload";
import {
  computeCountdown,
  staticHomePage,
  type EventCountdown,
  type HomeGalleryImage,
  type HomePageData,
} from "@/lib/pages/home";
import type { FeaturedEvent } from "@/lib/events";
import type { HomePage as HomePageDoc } from "@/payload-types";

export type { EventCountdown, HomePageData };

export type HomePageContent = {
  page: HomePageData;
  countdown: EventCountdown;
  /** ISO date the countdown targets — lets the client tick it live. */
  countdownTarget: string | null;
  featuredEvent: FeaturedEvent | null;
};

async function getCmsGalleryImages(): Promise<HomeGalleryImage[] | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "gallery-images",
      depth: 2,
      limit: 7,
      sort: "sortOrder",
      where: {
        isPublished: { equals: true },
      },
    });

    const images = result.docs
      .map((doc) => {
        const src = getMediaUrl(doc.image);
        if (!src) {
          return null;
        }

        return {
          src,
          alt: doc.alt,
        };
      })
      .filter((image): image is HomeGalleryImage => image !== null);

    return images.length >= 7 ? images.slice(0, 7) : null;
  } catch {
    return null;
  }
}

function mapCategories(
  doc: HomePageDoc,
  fallback: HomePageData["categories"],
): HomePageData["categories"] {
  if (!doc.categories?.length) {
    return fallback;
  }

  const mapped = doc.categories
    .map((item) => {
      const image = getMediaUrl(item.image);
      if (!item.title || !image || !item.href) {
        return null;
      }

      return {
        title: item.title,
        image,
        href: item.href,
      };
    })
    .filter((item): item is HomePageData["categories"][number] => item !== null);

  return mapped.length > 0 ? mapped : fallback;
}

function mapManualGalleryImages(
  doc: HomePageDoc,
  fallback: HomeGalleryImage[],
): HomeGalleryImage[] {
  if (!doc.galleryImages?.length) {
    return fallback;
  }

  const mapped = doc.galleryImages
    .map((item) => {
      const src = getMediaUrl(item.image);
      if (!src || !item.alt) {
        return null;
      }

      return { src, alt: item.alt };
    })
    .filter((item): item is HomeGalleryImage => item !== null);

  return mapped.length >= 7 ? mapped.slice(0, 7) : fallback;
}

function mapTestimonials(
  doc: HomePageDoc,
  fallback: HomePageData["testimonials"],
): HomePageData["testimonials"] {
  const backgroundImage =
    getMediaUrl(doc.testimonialsBackgroundImage) ?? fallback.backgroundImage;

  if (!doc.testimonialsItems?.length) {
    return { ...fallback, backgroundImage };
  }

  const items = doc.testimonialsItems
    .map((item) => {
      const image = getMediaUrl(item.image);
      if (!item.name || !item.role || !item.quote || !image) {
        return null;
      }

      return {
        name: item.name,
        role: item.role,
        quote: item.quote,
        image,
        imageAlt: item.imageAlt || item.name,
        cardStyle: (item.cardStyle === "dark" ? "dark" : "light") as
          | "light"
          | "dark",
      };
    })
    .filter((item): item is HomePageData["testimonials"]["items"][number] => item !== null);

  return {
    title: doc.testimonialsTitle || fallback.title,
    backgroundImage,
    items: items.length > 0 ? items : fallback.items,
  };
}

function mapHomePageDoc(doc: HomePageDoc | null): HomePageData {
  if (!doc) {
    return staticHomePage;
  }

  const heroImage = getMediaUrl(doc.heroImage) ?? staticHomePage.hero.image;
  const aboutImage = getMediaUrl(doc.aboutImage) ?? staticHomePage.aboutTeaser.image;
  const planningEventImage =
    getMediaUrl(doc.planningEventImage) ?? staticHomePage.planningEvent.image;

  const galleryImages = doc.galleryUseCmsGallery
    ? staticHomePage.gallery.images
    : mapManualGalleryImages(doc, staticHomePage.gallery.images);

  return {
    hero: {
      image: heroImage,
      headline1: doc.heroHeadline1 || staticHomePage.hero.headline1,
      headline2: doc.heroHeadline2 || staticHomePage.hero.headline2,
      headline3: doc.heroHeadline3 || staticHomePage.hero.headline3,
      tagline: doc.heroTagline || staticHomePage.hero.tagline,
      subtext: doc.heroSubtext || staticHomePage.hero.subtext,
    },
    everythingYouNeed: {
      title: doc.everythingTitle || staticHomePage.everythingYouNeed.title,
      body: doc.everythingBody || staticHomePage.everythingYouNeed.body,
      ctaLabel:
        doc.everythingCtaLabel || staticHomePage.everythingYouNeed.ctaLabel,
      ctaHref:
        doc.everythingCtaHref || staticHomePage.everythingYouNeed.ctaHref,
    },
    categories: mapCategories(doc, staticHomePage.categories),
    aboutTeaser: {
      title: doc.aboutTitle || staticHomePage.aboutTeaser.title,
      body: doc.aboutBody || staticHomePage.aboutTeaser.body,
      image: aboutImage,
      imageAlt: doc.aboutImageAlt || staticHomePage.aboutTeaser.imageAlt,
      ctaLabel: doc.aboutCtaLabel || staticHomePage.aboutTeaser.ctaLabel,
      ctaHref: doc.aboutCtaHref || staticHomePage.aboutTeaser.ctaHref,
    },
    events: {
      sectionTitle:
        doc.eventsSectionTitle || staticHomePage.events.sectionTitle,
      heading: doc.eventsHeading || staticHomePage.events.heading,
      body: doc.eventsBody || staticHomePage.events.body,
      metaEveryWeek:
        doc.eventsMetaEveryWeek || staticHomePage.events.metaEveryWeek,
      metaLocation:
        doc.eventsMetaLocation || staticHomePage.events.metaLocation,
      metaVibes: doc.eventsMetaVibes || staticHomePage.events.metaVibes,
      registerLabel:
        doc.eventsRegisterLabel || staticHomePage.events.registerLabel,
      registerHref:
        doc.eventsRegisterHref || staticHomePage.events.registerHref,
      countdownLabel:
        doc.eventsCountdownLabel || staticHomePage.events.countdownLabel,
      viewAllLabel:
        doc.eventsViewAllLabel || staticHomePage.events.viewAllLabel,
      viewAllHref: doc.eventsViewAllHref || staticHomePage.events.viewAllHref,
      useCmsCountdown:
        doc.eventsUseCmsCountdown ?? staticHomePage.events.useCmsCountdown,
    },
    planningEvent: {
      image: planningEventImage,
      imageAlt:
        doc.planningEventImageAlt || staticHomePage.planningEvent.imageAlt,
      title: doc.planningEventTitle || staticHomePage.planningEvent.title,
      body: doc.planningEventBody || staticHomePage.planningEvent.body,
      ctaLabel:
        doc.planningEventCtaLabel || staticHomePage.planningEvent.ctaLabel,
      ctaHref:
        doc.planningEventCtaHref || staticHomePage.planningEvent.ctaHref,
    },
    gallery: {
      title: doc.galleryTitle || staticHomePage.gallery.title,
      intro: doc.galleryIntro || staticHomePage.gallery.intro,
      useCmsGallery:
        doc.galleryUseCmsGallery ?? staticHomePage.gallery.useCmsGallery,
      images: galleryImages,
      ctaLabel: doc.galleryCtaLabel || staticHomePage.gallery.ctaLabel,
      ctaHref: doc.galleryCtaHref || staticHomePage.gallery.ctaHref,
    },
    testimonials: mapTestimonials(doc, staticHomePage.testimonials),
    finalCta: {
      line1: doc.finalCtaLine1 || staticHomePage.finalCta.line1,
      line2: doc.finalCtaLine2 || staticHomePage.finalCta.line2,
      line3: doc.finalCtaLine3 || staticHomePage.finalCta.line3,
      line4: doc.finalCtaLine4 || staticHomePage.finalCta.line4,
      body: doc.finalCtaBody || staticHomePage.finalCta.body,
      secondaryLabel:
        doc.finalCtaSecondaryLabel || staticHomePage.finalCta.secondaryLabel,
      secondaryHref:
        doc.finalCtaSecondaryHref || staticHomePage.finalCta.secondaryHref,
      primaryLabel:
        doc.finalCtaPrimaryLabel || staticHomePage.finalCta.primaryLabel,
      primaryHref:
        doc.finalCtaPrimaryHref || staticHomePage.finalCta.primaryHref,
    },
  };
}

async function resolveGalleryImages(page: HomePageData): Promise<HomePageData> {
  if (!page.gallery.useCmsGallery) {
    return page;
  }

  const cmsImages = await getCmsGalleryImages();
  if (!cmsImages) {
    return page;
  }

  return {
    ...page,
    gallery: {
      ...page.gallery,
      images: cmsImages,
    },
  };
}

type ResolvedCountdown = {
  countdown: EventCountdown;
  targetISO: string | null;
};

async function resolveCountdown(page: HomePageData): Promise<ResolvedCountdown> {
  const fallback: ResolvedCountdown = {
    countdown: computeCountdown(
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    ),
    targetISO: null,
  };

  if (!page.events.useCmsCountdown) {
    return fallback;
  }

  try {
    const payload = await getPayloadClient();
    const featured = await payload.find({
      collection: "events",
      limit: 1,
      where: {
        isFeatured: { equals: true },
        _status: { equals: "published" },
      },
    });

    let targetDate: Date | null = null;
    const featuredDoc = featured.docs[0];

    if (featuredDoc?.eventDate) {
      const date = new Date(featuredDoc.eventDate);
      if (!Number.isNaN(date.getTime()) && date.getTime() > Date.now()) {
        targetDate = date;
      }
    }

    if (!targetDate) {
      const upcoming = await payload.find({
        collection: "events",
        limit: 1,
        sort: "eventDate",
        where: {
          _status: { equals: "published" },
          eventDate: { greater_than: new Date().toISOString() },
        },
      });

      const nextDoc = upcoming.docs[0];
      if (nextDoc?.eventDate) {
        targetDate = new Date(nextDoc.eventDate);
      }
    }

    if (targetDate && !Number.isNaN(targetDate.getTime())) {
      return {
        countdown: computeCountdown(targetDate),
        targetISO: targetDate.toISOString(),
      };
    }
  } catch {
    return fallback;
  }

  return fallback;
}

export async function getHomePageContent(): Promise<HomePageContent> {
  try {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({
      slug: "home-page",
      depth: 2,
    });

    let page = mapHomePageDoc(doc);
    page = await resolveGalleryImages(page);
    const [resolved, featuredEvent] = await Promise.all([
      resolveCountdown(page),
      getFeaturedEvent().catch(() => null),
    ]);

    return {
      page,
      countdown: resolved.countdown,
      countdownTarget: resolved.targetISO,
      featuredEvent: featuredEvent?.image ? featuredEvent : null,
    };
  } catch {
    return {
      page: staticHomePage,
      countdown: computeCountdown(
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      ),
      countdownTarget: null,
      featuredEvent: null,
    };
  }
}
