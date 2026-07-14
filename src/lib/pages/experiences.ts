import { staticHomePage } from "@/lib/pages/home";
import {
  withExploreMoreModalContent,
  type ExploreMoreModalContent,
} from "@/lib/pages/explore-more-modal-content";
import type { FinalCtaData } from "@/lib/pages/shared";
import { pages } from "@/lib/tokens";

export type ExperienceCategory = {
  slug: string;
  label: string;
  title: string;
  description: string;
  image: string;
};

export type ExploreMoreItem = {
  name: string;
  tagline: string;
  image: string;
  imageAlt: string;
  href?: string;
} & ExploreMoreModalContent;

type ExploreMoreItemBase = Omit<ExploreMoreItem, keyof ExploreMoreModalContent>;

export type ExperiencesPageData = {
  hero: {
    image: string;
    title: string;
  };
  tagline: {
    primary: string;
    secondary: string;
  };
  categories: ExperienceCategory[];
  exploreMore: {
    title: string;
    intro: string;
    items: ExploreMoreItem[];
  };
  finalCta: FinalCtaData;
};

const exploreMoreBaseItems: ExploreMoreItemBase[] = [
  {
    name: "Hotel",
    tagline: "Stay & Relax",
    image: "/assets/experiences/explore-more/hotel.jpg",
    imageAlt: "Hotel room at Danyame",
    href: pages.contact,
  },
  {
    name: "Conference Halls",
    tagline: "Business & Events",
    image: "/assets/experiences/explore-more/conference-halls.jpg",
    imageAlt: "Conference hall at Danyame",
    href: pages.contact,
  },
  {
    name: "Aqua Cuisine",
    tagline: "Signature Dining",
    image: "/assets/experiences/explore-more/aqua-cuisine.jpg",
    imageAlt: "Aqua Cuisine dining",
    href: pages.contact,
  },
  {
    name: "Night Club",
    tagline: "Weekend Vibes",
    image: "/assets/experiences/explore-more/night-club.jpg",
    imageAlt: "Night club atmosphere",
    href: pages.contact,
  },
  {
    name: "Indoor Event Centre",
    tagline: "Elegant Celebrations",
    image: "/assets/experiences/explore-more/indoor-event-centre.jpg",
    imageAlt: "Indoor event centre",
    href: pages.contact,
  },
  {
    name: "Outdoor Event Centre",
    tagline: "Large Gatherings",
    image: "/assets/experiences/explore-more/outdoor-event-centre.jpg",
    imageAlt: "Outdoor event centre",
    href: pages.contact,
  },
  {
    name: "Astro Turf",
    tagline: "Football & Recreation",
    image: "/assets/experiences/explore-more/astro-turf.jpg",
    imageAlt: "Astro turf pitch",
    href: pages.contact,
  },
  {
    name: "Game Centre",
    tagline: "Fun for Everyone",
    image: "/assets/experiences/explore-more/game-centre.jpg",
    imageAlt: "Game centre",
    href: pages.contact,
  },
  {
    name: "Swimming Pool",
    tagline: "Cool Off & Unwind",
    image: "/assets/experiences/explore-more/swimming-pool.jpg",
    imageAlt: "Swimming pool",
    href: pages.contact,
  },
  {
    name: "Bar & restaurant",
    tagline: "Food & Cocktails",
    image: "/assets/experiences/explore-more/bar-restaurant.jpg",
    imageAlt: "Bar and restaurant",
    href: pages.contact,
  },
  {
    name: "VIP Lounge",
    tagline: "Premium Experience",
    image: "/assets/experiences/explore-more/vip-lounge.jpg",
    imageAlt: "VIP lounge",
    href: pages.contact,
  },
];

export const staticExperiencesPage: ExperiencesPageData = {
  hero: {
    image: "/assets/experiences/hero.jpg",
    title: "Experiences at Danyame Recreational Village",
  },
  tagline: {
    primary: "Discover ev",
    secondary:
      "erything we offer from events and nightlife to relaxation and recreation.",
  },
  categories: [
    {
      slug: "events",
      label: "Events & Celebrations",
      title: "EVENTS & CELEBRATIONS",
      description:
        "Host unforgettable moments at Danyame. Our versatile spaces are perfect for weddings, parties, corporate events, concerts, and private celebrations. It includes indoor event center, outdoor event space and conference halls",
      image: "/assets/experiences/events.jpg",
    },
    {
      slug: "pool",
      label: "Poolside & Chill",
      title: "POOLSIDE EXPERIENCE",
      description:
        "Unwind by the pool with music, drinks, and a vibrant atmosphere. Whether you're relaxing or socializing, the poolside experience is always alive.",
      image: "/assets/experiences/pool.jpg",
    },
    {
      slug: "food",
      label: "Food & Nightlife",
      title: "FOOD & NIGHTLIFE",
      description:
        "Enjoy a variety of meals, refreshing drinks, and signature cocktails. As the night comes alive, experience our bar, VIP lounge, and nightclub energy.",
      image: "/assets/experiences/food.jpg",
    },
    {
      slug: "games",
      label: "Games & Activities",
      title: "GAMES & ACTIVITIES",
      description:
        "Stay active and entertained with our range of indoor and outdoor activities. Enjoy our premium astro turf and experience variety of game activities.",
      image: "/assets/experiences/games.jpg",
    },
  ],
  exploreMore: {
    title: "Explore More at Danyame",
    intro:
      "Beyond our signature experiences, discover the facilities and services that make every visit more convenient, enjoyable, and memorable. Tap any service to learn more, view pricing, and make an enquiry.",
    items: exploreMoreBaseItems.map(withExploreMoreModalContent),
  },
  finalCta: staticHomePage.finalCta,
};
