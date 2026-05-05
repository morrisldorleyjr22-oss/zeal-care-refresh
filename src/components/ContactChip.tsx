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
  /** Accessible label override. Falls back to `label` for non-link chips
   *  and to a derived label (e.g. "Email …", "Call …") for links. */
  ariaLabel?: string;
}

/**
 * Single source of truth for the contact-info chip used in the top utility
 * bar AND the footer. Keeps icon container, stroke weight, spacing,
 * typography tokens, and focus rings consistent across the site.
 */
export default function ContactChip({
  icon: Icon,
  label,
  href,
  variant = "dark",
  size = "md",
  className = "",
  ariaLabel,
}: ContactChipProps) {
  const isLink = !!href;

  // Standardised type tokens — locked at 320px so chips never get cramped.
  const wrapBase =
    "group inline-flex items-center max-w-full transition-colors leading-snug rounded-md " +
    "focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy";
  const wrapBySize =
    size === "sm"
      ? "gap-2 text-[12px] sm:text-xs"
      : "gap-2.5 sm:gap-3 text-[13px] sm:text-sm";
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
      <span
        aria-hidden="true"
        className={`${iconBoxBase} ${iconBoxBySize} ${iconBoxByVariant} self-start mt-[2px]`}
      >
        <Icon className={`${iconSize} text-accent`} strokeWidth={ICON_STROKE} />
      </span>
      <span
        className={`${
          size === "sm" ? "font-medium tracking-wide" : "font-medium"
        } min-w-0 break-words [overflow-wrap:anywhere] leading-snug`}
      >
        {label}
      </span>
    </>
  );

  const cls = `${wrapBase} ${wrapBySize} ${wrapByVariant} ${className}`;

  // Derive a sensible aria-label for link chips so screen-readers announce
  // the action, not just the raw value.
  const derivedAria =
    ariaLabel ??
    (href?.startsWith("mailto:")
      ? `Email ${label}`
      : href?.startsWith("tel:")
      ? `Call ${label}`
      : label);

  if (isLink) {
    return (
      <a href={href} className={cls} aria-label={derivedAria}>
        {content}
      </a>
    );
  }
  return (
    <span className={cls} aria-label={ariaLabel ?? label}>
      {content}
    </span>
  );
}
