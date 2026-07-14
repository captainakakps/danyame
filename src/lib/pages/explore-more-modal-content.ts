import { pages } from "@/lib/tokens";

export type ExploreMoreDetailRow = {
  label: string;
  value: string;
};

export type ExploreMoreModalContent = {
  description: string;
  detailRows: ExploreMoreDetailRow[];
  includes: string[];
  primaryCtaLabel: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export const exploreMoreModalContentByName: Record<
  string,
  ExploreMoreModalContent
> = {
  Hotel: {
    description:
      "Comfortable accommodation designed for individuals, families, business travellers, and event guests seeking a relaxing stay with quality hospitality and modern amenities.",
    detailRows: [
      { label: "Room Options", value: "Standard, Deluxe & Family Rooms" },
      { label: "Starting From", value: "GHS 450 / Night" },
    ],
    includes: [
      "Air Conditioning",
      "Free Wi-fi",
      "Ensuite Bathroom",
      "Room Service",
    ],
    primaryCtaLabel: "Book a Room",
    primaryCtaHref: pages.contact,
  },
  "Conference Halls": {
    description:
      "Professional spaces designed for conferences, seminars, workshops, and corporate meetings with flexible seating arrangements.",
    detailRows: [
      { label: "Capacity", value: "Up to 300 Guests" },
      { label: "Starting From", value: "GHS 3,500 / Event" },
    ],
    includes: [
      "Air Conditioning",
      "Projector",
      "Sound System",
      "Tables & Chairs",
    ],
    primaryCtaLabel: "Check Availability",
    primaryCtaHref: pages.contact,
  },
  "Aqua Cuisine": {
    description:
      "Enjoy a selection of freshly prepared local and continental dishes crafted with quality ingredients and served in a warm, welcoming dining atmosphere.",
    detailRows: [
      { label: "Opening Hours", value: "Daily - 10:00 AM – 10:00 PM" },
      { label: "Average Spend", value: "From GHS 80 / Person" },
    ],
    includes: [
      "Local & Continental Meals",
      "Chef's Special",
      "Desserts",
      "Fresh Beverages",
    ],
    primaryCtaLabel: "Reserve a Table",
    primaryCtaHref: pages.contact,
  },
  "Night Club": {
    description:
      "Experience exciting nightlife with great music, premium drinks, themed nights, and an energetic atmosphere perfect for unforgettable evenings.",
    detailRows: [
      { label: "Operating Days", value: "Friday & Saturday" },
      { label: "Entry", value: "From GHS 50" },
    ],
    includes: ["Live DJs", "Premium Bar", "VIP Seating", "Special Events"],
    primaryCtaLabel: "Reserve VIP",
    primaryCtaHref: pages.contact,
  },
  "Indoor Event Centre": {
    description:
      "A stylish indoor venue ideal for weddings, conferences, seminars, receptions, birthdays, and private celebrations in a comfortable setting.",
    detailRows: [
      { label: "Capacity", value: "Up to 500 Guests" },
      { label: "Starting From", value: "Contact Us" },
    ],
    includes: [
      "Air Conditioning",
      "Stage Area",
      "Sound System",
      "Seating Arrangement",
    ],
    primaryCtaLabel: "Check Availability",
    primaryCtaHref: pages.contact,
  },
  "Outdoor Event Centre": {
    description:
      "Host memorable outdoor celebrations and large gatherings in a spacious environment designed for weddings, concerts, festivals, and special occasions.",
    detailRows: [
      { label: "Capacity", value: "Up to 1,000 Guests" },
      { label: "Starting From", value: "Contact Us" },
    ],
    includes: [
      "Spacious Grounds",
      "Parking Space",
      "Event Setup Area",
      "Outdoor Lighting",
    ],
    primaryCtaLabel: "Check Availability",
    primaryCtaHref: pages.contact,
  },
  "Astro Turf": {
    description:
      "A professionally maintained playing field suitable for football matches, tournaments, training sessions, and recreational sporting activities.",
    detailRows: [
      { label: "Booking", value: "Hourly Reservations" },
      {
        label: "Starting From",
        value: "Daytime GHS 250 / hour - Nighttime GHS 500 / hour",
      },
    ],
    includes: ["Floodlights", "Changing Area", "Spectator Seating", "Parking"],
    primaryCtaLabel: "Book Now",
    primaryCtaHref: pages.contact,
  },
  "Game Centre": {
    description:
      "Challenge friends and family to a variety of indoor games in a fun-filled environment designed for all ages and group outings.",
    detailRows: [
      { label: "Access", value: "Daily Entry" },
      { label: "Starting From", value: "GHS 30" },
    ],
    includes: ["Snooker", "Table Games", "Arcade Games", "Family-Friendly Space"],
    primaryCtaLabel: "Book a Session",
    primaryCtaHref: pages.contact,
  },
  "Swimming Pool": {
    description:
      "Relax, swim, and unwind in our refreshing pool area, perfect for family outings, weekend relaxation, and private poolside events.",
    detailRows: [
      { label: "Access", value: "Daily" },
      { label: "Entry Fee", value: "GHS 40 for kids and GHS 70 for adults" },
    ],
    includes: [
      "Adult Pool",
      "Kids Pool",
      "Poolside Seating",
      "Changing Rooms",
      "Swimming Lessons",
    ],
    primaryCtaLabel: "Book Access",
    primaryCtaHref: pages.contact,
  },
  "Bar & restaurant": {
    description:
      "Enjoy expertly prepared meals, refreshing cocktails, and a relaxed dining experience perfect for casual outings and social gatherings.",
    detailRows: [
      { label: "Opening Hours", value: "Daily 10:00 AM – Late" },
      { label: "Average Spend", value: "From GHS 60 / Person" },
    ],
    includes: [
      "Full Restaurant Menu",
      "Cocktails & Mocktails",
      "Outdoor Seating",
      "Family Dining",
    ],
    primaryCtaLabel: "View Menu",
    primaryCtaHref: pages.menu,
  },
  "VIP Lounge": {
    description:
      "Enjoy an exclusive lounge experience offering premium comfort, privacy, personalized service, and the perfect setting for intimate gatherings.",
    detailRows: [
      { label: "Access", value: "Reservation Only" },
      { label: "Starting From", value: "Contact Us" },
    ],
    includes: [
      "Private Seating",
      "Bottle Service",
      "Dedicated Host",
      "Exclusive Atmosphere",
      "Free Wi-fi",
    ],
    primaryCtaLabel: "Reserve VIP",
    primaryCtaHref: pages.contact,
  },
};

export function withExploreMoreModalContent<
  T extends { name: string },
>(item: T): T & ExploreMoreModalContent {
  const modal = exploreMoreModalContentByName[item.name];

  if (!modal) {
    return {
      ...item,
      description: "",
      detailRows: [],
      includes: [],
      primaryCtaLabel: "Contact Us",
      primaryCtaHref: pages.contact,
    };
  }

  return { ...item, ...modal };
}
