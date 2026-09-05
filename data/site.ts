export const site = {
  name: "Begad Alymany",
  initials: "BA",
  role: "Computer Science and Mathematics",
  school: "New York University",
  schoolLong: "Courant Institute of Mathematical Sciences",
  gradYear: "Class of 2028",
  url: "https://begadalymany.com",
  email: "begadten@gmail.com",
  linkedin: "https://linkedin.com/in/begad-alymany",
  linkedinLabel: "linkedin.com/in/begad-alymany",
  github: "https://github.com/begadten-cmyk",
  githubLabel: "github.com/begadten-cmyk",
  resume: "/resume.pdf",
  description:
    "Begad Alymany is a Computer Science and Mathematics student at NYU Courant and the founder of Acronix and Medarix, most recently an AI Engineering Intern at Transcard.",
} as const;

/** The palette the site settles into once the story ends. */
export const settled = {
  base: "#0a0a0c",
  glow: "#1b1740",
  accent: "#8b7cff",
} as const;

/** The neutral the hero opens on, before the color story begins. */
export const overture = {
  base: "#0a0a0c",
  glow: "#241d3a",
  accent: "#8b7cff",
} as const;

export const nav = [
  { label: "Story", href: "#story" },
  { label: "Companies", href: "#companies" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;
