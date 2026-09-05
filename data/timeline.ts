export type Chapter = {
  /** Stable slug, also used for the section id: #chapter-<id> */
  id: string;
  /** Two-digit index rendered in the rail and the eyebrow. */
  index: string;
  title: string;
  /** Optional role line, for chapters titled after a company. */
  subtitle?: string;
  dates: string;
  /** Short label for the fixed chapter rail. */
  rail: string;
  /** First-person narrative copy. Each string is its own paragraph. */
  body: string[];
  /** A single line pulled out and set large, as the chapter's takeaway. */
  pull: string;
  image: string;
  imageAlt: string;
  /**
   * "photo" fills the frame. "logo" centres a square brand tile instead, so a
   * company mark is never cover-cropped or blown up past its native size.
   */
  mediaKind?: "photo" | "logo";
  /** Flat backdrop color for this era. */
  base: string;
  /** The ambient radial glow that sits on top of the base. */
  glow: string;
  /** Type / rule accent. Must stay legible on `base`. */
  accent: string;
};

export const chapters: Chapter[] = [
  {
    id: "detour",
    index: "01",
    title: "Detour",
    subtitle: "My dad's store · Chattanooga, TN",
    dates: "2014 — Present",
    rail: "Detour",
    body: [
      "My dad opened Detour in Chattanooga, and I grew up inside it. I was behind the counter before I could drive — counting inventory, working the register, learning what it actually costs to keep the lights on from the person paying for them.",
      "As I got older I got more useful. I built out the store's Shopify storefront and its whole digital presence, and helped launch a private label that now manufactures between the US and Egypt.",
    ],
    pull: "Everything I know about running something real, I learned in my dad's store first.",
    image: "/images/timeline/01-detour.jpg",
    imageAlt: "Detour, the family clothing store in Chattanooga, Tennessee",
    base: "#3e1710",
    glow: "#a83a20",
    accent: "#f2a183",
  },
  {
    id: "ecommerce",
    index: "02",
    title: "E-commerce",
    subtitle: "Shop Amario · Founder",
    dates: "2020 — 2024",
    rail: "E-commerce",
    body: [
      "I wanted to know whether I could do it without the family name behind me, so I built Shop Amario from nothing. Multiple product lines hit five-figure weeks, and I ran all of it — sourcing, supplier lead times, the support inbox at midnight.",
      "Alongside it I ran a small digital marketing and web studio: mobile-first, SEO-optimized sites with embedded AI chat and copy for local clients, and the analytics dashboards to prove the work was paying for itself.",
    ],
    pull: "Building something and being able to sell it are two entirely different skills.",
    image: "/images/timeline/02-shopify.png",
    imageAlt: "Shopify logo",
    mediaKind: "logo",
    base: "#402c04",
    glow: "#c8930d",
    accent: "#f8cd68",
  },
  {
    id: "trading",
    index: "03",
    title: "Algorithmic Trading",
    subtitle: "MQL5 & Python · Live capital",
    dates: "2024 — Present",
    rail: "Algorithmic Trading",
    body: [
      "Selling physical products means you are the system. I wanted to build one that could run without me, so I started writing automated Forex strategies in MQL5 and Python.",
      "Those systems now trade across $100K to $1M+ in live capital and clear $10K+ in monthly P&L, with live API integrations, hard risk controls, and walk-forward backtesting standing behind every rule.",
    ],
    pull: "Real money changes how you write code. A bug isn't a failing test — it's a drawdown.",
    image: "/images/timeline/03-forex.png",
    imageAlt:
      "A Forex candlestick chart from the automated trading systems Begad Alymany built in MQL5 and Python",
    base: "#082b22",
    glow: "#0f7355",
    accent: "#5fe3b0",
  },
  {
    id: "tennessee",
    index: "04",
    title: "Tennessee",
    dates: "2024 — 2026",
    rail: "Tennessee",
    body: [
      "I started a Computer Science degree at the University of Tennessee on a Chancellor's Honors scholarship, expecting a fairly normal four years. Instead everything compounded at once.",
      "I joined Dr. Liu's lab building physics-based tissue simulations in NVIDIA Isaac Sim, so surgical robots could be tested before they ever touched hardware. And somewhere in the middle of a full course load, I founded two AI companies, Acronix and Medarix.",
      "By the spring I was carrying coursework, research, two companies, and my first internship at the same time.",
    ],
    pull: "Nothing in that list waited politely for the others to finish.",
    image: "/images/timeline/04-utk.png",
    imageAlt: "University of Tennessee logo",
    mediaKind: "logo",
    base: "#3f1d05",
    glow: "#d45f09",
    accent: "#ff8200",
  },
  {
    id: "skyit",
    index: "05",
    title: "GBCS SkyIt",
    subtitle: "Software Engineer Intern · Aviation Technology",
    dates: "March 2026 — May 2026",
    rail: "GBCS SkyIt",
    body: [
      "That spring I took my first engineering job inside someone else's codebase: front-end work on a web-based aviation fleet management platform, in TypeScript and modern component frameworks.",
      "I worked with backend engineers to wire the interface to live APIs and real data, and found out what code review and sprint planning actually feel like when you are the newest person in the room.",
    ],
    pull: "Everything I had built before this was mine to decide. This was the first thing that wasn't.",
    image: "/images/timeline/05-skyit.jpg",
    imageAlt: "GBCS SkyIt Services logo",
    mediaKind: "logo",
    base: "#242c36",
    glow: "#6f889c",
    accent: "#b4cadb",
  },
  {
    id: "transcard",
    index: "06",
    title: "Transcard",
    subtitle: "AI Engineering Intern · Fintech Payments",
    dates: "June 2026 — August 2026",
    rail: "Transcard",
    body: [
      "Over the summer I was an AI Engineering Intern at Transcard, building production AI inside a fintech payments platform. I rebuilt the multi-agent chatbot pipeline — grounded retrieval, intent routing, memory that survives a turn — and shipped it.",
      "Then I closed a critical gap analysis on the platform's shared AI safety library and found real production risk the test suite couldn't see, including a dispatcher path that silently bypassed every downstream safety control. The rest of the summer went into security and authentication hardening across the platform.",
    ],
    pull: "Build the system. Then make it trustworthy enough to run on its own.",
    image: "/images/timeline/06-transcard.jpg",
    imageAlt: "Transcard logo",
    mediaKind: "logo",
    base: "#0a2340",
    glow: "#1568b5",
    accent: "#6fb6ff",
  },
  {
    id: "newyork",
    index: "07",
    title: "New York",
    dates: "2026 — Present",
    rail: "New York",
    body: [
      "I could have stayed. Tennessee was working, and that was exactly the problem.",
      "So I transferred to NYU's Courant Institute of Mathematical Sciences to study Computer Science and Mathematics with the Class of 2028, because the interesting question was never how comfortable I could get — it was how far the math would take me.",
      "That is where I am now: in New York, still running Acronix and Medarix, still trading, and looking for the next thing hard enough to be worth the move. Here is what that has looked like so far.",
    ],
    pull: "Go further, or stay comfortable. You don't get to do both.",
    image: "/images/timeline/07-nyu.jpg",
    imageAlt:
      "New York University's Courant Institute of Mathematical Sciences, where Begad Alymany studies Computer Science and Mathematics",
    base: "#2b0f52",
    glow: "#6a22bc",
    accent: "#c79bff",
  },
];
