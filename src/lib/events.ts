export interface FeaturedEvent {
  title: string;
  slug?: string;
  image: string;
  location: string;
  description: string;
  dateCard: {
    month: string;
    day: string;
    time: string;
  };
  hasTickets: boolean;
}

export interface Event {
  slug: string;
  title: string;
  date: string;
  month: string;
  time: string;
  location: string;
  shortSummary: string;
  description: string;
  image: string;
  hasTickets: boolean;
  ticketLabel?: string;
}

/** Highlighted on the Attend Event page hero */
export const featuredEventSlug = "the-social-table";

export const events: Event[] = [
  {
    slug: "the-social-table",
    title: "The Social Table",
    date: "26 July 2026",
    month: "July, 2026",
    time: "2:00 PM",
    location: "Outdoor Lounge, Danyame",
    shortSummary:
      "A shared dining experience built around good food, live conversation, and connection.",
    description:
      "A shared dining experience built around good food, live conversation, and the kind of energy only Danyame can bring. Pull up a seat, meet new people, and enjoy a curated afternoon of food, music, and connection.",
    image: "/assets/attend-event/featured.jpg",
    hasTickets: true,
    ticketLabel: "TICKETS & INFO",
  },
  {
    slug: "afro-vibes-live",
    title: "Afro Vibes Live",
    date: "2 August 2026",
    month: "August, 2026",
    time: "7:00 PM",
    location: "Main Event Grounds",
    shortSummary:
      "An open-air night of Afrobeat, live DJs, and high-energy performances under the stars.",
    description:
      "Afro Vibes Live brings together live bands, DJs, and dancers for a night rooted in rhythm and culture. Expect bold sounds, great food, and a crowd that knows how to move from the first beat to the last.",
    image: "/assets/attend-event/event-1.jpg",
    hasTickets: true,
    ticketLabel: "TICKETS & INFO",
  },
  {
    slug: "sunset-sessions",
    title: "Sunset Sessions",
    date: "15 August 2026",
    month: "August, 2026",
    time: "5:30 PM",
    location: "Outdoor Lounge, Danyame",
    shortSummary:
      "Chill poolside sets, golden-hour views, and relaxed vibes as the sun goes down.",
    description:
      "Sunset Sessions is Danyame at its most laid-back — curated playlists, poolside lounging, and cocktails served as the sky turns gold. Perfect for unwinding with friends after a long week.",
    image: "/assets/attend-event/event-2.jpg",
    hasTickets: true,
    ticketLabel: "TICKETS & INFO",
  },
  {
    slug: "game-night",
    title: "Game Night",
    date: "22 August 2026",
    month: "August, 2026",
    time: "6:00 PM",
    location: "Game Center, Danyame",
    shortSummary:
      "Board games, trivia, and friendly competition for groups of all sizes.",
    description:
      "Game Night turns up the fun with trivia rounds, classic board games, and team challenges designed to get everyone involved. Bring your crew or join a table — either way, expect plenty of laughs.",
    image: "/assets/attend-event/event-3.jpg",
    hasTickets: true,
    ticketLabel: "TICKETS & INFO",
  },
  {
    slug: "summer-splash",
    title: "Summer Splash",
    date: "15 September 2026",
    month: "September, 2026",
    time: "2:00 PM",
    location: "Poolside Arena, Danyame",
    shortSummary:
      "A pool party with music, games, and all-day summer energy by the water.",
    description:
      "Summer Splash is the ultimate poolside party — live DJs, water games, cold drinks, and nonstop sunshine. Whether you're swimming or lounging, this is Danyame's signature summer experience.",
    image: "/assets/attend-event/event-4.jpg",
    hasTickets: true,
    ticketLabel: "TICKETS & INFO",
  },
  {
    slug: "danyame-live",
    title: "Danyame Live",
    date: "21 September 2026",
    month: "September, 2026",
    time: "7:30 PM",
    location: "Outdoor Lounge, Danyame",
    shortSummary:
      "Live bands and acoustic sets in an intimate outdoor setting.",
    description:
      "Danyame Live spotlights local and visiting artists in an open-air lounge setting. Grab a drink, find a spot, and enjoy an evening of live music built around connection and great atmosphere.",
    image: "/assets/attend-event/event-5.jpg",
    hasTickets: false,
    ticketLabel: "INFO",
  },
  {
    slug: "friday-vibez",
    title: "Friday Vibez",
    date: "2 October 2026",
    month: "October, 2026",
    time: "8:00 PM",
    location: "Danyame Recreational Village",
    shortSummary:
      "Weekly Friday nightlife with DJs, drinks, and the best weekend kickoff in town.",
    description:
      "Friday Vibez is how Danyame starts the weekend — high-energy DJs, signature cocktails, and a crowd ready to celebrate. If you're looking for the pulse of the village on a Friday night, this is it.",
    image: "/assets/attend-event/event-6.jpg",
    hasTickets: false,
    ticketLabel: "INFO",
  },
];

export const featuredEvent: FeaturedEvent = (() => {
  const event = events.find((e) => e.slug === featuredEventSlug)!;
  return {
    title: event.title,
    slug: event.slug,
    image: event.image,
    location: event.location,
    description: event.description,
    dateCard: { month: "JUL", day: "26", time: "2PM" },
    hasTickets: event.hasTickets,
  };
})();

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((event) => event.slug === slug);
}

export function getEventsByMonth(): { month: string; events: Event[] }[] {
  const months = [...new Set(events.map((event) => event.month))];
  return months.map((month) => ({
    month,
    events: events.filter((event) => event.month === month),
  }));
}

export function getEventPath(slug: string): string {
  return `/events/${slug}`;
}
