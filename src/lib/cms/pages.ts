import { getMediaUrl } from "@/lib/cms/media";
import { getPayloadClient } from "@/lib/payload";
import {
  staticAboutPage,
  type AboutPageData,
} from "@/lib/pages/about";
import {
  staticContactPageHero,
  type ContactPageHeroData,
} from "@/lib/pages/contact-page";
import {
  staticEventsHubPage,
  type EventsHubPageData,
} from "@/lib/pages/events-hub";
import {
  staticExperiencesPage,
  type ExperiencesPageData,
} from "@/lib/pages/experiences";
import {
  staticGalleryPageHero,
  type GalleryPageHeroData,
} from "@/lib/pages/gallery-page";
import {
  staticHostEventPage,
  type HostEventPageData,
} from "@/lib/pages/host-event";
import type { FinalCtaData, ExperienceCardData } from "@/lib/pages/shared";
import type {
  AboutPage as AboutPageDoc,
  ContactPage as ContactPageDoc,
  EventsHubPage as EventsHubPageDoc,
  ExperiencesPage as ExperiencesPageDoc,
  GalleryPage as GalleryPageDoc,
  HostEventPage as HostEventPageDoc,
} from "@/payload-types";

function mapFinalCta(
  doc: {
    finalCtaLine1?: string | null;
    finalCtaLine2?: string | null;
    finalCtaLine3?: string | null;
    finalCtaLine4?: string | null;
    finalCtaBody?: string | null;
    finalCtaSecondaryLabel?: string | null;
    finalCtaSecondaryHref?: string | null;
    finalCtaPrimaryLabel?: string | null;
    finalCtaPrimaryHref?: string | null;
  },
  fallback: FinalCtaData,
): FinalCtaData {
  return {
    line1: doc.finalCtaLine1 || fallback.line1,
    line2: doc.finalCtaLine2 || fallback.line2,
    line3: doc.finalCtaLine3 || fallback.line3,
    line4: doc.finalCtaLine4 || fallback.line4,
    body: doc.finalCtaBody || fallback.body,
    secondaryLabel: doc.finalCtaSecondaryLabel || fallback.secondaryLabel,
    secondaryHref: doc.finalCtaSecondaryHref || fallback.secondaryHref,
    primaryLabel: doc.finalCtaPrimaryLabel || fallback.primaryLabel,
    primaryHref: doc.finalCtaPrimaryHref || fallback.primaryHref,
  };
}

function mapExperienceCard(
  card:
    | {
        image?: number | { url?: string | null } | null;
        imageAlt?: string | null;
        title?: string | null;
        body?: string | null;
        ctaLabel?: string | null;
        ctaHref?: string | null;
      }
    | null
    | undefined,
  fallback: ExperienceCardData,
): ExperienceCardData {
  if (!card) {
    return fallback;
  }

  return {
    image: getMediaUrl(card.image as never) ?? fallback.image,
    imageAlt: card.imageAlt || fallback.imageAlt,
    title: card.title || fallback.title,
    body: card.body || fallback.body,
    ctaLabel: card.ctaLabel || fallback.ctaLabel,
    ctaHref: card.ctaHref || fallback.ctaHref,
  };
}

function mapExperiencesPage(doc: ExperiencesPageDoc | null): ExperiencesPageData {
  if (!doc) {
    return staticExperiencesPage;
  }

  const categories = doc.categories?.length
    ? doc.categories
        .map((item) => {
          const image = getMediaUrl(item.image);
          if (!item.label || !item.title || !item.description || !image) {
            return null;
          }

          return {
            label: item.label,
            title: item.title,
            description: item.description,
            image,
          };
        })
        .filter((item): item is ExperiencesPageData["categories"][number] => item !== null)
    : staticExperiencesPage.categories;

  return {
    hero: {
      image: getMediaUrl(doc.heroImage) ?? staticExperiencesPage.hero.image,
      title: doc.heroTitle || staticExperiencesPage.hero.title,
    },
    tagline: {
      primary: doc.taglinePrimary || staticExperiencesPage.tagline.primary,
      secondary: doc.taglineSecondary || staticExperiencesPage.tagline.secondary,
    },
    categories: categories.length > 0 ? categories : staticExperiencesPage.categories,
    finalCta: mapFinalCta(doc, staticExperiencesPage.finalCta),
  };
}

function mapAboutPage(doc: AboutPageDoc | null): AboutPageData {
  if (!doc) {
    return staticAboutPage;
  }

  const bodyParagraphs = doc.bodyParagraphs?.length
    ? doc.bodyParagraphs
        .map((item) => item.text)
        .filter((text): text is string => Boolean(text))
    : staticAboutPage.bodyParagraphs;

  const stripImages = doc.stripImages?.length
    ? doc.stripImages
        .map((item) => {
          const src = getMediaUrl(item.image);
          if (!src || !item.alt) {
            return null;
          }

          return { src, alt: item.alt };
        })
        .filter((item): item is AboutPageData["stripImages"][number] => item !== null)
    : staticAboutPage.stripImages;

  return {
    hero: {
      image: getMediaUrl(doc.heroImage) ?? staticAboutPage.hero.image,
      title: doc.heroTitle || staticAboutPage.hero.title,
      description: doc.heroDescription || staticAboutPage.hero.description,
    },
    bodyParagraphs:
      bodyParagraphs.length > 0 ? bodyParagraphs : staticAboutPage.bodyParagraphs,
    stripImages:
      stripImages.length > 0 ? stripImages : staticAboutPage.stripImages,
    quote: {
      backgroundImage:
        getMediaUrl(doc.quoteBackgroundImage) ??
        staticAboutPage.quote.backgroundImage,
      text: doc.quoteText || staticAboutPage.quote.text,
    },
  };
}

