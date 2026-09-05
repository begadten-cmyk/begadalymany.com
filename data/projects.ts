export type Project = {
  id: string;
  title: string;
  years: string;
  blurb: string;
  tags: string[];
  image: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    id: "trading-systems",
    title: "Quant/ML Trading Systems",
    years: "2024 — Present",
    blurb:
      "Automated Forex trading systems in MQL5 and Python generating $10K+ in monthly P&L, deploying strategies across $100K–$1M+ in live trading capital with live API integrations, risk controls, and walk-forward backtesting.",
    tags: ["MQL5", "Python", "Trading Automation"],
    image: "/images/projects/trading-systems.png",
    imageAlt: "Quant and ML trading systems dashboard",
  },
  {
    id: "tissue-sim",
    title: "Soft-Tissue Surgical Simulation",
    years: "2025 — 2026",
    blurb:
      "Research in Dr. Liu's surgical robotics lab: physics-based soft-tissue simulation in NVIDIA Isaac Sim, using Neo-Hookean hyperelastic models and 3D heightfield visualization so a robotic surgical arm could be tested against tissue that deforms and recoils the way real tissue does — in simulation, before anything touched hardware.",
    tags: ["NVIDIA Isaac Sim", "Neo-Hookean FEM", "Python"],
    image: "/images/projects/tissue-sim.png",
    imageAlt: "Soft-tissue simulation for a robotic surgical arm",
  },
  {
    id: "ml-fx-signal",
    title: "ML FX Signal & Alert System",
    years: "2024",
    blurb:
      "A Forex candlestick direction predictor in Python using pandas and XGBoost, paired with a Telegram bot for live trading alerts and an ATR-based backtester with session filters.",
    tags: ["Python", "XGBoost", "Telegram API"],
    image: "/images/projects/ml-fx-signal.png",
    imageAlt: "ML FX signal and alert system",
  },
  {
    id: "snapstudy",
    title: "SnapStudy",
    years: "2024",
    blurb:
      "A Next.js, React, and TypeScript app built on the Google Gemini API that turns photos of handwritten notes into structured study outputs, deployed on Vercel with exportable quizzes.",
    tags: ["Next.js", "TypeScript", "Google Gemini API"],
    image: "/images/projects/snapstudy.png",
    imageAlt: "SnapStudy study generator interface",
  },
  {
    id: "transfr-ai",
    title: "Transfr AI",
    years: "2026",
    blurb:
      "A JavaScript Chrome extension that extracts and transfers full conversation context between AI platforms in one click, for when usage limits or performance issues force a switch mid-thread.",
    tags: ["JavaScript", "Chrome Extension"],
    image: "/images/projects/transfr-ai.png",
    imageAlt: "Transfr AI Chrome extension",
  },
];
