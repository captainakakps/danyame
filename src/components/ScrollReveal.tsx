"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: string;
  className?: string;
  lineClassName?: string;
};

function splitTextIntoLines(
  container: HTMLElement,
  words: string[],
): string[] {
  const wordSpans = container.querySelectorAll<HTMLElement>("[data-word]");
  if (wordSpans.length === 0) {
    return [words.join(" ")];
  }

  const lines: string[][] = [];
  let currentLine: string[] = [];
  let lastTop = -1;

  wordSpans.forEach((span, index) => {
    const top = span.offsetTop;

    if (lastTop !== -1 && top > lastTop) {
      lines.push(currentLine);
      currentLine = [];
    }

    currentLine.push(words[index] ?? span.textContent ?? "");
    lastTop = top;
  });

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  return lines.map((line) => line.join(" "));
}

export default function ScrollReveal({
  children,
  className = "",
  lineClassName = "text-ink",
}: ScrollRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[] | null>(null);

  const words = useMemo(
    () => children.split(/\s+/).filter(Boolean),
    [children],
  );

  useLayoutEffect(() => {
    const measureEl = measureRef.current;
    if (!measureEl) {
      return;
    }

    const updateLines = () => {
      setLines(splitTextIntoLines(measureEl, words));
    };

    updateLines();

    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    const observer = new ResizeObserver(updateLines);
    observer.observe(wrapper);

    return () => {
      observer.disconnect();
    };
  }, [children, className, words]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !lines?.length) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      const lineElements = container.querySelectorAll<HTMLElement>(".scroll-reveal-line");

      gsap.fromTo(
        lineElements,
        {
          opacity: 0.12,
          y: 48,
          filter: "blur(10px)",
          willChange: "opacity, transform, filter",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "none",
          stagger: 0.18,
          scrollTrigger: {
            trigger: container,
            start: "top 88%",
            end: "top 42%",
            scrub: 0.8,
          },
        },
      );
    }, container);

    return () => {
      context.revert();
    };
  }, [lines]);

  return (
    <div
      ref={wrapperRef}
      className={`relative mx-auto w-full max-w-[850px] ${className}`}
      style={{ fontFamily: "var(--font-heading)" }}
    >
      <p
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute inset-x-0 top-0"
      >
        {words.map((word, index) => (
          <span key={`measure-${word}-${index}`} data-word className="inline">
            {word}
            {index < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>

      <div ref={containerRef} className={lines ? undefined : "opacity-0"}>
        {(lines ?? [children]).map((line, index) => (
          <span
            key={`${line}-${index}`}
            className={`scroll-reveal-line block ${lineClassName}`}
          >
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}
