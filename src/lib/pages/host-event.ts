import { pages } from "@/lib/tokens";
import { staticEventsHubPage } from "@/lib/pages/events-hub";

export type HostEventPageData = {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export const staticHostEventPage: HostEventPageData = {
  title: "Host an Event",
  body: "Looking for the perfect venue for your wedding, birthday, corporate gathering, or private celebration? Find available dates and reserve your space at Danyame Recreational Village.",
  image: staticEventsHubPage.hostCard.image,
  imageAlt: staticEventsHubPage.hostCard.imageAlt,
  primaryCtaLabel: "Book an Event",
  primaryCtaHref: pages.contact,
  secondaryCtaLabel: "View All Events",
  secondaryCtaHref: pages.events,
};
