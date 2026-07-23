import Image from "next/image";
import Link from "next/link";
import AboutHeroAnimation from "@/components/about/AboutHeroAnimation";
import DriftDecor from "@/components/DriftDecor";
import FadeUp from "@/components/FadeUp";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxImages from "@/components/ParallaxImages";
import type { AboutPageData } from "@/lib/pages/about";

type AboutPageViewProps = {
  page: AboutPageData;
};

const dividerLine = "/assets/about/divider-line.svg";

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="inline-flex self-start border-b border-[#e6e6e6] py-2.5">
      <p
        className="text-base font-medium leading-none text-ink"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {children}
      </p>
    </div>
  );
}

function ImageCard({
  src,
  alt,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={`group relative overflow-hidden rounded-[20px] ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${imageClassName ?? ""}`}
        sizes="(max-width: 768px) 100vw, 390px"
      />
      <div
        className="absolute inset-0 rounded-[20px] bg-black/20 transition-colors duration-500 group-hover:bg-black/30"
        aria-hidden
      />
    </div>
  );
}

export default function AboutPageView({ page }: AboutPageViewProps) {
  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero */}
      <AboutHeroAnimation>
      <section className="relative w-full overflow-hidden text-white">
        <Image
          src={page.hero.image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          data-about-hero-img
        />
        <div className="absolute inset-0 bg-black/20" />
        <Navbar />

        <div className="relative mx-auto min-h-[560px] max-w-[1440px] sm:min-h-[700px] lg:h-[900px]">
          <h1
            className="absolute bottom-[200px] left-6 right-6 text-[36px] font-semibold uppercase leading-none sm:bottom-[220px] sm:text-[48px] md:left-10 md:max-w-[800px] md:text-[64px] lg:bottom-[250px] lg:left-14 lg:max-w-[973px] lg:text-[80px]"
            style={{ fontFamily: "var(--font-heading)" }}
            data-about-hero-title
          >
            {page.hero.title}
          </h1>

          <p
            className="absolute bottom-8 left-6 right-6 text-sm font-medium leading-[1.5] sm:bottom-10 sm:text-base md:bottom-12 md:left-auto md:right-10 md:max-w-[529px] lg:bottom-[38px] lg:right-14"
            style={{ fontFamily: "var(--font-body)" }}
            data-about-hero-sub
          >
            {page.hero.description}
          </p>
        </div>
      </section>
      </AboutHeroAnimation>

      {/* Intro */}
      <section className="bg-white px-6 pb-8 pt-12 sm:px-8 sm:pt-16 md:px-10 md:pt-20 lg:px-14 lg:pb-8 lg:pt-[130px]">
        <FadeUp
          selector="[data-about-intro]"
          className="mx-auto flex max-w-[1328px] flex-col gap-16 lg:gap-[120px]"
        >
          <div
            className="flex flex-col gap-8 lg:relative lg:h-[232px] lg:gap-0"
            data-about-intro
          >
            <SectionLabel>{page.intro.label}</SectionLabel>
            <h2
              className="text-[28px] font-medium leading-[1.2] text-ink sm:text-[36px] lg:absolute lg:left-[558px] lg:top-0 lg:max-w-[770px] lg:text-[48px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {page.intro.welcomeHeading}
            </h2>
          </div>

          <div
            className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8"
            data-about-intro
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
              <ImageCard
                src={page.intro.primaryImage}
                alt={page.intro.primaryImageAlt}
                className="aspect-[390/449] w-full sm:w-[320px] lg:h-[449px] lg:w-[390px]"
              />

              <div className="group relative flex aspect-[250/303] w-full flex-col justify-between overflow-hidden rounded-[20px] p-4 sm:w-[220px] lg:h-[303px] lg:w-[250px]">
                <Image
                  src={page.intro.sinceCard.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="250px"
                />
                <div
                  className="absolute inset-0 rounded-[20px] bg-black/20 transition-colors duration-500 group-hover:bg-black/30"
                  aria-hidden
                />
                <div className="relative z-10 inline-flex self-start border-b border-white py-2.5">
                  <p
                    className="text-base font-medium leading-none text-white"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {page.intro.sinceCard.label}
                  </p>
                </div>
                <p
                  className="relative z-10 text-base leading-[1.4] text-white"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {page.intro.sinceCard.text}
                </p>
              </div>
            </div>

            <p
              className="max-w-[550px] text-base leading-[1.7] text-ink lg:shrink-0"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {page.intro.paragraph}
            </p>
          </div>
        </FadeUp>
      </section>

      {/* Leadership */}
      <section className="bg-white px-6 py-12 sm:px-8 md:px-10 lg:px-14 lg:py-0">
        <FadeUp
          selector="[data-about-leadership]"
          className="mx-auto flex max-w-[1328px] flex-col gap-10 lg:h-[707px] lg:flex-row lg:items-start lg:justify-between lg:gap-16 lg:pt-[100px]"
        >
          <div className="flex w-full flex-col gap-8 lg:max-w-[454px]" data-about-leadership>
            <p
              className="text-lg leading-[1.3] text-ink sm:text-xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {page.leadership.intro}
            </p>
            <ImageCard
              src={page.leadership.image}
              alt={page.leadership.imageAlt}
              className="aspect-[454/363] w-full lg:min-h-[363px] lg:flex-1"
              imageClassName="object-cover object-top"
            />
          </div>

          <div
            className="flex max-w-[550px] flex-col gap-6 text-[24px] leading-[1.5] text-ink sm:gap-8 sm:text-[28px] lg:pt-[3px] lg:text-[32px]"
            style={{ fontFamily: "var(--font-heading)" }}
            data-about-leadership
          >
            {page.leadership.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Image strip */}
      <section className="bg-white pb-10 pt-8 lg:pb-20 lg:pt-20">
        <div className="strip-container overflow-hidden">
          <div className="animate-strip flex w-max">
            {[...page.stripImages, ...page.stripImages].map((image, i) => (
              <div
                key={`${image.src}-${i}`}
                className="group relative aspect-[325/433] w-[200px] shrink-0 border-[3px] border-white sm:w-[260px] md:w-[20vw] lg:w-[340px]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 200px, (max-width: 768px) 260px, 340px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white px-6 py-16 sm:px-8 md:px-10 lg:px-14 lg:py-[150px]">
        <FadeUp
          selector="[data-about-mission-item]"
          className="mx-auto flex max-w-[1328px] flex-col gap-16 lg:flex-row lg:gap-[120px]"
        >
          {([page.missionVision.mission, page.missionVision.vision] as const).map(
            (item) => (
              <div
                key={item.title}
                className="group flex flex-1 flex-col gap-8 lg:gap-10"
                data-about-mission-item
              >
                <div className="relative h-[88px] w-[88px] transition-transform duration-300 ease-out group-hover:-translate-y-1 sm:h-[114px] sm:w-[114px]">
                  <Image
                    src={item.icon}
                    alt=""
                    fill
                    className="object-contain transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col gap-6">
                  <h3
                    className="text-[36px] font-medium leading-[1.2] text-ink sm:text-[42px] lg:text-[48px]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.title}
                  </h3>
                  <div className="relative h-px w-full">
                    <Image src={dividerLine} alt="" fill className="object-cover" />
                  </div>
                  <p
                    className="text-base leading-[1.7] text-ink"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            ),
          )}
        </FadeUp>
      </section>

      {/* Location */}
      <ParallaxImages selector="[data-about-location-bg]" range={6}>
      <section className="relative w-full overflow-hidden">
        <Image
          src={page.location.backgroundImage}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          data-about-location-bg
        />
        <div className="absolute inset-0 bg-black/30" />

        <FadeUp className="relative flex min-h-[450px] items-center justify-center px-6 py-16 sm:min-h-[550px] md:min-h-[700px] lg:min-h-[900px]">
          <div className="flex max-w-[707px] flex-col items-center gap-6 md:gap-[30px]">
            <DriftDecor className="relative h-[48px] w-[32px] sm:h-[56px] sm:w-[37px] md:h-[64px] md:w-[42px]" aria-hidden>
              <Image
                src={page.location.pinIcon}
                alt=""
                fill
                className="object-contain"
                data-decor
              />
            </DriftDecor>
            <p
              className="text-center text-lg leading-[1.3] text-white sm:text-xl md:text-[22px] lg:text-[24px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {page.location.text}
            </p>
          </div>
        </FadeUp>
      </section>
      </ParallaxImages>

      {/* Map */}
      <section className="bg-white px-6 py-16 sm:px-10 md:px-16 lg:px-20 lg:py-[130px]">
        <FadeUp className="mx-auto flex max-w-[1280px] flex-col items-center gap-8 lg:gap-10">
          <h2
            className="text-center text-[36px] font-medium leading-none text-ink sm:text-[44px] lg:text-[56px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {page.map.title}
          </h2>

          <div className="relative aspect-[1280/641] w-full overflow-hidden rounded-[20px]">
            <iframe
              src={page.map.embedUrl}
              title="Danyame Recreational Village on Google Maps"
              className="h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <Link
              href={page.map.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0"
              aria-label="Open Danyame Recreational Village in Google Maps"
            />
          </div>
        </FadeUp>
      </section>

      <Footer />
    </div>
  );
}
