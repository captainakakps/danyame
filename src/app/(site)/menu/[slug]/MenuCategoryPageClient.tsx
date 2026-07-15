"use client";

import Link from "next/link";

import Navbar from "@/components/Navbar";
import { MenuCircularImage } from "@/components/menu/MenuCircularImage";
import { formatMenuDisplayPrice, type MenuCategory, type MenuItem, type MenuSettingsData } from "@/lib/menu";
import { getLandingCardImage, getLandingDisplayName } from "@/lib/menu-landing";
import type { SiteConfig } from "@/lib/site";
import { pages } from "@/lib/tokens";

type MenuCategoryPageClientProps = Readonly<{
  category: MenuCategory;
  settings: MenuSettingsData;
  site: SiteConfig;
}>;

function PriceBadge({
  price,
  currency,
  align,
  compact = false,
}: Readonly<{
  price: number | string;
  currency: string;
  align: "left" | "right";
  compact?: boolean;
}>) {
  return (
    <div
      className={`flex items-center ${
        compact
          ? "justify-center"
          : align === "right"
            ? "flex-row-reverse justify-end"
            : "justify-start"
      }`}
    >
      <div className="shrink-0 rounded-[20px] bg-teal px-3 py-3 sm:px-4 sm:py-4">
        <p
          className="text-xl font-medium leading-none text-white sm:text-2xl lg:text-[32px]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {formatMenuDisplayPrice(price, currency)}
        </p>
      </div>
      {!compact ? (
        <div
          className={`hidden h-[3px] w-16 bg-white sm:block sm:w-24 lg:w-[158px] ${
            align === "right" ? "mr-0" : "ml-0"
          }`}
          aria-hidden
        />
      ) : null}
    </div>
  );
}

function ItemText({
  name,
  description,
  align,
}: Readonly<{
  name: string;
  description?: string;
  align: "left" | "right" | "center";
}>) {
  const alignment =
    align === "right"
      ? "text-right"
      : align === "center"
        ? "text-center"
        : "text-left";

  return (
    <div className={`flex flex-col gap-3 sm:gap-4 ${alignment}`}>
      <p
        className="text-[28px] leading-none text-white sm:text-[36px] lg:text-[40px]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {name}
      </p>
      {description ? (
        <p
          className="text-base leading-[1.2] text-white/80 sm:text-lg lg:text-[20px]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function MenuItemZigzag({
  item,
  index,
  currency,
  fallbackImage,
  showUnavailableItems,
}: Readonly<{
  item: MenuItem;
  index: number;
  currency: string;
  fallbackImage?: string;
  showUnavailableItems: boolean;
}>) {
  if (!item.isAvailable && !showUnavailableItems) return null;

  const imageSrc = item.image ?? fallbackImage;
  const isReversed = index % 2 === 1;

  return (
    <article
      className={`py-8 sm:py-10 ${!item.isAvailable ? "opacity-40" : ""}`}
    >
      <div className="flex flex-col items-center gap-6 text-center md:hidden">
        {imageSrc ? (
          <MenuCircularImage src={imageSrc} alt={item.name} />
        ) : (
          <div className="flex size-[180px] items-center justify-center rounded-full bg-white/10 ring-4 ring-white/20">
            <span
              className="px-4 text-center text-sm uppercase tracking-wide text-white/60"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {item.name}
            </span>
          </div>
        )}
        <ItemText name={item.name} description={item.description} align="center" />
        <PriceBadge price={item.price} currency={currency} align="left" compact />
      </div>

      <div className="hidden min-h-[243px] grid-cols-[1fr_auto_1fr] items-center gap-6 md:grid lg:gap-10">
        <div className={isReversed ? "text-right" : ""}>
          {isReversed ? (
            <ItemText name={item.name} description={item.description} align="right" />
          ) : (
            <PriceBadge price={item.price} currency={currency} align="left" />
          )}
        </div>

        <div className="mx-auto">
          {imageSrc ? (
            <MenuCircularImage src={imageSrc} alt={item.name} />
          ) : (
            <div className="flex size-[180px] items-center justify-center rounded-full bg-white/10 ring-4 ring-white/20 sm:size-[200px] lg:size-[243px]">
              <span
                className="px-4 text-center text-sm uppercase tracking-wide text-white/60"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {item.name}
              </span>
            </div>
          )}
        </div>

        <div>
          {isReversed ? (
            <PriceBadge price={item.price} currency={currency} align="right" />
          ) : (
            <ItemText name={item.name} description={item.description} align="left" />
          )}
        </div>
      </div>
    </article>
  );
}

export default function MenuCategoryPageClient({
  category,
  settings,
  site,
}: MenuCategoryPageClientProps) {
  const openingHours = site.openingHours ?? [];
  const displayName = getLandingDisplayName(category.slug, category.name);
  const fallbackImage = getLandingCardImage(category.slug);
  const visibleItems = category.items.filter(
    (item) => item.isAvailable || settings.showUnavailableItems,
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-[#e97d25] to-[#c84f38]">
      <Navbar />

      <header className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 pb-6 pt-6 sm:gap-8 sm:pb-8 sm:pt-8 md:flex-row md:items-end md:justify-between md:px-10 md:pt-12 lg:px-14 lg:pb-10">
        <div className="flex flex-col gap-4 sm:gap-6">
          <Link
            href={pages.menu}
            className="text-sm text-white/70 transition-colors hover:text-white"
            style={{ fontFamily: "var(--font-body)" }}
          >
            ← Back to Menu
          </Link>
          <h1
            className="text-[40px] uppercase leading-none text-white sm:text-[56px] md:text-[64px] lg:text-[80px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {displayName}
          </h1>
        </div>

        <div className="flex flex-col items-start gap-4 text-left sm:gap-5 md:items-end md:pb-2 md:text-right">
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
      </header>

      <div className="mx-auto h-px max-w-[1440px] bg-white/20" />

      <main className="mx-auto max-w-[974px] px-4 pb-20 pt-6 sm:px-6 sm:pb-24 sm:pt-8 md:px-10 lg:px-14 lg:pt-12">
        {visibleItems.length === 0 ? (
          <p
            className="py-20 text-center text-lg text-white/60"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Items for this category will appear here once published.
          </p>
        ) : (
          visibleItems.map((item, index) => (
            <MenuItemZigzag
              key={item.slug}
              item={item}
              index={index}
              currency={settings.currency}
              fallbackImage={fallbackImage}
              showUnavailableItems={settings.showUnavailableItems}
            />
          ))
        )}
      </main>
    </div>
  );
}
