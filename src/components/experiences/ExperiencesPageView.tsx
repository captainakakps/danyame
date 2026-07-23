import Link from "next/link";

import CategorySection from "@/components/experiences/CategorySection";
import ExperiencesHero from "@/components/experiences/ExperiencesHero";
import ExperiencesScrollSetup from "@/components/experiences/ExperiencesScrollSetup";
import ExperiencesTagline from "@/components/experiences/ExperiencesTagline";
import ExploreMoreSection from "@/components/experiences/ExploreMoreSection";
import DecorDrift from "@/components/DecorDrift";
import FadeUp from "@/components/FadeUp";
import Footer from "@/components/Footer";
import type { ExperiencesPageData } from "@/lib/pages/experiences";

type ExperiencesPageViewProps = {
  page: ExperiencesPageData;
};

export default function ExperiencesPageView({ page }: ExperiencesPageViewProps) {
  return (
    <div className="overflow-x-hidden bg-white">
      <ExperiencesScrollSetup />
      <ExperiencesHero image={page.hero.image} title={page.hero.title} />

      <section className="flex items-center justify-center bg-white px-6 py-20 sm:px-10 sm:py-28 md:py-40 lg:px-[295px] lg:py-[410px]">
        <ExperiencesTagline
          primary={page.tagline.primary}
          secondary={page.tagline.secondary}
        />
      </section>

      {page.categories.map((category, index) => (
        <CategorySection
          key={category.slug}
          category={category}
          categories={page.categories}
          index={index}
        />
      ))}

      <ExploreMoreSection exploreMore={page.exploreMore} />

      <section className="relative bg-white px-6 py-16 md:px-10 md:py-24 lg:h-[796px] lg:px-14 lg:py-0 lg:pt-[130px]">
        <FadeUp className="relative">
          <h2
            className="text-[40px] font-semibold uppercase leading-[1.1] text-ink sm:text-[56px] md:text-[80px] lg:text-[122px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {page.finalCta.line1}
            <br />
            {page.finalCta.line2}
            <br />
            {page.finalCta.line3}
            <br />
            {page.finalCta.line4}
          </h2>

          <DecorDrift
            className="pointer-events-none absolute inset-0 hidden lg:block"
            aria-hidden
          >
            <div
              className="absolute left-[389px] top-[-36px] h-[230px] w-[230px]"
              data-cta-decor
            >
              <svg
                className="absolute left-[47px] top-[47px] h-[136px] w-[136px]"
                viewBox="0 0 122 135"
                fill="none"
              >
                <path
                  d="M43.888 12.9845C48.8288 -4.32817 73.3642 -4.32817 78.305 12.9845C80.9554 22.2715 90.4967 27.7802 99.8647 25.432C117.328 21.0545 129.596 42.3028 117.073 55.238C110.356 62.1769 110.356 73.1942 117.073 80.133C129.596 93.0682 117.328 114.317 99.8647 109.939C90.4967 107.591 80.9554 113.099 78.305 122.387C73.3642 139.699 48.8288 139.699 43.888 122.387C41.2376 113.099 31.6963 107.591 22.3283 109.939C4.8647 114.317 -7.40303 93.0682 5.11978 80.133C11.8374 73.1942 11.8374 62.1769 5.11978 55.238C-7.40303 42.3028 4.86469 21.0545 22.3283 25.432C31.6963 27.7802 41.2376 22.2715 43.888 12.9845Z"
                  fill="#D03F50"
                />
              </svg>
              <svg
                className="absolute left-[75px] top-[75px] h-[80px] w-[80px]"
                viewBox="0 0 80 80"
                fill="none"
              >
                <path
                  d="M26.667 66.667h-10a3.333 3.333 0 01-3.334-3.334V30a3.333 3.333 0 013.334-3.333h10V66.667z"
                  fill="white"
                />
                <path
                  d="M53.333 26.667h10a3.333 3.333 0 013.334 3.333v33.333a3.333 3.333 0 01-3.334 3.334h-10V26.667z"
                  fill="white"
                />
                <rect
                  x="26.667"
                  y="16.667"
                  width="26.667"
                  height="50"
                  rx="3.333"
                  fill="white"
                />
                <path
                  d="M33.333 16.667v-3.334a6.667 6.667 0 0113.334 0v3.334"
                  stroke="white"
                  strokeWidth="2"
                />
                <rect
                  x="33.333"
                  y="30"
                  width="13.333"
                  height="20"
                  rx="1.667"
                  fill="#D03F50"
                />
              </svg>
            </div>

            <div
              className="absolute left-[502px] top-[245px] h-[215px] w-[215px]"
              data-cta-decor
            >
              <svg
                className="absolute left-[26px] top-[16px] h-[145px] w-[162px]"
                viewBox="0 0 162 145"
                fill="none"
              >
                <path
                  d="M64.226 9.667c7.436-12.889 26.026-12.889 33.462 0L159.17 115.5c7.436 12.889-1.859 29-16.731 29H19.475c-14.872 0-24.167-16.111-16.73-29L64.226 9.667z"
                  fill="#125E65"
                />
              </svg>
              <svg
                className="absolute left-[60px] top-[55px] h-[110px] w-[95px]"
                viewBox="0 0 95 110"
                fill="none"
              >
                <rect x="10" y="35" width="45" height="60" rx="2" fill="white" />
                <rect x="18" y="45" width="10" height="10" fill="#125E65" />
                <rect x="18" y="60" width="10" height="10" fill="#125E65" />
                <rect x="18" y="75" width="10" height="10" fill="#125E65" />
                <rect x="37" y="45" width="10" height="10" fill="#125E65" />
                <rect x="37" y="60" width="10" height="10" fill="#125E65" />
                <rect x="37" y="75" width="10" height="10" fill="#125E65" />
                <path
                  d="M75 95c0-16.569-11.193-30-25-30"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <ellipse cx="75" cy="45" rx="15" ry="25" fill="white" />
                <path d="M75 20v75" stroke="white" strokeWidth="4" />
              </svg>
            </div>
          </DecorDrift>
        </FadeUp>

        <FadeUp
          delay={0.15}
          className="mt-10 text-left md:mt-16 lg:absolute lg:right-14 lg:top-[463px] lg:mt-0 lg:w-[460px] lg:text-right"
        >
          <p
            className="text-base leading-[1.5] text-subtext sm:text-lg md:text-xl lg:text-2xl"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {page.finalCta.body}
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row lg:justify-end">
            <Link
              href={page.finalCta.secondaryHref}
              className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-[rgba(208,63,80,0.1)] text-base font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgba(208,63,80,0.18)] active:translate-y-0 sm:w-[182px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {page.finalCta.secondaryLabel}
            </Link>
            <Link
              href={page.finalCta.primaryHref}
              className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-rust text-base font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-rust/90 active:translate-y-0 sm:w-[182px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {page.finalCta.primaryLabel}
            </Link>
          </div>
        </FadeUp>
      </section>

      <Footer />
    </div>
  );
}
