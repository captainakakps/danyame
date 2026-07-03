import { pages } from "@/lib/tokens";

export type HomeCategoryItem = {
  title: string;
  image: string;
  href: string;
};

export type HomeGalleryImage = {
  src: string;
  alt: string;
};

export type HomePageData = {
  hero: {
    image: string;
    headline1: string;
    headline2: string;
    headline3: string;
    tagline: string;
    subtext: string;
  };
  everythingYouNeed: {
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
  categories: HomeCategoryItem[];
  aboutTeaser: {
    title: string;
    body: string;
    image: string;
    imageAlt: string;
    ctaLabel: string;
    ctaHref: string;
  };
  events: {
    sectionTitle: string;
    heading: string;
    body: string;
    metaEveryWeek: string;
    metaLocation: string;
    metaVibes: string;
    registerLabel: string;
    registerHref: string;
    countdownLabel: string;
    viewAllLabel: string;
    viewAllHref: string;
    useCmsCountdown: boolean;
  };
  planningEvent: {
    image: string;
    imageAlt: string;
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
  gallery: {
    title: string;
    intro: string;
    useCmsGallery: boolean;
    images: HomeGalleryImage[];
    ctaLabel: string;
    ctaHref: string;
  };
  finalCta: {
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    body: string;
    secondaryLabel: string;
    secondaryHref: string;
    primaryLabel: string;
    primaryHref: string;
  };
};

export type EventCountdown = {
  days: number;
  hours: number;
  minutes: number;
};

export const staticHomePage: HomePageData = {
  hero: {
    image: "/assets/home/hero-bg.jpg",
    headline1: "Relaxation",
    headline2: "Entertainment",
    headline3: "Unforgettable Experiences",
    tagline:
      "Your Ultimate Destination for Relaxation, Entertainment & Unforgettable Experiences",
    subtext:
      "From vibrant nightlife and poolside vibes to unforgettable events and social experiences Danyame Recreational Village is where moments come alive.",
  },
  everythingYouNeed: {
    title: "Everything You Need in One Place",
    body: "Designed to bring people together through a mix of energy, relaxation, and entertainment giving you the freedom to move from one experience to another.",
    ctaLabel: "Learn More",
    ctaHref: pages.experiences,
  },
  categories: [
    {
      title: "Events & Celebrations",
      image: "/assets/experiences/events.jpg",
      href: "/experiences#events",
    },
    {
      title: "Poolside & Chill",
      image: "/assets/experiences/pool.jpg",
      href: "/experiences#pool",
    },
    {
      title: "Food & Nightlife",
      image: "/assets/experiences/food.jpg",
      href: "/experiences#food",
    },
    {
      title: "Games & Activities",
      image: "/assets/experiences/games.jpg",
      href: "/experiences#games",
    },
  ],
  aboutTeaser: {
    title: "A Place Built for People",
    body: "Danyame Recreational Village is a vibrant leisure and entertainment destination located in Akwatia. Designed for individuals, families, and corporate groups, we bring together relaxation, nightlife, and social experiences in one dynamic space.",
    image: "/assets/home/about-building.jpg",
    imageAlt: "Danyame building",
    ctaLabel: "Learn More About US",
    ctaHref: pages.about,
  },
  events: {
    sectionTitle: "Upcoming Events",
    heading: "EXPERIENCES THAT KEEP\nTHE VIBE ALIVE",
    body: "From high energy nights ro chill poolside sessions, something exciting is always happening at Danyame.",
    metaEveryWeek: "Every Week",
    metaLocation: "Akwatia, Eastern Region",
    metaVibes: "Good People Great Vibes",
    registerLabel: "Register",
    registerHref: pages.events,
    countdownLabel: "NEXT EVENT IN",
    viewAllLabel: "View All Events",
    viewAllHref: pages.events,
    useCmsCountdown: true,
  },
  planningEvent: {
    image: "/assets/home/event-thumb.jpg",
    imageAlt: "Planning an event",
    title: "Planning an event?",
    body: "Let us help you create unforgettable memories for any occasion",
    ctaLabel: "Book an Event",
    ctaHref: pages.contact,
  },
  gallery: {
    title: "Moments at Danyame",
    intro: "A glimpse into the experience, energy, and memories created here",
    useCmsGallery: true,
    images: [
      { src: "/assets/home/gallery-1.jpg", alt: "Gallery image 1" },
      { src: "/assets/home/gallery-2.jpg", alt: "Gallery image 2" },
      { src: "/assets/home/gallery-3.jpg", alt: "Gallery image 3" },
      { src: "/assets/home/gallery-4.jpg", alt: "Gallery image 4" },
      { src: "/assets/home/gallery-7.jpg", alt: "Gallery image 5" },
      { src: "/assets/home/gallery-5.jpg", alt: "Gallery image 6" },
      { src: "/assets/home/gallery-6.jpg", alt: "Gallery image 7" },
    ],
    ctaLabel: "View Full Gallery",
    ctaHref: pages.gallery,
  },
  finalCta: {
    line1: "READY",
    line2: "FOR YOUR",
    line3: "NEXT",
    line4: "EXPERIENCE",
    body: "Book your event, plan your visit, or reach out to learn more.",
    secondaryLabel: "Contact Us",
    secondaryHref: pages.contact,
    primaryLabel: "Book an Event",
    primaryHref: pages.contact,
  },
};

export function computeCountdown(target: Date, now = new Date()): EventCountdown {
  const diffMs = Math.max(0, target.getTime() - now.getTime());
  const totalMinutes = Math.floor(diffMs / (1000 * 60));

  return {
    days: Math.floor(totalMinutes / (60 * 24)),
    hours: Math.floor((totalMinutes % (60 * 24)) / 60),
    minutes: totalMinutes % 60,
  };
}
