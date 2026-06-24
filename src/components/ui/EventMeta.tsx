interface EventMetaProps {
  date: string;
  location: string;
  time?: string;
  size?: "sm" | "md";
  className?: string;
}

const sizeClasses = {
  sm: "text-[14px] sm:text-[16px]",
  md: "text-[14px] sm:text-[16px] md:text-[20px]",
};

export default function EventMeta({
  date,
  location,
  time,
  size = "md",
  className = "",
}: EventMetaProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${sizeClasses[size]} ${className}`}
    >
      <span className="text-[#e6c571]" style={{ fontFamily: "var(--font-body)" }}>
        {date}
      </span>
      {time && (
        <>
          <span className="text-white" aria-hidden>
            •
          </span>
          <span className="text-white" style={{ fontFamily: "var(--font-body)" }}>
            {time}
          </span>
        </>
      )}
      <span className="text-white" aria-hidden>
        •
      </span>
      <span className="text-white" style={{ fontFamily: "var(--font-body)" }}>
        {location}
      </span>
    </div>
  );
}
