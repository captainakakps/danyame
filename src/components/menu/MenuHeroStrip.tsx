import Image from "next/image";
import Link from "next/link";

import { menuHeroStrip } from "@/lib/menu-landing";
import { pages } from "@/lib/tokens";

export default function MenuHeroStrip() {
  return (
    <div className="w-full overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="mx-auto flex w-max min-w-full items-end justify-start gap-4 px-2 sm:gap-6 sm:px-0 md:gap-8">
        {menuHeroStrip.map((item) => (
          <Link
            key={item.slug}
            href={`${pages.menu}/${item.slug}`}
            className="group flex w-[180px] shrink-0 snap-start flex-col gap-3 sm:w-[220px] sm:gap-4 lg:w-[285px]"
          >
            <p
              className="text-lg text-white transition-opacity group-hover:opacity-80 sm:text-xl lg:text-2xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {item.label}
            </p>
            <div
              className={`relative w-full overflow-hidden rounded-t-[20px] ${
                item.tall
                  ? "h-[220px] sm:h-[300px] md:h-[340px] lg:h-[385px]"
                  : "h-[180px] sm:h-[250px] md:h-[290px] lg:h-[319px]"
              }`}
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                loading="eager"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 285px"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