function mapGalleryPageHero(doc: GalleryPageDoc | null): GalleryPageHeroData {
  if (!doc) {
    return staticGalleryPageHero;
  }

  return {
    title: doc.heroTitle || staticGalleryPageHero.title,
    intro: doc.heroIntro || staticGalleryPageHero.intro,
  };
}

function mapEventsHubPage(doc: EventsHubPageDoc | null): EventsHubPageData {
  if (!doc) {
    return staticEventsHubPage;
  }

  return {
    hero: {
      image: getMediaUrl(doc.heroImage) ?? staticEventsHubPage.hero.image,
      imageAlt: doc.heroImageAlt || staticEventsHubPage.hero.imageAlt,
      title: doc.heroTitle || staticEventsHubPage.hero.title,
      body: doc.heroBody || staticEventsHubPage.hero.body,
      hostCtaLabel: doc.heroHostCtaLabel || staticEventsHubPage.hero.hostCtaLabel,
      hostCtaHref: doc.heroHostCtaHref || staticEventsHubPage.hero.hostCtaHref,
      attendCtaLabel:
        doc.heroAttendCtaLabel || staticEventsHubPage.hero.attendCtaLabel,
      attendCtaHref:
        doc.heroAttendCtaHref || staticEventsHubPage.hero.attendCtaHref,
    },
    section: {
      title: doc.sectionTitle || staticEventsHubPage.section.title,
      intro: doc.sectionIntro || staticEventsHubPage.section.intro,
    },
    hostCard: mapExperienceCard(doc.hostCard, staticEventsHubPage.hostCard),
    attendCard: mapExperienceCard(doc.attendCard, staticEventsHubPage.attendCard),
  };
}

function mapHostEventPage(doc: HostEventPageDoc | null): HostEventPageData {
  if (!doc) {
    return staticHostEventPage;
  }

  return {
    title: doc.title || staticHostEventPage.title,
    body: doc.body || staticHostEventPage.body,
    image: getMediaUrl(doc.heroImage) ?? staticHostEventPage.image,
    imageAlt: doc.heroImageAlt || staticHostEventPage.imageAlt,
    primaryCtaLabel: doc.primaryCtaLabel || staticHostEventPage.primaryCtaLabel,
    primaryCtaHref: doc.primaryCtaHref || staticHostEventPage.primaryCtaHref,
    secondaryCtaLabel:
      doc.secondaryCtaLabel || staticHostEventPage.secondaryCtaLabel,
    secondaryCtaHref:
      doc.secondaryCtaHref || staticHostEventPage.secondaryCtaHref,
  };
}

function mapContactPageHero(doc: ContactPageDoc | null): ContactPageHeroData {
  if (!doc) {
    return staticContactPageHero;
  }

  return {
    headlineLine1: doc.headlineLine1 || staticContactPageHero.headlineLine1,
    headlineLine2: doc.headlineLine2 || staticContactPageHero.headlineLine2,
    intro: doc.intro || staticContactPageHero.intro,
  };
}

export async function getExperiencesPage(): Promise<ExperiencesPageData> {
  try {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({ slug: "experiences-page", depth: 2 });
    return mapExperiencesPage(doc);
  } catch {
    return staticExperiencesPage;
  }
}

export async function getAboutPage(): Promise<AboutPageData> {
  try {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({ slug: "about-page", depth: 2 });
    return mapAboutPage(doc);
  } catch {
    return staticAboutPage;
  }
}

export async function getGalleryPageHero(): Promise<GalleryPageHeroData> {
  try {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({ slug: "gallery-page", depth: 1 });
    return mapGalleryPageHero(doc);
  } catch {
    return staticGalleryPageHero;
  }
}

export async function getEventsHubPage(): Promise<EventsHubPageData> {
  try {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({ slug: "events-hub-page", depth: 2 });
    return mapEventsHubPage(doc);
  } catch {
    return staticEventsHubPage;
  }
}

export async function getHostEventPage(): Promise<HostEventPageData> {
  try {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({ slug: "host-event-page", depth: 2 });
    return mapHostEventPage(doc);
  } catch {
    return staticHostEventPage;
  }
}

export async function getContactPageHero(): Promise<ContactPageHeroData> {
  try {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({ slug: "contact-page", depth: 1 });
    return mapContactPageHero(doc);
  } catch {
    return staticContactPageHero;
  }
}

export type {
  AboutPageData,
  ContactPageHeroData,
  EventsHubPageData,
  ExperiencesPageData,
  GalleryPageHeroData,
  HostEventPageData,
};
