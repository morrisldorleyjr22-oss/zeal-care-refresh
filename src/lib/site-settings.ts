// Default values used as a fallback while settings load (or before a row is created)
export const DEFAULT_SETTINGS = {
  contact_info: {
    phone: "+231 000 000 000",
    email: "info@example.org",
    address_line: "Monrovia · Liberia",
    whatsapp: "",
  },
  donate: {
    url: "/ways-to-give",
    label: "Donate",
  },
  hero_home: {
    eyebrow: "Empowering the next generation",
    title: "Education. Opportunity. Impact.",
    subtitle: "Building a future where every Liberian child can thrive.",
    cta_primary_label: "Donate Now",
    cta_primary_url: "/ways-to-give",
    cta_secondary_label: "Learn More",
    cta_secondary_url: "/who-we-are",
  },
  footer: {
    tagline: "Empowering communities through education.",
    copyright: "© 2026 All rights reserved.",
    office_hours: "Mon–Fri · 9:00 AM – 5:00 PM GMT",
  },
  social_links: {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
  },
} as const;

export type SettingsKey = keyof typeof DEFAULT_SETTINGS;
export type SettingsShape = {
  [K in SettingsKey]: typeof DEFAULT_SETTINGS[K];
};
