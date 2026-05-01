import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { ICON_STROKE } from "@/lib/icon-defaults";

type Variant =
  | "solid"   // yellow accent on light surfaces (navbar, page CTAs)
  | "inverse" // navy pill with yellow heart, for use on yellow surfaces
  | "block";  // full-width pill for sidebars / mobile drawer

interface DonateButtonProps {
  to?: string;
  label?: string;
  variant?: Variant;
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const sizeMap = {
  sm: "px-5 py-3 text-sm",
  md: "px-6 py-3.5 text-sm",
  lg: "px-7 py-4 text-base",
};

/**
 * Single source of truth for the Donate CTA. Use this everywhere — navbar,
 * mobile drawer, hero, sidebars, footer — so casing, color, and icon
 * treatment never drift.
 */
export default function DonateButton({
  to = "/ways-to-give",
  label = "Donate Now",
  variant = "solid",
  className = "",
  size = "sm",
  onClick,
}: DonateButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase tracking-wide shadow-yellow-glow transition-transform duration-300 hover:scale-[1.04] active:scale-100";

  const variantCls = {
    solid: "bg-accent text-navy",
    inverse: "bg-navy text-accent",
    block: "bg-accent text-navy w-full",
  }[variant];

  const heartCls = variant === "inverse" ? "fill-accent" : "fill-navy";

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${base} ${variantCls} ${sizeMap[size]} ${className}`}
    >
      <Heart className="h-4 w-4" strokeWidth={ICON_STROKE} fill="currentColor" />
      {label}
    </Link>
  );
}
