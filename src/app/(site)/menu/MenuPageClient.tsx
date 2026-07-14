"use client";

import Link from "next/link";
import Image from "next/image";

import {
  type MenuCategory,
  type MenuItem,
  type MenuSettingsData,
} from "@/lib/menu";
import type { SiteConfig } from "@/lib/site";

const logoLight = "/assets/logo.png";

type MenuPageClientProps = Readonly<{
  settings: MenuSettingsData;
  categories: MenuCategory[];
  featuredItems: MenuItem[];
  site: SiteConfig;
}>;

function formatPrice(price: number | string, currency: string): string {
  if (typeof price === "string") {
    return `${currency} ${price}`;
  }
  const formatted = Number.isInteger(price) ? String(price) : price.toFixed(2);
  return `${currency} ${formatted}`;
}

function MenuItemRow({
  item,
  currency,
  showUnavailableItems,
}: Readonly<{
  item: MenuItem;
  currency: string;
  showUnavailableItems: boolean;
}>) {
  if (!item.isAvailable && !showUnavailableItems) return null;

  return (
    <div className={`flex flex-col gap-3 ${!item.isAvailable ? "opacity-40" : ""}`}>
      <div className="flex items-baseline justify-between gap-6">
        <p
          className="text-[22px] uppercase leading-none text-white sm:text-[26px] lg:text-[32px]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {item.name}
        </p>
        <p
          className="shrink-0 text-[22px] font-medium leading-none text-white sm:text-[26px] lg:text-[32px]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {formatPrice(item.price, currency)}
        </p>
      </div>
      {item.description ? (
        <p
          className="text-base leading-[1.2] text-white/80 sm:text-lg lg:text-[20px]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {item.description}
        </p>
      ) : null}
    </div>
  );
}

function CategoryRow({
  category,
  currency,
  showUnavailableItems,
}: Readonly<{
  category: MenuCategory;
  currency: string;
  showUnavailableItems: boolean;
}>) {
  const visibleItems = category.items.filter(
    (item) => item.isAvailable || showUnavailableItems,
  );
  if (visibleItems.length === 0) return null;

  return (
    <div
      id={category.slug}
      className="scroll-mt-8 grid border-t border-white/20 lg:grid-cols-[280px_1px_1fr] xl:grid-cols-[320px_1px_1fr]"
    >
      {/* Category name — left */}
      <div className="py-10 lg:sticky lg:top-0 lg:self-start lg:py-12 lg:pr-12">
        <h2
          className="text-[28px] uppercase leading-none text-white sm:text-[34px] lg:text-[40px]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {category.name}
        </h2>
        {category.description ? (
          <p
            className="mt-3 text-sm leading-snug text-white/60"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {category.description}
          </p>
        ) : null}
      </div>

      {/* Vertical divider — desktop */}
      <div className="hidden bg-white/20 lg:block" />

      {/* Items — right */}
      <div className="flex flex-col gap-10 pb-12 lg:gap-12 lg:pl-12 lg:pt-12">
        {visibleItems.map((item) => (
          <MenuItemRow
            key={item.slug}
            item={item}
            currency={currency}
            showUnavailableItems={showUnavailableItems}
          />
        ))}
      </div>
    </div>
  );
}

export default function MenuPageClient({
  settings,
  categories,
  featuredItems,
  site,
}: MenuPageClientProps) {
  const openingHours = site.openingHours ?? [];

  const allCategories: MenuCategory[] = featuredItems.length > 0
    ? [
        {
          slug: "featured",
          name: "Featured",
          sortOrder: -1,
          items: featuredItems,
        },
        ...categories,
      ]
    : categories;

  return (
    <div className="min-h-screen bg-linear-to-b from-[#e97d25] to-[#c84f38]">
      {/* Navbar */}
      <div className="relative z-20 flex w-full items-center justify-between px-6 py-6 md:px-10 lg:px-14">
        <Link href="/" aria-label="Danyame home">
          <Image
            src={logoLight}
            alt="Danyame Recreational Village"
            width={104}
            height={50}
            priority
            className="h-[40px] w-[83px] object-contain md:h-[50px] md:w-[104px]"
          />
        </Link>
        <Link
          href="/host-event"
          className="flex h-[44px] items-center justify-center rounded-pill bg-white/20 px-6 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30 md:h-[50px] md:text-base"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Host an Event
        </Link>
      </div>

      {/* Hero header */}
      <div className="flex items-end justify-between px-6 pb-10 pt-6 md:px-10 md:pt-10 lg:px-14 lg:pb-14 lg:pt-16">
        <h1
          className="text-[80px] font-semibold uppercase leading-none text-white sm:text-[110px] md:text-[130px] lg:text-[148px]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Menu
        </h1>

        {/* Contact & hours */}
        <div className="hidden flex-col items-end gap-5 pb-2 text-right md:flex">
          <div className="flex flex-col items-end gap-1">
            <p
              className="text-[11px] uppercase tracking-widest text-white/60"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Contact
            </p>
            <a
              href={site.contact.phoneHref}
              className="text-sm leading-snug text-white transition-opacity hover:opacity-80"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {site.contact.phone}
            </a>
            {site.contact.secondaryPhone ? (
              <a
                href={site.contact.secondaryPhoneHref}
                className="text-sm leading-snug text-white transition-opacity hover:opacity-80"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {site.contact.secondaryPhone}
              </a>
            ) : null}
          </div>
          {openingHours.length > 0 ? (
            <div className="flex flex-col items-end gap-1">
              <p
                className="text-[11px] uppercase tracking-widest text-white/60"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Opening Hours
              </p>
              {openingHours.map((row) => (
                <p
                  key={row.label}
                  className="text-sm leading-snug text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {row.label}&nbsp;&nbsp;{row.hours}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* Menu content */}
      <main className="px-6 pb-24 md:px-10 lg:px-14">
        {allCategories.length === 0 ? (
          <div className="border-t border-white/20 py-20 text-center">
            <p
              className="text-lg text-white/60"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Menu items will appear here once published in the admin dashboard.
            </p>
          </div>
        ) : (
          allCategories.map((category) => (
            <CategoryRow
              key={category.slug}
              category={category}
              currency={settings.currency}
              showUnavailableItems={settings.showUnavailableItems}
            />
          ))
        )}
      </main>
    </div>
  );
}
