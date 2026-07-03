export type GalleryImage = {
  src: string;
  alt: string;
};

export type GalleryRow = GalleryImage[];

export type GallerySet = {
  rows: [GalleryRow, GalleryRow, GalleryRow];
};

export type GalleryCategoryData = {
  name: string;
  slug: string;
  sortOrder: number;
  set: GallerySet | null;
};

export const staticGalleryCategories: GalleryCategoryData[] = [
  {
    name: "Events & Celebrations",
    slug: "events-celebrations",
    sortOrder: 0,
    set: {
      rows: [
        [
          { src: "/assets/gallery/events/1.jpg", alt: "Stage performance" },
          { src: "/assets/gallery/events/2.jpg", alt: "Event guests" },
        ],
        [
          { src: "/assets/gallery/events/3.jpg", alt: "Family gathering" },
          { src: "/assets/gallery/events/4.jpg", alt: "Star decoration" },
          { src: "/assets/gallery/events/5.jpg", alt: "Event setup" },
        ],
        [
          { src: "/assets/gallery/events/6.jpg", alt: "Outdoor dining" },
          { src: "/assets/gallery/events/7.jpg", alt: "Camping at night" },
        ],
      ],
    },
  },
  {
    name: "Pool",
    slug: "pool",
    sortOrder: 1,
    set: {
      rows: [
        [
          { src: "/assets/gallery/pool/1.jpg", alt: "Pool area overview" },
          { src: "/assets/gallery/pool/2.jpg", alt: "Covered seating" },
        ],
        [
          { src: "/assets/gallery/pool/3.jpg", alt: "Pool view" },
          { src: "/assets/gallery/pool/4.jpg", alt: "Poolside lounge" },
          { src: "/assets/gallery/pool/5.jpg", alt: "Green roof structure" },
        ],
        [
          { src: "/assets/gallery/pool/6.jpg", alt: "Pool and jacuzzi" },
          { src: "/assets/gallery/pool/7.jpg", alt: "Main building" },
        ],
      ],
    },
  },
  {
    name: "Food & Nightlife",
    slug: "food-nightlife",
    sortOrder: 2,
    set: {
      rows: [
        [
          { src: "/assets/gallery/food/1.jpg", alt: "Restaurant interior" },
          { src: "/assets/gallery/food/2.jpg", alt: "Bar seating" },
        ],
        [
          { src: "/assets/gallery/food/3.jpg", alt: "Drinks display" },
          { src: "/assets/gallery/food/4.jpg", alt: "Ambient lighting" },
          { src: "/assets/gallery/food/5.jpg", alt: "Wall mural" },
        ],
        [
          { src: "/assets/gallery/food/6.jpg", alt: "Grilled dishes" },
          { src: "/assets/gallery/food/7.jpg", alt: "Wine collection" },
        ],
      ],
    },
  },
  {
    name: "Games",
    slug: "games",
    sortOrder: 3,
    set: {
      rows: [
        [
          { src: "/assets/gallery/games/1.jpg", alt: "Game room" },
          { src: "/assets/gallery/games/2.jpg", alt: "Football field" },
        ],
        [
          { src: "/assets/gallery/games/3.jpg", alt: "Outdoor swings" },
          { src: "/assets/gallery/games/4.jpg", alt: "Soccer pitch" },
          { src: "/assets/gallery/games/5.jpg", alt: "Kids playground" },
        ],
        [
          { src: "/assets/gallery/games/6.jpg", alt: "Playground equipment" },
          { src: "/assets/gallery/games/7.jpg", alt: "Kids vehicles" },
        ],
      ],
    },
  },
  {
    name: "Outdoor",
    slug: "outdoor",
    sortOrder: 4,
    set: {
      rows: [
        [
          {
            src: "/assets/gallery/outdoor/1.jpg",
            alt: "Main building exterior",
          },
          { src: "/assets/gallery/outdoor/2.jpg", alt: "Outdoor seating" },
        ],
        [
          { src: "/assets/gallery/outdoor/3.jpg", alt: "Colorful staircase" },
          { src: "/assets/gallery/outdoor/4.jpg", alt: "Garden walkway" },
          { src: "/assets/gallery/outdoor/5.jpg", alt: "Gazebo shelters" },
        ],
        [
          { src: "/assets/gallery/outdoor/6.jpg", alt: "Covered dining area" },
          { src: "/assets/gallery/outdoor/7.jpg", alt: "Restaurant terrace" },
        ],
      ],
    },
  },
];

export function buildGallerySet(images: GalleryImage[]): GallerySet | null {
  if (images.length < 7) {
    return null;
  }

  return {
    rows: [
      [images[0], images[1]],
      [images[2], images[3], images[4]],
      [images[5], images[6]],
    ],
  };
}

export function flattenGallerySet(set: GallerySet): GalleryImage[] {
  return set.rows.flat();
}
