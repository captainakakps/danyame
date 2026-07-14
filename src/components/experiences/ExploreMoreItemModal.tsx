"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import type { ExploreMoreItem } from "@/lib/pages/experiences";
import { pages } from "@/lib/tokens";

type ExploreMoreItemModalProps = {
  item: ExploreMoreItem;
  onClose: () => void;
};

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-ink"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path
        d="M6 10.5l2.5 2.5L14 7.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DetailRow({
  label,
  value,
  showDivider = true,
}: {
  label: string;
  value: string;
  showDivider?: boolean;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <p
          className="text-[20px] font-medium leading-none text-ink sm:text-[24px]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {label}
        </p>
        <p
          className="text-base leading-normal text-subtext"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {value}
        </p>
      </div>
      {showDivider ? <div className="h-px w-full bg-[#e2e5e6]" /> : null}
    </div>
  );
}

export default function ExploreMoreItemModal({
  item,
  onClose,
}: ExploreMoreItemModalProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const secondaryHref = item.secondaryCtaHref ?? pages.contact;
  const primaryHref = item.primaryCtaHref ?? pages.contact;

  return (
    <div className="fixed inset-0 z-[10000] flex items-end justify-center p-4 sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close dialog"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="explore-more-modal-title"
        className="relative z-[10001] flex max-h-[min(92vh,1214px)] w-full max-w-[996px] flex-col overflow-hidden rounded-[24px] bg-white sm:rounded-[32px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 justify-end px-6 pb-8 pt-6 sm:px-10 sm:pb-8 sm:pt-10">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#e6e6e6] transition-colors hover:bg-[#dcdcdc]"
            aria-label="Close"
          >
            <svg
              className="h-6 w-6 text-ink"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 sm:px-10 sm:pb-10">
          <div className="flex flex-col gap-10 sm:gap-12">
              <div className="flex flex-col gap-8 sm:gap-10">
                <div className="relative h-[220px] overflow-hidden rounded-[20px] sm:h-[340px]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 996px) 100vw, 996px"
                    priority
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <h2
                    id="explore-more-modal-title"
                    className="text-[32px] font-medium leading-none text-ink sm:text-[48px] lg:text-[56px]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.name}
                  </h2>
                  <p
                    className="max-w-[765px] text-base leading-normal text-subtext"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="h-px w-full bg-[#e2e5e6]" />

              <div className="flex flex-col gap-6">
                {item.detailRows.map((row, index) => (
                  <DetailRow
                    key={`${row.label}-${index}`}
                    label={row.label}
                    value={row.value}
                    showDivider
                  />
                ))}

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4">
                    <p
                      className="text-[20px] font-medium leading-none text-ink sm:text-[24px]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Includes
                    </p>
                    <ul className="flex flex-col gap-4">
                      {item.includes.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-base leading-none text-subtext"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          <CheckIcon />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="h-px w-full bg-[#e2e5e6]" />
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
                <Link
                  href={secondaryHref}
                  className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-[rgba(208,63,80,0.1)] text-base font-medium text-ink sm:w-[182px]"
                  style={{ fontFamily: "var(--font-body)" }}
                  onClick={onClose}
                >
                  {item.secondaryCtaLabel ?? "Contact Us"}
                </Link>
                <Link
                  href={primaryHref}
                  className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-rust text-base font-medium text-white sm:w-[182px]"
                  style={{ fontFamily: "var(--font-body)" }}
                  onClick={onClose}
                >
                  {item.primaryCtaLabel}
                </Link>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
