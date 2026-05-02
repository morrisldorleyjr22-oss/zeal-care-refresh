// Registry of editable per-page content (text + images + repeaters).
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

export type FieldType = "text" | "textarea" | "image" | "video" | "repeater";

export interface RepeaterColumn {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "icon";
  /** Comma-separated list of valid lucide icon names for type === "icon". */
  iconChoices?: string;
}

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  /** For text/textarea/image/video: default string. For repeater: JSON.stringify of an array of row objects. */
  default: string;
  help?: string;
  /** Required when type === "repeater". */
  columns?: RepeaterColumn[];
  /** Friendly singular noun used in repeater UI ("item", "leader", "program"...). */
  itemNoun?: string;
}

export interface PageDef {
  page: string;       // slug used as DB key (page column)
  title: string;      // display title in admin
  route: string;      // public route to "View page"
  fields: FieldDef[];
}

const j = (v: unknown) => JSON.stringify(v);

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
      {
        key: "supports", label: "Supports we provide", type: "repeater", itemNoun: "support",
        columns: [
          { key: "label", label: "Label", type: "text" },
          { key: "icon", label: "Icon", type: "icon", iconChoices: "GraduationCap,BookOpen,Shield,HeartHandshake,Lightbulb,Smartphone,Cpu,Briefcase,Compass,Rocket,FlaskConical" },
        ],
        default: j([
          { label: "School Fees & Tuition", icon: "GraduationCap" },
          { label: "Uniforms & Books", icon: "BookOpen" },
          { label: "Shoes & Supplies", icon: "Shield" },
          { label: "Mentorship & Training", icon: "HeartHandshake" },
          { label: "Inclusive Advocacy", icon: "Lightbulb" },
          { label: "Digital Exposure", icon: "Smartphone" },
        ]),
      },
      {
        key: "locations", label: "Where We Operate", type: "repeater", itemNoun: "location",
        columns: [
          { key: "city", label: "City / Region", type: "text" },
          { key: "area", label: "Area", type: "text" },
          { key: "note", label: "Note", type: "text" },
        ],
        default: j([
          { city: "Monrovia", area: "Chicken Soup Factory", note: "Flagship learning hub & STEM lab" },
          { city: "Monrovia", area: "West Point", note: "Community education center" },
          { city: "Grand Bassa County", area: "Rural Outreach", note: "3 new digital hubs (2026)" },
          { city: "Pan-African", area: "Diaspora Network", note: "Donor & mentor partnerships" },
        ]),
      },
      {
        key: "project_steps", label: "Project in Action steps", type: "repeater", itemNoun: "step",
        columns: [
          { key: "image", label: "Image", type: "image" },
          { key: "label", label: "Label", type: "text" },
          { key: "note", label: "Note", type: "textarea" },
        ],
        default: j([
          { image: projSurvey, label: "Digital Survey", note: "Door-to-door community mapping in Bloc D, Monrovia." },
          { image: projInterviews, label: "Candidate Interviews", note: "Shortlisted children meet our team with parents & bloc leaders." },
          { image: projMaterials, label: "Procuring Materials", note: "Uniforms, shoes, books, pens — sourced and verified." },
          { image: projFee, label: "School Fee Payment", note: "Paid directly to schools in the presence of bloc leadership." },
        ]),
      },
      {
        key: "programs", label: "Strategic programs", type: "repeater", itemNoun: "program",
        columns: [
          { key: "title", label: "Title", type: "text" },
          { key: "desc", label: "Description", type: "textarea" },
          { key: "quote", label: "Quote", type: "textarea" },
          { key: "icon", label: "Icon", type: "icon", iconChoices: "BookOpenCheck,Compass,Rocket,FlaskConical,GraduationCap,Lightbulb,Briefcase,Cpu" },
        ],
        default: j([
          { title: "Education Sponsorship & Advocacy", desc: "Tailored for children aged 4–17 in slums and rural communities. We provide tuition, supplies, and advocate for inclusive education.", quote: '"The best way to fight poverty is to empower people through access to quality education." — John Legend', icon: "BookOpenCheck" },
          { title: "Leadership Development", desc: "Structured initiatives focusing on personal development, mentorship, coaching, and problem-solving through summits and seminars.", quote: '"If your actions inspire others to dream more, learn more, do more, and become more, you are a leader." — John Quincy Adams', icon: "Compass" },
          { title: "Entrepreneurship Programs", desc: "Equipping youth with the knowledge and mindset to identify business opportunities and manage growth.", quote: '"It\'s not about ideas. It\'s about making ideas happen." — Scott Belsky', icon: "Rocket" },
          { title: "Career Paths in STEM", desc: "Hands-on labs in coding, robotics, and applied science that bridge the digital divide for the next generation of African innovators.", quote: '"Science is a way of thinking much more than it is a body of knowledge." — Carl Sagan', icon: "FlaskConical" },
        ]),
      },
      {
        key: "differentiators", label: "What sets us apart", type: "repeater", itemNoun: "card",
        columns: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
        ],
        default: j([
          { title: "Run by Young People", body: "Our team is made of the next generation, not retired observers." },
          { title: "100% Local Roots", body: "Every hub sits inside the community it serves." },
          { title: "STEM-First", body: "We don't just teach — we equip with future-of-work skills." },
          { title: "Total Transparency", body: "Open books, public reports, traceable impact." },
        ]),
      },
      {
        key: "impact_stats", label: "Impact in numbers", type: "repeater", itemNoun: "stat",
        columns: [
          { key: "value", label: "Value", type: "text" },
          { key: "label", label: "Label", type: "text" },
        ],
        default: j([
          { value: "850+", label: "Children Empowered" },
          { value: "12+", label: "Years of Sustained Care" },
          { value: "2+", label: "Communities Impacted" },
          { value: "65%", label: "Female Scholars" },
          { value: "100%", label: "Enrollment Rate" },
          { value: "$45K", label: "Grand Bassa Goal" },
        ]),
      },
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
      {
        key: "leadership", label: "Leadership", type: "repeater", itemNoun: "leader",
        columns: [
          { key: "name", label: "Name", type: "text" },
          { key: "role", label: "Role", type: "text" },
          { key: "bio", label: "Bio", type: "textarea" },
          { key: "photo", label: "Photo", type: "image" },
        ],
        default: j([
          { name: "Titus S. Foko", role: "Founder & Executive Director", bio: "Strategic vision and program architect leading Zeal Care's mission across Liberia.", photo: leaderTitus },
          { name: "Mohammed Soko Kamara", role: "ED, Marketing & Communications", bio: "Champions Zeal Care's voice, partnerships, and storytelling across Africa and beyond.", photo: leaderMohammed },
          { name: "Beverley Chelsea Saungweme", role: "ED, International Affairs", bio: "Former Project Team Lead for phase one. Drives Zeal Care's global partnerships and diaspora engagement.", photo: leaderBeverley },
          { name: "William Mammie", role: "Graphic & Media Officer", bio: "Designs the operational backbone and visual narrative that scales our work across new communities.", photo: "" },
        ]),
      },
      {
        key: "board", label: "Board of Advisors", type: "repeater", itemNoun: "advisor",
        columns: [
          { key: "name", label: "Name", type: "text" },
          { key: "role", label: "Role", type: "text" },
        ],
        default: j([
          { name: "Jluedoe M. Bornor", role: "Acting Board Chairperson" },
          { name: "Yewande Olaiya-Oni", role: "Project Advisor" },
          { name: "Mambiyea W. Kapee", role: "Children Education Impact Advisor" },
          { name: "Sonay Knakay Monger Mason", role: "Strategy Partnership Advisor" },
        ]),
      },
      {
        key: "partners", label: "Partners", type: "repeater", itemNoun: "partner",
        columns: [{ key: "name", label: "Partner name", type: "text" }],
        default: j([
          { name: "Ministry of Education" }, { name: "UNICEF Liberia" }, { name: "MTN Foundation" },
          { name: "Orange Liberia" }, { name: "Local Schools Network" }, { name: "Diaspora Donors" },
          { name: "Tech for Africa" }, { name: "Sendwave" },
        ]),
      },
      {
        key: "history", label: "History timeline", type: "repeater", itemNoun: "milestone",
        columns: [
          { key: "year", label: "Year", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
          { key: "stat", label: "Stat", type: "text" },
          { key: "statLabel", label: "Stat label", type: "text" },
          { key: "icon", label: "Icon", type: "icon", iconChoices: "Sparkles,Building2,Cpu,Users,MapPin,Trophy,Rocket,Compass" },
        ],
        default: j([
          { year: "2013", title: "The Spark", body: "Founded in Monrovia with 15 children and a single after-school program.", stat: "15", statLabel: "First scholars", icon: "Sparkles" },
          { year: "2017", title: "First Hub", body: "Opened our first dedicated learning center in Chicken Soup Factory.", stat: "1", statLabel: "Learning hub", icon: "Building2" },
          { year: "2021", title: "STEM Lab", body: "Launched Liberia's first community robotics lab for under-served youth.", stat: "1st", statLabel: "Robotics lab in country", icon: "Cpu" },
          { year: "2024", title: "850+ Scholars", body: "Crossed the milestone of 850 active beneficiaries across two communities.", stat: "850+", statLabel: "Active scholars", icon: "Users" },
          { year: "2026", title: "Grand Bassa", body: "Expanding into rural Grand Bassa County with three new digital hubs.", stat: "3", statLabel: "New hubs", icon: "MapPin" },
        ]),
      },
      {
        key: "awards", label: "Awards & Prizes", type: "repeater", itemNoun: "award",
        columns: [
          { key: "year", label: "Year", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
        ],
        default: j([
          { year: "2024", title: "Liberia Youth Impact Award", body: "Recognized for innovation in community-led education." },
          { year: "2023", title: "Africa Changemaker Honor", body: "Pan-African recognition for STEM access in low-income communities." },
          { year: "2022", title: "Civic Excellence Citation", body: "Awarded by the Monrovia City Corporation for community service." },
        ]),
      },
      {
        key: "pictorials", label: "Beneficiary pictorials", type: "repeater", itemNoun: "scholar",
        columns: [
          { key: "name", label: "Name", type: "text" },
          { key: "url", label: "Photo", type: "image" },
        ],
        default: j([
          { name: "Varsco Harris", url: "https://hqtyhblmmfhjfyucjttd.supabase.co/storage/v1/object/public/school-logos/Varsco%20Harris.jpeg" },
          { name: "Scholar Highlight", url: "https://hqtyhblmmfhjfyucjttd.supabase.co/storage/v1/object/public/school-logos/WhatsApp%20Image%202026-05-02%20at%202.08.17%20AM%20(5).jpeg" },
          { name: "Scholar Highlight", url: "https://hqtyhblmmfhjfyucjttd.supabase.co/storage/v1/object/public/school-logos/WhatsApp%20Image%202026-05-02%20at%202.08.17%20AM%20(3).jpeg" },
          { name: "Elishaka Fofana Donzo", url: "https://hqtyhblmmfhjfyucjttd.supabase.co/storage/v1/object/public/school-logos/Elishaka%20Fofana%20Donzo.jpeg" },
          { name: "Melvin Jarteh", url: "https://hqtyhblmmfhjfyucjttd.supabase.co/storage/v1/object/public/school-logos/Melvin%20Jarteh.jpeg" },
          { name: "Ruth Flomo", url: "https://hqtyhblmmfhjfyucjttd.supabase.co/storage/v1/object/public/school-logos/Ruth%20Flomo.jpeg" },
        ]),
      },
      {
        key: "beneficiary_stats", label: "Beneficiary stats", type: "repeater", itemNoun: "stat",
        columns: [
          { key: "value", label: "Value", type: "text" },
          { key: "label", label: "Label", type: "text" },
        ],
        default: j([
          { value: "850+", label: "Children Served" },
          { value: "65%", label: "Female Scholars" },
          { value: "100%", label: "Enrollment Rate" },
          { value: "12yr", label: "Commitment" },
        ]),
      },
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
      {
        key: "stats", label: "Headline stats", type: "repeater", itemNoun: "stat",
        columns: [
          { key: "value", label: "Value", type: "text" },
          { key: "label", label: "Label", type: "text" },
        ],
        default: j([
          { value: "73%", label: "Children without digital learning devices" },
          { value: "57%", label: "Drop-out rate due to financial constraints" },
          { value: "4-17", label: "Age range of children we serve" },
        ]),
      },
      {
        key: "econ_stats", label: "Economic Development stats", type: "repeater", itemNoun: "stat",
        columns: [
          { key: "v", label: "Value", type: "text" },
          { key: "l", label: "Label", type: "text" },
        ],
        default: j([
          { v: "10×", l: "Return on every $1 invested in girls' education" },
          { v: "+25%", l: "Lifetime earnings per added year of schooling" },
          { v: "3×", l: "Faster GDP growth in nations prioritizing education" },
          { v: "1 gen", l: "Time needed to break the poverty cycle" },
        ]),
      },
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
      {
        key: "ways", label: "How You Can Help", type: "repeater", itemNoun: "way",
        columns: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
          { key: "icon", label: "Icon", type: "icon", iconChoices: "CalendarClock,Package,Building2,Smartphone,Heart,HeartHandshake,Briefcase" },
          { key: "to", label: "Link target", type: "text" },
        ],
        default: j([
          { title: "Monthly Sustainer", body: "Provide consistent support allowing for long-term STEM curricula planning and student retention.", icon: "CalendarClock", to: "#appeals" },
          { title: "In-Kind Donations", body: "Deploy tangible assets like laptops, STEM kits, and laboratory equipment to our rural hubs.", icon: "Package", to: "/contact" },
          { title: "Corporate Partner", body: "Align your brand with social impact through grants, professional mentorship, or tech sponsorship.", icon: "Building2", to: "#partner" },
        ]),
      },
      {
        key: "allocation", label: "Donation allocation", type: "repeater", itemNoun: "allocation",
        columns: [
          { key: "label", label: "Label", type: "text" },
          { key: "sub", label: "Subtext", type: "text" },
          { key: "value", label: "Percent (number)", type: "text" },
          { key: "color", label: "Bar color (Tailwind class)", type: "text" },
        ],
        default: j([
          { label: "Core Programs", sub: "Education, STEM, Leadership, Entrepreneurship", value: "80", color: "bg-primary" },
          { label: "Outreach & Advocacy", sub: "Community engagement and systemic change", value: "15", color: "bg-navy" },
          { label: "Accountability", sub: "Monitoring, evaluation, and reporting", value: "5", color: "bg-accent" },
        ]),
      },
      {
        key: "mobile_providers", label: "Mobile Money providers", type: "repeater", itemNoun: "provider",
        columns: [
          { key: "name", label: "Provider name", type: "text" },
          { key: "code", label: "USSD / Code", type: "text" },
          { key: "account", label: "Account label", type: "text" },
        ],
        default: j([
          { name: "MTN Mobile Money", code: "*156*3*0887071690#", account: "Account Name: ZEAL CARE" },
          { name: "Orange Money", code: "*144#", account: "Account Name: ZEAL CARE" },
          { name: "Sendwave Transfer", code: "Direct App Access", account: "Account Name: ZEAL CARE" },
        ]),
      },
      {
        key: "faq", label: "Frequently asked questions", type: "repeater", itemNoun: "FAQ",
        columns: [
          { key: "q", label: "Question", type: "text" },
          { key: "a", label: "Answer", type: "textarea" },
        ],
        default: j([
          { q: "Is my donation tax-deductible?", a: "We are a registered nonprofit; eligibility depends on your jurisdiction. Reach out to our team for documentation." },
          { q: "Can I sponsor a specific child?", a: "Yes. Our sponsorship program pairs you with a scholar and shares quarterly progress reports." },
          { q: "How do I know my donation is making a difference?", a: "Every donor receives transparent annual impact reports including financials and outcome metrics." },
          { q: "Do you accept hardware donations?", a: "Absolutely — laptops, tablets, and STEM kits are deployed directly to our digital hubs." },
        ]),
      },
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
      { key: "cinematic_section_title", label: "Cinematics · Section title", type: "text", default: "Cinematics" },
      { key: "cinematic_section_eyebrow", label: "Cinematics · Eyebrow", type: "text", default: "Visual Narratives" },
      { key: "cinematic_empty_message", label: "Cinematics · Empty state message", type: "text", default: "No videos have been uploaded yet. Check back soon for visual stories from the field." },
      { key: "video_cinematic_1", label: "Cinematic · Video 1 (upload or paste URL — MP4 or YouTube/Vimeo link)", type: "video", default: "" },
      { key: "video_cinematic_1_title", label: "Cinematic · Video 1 title", type: "text", default: "" },
      { key: "video_cinematic_1_poster", label: "Cinematic · Video 1 poster image (optional)", type: "image", default: "" },
      { key: "video_cinematic_2", label: "Cinematic · Video 2 (upload or paste URL)", type: "video", default: "" },
      { key: "video_cinematic_2_title", label: "Cinematic · Video 2 title", type: "text", default: "" },
      { key: "video_cinematic_2_poster", label: "Cinematic · Video 2 poster image (optional)", type: "image", default: "" },
      { key: "video_cinematic_3", label: "Cinematic · Video 3 (upload or paste URL)", type: "video", default: "" },
      { key: "video_cinematic_3_title", label: "Cinematic · Video 3 title", type: "text", default: "" },
      { key: "video_cinematic_3_poster", label: "Cinematic · Video 3 poster image (optional)", type: "image", default: "" },
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

/**
 * Helper for pages: parse a repeater value (JSON string) safely back to an array.
 * Falls back to the field's default value if parsing fails.
 */
export function getList<T = Record<string, string>>(page: string, key: string, value: string): T[] {
  const raw = value && value.length > 0 ? value : getDefault(page, key);
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}
