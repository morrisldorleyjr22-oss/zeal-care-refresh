import edu from "@/assets/program-education.jpg?responsive";
import stem from "@/assets/program-stem.jpg?responsive";
import lead from "@/assets/program-leadership.jpg?responsive";
import ent from "@/assets/program-entrepreneurship.jpg?responsive";
import comm from "@/assets/community-wide.jpg?responsive";

export type Picture = {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
};

export type Article = {
  slug: string;
  img: Picture;
  tag: "Field Story" | "STEM Lab" | "Leadership" | "Workshop" | "Christmas" | "Advocacy";
  date: string;
  iso: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: string;
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "school-supplies-west-point",
    img: edu,
    tag: "Field Story",
    date: "Mar 2026",
    iso: "2026-03-12",
    readTime: "4 min read",
    title: "Zeal Care delivers school supplies to 200 children in West Point",
    excerpt:
      "A coordinated distribution effort brought backpacks, notebooks, and uniforms to one of Monrovia's most under-resourced communities.",
    author: "Zeal Care Field Team",
    body: [
      "Early on Saturday morning, our field team converged on the West Point community with three vans of school supplies — backpacks, notebooks, pens, geometry sets, and a full set of uniforms for every enrolled scholar.",
      "For many of the families we work with, the start of a new school term is one of the most financially stressful moments of the year. By absorbing this cost directly, we remove one of the largest barriers that keeps children from returning to the classroom.",
      "We are deeply grateful to our volunteer corps and to the local school administrators who helped us coordinate the distribution. Two hundred children are now equipped to start the term ready to learn — and that, for us, is what radical integrity looks like in practice.",
    ],
  },
  {
    slug: "first-robotics-cohort",
    img: stem,
    tag: "STEM Lab",
    date: "Feb 2026",
    iso: "2026-02-22",
    readTime: "5 min read",
    title: "First robotics cohort completes inaugural curriculum in Monrovia",
    excerpt:
      "Twenty-four scholars graduated from our pilot robotics program, presenting working prototypes to families and partners.",
    author: "Director of STEM Programs",
    body: [
      "Our inaugural robotics cohort wrapped up a 12-week intensive that combined micro-controller fundamentals, basic mechanical design, and team-based problem solving.",
      "On graduation day, students presented six working prototypes — including a low-cost line-following robot designed to deliver medication between rural clinics. Each team defended their design choices to a panel of educators and industry mentors.",
      "We're now scaling the curriculum to two additional sites and onboarding a second cohort of forty scholars in April.",
    ],
  },
  {
    slug: "youth-leadership-summit",
    img: lead,
    tag: "Leadership",
    date: "Jan 2026",
    iso: "2026-01-18",
    readTime: "3 min read",
    title: "Annual Youth Leadership Summit gathers scholars across Liberia",
    excerpt:
      "More than 180 scholars from six counties met for three days of workshops on civic engagement, public speaking, and ethics.",
    author: "Leadership Programs Team",
    body: [
      "The 2026 Youth Leadership Summit brought together 180 scholars from across Liberia for three intensive days of workshops, mentorship sessions, and peer-led debates.",
      "Highlights included a keynote from a former parliamentarian on ethical public service, breakout sessions on community-based problem solving, and a closing ceremony where each scholar committed to a 90-day community project.",
    ],
  },
  {
    slug: "entrepreneurship-bootcamp-2025",
    img: ent,
    tag: "Workshop",
    date: "Dec 2025",
    iso: "2025-12-04",
    readTime: "4 min read",
    title: "Entrepreneurship bootcamp launches 12 new student-led ventures",
    excerpt:
      "Our year-end bootcamp culminated in a pitch night where students secured seed grants for twelve community-focused businesses.",
    author: "Entrepreneurship Faculty",
    body: [
      "Forty scholars spent six weekends learning the fundamentals of business modelling, customer interviews, and small-business finance.",
      "On pitch night, twelve teams secured micro-grants ranging from $150 to $500 to launch ventures spanning agriculture, repair services, and digital content creation.",
    ],
  },
  {
    slug: "christmas-2025-chicken-soup-factory",
    img: comm,
    tag: "Christmas",
    date: "Dec 2025",
    iso: "2025-12-25",
    readTime: "3 min read",
    title: "Zeal Care celebrates 2025 Christmas with kids in Chicken Soup Factory",
    excerpt:
      "An afternoon of music, meals, and gifts brought joy to over 300 children in the Chicken Soup Factory community.",
    author: "Community Engagement Team",
    body: [
      "Our annual Christmas celebration returned to the Chicken Soup Factory community for the third year running. Volunteers cooked and served meals for over 300 children and their guardians.",
      "Each child received a gift bag with school supplies and a storybook — a small but meaningful gesture as families head into the new year.",
    ],
  },
  {
    slug: "inclusive-education-roundtable",
    img: edu,
    tag: "Advocacy",
    date: "Nov 2025",
    iso: "2025-11-09",
    readTime: "4 min read",
    title: "Inclusive education roundtable convenes community leaders",
    excerpt:
      "We hosted a half-day convening on access to quality education for children with disabilities and out-of-school youth.",
    author: "Policy & Advocacy",
    body: [
      "Twenty-five community leaders, educators, and parents joined us for a half-day roundtable focused on practical pathways to inclusive education.",
      "The session produced a working agenda of three short-term commitments that we will report on each quarter.",
    ],
  },
];

export const categories = [
  "All",
  "Field Story",
  "STEM Lab",
  "Leadership",
  "Workshop",
  "Christmas",
  "Advocacy",
] as const;

export function getArticleBySlug(slug?: string) {
  return articles.find((a) => a.slug === slug);
}
