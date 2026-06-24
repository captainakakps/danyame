import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Danyame Recreational Village — a dynamic destination blending relaxation, entertainment, and social interaction in Akwatia, Eastern Region.",
};

const heroBg = "/assets/about/hero.jpg";
const quoteBg = "/assets/about/quote-bg.jpg";
const quoteIcon = "/assets/about/quote-icon.svg";

const stripImages = [
  "/assets/about/strip-1.jpg",
  "/assets/about/strip-2.jpg",
  "/assets/about/strip-3.jpg",
  "/assets/about/strip-4.jpg",
  "/assets/about/strip-5.jpg",
];

export default function AboutPage() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative w-full overflow-hidden text-white">
        {/* Background */}
        <Image src={heroBg} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/20" />

        {/* Navbar */}
        <Navbar />

        {/* Hero content container - maintains aspect ratio */}
        <div className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:h-[786px]">
          {/* Title - positioned towards bottom left */}
          <h1
            className="absolute bottom-[180px] left-6 right-6 text-[36px] font-semibold uppercase leading-[0.95] sm:bottom-[200px] sm:text-[48px] md:bottom-[220px] md:left-10 md:right-auto md:max-w-[800px] md:text-[64px] lg:bottom-[250px] lg:left-14 lg:max-w-[973px] lg:text-[80px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            About Danyame Recreational Village
          </h1>

          {/* Description - bottom right on desktop, below title on mobile */}
          <p
            className="absolute bottom-8 left-6 right-6 text-sm font-medium leading-[1.5] sm:bottom-10 sm:text-base md:bottom-12 md:left-auto md:right-10 md:max-w-[529px] lg:bottom-[38px] lg:right-14"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Danyame Recreational Village is a vibrant lifestyle and entertainment
            hub located in Akwatia, designed to bring people together through
            shared experiences.
          </p>
        </div>
      </section>

      {/* ── Copy section ── */}
      <section className="bg-white">
        <div className="px-6 pb-8 pt-12 sm:px-8 sm:pt-16 md:px-10 md:pt-20 lg:px-14 lg:pb-0 lg:pt-[130px]">
          <div
            className="flex max-w-[675px] flex-col gap-3 text-base leading-[1.7] text-ink sm:text-lg md:text-[18px] lg:text-[20px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <p>
              At its core, Danyame Recreational Village is designed to be more
              than just a venue — it&apos;s a place where different experiences
              come together seamlessly.
            </p>
            <p>
              We cater to individuals, families, and corporate groups looking for
              a dynamic environment that blends relaxation, entertainment, and
              social interaction.
            </p>
            <p>
              Over time, Danyame has grown into a go-to destination for events,
              weekend outings, and memorable gatherings in the Eastern Region.
              Whether you&apos;re celebrating something special or simply looking
              for a place to unwind, Danyame offers a space where every visit
              feels alive.
            </p>
          </div>
        </div>

        {/* ── Horizontal image strip ── */}
        <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
          <div className="flex overflow-x-auto scrollbar-thin lg:overflow-visible">
            {stripImages.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[325/433] w-[200px] shrink-0 border-[3px] border-white sm:w-[260px] md:w-[20vw] lg:w-[calc(100%/5)]"
              >
                <Image
                  src={src}
                  alt={`Danyame venue ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 200px, (max-width: 768px) 260px, 20vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote / location section ── */}
      <section className="relative w-full overflow-hidden">
        <Image src={quoteBg} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/30" />

        {/* Content container */}
        <div className="relative flex min-h-[450px] items-center justify-center px-6 py-16 sm:min-h-[550px] md:min-h-[700px] lg:min-h-[900px]">
          <div className="flex max-w-[707px] flex-col items-center gap-6 md:gap-[30px]">
            <img src={quoteIcon} alt="" aria-hidden className="h-[48px] w-auto sm:h-[56px] md:h-[64px]" />
            <p
              className="text-center text-lg leading-[1.3] text-white sm:text-xl md:text-[22px] lg:text-[24px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Located in Akwatia in the Eastern Region of Ghana, Danyame
              Recreational Village sits at the heart of a growing community.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
