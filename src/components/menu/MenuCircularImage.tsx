import Image from "next/image";

type MenuCircularImageProps = Readonly<{
  src: string;
  alt: string;
  sizeClass?: string;
  ringClass?: string;
  sizes?: string;
  priority?: boolean;
}>;

export function MenuCircularImage({
  src,
  alt,
  sizeClass = "size-[180px] sm:size-[200px] lg:size-[243px]",
  ringClass = "ring-4 ring-white/30",
  sizes = "(max-width: 768px) 180px, 243px",
  priority = false,
}: MenuCircularImageProps) {
  return (
    <div className={`relative shrink-0 ${sizeClass}`}>
      <div
        className={`relative size-full overflow-hidden rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.12)] ${ringClass}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? undefined : "eager"}
          className="object-cover"
          sizes={sizes}
        />
      </div>
    </div>
  );
}
