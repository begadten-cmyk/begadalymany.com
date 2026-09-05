export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "TypeScript/JavaScript", "C#", "C++", "SQL", "MQL5"],
  },
  {
    label: "Web / Infra",
    items: [
      "Next.js",
      "React",
      "Blazor",
      ".NET",
      "Flask",
      "FastAPI",
      "Tailwind",
      "Postgres (Supabase)",
      "SQL Server",
      "Vercel",
    ],
  },
  {
    label: "AI / ML / Cloud",
    items: [
      "PyTorch",
      "Azure OpenAI",
      "Semantic Kernel",
      "Azure AI Search",
      "scikit-learn",
      "XGBoost",
      "NVIDIA Isaac Sim",
      "NVIDIA Warp",
      "Azure DevOps",
      "Azure Key Vault",
      "xUnit",
      "Git",
    ],
  },
];
