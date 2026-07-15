import Image from "next/image";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import MenuCategoryCard from "@/components/menu/MenuCategoryCard";
import MenuHeroStrip from "@/components/menu/MenuHeroStrip";
import {
  buildLandingCategories,
  menuLandingIntro,
  menuHeroTitle,
} from "@/lib/menu-landing";
import type { MenuCategory } from "@/lib/menu";

const arrowDown = "/assets/menu/arrow-down.svg";

type MenuLandingPageProps = Readonly<{
  categories: MenuCategory[];
}>;

export default function MenuLandingPage({ categories }: MenuLandingPageProps) {
  const landingCategories = buildLandingCategories(categories);

  return (
    <div className="overflow-x-hidden bg-white">
      <section className="relative bg-[#e87d26] pb-16 lg:pb-24">
        <Navbar />

        <div className="mx-auto flex max-w-[1440px] flex-col items-center px-6 pt-8 sm:pt-10 md:px-10 lg:px-14 lg:pt-16">
          <h1
            className="max-w-[1062px] text-center text-[36px] font-semibold uppercase leading-[0.95] text-white sm:text-[56px] md:text-[80px] lg:text-[120px] xl:text-[150px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {menuHeroTitle}
          </h1>

          <div className="mt-10 w-full sm:mt-14 lg:mt-24">
            <MenuHeroStrip />
          </div>

          <div className="mt-8 size-6 sm:mt-10 lg:mt-14">
            <Image
              src={arrowDown}
              alt=""
              width={24}
              height={24}
              className="size-6"
              aria-hidden
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-14 sm:py-20 md:px-10 lg:px-[162px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1115px] flex-col items-center gap-12 sm:gap-16 lg:gap-[120px]">
          <div className="flex w-full max-w-[490px] flex-col items-center gap-4 px-2 text-center sm:px-0">
            <h2
              className="text-[32px] font-medium leading-none text-ink sm:text-[40px] lg:text-[56px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {menuLandingIntro.title}
            </h2>
            <p
              className="text-sm leading-[1.5] text-subtext sm:text-base"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {menuLandingIntro.description}
            </p>
          </div>

          {landingCategories.length === 0 ? (
            <p
              className="text-center text-lg text-subtext"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Menu categories will appear here once published.
            </p>
          ) : (
            <div className="grid w-full grid-cols-1 gap-x-6 gap-y-16 sm:gap-y-20 md:grid-cols-2 md:gap-x-8 md:gap-y-24 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-28">
              {landingCategories.map((category) => (
                <MenuCategoryCard key={category.slug} category={category} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
