# Assets

Every image slot renders a designed, era-colored placeholder when its file is
absent, so nothing is ever broken. Dropping a correctly named file into the path
below makes the real image take over with no code change — instantly in
`npm run dev`, on the next build in production.

Existence is checked on the server, so a missing file never produces a failed
image request or a broken-image icon.

## Naming rules

- Filenames and extensions must match **exactly** (case-sensitive).
- To change a path, edit the `image` / `mark` field in the matching file under
  `data/` — renaming in `public/` alone will not do it.
- Export at roughly 2x the display size listed. `next/image` handles resizing,
  WebP/AVIF conversion and lazy loading.
- Keep files under ~500 KB each where possible.

---

## 1. Hero portrait

| Path | Aspect | Status |
| --- | --- | --- |
| `public/images/hero-photo.jpg` | 4:5 portrait | In place (1122 x 1402). Badge headshot, masked into the oval. Replace the file to change it. |

## 2. Timeline chapters

**All seven slots are filled.** Two are stand-ins worth upgrading; see below.

Each chapter slot is one of two kinds, set by `mediaKind` in
`data/timeline.ts`:

- **`photo`** (the default) fills the frame. Export **4:5 portrait at
  1200 x 1500**. On desktop it shows as a framed panel; below 1024px it becomes
  a full-bleed still behind the narrative, so keep important detail away from
  the very edges.
- **`logo`** centres the mark as a square brand tile on the era colour instead
  of cover-cropping it. Export **square, 512 x 512 or larger** - a square export
  guarantees nothing is trimmed. It is fine for the logo to carry its own
  background.

| Path | Chapter | Kind | Status |
| --- | --- | --- | --- |
| `public/images/timeline/01-detour.jpg` | 01 - Detour | photo | Supplied (1360 x 1020) |
| `public/images/timeline/02-shopify.png` | 02 - E-commerce | logo | Supplied (419 x 477) |
| `public/images/timeline/03-forex.png` | 03 - Algorithmic Trading | photo | Supplied (1024 x 638) |
| `public/images/timeline/04-utk.png` | 04 - Tennessee | logo | Supplied (500 x 469) |
| `public/images/timeline/05-skyit.jpg` | 05 - GBCS SkyIt | logo | Supplied (200 x 200) |
| `public/images/timeline/06-transcard.jpg` | 06 - Transcard | logo | Supplied (200 x 200) |
| `public/images/timeline/07-nyu.jpg` | 07 - New York | photo | Supplied (2560 x 1707) |

Two are worth upgrading:

- **`02-shopify.png` and `03-forex.png` are stand-ins.** The Shopify mark says
  "this was a Shopify business" rather than showing the business itself; a photo
  of Shop Amario product, packaging or the storefront would be stronger. Same
  for the chart - a screenshot of the actual terminal or an equity curve beats a
  generic candlestick chart. Swap either by replacing the file (and for Shopify,
  deleting `mediaKind: "logo"` from that chapter so it fills the frame).
- **`05-skyit.jpg` and `06-transcard.jpg` are 200 x 200.** Crisp on a standard
  display, slightly soft on a Retina one. 512 x 512 versions sharpen them with no
  other change.

> For any photograph swapped in: nothing sensitive. No customer data, no
> internal dashboards, no credentials visible in any screenshot.

## 3. Company marks

Small square logo marks shown beside each company name. Transparent PNG.

| Path | Aspect | Recommended export | Notes |
| --- | --- | --- | --- |
| `public/images/companies/acronix.png` | **1:1** | 512 × 512 | Rendered at 44 px in a rounded square. Bold, simple marks work best; light-on-dark reads clearest. |
| `public/images/companies/medarix.png` | **1:1** | 512 × 512 | Same. |

The architecture diagrams next to these are **real inline SVG React components**
(`components/diagrams/`), not images — nothing to supply for those.

## 4. Projects

All four are **16:10 landscape**, exported at **1600 × 1000**. Screenshots,
UI captures, or charts all work.

| Path | Project |
| --- | --- |
| `public/images/projects/trading-systems.png` | Quant/ML Trading Systems (shown as the wide lead card) |
| `public/images/projects/tissue-sim.png` | Soft-Tissue Surgical Simulation |
| `public/images/projects/ml-fx-signal.png` | ML FX Signal & Alert System |
| `public/images/projects/snapstudy.png` | SnapStudy |
| `public/images/projects/transfr-ai.png` | Transfr AI |

## 5. Resume

| Path | Notes |
| --- | --- |
| `public/resume.pdf` | In place. Replace the file on each resume update; the download button and the nav link both point at this exact path. |

## 6. Generated automatically — nothing to supply

| What | Where |
| --- | --- |
| Favicon | `app/icon.tsx` (rendered at build time) |
| Open Graph / Twitter card image | `app/opengraph-image.tsx` (1200 × 630, rendered at build time) |
| `sitemap.xml`, `robots.txt` | `app/sitemap.ts`, `app/robots.ts` |

---

## Alt text

Alt text is already written for every slot and lives with the content, not the
markup:

- Timeline → `imageAlt` in `data/timeline.ts`
- Companies → `markAlt` in `data/companies.ts`
- Projects → `imageAlt` in `data/projects.ts`
- Hero → `app/page.tsx`

If a replacement image shows something different from what the alt text
describes, update that field too.
