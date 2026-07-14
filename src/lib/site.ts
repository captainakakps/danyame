import { pages } from "@/lib/tokens";

export const site = {
  name: "Danyame Recreational Village",
  shortName: "Danyame",
  location: "Akwatia, Eastern Region, Ghana",

  contact: {
    email: "danyamerecreationalvillage@gmail.com",
    phone: "+233 55 364 7512",
    phoneHref: "tel:+233553647512",
    secondaryPhone: "+233 55 383 7811",
    secondaryPhoneHref: "tel:+233553837811",
    whatsappHref: "https://wa.me/233553837811",
    whatsappLabel: "(click to chat on whatsapp)",
  },

  social: [
    { label: "X", href: "https://x.com/danyamevillage" },
    { label: "Instagram", href: "https://instagram.com/danyamevillage" },
    { label: "Facebook", href: "https://facebook.com/danyamevillage" },
    { label: "Tik Tok", href: "https://tiktok.com/@danyamevillage" },
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

  openingHours: [
    { label: "Mon - Fri", hours: "08:00 - 23:00" },
    { label: "Sat - Sun", hours: "10:00 - 20:00" },
  ],
} as const;

export type OpeningHoursRow = {
  label: string;
  hours: string;
};

export type SiteConfig = {
  name: string;
  shortName: string;
  location: string;
  contact: {
    email: string;
    phone: string;
    phoneHref: string;
    secondaryPhone?: string;
    secondaryPhoneHref?: string;
    whatsappHref?: string;
    whatsappLabel?: string;
  };
  social: { label: string; href: string }[];
  exploreLinks: { label: string; href: string }[];
  copyrightYear: number;
  openingHours: OpeningHoursRow[];
  logoUrl?: string;
  logoDarkUrl?: string;
};
