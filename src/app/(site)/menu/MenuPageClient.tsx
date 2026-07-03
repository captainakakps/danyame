"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  type MenuCategory,
  type MenuItem,
  type MenuSettingsData,
  type MenuTag,
} from "@/lib/menu";
import type { SiteConfig } from "@/lib/site";

type MenuPageClientProps = {
  settings: MenuSettingsData;
  categories: MenuCategory[];
  featuredItems: MenuItem[];
  site: SiteConfig;
};

const tagLabels: Record<MenuTag, string> = {
  popular: "Popular",
  new: "New",
  spicy: "Spicy",
  vegetarian: "Vegetarian",
  alcoholic: "Alcoholic",
  "non-alcoholic": "Non-alcoholic",
};

function formatMenuPrice(price: number, currency: string): string {
  const formatted = Number.isInteger(price) ? String(price) : price.toFixed(2);
  return `${currency}${formatted}`;
}

function MenuTagBadge({ tag }: { tag: MenuTag }) {
  const styles: Partial<Record<MenuTag, string>> = {
    popular: "bg-rust/10 text-rust",
    new: "bg-teal/10 text-teal",
    spicy: "bg-crimson/10 text-crimson",
    vegetarian: "bg-teal-50 text-teal-800",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[tag] ?? "bg-surface-2 text-subtext"}`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {tagLabels[tag]}
    </span>
  );
}

function MenuItemRow({
  item,
  currency,
  showUnavailableItems,
}: {
  item: MenuItem;
  currency: string;
  showUnavailableItems: boolean;
}) {
  const unavailable = !item.isAvailable;
  const dimmed = unavailable && showUnavailableItems;

  return (
    <article
      className={`flex gap-4 border-b border-muted/60 py-4 last:border-b-0 ${dimmed ? "opacity-50" : ""}`}
    >
      {item.image ? (
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[12px] bg-surface-2">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className="text-base font-medium text-ink sm:text-lg"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {item.name}
            </h3>
            {unavailable && showUnavailableItems ? (
              <p
                className="mt-0.5 text-xs font-medium uppercase tracking-wide text-crimson"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Sold out
              </p>
            ) : null}
          </div>
          <p
            className="shrink-0 text-base font-semibold text-teal sm:text-lg"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {formatMenuPrice(item.price, currency)}
          </p>
        </div>

        {item.description ? (
          <p
            className="mt-1 text-sm leading-relaxed text-subtext"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {item.description}
          </p>
        ) : null}

        {item.tags.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <MenuTagBadge key={tag} tag={tag} />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function MenuPageClient({
  settings,
  categories,
  featuredItems,
  site,
}: MenuPageClientProps) {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug ?? "");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const categorySlugs = useMemo(
    () => categories.map((category) => category.slug),
    [categories],
  );

  useEffect(() => {
    if (!categorySlugs.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const topEntry = visible[0];
        if (topEntry?.target.id) {
          setActiveSlug(topEntry.target.id);
        }
      },
      {
        rootMargin: "-120px 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    for (const slug of categorySlugs) {
      const section = sectionRefs.current[slug];
      if (section) {
        observer.observe(section);
      }
    }

    return () => observer.disconnect();
  }, [categorySlugs]);

  function scrollToCategory(slug: string) {
    setActiveSlug(slug);
    sectionRefs.current[slug]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="min-h-full bg-white text-ink">
      <header className="sticky top-0 z-20 border-b border-muted/70 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3 sm:px-6">
          <img
            src="/assets/logo.png"
            alt={site.shortName}
            className="h-8 w-auto"
          />
          <div className="min-w-0">
            <p
              className="truncate text-lg font-semibold text-teal"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {settings.pageTitle}
            </p>
            {settings.introText ? (
              <p
                className="truncate text-xs text-subtext sm:text-sm"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {settings.introText}
              </p>
            ) : null}
          </div>
        </div>

        {categories.length > 0 ? (
          <nav
            aria-label="Menu categories"
            className="mx-auto max-w-2xl overflow-x-auto px-4 pb-3 sm:px-6"
          >
            <div className="flex gap-2">
              {categories.map((category) => {
                const isActive = activeSlug === category.slug;

                return (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => scrollToCategory(category.slug)}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? "bg-teal text-white"
                        : "bg-surface-2 text-ink hover:bg-teal/10"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </nav>
        ) : null}
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
        {featuredItems.length > 0 ? (
          <section className="mb-8">
            <h2
              className="mb-4 text-sm font-semibold uppercase tracking-wide text-subtext"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Featured
            </h2>
            <div className="rounded-[16px] border border-teal/15 bg-teal-50/40 p-4">
              {featuredItems.map((item) => (
                <MenuItemRow
                  key={`featured-${item.slug}`}
                  item={item}
                  currency={settings.currency}
                  showUnavailableItems={settings.showUnavailableItems}
                />
              ))}
            </div>
          </section>
        ) : null}

        {categories.length === 0 ? (
          <p
            className="py-12 text-center text-subtext"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Menu items will appear here once they are published in the admin
            dashboard.
          </p>
        ) : (
          categories.map((category) => (
            <section
              key={category.slug}
              id={category.slug}
              ref={(node) => {
                sectionRefs.current[category.slug] = node;
              }}
              className="scroll-mt-36 pb-8"
            >
              <div className="mb-4">
                <h2
                  className="text-2xl font-semibold text-ink"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {category.name}
                </h2>
                {category.description ? (
                  <p
                    className="mt-1 text-sm text-subtext"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {category.description}
                  </p>
                ) : null}
              </div>

              <div>
                {category.items.map((item) => (
                  <MenuItemRow
                    key={item.slug}
                    item={item}
                    currency={settings.currency}
                    showUnavailableItems={settings.showUnavailableItems}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      <footer className="border-t border-muted/70 bg-surface-2 px-4 py-6 sm:px-6">
        <div
          className="mx-auto flex max-w-2xl flex-col gap-2 text-sm text-subtext sm:flex-row sm:items-center sm:justify-between"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <p>{site.name}</p>
          <a
            href={site.contact.phoneHref}
            className="font-medium text-teal transition-colors duration-150 hover:text-teal-800"
          >
            {site.contact.phone}
          </a>
        </div>
      </footer>
    </div>
  );
}
