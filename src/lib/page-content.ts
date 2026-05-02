// Registry of editable per-page content (text + images).
// Defaults below are used when nothing is overridden in the database.
// Keys should be stable — they are how the admin UI maps DB rows to fields.

import comm from "@/assets/community-wide.jpg";
import hero1 from "@/assets/hero-children-1.jpg";
import hero2 from "@/assets/hero-children-2.jpg";
import leaderTeam from "@/assets/leader-team-classroom.jpg";
import leaderTitus from "@/assets/leader-titus.jpg";
import leaderMohammed from "@/assets/leader-mohammed.jpg";
import leaderBeverley from "@/assets/leader-beverley.jpg";
import progEdu from "@/assets/program-education.jpg";
import progEnt from "@/assets/program-entrepreneurship.jpg";
import progLead from "@/assets/program-leadership.jpg";
import progStem from "@/assets/program-stem.jpg";
import projAnalysis from "@/assets/project-analysis.jpg";
import projFee from "@/assets/project-feepayment.jpg";
import projInterviews from "@/assets/project-interviews.jpg";
import projMaterials from "@/assets/project-materials-row.jpg";
import projSurvey from "@/assets/project-survey.jpg";
import teamMeeting from "@/assets/team-meeting.jpg";
import heroBg from "@/assets/hero-students-group.jpg";

export type FieldType = "text" | "textarea" | "image";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  default: string;
  help?: string;
}

export interface PageDef {
  page: string;       // slug used as DB key (page column)
  title: string;      // display title in admin
  route: string;      // public route to "View page"
  fields: FieldDef[];
}

