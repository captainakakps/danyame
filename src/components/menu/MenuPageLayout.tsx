"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import Image from "next/image";

import Navbar from "@/components/Navbar";
import {
  formatMenuDisplayPrice,
  getMenuItemDisplayPrice,
  type MenuCategory,
  type MenuItem,
  type MenuSettingsData,
} from "@/lib/menu";
import {
  getCategoryPhoto,
  menuHeroTitle,
  menuPopularCategorySlugs,
  menuPopularSubtitle,
  menuServiceTiers,
  menuSortLabel,
  type MenuServiceTier,
} from "@/lib/menu-landing";
import { site } from "@/lib/site";
import { pages } from "@/lib/tokens";

const headingFont = { fontFamily: "var(--font-heading)" } as const;
const bodyFont = { fontFamily: "var(--font-body)" } as const;

/** Page background — the menu is the only surface using this warm orange. */
const MENU_ORANGE = "#e87d26";

type MenuPageLayoutProps = Readonly<{
  categories: MenuCategory[];
  initialSlug: string | null;
  settings: MenuSettingsData;
}>;

type SelectCategory = (
  event: MouseEvent<HTMLAnchorElement>,
  slug: string,
) => void;

type MenuSort = "recommended" | "price-desc" | "price-asc";

const menuSortOptions: ReadonlyArray<Readonly<{
  label: string;
  value: MenuSort;
}>> = [
  { label: menuSortLabel, value: "recommended" },
  { label: "Price: high to low", value: "price-desc" },
  { label: "Price: low to high", value: "price-asc" },
];

