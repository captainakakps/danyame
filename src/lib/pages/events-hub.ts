import { pages } from "@/lib/tokens";
import type { ExperienceCardData } from "@/lib/pages/shared";

export type EventsHubPageData = {
  hero: {
    image: string;
    imageAlt: string;
    title: string;
    body: string;
    hostCtaLabel: string;
    hostCtaHref: string;
    attendCtaLabel: string;
    attendCtaHref: string;
  };
  section: {
    title: string;
    intro: string;
  };
  hostCard: ExperienceCardData;
  attendCard: ExperienceCardData;
};

export const staticEventsHubPage: EventsHubPageData = {
  hero: {
    image: "/assets/events/hero.jpg",
    imageAlt: "Elegant event venue at Danyame",
    title: "What Brings You To Danyame?",
    body: "Are you here to host a celebration or join an unforgettable experience? From private events and corporate gatherings to concerts, parties, and special occasions, there's always something worth showing up for.",
    hostCtaLabel: "Host an Event",
    hostCtaHref: pages.hostEvent,
    attendCtaLabel: "Attend an Event",
    attendCtaHref: pages.attendEvent,
  },
  section: {
    title: "Choose Your Experience",
    intro:
      "Whether you're planning an unforgettable event or looking forward to an exciting experience, Danyame is the perfect place for it.",
  },
  hostCard: {
    image: "/assets/events/host-event.jpg",
    imageAlt: "Event hosting venue with elegant table settings",
    title: "Host an Event",
    body: "Looking for the perfect venue for your wedding, birthday, corporate gathering, or private celebration? Find available dates and reserve your space.",
    ctaLabel: "Book an Event",
    ctaHref: pages.hostEvent,
  },
  attendCard: {
    image: "/assets/events/attend-event.jpg",
    imageAlt: "Exciting event performance",
    title: "Attend an Event",
    body: "Discover upcoming concerts, parties, special performances, and exclusive experiences happening at Danyame. We create wonderful moments here.",
    ctaLabel: "Attend an Event",
    ctaHref: pages.attendEvent,
  },
};