export const PAGE_REGISTRY: PageDef[] = [
  {
    page: "home",
    title: "Home",
    route: "/",
    fields: [
      { key: "mission_eyebrow", label: "Mission · Eyebrow", type: "text", default: "Our Institutional Purpose" },
      { key: "mission_title", label: "Mission · Title", type: "text", default: "Our Mission" },
      { key: "mission_body", label: "Mission · Body", type: "textarea", default: "At ZEAL CARE, we believe every child deserves a chance to thrive, regardless of their background. Our mission is to break the cycle of poverty by providing quality education and mentorship to underserved communities." },
      { key: "mission_quote", label: "Mission · Quote", type: "textarea", default: '"Education is the most powerful weapon which you can use to change the world."' },
      { key: "img_hero_main", label: "Hero · Main image", type: "image", default: hero1 },
      { key: "img_hero_background", label: "Hero · Background photo", type: "image", default: heroBg, help: "Full-bleed photograph behind the hero. A dark blue overlay is applied automatically." },
      { key: "img_hero_portrait", label: "Hero · Portrait image", type: "image", default: hero2 },
      { key: "img_mission", label: "Mission · Image", type: "image", default: "https://hqtyhblmmfhjfyucjttd.supabase.co/storage/v1/object/public/school-logos/Our%20Mission.jpeg" },
      { key: "img_program_education", label: "Program · Education image", type: "image", default: progEdu },
      { key: "img_program_leadership", label: "Program · Leadership image", type: "image", default: progLead },
      { key: "img_program_stem", label: "Program · STEM image", type: "image", default: progStem },
      { key: "testimonial_quote", label: "Testimonial · Quote", type: "textarea", default: '"The digital skills I learned here got me my first job at a local tech firm. I am now the breadwinner for my family."' },
      { key: "testimonial_name", label: "Testimonial · Name", type: "text", default: "Kelvin M." },
      { key: "testimonial_role", label: "Testimonial · Role", type: "text", default: "STEM Scholar" },
    ],
  },
  {
    page: "about",
    title: "About",
    route: "/about",
    fields: [
      { key: "hero_eyebrow", label: "Hero · Eyebrow", type: "text", default: "Our Heritage" },
      { key: "hero_title", label: "Hero · Title", type: "text", default: "About" },
      { key: "hero_highlight", label: "Hero · Highlight", type: "text", default: "Zeal Care" },
      { key: "hero_description", label: "Hero · Description", type: "textarea", default: "Our journey of empowerment and the values that drive every decision we make to transform lives in Liberia." },
      { key: "belief_title", label: "Belief · Title", type: "text", default: "Our Belief" },
      { key: "belief_body_1", label: "Belief · Paragraph 1", type: "textarea", default: "We believe every child — regardless of where they were born or what their family earns — carries a unique spark of genius. With the right support at the right time, that spark becomes a force capable of transforming families, communities, and nations." },
      { key: "belief_body_2", label: "Belief · Paragraph 2", type: "textarea", default: "Education is not a privilege; it is a human right. Empowerment is not charity; it is justice. And dignity, opportunity, and hope are not luxuries — they are the foundation of a fair future." },
      { key: "belief_quote", label: "Belief · Quote", type: "textarea", default: '"Talent is everywhere. Opportunity is not. We exist to close that gap."' },
      { key: "img_quote_band", label: "Quote band background image", type: "image", default: comm },
      { key: "quote_band_text", label: "Quote band · Text", type: "textarea", default: '"Every child is a spark of genius waiting to be ignited."' },
    ],
  },
  {
    page: "what_we_do",
    title: "What We Do",
    route: "/what-we-do",
    fields: [
      { key: "hero_eyebrow", label: "Hero · Eyebrow", type: "text", default: "Our Methodology" },
      { key: "hero_title", label: "Hero · Title", type: "text", default: "What" },
      { key: "hero_highlight", label: "Hero · Highlight", type: "text", default: "We Do" },
      { key: "hero_description", label: "Hero · Description", type: "textarea", default: "Architecting holistic intervention systems that multiply opportunity for the next generation of leaders." },
      { key: "approach_title", label: "Approach · Title", type: "text", default: "How We Operate" },
      { key: "approach_body_1", label: "Approach · Paragraph 1", type: "textarea", default: "Zeal Care creates a model that radically improves the lives of underprivileged children. We believe that effectively supporting an individual means investing in the structures that surround them." },
      { key: "approach_body_2", label: "Approach · Paragraph 2", type: "textarea", default: "We work in partnership with slums and rural communities — partnerships founded on trust and deep respect for local expertise. Successfully supporting a child means providing both financial and social support." },
      { key: "img_proj_survey", label: "Project · Survey image", type: "image", default: projSurvey },
      { key: "img_proj_interviews", label: "Project · Interviews image", type: "image", default: projInterviews },
      { key: "img_proj_materials", label: "Project · Materials image", type: "image", default: projMaterials },
      { key: "img_proj_fee", label: "Project · Fee Payment image", type: "image", default: projFee },
      { key: "img_program_education", label: "Program · Education image", type: "image", default: progEdu },
      { key: "img_program_leadership", label: "Program · Leadership image", type: "image", default: progLead },
      { key: "img_program_entrepreneurship", label: "Program · Entrepreneurship image", type: "image", default: progEnt },
      { key: "img_program_stem", label: "Program · STEM image", type: "image", default: progStem },
      { key: "img_impact_band", label: "Impact band background image", type: "image", default: comm },
    ],
  },
  {
    page: "who_we_are",
    title: "Who We Are",
    route: "/who-we-are",
    fields: [
      { key: "hero_eyebrow", label: "Hero · Eyebrow", type: "text", default: "Our Identity" },
      { key: "hero_title", label: "Hero · Title", type: "text", default: "Who" },
      { key: "hero_highlight", label: "Hero · Highlight", type: "text", default: "We Are" },
      { key: "hero_description", label: "Hero · Description", type: "textarea", default: "The people, partners, and systems behind Zeal Care's mission to transform education in Liberia." },
      { key: "img_team_meeting", label: "Team meeting image", type: "image", default: teamMeeting },
      { key: "team_meeting_caption", label: "Team meeting caption", type: "text", default: "Zeal Care Team in person meeting while others far away joined online to participate" },
      { key: "img_leader_titus", label: "Leader · Titus photo", type: "image", default: leaderTitus },
      { key: "img_leader_mohammed", label: "Leader · Mohammed photo", type: "image", default: leaderMohammed },
      { key: "img_leader_beverley", label: "Leader · Beverley photo", type: "image", default: leaderBeverley },
      { key: "img_partnership", label: "Partnership in motion image", type: "image", default: leaderTeam },
      { key: "img_beneficiaries_band", label: "Beneficiaries band background", type: "image", default: comm },
      { key: "beneficiaries_body", label: "Beneficiaries body", type: "textarea", default: "We serve over 850 children across Liberia who demonstrate exceptional grit but lack financial access to modern education. Our beneficiaries are chosen not just based on need, but on their desire to lead and transform their communities." },
    ],
  },
  {
    page: "why",
    title: "Why Empowerment",
    route: "/why-empowerment",
    fields: [
      { key: "hero_eyebrow", label: "Hero · Eyebrow", type: "text", default: "The Case for Change" },
      { key: "hero_title", label: "Hero · Title", type: "text", default: "Why" },
      { key: "hero_highlight", label: "Hero · Highlight", type: "text", default: "Empowerment?" },
      { key: "hero_description", label: "Hero · Description", type: "textarea", default: "At Zeal Care, we believe every child carries untapped greatness. Empowerment is the key to unlocking a brighter, more equitable future for Liberia." },
      { key: "philosophy_title", label: "Philosophy · Title", type: "text", default: "Closing the Gaps Early" },
      { key: "philosophy_body_1", label: "Philosophy · Paragraph 1", type: "textarea", default: "For children ages 4 to 17 from low or no-income families, opportunity is often limited not by ability, but by circumstance. In many underserved communities in Liberia, children lack access to quality learning support, digital tools, mentorship, and safe spaces to grow." },
      { key: "philosophy_body_2", label: "Philosophy · Paragraph 2", type: "textarea", default: "To Zeal Care, empowerment means closing those gaps early — strengthening foundational literacy, introducing digital awareness, providing mentorship and life skills, and creating safe, inclusive environments where confidence can grow." },
      { key: "img_philosophy", label: "Philosophy · Image", type: "image", default: "https://hqtyhblmmfhjfyucjttd.supabase.co/storage/v1/object/public/school-logos/Our%20Philosophy.jpeg" },
      { key: "img_social_justice", label: "Social Justice · Image", type: "image", default: "https://hqtyhblmmfhjfyucjttd.supabase.co/storage/v1/object/public/school-logos/Social%20Justice.jpeg" },
      { key: "promise_text", label: "Promise · Text", type: "textarea", default: "When the right support reaches the right child at the right time, transformation becomes possible — not just for that child, but for entire communities." },
    ],
  },
  {
    page: "ways_to_give",
    title: "Ways to Give",
    route: "/ways-to-give",
    fields: [
      { key: "hero_eyebrow", label: "Hero · Eyebrow", type: "text", default: "Resource Mobilization" },
      { key: "hero_title", label: "Hero · Title", type: "text", default: "Ways to" },
      { key: "hero_highlight", label: "Hero · Highlight", type: "text", default: "Give" },
      { key: "hero_description", label: "Hero · Description", type: "textarea", default: "Investing in human dignity beyond the donation. Every contribution fuels the future of a child in Liberia." },
      { key: "appeal_title", label: "Final appeal · Title", type: "text", default: "The Grand Bassa Expansion" },
      { key: "appeal_body", label: "Final appeal · Body", type: "textarea", default: "We are currently raising $45,000 to establish three new Digital Hubs in Grand Bassa County by late 2026. This will provide 450 children with their first-ever access to digital learning tools." },
    ],
  },
  {
    page: "media",
    title: "Media (Impact Hub)",
    route: "/media",
    fields: [
      { key: "hero_eyebrow", label: "Hero · Eyebrow", type: "text", default: "News & stories" },
      { key: "hero_title", label: "Hero · Title", type: "text", default: "The" },
      { key: "hero_highlight", label: "Hero · Highlight", type: "text", default: "Impact Hub" },
      { key: "hero_description", label: "Hero · Description", type: "textarea", default: "Direct narratives from the frontlines of African potential. Stay updated with our latest stories, films, and events." },
      { key: "img_cinematic_1", label: "Cinematic · Image 1", type: "image", default: comm },
      { key: "img_cinematic_2", label: "Cinematic · Image 2", type: "image", default: progStem },
      { key: "img_cinematic_3", label: "Cinematic · Image 3", type: "image", default: progLead },
    ],
  },
  {
    page: "contact",
    title: "Contact",
    route: "/contact",
    fields: [
      { key: "hero_eyebrow", label: "Hero · Eyebrow", type: "text", default: "Get in touch" },
      { key: "hero_title", label: "Hero · Title", type: "text", default: "Let's" },
      { key: "hero_highlight", label: "Hero · Highlight", type: "text", default: "Connect" },
      { key: "hero_description", label: "Hero · Description", type: "textarea", default: "Open channels for collaboration, support, and institutional inquiries. We're here to answer your questions." },
    ],
  },
];

export function getPageDef(page: string): PageDef | undefined {
  return PAGE_REGISTRY.find((p) => p.page === page);
}

export function getDefault(page: string, key: string): string {
  const def = getPageDef(page)?.fields.find((f) => f.key === key);
  return def?.default ?? "";
}