/** Let the browser handle new-tab, download and middle-click gestures. */
function isModifiedClick(event: MouseEvent<HTMLAnchorElement>): boolean {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

function PopularCategoryCard({
  category,
  onSelect,
}: Readonly<{ category: MenuCategory; onSelect: SelectCategory }>) {
  const photo = getCategoryPhoto(category);

  return (
    <a
      href={`${pages.menu}/${category.slug}`}
      onClick={(event) => onSelect(event, category.slug)}
      className="group relative block h-[200px] w-[260px] shrink-0 overflow-hidden rounded-[24px] bg-[#785538] sm:h-[240px] sm:w-[320px] lg:h-[279px] lg:w-auto lg:flex-1"
    >
      <Image
        src={photo.src}
        alt=""
        fill
        sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 33vw"
        className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
          photo.isCircularCrop ? "scale-[1.45] group-hover:scale-[1.52]" : ""
        }`}
      />
      <span className="absolute inset-0 bg-black/[0.32]" aria-hidden />
      <span
        className="absolute bottom-[24px] left-[24px] text-[24px] font-medium leading-[0.96] text-white lg:bottom-[30px] lg:left-[32px] lg:text-[32px]"
        style={headingFont}
      >
        {category.name}
      </span>
    </a>
  );
}

function Chip({
  label,
  isActive = false,
  onClick,
}: Readonly<{
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}>) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      className={`flex shrink-0 items-center justify-center gap-[10px] rounded-[1000px] border-[1.5px] border-white px-6 py-3 text-base leading-none text-white lg:px-8 lg:py-4 lg:text-[20px] ${
        isActive ? "bg-rust" : "bg-transparent hover:bg-white/10"
      }`}
      style={headingFont}
    >
      {label}
    </button>
  );
}

function SortControl({
  value,
  onChange,
}: Readonly<{
  value: MenuSort;
  onChange: (value: MenuSort) => void;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeOption =
    menuSortOptions.find((option) => option.value === value) ??
    menuSortOptions[0];

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative shrink-0" ref={containerRef}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center justify-center gap-[10px] rounded-[1000px] border-[1.5px] border-white px-6 py-3 text-base leading-none text-white transition-colors hover:bg-white/10 lg:px-8 lg:py-4 lg:text-[20px]"
        style={headingFont}
      >
        {activeOption.label}
        <svg
          className={`size-5 transition-transform lg:size-6 ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen ? (
        <div
          role="menu"
          aria-label="Sort menu items"
          className="absolute right-0 top-[calc(100%+10px)] z-20 flex min-w-[246px] flex-col gap-[10px] rounded-[12px] bg-rust px-6 py-4 shadow-lg"
        >
          {menuSortOptions.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="flex w-full items-center justify-between gap-4 py-1 text-left text-[20px] leading-none text-white"
                style={headingFont}
              >
                {option.label}
                {isSelected ? (
                  <Image
                    src="/assets/menu/filter-check.svg"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden
                    className="size-6 shrink-0"
                  />
                ) : (
                  <span className="size-6 shrink-0" aria-hidden />
                )}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function getLowestMenuPrice(price: MenuItem["price"]): number | null {
  if (typeof price === "number") return price;

  const amounts = price
    .match(/\d+(?:,\d{3})*(?:\.\d+)?/g)
    ?.map((amount) => Number(amount.replaceAll(",", "")))
    .filter(Number.isFinite);

  return amounts?.length ? Math.min(...amounts) : null;
}

function sortMenuItems(
  items: MenuItem[],
  sort: MenuSort,
  tier: MenuServiceTier,
): MenuItem[] {
  const sortedItems = [...items];

  if (sort === "recommended") {
    return sortedItems.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  return sortedItems.sort((a, b) => {
    const aPrice = getLowestMenuPrice(getMenuItemDisplayPrice(a, tier));
    const bPrice = getLowestMenuPrice(getMenuItemDisplayPrice(b, tier));

    if (aPrice === null) return bPrice === null ? a.sortOrder - b.sortOrder : 1;
    if (bPrice === null) return -1;

    const priceDifference =
      sort === "price-desc" ? bPrice - aPrice : aPrice - bPrice;
    return priceDifference || a.sortOrder - b.sortOrder;
  });
}

function CategorySidebar({
  categories,
  activeCategory,
  onSelect,
}: Readonly<{
  categories: MenuCategory[];
  activeCategory: MenuCategory;
  onSelect: SelectCategory;
}>) {
  const photo = getCategoryPhoto(activeCategory);

  return (
    <nav
      aria-label="Menu categories"
      className="flex w-full shrink-0 flex-col gap-3 rounded-[12px] bg-rust p-4 sm:p-6 lg:w-[434px]"
    >
      <div className="relative h-[220px] w-full overflow-hidden rounded-[8px] bg-white sm:h-[300px] lg:h-[386px]">
        <Image
          key={photo.src}
          src={photo.src}
          alt={activeCategory.name}
          fill
          sizes="(max-width: 1024px) 100vw, 434px"
          className={`object-cover ${photo.isCircularCrop ? "scale-[1.45]" : ""}`}
        />
      </div>

      {/* Every category keeps a fixed slot so picking one never reflows the list. */}
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => {
          const isActive = category.slug === activeCategory.slug;

          return (
            <a
              key={category.slug}
              href={`${pages.menu}/${category.slug}`}
              onClick={(event) => onSelect(event, category.slug)}
              aria-current={isActive ? "true" : undefined}
              className={`shrink-0 whitespace-nowrap rounded-[8px] px-6 py-4 text-[18px] uppercase leading-none transition-colors lg:text-[24px] ${
                isActive
                  ? "bg-[#e87d26]/80 font-medium text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
              style={headingFont}
            >
              {category.name}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

function MenuItemRow({
  item,
  currency,
  tier,
}: Readonly<{ item: MenuItem; currency: string; tier: MenuServiceTier }>) {
  return (
    <article className={`flex flex-col gap-3 lg:gap-4 ${item.isAvailable ? "" : "opacity-50"}`}>
      <div className="flex items-baseline justify-between gap-4 lg:gap-6">
        <h2
          className="text-[22px] uppercase leading-none text-white sm:text-[26px] lg:text-[32px]"
          style={headingFont}
        >
          {item.name}
        </h2>
        <p
          className="shrink-0 whitespace-nowrap text-[16px] font-medium leading-none text-white lg:text-[24px]"
          style={headingFont}
        >
          {formatMenuDisplayPrice(getMenuItemDisplayPrice(item, tier), currency)}
        </p>
      </div>
      {item.description ? (
        <p
          className="text-[15px] leading-[1.2] text-white/80 sm:text-base lg:text-[20px]"
          style={bodyFont}
        >
          {item.description}
        </p>
      ) : null}
    </article>
  );
}

/** Reads the active category slug out of a /menu or /menu/[slug] pathname. */
function slugFromPathname(pathname: string): string | null {
  const match = /^\/menu\/([^/]+)\/?$/.exec(pathname);
  return match ? match[1] : null;
}

export default function MenuPageLayout({
  categories,
  initialSlug,
  settings,
}: MenuPageLayoutProps) {
  const [activeSlug, setActiveSlug] = useState(initialSlug);
  const [menuSort, setMenuSort] = useState<MenuSort>("recommended");
  const [serviceTier, setServiceTier] = useState<MenuServiceTier>("Regular");
  const menuListRef = useRef<HTMLDivElement>(null);

  const scrollMenuListIntoView = useCallback(() => {
    menuListRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, []);

  // Category switching is local state so only the panel and list change. The
  // URL is kept in sync directly so deep links and the back button still work.
  const selectCategory = useCallback<SelectCategory>((event, slug) => {
    if (isModifiedClick(event)) return;

    event.preventDefault();
    setActiveSlug(slug);
    window.history.pushState(null, "", `${pages.menu}/${slug}`);
    scrollMenuListIntoView();
  }, [scrollMenuListIntoView]);

  useEffect(() => {
    const syncFromLocation = () => {
      setActiveSlug(slugFromPathname(window.location.pathname) ?? initialSlug);
    };

    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, [initialSlug]);

  const activeCategory =
    categories.find((category) => category.slug === activeSlug) ??
    categories[0] ??
    null;

  // Switching categories skips the route render, so the tab title is ours to keep
  // in step with the URL. Mirrors the title template in the site layout.
  const activeCategoryName = activeCategory?.name;
  useEffect(() => {
    if (activeCategoryName) {
      document.title = `${activeCategoryName} | ${site.name}`;
    }
  }, [activeCategoryName]);

  const popularCategories = menuPopularCategorySlugs
    .map((slug) => categories.find((category) => category.slug === slug))
    .filter((category): category is MenuCategory => Boolean(category));

  const visibleItems = sortMenuItems(
    activeCategory
      ? activeCategory.items.filter(
          (item) => item.isAvailable || settings.showUnavailableItems,
        )
      : [],
    menuSort,
    serviceTier,
  );

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: MENU_ORANGE }}>
      <Navbar />

      <section className="mx-auto w-full max-w-[1440px] px-6 pt-8 md:px-10 lg:px-14 lg:pt-20">
        <div className="flex flex-col gap-8 lg:gap-[46px]">
          <h1
            className="text-[40px] font-semibold uppercase leading-none text-white sm:text-[64px] md:text-[88px] lg:text-[120px]"
            style={headingFont}
          >
            {menuHeroTitle}
          </h1>

          {popularCategories.length > 0 ? (
            <div className="flex flex-col gap-4 lg:gap-6">
              <p
                className="text-lg text-white sm:text-[24px] lg:text-[32px]"
                style={headingFont}
              >
                {menuPopularSubtitle}
              </p>
              <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:-mx-10 md:px-10 lg:mx-0 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
                {popularCategories.map((category) => (
                  <PopularCategoryCard
                    key={category.slug}
                    category={category}
                    onSelect={selectCategory}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto mt-10 w-full max-w-[1440px] lg:mt-20">
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 md:px-10 lg:px-14">
          <div
            className="flex items-center gap-3 lg:gap-4"
            role="group"
            aria-label="Price list"
          >
            {menuServiceTiers.map((tier) => (
              <Chip
                key={tier}
                label={tier}
                isActive={serviceTier === tier}
                onClick={() => setServiceTier(tier)}
              />
            ))}
          </div>
          <SortControl value={menuSort} onChange={setMenuSort} />
        </div>
        <div className="mt-8 h-px w-full bg-white/40 lg:mt-14" aria-hidden />
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 pb-20 pt-10 md:px-10 lg:px-14 lg:pb-[120px] lg:pt-14">
        {activeCategory ? (
          <div
            ref={menuListRef}
            className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-[73px]"
          >
            <CategorySidebar
              categories={categories}
              activeCategory={activeCategory}
              onSelect={selectCategory}
            />

            <div className="flex w-full flex-col gap-10 lg:max-w-[812px] lg:gap-16">
              {visibleItems.length === 0 ? (
                <p className="text-lg text-white/70" style={bodyFont}>
                  Items for this category will appear here once published.
                </p>
              ) : (
                visibleItems.map((item) => (
                  <MenuItemRow
                    key={item.slug}
                    item={item}
                    currency={settings.currency}
                    tier={serviceTier}
                  />
                ))
              )}
            </div>
          </div>
        ) : (
          <p className="py-20 text-center text-lg text-white/70" style={bodyFont}>
            Menu categories will appear here once published.
          </p>
        )}
      </section>
    </div>
  );
}
