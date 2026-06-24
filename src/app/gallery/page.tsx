import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import GalleryTabs from "@/components/GalleryTabs";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Real people, real moments, real energy — explore the experiences, atmosphere, and memories created at Danyame Recreational Village.",
};

const starDecoration = "/assets/gallery/star-decoration.svg";

export default function GalleryPage() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative bg-teal pb-16 md:pb-[90px]">
        <Navbar />
        {/* Hero content */}
        <div className="flex flex-col gap-8 px-6 pt-12 md:flex-row md:items-start md:justify-between md:gap-0 md:px-10 md:pt-[108px] lg:px-14">
          {/* Text content */}
          <div className="flex flex-col gap-10 md:max-w-[668px] md:gap-[81px]">
            <h1
              className="text-[32px] font-semibold uppercase leading-none text-white sm:text-[48px] md:text-[64px] lg:text-[80px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              The Danyame Experience
            </h1>
            <p
              className="max-w-[537px] text-sm leading-[1.3] text-white md:text-base"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Real people, real moments, real energy — explore the experiences,
              atmosphere, and memories created at Danyame Recreational Village.
            </p>
          </div>

          {/* Star / camera decoration */}
          <div className="h-[150px] w-[150px] shrink-0 sm:h-[180px] sm:w-[180px] md:h-[220px] md:w-[220px] lg:h-[268px] lg:w-[268px]">
            <img
              src={starDecoration}
              alt=""
              aria-hidden
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* ── Tabs + Grid (client component) ── */}
      <GalleryTabs />

      <Footer />
    </div>
  );
}
