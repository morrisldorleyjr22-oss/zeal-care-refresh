/**
 * Site-wide lucide icon defaults.
 *
 * Use these constants whenever you render a lucide icon so the visual style
 * stays authentic and consistent across the entire app.
 *
 * Sizing convention (Tailwind classes):
 *   - xs:  h-3   w-3    (12px) — inline chips, dense UI
 *   - sm:  h-3.5 w-3.5  (14px) — utility bar, footer chips
 *   - md:  h-4   w-4    (16px) — buttons, list items
 *   - lg:  h-5   w-5    (20px) — section icons
 *   - xl:  h-6   w-6    (24px) — feature tiles
 *
 * Stroke convention:
 *   - 2.25 for icons inside small chips / buttons (denser look at small sizes)
 *   - 2    for icons rendered larger than 20px
 */
export const ICON_STROKE = 2.25;
export const ICON_STROKE_LG = 2;

export const ICON_SIZE = {
  xs: "h-3 w-3",
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
} as const;
