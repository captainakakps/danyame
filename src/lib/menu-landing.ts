import type { MenuCategory } from "@/lib/menu";

export type MenuLandingCategory = {
  slug: string;
  name: string;
  cardDescription: string;
  cardImage: string;
};

export const menuLandingIntro = {
  title: "Discover Our Menu",
  description:
    "From authentic Ghanaian favourites to grilled specialties, seafood, refreshing drinks, and sweet treats, explore everything our kitchen has prepared for you.",
};

export const menuHeroTitle = "What are you craving today?";

export const menuHeroStrip: {
  slug: string;
  label: string;
  image: string;
  tall: boolean;
}[] = [
  {
    slug: "vegan-corner",
    label: "Vegan Corner",
    image: "/assets/menu/hero/vegan-corner.jpg",
    tall: true,
  },
  {
    slug: "dessert",
    label: "Dessert",
    image: "/assets/menu/hero/dessert.jpg",
    tall: false,
  },
  {
    slug: "pizza",
    label: "Pizza",
    image: "/assets/menu/hero/pizza.jpg",
    tall: true,
  },
  {
    slug: "local-dishes",
    label: "Local Dishes",
    image: "/assets/menu/hero/local-dishes.jpg",
    tall: false,
  },
  {
    slug: "spag-and-pas",
    label: "Spag and Pasta",
    image: "/assets/menu/hero/spag-pasta.jpg",
    tall: true,
  },
];

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
];

const landingBySlug = new Map(
  menuLandingCategories.map((category) => [category.slug, category]),
);

export function getLandingCategory(slug: string): MenuLandingCategory | undefined {
  return landingBySlug.get(slug);
}

export function getLandingDisplayName(slug: string, fallback: string): string {
  return landingBySlug.get(slug)?.name ?? fallback;
}

export function getLandingCardImage(slug: string): string | undefined {
  return landingBySlug.get(slug)?.cardImage;
}

export function buildLandingCategories(
  categories: MenuCategory[],
): MenuLandingCategory[] {
  const categorySlugs = new Set(categories.map((category) => category.slug));

  return menuLandingCategories.filter((landing) => categorySlugs.has(landing.slug));
}
