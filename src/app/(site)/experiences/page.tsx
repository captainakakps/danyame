import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getExperiencesPage } from "@/lib/cms/pages";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Discover everything we offer — from events and nightlife to relaxation and recreation.",
};

export default async function ExperiencesPage() {
  const page = await getExperiencesPage();

  return (
    <div className="bg-white overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-[600px] w-full overflow-hidden text-white md:min-h-[700px] lg:h-[900px]">
        <Image src={page.hero.image} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/30" />
        <Navbar />
        <div className="absolute bottom-12 left-6 right-6 md:bottom-20 md:left-10 md:right-10 lg:bottom-[130px] lg:left-14 lg:right-auto lg:w-[917px]">
          <h1
            className="text-[32px] font-semibold uppercase leading-[1.1] sm:text-[48px] md:text-[56px] lg:text-[80px] lg:leading-none"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {page.hero.title}
          </h1>
        </div>
      </section>

      {/* ── Tagline ── */}
      <section className="flex items-center justify-center bg-white px-6 py-24 md:px-10 md:py-40 lg:px-[295px] lg:py-[410px]">
        <p
          className="max-w-[850px] text-center text-[28px] font-medium leading-[1.3] sm:text-[36px] md:text-[44px] lg:text-[56px]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="text-ink">{page.tagline.primary}</span>
          <span style={{ color: "rgba(30,30,30,0.15)" }}>
            {page.tagline.secondary}
          </span>
        </p>
      </section>

      {/* ── Category sections ── */}
      {page.categories.map((cat, idx) => (
        <section key={cat.label} className="relative min-h-[600px] w-full overflow-hidden text-white md:min-h-[700px] lg:h-[900px]">
          <img
            src={cat.image}
            alt={cat.label}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="scrollbar-thin absolute left-0 right-0 top-6 overflow-x-auto px-6 pb-3 md:left-10 md:right-auto md:top-12 md:overflow-visible md:px-0 md:pb-0 lg:left-14 lg:top-[64px]">
            <div className="flex items-center gap-3 md:gap-[24px]">
              {page.categories.map((c, i) => (
                <span
                  key={c.label}
                  className={`shrink-0 rounded-[100px] px-4 py-2 text-sm tracking-[0.4px] transition-all md:px-6 md:py-3 md:text-[20px] ${
                    i === idx
                      ? "border border-white bg-[rgba(255,255,255,0.04)] font-medium"
                      : "font-normal opacity-80"
                  }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {c.label}
                </span>
              ))}
            </div>
          </div>

          <p
            className="absolute left-6 top-1/2 -translate-y-1/2 text-[28px] font-medium leading-[1.1] md:left-10 md:text-[32px] lg:left-14 lg:top-[428px] lg:translate-y-0 lg:text-[40px] lg:whitespace-nowrap"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {cat.title}
          </p>

          <p
            className="absolute bottom-6 left-6 right-6 text-sm leading-[1.5] md:bottom-16 md:left-10 md:right-auto md:w-[450px] md:text-base lg:bottom-[112px] lg:left-14 lg:w-[587px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {cat.description}
          </p>
        </section>
      ))}

      {/* ── CTA ── */}
      <section className="relative bg-white px-6 py-16 md:px-10 md:py-24 lg:h-[796px] lg:px-14 lg:pt-[130px]">
        <div className="relative">
          <h2
            className="text-[48px] font-semibold uppercase leading-[1.1] text-ink sm:text-[64px] md:text-[80px] lg:text-[122px]"
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

          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
            <div className="absolute left-[389px] top-[-36px] h-[230px] w-[230px]">
              <svg className="absolute left-[47px] top-[47px] h-[136px] w-[136px]" viewBox="0 0 122 135" fill="none">
                <path d="M43.888 12.9845C48.8288 -4.32817 73.3642 -4.32817 78.305 12.9845C80.9554 22.2715 90.4967 27.7802 99.8647 25.432C117.328 21.0545 129.596 42.3028 117.073 55.238C110.356 62.1769 110.356 73.1942 117.073 80.133C129.596 93.0682 117.328 114.317 99.8647 109.939C90.4967 107.591 80.9554 113.099 78.305 122.387C73.3642 139.699 48.8288 139.699 43.888 122.387C41.2376 113.099 31.6963 107.591 22.3283 109.939C4.8647 114.317 -7.40303 93.0682 5.11978 80.133C11.8374 73.1942 11.8374 62.1769 5.11978 55.238C-7.40303 42.3028 4.86469 21.0545 22.3283 25.432C31.6963 27.7802 41.2376 22.2715 43.888 12.9845Z" fill="#D03F50"/>
              </svg>
              <svg className="absolute left-[75px] top-[75px] h-[80px] w-[80px]" viewBox="0 0 80 80" fill="none">
                <path d="M26.667 66.667h-10a3.333 3.333 0 01-3.334-3.334V30a3.333 3.333 0 013.334-3.333h10V66.667z" fill="white"/>
                <path d="M53.333 26.667h10a3.333 3.333 0 013.334 3.333v33.333a3.333 3.333 0 01-3.334 3.334h-10V26.667z" fill="white"/>
                <rect x="26.667" y="16.667" width="26.667" height="50" rx="3.333" fill="white"/>
                <path d="M33.333 16.667v-3.334a6.667 6.667 0 0113.334 0v3.334" stroke="white" strokeWidth="2"/>
                <rect x="33.333" y="30" width="13.333" height="20" rx="1.667" fill="#D03F50"/>
              </svg>
            </div>

            <div className="absolute left-[502px] top-[245px] h-[215px] w-[215px]">
              <svg className="absolute left-[26px] top-[16px] h-[145px] w-[162px]" viewBox="0 0 162 145" fill="none">
                <path d="M64.226 9.667c7.436-12.889 26.026-12.889 33.462 0L159.17 115.5c7.436 12.889-1.859 29-16.731 29H19.475c-14.872 0-24.167-16.111-16.73-29L64.226 9.667z" fill="#125E65"/>
              </svg>
              <svg className="absolute left-[60px] top-[55px] h-[110px] w-[95px]" viewBox="0 0 95 110" fill="none">
                <rect x="10" y="35" width="45" height="60" rx="2" fill="white"/>
                <rect x="18" y="45" width="10" height="10" fill="#125E65"/>
                <rect x="18" y="60" width="10" height="10" fill="#125E65"/>
                <rect x="18" y="75" width="10" height="10" fill="#125E65"/>
                <rect x="37" y="45" width="10" height="10" fill="#125E65"/>
                <rect x="37" y="60" width="10" height="10" fill="#125E65"/>
                <rect x="37" y="75" width="10" height="10" fill="#125E65"/>
                <path d="M75 95c0-16.569-11.193-30-25-30" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <ellipse cx="75" cy="45" rx="15" ry="25" fill="white"/>
                <path d="M75 20v75" stroke="white" strokeWidth="4"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-10 text-left md:mt-16 lg:absolute lg:right-14 lg:top-[463px] lg:mt-0 lg:w-[460px] lg:text-right">
          <p
            className="text-lg leading-[1.5] text-subtext md:text-xl lg:text-2xl"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {page.finalCta.body}
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row lg:justify-end">
            <Link
              href={page.finalCta.secondaryHref}
              className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-[rgba(208,63,80,0.1)] text-base font-medium text-ink sm:w-[182px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {page.finalCta.secondaryLabel}
            </Link>
            <Link
              href={page.finalCta.primaryHref}
              className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-rust text-base font-medium text-white sm:w-[182px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {page.finalCta.primaryLabel}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
