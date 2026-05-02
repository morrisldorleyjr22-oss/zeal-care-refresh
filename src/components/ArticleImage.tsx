import ResponsiveImage from "@/components/ResponsiveImage";
import type { ArticleImage as ArticleImageType } from "@/data/articles";

interface Props {
  picture: ArticleImageType;
  alt: string;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}

/**
 * Renders an article image. Supports both `vite-imagetools` Picture objects
 * (legacy local assets) and remote URL strings (CMS / Supabase storage).
 */
export default function ArticleImage({
  picture,
  alt,
  sizes,
  className,
  imgClassName,
  eager,
}: Props) {
  if (typeof picture === "string") {
    return (
      <img
        src={picture}
        alt={alt}
        className={imgClassName ?? className}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        // @ts-expect-error fetchpriority is valid HTML
        fetchpriority={eager ? "high" : undefined}
      />
    );
  }
  return (
    <ResponsiveImage
      picture={picture}
      alt={alt}
      sizes={sizes}
      className={className}
      imgClassName={imgClassName}
      eager={eager}
    />
  );
}
