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
import { withExploreMoreModalContent } from "@/lib/pages/explore-more-modal-content";
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
        .map((item, index) => {
          const image = getMediaUrl(item.image);
          const slug =
            item.slug ||
            staticExperiencesPage.categories[index]?.slug ||
            item.label?.toLowerCase().replace(/\s+/g, "-");

          if (!slug || !item.label || !item.title || !item.description || !image) {
            return null;
          }

          return {
            slug,
            label: item.label,
            title: item.title,
            description: item.description,
            image,
          };
        })
        .filter((item): item is ExperiencesPageData["categories"][number] => item !== null)
    : staticExperiencesPage.categories;

  const exploreMoreItems: ExperiencesPageData["exploreMore"]["items"] =
    doc.exploreMoreItems?.length
      ? doc.exploreMoreItems.flatMap((item, index) => {
          if (!item.name || !item.tagline) {
            return [];
          }

          const staticItem = staticExperiencesPage.exploreMore.items.find(
            (entry) => entry.name === item.name,
          );

          return [
            withExploreMoreModalContent({
              name: item.name,
              tagline: item.tagline,
              href: item.href || undefined,
              image:
                staticItem?.image ??
                getMediaUrl(item.image) ??
                staticExperiencesPage.exploreMore.items[index]?.image ??
                staticExperiencesPage.exploreMore.items[0].image,
              imageAlt:
                item.imageAlt || staticItem?.imageAlt || item.name,
            }),
          ];
        })
      : [];

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
    exploreMore: {
      title: doc.exploreMoreTitle || staticExperiencesPage.exploreMore.title,
      intro: doc.exploreMoreIntro || staticExperiencesPage.exploreMore.intro,
      items:
        exploreMoreItems.length > 0
          ? exploreMoreItems
          : staticExperiencesPage.exploreMore.items,
    },
    finalCta: mapFinalCta(doc, staticExperiencesPage.finalCta),
  };
}

function mapAboutPage(doc: AboutPageDoc | null): AboutPageData {
  if (!doc) {
    return staticAboutPage;
  }

  const leadershipParagraphs = doc.leadershipParagraphs?.length
    ? doc.leadershipParagraphs
        .map((item) => item.text)
        .filter((text): text is string => Boolean(text))
    : staticAboutPage.leadership.paragraphs;

  const stripImages = doc.stripImages?.length
    ? doc.stripImages
        .map((item, index) => {
          const cmsSrc = getMediaUrl(item.image);
          const fallback = staticAboutPage.stripImages[index];
          const src = cmsSrc ?? fallback?.src;
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
    intro: {
      label: doc.introLabel || staticAboutPage.intro.label,
      welcomeHeading:
        doc.introWelcomeHeading || staticAboutPage.intro.welcomeHeading,
      primaryImage:
        getMediaUrl(doc.introPrimaryImage) ?? staticAboutPage.intro.primaryImage,
      primaryImageAlt:
        doc.introPrimaryImageAlt || staticAboutPage.intro.primaryImageAlt,
      sinceCard: {
        image:
          getMediaUrl(doc.introSinceCardImage) ??
          staticAboutPage.intro.sinceCard.image,
        label:
          doc.introSinceCardLabel || staticAboutPage.intro.sinceCard.label,
        text: doc.introSinceCardText || staticAboutPage.intro.sinceCard.text,
      },
      paragraph: doc.introParagraph || staticAboutPage.intro.paragraph,
    },
    leadership: {
      intro: doc.leadershipIntro || staticAboutPage.leadership.intro,
      image:
        getMediaUrl(doc.leadershipImage) ?? staticAboutPage.leadership.image,
      imageAlt:
        doc.leadershipImageAlt || staticAboutPage.leadership.imageAlt,
      paragraphs:
        leadershipParagraphs.length > 0
          ? leadershipParagraphs
          : staticAboutPage.leadership.paragraphs,
    },
    stripImages:
      stripImages.length > 0 ? stripImages : staticAboutPage.stripImages,
    missionVision: {
      mission: {
        icon:
          getMediaUrl(doc.missionIcon) ??
          staticAboutPage.missionVision.mission.icon,
        title: doc.missionTitle || staticAboutPage.missionVision.mission.title,
        text: doc.missionText || staticAboutPage.missionVision.mission.text,
      },
      vision: {
        icon:
          getMediaUrl(doc.visionIcon) ??
          staticAboutPage.missionVision.vision.icon,
        title: doc.visionTitle || staticAboutPage.missionVision.vision.title,
        text: doc.visionText || staticAboutPage.missionVision.vision.text,
      },
    },
    location: {
      backgroundImage:
        getMediaUrl(doc.locationBackgroundImage) ??
        staticAboutPage.location.backgroundImage,
      pinIcon:
        getMediaUrl(doc.locationPinIcon) ?? staticAboutPage.location.pinIcon,
      text: doc.locationText || staticAboutPage.location.text,
    },
    map: {
      title: doc.mapTitle || staticAboutPage.map.title,
      image: getMediaUrl(doc.mapImage) ?? staticAboutPage.map.image,
      link: doc.mapLink || staticAboutPage.map.link,
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
