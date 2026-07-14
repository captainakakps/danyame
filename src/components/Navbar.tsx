"use client";

import { useState, useEffect, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  navItems,
  navCta,
  isNavItemActive,
  isNavChildActive,
} from "@/lib/navigation";

const logoLight = "/assets/logo.png";
const logoDark = "/assets/logo-dark.png";

interface NavbarProps {
  /** Use "dark" on pages with white backgrounds (Contact page), default "light" for dark hero sections */
  variant?: "light" | "dark";
}

export default function Navbar({ variant = "light" }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const logo = variant === "dark" ? logoDark : logoLight;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (pathname === href) {
      event.preventDefault();
      setIsMenuOpen(false);
    }
  };

  const menuOverlay =
    isMenuOpen && isMounted
      ? createPortal(
          <>
            <button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[10000] cursor-default bg-black/50"
              onClick={() => setIsMenuOpen(false)}
            />

            <div
              id="site-nav-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="fixed right-4 top-4 z-[10001] max-h-[calc(100vh-2rem)] w-[280px] overflow-y-auto rounded-[20px] border border-[rgba(230,230,230,0.5)] bg-white px-4 pb-6 pt-4 shadow-xl md:right-auto md:left-1/2 md:top-[100px] md:-translate-x-1/2"
            >
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="flex h-[50px] w-full items-center justify-center gap-2 rounded-[100px] bg-rust text-base font-medium text-white"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                Close
              </button>

              <div className="mt-10">
                <p
                  className="mb-6 text-xs text-subtext/60"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Menu
                </p>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => {
                    const isActive = isNavItemActive(pathname, item);

                    return (
                      <div key={item.label} className="flex flex-col gap-2">
                        <a
                          href={item.href}
                          onClick={(event) => handleNavClick(event, item.href)}
                          className={`text-[18px] ${
                            isActive
                              ? "font-semibold text-rust"
                              : "text-ink hover:text-rust"
                          }`}
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {item.label}
                        </a>

                        {item.children && (
                          <div className="flex flex-col gap-2 border-l border-ink/10 pl-4">
                            {item.children.map((child) => {
                              const isChildActive = isNavChildActive(
                                pathname,
                                child.href,
                              );

                              return (
                                <a
                                  key={child.label}
                                  href={child.href}
                                  onClick={(event) =>
                                    handleNavClick(event, child.href)
                                  }
                                  className={`text-[15px] ${
                                    isChildActive
                                      ? "font-semibold text-rust"
                                      : "text-subtext hover:text-rust"
                                  }`}
                                  style={{ fontFamily: "var(--font-body)" }}
                                >
                                  {child.label}
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>

              <a
                href={navCta.href}
                onClick={(event) => handleNavClick(event, navCta.href)}
                className="mt-10 flex h-[50px] w-full items-center justify-center rounded-[100px] bg-rust text-base font-medium text-white md:hidden"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {navCta.label}
              </a>
            </div>
          </>,
          document.body,
        )
      : null;

  return (
    <>
      <div className="relative z-20 flex w-full shrink-0 items-center justify-between px-6 py-6 md:px-10 md:py-8 lg:px-14">
        <Link href="/" aria-label="Danyame home">
          <Image
            src={logo}
            alt="Danyame Recreational Village"
            width={104}
            height={50}
            priority
            className="h-[40px] w-[83px] object-contain md:h-[50px] md:w-[104px]"
          />
        </Link>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="site-nav-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="relative z-[10002] flex h-[44px] w-[100px] items-center justify-center gap-2 rounded-[100px] bg-rust px-4 text-[14px] font-medium text-white md:h-[50px] md:w-[123px] md:gap-3 md:px-6 md:text-base"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span className="flex flex-col gap-[5px] md:gap-[7px]" aria-hidden>
            <span
              className={`block h-[2px] w-[18px] bg-white transition-transform duration-200 md:w-[22px] ${
                isMenuOpen ? "translate-y-[3.5px] rotate-45 md:translate-y-[4.5px]" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-[18px] bg-white transition-transform duration-200 md:w-[22px] ${
                isMenuOpen ? "-translate-y-[3.5px] -rotate-45 md:-translate-y-[4.5px]" : ""
              }`}
            />
          </span>
          {isMenuOpen ? "Close" : "Menu"}
        </button>

        <Link
          href={navCta.href}
          className="hidden h-[50px] w-[182px] items-center justify-center rounded-[100px] bg-rust text-base font-medium text-white md:flex"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {navCta.label}
        </Link>
      </div>

      {menuOverlay}
    </>
  );
}
