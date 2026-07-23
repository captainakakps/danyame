"use client";

import { useEffect, useState } from "react";
import type { EventCountdown } from "@/lib/pages/home";
import { computeCountdown } from "@/lib/pages/home";

type CountdownTickerProps = {
  initial: EventCountdown;
  /** ISO date to tick toward; when null the server value stays frozen. */
  targetISO: string | null;
  layout: "row" | "column";
};

function FlipValue({
  value,
  className,
}: {
  value: number;
  className: string;
}) {
  return (
    <p className={className} style={{ fontFamily: "var(--font-body)" }}>
      {/* Remount on change so the flip animation replays */}
      <span key={value} className="countdown-flip">
        {value}
      </span>
    </p>
  );
}

/**
 * Live countdown. Server renders the initial value (no hydration mismatch);
 * the client re-computes every 30s and flips digits as they change.
 */
export default function CountdownTicker({
  initial,
  targetISO,
  layout,
}: CountdownTickerProps) {
  const [countdown, setCountdown] = useState(initial);

  useEffect(() => {
    if (!targetISO) {
      return;
    }

    const target = new Date(targetISO);
    if (Number.isNaN(target.getTime())) {
      return;
    }

    const update = () => {
      setCountdown(computeCountdown(target));
    };

    update();
    const interval = window.setInterval(update, 30_000);

    return () => {
      window.clearInterval(interval);
    };
  }, [targetISO]);

  const isColumn = layout === "column";
  const valueClass = isColumn
    ? "text-[90px] font-medium leading-none"
    : "text-[48px] font-medium leading-none";
  const labelClass = isColumn ? "text-[16px]" : "text-[14px]";

  const units: Array<{ label: string; value: number }> = [
    { label: "DAYS", value: countdown.days },
    { label: "HOURS", value: countdown.hours },
    { label: "MINUTES", value: countdown.minutes },
  ];

  return (
    <div
      className={
        isColumn
          ? "flex flex-col items-center gap-10 text-center"
          : "flex flex-row items-center gap-6 text-center"
      }
    >
      {units.map((unit, index) => (
        <div key={unit.label} className="contents">
          {isColumn && index > 0 ? (
            <div className="h-px w-[126px] bg-white/40" />
          ) : null}
          <div>
            <FlipValue value={unit.value} className={valueClass} />
            <p className={labelClass} style={{ fontFamily: "var(--font-body)" }}>
              {unit.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
