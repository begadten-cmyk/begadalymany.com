# Architecture notes

Why this site is built the way it is. Mostly it is one idea — a scroll-linked
colour story that has to hold 60fps on a phone — and the constraints that fall
out of it.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind v4 · GSAP + ScrollTrigger for
scroll-linked motion · Framer Motion for component motion · Lenis for smooth
scrolling. Statically prerendered, no runtime backend.

## The colour morph

Seven eras, each a deep base colour under a large drifting radial glow. Scroll
position drives the transition between them.

The obvious implementation — scrub `background-color` on one element — is the
wrong one. It repaints a full-viewport surface every frame.

Instead each era is a stacked fixed layer and **scroll animates `opacity` and
nothing else**. Two properties follow from that:

1. **It is a true interpolation.** Compositing layer B over layer A at opacity
   `t` yields exactly `t·B + (1−t)·A` — a linear colour lerp, not a dissolve.
2. **It never touches paint or layout.** Opacity is a compositor-thread
   property, so the morph runs off the main thread and survives on mobile.

Each chapter drives its own layer from `top bottom` → `top top`, so the colour
has fully arrived by the moment the chapter locks into place. The final neutral
resolves against the outro section, which is the visual signal that the story
has ended and the reference half of the page has begun.

## Pinning is CSS sticky, not `ScrollTrigger.pin`

Chapters are tall sections wrapping a `position: sticky` panel. ScrollTrigger
still drives every reveal, parallax and exit — but the pin itself is the
browser's.

`ScrollTrigger.pin` works by rewriting layout: it injects a spacer and changes
positioning. That is the usual source of pin jitter on mobile and of layout
shift when fonts or images settle late. Native sticky is handled by the
compositor and cannot shift the document.

Exit fades finish just before a panel unsticks, so two chapters are never
legible at once.

## Performance: the grain layer

Early on the page dropped frames throughout the story. Measured with a scripted
wheel-scroll and frame deltas recorded off `requestAnimationFrame`:

| | Avg FPS | Frames over 33ms |
| --- | --- | --- |
| Dev build | 42.8 | 8 |
| Production build | 43.5 | 14 |
| Production, grain layer's blend mode removed | **60.2** | **0** |

Production was no better than dev, which ruled out bundling, HMR and source
maps. The cost was one CSS property.

The film grain was a fixed, full-viewport layer using
`mix-blend-mode: soft-light`. A blended layer at that size forces the compositor
to read the backdrop back and re-blend the whole screen every frame — precisely
the work you cannot afford while scrubbing seven colour layers. Removing only
the blend mode, keeping the grain element, the drift animations, all the layers
and every blur, took it from 44.9fps to 60.2fps.

The grain now composites with plain alpha over a higher-contrast light-speckle
texture at about 7%, which still breaks up banding in the large gradients and
costs nothing per frame. Current numbers: **60.1fps sustained, p99 frame time
16.8ms, zero frames over 33ms.**

Worth recording that the suspects which turned out not to matter were the drift
animations (free once the blend was gone) and the blur filters (free entirely).

## Mobile: the image becomes the still

On desktop a chapter is two columns — a framed 4:5 media panel on one side,
narrative on the other, alternating per chapter.

On a phone that panel plus a heading, two paragraphs and a pull quote does not
fit in one viewport, and clipping the narrative is the wrong trade. So below
1024px the chapter image becomes a **full-bleed cinematic still behind the
type**, scrimmed for contrast. Same element, same reveal and parallax, no
duplicate DOM and no second image request. Verified to fit without clipping down
to 375 × 667.

## `prefers-reduced-motion`

An OS accessibility setting, so it is never overridden.

- Lenis is not instantiated at all.
- Every scroll-linked GSAP timeline sits inside a `gsap.matchMedia()` guard, so
  none of it registers.
- The fixed colour backdrop is dropped and each chapter paints its own era
  colour directly, becoming a plain full-height block. The colour story
  survives; only the motion goes.
- Framer Motion runs under `<MotionConfig reducedMotion="user">`.

That last point matters for correctness, not just taste. Branching on
`useReducedMotion()` inside components produces different markup on server and
client and therefore real hydration mismatches. Handling it once in a provider
keeps the two identical.

## Image slots

Every slot resolves **on the server** (`lib/media.ts`). If the file is not in
`public`, a designed placeholder renders and no image request is ever made — no
404, no broken-image flash. A client-side `onError` fallback stays in place as a
second net.

Placeholders are generated art rather than grey boxes: a gradient in that
section's accent colour plus a deterministic line motif chosen by seed from
three families, so a grid of them reads as a set rather than one tile repeated.

Chapters can also opt into `mediaKind: "logo"`, which centres a square brand
tile instead of cover-cropping a mark into the 4:5 frame.

## Diagrams

The Acronix and Medarix architecture diagrams are hand-built inline SVG
components with a scroll-triggered stroke draw, not images. Both carry `<title>`
and `<desc>` and describe their architecture in prose for screen readers. Below
768px they scroll horizontally inside their own frame rather than shrinking
their labels into illegibility.

## Content

All copy lives in typed data files. No component needs editing to change
wording, ordering or colour.

| File | Contents |
| --- | --- |
| `data/site.ts` | Name, links, email, nav, hero and settled palettes |
| `data/timeline.ts` | The seven chapters |
| `data/companies.ts` | Acronix and Medarix |
| `data/projects.ts` | Project cards |
| `data/skills.ts` | Skill groups |

Adding or removing a chapter needs no component changes — the backdrop layers,
the chapter rail and the counter in the hero all derive from the array.

## Verified

- Build, lint and typecheck clean.
- No horizontal overflow at 320, 375, 390, 430, 768, 1024, 1280, 1440 or 1920px
  (`scrollWidth` equals `clientWidth` at every width).
- All seven chapters fit without clipping at 375 × 667.
- Mobile menu opens, locks background scroll, closes on selection, releases the
  lock and lands the target section clear of the nav.
- Reduced-motion path renders every chapter in its own colour with no hydration
  mismatch.
- 60.1fps sustained during scroll on the production build.
