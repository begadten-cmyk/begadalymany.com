export type Company = {
  id: string;
  name: string;
  tagline: string;
  /** Live product site. The domain shown on the card is derived from this. */
  url: string;
  role: string;
  status: string;
  body: string[];
  metrics: { value: string; label: string }[];
  stack: string[];
  /** Square logo / mark. Falls back to a designed placeholder until supplied. */
  mark: string;
  markAlt: string;
  diagramCaption: string;
  accent: string;
};

export const companies: Company[] = [
  {
    id: "acronix",
    name: "Acronix",
    url: "https://acronixai.com",
    tagline: "AI ops software for mid-market service businesses",
    role: "Founder",
    status: "Operating",
    body: [
      "A per-client AI automation platform for verticals like freight brokerage, insurance, and property management, built on a shared component library plus per-client customization so each deployment is bespoke without the codebase forking.",
      "Runtime cost was the constraint that decided whether the unit economics worked, so I cut it 60–90% with tiered model routing, prompt caching, and batch inference.",
    ],
    metrics: [
      { value: "5-figure", label: "MRR" },
      { value: "60–90%", label: "AI runtime cost cut" },
      { value: "3", label: "verticals served" },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Model routing", "Batch inference"],
    mark: "/images/companies/acronix.png",
    markAlt: "Acronix logo",
    diagramCaption:
      "One shared core, many client surfaces — customization lives at the edges, never in the platform.",
    accent: "#8b7cff",
  },
  {
    id: "medarix",
    name: "Medarix",
    url: "https://medarix.ai",
    tagline: "HIPAA-compliant AI for medical claim appeals",
    role: "Founder",
    status: "Operating",
    body: [
      "A constrained state-machine pipeline that autonomously drafts payer denial appeals: deterministic parsing on the way in, an LLM only where language is actually the work, and a mandatory physician sign-off before anything leaves the system.",
      "The whole pipeline runs inside an Azure AI Foundry compliance boundary, so the model never becomes the thing standing between a patient and a decision.",
    ],
    metrics: [
      { value: "0", label: "unreviewed submissions" },
      { value: "HIPAA", label: "compliance boundary" },
      { value: "1", label: "human gate, always" },
    ],
    stack: ["Azure AI Foundry", "State machine", "Deterministic parsing", "Human-in-the-loop"],
    mark: "/images/companies/medarix.png",
    markAlt: "Medarix logo",
    diagramCaption:
      "A linear pipeline with a hard human gate — the model drafts, a physician decides.",
    accent: "#4fa8ff",
  },
];
