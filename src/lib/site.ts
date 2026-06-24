import { pages } from "@/lib/tokens";

export const site = {
  name: "Danyame Recreational Village",
  shortName: "Danyame",
  location: "Akwatia, Eastern Region, Ghana",

  contact: {
    email: "danyamevillage@gmail.com",
    phone: "+233 24 894 9895",
    phoneHref: "tel:+233248949895",
  },

  social: [
    { label: "X", href: "https://x.com/danyamevillage" },
    { label: "Instagram", href: "https://instagram.com/danyamevillage" },
    { label: "Facebook", href: "https://facebook.com/danyamevillage" },
  ],

  exploreLinks: [
    { label: "Home", href: pages.home },
    { label: "Experiences", href: pages.experiences },
    { label: "Gallery", href: pages.gallery },
    { label: "About Us", href: pages.about },
    { label: "Events", href: pages.events },
    { label: "Contact", href: pages.contact },
  ],

  copyrightYear: 2026,
} as const;

export type SiteConfig = typeof site;
