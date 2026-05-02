import { LucideIcon } from "lucide-react";
import { ICON_STROKE } from "@/lib/icon-defaults";

type Variant = "dark" | "light";

interface ContactChipProps {
  icon: LucideIcon;
  label: string;
  href?: string;
  variant?: Variant;
  /** Compact rendering for the top utility bar; full chip for footer. */
  size?: "sm" | "md";
  className?: string;
}

/**
 * Single source of truth for the contact-info chip used in the top utility
 * bar AND the footer. Keeps icon container, stroke weight, and spacing
 * consistent across the site.
 */
export default function ContactChip({
  icon: Icon,
  label,
  href,
  variant = "dark",
  size = "md",
  className = "",
}: ContactChipProps) {
  const isLink = !!href;

  const wrapBase =
    "group inline-flex items-start max-w-full transition-colors";
  const wrapBySize = size === "sm" ? "gap-2 text-xs" : "gap-3 text-sm";
  const wrapByVariant =
    variant === "dark"
      ? "text-white/85 hover:text-accent"
      : "text-white/75 hover:text-accent";

  const iconBoxBase =
    "inline-flex items-center justify-center rounded-lg shrink-0 transition-colors border";
  const iconBoxBySize = size === "sm" ? "size-5 rounded-full" : "size-7";
  const iconBoxByVariant =
    variant === "dark"
      ? "bg-white/10 border-white/15 group-hover:bg-accent/20 group-hover:border-accent/40"
      : "bg-white/5 border-white/10 group-hover:bg-accent/15 group-hover:border-accent/30";

  const iconSize = size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5";

  const content = (
    <>
      <span className={`${iconBoxBase} ${iconBoxBySize} ${iconBoxByVariant} mt-0.5`}>
        <Icon className={`${iconSize} text-accent`} strokeWidth={ICON_STROKE} />
      </span>
      <span className={`${size === "sm" ? "font-medium tracking-wide" : "font-medium"} min-w-0 break-words`}>
        {label}
      </span>
    </>
  );

  const cls = `${wrapBase} ${wrapBySize} ${wrapByVariant} ${className}`;

  if (isLink) {
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    );
  }
  return <span className={cls}>{content}</span>;
}
