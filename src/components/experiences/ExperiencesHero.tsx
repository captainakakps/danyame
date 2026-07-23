"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

import Navbar from "@/components/Navbar";

type ExperiencesHeroProps = {
  image: string;
  title: string;
};

/** Quiet hero entrance — image settles, title rises once. */
export default function ExperiencesHero({ image, title }: ExperiencesHeroProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .from(
          "[data-exp-hero-img]",
          {
            scale: 1.08,
            duration: 1.5,
            ease: "power2.out",
            clearProps: "transform",
          },
          0,
        )
        .from(
          "[data-exp-hero-title]",
          {
            opacity: 0,
            y: 48,
            duration: 0.85,
            clearProps: "opacity,transform",
          },
          0.25,
        );
    }, el);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex h-dvh min-h-[520px] w-full flex-col overflow-hidden text-white sm:min-h-[640px]"
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover will-change-transform"
        sizes="100vw"
        data-exp-hero-img
      />
      <div className="absolute inset-0 bg-black/30" />
      <Navbar />
      <div className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-12 sm:px-10 sm:pb-16 lg:px-14 lg:pb-[max(10rem,15vh)]">
        <h1
          className="max-w-[917px] text-[32px] font-semibold uppercase leading-[1.1] sm:text-[48px] md:text-[56px] lg:text-[80px] lg:leading-none"
          style={{ fontFamily: "var(--font-heading)" }}
          data-exp-hero-title
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
