import type { RIASEC } from "../assessments/questions";

// Original curated career list tagged with Holland-code affinities.
// Each career lists its primary RIASEC letters; the matcher scores overlap.

export type Career = {
  title: string;
  codes: RIASEC[]; // primary to tertiary
  blurb: string;
};

export const CAREERS: Career[] = [
  // Investigative-heavy
  { title: "Software Engineer", codes: ["I", "R", "C"], blurb: "Designs and builds software systems; thrives on problem-solving and continuous learning." },
  { title: "Data Scientist", codes: ["I", "C", "A"], blurb: "Extracts insight from data using statistics, code, and creative framing of problems." },
  { title: "Research Scientist", codes: ["I", "A", "R"], blurb: "Runs experiments and generates new knowledge in a chosen field." },
  { title: "Biomedical Researcher", codes: ["I", "R", "S"], blurb: "Investigates biological systems to improve human health outcomes." },
  { title: "Forensic Analyst", codes: ["I", "C", "R"], blurb: "Applies scientific methods to evidence and investigations." },

  // Realistic-heavy
  { title: "Mechanical Engineer", codes: ["R", "I", "C"], blurb: "Designs physical systems, machines, and mechanical products." },
  { title: "Civil Engineer", codes: ["R", "I", "E"], blurb: "Plans and oversees infrastructure projects like bridges, roads, and buildings." },
  { title: "Electrician", codes: ["R", "C", "I"], blurb: "Installs and maintains electrical systems in homes, businesses, and industry." },
  { title: "Landscape Architect", codes: ["R", "A", "I"], blurb: "Designs outdoor environments combining ecology, aesthetics, and function." },
  { title: "Wildlife Biologist", codes: ["R", "I", "S"], blurb: "Studies animals and ecosystems, often with substantial fieldwork." },

  // Artistic-heavy
  { title: "UX/Product Designer", codes: ["A", "I", "E"], blurb: "Shapes how people experience digital products, balancing research and craft." },
  { title: "Graphic Designer", codes: ["A", "E", "C"], blurb: "Creates visual identity, layouts, and branded assets across media." },
  { title: "Writer / Content Strategist", codes: ["A", "I", "S"], blurb: "Uses language to inform, persuade, or entertain across many formats." },
  { title: "Architect", codes: ["A", "I", "R"], blurb: "Designs buildings and spaces, merging art, engineering, and human needs." },
  { title: "Filmmaker / Video Producer", codes: ["A", "E", "R"], blurb: "Directs visual storytelling from concept through final cut." },
  { title: "Creative Director", codes: ["A", "E", "S"], blurb: "Leads creative teams and sets visual or narrative direction for brands." },

  // Social-heavy
  { title: "Therapist / Counselor", codes: ["S", "I", "A"], blurb: "Helps people work through emotional and behavioral challenges." },
  { title: "Teacher (K-12)", codes: ["S", "A", "C"], blurb: "Educates students and helps them grow academically and personally." },
  { title: "Registered Nurse", codes: ["S", "I", "R"], blurb: "Provides direct patient care in clinical settings." },
  { title: "Physical Therapist", codes: ["S", "R", "I"], blurb: "Helps patients recover movement and function after injury or illness." },
  { title: "Social Worker", codes: ["S", "A", "E"], blurb: "Connects people to resources and advocates for vulnerable populations." },
  { title: "Human Resources Manager", codes: ["S", "E", "C"], blurb: "Supports employees, manages hiring, and shapes workplace culture." },
  { title: "Coach / Training Specialist", codes: ["S", "E", "A"], blurb: "Develops skills in individuals or teams through structured programs." },

  // Enterprising-heavy
  { title: "Product Manager", codes: ["E", "I", "A"], blurb: "Leads product direction by connecting users, business, and engineering." },
  { title: "Entrepreneur / Founder", codes: ["E", "A", "I"], blurb: "Starts and grows new ventures, navigating ambiguity and risk." },
  { title: "Sales Executive", codes: ["E", "S", "C"], blurb: "Builds relationships with clients and closes revenue-generating deals." },
  { title: "Marketing Manager", codes: ["E", "A", "C"], blurb: "Plans and executes campaigns that grow awareness and demand." },
  { title: "Attorney", codes: ["E", "I", "A"], blurb: "Advises clients and argues cases within legal and regulatory frameworks." },
  { title: "Management Consultant", codes: ["E", "I", "C"], blurb: "Advises organizations on strategy, operations, and change." },
  { title: "Real Estate Agent", codes: ["E", "S", "C"], blurb: "Helps clients buy and sell property; thrives on negotiation and networking." },

  // Conventional-heavy
  { title: "Accountant", codes: ["C", "I", "E"], blurb: "Maintains financial records, reports, and tax compliance for organizations." },
  { title: "Financial Analyst", codes: ["C", "I", "E"], blurb: "Evaluates investments, budgets, and financial performance." },
  { title: "Operations Manager", codes: ["C", "E", "S"], blurb: "Keeps the machinery of a business running smoothly day to day." },
  { title: "Paralegal", codes: ["C", "I", "S"], blurb: "Supports attorneys with research, drafting, and case management." },
  { title: "Logistics Coordinator", codes: ["C", "R", "E"], blurb: "Orchestrates the movement of goods, schedules, and suppliers." },
  { title: "Actuary", codes: ["C", "I", "E"], blurb: "Models risk and uncertainty for insurance and finance." },
];
