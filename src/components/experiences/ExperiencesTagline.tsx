"use client";

import ScrollReveal from "@/components/ScrollReveal";

type ExperiencesTaglineProps = {
  primary: string;
  secondary: string;
};

export default function ExperiencesTagline({
  primary,
  secondary,
}: ExperiencesTaglineProps) {
  const fullText = `${primary}${secondary}`.trim();

  return (
    <ScrollReveal className="text-center text-[28px] font-medium leading-[1.3] text-ink sm:text-[36px] md:text-[44px] lg:text-[56px]">
      {fullText}
    </ScrollReveal>
  );
}
