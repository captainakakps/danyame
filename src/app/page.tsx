import Image from "next/image";
import Link from "next/link";
import { pages } from "@/lib/tokens";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryGrid from "@/components/CategoryGrid";

export default function HomePage() {
  return (
    // <>
    <div className="bg-white overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative min-h-[600px] w-full text-white lg:h-[1014px]">
        <Image
          src="/assets/home/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10">
          <Navbar />

          {/* Hero content — 900px container matching Figma */}
          <div className="relative mx-auto h-[480px] max-w-[1440px] sm:h-[600px] lg:h-[900px]">
            {/* ── Decorations (lg+ only, exact Figma positions) ── */}
            <div
              className="pointer-events-none absolute inset-0 hidden lg:block"
              aria-hidden
            >
              {/* Crimson starburst with chair icon */}
              <div className="absolute left-[931px] top-[105px] h-[230px] w-[230px]">
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
                {/* Chair icon */}
                <svg
                  className="absolute left-[83px] top-[80px] h-[69px] w-[63px]"
                  viewBox="0 0 63 69"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M44.865 38.428v2.988h-1.374v-2.988c.444.083.93.083 1.374 0zm2.474 8.418v5.494h1.375v-5.494h-1.375zM15.486 68.061c0 .257.106.492.277.665.168.169.403.274.662.274h4.043a.939.939 0 00.939-.939v-5.096h-5.921v5.096zm41.796-14.347H25.86c-2.087 0-6.31 0-8.403 0-.236-.002-.466-.124-.593-.344L7.322 36.845c-2.758-4.349-9.234-.578-6.776 3.979l10.853 18.798c.73 1.276 2.087 1.981 3.518 1.968 4.653-.002 29.874.002 35.07 0h7.296c3.445.081 5.26-4.377 2.784-6.726-.71-.71-1.695-1.15-2.784-1.15zm-6.608 14.347c0 .257.106.492.277.663.17.17.405.276.662.276h4.044a.939.939 0 00.939-.939v-5.096h-5.922v5.096zm11.193-25.27H34.185c-1.751.033-1.768 2.645 0 2.681h27.682a.936.936 0 00.946-.394c.839-.782.217-2.324-.946-2.287zm-15.231-8.134v-3.303h-4.916v3.303c0 1.35 1.108 2.458 2.458 2.458s2.458-1.108 2.458-2.458zM22.491 52.34h2.681V20.32a14.73 14.73 0 00-2.681-.063v32.083zm9.438-32.392c3.976-.64 8.041-.61 12.007.268-.256-9.89-7.462-18.167-17.084-19.893 1.12 1.182 2.099 2.938 2.886 5.126 1.355 3.766 2.181 8.866 2.191 14.499zm-1.37-.089c.002-6.23-1.542-19.028-7.088-19.858-5.6.69-7.495 13.499-7.66 19.786a34.158 34.158 0 0114.748.072zm-16.119-.014c.159-5.692 1.135-10.822 2.608-14.578.849-2.164 1.877-3.891 3.03-5.04C10.393 1.682 2.945 9.777 2.432 19.675a34.42 34.42 0 0112.008.17z"
                    fill="white"
                  />
                </svg>
              </div>

              {/* Orange ellipse with music icons */}
              <div className="absolute left-[411px] top-[312px] h-[114px] w-[114px]">
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 114 114"
                  fill="none"
                >
                  <circle cx="57" cy="57" r="57" fill="#F39D57" />
                </svg>
                {/* Music note icon */}
                <svg
                  className="absolute left-[21px] top-[27px] h-[60px] w-[72px]"
                  viewBox="0 0 72 60"
                  fill="none"
                >
                  <path
                    d="M35.242 3.222c0-.91-.38-1.819-1.137-2.425-.682-.607-1.667-.91-2.577-.758L11.368 2.69c-1.591.228-2.804 1.592-2.804 3.183v17.508a6.745 6.745 0 00-1.819-.228c-3.79 0-6.745 2.501-6.745 5.684 0 3.183 2.956 5.684 6.745 5.684 3.79 0 6.745-2.5 6.745-5.684V13.226l16.9-2.198v9.474a6.745 6.745 0 00-1.818-.227c-3.79 0-6.745 2.5-6.745 5.684 0 3.183 2.955 5.684 6.745 5.684 3.79 0 6.745-2.501 6.745-5.684V3.222z"
                    fill="white"
                    transform="translate(18, 12)"
                  />
                  <path
                    d="M12.505 3.651C9.095.241 4.32-.744 0 .544l15.612 15.612c1.289-4.32.228-9.094-3.107-12.505z"
                    fill="white"
                    transform="translate(50, 38)"
                  />
                </svg>
              </div>

              {/* Teal triangle with smiley centered inside */}
              <div className="absolute left-[988px] top-[398px] flex h-[260px] w-[260px] origin-center rotate-[9.1deg] items-center justify-center">
                <svg
                  className="absolute h-[150px] w-[167px]"
                  viewBox="0 0 167 150"
                  fill="none"
                >
                  <path
                    d="M66.362 10c7.698-13.333 26.943-13.333 34.641 0l63.653 110.25c7.698 13.333-1.924 30-17.32 30H20.03c-15.396 0-25.019-16.667-17.32-30L66.362 10z"
                    fill="#125E65"
                  />
                </svg>
                {/* Smiley icon centered on triangle */}
                <svg
                  className="relative z-10 mt-4 h-[67px] w-[67px]"
                  viewBox="0 0 67.5 67.5"
                  fill="none"
                >
                  <path
                    d="M33.745 0C15.142 0 0 15.142 0 33.745c0 18.602 15.142 33.744 33.745 33.744 18.602 0 33.744-15.142 33.744-33.744C67.49 15.142 52.347 0 33.745 0zM12.979 28.553c0-4.292 3.495-7.787 7.787-7.787s7.787 3.495 7.787 7.787a.865.865 0 11-1.73 0c0-3.34-2.717-6.057-6.057-6.057s-6.057 2.717-6.057 6.057a.865.865 0 11-1.73 0zm31.685 27.013a.865.865 0 01-.225.139c-3.098 1.972-6.749 3.149-10.695 3.149-3.945 0-7.597-1.16-10.694-3.15a.865.865 0 01-.225-.138c-5.399-3.565-8.981-9.674-8.981-16.63 0-.485.38-.866.865-.866h38.071c.485 0 .866.38.866.865 0 6.94-3.582 13.065-8.982 16.63zm8.981-26.148a.865.865 0 01-.865-.865c0-3.34-2.717-6.057-6.057-6.057s-6.056 2.717-6.056 6.057a.865.865 0 11-1.731 0c0-4.292 3.496-7.787 7.787-7.787s7.787 3.495 7.787 7.787a.865.865 0 01-.865.865z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            {/* ── Headlines (exact Figma positions on lg) ── */}
            <div className="absolute inset-x-0 top-[80px] flex flex-col items-center px-6 lg:inset-x-auto lg:left-[480px] lg:top-[154px] lg:items-start lg:px-0">
              <p
                className="text-center text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-none lg:text-left lg:text-[80px]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Relaxation
              </p>
            </div>

            <div className="absolute inset-x-0 top-[150px] flex items-center justify-center px-6 lg:inset-x-auto lg:left-[449.97px] lg:top-[240.97px] lg:h-[108.807px] lg:w-[632.011px] lg:justify-start lg:px-0">
              <p
                className="rotate-[2.63deg] text-center text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-none lg:text-left lg:text-[80px]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Entertainment
              </p>
            </div>

            <div className="absolute inset-x-0 top-[230px] flex items-center justify-center px-6 lg:inset-x-auto lg:left-[430px] lg:top-[369px] lg:h-[216.5px] lg:w-[679.326px] lg:justify-start lg:px-0">
              <p
                className="-rotate-[4.9deg] max-w-[668px] text-center text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-none lg:text-left lg:text-[80px]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Unforgettable Experiences
              </p>
            </div>

            {/* ── Subtext (exact Figma position on lg) ── */}
            <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-4 px-6 text-center lg:inset-x-auto lg:bottom-auto lg:left-[445px] lg:top-[712px] lg:w-[551px] lg:px-0">
              <p
                className="text-lg font-normal leading-[1.2] lg:text-[24px]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Your Ultimate Destination for Relaxation, Entertainment &amp;
                Unforgettable Experiences
              </p>
              <p
                className="max-w-[537px] text-sm font-normal leading-[1.3] lg:text-[16px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                From vibrant nightlife and poolside vibes to unforgettable
                events and social experiences Danyame Recreational Village is
                where moments come alive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Everything You Need Section ── */}
      <section className="bg-white px-6 py-16 md:px-10 lg:px-[56px] lg:pb-[72px] lg:pt-[130px]">
        <div className="mx-auto flex max-w-[1328px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
          <h2
            className="text-lg font-medium leading-[1.1] text-ink md:text-4xl lg:w-[440px] lg:text-[50px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Everything You Need in One Place
          </h2>
          <div className="flex flex-col gap-6 lg:w-[566px]">
            <p
              className="text-[14px] leading-[1.5] text-subtext md:text-[16px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Designed to bring people together through a mix of energy,
              relaxation, and entertainment giving you the freedom to move from
              one experience to another.
            </p>
            <Link
              href={pages.experiences}
              className="flex h-[50px] w-[182px] items-center justify-center rounded-[100px] bg-rust text-[16px] font-medium text-white"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ── Category Grid Section ── */}
      <CategoryGrid />

      {/* ── A Place Built for People Section ── */}
      <section className="bg-white px-6 py-16 md:px-10 lg:px-[56px] lg:pb-[80px] lg:pt-[130px]">
        <div className="mx-auto flex max-w-[1328px] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-0">
          <div className="flex flex-col gap-10 lg:w-[587px] lg:gap-[104px]">
            <div className="flex flex-col gap-8 lg:gap-12">
              <h2
                className="text-lg font-medium leading-[1.1] text-ink md:text-4xl lg:text-[50px]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                A Place Built for People
              </h2>
              <p
                className="text-base leading-[1.5] text-subtext md:text-lg lg:text-[24px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Danyame Recreational Village is a vibrant leisure and
                entertainment destination located in Akwatia. Designed for
                individuals, families, and corporate groups, we bring together
                relaxation, nightlife, and social experiences in one dynamic
                space.
              </p>
            </div>
            <Link
              href={pages.about}
              className="flex h-[50px] w-fit items-center justify-center rounded-[100px] bg-rust px-[24px] text-[16px] font-medium text-white"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Learn More About US
            </Link>
          </div>
          <Image
            src="/assets/home/about-building.jpg"
            alt="Danyame building"
            width={497}
            height={438}
            className="h-auto w-full shrink-0 object-contain object-bottom opacity-80 lg:h-[438px] lg:w-[497px]"
          />
        </div>
      </section>

      {/* ── Upcoming Events Section ── */}
      <section className="relative bg-white px-6 py-16 md:px-10 lg:h-[1245px] lg:px-[56px] lg:py-0">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-6 lg:absolute lg:left-1/2 lg:top-[130px] lg:-translate-x-1/2">
          <h2
            className="text-center text-[28px] font-medium uppercase leading-[1.1] text-ink md:text-[32px] lg:text-[40px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Upcoming Events
          </h2>
          <div className="flex items-center gap-2">
            <span className="h-[9px] w-14 rounded-full bg-amber/30" />
            <span className="h-[9px] w-[135px] rounded-full bg-amber" />
            <span className="h-[9px] w-14 rounded-full bg-amber/30" />
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="mt-12 flex flex-col gap-10 lg:hidden">
          {/* Left Content */}
          <div className="flex flex-col gap-8">
            <h3
              className="text-lg font-medium leading-[1.2] text-ink md:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              EXPERIENCES THAT KEEP
              <br />
              THE VIBE ALIVE
            </h3>
            <p
              className="text-[14px] leading-[1.5] text-subtext md:text-[16px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              From high energy nights ro chill poolside sessions, something
              exciting is always happening at Danyame.
            </p>
            <div
              className="flex flex-wrap items-center gap-4 text-[14px] text-subtext md:gap-6 md:text-[16px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M17.5 8.33v5a3.33 3.33 0 01-3.33 3.34H5.83a3.33 3.33 0 01-3.33-3.34v-5m15 0V6.67a3.33 3.33 0 00-3.33-3.34H5.83A3.33 3.33 0 002.5 6.67v1.66m15 0H2.5M6.67 3.33V1.67M13.33 3.33V1.67"
                    stroke="#575757"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Every Week
              </span>
              <span className="h-5 w-px bg-muted" />
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 10.83a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                    stroke="#575757"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M10 18.33c3.33-3.33 6.67-6.31 6.67-10a6.67 6.67 0 00-13.34 0c0 3.69 3.34 6.67 6.67 10z"
                    stroke="#575757"
                    strokeWidth="1.5"
                  />
                </svg>
                Akwatia, Eastern Region
              </span>
              <span className="h-5 w-px bg-muted" />
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M15 17.5v-1.25a2.5 2.5 0 00-2.5-2.5h-5a2.5 2.5 0 00-2.5 2.5v1.25M10 11.25a3.125 3.125 0 100-6.25 3.125 3.125 0 000 6.25z"
                    stroke="#575757"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Good People Great Vibes
              </span>
            </div>
            <Link
              href={pages.events}
              className="flex h-[50px] w-[171px] items-center justify-center rounded-[100px] bg-rust text-[16px] font-medium text-white"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Register
            </Link>
          </div>

          {/* Countdown Card */}
          <aside className="flex w-full flex-col items-center gap-8 rounded-[20px] bg-crimson px-8 py-8 text-white">
            <p
              className="text-[18px] font-medium"
              style={{ fontFamily: "var(--font-body)" }}
            >
              NEXT EVENT IN
            </p>
            <div className="flex flex-row items-center gap-6 text-center">
              <div>
                <p
                  className="text-[48px] font-medium leading-none"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  30
                </p>
                <p
                  className="text-[14px]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  DAYS
                </p>
              </div>
              <div>
                <p
                  className="text-[48px] font-medium leading-none"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  21
                </p>
                <p
                  className="text-[14px]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  HOURS
                </p>
              </div>
              <div>
                <p
                  className="text-[48px] font-medium leading-none"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  39
                </p>
                <p
                  className="text-[14px]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  MINUTES
                </p>
              </div>
            </div>
            <Link
              href={pages.events}
              className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-white text-[16px] font-medium text-subtext"
              style={{ fontFamily: "var(--font-body)" }}
            >
              View All Events
            </Link>
          </aside>

          {/* Planning an Event CTA Card */}
          <div className="flex flex-col items-center gap-4 overflow-hidden rounded-[20px] bg-crimson text-white sm:flex-row sm:items-stretch sm:gap-0">
            <Image
              src="/assets/home/event-thumb.jpg"
              alt="Planning an event"
              width={162}
              height={138}
              className="h-[180px] w-full object-cover sm:h-[138px] sm:w-[162px] sm:rounded-[20px]"
            />
            <div className="flex flex-col items-center gap-4 px-6 pb-6 sm:flex-row sm:items-center sm:gap-4 sm:py-4 sm:pr-6">
              <div className="text-center sm:w-[281px] sm:text-left">
                <p
                  className="text-[18px] font-medium"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Planning an event?
                </p>
                <p
                  className="mt-2 text-[14px] leading-[1.2]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Let us help you create unforgettable memories for any occasion
                </p>
              </div>
              <Link
                href={pages.contact}
                className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-white px-6 text-[16px] font-medium text-subtext sm:w-auto"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Book an Event
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Layout — absolute positioning like Figma */}
        <div className="hidden lg:block">
          {/* Left Content */}
          <div className="absolute left-[56px] top-[355px]">
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-8">
                <h3
                  className="whitespace-nowrap text-[72px] font-medium leading-[1.2] text-ink"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  EXPERIENCES THAT KEEP
                  <br />
                  THE VIBE ALIVE
                </h3>
                <p
                  className="max-w-[507px] text-[16px] leading-[1.5] text-subtext"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  From high energy nights ro chill poolside sessions, something
                  exciting is always happening at Danyame.
                </p>
              </div>
              <div
                className="flex items-center gap-6 text-[16px] text-subtext"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span className="flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M17.5 8.33v5a3.33 3.33 0 01-3.33 3.34H5.83a3.33 3.33 0 01-3.33-3.34v-5m15 0V6.67a3.33 3.33 0 00-3.33-3.34H5.83A3.33 3.33 0 002.5 6.67v1.66m15 0H2.5M6.67 3.33V1.67M13.33 3.33V1.67"
                      stroke="#575757"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Every Week
                </span>
                <span className="h-5 w-px bg-muted" />
                <span className="flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 10.83a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                      stroke="#575757"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M10 18.33c3.33-3.33 6.67-6.31 6.67-10a6.67 6.67 0 00-13.34 0c0 3.69 3.34 6.67 6.67 10z"
                      stroke="#575757"
                      strokeWidth="1.5"
                    />
                  </svg>
                  Akwatia, Eastern Region
                </span>
                <span className="h-5 w-px bg-muted" />
                <span className="flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M15 17.5v-1.25a2.5 2.5 0 00-2.5-2.5h-5a2.5 2.5 0 00-2.5 2.5v1.25M10 11.25a3.125 3.125 0 100-6.25 3.125 3.125 0 000 6.25z"
                      stroke="#575757"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Good People Great Vibes
                </span>
              </div>
            </div>
            <Link
              href={pages.events}
              className="mt-16 flex h-[50px] w-[171px] items-center justify-center rounded-[100px] bg-rust text-[16px] font-medium text-white"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Register
            </Link>
          </div>

          {/* Right Countdown Card */}
          <aside className="absolute right-[56px] top-[355px] flex h-[760px] w-[263px] flex-col items-center justify-between rounded-[20px] bg-crimson px-[53px] py-8 text-white">
            <p
              className="text-[20px] font-medium"
              style={{ fontFamily: "var(--font-body)" }}
            >
              NEXT EVENT IN
            </p>
            <div className="flex flex-col items-center gap-10 text-center">
              <div>
                <p
                  className="text-[90px] font-medium leading-none"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  30
                </p>
                <p
                  className="text-[16px]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  DAYS
                </p>
              </div>
              <div className="h-px w-[126px] bg-white/40" />
              <div>
                <p
                  className="text-[90px] font-medium leading-none"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  21
                </p>
                <p
                  className="text-[16px]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  HOURS
                </p>
              </div>
              <div className="h-px w-[126px] bg-white/40" />
              <div>
                <p
                  className="text-[90px] font-medium leading-none"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  39
                </p>
                <p
                  className="text-[16px]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  MINUTES
                </p>
              </div>
            </div>
            <Link
              href={pages.events}
              className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-white text-[16px] font-medium text-subtext"
              style={{ fontFamily: "var(--font-body)" }}
            >
              View All Events
            </Link>
          </aside>

          {/* Planning an Event CTA Card */}
          <div className="absolute left-[56px] top-[977px] flex items-center gap-4 overflow-hidden rounded-[20px] bg-crimson pr-6 text-white">
            <Image
              src="/assets/home/event-thumb.jpg"
              alt="Planning an event"
              width={162}
              height={138}
              className="h-[138px] w-[162px] rounded-[20px] object-cover"
            />
            <div className="flex items-center gap-4 py-4">
              <div className="w-[281px]">
                <p
                  className="text-[20px] font-medium"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Planning an event?
                </p>
                <p
                  className="mt-[10px] text-[16px] leading-[1.2]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Let us help you create unforgettable memories for any occasion
                </p>
              </div>
              <Link
                href={pages.contact}
                className="flex h-[50px] items-center justify-center rounded-[100px] bg-white px-6 text-[16px] font-medium text-subtext"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Book an Event
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Moments at Danyame Section ── */}
      <section className="bg-teal px-6 py-16 md:px-10 lg:px-[56px] lg:py-[130px]">
        {/* Header */}
        <div className="text-white">
          <h2
            className="text-[32px] font-medium leading-[1.1] md:text-[40px] lg:whitespace-nowrap lg:text-[56px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Moments at Danyame
          </h2>
          <p
            className="mt-4 max-w-[545px] text-[14px] leading-[1.2] md:text-[16px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            A glimpse into the experience, energy, and memories created here
          </p>
        </div>

        {/* Mobile/Tablet Gallery Grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:hidden">
          <div className="col-span-2 aspect-[4/3] overflow-hidden rounded-[20px]">
            <Image
              src="/assets/home/gallery-1.jpg"
              alt="Gallery image 1"
              width={486}
              height={362}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-[1/1.3] overflow-hidden rounded-[20px]">
            <Image
              src="/assets/home/gallery-2.jpg"
              alt="Gallery image 2"
              width={611}
              height={565}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-[1/1.3] overflow-hidden rounded-[20px]">
            <Image
              src="/assets/home/gallery-3.jpg"
              alt="Gallery image 3"
              width={346}
              height={453}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-[1/1.3] overflow-hidden rounded-[20px]">
            <Image
              src="/assets/home/gallery-4.jpg"
              alt="Gallery image 4"
              width={346}
              height={453}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-[1/1.3] overflow-hidden rounded-[20px]">
            <Image
              src="/assets/home/gallery-7.jpg"
              alt="Gallery image 5"
              width={347}
              height={453}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-[1/1.3] overflow-hidden rounded-[20px]">
            <Image
              src="/assets/home/gallery-5.jpg"
              alt="Gallery image 6"
              width={346}
              height={453}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-[1/1.3] overflow-hidden rounded-[20px]">
            <Image
              src="/assets/home/gallery-6.jpg"
              alt="Gallery image 7"
              width={346}
              height={453}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Desktop Gallery — flex layout that fills width */}
        <div className="mt-10 hidden flex-col gap-[100px] lg:flex">
          {/* Row 1: small left (36.6%), large right (46%), gap between */}
          <div className="flex items-start justify-between">
            <div
              className="relative overflow-hidden rounded-[20px]"
              style={{ width: "36.6%", aspectRatio: "486/362" }}
            >
              <Image
                src="/assets/home/gallery-1.jpg"
                alt="Gallery image 1"
                fill
                className="object-cover"
              />
            </div>
            <div
              className="relative overflow-hidden rounded-[20px]"
              style={{ width: "46%", aspectRatio: "611/565" }}
            >
              <Image
                src="/assets/home/gallery-2.jpg"
                alt="Gallery image 2"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Row 2: two left (54%), one right (26%), gap between */}
          <div className="flex items-start justify-between">
            <div
              className="flex gap-6"
              style={{ width: "54%", aspectRatio: "717/453" }}
            >
              <div className="relative h-full flex-1 overflow-hidden rounded-[20px]">
                <Image
                  src="/assets/home/gallery-3.jpg"
                  alt="Gallery image 3"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-full flex-1 overflow-hidden rounded-[20px]">
                <Image
                  src="/assets/home/gallery-4.jpg"
                  alt="Gallery image 4"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div
              className="relative overflow-hidden rounded-[20px]"
              style={{ width: "26%", aspectRatio: "347/453" }}
            >
              <Image
                src="/assets/home/gallery-7.jpg"
                alt="Gallery image 5"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Row 3: two images on right side (54% of width) */}
          <div className="flex justify-end">
            <div
              className="flex gap-6"
              style={{ width: "54%", aspectRatio: "717/453" }}
            >
              <div className="relative h-full flex-1 overflow-hidden rounded-[20px]">
                <Image
                  src="/assets/home/gallery-5.jpg"
                  alt="Gallery image 6"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-full flex-1 overflow-hidden rounded-[20px]">
                <Image
                  src="/assets/home/gallery-6.jpg"
                  alt="Gallery image 7"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* View Full Gallery Button */}
        <Link
          href={pages.gallery}
          className="mt-10 flex h-[50px] w-[171px] items-center justify-center rounded-[100px] bg-white text-[16px] font-medium text-ink lg:mt-16"
          style={{ fontFamily: "var(--font-body)" }}
        >
          View Full Gallery
        </Link>
      </section>

      {/* ── Ready For Your Next Experience Section ── */}
      <section className="relative bg-white px-6 py-16 md:px-10 lg:h-[796px] lg:px-14 lg:py-0 lg:pt-[130px]">
        {/* Heading with decorations */}
        <div className="relative">
          <h2
            className="text-[48px] font-semibold uppercase leading-[1.1] text-ink md:text-[72px] lg:text-[122px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            READY
            <br />
            FOR YOUR
            <br />
            NEXT
            <br />
            EXPERIENCE
          </h2>

          {/* Decorative elements — desktop only */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
            {/* Crimson starburst with luggage icon — positioned after "READY" */}
            <div className="absolute left-[389px] top-[-36px] h-[230px] w-[230px]">
              {/* Starburst shape */}
              <svg className="absolute left-[47px] top-[47px] h-[136px] w-[136px]" viewBox="0 0 122 135" fill="none">
                <path d="M43.888 12.9845C48.8288 -4.32817 73.3642 -4.32817 78.305 12.9845C80.9554 22.2715 90.4967 27.7802 99.8647 25.432C117.328 21.0545 129.596 42.3028 117.073 55.238C110.356 62.1769 110.356 73.1942 117.073 80.133C129.596 93.0682 117.328 114.317 99.8647 109.939C90.4967 107.591 80.9554 113.099 78.305 122.387C73.3642 139.699 48.8288 139.699 43.888 122.387C41.2376 113.099 31.6963 107.591 22.3283 109.939C4.8647 114.317 -7.40303 93.0682 5.11978 80.133C11.8374 73.1942 11.8374 62.1769 5.11978 55.238C-7.40303 42.3028 4.86469 21.0545 22.3283 25.432C31.6963 27.7802 41.2376 22.2715 43.888 12.9845Z" fill="#D03F50"/>
              </svg>
              {/* Luggage/gift icon */}
              <svg className="absolute left-[75px] top-[75px] h-[80px] w-[80px]" viewBox="0 0 80 80" fill="none">
                <path d="M26.667 66.667h-10a3.333 3.333 0 01-3.334-3.334V30a3.333 3.333 0 013.334-3.333h10V66.667z" fill="white"/>
                <path d="M53.333 26.667h10a3.333 3.333 0 013.334 3.333v33.333a3.333 3.333 0 01-3.334 3.334h-10V26.667z" fill="white"/>
                <rect x="26.667" y="16.667" width="26.667" height="50" rx="3.333" fill="white"/>
                <path d="M33.333 16.667v-3.334a6.667 6.667 0 0113.334 0v3.334" stroke="white" strokeWidth="2"/>
                <rect x="33.333" y="30" width="13.333" height="20" rx="1.667" fill="#D03F50"/>
              </svg>
            </div>

            {/* Teal triangle with hotel/palm icon — positioned after "NEXT" */}
            <div className="absolute left-[502px] top-[245px] h-[215px] w-[215px]">
              {/* Triangle shape */}
              <svg className="absolute left-[26px] top-[16px] h-[145px] w-[162px]" viewBox="0 0 162 145" fill="none">
                <path d="M64.226 9.667c7.436-12.889 26.026-12.889 33.462 0L159.17 115.5c7.436 12.889-1.859 29-16.731 29H19.475c-14.872 0-24.167-16.111-16.73-29L64.226 9.667z" fill="#125E65"/>
              </svg>
              {/* Hotel/palm icon */}
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

        {/* Right content — CTA */}
        <div className="mt-10 lg:absolute lg:right-14 lg:top-[463px] lg:mt-0 lg:w-[460px] lg:text-right">
          <p
            className="text-[18px] leading-[1.5] text-subtext md:text-[20px] lg:text-[24px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Book your event, plan your visit, or reach out to learn more.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row lg:justify-end">
            <Link
              href={pages.contact}
              className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-[rgba(208,63,80,0.1)] text-[16px] font-medium text-ink sm:w-[182px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Contact Us
            </Link>
            <Link
              href={pages.contact}
              className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-rust text-[16px] font-medium text-white sm:w-[182px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Book an Event
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    // </>
  );
}
