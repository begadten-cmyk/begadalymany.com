# begadalymany.com

Personal site for Begad Alymany — a single-page scroll narrative that morphs
through seven eras of color, then resolves into a functional portfolio.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger
(scroll-linked motion) · Framer Motion (component motion) · Lenis (smooth
scrolling). Deploys to Vercel with zero configuration.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint
```

## Adding images

Every image slot renders a designed placeholder until the real file exists.
Drop a correctly named file into the path listed in **[ASSETS.md](ASSETS.md)**
and it takes over — no code changes.

## Editing content

All copy lives in typed data files; no component needs to be touched.

| File | Contents |
| --- | --- |
| `data/site.ts` | Name, links, email, nav items, hero + settled palettes |
| `data/timeline.ts` | The seven chapters: copy, dates, colors, image paths |
| `data/companies.ts` | Acronix and Medarix |
| `data/projects.ts` | Project cards |
| `data/skills.ts` | Skill groups |

## Structure

```
app/         layout, page, metadata, generated icon + OG image, sitemap, robots
components/  Hero, Story, Nav, Companies, Projects, Skills, Contact
  diagrams/  hand-built inline SVG architecture diagrams
data/        all site content
lib/         gsap setup, scroll helpers, server-side asset resolution
public/      images and resume.pdf
```

Design and engineering decisions are documented in **[ARCHITECTURE.md](ARCHITECTURE.md)**.

## Deploying

Push to a Git remote and import the repo on Vercel — no environment variables
and no build configuration required. Before going live, set `url` in
`data/site.ts` to the production domain; it feeds canonical URLs, Open Graph
tags, `sitemap.xml`, and `robots.txt`.
