import Link from "next/link";

import { MenuCircularImage } from "@/components/menu/MenuCircularImage";
import type { MenuLandingCategory } from "@/lib/menu-landing";
import { pages } from "@/lib/tokens";

type MenuCategoryCardProps = Readonly<{
  category: MenuLandingCategory;
}>;

export default function MenuCategoryCard({ category }: MenuCategoryCardProps) {
  return (
    <article className="relative isolate flex w-full flex-col items-center">
      <div className="relative z-20">
        <MenuCircularImage
          src={category.cardImage}
          alt={category.name}
          sizeClass="size-[160px] sm:size-[200px] lg:size-[243px]"
          ringClass="ring-4 ring-white"
          sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 243px"
        />
      </div>

      <div className="relative z-10 -mt-[72px] flex w-full min-h-[380px] flex-col justify-end rounded-[20px] bg-[rgba(243,157,87,0.1)] px-6 pb-8 pt-[96px] sm:-mt-[88px] sm:min-h-[420px] sm:px-8 sm:pt-[112px] lg:-mt-[100px] lg:min-h-[448px] lg:px-8 lg:pb-8 lg:pt-[140px]">
        <div className="flex flex-col items-center gap-8 text-center sm:gap-10 lg:gap-12">
          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-10">
            <h2
              className="text-[28px] font-medium leading-none text-ink sm:text-[36px] lg:text-[40px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {category.name}
            </h2>
            <p
              className="text-sm leading-[1.5] text-subtext sm:text-base"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {category.cardDescription}
            </p>
          </div>

          <Link
            href={`${pages.menu}/${category.slug}`}
            className="flex h-[50px] w-full items-center justify-center rounded-pill bg-rust text-base font-medium text-white transition-colors hover:bg-rust/90"
            style={{ fontFamily: "var(--font-body)" }}
          >
            View More
          </Link>
        </div>
      </div>
    </article>
  );
}
