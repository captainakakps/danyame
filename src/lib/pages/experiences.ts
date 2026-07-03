import { pages } from "@/lib/tokens";
import { staticHomePage } from "@/lib/pages/home";
import type { FinalCtaData } from "@/lib/pages/shared";

export type ExperienceCategory = {
  label: string;
  title: string;
  description: string;
  image: string;
};

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
  finalCta: FinalCtaData;
};

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
      label: "Events & Celebrations",
      title: "EVENTS & CELEBRATIONS",
      description:
        "Host unforgettable moments at Danyame. Our versatile spaces are perfect for weddings, parties, corporate events, concerts, and private celebrations. It includes indoor event center, outdoor event space and conference halls",
      image: "/assets/experiences/events.jpg",
    },
    {
      label: "Poolside & Chill",
      title: "POOLSIDE EXPERIENCE",
      description:
        "Unwind by the pool with music, drinks, and a vibrant atmosphere. Whether you're relaxing or socializing, the poolside experience is always alive.",
      image: "/assets/experiences/pool.jpg",
    },
    {
      label: "Food & Nightlife",
      title: "FOOD & NIGHTLIFE",
      description:
        "Enjoy a variety of meals, refreshing drinks, and signature cocktails. As the night comes alive, experience our bar, VIP lounge, and nightclub energy.",
      image: "/assets/experiences/food.jpg",
    },
    {
      label: "Games & Activities",
      title: "GAMES & ACTIVITIES",
      description:
        "Stay active and entertained with our range of indoor and outdoor activities. Enjoy our premium astro turf and experience variety of game activities.",
      image: "/assets/experiences/games.jpg",
    },
  ],
  finalCta: staticHomePage.finalCta,
};
