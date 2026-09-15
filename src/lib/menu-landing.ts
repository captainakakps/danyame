import type { MenuCategory } from "@/lib/menu";

export type MenuLandingCategory = {
  slug: string;
  name: string;
  cardDescription: string;
  cardImage: string;
};

export const menuHeroTitle = "What are you craving today?";

export const menuPopularSubtitle = "Explore our popular categories";

/** The three categories highlighted under the hero. */
export const menuPopularCategorySlugs = [
  "local-dishes",
  "pizza",
  "sauces",
] as const;

export const menuServiceTiers = ["Regular", "VIP"] as const;
export type MenuServiceTier = (typeof menuServiceTiers)[number];

export const menuSortLabel = "Recommended";

/** Category shown when the visitor lands on /menu without picking one. */
export const menuDefaultCategorySlug = "pizza";

/** Last-resort card image when CMS and presets have no artwork. */
export const DEFAULT_MENU_CARD_IMAGE = "/assets/menu/cards/local-dishes.jpg";

/** Static fallbacks for card image/description — CMS data takes priority. */
export const menuLandingCategories: MenuLandingCategory[] = [
  {
    slug: "local-dishes",
    name: "Local Dishes",
    cardDescription: "Traditional Ghanaian meals prepared with authentic flavours.",
    cardImage: "/assets/menu/cards/local-dishes.jpg",
  },
  {
    slug: "pizza",
    name: "Pizza",
    cardDescription: "Freshly baked pizzas with premium toppings and bold flavours.",
    cardImage: "/assets/menu/cards/pizza.jpg",
  },
  {
    slug: "sauces",
    name: "Sauces",
    cardDescription: "Rich, flavourful sauces to complement every meal.",
    cardImage: "/assets/menu/cards/sauces.jpg",
  },
  {
    slug: "snacks",
    name: "Snacks",
    cardDescription: "Quick bites perfect for every craving and occasion.",
    cardImage: "/assets/menu/cards/snacks.jpg",
  },
  {
    slug: "dessert",
    name: "Dessert",
    cardDescription: "Sweet and savory treats to finish every meal perfectly.",
    cardImage: "/assets/menu/cards/dessert.jpg",
  },
  {
    slug: "with-a-twist",
    name: "With a Twist",
    cardDescription: "Creative signature dishes with a unique Danyame touch.",
    cardImage: "/assets/menu/cards/with-a-twist.jpg",
  },
  {
    slug: "pan-and-grill",
    name: "Pan and Grill",
    cardDescription: "Perfectly grilled meats and seafood, made to order.",
    cardImage: "/assets/menu/cards/pan-and-grill.jpg",
  },
  {
    slug: "salads",
    name: "Salad",
    cardDescription: "Fresh salads made with crisp, wholesome ingredients.",
    cardImage: "/assets/menu/cards/salads.jpg",
  },
  {
    slug: "sides",
    name: "Sides",
    cardDescription: "Delicious extras to complete your favourite meal.",
    cardImage: "/assets/menu/cards/sides.jpg",
  },
  {
    slug: "house-special",
    name: "House Special",
    cardDescription: "Our chef's signature dishes, crafted with care.",
    cardImage: "/assets/menu/cards/house-special.jpg",
  },
  {
    slug: "vegan-corner",
    name: "Vegan Corner",
    cardDescription: "Fresh plant-based meals full of natural flavour.",
    cardImage: "/assets/menu/cards/vegan-corner.jpg",
  },
  {
    slug: "wrap-and-sandwich",
    name: "Sandwich",
    cardDescription: "Freshly prepared sandwiches with delicious fillings.",
    cardImage: "/assets/menu/cards/sandwich.jpg",
  },
  {
    slug: "spag-and-pas",
    name: "Spag and Pasta",
    cardDescription: "Classic pasta dishes served with rich, savoury sauces.",
    cardImage: "/assets/menu/cards/spag-and-pas.jpg",
  },
  {
    slug: "drv-dishes",
    name: "DRV Dishes",
    cardDescription: "Exclusive Danyame recipes inspired by local flavours.",
    cardImage: "/assets/menu/cards/drv-dishes.jpg",
  },
  {
    slug: "drinks",
    name: "Drinks",
    cardDescription: "Refreshing beverages to pair with every meal.",
    cardImage: "/assets/menu/cards/drinks.jpg",
  },
  {
    slug: "sea-food",
    name: "Sea food",
    cardDescription: "Fresh seafood dishes prepared with bold coastal flavours.",
    cardImage: "/assets/menu/cards/pan-and-grill.jpg",
  },
  {
    slug: "fufu-konkonte",
    name: "Fufu / Konkonte",
    cardDescription: "Traditional fufu and konkonte served with hearty soups and stews.",
    cardImage: "/assets/menu/cards/local-dishes.jpg",
  },
  {
    slug: "regular",
    name: "Regular",
    cardDescription: "Everyday favourites from our regular menu selection.",
    cardImage: DEFAULT_MENU_CARD_IMAGE,
  },
  {
    slug: "assorted-dishes",
    name: "Assorted Dishes",
    cardDescription: "A varied selection of dishes to suit different tastes.",
    cardImage: DEFAULT_MENU_CARD_IMAGE,
  },
];

const landingBySlug = new Map(
  menuLandingCategories.map((category) => [category.slug, category]),
);

export function getLandingCategory(slug: string): MenuLandingCategory | undefined {
  return landingBySlug.get(slug);
}

export function getLandingDisplayName(_slug: string, fallback: string): string {
  return fallback;
}

export function getLandingCardImage(slug: string): string | undefined {
  return landingBySlug.get(slug)?.cardImage;
}

/**
 * Full-bleed photography. Card and item artwork is a circular crop on a flat
 * background, so the rectangular panels in the menu design prefer these.
 */
const menuCategoryPhotos: Record<string, string> = {
  dessert: "/assets/menu/hero/dessert.jpg",
  "local-dishes": "/assets/menu/hero/local-dishes.jpg",
  pizza: "/assets/menu/hero/pizza.jpg",
  "spag-and-pas": "/assets/menu/hero/spag-pasta.jpg",
  "vegan-corner": "/assets/menu/hero/vegan-corner.jpg",
};

export type MenuCategoryPhoto = {
  src: string;
  /** True when the source is a circular crop and needs zooming past the ring. */
  isCircularCrop: boolean;
};

export function getCategoryPhoto(category: MenuCategory): MenuCategoryPhoto {
  const photo = menuCategoryPhotos[category.slug];

  if (photo) {
    return { src: photo, isCircularCrop: false };
  }

  return { src: getCategoryCardImage(category), isCircularCrop: true };
}

export function getCategoryCardImage(category: MenuCategory): string {
  return (
    category.image ??
    getLandingCardImage(category.slug) ??
    category.items.find((item) => item.image)?.image ??
    DEFAULT_MENU_CARD_IMAGE
  );
}

export function resolveDefaultMenuCategory(
  categories: MenuCategory[],
): MenuCategory | null {
  return (
    categories.find((category) => category.slug === menuDefaultCategorySlug) ??
    categories[0] ??
    null
  );
}
