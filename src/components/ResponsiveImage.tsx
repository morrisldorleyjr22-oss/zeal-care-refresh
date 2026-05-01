import { CSSProperties } from "react";

type Picture = {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
};

interface ResponsiveImageProps {
  /**
   * Picture object produced by `vite-imagetools` when an asset is imported
   * with the `?responsive` query string, e.g.
   *   import hero from "@/assets/hero.jpg?responsive";
   */
  picture: Picture;
  alt: string;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
  /**
   * The `sizes` attribute. Defaults to a sensible full-width responsive value.
   * Examples:
   *   - "100vw"
   *   - "(min-width: 1024px) 50vw, 100vw"
   *   - "(min-width: 1280px) 400px, (min-width: 768px) 33vw, 50vw"
   */
  sizes?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  /** Hint browser priority. Use "high" for above-the-fold hero images. */
  fetchPriority?: "high" | "low" | "auto";
  /** Set true for LCP / above-the-fold images. */
  eager?: boolean;
}

/**
 * Renders a <picture> with AVIF / WebP / JPG fallbacks and proper srcset+sizes.
 * Backed by vite-imagetools — generates the variants at build time from a
 * single high-resolution source asset.
 */
export default function ResponsiveImage({
  picture,
  alt,
  className,
  imgClassName,
  style,
  sizes = "100vw",
  loading,
  decoding = "async",
  fetchPriority,
  eager = false,
}: ResponsiveImageProps) {
  const effectiveLoading = loading ?? (eager ? "eager" : "lazy");
  const effectivePriority = fetchPriority ?? (eager ? "high" : undefined);

  return (
    <picture className={className} style={style}>
      {Object.entries(picture.sources).map(([type, srcset]) => (
        <source key={type} type={`image/${type}`} srcSet={srcset} sizes={sizes} />
      ))}
      <img
        src={picture.img.src}
        width={picture.img.w}
        height={picture.img.h}
        alt={alt}
        loading={effectiveLoading}
        decoding={decoding}
        // @ts-expect-error — fetchpriority is valid HTML, not yet in React types
        fetchpriority={effectivePriority}
        className={imgClassName}
      />
    </picture>
  );
}
