export type MenuTag =
  | "popular"
  | "new"
  | "spicy"
  | "vegetarian"
  | "alcoholic"
  | "non-alcoholic";

export type MenuItem = {
  slug: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  isFeatured: boolean;
  tags: MenuTag[];
  sortOrder: number;
  categorySlug: string;
};

export type MenuCategory = {
  slug: string;
  name: string;
  description?: string;
  sortOrder: number;
  items: MenuItem[];
};

export type MenuSettingsData = {
  pageTitle: string;
  introText?: string;
  currency: string;
  showUnavailableItems: boolean;
  qrTargetUrl?: string;
};

export const defaultMenuSettings: MenuSettingsData = {
  pageTitle: "Danyame Menu",
  introText: "Food, drinks, and poolside favourites — updated daily.",
  currency: "GH₵",
  showUnavailableItems: false,
};

export const staticMenuCategories: MenuCategory[] = [
  {
    slug: "local-dishes",
    name: "Local Dishes",
    description: "Ghanaian classics made fresh.",
    sortOrder: 0,
    items: [
      {
        slug: "jollof-rice",
        name: "Jollof Rice",
        description: "Smoky party jollof with grilled chicken.",
        price: 65,
        isAvailable: true,
        isFeatured: true,
        tags: ["popular"],
        sortOrder: 0,
        categorySlug: "local-dishes",
      },
      {
        slug: "banku-tilapia",
        name: "Banku & Tilapia",
        description: "Grilled tilapia with spicy pepper sauce.",
        price: 85,
        isAvailable: true,
        isFeatured: false,
        tags: ["spicy"],
        sortOrder: 1,
        categorySlug: "local-dishes",
      },
      {
        slug: "kelewele",
        name: "Kelewele",
        description: "Spiced fried plantain bites.",
        price: 35,
        isAvailable: true,
        isFeatured: false,
        tags: ["vegetarian", "spicy"],
        sortOrder: 2,
        categorySlug: "local-dishes",
      },
    ],
  },
  {
    slug: "grills",
    name: "Grills",
    sortOrder: 1,
    items: [
      {
        slug: "mixed-grill-platter",
        name: "Mixed Grill Platter",
        description: "Beef, chicken, and sausage with sides.",
        price: 120,
        isAvailable: true,
        isFeatured: true,
        tags: ["popular"],
        sortOrder: 0,
        categorySlug: "grills",
      },
      {
        slug: "beef-suya",
        name: "Beef Suya",
        description: "Char-grilled suya skewers with onions.",
        price: 55,
        isAvailable: true,
        isFeatured: false,
        tags: ["spicy"],
        sortOrder: 1,
        categorySlug: "grills",
      },
    ],
  },
  {
    slug: "cocktails",
    name: "Cocktails",
    sortOrder: 2,
    items: [
      {
        slug: "danyame-sunset",
        name: "Danyame Sunset",
        description: "Tequila, passion fruit, and citrus.",
        price: 45,
        isAvailable: true,
        isFeatured: true,
        tags: ["new", "alcoholic"],
        sortOrder: 0,
        categorySlug: "cocktails",
      },
      {
        slug: "poolside-mojito",
        name: "Poolside Mojito",
        description: "Mint, lime, and white rum.",
        price: 40,
        isAvailable: true,
        isFeatured: false,
        tags: ["alcoholic"],
        sortOrder: 1,
        categorySlug: "cocktails",
      },
    ],
  },
  {
    slug: "soft-drinks",
    name: "Soft Drinks",
    sortOrder: 3,
    items: [
      {
        slug: "fresh-coconut",
        name: "Fresh Coconut",
        description: "Chilled whole coconut, cracked to order.",
        price: 20,
        isAvailable: true,
        isFeatured: false,
        tags: ["non-alcoholic"],
        sortOrder: 0,
        categorySlug: "soft-drinks",
      },
      {
        slug: "bottled-water",
        name: "Bottled Water",
        price: 8,
        isAvailable: true,
        isFeatured: false,
        tags: ["non-alcoholic"],
        sortOrder: 1,
        categorySlug: "soft-drinks",
      },
    ],
  },
];

export function getStaticFeaturedMenuItems(
  categories: MenuCategory[],
): MenuItem[] {
  return categories
    .flatMap((category) => category.items)
    .filter((item) => item.isFeatured)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function filterMenuItems(
  items: MenuItem[],
  showUnavailableItems: boolean,
): MenuItem[] {
  if (showUnavailableItems) {
    return items;
  }

  return items.filter((item) => item.isAvailable);
}

export function applyMenuVisibility(
  categories: MenuCategory[],
  showUnavailableItems: boolean,
): MenuCategory[] {
  return categories
    .map((category) => ({
      ...category,
      items: filterMenuItems(category.items, showUnavailableItems),
    }))
    .filter((category) => category.items.length > 0);
}
